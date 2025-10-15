"""
Populate strains database from master_cannabis_database_v3.xlsx
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import openpyxl

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'nugl_database')

async def populate_strains():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print("🌿 Populating Strains database from Excel...")
    
    # Check if already populated
    count = await db.strains.count_documents({})
    if count > 0:
        print(f"⚠️  Strains already exist ({count} found).")
        response = input("Do you want to clear and repopulate? (yes/no): ")
        if response.lower() != 'yes':
            print("Skipping population.")
            client.close()
            return
        else:
            print("Clearing existing strains...")
            await db.strains.delete_many({})
    
    # Load Excel file
    wb = openpyxl.load_workbook('/app/master_cannabis_database_v3.xlsx')
    sheet = wb['Strains']
    
    # Get headers
    headers = [cell.value for cell in sheet[1]]
    
    # Process each strain
    strains_added = 0
    for row in sheet.iter_rows(min_row=2, values_only=True):
        # Create strain document
        strain_data = {}
        for i, value in enumerate(row):
            if value is not None and value != '':
                header = headers[i]
                strain_data[header] = value
        
        # Skip if no name
        if 'name' not in strain_data:
            continue
        
        # Create the strain document with proper structure for frontend
        strain_doc = {
            'id': strain_data.get('uuid', strain_data.get('strain_id', '')),
            'name': strain_data.get('name', ''),
            'aka': strain_data.get('aka', ''),
            'type': strain_data.get('type', 'hybrid'),
            'dominance': {
                'sativa_pct': strain_data.get('dominance_pct_sativa', 50),
                'indica_pct': strain_data.get('dominance_pct_indica', 50)
            },
            'cannabinoids': {
                'thc_min': strain_data.get('thc_min_pct', 0),
                'thc_max': strain_data.get('thc_max_pct', 0),
                'cbd_min': strain_data.get('cbd_min_pct', 0),
                'cbd_max': strain_data.get('cbd_max_pct', 0),
                'cbg_min': strain_data.get('cbg_min_pct', 0),
                'cbg_max': strain_data.get('cbg_max_pct', 0)
            },
            'terpenes': strain_data.get('terpenes_dominant', ''),
            'aroma_flavor': strain_data.get('aroma_flavor_notes', ''),
            'effects': {
                'primary': strain_data.get('effects_primary', ''),
                'secondary': strain_data.get('effects_secondary', '')
            },
            'medical_uses': strain_data.get('medical_uses_common', ''),
            'side_effects': strain_data.get('side_effects_common', ''),
            'lineage': {
                'parents': strain_data.get('lineage_parents', ''),
                'breeder': strain_data.get('breeder_or_origin', 'Unknown'),
                'origin_country': strain_data.get('origin_country', ''),
                'year': strain_data.get('first_reported_year', '')
            },
            'cultivation': {
                'difficulty': strain_data.get('cultivation_difficulty', 'medium'),
                'flowering_time_days': strain_data.get('flowering_time_days', 0),
                'yield_indoor_g_m2': strain_data.get('yield_indoor_g_m2', 0),
                'yield_outdoor_g_plant': strain_data.get('yield_outdoor_g_plant', 0),
                'height_indoor_cm': strain_data.get('height_indoor_cm', 0),
                'height_outdoor_cm': strain_data.get('height_outdoor_cm', 0),
                'photoperiod': strain_data.get('photoperiod', ''),
                'seed_types': strain_data.get('seed_types_available', ''),
                'grow_suitability': strain_data.get('grow_suitability', ''),
                'climate': strain_data.get('climate_preference', '')
            },
            'image': strain_data.get('image_url', ''),
            'availability': strain_data.get('legal_availability_regions', ''),
            'notes': strain_data.get('notes', ''),
            'data_confidence': strain_data.get('data_confidence', 'medium'),
            'source': strain_data.get('source_type', 'database'),
            'rating': 4.5  # Default rating
        }
        
        await db.strains.insert_one(strain_doc)
        strains_added += 1
        
        if strains_added % 20 == 0:
            print(f"  Added {strains_added} strains...")
    
    print(f"✅ Successfully inserted {strains_added} strains!")
    
    # Show breakdown
    sativa_count = await db.strains.count_documents({'type': 'sativa'})
    indica_count = await db.strains.count_documents({'type': 'indica'})
    hybrid_count = await db.strains.count_documents({'type': 'hybrid'})
    
    print(f"\nBreakdown:")
    print(f"  Sativa: {sativa_count}")
    print(f"  Indica: {indica_count}")
    print(f"  Hybrid: {hybrid_count}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_strains())
