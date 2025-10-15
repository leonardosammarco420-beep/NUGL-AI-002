"""
Populate Affiliate Dashboard with sample data including crypto casinos
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone, timedelta
import os
import uuid
import random

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'nugl_database')

# Affiliate partners including crypto casinos
PARTNERS = [
    # Crypto Casinos
    {'id': 'stake', 'name': 'Stake Casino', 'commission': 0.40},
    {'id': 'bcgame', 'name': 'BC.Game', 'commission': 0.35},
    {'id': 'rollbit', 'name': 'Rollbit Casino', 'commission': 0.30},
    {'id': 'roobet', 'name': 'Roobet Casino', 'commission': 0.25},
    {'id': 'duelbits', 'name': 'Duelbits Casino', 'commission': 0.30},
    {'id': 'wildio', 'name': 'Wild.io Casino', 'commission': 0.35},
    {'id': 'fortunejack', 'name': 'Fortunejack', 'commission': 0.40},
    {'id': 'cloudbet', 'name': 'Cloudbet', 'commission': 0.30},
    
    # Cannabis Affiliates
    {'id': 'leafly', 'name': 'Leafly Dispensaries', 'commission': 0.10},
    {'id': 'weedmaps', 'name': 'Weedmaps', 'commission': 0.12},
    {'id': 'seedsupreme', 'name': 'Seed Supreme', 'commission': 0.15},
    {'id': 'ilgm', 'name': 'ILGM Seeds', 'commission': 0.20},
]

async def populate_affiliate_data():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print('💰 Populating Affiliate Dashboard with sample data...\n')
    
    # Clear existing data
    await db.affiliate_clicks.delete_many({})
    
    # Generate clicks for the past 30 days
    clicks_to_insert = []
    total_clicks = 0
    total_conversions = 0
    total_revenue = 0.0
    
    for days_ago in range(30):
        date = datetime.now(timezone.utc) - timedelta(days=days_ago)
        
        for partner in PARTNERS:
            # Generate random clicks for this partner on this day
            num_clicks = random.randint(5, 50)
            
            for _ in range(num_clicks):
                # 5-15% conversion rate (realistic for affiliates)
                converted = random.random() < random.uniform(0.05, 0.15)
                
                # Calculate revenue for conversions
                revenue = 0
                if converted:
                    # Revenue based on partner type
                    if 'Casino' in partner['name']:
                        # Casino conversions worth more ($50-$500 per conversion)
                        base_revenue = random.uniform(50, 500)
                    else:
                        # Cannabis product conversions ($10-$100)
                        base_revenue = random.uniform(10, 100)
                    
                    revenue = round(base_revenue * partner['commission'], 2)
                    total_conversions += 1
                    total_revenue += revenue
                
                click_data = {
                    'id': str(uuid.uuid4()),
                    'partner_id': partner['id'],
                    'partner_name': partner['name'],
                    'source_page': random.choice([
                        '/crypto-casino',
                        '/strains',
                        '/seeds',
                        '/news',
                        '/nft-marketplace'
                    ]),
                    'clicked_at': (date - timedelta(
                        hours=random.randint(0, 23),
                        minutes=random.randint(0, 59)
                    )).isoformat(),
                    'converted': converted,
                    'revenue': revenue
                }
                
                clicks_to_insert.append(click_data)
                total_clicks += 1
    
    # Insert all clicks
    if clicks_to_insert:
        await db.affiliate_clicks.insert_many(clicks_to_insert)
    
    print(f'✅ Inserted {total_clicks} affiliate clicks')
    print(f'📊 Statistics:')
    print(f'   Total Clicks: {total_clicks}')
    print(f'   Total Conversions: {total_conversions}')
    print(f'   Total Revenue: ${total_revenue:.2f}')
    print(f'   Conversion Rate: {(total_conversions/total_clicks*100):.1f}%')
    print(f'   Avg. Revenue per Conversion: ${(total_revenue/total_conversions):.2f}')
    
    # Show top partners
    print(f'\n🏆 Top Partners by Revenue:')
    partner_revenues = {}
    for click in clicks_to_insert:
        pid = click['partner_name']
        if pid not in partner_revenues:
            partner_revenues[pid] = 0
        partner_revenues[pid] += click['revenue']
    
    top_partners = sorted(partner_revenues.items(), key=lambda x: x[1], reverse=True)[:5]
    for idx, (name, revenue) in enumerate(top_partners, 1):
        print(f'   {idx}. {name}: ${revenue:.2f}')
    
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_affiliate_data())
