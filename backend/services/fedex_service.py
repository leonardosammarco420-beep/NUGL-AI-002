"""
FedEx Shipping Service
Handles rate calculations and tracking for shipments from Kingston, Jamaica
"""

import httpx
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import asyncio

class FedExService:
    def __init__(self):
        self.api_key = os.getenv('FEDEX_API_KEY')
        self.api_secret = os.getenv('FEDEX_SECRET_KEY')
        self.base_url = os.getenv('FEDEX_BASE_URL', 'https://apis-sandbox.fedex.com')
        self.token = None
        self.token_expires_at = None
        
    async def get_access_token(self) -> str:
        """Get OAuth access token (cached for 60 minutes)"""
        # Check if token is still valid
        if self.token and self.token_expires_at and datetime.now() < self.token_expires_at:
            return self.token
        
        # Request new token
        url = f"{self.base_url}/oauth/token"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "grant_type": "client_credentials",
            "client_id": self.api_key,
            "client_secret": self.api_secret
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, data=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            self.token = result['access_token']
            # Token expires in 3600 seconds (60 minutes)
            self.token_expires_at = datetime.now() + timedelta(seconds=3500)  # 58 minutes buffer
            
            return self.token
    
    async def get_shipping_rates(
        self,
        destination_address: Dict,
        package_weight_grams: float,
        declared_value_usd: float = 50.0
    ) -> List[Dict]:
        """
        Get shipping rates from Kingston, Jamaica to destination
        
        Args:
            destination_address: Dict with street, city, state, postal_code, country
            package_weight_grams: Total package weight in grams
            declared_value_usd: Declared value for customs
        
        Returns:
            List of rate quotes with service type, cost, and delivery estimate
        """
        token = await self.get_access_token()
        
        # Convert grams to kg
        weight_kg = max(package_weight_grams / 1000, 0.01)  # Min 0.01 kg
        
        # Origin: Kingston, Jamaica
        origin = {
            "streetLines": ["123 Cannabis Avenue"],
            "city": "Kingston",
            "stateOrProvinceCode": "",
            "postalCode": "JMAKN01",
            "countryCode": "JM"
        }
        
        # Destination
        destination = {
            "streetLines": [destination_address.get('street', '')],
            "city": destination_address.get('city', ''),
            "stateOrProvinceCode": destination_address.get('state', ''),
            "postalCode": destination_address.get('postal_code', ''),
            "countryCode": destination_address.get('country', 'US')
        }
        
        # Build rate request
        payload = {
            "accountNumber": {
                "value": "YOUR_ACCOUNT_NUMBER"  # Will be updated with actual account
            },
            "requestedShipment": {
                "shipper": {
                    "address": origin
                },
                "recipient": {
                    "address": destination
                },
                "pickupType": "USE_SCHEDULED_PICKUP",
                "serviceType": "FEDEX_INTERNATIONAL_PRIORITY",
                "rateRequestType": ["LIST"],
                "requestedPackageLineItems": [
                    {
                        "weight": {
                            "units": "KG",
                            "value": weight_kg
                        },
                        "dimensions": {
                            "length": 10,
                            "width": 8,
                            "height": 4,
                            "units": "CM"
                        }
                    }
                ]
            }
        }
        
        url = f"{self.base_url}/rate/v1/rates/quotes"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers, timeout=30)
                
                if response.status_code == 200:
                    result = response.json()
                    rates = []
                    
                    # Parse rate quotes
                    if 'output' in result and 'rateReplyDetails' in result['output']:
                        for rate_detail in result['output']['rateReplyDetails']:
                            service_type = rate_detail.get('serviceType', 'UNKNOWN')
                            
                            # Get total charges
                            total_charge = 0
                            currency = 'USD'
                            if 'ratedShipmentDetails' in rate_detail:
                                for rated_detail in rate_detail['ratedShipmentDetails']:
                                    if 'totalNetCharge' in rated_detail:
                                        total_charge = rated_detail['totalNetCharge'].get('amount', 0)
                                        currency = rated_detail['totalNetCharge'].get('currency', 'USD')
                                        break
                            
                            # Get delivery estimate
                            delivery_date = None
                            if 'commit' in rate_detail and 'dateDetail' in rate_detail['commit']:
                                delivery_date = rate_detail['commit']['dateDetail'].get('dayFormat', '')
                            
                            rates.append({
                                'carrier': 'FedEx',
                                'service': service_type,
                                'cost': float(total_charge),
                                'currency': currency,
                                'estimated_delivery': delivery_date,
                                'transit_days': rate_detail.get('commit', {}).get('transitTime', 'Unknown')
                            })
                    
                    return rates
                else:
                    print(f"FedEx Rate Error: {response.status_code} - {response.text}")
                    return []
                    
        except Exception as e:
            print(f"FedEx API Error: {str(e)}")
            return []
    
    async def track_shipment(self, tracking_number: str) -> Optional[Dict]:
        """
        Track a FedEx shipment
        
        Args:
            tracking_number: FedEx tracking number
            
        Returns:
            Tracking information dict or None
        """
        token = await self.get_access_token()
        
        payload = {
            "includeDetailedScans": True,
            "trackingInfo": [
                {
                    "trackingNumberInfo": {
                        "trackingNumber": tracking_number
                    }
                }
            ]
        }
        
        url = f"{self.base_url}/track/v1/trackingnumbers"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload, headers=headers, timeout=30)
                
                if response.status_code == 200:
                    result = response.json()
                    
                    if 'output' in result and 'completeTrackResults' in result['output']:
                        track_results = result['output']['completeTrackResults']
                        
                        if track_results and len(track_results) > 0:
                            track_info = track_results[0].get('trackResults', [])[0]
                            
                            return {
                                'tracking_number': tracking_number,
                                'carrier': 'FedEx',
                                'status': track_info.get('latestStatusDetail', {}).get('description', 'Unknown'),
                                'location': track_info.get('latestStatusDetail', {}).get('scanLocation', {}),
                                'estimated_delivery': track_info.get('estimatedDeliveryTimeWindow', {}).get('description', ''),
                                'events': track_info.get('scanEvents', [])
                            }
                
                return None
                
        except Exception as e:
            print(f"FedEx Tracking Error: {str(e)}")
            return None


# Test the service
async def test_fedex():
    service = FedExService()
    
    # Test authentication
    print("Testing FedEx authentication...")
    token = await service.get_access_token()
    print(f"✅ Token obtained: {token[:20]}...")
    
    # Test rate calculation
    print("\nTesting rate calculation to USA...")
    test_address = {
        'street': '123 Main St',
        'city': 'New York',
        'state': 'NY',
        'postal_code': '10001',
        'country': 'US'
    }
    
    rates = await service.get_shipping_rates(test_address, 10)  # 10g package
    
    if rates:
        print(f"✅ Found {len(rates)} shipping options:")
        for rate in rates:
            print(f"   - {rate['service']}: ${rate['cost']} {rate['currency']} ({rate['transit_days']})")
    else:
        print("⚠️ No rates returned (may need FedEx account number)")

if __name__ == "__main__":
    asyncio.run(test_fedex())
