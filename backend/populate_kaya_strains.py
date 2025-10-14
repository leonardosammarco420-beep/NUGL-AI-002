"""
Populate Kaya Herb House strains from menu data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'nugl_database')

# Kaya Strains from April 2022 Menu
kaya_strains = [
    # Sativa Dominant
    {
        "name": "Kingston Lemon Skunk",
        "type": "Sativa",
        "thc": 16,
        "cbd": 0,
        "effects": ["Energetic", "Creative", "Sociable"],
        "flavors": ["Lemon", "Citrus", "Skunk"],
        "description": "A classic Jamaican sativa with energizing effects perfect for daytime use.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Golden Back Gorilla",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Happy", "Uplifted", "Euphoric", "Creative"],
        "flavors": ["Citrus", "Diesel", "Lemon"],
        "description": "Uplifting hybrid with potent effects and citrus diesel aroma.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Bali Hai",
        "type": "Sativa",
        "thc": 18,
        "cbd": 0,
        "effects": ["Relaxed", "Creative", "Uplifted"],
        "flavors": ["Citrus", "Lemon", "Earthy"],
        "description": "Smooth sativa with balanced effects, great for creativity.",
        "source": "Kaya Herb House",
        "rating": 4.5
    },
    {
        "name": "Black Starline",
        "type": "Sativa",
        "thc": 18,
        "cbd": 0,
        "effects": ["Relaxed", "Happy", "Euphoric", "Creative"],
        "flavors": ["Grapefruit", "Citrus", "Diesel"],
        "description": "Euphoric sativa with grapefruit notes and creative inspiration.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Stan Digidi",
        "type": "Hybrid",
        "thc": 22,
        "cbd": 0,
        "effects": ["Relaxed", "Creative", "Euphoric", "Happy"],
        "flavors": ["Earthy", "Citrus", "Tropical"],
        "description": "Potent Jamaican hybrid with tropical flavors and strong effects.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Kaya Haze",
        "type": "Hybrid",
        "thc": 19,
        "cbd": 0,
        "effects": ["Euphoric", "Happy", "Uplifted", "Creative"],
        "flavors": ["Sweet", "Citrus", "Tropical"],
        "description": "Signature Kaya strain with sweet tropical notes and uplifting effects.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Island Girl",
        "type": "Hybrid",
        "thc": 18,
        "cbd": 0,
        "effects": ["Relaxed", "Euphoric", "Happy", "Uplifted"],
        "flavors": ["Citrus", "Wood", "Orange"],
        "description": "Smooth Jamaican hybrid with citrus wood flavors.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    
    # Hybrid Dominant
    {
        "name": "Lemon Peppa",
        "type": "Hybrid",
        "thc": 21,
        "cbd": 0,
        "effects": ["Uplifted", "Happy", "Euphoric", "Creative"],
        "flavors": ["Citrus", "Lemon", "Earthy"],
        "description": "Zesty hybrid with strong lemon flavor and creative boost.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "White Fyah OG",
        "type": "Hybrid",
        "thc": 21,
        "cbd": 0,
        "effects": ["Relaxed", "Energetic"],
        "flavors": ["Lemon", "Pungent", "Earthy"],
        "description": "Balanced hybrid with pungent lemon notes and dual effects.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Maestro",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Happy", "Euphoric", "Uplifted", "Relaxed", "Energetic"],
        "flavors": ["Pineapple", "Lavender", "Strawberry"],
        "description": "Complex hybrid with fruity flavors and well-rounded effects.",
        "source": "Kaya Herb House",
        "rating": 4.9
    },
    {
        "name": "Mangonani",
        "type": "Hybrid",
        "thc": 17,
        "cbd": 0,
        "effects": ["Happy", "Talkative", "Relaxed", "Uplifted"],
        "flavors": ["Mango", "Sweet", "Earthy"],
        "description": "Social hybrid with delicious mango sweetness.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Ochi Lemon",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Happy", "Uplifted", "Euphoric", "Creative"],
        "flavors": ["Earthy", "Berry", "Pungent"],
        "description": "Ocho Rios special with berry notes and uplifting vibes.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Tropical Frost",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Happy", "Euphoric", "Relaxed", "Uplifted"],
        "flavors": ["Grape", "Mint", "Pine"],
        "description": "Refreshing hybrid with grape mint flavors and chill effects.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Jamaica Skunk",
        "type": "Hybrid",
        "thc": 13,
        "cbd": 0,
        "effects": ["Happy", "Creative", "Relaxed", "Hungry"],
        "flavors": ["Nutty", "Sweet", "Earthy"],
        "description": "Classic Jamaican strain with nutty sweet profile.",
        "source": "Kaya Herb House",
        "rating": 4.5
    },
    {
        "name": "Kurple",
        "type": "Hybrid",
        "thc": 22,
        "cbd": 0,
        "effects": ["Happy", "Energetic", "Focused", "Talkative"],
        "flavors": ["Sweet", "Earthy", "Grape"],
        "description": "Potent purple hybrid with grape sweetness and energizing focus.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Ganjie",
        "type": "Hybrid",
        "thc": 19,
        "cbd": 0,
        "effects": ["Focused", "Relaxed", "Happy", "Hungry"],
        "flavors": ["Citrus", "Pine", "Earthy"],
        "description": "Focusing hybrid with pine citrus notes.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Purple Chem D.O.G",
        "type": "Hybrid",
        "thc": 19,
        "cbd": 0,
        "effects": ["Energetic", "Focused", "Talkative", "Relaxed"],
        "flavors": ["Berry", "Lavender", "Earthy"],
        "description": "Chem Dog variant with purple berry lavender notes.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Ranking Kush",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Uplifted", "Euphoric", "Creative", "Relaxed"],
        "flavors": ["Earthy", "Berry", "Pungent"],
        "description": "Top-shelf kush with earthy berry profile.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Jah Jah Popcorn",
        "type": "Hybrid",
        "thc": 21,
        "cbd": 0,
        "effects": ["Euphoric", "Uplifted", "Happy", "Creative"],
        "flavors": ["Cheese", "Skunk", "Berry"],
        "description": "Unique popcorn strain with cheesy berry notes.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    
    # Indica Dominant
    {
        "name": "Grape Escape",
        "type": "Hybrid",
        "thc": 22,
        "cbd": 0,
        "effects": ["Mellow", "Sleepy", "Carefree", "Relaxed", "Happy"],
        "flavors": ["Grape", "Sweet", "Earthy"],
        "description": "Deeply relaxing grape strain perfect for evening use.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Gorilla Glue #4",
        "type": "Hybrid",
        "thc": 25,
        "cbd": 0,
        "effects": ["Relaxed", "Euphoric", "Happy", "Uplifted", "Sleepy"],
        "flavors": ["Earthy", "Pungent", "Pine"],
        "description": "Famous strain with powerful glue-like potency and pine notes.",
        "source": "Kaya Herb House",
        "rating": 4.9
    },
    {
        "name": "Ms. Landlord",
        "type": "Hybrid",
        "thc": 19,
        "cbd": 0,
        "effects": ["Relaxed", "Euphoric", "Creative", "Happy", "Uplifted"],
        "flavors": ["Pine", "Pungent", "Earthy"],
        "description": "Strong hybrid with landlord-quality pine punch.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Unruly",
        "type": "Hybrid",
        "thc": 20,
        "cbd": 0,
        "effects": ["Happy", "Relaxed", "Euphoric", "Uplifted", "Hungry"],
        "flavors": ["Flowers", "Sweet", "Earthy"],
        "description": "Wild Jamaican hybrid with floral sweetness and munchies.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Romulan",
        "type": "Indica",
        "thc": 20,
        "cbd": 0,
        "effects": ["Euphoric", "Uplifted", "Sleepy"],
        "flavors": ["Earthy", "Pine", "Sweet"],
        "description": "Classic indica with out-of-this-world sedative effects.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Lemon Fruit Chews",
        "type": "Indica",
        "thc": 20,
        "cbd": 0,
        "effects": ["Relaxed", "Creative", "Happy"],
        "flavors": ["Lemon", "Diesel", "Citrus"],
        "description": "Candy-like indica with lemon diesel sweetness.",
        "source": "Kaya Herb House",
        "rating": 4.6
    },
    {
        "name": "Sting A Ling",
        "type": "Indica",
        "thc": 20,
        "cbd": 0,
        "effects": ["Relaxed", "Euphoric", "Uplifted", "Sleepy"],
        "flavors": ["Earthy", "Pungent", "Pine"],
        "description": "Potent indica with strong pine punch and sleepy vibes.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "9LB Hammer",
        "type": "Indica",
        "thc": 19,
        "cbd": 0,
        "effects": ["Relaxed", "Sleepy", "Euphoric", "Happy", "Tingly"],
        "flavors": ["Earthy", "Sweet", "Pungent"],
        "description": "Heavy-hitting indica that knocks you out like a hammer.",
        "source": "Kaya Herb House",
        "rating": 4.8
    },
    {
        "name": "Chem D.O.G",
        "type": "Indica",
        "thc": 27,
        "cbd": 0,
        "effects": ["Relaxed", "Sleepy", "Happy", "Euphoric", "Hungry"],
        "flavors": ["Earthy", "Mango", "Lavender"],
        "description": "Ultra-potent indica at 27% THC with mango lavender notes.",
        "source": "Kaya Herb House",
        "rating": 4.9
    },
    {
        "name": "Jah Cures",
        "type": "Hybrid",
        "thc": 5,
        "cbd": 10,
        "effects": ["Focused", "Uplifted", "Happy", "Energetic"],
        "flavors": ["Earthy", "Wood", "Sweet"],
        "description": "Medical strain with 1:2 THC:CBD ratio for therapeutic use.",
        "source": "Kaya Herb House",
        "rating": 4.7
    },
    {
        "name": "Cherry CBD",
        "type": "High CBD",
        "thc": 1,
        "cbd": 19,
        "effects": ["Pain Relief", "Anxiety Relief", "Anti-Epileptic"],
        "flavors": ["Earthy", "Wood", "Sweet"],
        "description": "High CBD strain for pain, anxiety, epilepsy, and MS relief.",
        "source": "Kaya Herb House",
        "rating": 4.8
    }
]

async def populate_strains():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    collection = db['strains']
    
    # Clear existing strains
    await collection.delete_many({})
    
    # Insert Kaya strains
    result = await collection.insert_many(kaya_strains)
    
    print(f"✅ Inserted {len(result.inserted_ids)} Kaya Herb House strains")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_strains())
