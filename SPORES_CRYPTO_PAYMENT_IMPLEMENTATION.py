"""
SPORES Psychedelic Products - Crypto Payment System Implementation Guide

This system integrates:
1. Multi-chain crypto payments (ETH, Polygon, BSC)
2. Shopping cart functionality
3. DHL/FedEx shipping calculation
4. Order management
5. Payment verification

Wallet Address: 0x93F70DE9778F13304496801692aefC584e4d9120
"""

# PRODUCTS PRICING (Tax Included)
products = {
    "raw_mushrooms": {
        "name": "Raw Mushrooms",
        "price_usd": 20.00,
        "quantity": "3g",
        "description": "Premium quality raw psilocybin mushrooms, carefully dried and packaged"
    },
    "capsules": {
        "name": "SPORES Capsules",
        "price_usd": 15.00,
        "quantity": "1.3g per unit",
        "description": "Precisely measured capsules for consistent dosing"
    },
    "gummies": {
        "name": "SPORES Gummies",
        "price_usd": 25.00,
        "quantity": "3g",
        "description": "Delicious fruit-flavored gummies with measured psilocybin content"
    },
    "chocolates": {
        "name": "SPORES Chocolates",
        "price_usd": 25.00,
        "quantity": "3g",
        "description": "Premium dark chocolate bars infused with psilocybin"
    }
}

# SUPPORTED CHAINS
chains = {
    "ethereum": {
        "chain_id": 1,
        "name": "Ethereum Mainnet",
        "rpc_url": "https://eth.llamarpc.com",
        "explorer": "https://etherscan.io",
        "currency": "ETH",
        "decimals": 18
    },
    "polygon": {
        "chain_id": 137,
        "name": "Polygon",
        "rpc_url": "https://polygon-rpc.com",
        "explorer": "https://polygonscan.com",
        "currency": "MATIC",
        "decimals": 18
    },
    "bsc": {
        "chain_id": 56,
        "name": "BNB Smart Chain",
        "rpc_url": "https://bsc-dataseed.binance.org",
        "explorer": "https://bscscan.com",
        "currency": "BNB",
        "decimals": 18
    }
}

# PAYMENT WALLET
PAYMENT_WALLET = "0x93F70DE9778F13304496801692aefC584e4d9120"

# REQUIRED BACKEND INTEGRATIONS
"""
1. DHL Express API Credentials:
   - Sign up at: https://developer.dhl.com
   - DHL_API_KEY
   - DHL_API_SECRET
   - DHL_ACCOUNT_NUMBER
   
2. FedEx API Credentials:
   - Sign up at: https://developer.fedex.com
   - FEDEX_API_KEY (Client ID)
   - FEDEX_SECRET_KEY (Client Secret)
   - FEDEX_ACCOUNT_NUMBER

3. Crypto Price Oracle (for USD conversion):
   - Use CoinGecko API (free): https://www.coingecko.com/en/api
   - Or Chainlink Price Feeds (on-chain)
   
4. Email Service (for order notifications):
   - SendGrid or similar
   - SENDGRID_API_KEY
"""

# IMPLEMENTATION STEPS
"""
Step 1: Backend Setup
- Install dependencies: web3, httpx, fastapi
- Create order management database collection
- Implement shipping rate calculation
- Create payment verification endpoint

Step 2: Frontend Shopping Cart
- Add to cart functionality
- Cart state management
- Quantity selection
- Subtotal calculation

Step 3: Checkout Page
- Shipping address form
- Shipping method selection (DHL/FedEx)
- Real-time shipping cost calculation
- Payment chain selection

Step 4: MetaMask Payment Integration
- Connect wallet button
- Chain switching
- Transaction building
- Payment confirmation

Step 5: Order Management
- Order status tracking
- DHL/FedEx tracking integration
- Email notifications
- Admin dashboard
"""

# DATABASE SCHEMA
order_schema = {
    "order_id": "uuid",
    "customer_email": "string",
    "shipping_address": {
        "name": "string",
        "street": "string",
        "city": "string",
        "state": "string",
        "postal_code": "string",
        "country": "string",
        "phone": "string"
    },
    "items": [
        {
            "product_id": "string",
            "product_name": "string",
            "quantity": "integer",
            "price_usd": "float"
        }
    ],
    "subtotal_usd": "float",
    "shipping_cost_usd": "float",
    "total_usd": "float",
    "payment": {
        "chain": "string",
        "currency": "string",
        "amount": "float",
        "tx_hash": "string",
        "wallet_address": "string",
        "confirmed": "boolean"
    },
    "shipping": {
        "carrier": "string",  # DHL or FedEx
        "service": "string",
        "tracking_number": "string",
        "estimated_delivery": "date"
    },
    "status": "string",  # pending_payment, paid, shipped, delivered
    "created_at": "datetime",
    "updated_at": "datetime"
}

# NEXT STEPS - FILES TO CREATE:
"""
Backend Files:
1. /app/backend/services/crypto_payment_service.py - Payment verification
2. /app/backend/services/shipping_service.py - DHL/FedEx integration
3. /app/backend/routes/orders.py - Order management endpoints
4. /app/backend/models/order.py - Order Pydantic models

Frontend Files:
1. /app/frontend/src/contexts/CartContext.js - Shopping cart state
2. /app/frontend/src/pages/CheckoutPage.js - Checkout flow
3. /app/frontend/src/components/ShoppingCart.js - Cart component
4. /app/frontend/src/hooks/useMetaMask.js - Web3 integration
5. /app/frontend/src/pages/OrderConfirmationPage.js - Post-payment
6. Update /app/frontend/src/pages/PsychedelicsPage.js - Add "Add to Cart" buttons
"""

print("SPORES Crypto Payment System - Implementation Guide Created!")
print(f"Payment Wallet: {PAYMENT_WALLET}")
print("\nProducts:")
for key, product in products.items():
    print(f"  - {product['name']}: ${product['price_usd']} ({product['quantity']})")
print("\nSupported Chains:")
for key, chain in chains.items():
    print(f"  - {chain['name']} ({chain['currency']})")
