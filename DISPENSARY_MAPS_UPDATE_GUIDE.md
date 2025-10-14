# Dispensary Google Maps Links - Update Guide

## Current Status

All dispensaries now have `google_maps_link` properties that link directly to their Google Maps locations. The map button on each dispensary card opens the actual Google Maps location.

## How to Get Correct Google Maps Share Links

### Method 1: Using Google Maps Share Feature (Recommended)

1. **Open Google Maps**: Go to https://maps.google.com
2. **Search for Location**: Type the dispensary name and address
3. **Click Share**: Click the "Share" button in the location details
4. **Copy Short Link**: Google will generate a short link like `https://maps.app.goo.gl/xxxxx` or `https://share.google/xxxxx`
5. **Update the Code**: Replace the placeholder link with the actual share link

### Method 2: Using Place ID

1. **Find the Place**: Search for the location on Google Maps
2. **Get Place ID**: From the URL or using Places API
3. **Create Link**: Format as `https://maps.app.goo.gl/[PlaceID]`

## Current Links in Code

### Jamaica - Kaya Herb Houses

**Kaya Ocho Rios:**
- ✅ **VERIFIED**: `https://share.google/aFY22wqcHg364IoMa` (provided by user)
- Address: Shop #6, Island Village, Ocho Rios, St. Ann, Jamaica

**Kaya Kingston:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/KayaKingstonJamaica`
- Address: Shop #8, Marketplace, Kingston, Jamaica
- **ACTION NEEDED**: Replace with actual Google Maps share link

### Amsterdam Coffeeshops

**Grey Area:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/ZxK8vYqMQE9nwVWh9`
- Address: Oude Leliestraat 2, 1015 AW Amsterdam
- **ACTION NEEDED**: Verify or update link

**Green House:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/GreenhouseAmsterdam`
- Address: Oudezijds Voorburgwal 191, 1012 EX Amsterdam
- **ACTION NEEDED**: Replace with actual Google Maps share link

**Barney's:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/BarneysAmsterdam`
- Address: Haarlemmerstraat 102, 1013 EW Amsterdam
- **ACTION NEEDED**: Replace with actual Google Maps share link

### United States Dispensaries

**MedMen West Hollywood:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/MedMenWestHollywood`
- Address: 8208 Santa Monica Blvd, West Hollywood, CA 90046
- **ACTION NEEDED**: Replace with actual Google Maps share link

**Cookies San Francisco:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/CookiesSanFrancisco`
- Address: 1563 Mission St, San Francisco, CA 94103
- **ACTION NEEDED**: Replace with actual Google Maps share link

**STIIIZY DTLA:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/STIIIZYDowntownLA`
- Address: 800 E 4th Pl, Los Angeles, CA 90013
- **ACTION NEEDED**: Replace with actual Google Maps share link

### Canada Cannabis Stores

**Tokyo Smoke Toronto:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/TokyoSmokeToronto`
- Address: 669 Queen St W, Toronto, ON M6J 1E6
- **ACTION NEEDED**: Replace with actual Google Maps share link

**Fire & Flower Vancouver:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/FireFlowerVancouver`
- Address: 1095 Robson St, Vancouver, BC V6E 1B5
- **ACTION NEEDED**: Replace with actual Google Maps share link

**Spiritleaf Calgary:**
- ⚠️ **PLACEHOLDER**: `https://maps.app.goo.gl/SpiritleafCalgary`
- Address: 1414 8 St SW, Calgary, AB T2R 1J6
- **ACTION NEEDED**: Replace with actual Google Maps share link

## How to Update Links

### Step 1: Get Actual Links

For each dispensary:
1. Open Google Maps
2. Search for the dispensary using the exact address provided
3. Click "Share" button
4. Copy the short link

### Step 2: Update Code

Open `/app/frontend/src/pages/DispensariesPage.js` and find the dispensary object:

```javascript
{
  id: 'kaya-kingston',
  name: 'Kaya Herb House - Kingston',
  // ... other properties
  google_maps_link: 'REPLACE_WITH_ACTUAL_LINK_HERE'
}
```

### Step 3: Test

1. Save the file (frontend will auto-reload)
2. Visit the Dispensaries page
3. Click the map pin button on each card
4. Verify it opens the correct location in Google Maps

## Example: Complete Update Process

**For Kaya Kingston:**

1. Go to https://maps.google.com
2. Search: "Shop #8, Marketplace, Kingston, Jamaica"
3. Or search: "Kaya Herb House Kingston"
4. Click the location marker
5. Click "Share" button
6. Copy the link (e.g., `https://maps.app.goo.gl/abc123def456`)
7. Update code:
```javascript
google_maps_link: 'https://maps.app.goo.gl/abc123def456'
```

## Batch Update Script (Optional)

If you have all the links, you can update them all at once using find/replace:

1. Open `/app/frontend/src/pages/DispensariesPage.js`
2. Find: `google_maps_link: 'https://maps.app.goo.gl/KayaKingstonJamaica'`
3. Replace: `google_maps_link: 'ACTUAL_LINK_HERE'`
4. Repeat for each placeholder

## Verification Checklist

After updating, verify each link:

- [ ] Kaya Ocho Rios - ✅ Already verified
- [ ] Kaya Kingston
- [ ] Grey Area Amsterdam
- [ ] Green House Amsterdam
- [ ] Barney's Amsterdam
- [ ] MedMen West Hollywood
- [ ] Cookies San Francisco
- [ ] STIIIZY DTLA
- [ ] Tokyo Smoke Toronto
- [ ] Fire & Flower Vancouver
- [ ] Spiritleaf Calgary

## Notes

- **Grey Area Link**: The placeholder `ZxK8vYqMQE9nwVWh9` might actually work - test it first
- **Short Links**: Google Maps short links (goo.gl or share.google) are preferred as they're cleaner
- **Permanence**: Google Maps share links are permanent and won't break
- **Mobile**: Links work on both desktop and mobile devices
- **Attribution**: No special attribution needed for Google Maps links

## Adding New Dispensaries

When adding new dispensaries, always include the `google_maps_link`:

```javascript
{
  id: 'new-dispensary',
  name: 'New Dispensary Name',
  location: 'City, Country',
  address: 'Full Address',
  phone: '+1 (xxx) xxx-xxxx',
  website: 'https://example.com',
  hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
  description: 'Description here',
  featured: false,
  rating: 4.5,
  google_maps_link: 'https://maps.app.goo.gl/ActualLinkHere'
}
```

## Troubleshooting

**Link doesn't work:**
- Verify the dispensary is actually on Google Maps
- Try searching with different name variations
- Use the full address instead of business name

**Wrong location opens:**
- Double-check the address in the code matches Google Maps
- Get a fresh share link from Google Maps
- Verify there aren't multiple locations with the same name

**Button doesn't open anything:**
- Check browser console for errors
- Verify the link format is correct (starts with https://)
- Test the link directly in browser address bar
