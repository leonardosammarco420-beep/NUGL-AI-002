"""
Add 3 completed Crypto Casino affiliate partners to the database
Stake, BC.Game, and Roobet
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

casino_partners = [
    # STAKE CASINO
    {
        "id": str(uuid.uuid4()),
        "name": "Stake Casino",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "active",
        "affiliate_link": "https://stake.com/?c=digitalgreenhouse",
        "tracking_code": "STAKE-DGH-001",
        "affiliate_code": "digitalgreenhouse",
        "commission_rate": 40.0,
        "commission_type": "revenue_share",
        "cpa_available": True,
        "cpa_amount": 200.0,
        "sub_affiliate_rate": 5.0,
        "cookie_duration_days": 999999,  # Lifetime
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "BTC, ETH, USDT, Crypto",
        "dashboard_url": "https://affiliates.stake.com",
        "api_access": True,
        "featured": True,
        "description": "Stake is the world's largest crypto casino and sportsbook, trusted by millions. Offers 40% revenue share, lifetime cookies, and weekly payouts. Known for high-roller traffic and excellent conversion rates.",
        "benefits": [
            "40% Revenue Share",
            "$200 CPA Available",
            "Lifetime Cookie Duration",
            "Weekly Payments",
            "Crypto Only (BTC, ETH, USDT)",
            "High Roller Traffic",
            "24/7 Support",
            "Real-time Reporting"
        ],
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "activated_at": datetime.now(timezone.utc).isoformat()
    },
    
    # BC.GAME
    {
        "id": str(uuid.uuid4()),
        "name": "BC.Game",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "active",
        "affiliate_link": "https://bc.game/i-441vun5xg-n/",
        "tracking_code": "BCGAME-DGH-002",
        "affiliate_code": "441vun5xg",
        "commission_rate": 45.0,
        "commission_type": "revenue_share",
        "cpa_available": True,
        "cpa_amount": 150.0,
        "cookie_duration_days": 999999,  # Lifetime
        "payment_terms": "Weekly",
        "minimum_payout": 50.0,
        "payment_methods": "20+ Cryptocurrencies",
        "featured": True,
        "description": "BC.Game is a leading crypto casino with 45% revenue share and support for 20+ cryptocurrencies. Features original games, sports betting, and a vibrant community. Lower minimum payout at $50.",
        "benefits": [
            "45% Revenue Share (Highest!)",
            "$150 CPA Available",
            "Lifetime Cookie Duration",
            "Weekly Payments",
            "20+ Cryptocurrencies",
            "$50 Minimum Payout",
            "Original House Games",
            "Sports Betting Available"
        ],
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "activated_at": datetime.now(timezone.utc).isoformat()
    },
    
    # ROOBET
    {
        "id": str(uuid.uuid4()),
        "name": "Roobet",
        "category": "Online Casino",
        "tab": "Crypto Casino",
        "type": "casino",
        "partner_type": "Revenue Share",
        "status": "active",
        "affiliate_link": "https://roobet.com/?ref=digitalgreenhou",
        "tracking_code": "ROOBET-DGH-003",
        "affiliate_code": "digitalgreenhou",
        "commission_rate": 35.0,
        "commission_type": "revenue_share",
        "cookie_duration_days": 999999,  # Lifetime
        "payment_terms": "Weekly",
        "minimum_payout": 100.0,
        "payment_methods": "Crypto (BTC, ETH, LTC)",
        "featured": True,
        "description": "Roobet is a popular crypto casino known for its sleek design and exclusive games. Offers 35% revenue share with reliable weekly payouts. Strong brand recognition and active streamer community.",
        "benefits": [
            "35% Revenue Share",
            "Lifetime Cookie Duration",
            "Weekly Payments",
            "Crypto Payments (BTC, ETH, LTC)",
            "Exclusive Games",
            "Strong Brand Recognition",
            "Active Streamer Community",
            "Mobile Optimized"
        ],
        "total_clicks": 0,
        "total_conversions": 0,
        "total_revenue": 0.0,
        "total_commission": 0.0,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "activated_at": datetime.now(timezone.utc).isoformat()
    }
]

async def add_casinos():
    print("Adding 3 Crypto Casino affiliate partners...\n")
    
    for partner in casino_partners:
        # Check if already exists
        existing = await db.affiliate_partners.find_one({"name": partner["name"]})
        
        if existing:
            print(f"📝 {partner['name']}: Already exists, updating...")
            await db.affiliate_partners.update_one(
                {"name": partner["name"]},
                {"$set": partner}
            )
        else:
            await db.affiliate_partners.insert_one(partner)
            print(f"✅ {partner['name']}: Added successfully!")
        
        print(f"   Commission: {partner['commission_rate']}% revenue share")
        print(f"   Tracking Code: {partner['tracking_code']}")
        print(f"   Link: {partner['affiliate_link'][:50]}...")
        print()
    
    # Count totals
    active_count = await db.affiliate_partners.count_documents({"status": "active"})
    casino_count = await db.affiliate_partners.count_documents({"tab": "Crypto Casino", "status": "active"})
    
    print(f"🎯 Total Active Partners: {active_count}")
    print(f"🎰 Active Crypto Casinos: {casino_count}")

if __name__ == "__main__":
    asyncio.run(add_casinos())
    print("\n✅ All 3 Crypto Casino integrations complete!")
    print("\n💰 Revenue Potential:")
    print("• Stake: 40% revenue share + $200 CPA")
    print("• BC.Game: 45% revenue share (highest!) + $150 CPA")
    print("• Roobet: 35% revenue share")
    print("\nAll casinos offer:")
    print("• Lifetime cookie tracking")
    print("• Weekly crypto payments")
    print("• Real-time analytics")
