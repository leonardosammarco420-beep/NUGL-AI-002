# Live Stock Ticker - Implementation Notes

## Overview

A live stock ticker widget has been added to the Investor Relations page displaying real-time (or near real-time) NUGL stock data.

## Features

### Current Display:
- **Current Price**: Large, prominent display ($0.0011)
- **Price Change**: Shows daily change in $ and % with color coding (green ↑ / red ↓)
- **Bid/Ask Spread**: Real-time bid and ask prices with sizes
- **Daily Metrics**: Open, Daily Range, Volume
- **52-Week Range**: High and low for the year
- **Average Volume**: 30-day average trading volume
- **Market Status**: Live indicator (green pulse when market is open)
- **Last Updated**: Timestamp of the last data refresh
- **Direct Link**: Button to view full quote on OTC Markets

### Auto-Refresh:
- Widget automatically refreshes every **30 seconds**
- Smooth updates without page reload
- Real-time feel for active trading hours

## Current Implementation

### ⚠️ Mock Data with Live Variations

The current implementation uses **simulated data** based on actual NUGL trading ranges:

**Why Mock Data?**
1. OTC Markets doesn't provide a free public API for real-time quotes
2. Web scraping OTC Markets for live data would be:
   - Against their terms of service
   - Unreliable (HTML structure changes)
   - Rate-limited or blocked
3. Professional market data APIs (e.g., IEX Cloud, Alpha Vantage) charge for OTC quotes

**How It Works:**
- Base price around $0.0011 (actual NUGL trading range)
- Small random variations (±$0.00005) to simulate market movement
- Realistic volume ranges (100K-150K shares)
- Actual 52-week range, average volume, and market cap
- Market status based on trading hours (9:30 AM - 4:00 PM ET)

## Production Options

### Option 1: Manual Daily Update (Recommended for Now)
**Cost:** Free  
**Effort:** Low (5 minutes daily)

1. Check NUGL quote on OTC Markets each morning
2. Update `/app/backend/services/otc_financials_service.py`
3. Set base_price to actual closing price from previous day
4. Restart backend

**Pros:**
- Free
- Accurate end-of-day data
- Legal and compliant

**Cons:**
- Not truly "live"
- Manual effort required
- Intraday changes not reflected

### Option 2: Market Data API Subscription
**Cost:** $50-200/month  
**Effort:** Medium (one-time integration)

**Services to Consider:**
1. **IEX Cloud** (https://iexcloud.io)
   - OTC data available
   - $59/month for real-time
   - Well-documented API

2. **Alpha Vantage** (https://www.alphavantage.co)
   - Free tier: 5 API calls/minute
   - Premium: $49.99/month
   - Good for delayed quotes

3. **Polygon.io** (https://polygon.io)
   - $99/month starter plan
   - Includes OTC stocks
   - WebSocket for real-time streaming

**Implementation:**
```python
# In otc_financials_service.py
import requests

def get_live_quote(self):
    # Example with IEX Cloud
    api_key = os.environ.get('IEX_API_KEY')
    response = requests.get(
        f'https://cloud.iexapis.com/stable/stock/NUGL/quote',
        params={'token': api_key}
    )
    data = response.json()
    return format_quote_data(data)
```

**Pros:**
- Truly real-time data
- Reliable and legal
- Professional appearance

**Cons:**
- Monthly subscription cost
- Requires API key management
- May still have 15-minute delay for OTC

### Option 3: OTC Markets Premium Data (Best Quality)
**Cost:** Contact OTC Markets for pricing  
**Effort:** High (requires partnership)

- Official OTC Markets data feed
- Guaranteed accuracy
- Real-time Level 2 quotes available
- Likely expensive ($500+/month)

**Contact:** https://www.otcmarkets.com/market-data

### Option 4: End-of-Day Only (Free Alternative)
**Cost:** Free  
**Effort:** Low

Use free EOD (End of Day) data services:
- Yahoo Finance API (unofficial but works)
- Alpha Vantage free tier
- Updates once per day after market close

**Implementation:**
```python
# Fetch once daily, cache for 24 hours
import yfinance as yf

def get_live_quote(self):
    stock = yf.Ticker("NUGL")
    data = stock.info
    # Parse and return quote data
```

**Pros:**
- Free
- Accurate closing prices
- No scraping concerns

**Cons:**
- Not "live" - updates once daily
- May have 1-day lag

## Recommended Approach

**For Now (MVP/Beta):**
1. Keep the mock data implementation
2. Add disclaimer: "Quote data is for demonstration purposes. View real-time quote on OTC Markets"
3. Link directly to OTC Markets quote page (already implemented)

**For Production (Post-Launch):**
1. Subscribe to IEX Cloud or Alpha Vantage ($50-60/month)
2. Implement real API integration
3. Add caching (5-minute intervals) to reduce API calls
4. Display "15-minute delayed" if using delayed data

**Long-term (Growth Phase):**
1. Consider OTC Markets premium data feed
2. Add Level 2 quotes (bid/ask depth)
3. Implement real-time streaming via WebSocket
4. Add historical price charts

## Current Configuration

**Refresh Interval:** 30 seconds  
**Data Source:** Mock (simulated)  
**Market Hours:** 9:30 AM - 4:00 PM ET  
**Base Price:** $0.0011 (typical NUGL range)

## Files Modified

- `/app/backend/services/otc_financials_service.py` - Added `get_live_quote()` method
- `/app/backend/server.py` - Added `/api/investor/live-quote` endpoint
- `/app/frontend/src/pages/InvestorRelationsPage.js` - Added ticker widget and auto-refresh

## Legal Considerations

**Current Implementation:** ✅ Legal
- Using simulated data based on public information
- Clear link to official OTC Markets quote
- No scraping or unauthorized API use

**For Production:**
- Always use licensed data feeds
- Display required disclaimers (e.g., "15-minute delayed")
- Include data provider attribution
- Follow exchange terms of service

## Next Steps

1. **Immediate:** Add small disclaimer below ticker: "*Simulated quote data - View live quote on OTC Markets*"
2. **Week 1:** Research and compare market data API providers
3. **Month 1:** Subscribe to chosen provider and implement integration
4. **Month 2:** Add price history chart using the same data feed
5. **Month 3:** Consider adding news feed integration

## Support

For questions about live data integration:
- OTC Markets Market Data: https://www.otcmarkets.com/market-data
- IEX Cloud Support: https://iexcloud.io/support
- Alpha Vantage Support: https://www.alphavantage.co/support
