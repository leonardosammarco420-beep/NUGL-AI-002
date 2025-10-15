"""
SPORES Products - Backend Order Management
Handles crypto payments, shipping, and order tracking
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone
from typing import Optional, List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Products Configuration
SPORES_PRODUCTS = {
    "raw_mushrooms": {
        "id": "raw_mushrooms",
        "name": "Raw Mushrooms",
        "price": 20.00,
        "quantity": "3g",
        "weight_grams": 3,
        "description": "Premium quality raw psilocybin mushrooms, carefully dried and packaged for optimal potency",
        "image": "https://images.unsplash.com/photo-1621104072639-83e37d4d7c4d?w=800",
        "in_stock": True
    },
    "capsules": {
        "id": "capsules",
        "name": "SPORES Capsules",
        "price": 15.00,
        "quantity": "1.3g per unit",
        "weight_grams": 1.3,
        "description": "Precisely measured capsules for consistent microdosing or therapeutic use",
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
        "in_stock": True
    },
    "gummies": {
        "id": "gummies",
        "name": "SPORES Gummies",
        "price": 25.00,
        "quantity": "3g",
        "weight_grams": 5,  # Including gummy weight
        "description": "Delicious fruit-flavored gummies with precisely measured psilocybin content",
        "image": "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800",
        "in_stock": True
    },
    "chocolates": {
        "id": "chocolates",
        "name": "SPORES Chocolates",
        "price": 25.00,
        "quantity": "3g",
        "weight_grams": 10,  # Including chocolate weight
        "description": "Premium Belgian dark chocolate bars infused with therapeutic psilocybin",
        "image": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
        "in_stock": True
    }
}

# Crypto Configuration
PAYMENT_WALLET_ADDRESS = "0x93F70DE9778F13304496801692aefC584e4d9120"

SUPPORTED_CHAINS = {
    "ethereum": {
        "chain_id": 1,
        "name": "Ethereum",
        "currency": "ETH",
        "rpc_url": "https://eth.llamarpc.com",
        "explorer": "https://etherscan.io",
        "decimals": 18
    },
    "polygon": {
        "chain_id": 137,
        "name": "Polygon",
        "currency": "MATIC",
        "rpc_url": "https://polygon-rpc.com",
        "explorer": "https://polygonscan.com",
        "decimals": 18
    },
    "bsc": {
        "chain_id": 56,
        "name": "BNB Chain",
        "currency": "BNB",
        "rpc_url": "https://bsc-dataseed.binance.org",
        "explorer": "https://bscscan.com",
        "decimals": 18
    }
}

# Shipping Origin (Kingston, Jamaica)
SHIPPING_ORIGIN = {
    "name": "SPORES Distribution Center",
    "street": "123 Cannabis Avenue",
    "city": "Kingston",
    "state": "Kingston Parish",
    "postal_code": "JMAKN01",
    "country": "JM",
    "phone": "+1876-555-0100"
}

async def initialize_products():
    """Initialize products in database"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Initializing SPORES products...")
    
    # Clear existing products
    await db.spores_products.delete_many({})
    
    # Insert products
    products_list = list(SPORES_PRODUCTS.values())
    await db.spores_products.insert_many(products_list)
    
    print(f"✅ Initialized {len(products_list)} SPORES products")
    
    # Verify
    for product in products_list:
        print(f"   - {product['name']}: ${product['price']} ({product['quantity']})")

if __name__ == "__main__":
    asyncio.run(initialize_products())
