"""
Populate media articles from www.nugl.com into organized categories
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
import uuid

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'nugl_database')

# Sample articles from www.nugl.com organized by category
media_articles = {
    'business': [
        {
            "title": "TYSON 2.0 and Carma HoldCo Land in Jamaica, Bringing Mike Tyson's Knockout Cannabis Line to the Island",
            "description": "Mike Tyson's official cannabis brand TYSON 2.0 announces strategic partnership with Carma HoldCo for Caribbean expansion.",
            "link": "https://nugl.com/tyson-2-0-and-carma-holdco-land-in-jamaica-bringing-mike-tysons-knockout-cannabis-line-to-the-island/",
            "category": "business",
            "subcategory": "industry",
            "image": "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-10-15T00:00:00Z"
        },
        {
            "title": "Navigating Federal Cannabis Legalization and Reform in 2024",
            "description": "Key legislative developments that could reshape federal cannabis reform in 2024, focusing on potential changes in policy.",
            "link": "https://nugl.com/navigating-federal-cannabis-legalization-and-reform-in-2024/",
            "category": "business",
            "subcategory": "legalization",
            "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-05-16T00:00:00Z"
        },
        {
            "title": "Legalizing Cannabis and Its Effect on Hiring in America",
            "description": "How cannabis legalization affects hiring practices in the U.S., reflecting on its impact as a natural alternative for mental health.",
            "link": "https://nugl.com/legalizing-cannabis-and-its-effect-on-hiring-in-america/",
            "category": "business",
            "subcategory": "economics",
            "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-03-10T00:00:00Z"
        },
        {
            "title": "Silo Wellness Announces LOI to Acquire NUGL/Kaya",
            "description": "Transaction valued at CAD $43,289,624.60; CSE to halt trading until shareholder approval.",
            "link": "https://nugl.com/silo-wellness-announces-loi-to-acquire-nugl-kaya-in-a-transaction-valued-at-cad-43289624-60-cse-to-halt-trading-until-shareholder-approval/",
            "category": "business",
            "subcategory": "industry",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
            "author": "Press Release",
            "published_at": "2023-08-29T00:00:00Z"
        }
    ],
    'culture': [
        {
            "title": "CBD vs. THC: Exploring the Differences and Benefits of Cannabinoids",
            "description": "Comprehensive guide exploring the differences between CBD and THC, their effects, and therapeutic benefits.",
            "link": "https://nugl.com/cbd-vs-thc-exploring-the-differences-and-benefits-of-cannabinoids/",
            "category": "culture",
            "subcategory": "science",
            "image": "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-08-31T00:00:00Z"
        },
        {
            "title": "The Science Behind Cannabis: Understanding Its Chemical Composition and Effects",
            "description": "Deep dive into cannabis chemistry, cannabinoids, terpenes, and how they interact with the human body.",
            "link": "https://nugl.com/the-science-behind-cannabis-understanding-its-chemical-composition-and-effects/",
            "category": "culture",
            "subcategory": "science",
            "image": "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-08-22T00:00:00Z"
        },
        {
            "title": "The Bioengineering of Cannabis: What You Need to Know",
            "description": "Exploring bioengineering in cannabis cultivation, its implications, and why it's important for the industry.",
            "link": "https://nugl.com/the-bioengineering-of-cannabis-what-is-it-what-you-need-to-know-and-why-its-important/",
            "category": "culture",
            "subcategory": "science",
            "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-06-20T00:00:00Z"
        },
        {
            "title": "The Stages of Cannabis Growth",
            "description": "Complete guide to cannabis plant lifecycle from seed to harvest, covering each critical growth stage.",
            "link": "https://nugl.com/the-stages-of-cannabis-growth/",
            "category": "culture",
            "subcategory": "education",
            "image": "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-06-11T00:00:00Z"
        },
        {
            "title": "Which Bong Height is Best for You? A Guide for Smooth Hits",
            "description": "Expert guide on choosing the right bong height for optimal smoking experience and smooth hits.",
            "link": "https://nugl.com/which-bong-height-is-best-for-you-a-guide-for-smooth-hits/",
            "category": "culture",
            "subcategory": "education",
            "image": "https://images.unsplash.com/photo-1585662174238-1d44be3a9b50?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-03-20T00:00:00Z"
        }
    ],
    'grow': [
        {
            "title": "6 Most Common Mistakes to Avoid Before You Start Growing Cannabis",
            "description": "Essential tips for beginner growers to avoid common pitfalls and ensure successful cannabis cultivation.",
            "link": "https://nugl.com/6-most-common-mistakes-to-avoid-before-you-start-growing-cannabis/",
            "category": "grow",
            "subcategory": "tips",
            "image": "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-05-15T00:00:00Z"
        },
        {
            "title": "What Is Growing Sinsemilla in a Greenhouse Possible?",
            "description": "Exploring greenhouse cultivation techniques for producing high-quality seedless cannabis.",
            "link": "https://nugl.com/what-is-growing-sinsemilla-in-a-greenhouse-possible/",
            "category": "grow",
            "subcategory": "techniques",
            "image": "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-04-10T00:00:00Z"
        },
        {
            "title": "4 Simple Steps to Grow Marijuana",
            "description": "Beginner-friendly guide breaking down cannabis cultivation into four manageable steps.",
            "link": "https://nugl.com/4-simple-steps-to-grow-marijuana/",
            "category": "grow",
            "subcategory": "beginner",
            "image": "https://images.unsplash.com/photo-1550046286-cb8c662e2bc1?w=800",
            "author": "NUGL Editorial",
            "published_at": "2022-11-20T00:00:00Z"
        },
        {
            "title": "Things to Know About Growing Marijuana At Home",
            "description": "Comprehensive overview of home cultivation essentials, legal considerations, and best practices.",
            "link": "https://nugl.com/things-to-know-about-growing-marijuana-at-home/",
            "category": "grow",
            "subcategory": "home-growing",
            "image": "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800",
            "author": "NUGL Editorial",
            "published_at": "2022-10-15T00:00:00Z"
        },
        {
            "title": "Razor: Creator of Sky Walker OG, Heads Up Next-gen Grow Ops",
            "description": "Interview with legendary breeder Razor on creating Sky Walker OG and modern cultivation operations.",
            "link": "https://nugl.com/razor-creator-of-sky-walker-og-heads-up-next-gen-grow-ops/",
            "category": "grow",
            "subcategory": "profiles",
            "image": "https://images.unsplash.com/photo-1606441071424-bf978c7e36d7?w=800",
            "author": "NUGL Editorial",
            "published_at": "2022-12-05T00:00:00Z"
        }
    ],
    'wellness': [
        {
            "title": "Cannabis and Wellness: Benefits for a Healthier Lifestyle in Miami",
            "description": "Exploring cannabis wellness benefits and products popular in Miami's health-conscious communities.",
            "link": "https://nugl.com/cannabis-and-wellness-exploring-the-benefits-and-products-for-a-healthier-lifestyle-in-miami/",
            "category": "wellness",
            "subcategory": "general",
            "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-06-07T00:00:00Z"
        },
        {
            "title": "The Benefits of CBD for Inflammation in Sports",
            "description": "How CBD is becoming a game changer for athletes dealing with inflammation and recovery.",
            "link": "https://nugl.com/the-benefits-of-cbd-for-inflammation-in-sports-a-game-changer-for-athletes/",
            "category": "wellness",
            "subcategory": "cbd",
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-05-21T00:00:00Z"
        },
        {
            "title": "Clinical Research on Cannabis",
            "description": "Validated therapeutic benefits of cannabis including treatment of chronic pain in adults.",
            "link": "https://nugl.com/clinical-research-on-cannabis/",
            "category": "wellness",
            "subcategory": "medical",
            "image": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-09-15T00:00:00Z"
        },
        {
            "title": "What Is It Like To Be High On Psilocybin Mushrooms?",
            "description": "First-hand accounts and scientific insights into the psilocybin mushroom experience.",
            "link": "https://nugl.com/what-is-it-like-to-be-high-on-psilocybin-mushrooms/",
            "category": "wellness",
            "subcategory": "psychedelics",
            "image": "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-07-10T00:00:00Z"
        }
    ],
    'products': [
        {
            "title": "The Ultimate Guide to the Top 10 CO2 Cannabis Pens in America",
            "description": "Comprehensive review of the best CO2 cannabis vape pens available in the US market.",
            "link": "https://nugl.com/the-ultimate-guide-to-the-top-10-co2-cannabis-pens-in-america/",
            "category": "products",
            "subcategory": "reviews",
            "image": "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800",
            "author": "NUGL Editorial",
            "published_at": "2024-05-30T00:00:00Z"
        },
        {
            "title": "The Shelf Life of Cannabis & Effects of Light and Air",
            "description": "How to properly store cannabis to maintain potency and prevent degradation.",
            "link": "https://nugl.com/the-shelf-life-of-cannabis-effects-of-light-and-air/",
            "category": "products",
            "subcategory": "storage",
            "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-04-15T00:00:00Z"
        },
        {
            "title": "System of a Down: Combining Music & Cannabis With 22Red",
            "description": "How rock legends System of a Down launched their cannabis brand 22Red.",
            "link": "https://nugl.com/system-of-a-down-combining-music-cannabis-with-22red/",
            "category": "products",
            "subcategory": "brands",
            "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-03-20T00:00:00Z"
        },
        {
            "title": "Hitoki Brothers: Bringing Elegance and Sophistication to Cannabis",
            "description": "Revolutionary laser-powered smoking device changing the cannabis consumption experience.",
            "link": "https://nugl.com/hitoki-brothers-bringing-elegance-and-sophistication-to-cannabis/",
            "category": "products",
            "subcategory": "reviews",
            "image": "https://images.unsplash.com/photo-1587340223225-0c4c6e33c777?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-02-10T00:00:00Z"
        }
    ],
    'events': [
        {
            "title": "Cannabis Expos Are Back, and So Is the #STFU Tour",
            "description": "Cannabis expos return with community engagement and advocacy events across the nation.",
            "link": "https://nugl.com/cannabis-expos-are-back-and-so-is-the-stfu-tour/",
            "category": "events",
            "subcategory": "conferences",
            "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-05-20T00:00:00Z"
        },
        {
            "title": "Jamaica Based Kaya Group Ramps Up for Five-Year Anniversary",
            "description": "Kaya Group celebrates five years of legal medical cannabis sales with Irie FM Music Awards.",
            "link": "https://nugl.com/jamaica-based-kaya-group-ramps-up-for-the-five-year-anniversary-of-legal-medical-cannabis-sales-on-march-10-with-irie-fm-music-awards/",
            "category": "events",
            "subcategory": "celebrations",
            "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-02-28T00:00:00Z"
        },
        {
            "title": "Kaya is a Proud Sponsor of the Herb Curb at Rebel Salute",
            "description": "Kaya Herb House partners with Rebel Salute, Jamaica's premier reggae music festival.",
            "link": "https://nugl.com/kaya-herb-house-is-a-proud-sponsor-and-partner-of-the-herb-curb-at-rebel-salute-and-the-rebel-salute-festival/",
            "category": "events",
            "subcategory": "festivals",
            "image": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
            "author": "NUGL Editorial",
            "published_at": "2023-01-20T00:00:00Z"
        }
    ]
}

async def populate_media_articles():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print('📰 Populating Media Articles from www.nugl.com...\n')
    
    # Check existing
    existing_count = await db.media_articles.count_documents({})
    if existing_count > 0:
        print(f"⚠️  Found {existing_count} existing media articles.")
        response = input("Clear and repopulate? (yes/no): ")
        if response.lower() == 'yes':
            await db.media_articles.delete_many({})
            print("Cleared existing media articles.")
        else:
            print("Skipping population.")
            client.close()
            return
    
    # Insert articles by category
    total_articles = 0
    category_counts = {}
    
    for category, articles in media_articles.items():
        category_counts[category] = len(articles)
        for article in articles:
            article['id'] = str(uuid.uuid4())
            await db.media_articles.insert_one(article)
            total_articles += 1
    
    print(f'✅ Successfully inserted {total_articles} media articles!')
    
    print(f'\n📊 Articles by Category:')
    for category, count in category_counts.items():
        print(f'   📁 {category.title()}: {count} articles')
    
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_media_articles())
