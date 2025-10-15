"""
Add The Herbies Headshop affiliate partner to the database
First completed affiliate program
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

herbies_partner = {
    "id": str(uuid.uuid4()),
    "name": "The Herbies Headshop",
    "category": "Cannabis Seeds",
    "tab": "Seeds",
    "type": "seed_wholesaler",
    "partner_type": "Official Partner",
    "status": "active",
    "affiliate_link": "https://herbiesheadshop.com/?utm_source=digitalgreenhouse&utm_medium=people&utm_campaign=digitalgreenhouse_partner&a_aid=digitalgreenhouse",
    "tracking_code": "HERBIES-DGH-001",
    "affiliate_id": "digitalgreenhouse",
    "utm_source": "digitalgreenhouse",
    "utm_medium": "people",
    "utm_campaign": "digitalgreenhouse_partner",
    "commission_rate": 12.0,  # Typical for Herbies
    "commission_type": "percentage",
    "cookie_duration_days": 45,
    "payment_terms": "Net 30",
    "minimum_payout": 100.0,
    "contact_email": "[email protected]",
    "dashboard_url": "https://herbiesheadshop.com/affiliates/dashboard",
    "documentation_url": "https://docs.google.com/document/d/1Eq63zOZEWJ7ghjbBhM1TyPUQSgiDVpEaSlcB_S_F2Tw/edit?usp=sharing",
    "banner_assets": True,
    "product_feed": True,
    "featured": True,
    "description": "The Herbies Headshop is one of the world's leading cannabis seed banks, offering premium genetics from top breeders. Over 3000 strains available with discreet worldwide shipping.",
    "benefits": [
        "3000+ Cannabis Strains",
        "Worldwide Discreet Shipping",
        "Stealth Packaging",
        "Germination Guarantee",
        "Top Breeder Genetics",
        "Bitcoin Accepted"
    ],
    "total_clicks": 0,
    "total_conversions": 0,
    "total_revenue": 0.0,
    "total_commission": 0.0,
    "created_at": datetime.now(timezone.utc).isoformat(),
    "activated_at": datetime.now(timezone.utc).isoformat()
}

async def add_herbies():
    print("Adding The Herbies Headshop affiliate partner...")
    
    # Check if already exists
    existing = await db.affiliate_partners.find_one({"name": "The Herbies Headshop"})
    
    if existing:
        print("Partner already exists, updating...")
        await db.affiliate_partners.update_one(
            {"name": "The Herbies Headshop"},
            {"$set": herbies_partner}
        )
        print("✅ Updated existing partner")
    else:
        await db.affiliate_partners.insert_one(herbies_partner)
        print("✅ Added new partner")
    
    # Verify
    partner = await db.affiliate_partners.find_one({"name": "The Herbies Headshop"}, {"_id": 0})
    print(f"\n📊 Partner Details:")
    print(f"   Name: {partner['name']}")
    print(f"   Status: {partner['status']}")
    print(f"   Category: {partner['category']}")
    print(f"   Commission: {partner['commission_rate']}%")
    print(f"   Affiliate Link: {partner['affiliate_link'][:60]}...")
    print(f"   Tracking Code: {partner['tracking_code']}")
    
    # Count total active partners
    active_count = await db.affiliate_partners.count_documents({"status": "active"})
    print(f"\n🎯 Total Active Partners: {active_count}")

if __name__ == "__main__":
    asyncio.run(add_herbies())
    print("\n✅ The Herbies Headshop integration complete!")
    print("\nNext steps:")
    print("1. Test affiliate link on Seeds page")
    print("2. Verify click tracking works")
    print("3. Monitor conversions in dashboard")
    print("4. Add more completed partners as you sign them up")
