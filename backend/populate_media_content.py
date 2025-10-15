"""
Script to populate media_articles collection with content from www.nugl.com categories
Categories: NUGL TV, Business, Culture, Grow Products, Wellness, Events
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample articles from www.nugl.com organized by category
media_articles = [
    # NUGL TV
    {
        "id": str(uuid.uuid4()),
        "title": "(Kre8 Genetics) Kasper – NUGL TV S2E9",
        "url": "https://nugl.com/kre8-genetics-kasper-nugl-tv-s2e9/",
        "category": "NUGL TV",
        "subcategory": None,
        "excerpt": "Featured interview with Kre8 Genetics founder Kasper discussing cannabis genetics and breeding innovations.",
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
        "date": datetime(2024, 3, 15, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "(SkinnyWeed) Jenae Alt – NUGL TV S2E7",
        "url": "https://nugl.com/skinnyweed-jenae-alt-nugl-tv-s2e7/",
        "category": "NUGL TV",
        "subcategory": None,
        "excerpt": "SkinnyWeed founder Jenae Alt shares her journey in the cannabis wellness industry.",
        "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        "date": datetime(2024, 2, 20, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    
    # Business Category
    {
        "id": str(uuid.uuid4()),
        "title": "What to Do About Child-Related Incidents in Rental Properties",
        "url": "https://nugl.com/what-to-do-about-child-related-incidents-in-rental-properties/",
        "category": "Business",
        "subcategory": "Industry",
        "excerpt": "Navigating child-related incidents in cannabis-friendly rental properties requires careful consideration of local laws.",
        "image": "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800",
        "date": datetime(2024, 8, 15, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "TYSON 2.0 and Carma HoldCo Land in Jamaica, Bringing Mike Tyson's Knockout Cannabis Line to the Island",
        "url": "https://nugl.com/tyson-2-0-and-carma-holdco-land-in-jamaica-bringing-mike-tysons-knockout-cannabis-line-to-the-island/",
        "category": "Business",
        "subcategory": "Industry",
        "excerpt": "Mike Tyson's cannabis brand TYSON 2.0 expands to Jamaica through partnership with Carma HoldCo.",
        "image": "https://images.unsplash.com/photo-1603297136955-6b6b37f8e5c0?w=800",
        "date": datetime(2024, 7, 25, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Navigating Federal Cannabis Legalization and Reform in 2024",
        "url": "https://nugl.com/navigating-federal-cannabis-legalization-and-reform-in-2024/",
        "category": "Business",
        "subcategory": "Legalization",
        "excerpt": "2024 stands as a pivotal year for federal cannabis reform with stakeholders watching three key reform efforts.",
        "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        "date": datetime(2024, 5, 16, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Silo Wellness Announces LOI to Acquire NUGL/Kaya in a Transaction Valued at CAD $43,289,624.60",
        "url": "https://nugl.com/silo-wellness-announces-loi-to-acquire-nugl-kaya-in-a-transaction-valued-at-cad-43289624-60-cse-to-halt-trading-until-shareholder-approval/",
        "category": "Business",
        "subcategory": "Economics",
        "excerpt": "Major acquisition announcement in the cannabis industry as Silo Wellness moves to acquire NUGL and Kaya.",
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
        "date": datetime(2023, 8, 29, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Green Thumb Industries Partnering With Circle K to Test Out Marijuana Pop-up Shops",
        "url": "https://nugl.com/green-thumb-industries-partnering-with-circle-k-to-test-out-marijuana-pop-up-shops/",
        "category": "Business",
        "subcategory": "Industry",
        "excerpt": "Green Thumb Industries announces innovative partnership with Circle K for cannabis pop-up shops.",
        "image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800",
        "date": datetime(2022, 10, 24, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    
    # Culture Category
    {
        "id": str(uuid.uuid4()),
        "title": "Which Bong Height is Best for You? A Guide for Smooth Hits",
        "url": "https://nugl.com/which-bong-height-is-best-for-you-a-guide-for-smooth-hits/",
        "category": "Culture",
        "subcategory": "Education",
        "excerpt": "Understanding the perfect bong height can transform your smoking experience. Learn what works best for smooth hits.",
        "image": "https://images.unsplash.com/photo-1530629912498-0817ec9a43a2?w=800",
        "date": datetime(2024, 3, 20, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "CBD vs. THC: Exploring the Differences and Benefits of Cannabinoids",
        "url": "https://nugl.com/cbd-vs-thc-exploring-the-differences-and-benefits-of-cannabinoids/",
        "category": "Culture",
        "subcategory": "Science",
        "excerpt": "A comprehensive exploration of CBD and THC, their differences, benefits, and applications in medical and recreational use.",
        "image": "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800",
        "date": datetime(2023, 8, 31, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "The Science Behind Cannabis: Understanding Its Chemical Composition and Effects",
        "url": "https://nugl.com/the-science-behind-cannabis-understanding-its-chemical-composition-and-effects/",
        "category": "Culture",
        "subcategory": "Science",
        "excerpt": "Deep dive into the complex chemical composition of cannabis and how different compounds create various effects.",
        "image": "https://images.unsplash.com/photo-1612257416648-ee7af8d23a1c?w=800",
        "date": datetime(2023, 8, 22, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "The Bioengineering of Cannabis: What is It, What You Need to Know, and Why It's Important",
        "url": "https://nugl.com/the-bioengineering-of-cannabis-what-is-it-what-you-need-to-know-and-why-its-important/",
        "category": "Culture",
        "subcategory": "Science",
        "excerpt": "Exploring the frontier of cannabis bioengineering and its implications for the future of the industry.",
        "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
        "date": datetime(2023, 6, 20, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "The Stages of Cannabis Growth",
        "url": "https://nugl.com/the-stages-of-cannabis-growth/",
        "category": "Culture",
        "subcategory": "Education",
        "excerpt": "Understanding the distinct stages of cannabis plant growth from seed to harvest.",
        "image": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        "date": datetime(2023, 6, 11, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "OG Eddy Lepp: Still Growing",
        "url": "https://nugl.com/og-eddy-lepp-still-growing/",
        "category": "Culture",
        "subcategory": "Entertainment",
        "excerpt": "The legendary story of Eddy Lepp, a cannabis pioneer who continues to advocate for cannabis freedom.",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "date": datetime(2023, 4, 15, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    
    # Grow Products Category
    {
        "id": str(uuid.uuid4()),
        "title": "What Is Growing Sinsemilla in a Greenhouse Possible?",
        "url": "https://nugl.com/what-is-growing-sinsemilla-in-a-greenhouse-possible/",
        "category": "Grow Products",
        "subcategory": "Grow",
        "excerpt": "Exploring the techniques and possibilities of growing high-quality sinsemilla cannabis in greenhouse environments.",
        "image": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800",
        "date": datetime(2024, 5, 10, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "6 Most Common Mistakes to Avoid Before You Start Growing Cannabis",
        "url": "https://nugl.com/6-most-common-mistakes-to-avoid-before-you-start-growing-cannabis/",
        "category": "Grow Products",
        "subcategory": "Grow",
        "excerpt": "Essential tips for avoiding common pitfalls when starting your cannabis cultivation journey.",
        "image": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
        "date": datetime(2024, 4, 15, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Razor: Creator of Sky Walker OG, Heads Up Next-gen Grow Ops",
        "url": "https://nugl.com/razor-creator-of-sky-walker-og-heads-up-next-gen-grow-ops/",
        "category": "Grow Products",
        "subcategory": "Grow",
        "excerpt": "Meet the legendary breeder behind Skywalker OG and his cutting-edge cultivation operations.",
        "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
        "date": datetime(2024, 3, 25, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "The Ultimate Guide to the Top 10 CO2 Cannabis Pens in America",
        "url": "https://nugl.com/the-ultimate-guide-to-the-top-10-co2-cannabis-pens-in-america/",
        "category": "Grow Products",
        "subcategory": "Product Review",
        "excerpt": "Comprehensive review of America's best CO2 cannabis vape pens for the ultimate vaping experience.",
        "image": "https://images.unsplash.com/photo-1608889476518-738c9b1b2fc1?w=800",
        "date": datetime(2024, 5, 30, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "System of a Down: Combining Music & Cannabis With 22Red",
        "url": "https://nugl.com/system-of-a-down-combining-music-cannabis-with-22red/",
        "category": "Grow Products",
        "subcategory": "Product Review",
        "excerpt": "Rock legends System of a Down enter the cannabis market with their 22Red product line.",
        "image": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
        "date": datetime(2024, 2, 18, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Hitoki Brothers: Bringing Elegance and Sophistication to Cannabis",
        "url": "https://nugl.com/hitoki-brothers-bringing-elegance-and-sophistication-to-cannabis/",
        "category": "Grow Products",
        "subcategory": "Product Review",
        "excerpt": "The Hitoki Brothers revolutionize cannabis consumption with elegant, sophisticated devices.",
        "image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
        "date": datetime(2024, 1, 22, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    
    # Wellness Category
    {
        "id": str(uuid.uuid4()),
        "title": "Cannabis and Wellness: Exploring the Benefits and Products for a Healthier Lifestyle in Miami",
        "url": "https://nugl.com/cannabis-and-wellness-exploring-the-benefits-and-products-for-a-healthier-lifestyle-in-miami/",
        "category": "Wellness",
        "subcategory": "Medical",
        "excerpt": "Miami emerges as a vibrant hub for cannabis wellness, exploring benefits and products for healthier living.",
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        "date": datetime(2024, 6, 7, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "The Benefits of CBD for Inflammation in Sports: A Game Changer for Athletes",
        "url": "https://nugl.com/the-benefits-of-cbd-for-inflammation-in-sports-a-game-changer-for-athletes/",
        "category": "Wellness",
        "subcategory": "CBD",
        "excerpt": "CBD emerges as a powerful tool for athletes managing inflammation and recovery in competitive sports.",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        "date": datetime(2024, 5, 21, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "What Is It Like To Be High On Psilocybin Mushrooms?",
        "url": "https://nugl.com/what-is-it-like-to-be-high-on-psilocybin-mushrooms/",
        "category": "Wellness",
        "subcategory": "Psychedelics",
        "excerpt": "An educational exploration of the psilocybin experience and its effects on consciousness and perception.",
        "image": "https://images.unsplash.com/photo-1621104072639-83e37d4d7c4d?w=800",
        "date": datetime(2023, 9, 12, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Does Cannabis in Your Kitchen Provide Long-Lasting Relief From Pain?",
        "url": "https://nugl.com/does-cannabis-in-your-kitchen-provide-long-lasting-relief-from-pain/",
        "category": "Wellness",
        "subcategory": "Cooking",
        "excerpt": "Exploring cannabis edibles and their effectiveness for long-lasting pain management through kitchen preparation.",
        "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
        "date": datetime(2023, 7, 20, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Jamaica Based Kaya Group Ramps Up for the Five-Year Anniversary of Legal Medical Cannabis Sales",
        "url": "https://nugl.com/jamaica-based-kaya-group-ramps-up-for-the-five-year-anniversary-of-legal-medical-cannabis-sales-on-march-10-with-irie-fm-music-awards/",
        "category": "Wellness",
        "subcategory": "Medical",
        "excerpt": "Kaya Group celebrates five years of legal medical cannabis in Jamaica with special events and announcements.",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "date": datetime(2023, 2, 28, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    
    # Events Category
    {
        "id": str(uuid.uuid4()),
        "title": "USA CBD Expo Returns With Nation's Largest CBD Event February 13-15 in Las Vegas",
        "url": "https://nugl.com/usa-cbd-expo-returns-with-nations-largest-cbd-event-february-13-15-in-las-vegas/",
        "category": "Events",
        "subcategory": None,
        "excerpt": "The nation's largest CBD expo returns to Las Vegas, bringing together industry leaders and enthusiasts.",
        "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        "date": datetime(2024, 1, 15, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Kaya Herb House is a Proud Sponsor and Partner of the Herb Curb at Rebel Salute",
        "url": "https://nugl.com/kaya-herb-house-is-a-proud-sponsor-and-partner-of-the-herb-curb-at-rebel-salute-and-the-rebel-salute-festival/",
        "category": "Events",
        "subcategory": None,
        "excerpt": "Kaya Herb House sponsors Jamaica's premier reggae festival Rebel Salute and its Herb Curb cannabis experience.",
        "image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        "date": datetime(2023, 1, 20, tzinfo=timezone.utc).isoformat(),
        "source": "NUGL.com"
    }
]

async def populate_media():
    print("Starting media articles population...")
    
    # Clear existing media articles
    result = await db.media_articles.delete_many({})
    print(f"Cleared {result.deleted_count} existing media articles")
    
    # Insert new articles
    await db.media_articles.insert_many(media_articles)
    print(f"Inserted {len(media_articles)} media articles")
    
    # Verify insertion
    count = await db.media_articles.count_documents({})
    print(f"Total media articles in database: {count}")
    
    # Show breakdown by category
    print("\nBreakdown by category:")
    for category in ["NUGL TV", "Business", "Culture", "Grow Products", "Wellness", "Events"]:
        count = await db.media_articles.count_documents({"category": category})
        print(f"  {category}: {count} articles")

if __name__ == "__main__":
    asyncio.run(populate_media())
    print("\nMedia population complete!")
