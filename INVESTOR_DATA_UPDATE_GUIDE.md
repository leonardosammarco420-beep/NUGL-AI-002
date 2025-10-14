# Investor Relations Data Update Guide

## Current Implementation

The Investor Relations page currently displays financial data from **OTC Markets** for NUGL Inc. The data includes:
- Annual Financial Statements (2021-2024)
- Quarterly Reports (Q1 2024 - Q2 2025)
- Semi-Annual Data
- Balance Sheets
- Cash Flow Statements
- Income Statements
- All Official Filings with Direct Links

## Data Update Method

### Current Status: ⚠️ **Manual Updates Required**

The financial data is currently **hardcoded** in `/app/backend/services/otc_financials_service.py` based on data scraped from OTC Markets. This means:

✅ **Pros:**
- Fast loading times (no external API calls)
- No rate limiting issues
- Always available even if OTC Markets is down
- Complete control over data format

❌ **Cons:**
- Requires manual updates when new financials are published
- Data won't automatically reflect new quarterly/annual reports

## How to Update Data

When new financial reports are published on OTC Markets, follow these steps:

### Option 1: Manual Update (Current Method)

1. **Go to OTC Markets**: https://www.otcmarkets.com/stock/NUGL/financials
2. **Extract New Data**: Note the new quarterly or annual figures
3. **Update the Service File**: 
   - Edit `/app/backend/services/otc_financials_service.py`
   - Add new quarter/year data to the appropriate method
4. **Restart Backend**: 
   ```bash
   sudo supervisorctl restart backend
   ```
5. **Verify**: Check the Investor Relations page to see updated data

### Option 2: Future Enhancement - Automated Scraping (Not Implemented Yet)

To make updates automatic, you could:

1. **Build a Web Scraper**:
   - Create a Python script using BeautifulSoup or Selenium
   - Schedule it to run daily/weekly via cron job
   - Parse OTC Markets HTML to extract latest financials
   - Update MongoDB with new data

2. **Use OTC Markets API** (if available):
   - Check if OTC Markets offers an official API
   - Subscribe to the API service
   - Fetch data programmatically

3. **Admin Interface**:
   - Build an admin page where authorized users can paste new financial data
   - System validates and updates the database
   - No code changes needed for updates

## Recommended Approach

For a production system, I recommend:

### Short-term (Next 1-3 months):
- Continue with manual updates when quarterly reports are released
- Set calendar reminders for quarterly filing dates
- Updates typically needed 4 times per year (Q1, Q2, Q3, Annual)

### Long-term (6+ months):
- Implement automated web scraping from OTC Markets
- Store data in MongoDB instead of hardcoding
- Build admin interface for easy data management
- Set up email notifications when new filings are detected

## Filing Schedule

NUGL Inc. typically files:
- **Quarterly Reports**: ~45 days after quarter end
  - Q1 (March 31): Filed by mid-May
  - Q2 (June 30): Filed by mid-August  
  - Q3 (September 30): Filed by mid-November
- **Annual Report**: ~90 days after year end
  - Year End (December 31): Filed by late March/early April

## Contact

To monitor for new filings:
- Watch OTC Markets Disclosure page: https://www.otcmarkets.com/stock/NUGL/disclosure
- Subscribe to OTC Markets email alerts for NUGL
- Check the Press Room on your site regularly

## Current Data Sources

All data links are embedded in the Investor Relations page:
- Annual Reports: Direct links to OTC Markets filings
- Quarterly Reports: Direct links to each quarterly filing
- Company Profile: Live link to OTC Markets verified profile
- Disclosure Documents: Live link to all SEC and OTC filings

Even though the numbers are cached locally, all official source documents are linked directly so investors can verify the accuracy.
