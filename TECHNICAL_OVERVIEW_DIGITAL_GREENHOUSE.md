# 🌿 THE DIGITAL GREENHOUSE® - TECHNICAL OVERVIEW

**Tagline:** Where Cannabis Culture Meets Crypto Innovation and AI Intelligence

**Version:** 1.0  
**Last Updated:** October 15, 2025  
**Platform URL:** nugl.com  
**Tech Stack:** FastAPI + React + MongoDB

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Core Features](#core-features)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Integrations](#integrations)
8. [Payment Systems](#payment-systems)
9. [Security & Compliance](#security--compliance)
10. [Deployment & Infrastructure](#deployment--infrastructure)
11. [Affiliate Monetization](#affiliate-monetization)
12. [Future Roadmap](#future-roadmap)

---

## 1. EXECUTIVE SUMMARY

The Digital Greenhouse is a comprehensive cannabis, crypto, and psychedelics platform combining:
- **News aggregation** from 20+ global sources
- **NFT marketplace** for cannabis-themed digital art
- **Crypto casino affiliate** marketplace
- **Cannabis strain database** (157+ strains with detailed genetics)
- **Global dispensary directory** (55 locations across 8 countries)
- **Seed bank affiliate** network
- **Psychedelics e-commerce** with crypto payments
- **AI-powered chatbot** for cannabis information
- **Social hub** for community engagement
- **Investor relations** portal

### Key Metrics:
- **Total Affiliates:** 19+ partners
- **Revenue Streams:** 8 distinct channels
- **Global Reach:** 8 countries
- **Content Items:** 157 strains, 91 press releases, 26 media articles, 12 NFTs
- **Supported Cryptocurrencies:** ETH, MATIC, BNB

---

## 2. SYSTEM ARCHITECTURE

### 2.1 Architecture Pattern
**Type:** Full-Stack Web Application  
**Pattern:** RESTful API Architecture  
**Deployment:** Kubernetes Containerized Environment

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  React SPA (Port 3000) + MetaMask + Web3.js            │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ HTTPS/REST API
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 API GATEWAY LAYER                       │
│  Kubernetes Ingress (Nginx) - Route /api/* → :8001     │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │
┌─────────────────────▼───────────────────────────────────┐
│              BACKEND LAYER (FastAPI)                    │
│  • RESTful API Server (Port 8001)                      │
│  • Authentication & Authorization                       │
│  • Business Logic & Services                           │
│  • Payment Processing                                  │
│  • Shipping Integration (FedEx/DHL)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼─────┐ ┌────▼────┐ ┌─────▼──────┐
│  MongoDB    │ │ FedEx   │ │ External   │
│  Database   │ │ API     │ │ APIs       │
│  (Primary)  │ │ (Ship)  │ │ (News/RSS) │
└─────────────┘ └─────────┘ └────────────┘
```

### 2.2 Service Communication

**Frontend → Backend:**
- Base URL: `REACT_APP_BACKEND_URL` (from .env)
- All API routes prefixed with `/api`
- Authentication: JWT tokens (wallet-based)

**Backend → Database:**
- MongoDB connection: `MONGO_URL` (from .env)
- Async operations via Motor (async MongoDB driver)
- Connection pooling enabled

**Backend → External Services:**
- FedEx API (shipping)
- DHL API (shipping - future)
- RSS feeds (news aggregation)
- Blockchain RPC nodes (payment verification)

---

## 3. TECHNOLOGY STACK

### 3.1 Backend

**Framework:** FastAPI 0.104.1
- **Why:** High performance, async support, automatic API documentation
- **Language:** Python 3.11+
- **ASGI Server:** Uvicorn with auto-reload (development)

**Key Dependencies:**
```python
fastapi==0.104.1           # Core framework
motor==3.3.1               # Async MongoDB driver
pydantic==2.4.2            # Data validation
httpx==0.25.0              # Async HTTP client
python-dotenv==1.0.0       # Environment variables
web3==6.11.1               # Ethereum/Web3 integration
feedparser==6.0.10         # RSS feed parsing
```

**Data Validation:** Pydantic v2
- Request/response models
- Environment variable validation
- Type safety enforcement

**Database Driver:** Motor (AsyncIOMotorClient)
- Async operations for high concurrency
- Connection pooling
- Automatic ObjectId handling

### 3.2 Frontend

**Framework:** React 18.2.0
- **Build Tool:** Create React App
- **Language:** JavaScript (ES6+)
- **Package Manager:** Yarn (required - npm breaks compatibility)

**Key Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "axios": "^1.5.1",
  "web3": "^4.2.0",
  "@tanstack/react-query": "^5.0.0",
  "tailwindcss": "^3.3.3",
  "lucide-react": "^0.263.1"
}
```

**UI Framework:** Tailwind CSS + Shadcn UI
- Utility-first CSS
- Custom component library
- Responsive design system

**State Management:**
- React Context API (global state)
- React Query (server state)
- Local state (useState/useReducer)

**Web3 Integration:**
- MetaMask connection
- Multi-chain support (Ethereum, Polygon, BSC)
- Transaction signing
- Wallet address management

### 3.3 Database

**Database:** MongoDB 7.0+
- **Type:** NoSQL Document Database
- **Driver:** Motor (async)
- **Connection:** Single database instance

**Collections:** 15 total
1. `news` - News articles
2. `press_releases` - Press room content
3. `strains` - Cannabis strain database
4. `nfts` - NFT marketplace items
5. `dispensaries` - Global dispensary directory
6. `media_articles` - Media content
7. `affiliate_partners` - Affiliate program data
8. `affiliate_clicks` - Click tracking
9. `affiliate_conversions` - Conversion tracking
10. `spores_products` - Psychedelics products
11. `orders` - E-commerce orders
12. `users` - User accounts
13. `wallet_sessions` - Wallet authentication
14. `investor_updates` - IR content
15. `social_posts` - Social hub posts

**Data Storage Strategy:**
- UUID primary keys (no ObjectId serialization issues)
- ISO datetime strings (timezone-aware)
- Embedded documents for nested data
- Indexes on frequently queried fields

### 3.4 Infrastructure

**Deployment:** Kubernetes Cluster
- **Container Runtime:** Docker
- **Process Manager:** Supervisord
- **Reverse Proxy:** Nginx (Kubernetes Ingress)

**Environment:**
- **OS:** Linux (container)
- **Backend Port:** 8001 (internal)
- **Frontend Port:** 3000 (internal)
- **External Access:** Via Kubernetes ingress

**Service Management:**
```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
sudo supervisorctl restart all
```

**Hot Reload:** Enabled for development
- Frontend: React hot reload
- Backend: FastAPI auto-reload

---

## 4. CORE FEATURES

### 4.1 News Aggregation

**Sources:** 20 RSS feeds
- Cannabis: Marijuana Moment, Leafly, Cannabis Tech
- Crypto: CoinDesk, Cointelegraph, Decrypt
- AI/Tech: VentureBeat, AI News
- Financial: Bloomberg, MarketWatch, Yahoo Finance
- International: BBC, NYT, Al Jazeera
- Jamaica: 5 local sources

**Categories:**
- Cannabis
- Crypto
- Psychedelics
- AI & Technology
- Finance
- International

**Features:**
- Real-time RSS parsing
- Automatic categorization
- Sentiment analysis
- Duplicate detection
- Image extraction
- SEO optimization

### 4.2 Cannabis Strain Database

**Total Strains:** 157+  
**Data Source:** Excel database (master_cannabis_database_v3.xlsx)

**Strain Information:**
- Name, type (Indica/Sativa/Hybrid)
- THC/CBD percentages
- Terpene profile
- Effects (list)
- Medical benefits
- Growing difficulty
- Flowering time
- Yield information
- Lineage/genetics
- Description

**Features:**
- Advanced search & filtering
- Type-based categorization
- Effect-based recommendations
- Affiliate seed bank links
- Image gallery
- User reviews (planned)

### 4.3 Global Dispensary Directory

**Coverage:** 8 countries, 55 locations

**Countries:**
1. Jamaica (3) - Herb Houses
2. Netherlands (3) - Coffeeshops
3. Thailand (3) - Dispensaries
4. United States (3) - Dispensaries
5. Canada (3) - Cannabis Stores
6. **Germany (13)** - Cannabis Social Clubs
7. **Australia (3)** - Medical Clinics
8. **Spain (20)** - Cannabis Social Clubs

**Each Location Includes:**
- Name & location
- Full address
- Phone number
- Website URL
- Operating hours
- Description
- Rating
- Google Maps link
- Featured status

**Features:**
- Interactive map
- Search by country/city
- Filter by type
- Google Maps integration
- Click-to-call
- Direct website links

### 4.4 Seed Bank Affiliate Network

**Partners:** 8 seed banks
1. **Herbies Headshop (Global)** ✅ ACTIVE
2. **Herbies Headshop USA** ✅ ACTIVE
3. Tyson 2.0 (Featured)
4. Royal Queen Seeds (Featured)
5. Seedsman
6. ILGM
7. Barney's Farm
8. Crop King Seeds
9. Sensi Seeds
10. Fast Buds

**Features:**
- Detailed bank profiles
- Pros/cons analysis
- Top strains list
- Shipping information
- Payment methods
- Affiliate link tracking
- Commission: 10-15%

### 4.5 Crypto Casino Marketplace

**Active Partners:** 3 casinos
1. **Stake Casino** ✅ ACTIVE
   - Commission: 40% revenue share + $200 CPA
   - Link: stake.com/?c=digitalgreenhouse
   
2. **BC.Game** ✅ ACTIVE
   - Commission: 45% revenue share + $150 CPA
   - Link: bc.game/i-441vun5xg-n/
   
3. **Roobet** ✅ ACTIVE
   - Commission: 35% revenue share
   - Link: roobet.com/?ref=digitalgreenhou

**Features:**
- Casino ratings & reviews
- Bonus information
- Game selection details
- Supported cryptocurrencies
- Payout speed indicators
- Branded logos
- Affiliate link tracking
- NO commission disclosure (customer-facing)

### 4.6 NFT Marketplace

**Collection:** 12 cannabis-themed NFTs

**NFT Categories:**
- Cannabis Leaves
- Psychedelic Art
- Strain-inspired designs
- Community creations

**Features:**
- OpenSea integration
- Rarible integration
- 10% creator royalties
- Ethereum & Polygon support
- Gallery view
- Artist profiles

### 4.7 Psychedelics E-Commerce (SPORES)

**Products:** 4 items
1. **Raw Mushrooms** - $20 (3g)
2. **SPORES Capsules** - $15 (1.3g)
3. **SPORES Gummies** - $25 (3g)
4. **SPORES Chocolates** - $25 (3g)

**Payment System:**
- Multi-chain crypto (ETH, Polygon, BNB)
- MetaMask integration
- Direct wallet transfer
- Payment wallet: `0x93F70DE9778F13304496801692aefC584e4d9120`

**Shipping:**
- Origin: Kingston, Jamaica
- FedEx integration ✅
- DHL integration (planned)
- Real-time rate calculation
- International tracking

**Order Management:**
- Order tracking
- Email notifications
- Admin dashboard
- Status updates

### 4.8 Media Content Hub

**Categories:** 6 sections
1. NUGL TV (2 articles)
2. Business (5 articles)
3. Culture (6 articles)
4. Grow Products (6 articles)
5. Wellness (5 articles)
6. Events (2 articles)

**Total Articles:** 26 from nugl.com

**Features:**
- Category filtering
- Featured images
- Subcategory tags
- External links to nugl.com
- SEO optimization

### 4.9 Press Room

**Content:** 91 press releases
- Company announcements
- Partnership news
- Product launches
- Industry updates

**Features:**
- Date-sorted display
- Search functionality
- Category filtering
- Social sharing
- RSS feed

### 4.10 Investor Relations

**Content:**
- Live ticker prices (updated Oct 2025)
- Cannabis stocks (TLRY, CGC, SNDL, ACB, CRON)
- Psychedelic stocks (CMPS, CYBN, MNMD, Numinus, FTRP)
- Gold, S&P 500, Dow, NASDAQ
- Company presentations
- Financial reports
- Contact information

### 4.11 AI Chatbot

**Functionality:**
- Cannabis information
- Strain recommendations
- Dosing guidance
- Legal information
- Product suggestions

**Integration:** (Planned)
- GPT-5 or Claude Sonnet 4
- Emergent LLM key support
- Context-aware responses

### 4.12 Social Hub

**Features:**
- Community posts
- User profiles
- Comments & discussions
- Content sharing
- Engagement tracking

---

## 5. DATABASE SCHEMA

### 5.1 Collections Overview

#### News Articles
```javascript
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "category": "string",
  "image_url": "string",
  "source_url": "string",
  "published_date": "ISO datetime",
  "sentiment": "positive|neutral|negative"
}
```

#### Cannabis Strains
```javascript
{
  "id": "uuid",
  "name": "string",
  "type": "indica|sativa|hybrid",
  "thc_percentage": "float",
  "cbd_percentage": "float",
  "effects": ["array of strings"],
  "medical_benefits": ["array"],
  "terpenes": ["array"],
  "description": "string",
  "flowering_time": "string",
  "difficulty": "easy|medium|hard",
  "yield": "string",
  "genetics": "string",
  "image_url": "string",
  "affiliate_links": ["array"]
}
```

#### Dispensaries
```javascript
{
  "id": "uuid",
  "name": "string",
  "location": "city, country",
  "address": "string",
  "country_code": "string",
  "type": "dispensary|coffeeshop|social_club|medical",
  "phone": "string",
  "website": "string",
  "hours": "string",
  "description": "string",
  "rating": "float",
  "featured": "boolean",
  "google_maps_link": "string"
}
```

#### Affiliate Partners
```javascript
{
  "id": "uuid",
  "name": "string",
  "category": "string",
  "tab": "Seeds|Crypto Casino|Dispensaries|Psychedelics",
  "type": "seed_wholesaler|casino|dispensary|retail",
  "partner_type": "string",
  "status": "active|pending|paused",
  "affiliate_link": "string",
  "tracking_code": "string",
  "commission_rate": "float",
  "commission_type": "percentage|revenue_share|per_lead",
  "cookie_duration_days": "integer",
  "payment_terms": "string",
  "minimum_payout": "float",
  "total_clicks": "integer",
  "total_conversions": "integer",
  "total_revenue": "float",
  "total_commission": "float",
  "created_at": "ISO datetime"
}
```

#### SPORES Products
```javascript
{
  "id": "string",
  "name": "string",
  "price": "float",
  "quantity": "string",
  "weight_grams": "float",
  "description": "string",
  "image": "string",
  "in_stock": "boolean"
}
```

#### Orders
```javascript
{
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
  "items": [{
    "product_id": "string",
    "product_name": "string",
    "quantity": "integer",
    "price_usd": "float"
  }],
  "subtotal_usd": "float",
  "shipping_cost_usd": "float",
  "total_usd": "float",
  "payment": {
    "chain": "ethereum|polygon|bsc",
    "currency": "ETH|MATIC|BNB",
    "amount": "float",
    "tx_hash": "string",
    "wallet_address": "string",
    "confirmed": "boolean"
  },
  "shipping": {
    "carrier": "FedEx|DHL",
    "service": "string",
    "tracking_number": "string",
    "estimated_delivery": "date"
  },
  "status": "pending_payment|paid|shipped|delivered",
  "created_at": "ISO datetime",
  "updated_at": "ISO datetime"
}
```

### 5.2 Indexing Strategy

**Performance Indexes:**
```javascript
// Frequently queried fields
db.news.createIndex({ "category": 1, "published_date": -1 })
db.strains.createIndex({ "name": "text", "type": 1 })
db.dispensaries.createIndex({ "country_code": 1, "featured": -1 })
db.affiliate_partners.createIndex({ "status": 1, "tab": 1 })
db.orders.createIndex({ "customer_email": 1, "status": 1 })
db.orders.createIndex({ "payment.tx_hash": 1 })
```

---

## 6. API ENDPOINTS

### 6.1 Base Configuration
- **Base URL:** Environment variable `REACT_APP_BACKEND_URL`
- **Prefix:** All routes start with `/api`
- **Format:** JSON
- **Authentication:** JWT tokens (optional for most endpoints)

### 6.2 News & Content

```
GET  /api/news
     Query params: ?category=string&limit=int
     Returns: List of news articles

GET  /api/press-releases
     Returns: List of press releases

POST /api/press-releases
     Body: PressRelease model
     Returns: Created release

GET  /api/media
     Query params: ?category=string&subcategory=string
     Returns: List of media articles
```

### 6.3 Cannabis Data

```
GET  /api/strains
     Query params: ?search=string&type=string
     Returns: List of cannabis strains (all 157)

GET  /api/strains/{strain_id}
     Returns: Detailed strain information

GET  /api/dispensaries
     Query params: ?country=string
     Returns: List of dispensaries

GET  /api/ticker
     Returns: Current stock/commodity prices
```

### 6.4 NFT Marketplace

```
GET  /api/nfts
     Query params: ?category=string
     Returns: List of NFTs

GET  /api/nfts/{nft_id}
     Returns: NFT details
```

### 6.5 Affiliate System

```
GET  /api/affiliate/partners
     Query params: ?status=string&tab=string
     Returns: List of affiliate partners

POST /api/affiliate/track-click
     Body: {partner_id, source, metadata}
     Returns: Click tracking confirmation

POST /api/affiliate/record-conversion
     Body: {partner_id, amount, metadata}
     Returns: Conversion confirmation

GET  /api/affiliate/dashboard
     Returns: Affiliate performance analytics
```

### 6.6 E-Commerce (SPORES)

```
GET  /api/spores/products
     Returns: List of available products

POST /api/orders
     Body: Order details
     Returns: Order confirmation

GET  /api/orders/{order_id}
     Returns: Order status

GET  /api/shipping/rates
     Body: {destination, weight}
     Returns: FedEx/DHL shipping quotes

GET  /api/shipping/track/{tracking_number}
     Returns: Shipment tracking info
```

### 6.7 Authentication

```
POST /api/auth/wallet-login
     Body: {wallet_address, signature}
     Returns: JWT token

GET  /api/auth/me
     Headers: Authorization: Bearer {token}
     Returns: User profile
```

---

## 7. INTEGRATIONS

### 7.1 Shipping Carriers

#### FedEx Express API ✅
**Status:** ACTIVE  
**Environment:** Sandbox  
**API Key:** l70e58f6bda18c4cb9a1d58833a990faed  
**Base URL:** https://apis-sandbox.fedex.com

**Enabled Services:**
- Rate calculation (shipping quotes)
- Package tracking
- OAuth authentication

**Implementation:** `/app/backend/services/fedex_service.py`

**Features:**
- Real-time rate quotes
- International shipping from Jamaica
- Weight-based pricing (grams → kg)
- Multiple service levels
- Tracking integration

#### DHL Express API
**Status:** PLANNED  
**Sign up:** https://developer.dhl.com

**Target Services:**
- MyDHL API
- Shipment tracking
- Rate calculation

### 7.2 Payment Systems

#### Cryptocurrency (Web3) ✅
**Supported Chains:**
1. Ethereum (Chain ID: 1)
   - RPC: https://eth.llamarpc.com
   - Explorer: https://etherscan.io
   
2. Polygon (Chain ID: 137)
   - RPC: https://polygon-rpc.com
   - Explorer: https://polygonscan.com
   
3. BNB Chain (Chain ID: 56)
   - RPC: https://bsc-dataseed.binance.org
   - Explorer: https://bscscan.com

**Payment Wallet:** 0x93F70DE9778F13304496801692aefC584e4d9120

**Integration:**
- MetaMask browser extension
- Direct wallet transfers
- Transaction verification
- Multi-chain support

**Library:** web3.js v4.2.0

### 7.3 News Sources (RSS Feeds)

**Total Sources:** 20

**Active Feeds:**
1. Marijuana Moment - Cannabis policy
2. Leafly - Cannabis lifestyle
3. Cannabis Tech - Technology
4. CoinDesk - Cryptocurrency
5. Cointelegraph - Crypto news
6. Decrypt - Web3
7. VentureBeat - AI/Tech
8. AI News - Artificial Intelligence
9. Bloomberg - Finance
10. MarketWatch - Markets
11. Yahoo Finance - Stocks
12. Al Jazeera - International
13. BBC News - World
14. NYT - International
15. Jamaica Gleaner - Local news
16. RJR News - Jamaica
17. Irie FM - Jamaica radio
18. Jamaica Observer - Local
19. Jamaica Today - Community
20. NUGL.com - Own content

**Parser:** feedparser (Python)  
**Update Frequency:** On-demand / scheduled

### 7.4 NFT Marketplaces

#### OpenSea
**Collection:** nugl-cannabis-nft  
**Blockchain:** Ethereum, Polygon  
**Creator Royalty:** 10%

#### Rarible
**Collection:** nugl  
**Blockchain:** Ethereum  
**Creator Royalty:** 10%

### 7.5 Price Oracles

**Current:** Manual updates (Oct 2025)

**Planned Integrations:**
- CoinGecko API (crypto prices)
- Chainlink Price Feeds (on-chain)
- Yahoo Finance API (stocks)

### 7.6 Email Services

**Status:** PLANNED

**Recommended:** SendGrid
- Transactional emails
- Order confirmations
- Shipping notifications
- Marketing campaigns

### 7.7 Analytics

**Current:** Internal tracking
- Affiliate clicks
- Conversions
- Page views

**Planned:**
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel
- TikTok Pixel

---

## 8. PAYMENT SYSTEMS

### 8.1 Crypto Payment Architecture

**Payment Flow:**
```
1. Customer adds items to cart
2. Proceeds to checkout
3. Selects blockchain (ETH/MATIC/BNB)
4. Connects MetaMask wallet
5. Reviews order & shipping
6. System calculates crypto amount (USD → crypto)
7. MetaMask prompts transaction
8. Customer signs & sends payment
9. System verifies transaction on-chain
10. Order confirmed & tracking initiated
```

**Payment Verification:**
- Transaction hash recorded
- Blockchain confirmation (3-6 blocks)
- Amount verification
- Wallet address validation
- Status update (pending → confirmed)

### 8.2 Supported Cryptocurrencies

| Chain | Currency | Decimals | Gas Fees |
|-------|----------|----------|----------|
| Ethereum | ETH | 18 | High ($5-50) |
| Polygon | MATIC | 18 | Low ($0.01-0.50) |
| BNB Chain | BNB | 18 | Medium ($0.10-2) |

**Recommended for Users:** Polygon (lowest fees)

### 8.3 Price Conversion

**USD to Crypto:**
- Real-time price feeds
- CoinGecko API (free tier)
- 2% buffer for price volatility
- Fixed at checkout time

**Example:**
```
Order Total: $50 USD
ETH Price: $2,500
Required: 0.02 ETH
```

### 8.4 Payment Security

**Measures:**
- Non-custodial (customer controls wallet)
- Direct wallet-to-wallet transfer
- No stored private keys
- Transaction verification before shipping
- Refund policy (unused crypto returned)

---

## 9. SECURITY & COMPLIANCE

### 9.1 Authentication

**Method:** Wallet-based authentication
- MetaMask signature verification
- No passwords required
- JWT token generation
- Session management

**Flow:**
```
1. User clicks "Connect Wallet"
2. MetaMask prompts connection
3. User approves wallet connection
4. Backend generates challenge message
5. User signs message with private key
6. Backend verifies signature
7. JWT token issued
8. Token used for authenticated requests
```

### 9.2 Data Protection

**Environment Variables:**
- All sensitive data in .env files
- Never committed to git
- Separate dev/prod environments
- Encrypted at rest

**Database Security:**
- No plaintext passwords
- No ObjectId exposure (UUID only)
- Sanitized user inputs
- Prepared query statements

**API Security:**
- Rate limiting (planned)
- CORS configuration
- Input validation (Pydantic)
- Error sanitization

### 9.3 Payment Security

**Cryptocurrency:**
- Non-custodial wallet integration
- Transaction verification
- On-chain confirmation
- No stored private keys

**PCI Compliance:** N/A (crypto only, no credit cards)

### 9.4 Legal Compliance

**Cannabis Content:**
- Age verification (21+)
- Legal disclaimers
- Jurisdiction warnings
- Medical advice disclaimers

**Psychedelics:**
- Legal market only (Jamaica)
- Age restrictions
- Customs documentation
- Export compliance

**Jamaica Export Requirements:**
- JSWIFT registration
- E-SAD customs forms
- Export permits
- Mycological product classification

### 9.5 Privacy Policy

**Data Collection:**
- Minimal personal data
- Wallet addresses (public)
- Shipping addresses (encrypted)
- Email addresses (optional)
- Order history

**GDPR Compliance:**
- Right to deletion
- Data portability
- Consent management
- Cookie notices

---

## 10. DEPLOYMENT & INFRASTRUCTURE

### 10.1 Container Environment

**Platform:** Kubernetes Cluster  
**Container Runtime:** Docker  
**Process Manager:** Supervisord

**Services:**
```
backend          RUNNING   pid 43, uptime X days
frontend         RUNNING   pid 42, uptime X days
mongodb          RUNNING   pid 40, uptime X days
nginx-proxy      RUNNING   pid 41, uptime X days
```

### 10.2 Service Configuration

**Backend (FastAPI):**
- **Port:** 8001 (internal)
- **Workers:** 1 (auto-reload enabled)
- **Timeout:** 60 seconds
- **Max Request Size:** 10MB

**Frontend (React):**
- **Port:** 3000 (internal)
- **Build:** Production optimized
- **Hot Reload:** Enabled (dev)
- **Proxy:** /api → backend:8001

**Database (MongoDB):**
- **Port:** 27017 (internal)
- **Auth:** Username/password
- **Connection Pool:** 10-100 connections
- **Timeout:** 30 seconds

### 10.3 Environment Variables

**Critical Variables:**
```bash
# Backend
MONGO_URL=mongodb://...
DB_NAME=nugl_db
FEDEX_API_KEY=l70e58f6bda18c4cb9a1d58833a990faed
FEDEX_SECRET_KEY=1c948a5ab5ef4a32a27c84d3eb66715c
FEDEX_BASE_URL=https://apis-sandbox.fedex.com
PAYMENT_WALLET_ADDRESS=0x93F70DE9778F13304496801692aefC584e4d9120

# Frontend
REACT_APP_BACKEND_URL=https://api.nugl.com
```

**Protected Variables:**
- ❌ Never modify MONGO_URL
- ❌ Never modify REACT_APP_BACKEND_URL
- ❌ Never hardcode ports in code

### 10.4 Networking

**Kubernetes Ingress Rules:**
```
/api/*          → backend:8001
/*              → frontend:3000
```

**HTTPS:** Handled by Kubernetes ingress  
**SSL/TLS:** Automatic certificate management

### 10.5 Logging

**Backend Logs:**
```bash
/var/log/supervisor/backend.out.log
/var/log/supervisor/backend.err.log
```

**Frontend Logs:**
```bash
/var/log/supervisor/frontend.out.log
/var/log/supervisor/frontend.err.log
```

**MongoDB Logs:**
```bash
/var/log/mongodb/mongod.log
```

### 10.6 Monitoring

**Health Checks:**
- Backend: GET /api/health
- Frontend: GET /
- Database: Connection test

**Metrics:**
- Request count
- Response times
- Error rates
- Database queries
- API failures

### 10.7 Backup & Recovery

**Database Backups:**
- Automatic daily backups
- Point-in-time recovery
- Offsite storage
- Retention: 30 days

**Code Backups:**
- Git repository (.emergent folder)
- Rollback capability
- Checkpoint system

### 10.8 Scaling

**Horizontal Scaling:**
- Backend: Multiple uvicorn workers
- Frontend: CDN distribution
- Database: Replica sets (planned)

**Vertical Scaling:**
- CPU: 1-4 cores
- Memory: 2-8 GB
- Storage: 20-100 GB

---

## 11. AFFILIATE MONETIZATION

### 11.1 Revenue Streams

**Total Partners:** 19  
**Active Partners:** 8

#### Stream 1: Seed Banks (8 partners)
- **Commission:** 10-15% per sale
- **Cookie Duration:** 30-60 days
- **Revenue Potential:** $5-30 per conversion
- **Status:** 2 active (Herbies Global + USA)

**Top Partners:**
1. Herbies Headshop (12%) ✅
2. Royal Queen Seeds (12%)
3. Tyson 2.0 (15%)

#### Stream 2: Crypto Casinos (8 partners)
- **Commission:** 35-45% revenue share
- **Cookie Duration:** Lifetime
- **CPA Bonuses:** $150-200 per player
- **Revenue Potential:** Recurring monthly income
- **Status:** 3 active (Stake, BC.Game, Roobet)

**Top Partners:**
1. BC.Game (45% + $150 CPA) ✅
2. Stake (40% + $200 CPA) ✅
3. Roobet (35%) ✅

#### Stream 3: Dispensary Leads (2 partners)
- **Commission:** $10-20 per lead
- **Target:** Leafly, Weedmaps
- **Status:** Pending sign-up

#### Stream 4: SPORES Direct Sales (1 product line)
- **Commission:** 100% (own brand)
- **Products:** 4 items ($15-25 each)
- **Payment:** Crypto only
- **Status:** Active

#### Stream 5: NFT Royalties (2 marketplaces)
- **Commission:** 10% creator royalty
- **Marketplaces:** OpenSea, Rarible
- **Status:** Active

**Total Estimated Monthly Revenue:**
- Low: $500/month
- Medium: $2,500/month
- High: $10,000+/month

### 11.2 Tracking System

**Click Tracking:**
```javascript
POST /api/affiliate/track-click
{
  "partner_id": "uuid",
  "source": "page_name",
  "user_agent": "string",
  "ip_address": "string",
  "referrer": "string"
}
```

**Conversion Tracking:**
```javascript
POST /api/affiliate/record-conversion
{
  "partner_id": "uuid",
  "order_id": "uuid",
  "amount_usd": 50.00,
  "commission_usd": 7.50,
  "metadata": {}
}
```

**Analytics Dashboard:**
- Total clicks
- Click-through rate (CTR)
- Conversion rate
- Revenue per partner
- Top performing partners
- Geographic distribution

### 11.3 Payment Terms

**Seed Banks:**
- Net 30 days
- Minimum payout: $50-100
- Payment: Wire transfer or PayPal

**Crypto Casinos:**
- Weekly payouts
- Minimum payout: $50-100
- Payment: Cryptocurrency

**SPORES:**
- Immediate (100% profit)
- Payment: Cryptocurrency to wallet

### 11.4 Partner Management

**Affiliate Dashboard:** `/affiliate/dashboard`
- Partner list
- Performance metrics
- Click analytics
- Revenue reports
- Payment history

**Sign-up Process:**
1. Apply to affiliate program
2. Approval (manual or automatic)
3. Receive affiliate links
4. Integration into platform
5. Tracking activation
6. Payment setup

---

## 12. FUTURE ROADMAP

### 12.1 Q4 2025 (Current Quarter)

**Priority 1: E-Commerce Completion**
- ✅ SPORES products initialized
- ✅ FedEx integration active
- 🔄 Shopping cart UI (in progress)
- 🔄 MetaMask checkout (in progress)
- 🔄 Order tracking (in progress)
- ⏳ Email notifications
- ⏳ Admin dashboard

**Priority 2: Affiliate Growth**
- ✅ Core affiliates activated (8)
- 🔄 Leafly sign-up (high priority)
- 🔄 CoinDesk partnership
- ⏳ Additional seed banks (6)
- ⏳ More crypto casinos (5)

**Priority 3: Content Expansion**
- ✅ 157 strains populated
- ✅ 91 press releases
- ✅ 26 media articles
- ⏳ User-generated reviews
- ⏳ Blog section
- ⏳ Video content

### 12.2 Q1 2026

**AI Integration:**
- GPT-5 or Claude Sonnet 4 chatbot
- Strain recommendation engine
- Personalized content
- Image generation (NFTs)

**Social Features:**
- User profiles
- Community forums
- Content sharing
- Direct messaging
- Reputation system

**Mobile App:**
- React Native
- iOS & Android
- Push notifications
- Mobile wallet support

### 12.3 Q2 2026

**Advanced E-Commerce:**
- Subscription boxes
- Bulk ordering
- Loyalty program
- Referral system
- Gift cards (crypto)

**Marketplace Expansion:**
- Third-party sellers
- Vendor onboarding
- Product reviews
- Escrow system
- Dispute resolution

**DeFi Integration:**
- Staking rewards
- Yield farming
- Liquidity pools
- Governance token

### 12.4 Q3-Q4 2026

**International Expansion:**
- Multi-language support
- Local payment methods
- Regional content
- Country-specific products
- Compliance automation

**Enterprise Features:**
- B2B portal
- Wholesale pricing
- API access
- White-label options
- Data analytics

**Blockchain Infrastructure:**
- Smart contracts
- Decentralized storage (IPFS)
- On-chain verification
- DAO governance

---

## 13. TECHNICAL SPECIFICATIONS

### 13.1 System Requirements

**Development Environment:**
- OS: Linux/macOS/Windows with WSL2
- Python: 3.11+
- Node.js: 18+
- MongoDB: 7.0+
- Docker: 20.10+
- Git: 2.30+

**Production Environment:**
- Kubernetes cluster
- 2 CPU cores minimum
- 2 GB RAM minimum
- 20 GB storage minimum
- HTTPS/SSL certificate
- Domain name

### 13.2 Performance Benchmarks

**API Response Times:**
- GET endpoints: <100ms (cached)
- POST endpoints: <200ms
- Database queries: <50ms
- External APIs: <2s (timeout)

**Page Load Times:**
- Homepage: <2s
- Strain page: <1.5s
- Checkout: <1s
- Search results: <1s

**Throughput:**
- Concurrent users: 100+
- Requests/second: 50+
- Database connections: 100
- WebSocket connections: 1000+

### 13.3 Browser Compatibility

**Supported Browsers:**
- Chrome: 100+
- Firefox: 100+
- Safari: 15+
- Edge: 100+
- Mobile Safari: iOS 14+
- Chrome Mobile: Latest

**Required Features:**
- ES6 JavaScript
- Web3/MetaMask
- LocalStorage
- WebSockets
- Responsive CSS

### 13.4 Dependencies Management

**Backend:**
```bash
# Update requirements.txt
pip freeze > requirements.txt

# Install dependencies
pip install -r requirements.txt
```

**Frontend:**
```bash
# Add package (ALWAYS use yarn, never npm)
yarn add package-name

# Install dependencies
yarn install

# Update packages
yarn upgrade-interactive
```

### 13.5 Code Quality

**Backend Standards:**
- PEP 8 style guide
- Type hints (Python 3.11+)
- Docstrings (Google style)
- Async/await patterns
- Error handling

**Frontend Standards:**
- ES6+ syntax
- React hooks
- Functional components
- PropTypes validation
- JSX best practices

**Linting:**
- Backend: Ruff (Python)
- Frontend: ESLint (JavaScript)
- Auto-fix on save

---

## 14. TROUBLESHOOTING

### 14.1 Common Issues

**Issue:** Backend not starting
```bash
# Check logs
tail -n 50 /var/log/supervisor/backend.err.log

# Check if port is in use
lsof -i :8001

# Restart service
sudo supervisorctl restart backend
```

**Issue:** Frontend not updating
```bash
# Clear cache
rm -rf /app/frontend/node_modules/.cache

# Rebuild
cd /app/frontend && yarn install && yarn build

# Restart service
sudo supervisorctl restart frontend
```

**Issue:** Database connection failed
```bash
# Check MongoDB status
sudo supervisorctl status mongodb

# Verify connection string
grep MONGO_URL /app/backend/.env

# Test connection
mongosh $MONGO_URL
```

**Issue:** MetaMask not connecting
- Check browser extension installed
- Clear browser cache
- Verify wallet unlocked
- Check network selected
- Inspect browser console

### 14.2 Support Resources

**Documentation:**
- FastAPI: https://fastapi.tiangolo.com
- React: https://react.dev
- MongoDB: https://docs.mongodb.com
- Web3.js: https://web3js.org

**Community:**
- GitHub Discussions
- Discord Server
- Stack Overflow
- Reddit: r/FastAPI, r/reactjs

---

## 15. CONTACT & CREDITS

### 15.1 Project Information

**Project Name:** The Digital Greenhouse®  
**Domain:** nugl.com  
**Platform Version:** 1.0  
**Last Updated:** October 15, 2025

### 15.2 Technical Contact

**Development Team:**
- Architecture: AI Full-Stack Engineer
- Backend: FastAPI + MongoDB
- Frontend: React + Tailwind
- DevOps: Kubernetes + Docker

**Email:** thedigitalgreenhouse@gmail.com

### 15.3 API Documentation

**Interactive Docs:**
- Swagger UI: https://api.nugl.com/docs
- ReDoc: https://api.nugl.com/redoc
- OpenAPI Schema: https://api.nugl.com/openapi.json

### 15.4 Legal

**Terms of Service:** /terms  
**Privacy Policy:** /privacy  
**Cookie Policy:** /cookies  
**Affiliate Agreement:** /affiliate/terms

---

## 16. CHANGELOG

### Version 1.0.0 (October 15, 2025)

**Initial Release:**
- ✅ News aggregation (20 sources)
- ✅ Cannabis strain database (157 strains)
- ✅ Global dispensary directory (55 locations, 8 countries)
- ✅ Seed bank affiliate network (8 partners, 2 active)
- ✅ Crypto casino marketplace (8 partners, 3 active)
- ✅ NFT marketplace (12 items)
- ✅ Media content hub (26 articles)
- ✅ Press room (91 releases)
- ✅ Investor relations portal
- ✅ Psychedelics e-commerce (4 products)
- ✅ FedEx shipping integration
- ✅ Multi-chain crypto payments (3 chains)
- ✅ Affiliate tracking system
- ✅ Order management foundation

**Bug Fixes:**
- Fixed Crypto nav button always highlighted
- Fixed Press Room date parsing
- Fixed Strain pagination (157 strains display)
- Fixed Navigation dropdown consistency
- Removed commission disclosure from casino page

**Integrations:**
- FedEx API sandbox ✅
- MetaMask Web3 ✅
- RSS news feeds ✅
- OpenSea NFTs ✅

---

## APPENDIX A: ENVIRONMENT SETUP

### Backend .env Template
```bash
# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=nugl_db

# FedEx Shipping
FEDEX_API_KEY=your_api_key
FEDEX_SECRET_KEY=your_secret_key
FEDEX_BASE_URL=https://apis-sandbox.fedex.com

# Crypto Payment
PAYMENT_WALLET_ADDRESS=0x93F70DE9778F13304496801692aefC584e4d9120

# Optional Integrations
DHL_API_KEY=your_dhl_key
SENDGRID_API_KEY=your_sendgrid_key
EMERGENT_LLM_KEY=your_llm_key
```

### Frontend .env Template
```bash
REACT_APP_BACKEND_URL=https://api.nugl.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
```

---

## APPENDIX B: API EXAMPLES

### Get Strains
```bash
curl https://api.nugl.com/api/strains?type=sativa

Response:
[
  {
    "id": "uuid",
    "name": "Sour Diesel",
    "type": "sativa",
    "thc_percentage": 22.0,
    "effects": ["energetic", "creative", "uplifted"],
    ...
  }
]
```

### Track Affiliate Click
```bash
curl -X POST https://api.nugl.com/api/affiliate/track-click \
  -H "Content-Type: application/json" \
  -d '{
    "partner_id": "herbies-global",
    "source": "seed-banks-page"
  }'
```

### Create Order
```bash
curl -X POST https://api.nugl.com/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product_id": "raw_mushrooms", "quantity": 2}],
    "shipping_address": {...},
    "payment": {
      "chain": "polygon",
      "tx_hash": "0x..."
    }
  }'
```

---

**END OF TECHNICAL OVERVIEW**

*This document is maintained and updated regularly.*  
*For the latest version, contact: thedigitalgreenhouse@gmail.com*

---

**© 2025 The Digital Greenhouse® | All Rights Reserved**
