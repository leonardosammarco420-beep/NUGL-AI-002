"""
Script to populate affiliate_partners collection with all partner information
Run this to initialize the affiliate partners database
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Complete affiliate partners data
affiliate_partners = [
    # SEED BANKS
    {
        "id": str(uuid.uuid4()),
        "name": "Tyson 2.0 Seeds",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "active",
        "affiliate_link": "https://tyson20.com?ref=NUGL",
        "tracking_code": "TY20-NUGL-001",
        "commission_rate": 15.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "payment_terms": "Net 30",
        "minimum_payout": 50.0,
        "contact_email": "[email protected]",
        "dashboard_url": "https://tyson20.com/affiliate/dashboard",
        "banner_assets": True,
        "product_feed": True,
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Royal Queen Seeds",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "active",
        "affiliate_link": "https://www.royalqueenseeds.com?ref=NUGL",
        "tracking_code": "RQS-NUGL-002",
        "commission_rate": 12.0,
        "commission_type": "percentage",
        "cookie_duration_days": 45,
        "payment_terms": "Net 30",
        "minimum_payout": 100.0,
        "contact_email": "[email protected]",
        "dashboard_url": "https://royalqueenseeds.com/affiliates",
        "banner_assets": True,
        "product_feed": True,
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Seedsman",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Affiliate Network",
        "status": "pending",
        "signup_url": "https://www.seedsman.com/en/affiliates",
        "affiliate_link": "https://www.seedsman.com?affiliate=NUGL",
        "commission_rate": 10.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "payment_terms": "Net 30",
        "minimum_payout": 50.0,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "ILoveGrowingMarijuana",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "pending",
        "signup_url": "https://ilgm.com/affiliates",
        "affiliate_link": "https://ilgm.com?ref=NUGL",
        "commission_rate": 15.0,
        "commission_type": "percentage",
        "cookie_duration_days": 60,
        "payment_terms": "Net 15",
        "minimum_payout": 100.0,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Barney's Farm",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "pending",
        "signup_url": "https://www.barneysfarm.com/affiliates",
        "affiliate_link": "https://www.barneysfarm.com?ref=NUGL",
        "commission_rate": 12.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Crop King Seeds",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "pending",
        "signup_url": "https://www.cropkingseeds.com/affiliates",
        "affiliate_link": "https://www.cropkingseeds.com?ref=NUGL",
        "commission_rate": 15.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Sensi Seeds",
        "category": "Cannabis Seeds",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "pending",
        "signup_url": "https://sensiseeds.com/en/affiliates",
        "affiliate_link": "https://sensiseeds.com?aff=NUGL",
        "commission_rate": 10.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Fast Buds",
        "category": "Cannabis Seeds - Autoflowers",
        "tab": "Seeds",
        "type": "seed_wholesaler",
        "partner_type": "Direct Affiliate",
        "status": "pending",
        "signup_url": "https://2fast4buds.com/affiliates",
        "affiliate_link": "https://2fast4buds.com?ref=NUGL",
        "commission_rate": 12.0,
        "commission_type": "percentage",
        "cookie_duration_days": 30,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    
    # CRYPTO CASINOS
    {
        "id": str(uuid.uuid4()),
        "name": "Stake Casino",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://stake.com/affiliates",
        "affiliate_link": "https://stake.com/?c=NUGL",
        "commission_rate": 40.0,
        "commission_type": "revenue_share",
        "cpa_available": True,
        "cpa_amount": 200.0,
        "cookie_duration_days": 999999,  # Lifetime
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "BTC, ETH, USDT",
        "dashboard_url": "https://affiliates.stake.com",
        "api_access": True,
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "BC.Game",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://bc.game/affiliates",
        "affiliate_link": "https://bc.game/i-NUGL",
        "commission_rate": 45.0,
        "commission_type": "revenue_share",
        "cpa_available": True,
        "cpa_amount": 150.0,
        "cookie_duration_days": 999999,  # Lifetime
        "payment_terms": "Weekly",
        "minimum_payout": 50.0,
        "payment_methods": "20+ Cryptocurrencies",
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Rollbit",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://rollbit.com/affiliates",
        "affiliate_link": "https://rollbit.com/r/NUGL",
        "commission_rate": 40.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Bi-weekly",
        "minimum_payout": 100.0,
        "payment_methods": "BTC, ETH, LTC",
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Roobet",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://roobet.com/affiliates",
        "affiliate_link": "https://roobet.com/?ref=NUGL",
        "commission_rate": 35.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "Crypto",
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Duelbits",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://duelbits.com/affiliates",
        "affiliate_link": "https://duelbits.com/?a=NUGL",
        "commission_rate": 40.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Weekly",
        "minimum_payout": 50.0,
        "payment_methods": "Crypto",
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Wild.io",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://wild.io/affiliates",
        "affiliate_link": "https://wild.io/?ref=NUGL",
        "commission_rate": 35.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "Crypto",
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "FortuneJack",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://fortunejack.com/affiliates",
        "affiliate_link": "https://fortunejack.com/?ref=NUGL",
        "commission_rate": 40.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "10+ Cryptocurrencies",
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Cloudbet",
        "category": "Online Casino & Sportsbook",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "pending",
        "signup_url": "https://www.cloudbet.com/en/affiliates",
        "affiliate_link": "https://www.cloudbet.com/en/?af_token=NUGL",
        "commission_rate": 35.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,
        "payment_terms": "Monthly",
        "minimum_payout": 100.0,
        "payment_methods": "BTC",
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    
    # DISPENSARIES
    {
        "id": str(uuid.uuid4()),
        "name": "Leafly",
        "category": "Dispensary Leads",
        "tab": "Dispensaries",
        "type": "dispensary",
        "partner_type": "Lead Generation",
        "status": "pending",
        "signup_url": "https://www.leafly.com/dispensaries/advertise",
        "commission_rate": 10.0,  # Average $10 per lead
        "commission_type": "per_lead",
        "payment_terms": "Net 30",
        "minimum_payout": 100.0,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Weedmaps",
        "category": "Dispensary Leads",
        "tab": "Dispensaries",
        "type": "dispensary",
        "partner_type": "Lead Generation",
        "status": "pending",
        "signup_url": "https://weedmaps.com/business/advertise",
        "commission_rate": 15.0,  # Average $15 per lead
        "commission_type": "per_lead",
        "payment_terms": "Net 30",
        "minimum_payout": 100.0,
        "featured": False,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    
    # PSYCHEDELICS (Internal Brand)
    {
        "id": str(uuid.uuid4()),
        "name": "SPORES Products",
        "category": "Mushroom Products",
        "tab": "Psychedelics",
        "type": "retail",
        "partner_type": "Direct Sales",
        "status": "active",
        "affiliate_link": "/psychedelics",
        "commission_rate": 100.0,  # Own brand
        "commission_type": "percentage",
        "payment_terms": "Immediate",
        "minimum_payout": 0.0,
        "products": ["Raw Mushrooms", "Capsules", "Gummies", "Chocolates"],
        "featured": True,
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]

async def populate_affiliates():
    print("Starting affiliate partners population...")
    
    # Clear existing partners
    result = await db.affiliate_partners.delete_many({})
    print(f"Cleared {result.deleted_count} existing partners")
    
    # Insert new partners
    await db.affiliate_partners.insert_many(affiliate_partners)
    print(f"Inserted {len(affiliate_partners)} affiliate partners")
    
    # Verify insertion
    count = await db.affiliate_partners.count_documents({})
    print(f"Total partners in database: {count}")
    
    # Show breakdown by category
    print("\nBreakdown by category:")
    categories = {}
    for partner in affiliate_partners:
        cat = partner['tab']
        categories[cat] = categories.get(cat, 0) + 1
    
    for category, count in categories.items():
        print(f"  {category}: {count} partners")
    
    # Show status breakdown
    print("\nStatus breakdown:")
    active = len([p for p in affiliate_partners if p['status'] == 'active'])
    pending = len([p for p in affiliate_partners if p['status'] == 'pending'])
    print(f"  Active: {active}")
    print(f"  Pending Sign-up: {pending}")

if __name__ == "__main__":
    asyncio.run(populate_affiliates())
    print("\nAffiliate partners population complete!")
    print("\nNext steps:")
    print("1. Sign up for pending affiliate programs")
    print("2. Update affiliate links with actual tracking codes")
    print("3. Obtain API keys where available")
    print("4. Test affiliate tracking system")
    print("5. Launch affiliate dashboard UI")
