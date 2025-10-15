"""
Add The Herbies Headshop USA affiliate partner to the database
USA-specific campaign with campaign ID
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

herbies_usa_partner = {
    "id": str(uuid.uuid4()),
    "name": "The Herbies Headshop USA",
    "category": "Cannabis Seeds",
    "tab": "Seeds",
    "type": "seed_wholesaler",
    "partner_type": "Official Partner",
    "status": "active",
    "affiliate_link": "https://herbiesheadshop.com/usa?utm_source=digitalgreenhouse&utm_medium=people&utm_campaign=digitalgreenhouse_partner&a_aid=digitalgreenhouse&a_cid=d4a9f156",
    "tracking_code": "HERBIES-USA-DGH-002",
    "affiliate_id": "digitalgreenhouse",
    "campaign_id": "d4a9f156",
    "utm_source": "digitalgreenhouse",
    "utm_medium": "people",
    "utm_campaign": "digitalgreenhouse_partner",
    "target_region": "USA",
    "commission_rate": 12.0,
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
    "description": "The Herbies Headshop USA is the dedicated US market gateway offering premium cannabis seeds with US-optimized shipping and customer service. Over 3000 strains available with fast domestic delivery options.",
    "benefits": [
        "3000+ Cannabis Strains",
        "US Market Optimized",
        "Fast US Shipping",
        "Stealth Packaging",
        "Germination Guarantee",
        "Top Breeder Genetics",
        "Bitcoin Accepted",
        "USA Customer Support"
    ],
    "total_clicks": 0,
    "total_conversions": 0,
    "total_revenue": 0.0,
    "total_commission": 0.0,
    "created_at": datetime.now(timezone.utc).isoformat(),
    "activated_at": datetime.now(timezone.utc).isoformat()
}

async def add_herbies_usa():
    print("Adding The Herbies Headshop USA affiliate partner...")
    
    # Check if already exists
    existing = await db.affiliate_partners.find_one({"name": "The Herbies Headshop USA"})
    
    if existing:
        print("Partner already exists, updating...")
        await db.affiliate_partners.update_one(
            {"name": "The Herbies Headshop USA"},
            {"$set": herbies_usa_partner}
        )
        print("✅ Updated existing partner")
    else:
        await db.affiliate_partners.insert_one(herbies_usa_partner)
        print("✅ Added new partner")
    
    # Verify
    partner = await db.affiliate_partners.find_one({"name": "The Herbies Headshop USA"}, {"_id": 0})
    print(f"\n📊 Partner Details:")
    print(f"   Name: {partner['name']}")
    print(f"   Status: {partner['status']}")
    print(f"   Target Region: {partner['target_region']}")
    print(f"   Campaign ID: {partner['campaign_id']}")
    print(f"   Commission: {partner['commission_rate']}%")
    print(f"   Affiliate Link: {partner['affiliate_link'][:60]}...")
    print(f"   Tracking Code: {partner['tracking_code']}")
    
    # Count total active partners
    active_count = await db.affiliate_partners.count_documents({"status": "active"})
    herbies_variants = await db.affiliate_partners.count_documents({"name": {"$regex": "Herbies"}})
    print(f"\n🎯 Total Active Partners: {active_count}")
    print(f"🌿 Herbies Variants: {herbies_variants} (Global + USA)")

if __name__ == "__main__":
    asyncio.run(add_herbies_usa())
    print("\n✅ The Herbies Headshop USA integration complete!")
    print("\nBenefits of USA-specific link:")
    print("1. Separate tracking for US market performance")
    print("2. Campaign ID allows granular analytics")
    print("3. US-optimized shipping and support")
    print("4. Better conversion rates for US customers")
