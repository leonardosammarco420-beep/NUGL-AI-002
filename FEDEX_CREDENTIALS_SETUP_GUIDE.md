# FedEx API Credentials Setup Guide

## Step 1: Login to FedEx Developer Portal
URL: https://developer.fedex.com
Username: thedigitalgreenhouse@gmail.com
Password: Onelove1@#$

## Step 2: Get Your API Credentials

After logging in:

1. Go to **"My Projects"** or **"Projects"** in the navigation
2. If you don't have a project, click **"Create Project"**
   - Project Name: "NUGL SPORES Shipping"
   - Description: "E-commerce shipping integration for psychedelic products"
   
3. In your project, go to **"Production"** or **"Test"** section

4. You'll see:
   - **API Key (Client ID)**: Copy this (example format: l7xx1234567890abcdef...)
   - **Secret Key (Client Secret)**: Copy this (example format: 1234567890abcdef...)
   
5. Also find your **FedEx Account Number** (9-digit number)

## Step 3: Enable Required APIs

Make sure these APIs are enabled in your project:
- ✅ **Rate API** (for shipping quotes)
- ✅ **Track API** (for package tracking)
- ✅ **Authorization API** (for OAuth tokens)

## Step 4: Provide These Values

Once you have them, provide:
```
FEDEX_API_KEY=l7xx...
FEDEX_SECRET_KEY=...
FEDEX_ACCOUNT_NUMBER=123456789
```

## Step 5: Test vs Production

- **Test Environment**: Use sandbox credentials for testing (no real charges)
- **Production Environment**: Use production credentials for live orders

---

**Note:** The username/password are for logging into the portal. The API Key/Secret are what we use in the code to make API calls.

## What I'll Build Once You Provide Credentials:

### Backend:
1. Crypto payment verification system
2. FedEx & DHL shipping rate calculation
3. Real-time package tracking
4. Order management system
5. Email notifications
6. Payment webhook handlers

### Frontend:
1. Shopping cart with MetaMask
2. Multi-chain payment (ETH, Polygon, BSC)
3. Checkout with shipping calculator
4. Order tracking page
5. Admin dashboard

### Features:
- 🛒 Add SPORES products to cart
- 📦 Real-time shipping quotes
- 💰 Pay with crypto on 3 chains
- 📍 Track orders with DHL/FedEx
- 📧 Email confirmations
- 🔐 Payment verification
- 📊 Order history

**Please get the API Key, Secret Key, and Account Number from the portal and I'll implement the complete system!**
