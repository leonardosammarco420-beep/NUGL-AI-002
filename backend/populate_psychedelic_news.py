"""
Populate psychedelic news articles
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone, timedelta
import os
import uuid
import random

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'nugl_database')

psychedelic_articles = [
    {
        "title": "COMPASS Pathways Announces Positive Phase 3 Results for Psilocybin Therapy",
        "description": "COMPASS Pathways plc announced today that its investigational COMP360 psilocybin therapy met primary and key secondary endpoints in the Phase 3 trial for treatment-resistant depression.",
        "link": "https://www.compasspathways.com/phase-3-results",
        "source": "COMPASS Pathways",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat()
    },
    {
        "title": "Mind Medicine Receives FDA Breakthrough Therapy Designation for LSD-Assisted Therapy",
        "description": "MindMed receives Breakthrough Therapy Designation from the FDA for MM120 (LSD) for the treatment of Generalized Anxiety Disorder, marking a major milestone for psychedelic medicine.",
        "link": "https://mindmed.co/breakthrough-therapy",
        "source": "Mind Medicine",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=5)).isoformat()
    },
    {
        "title": "Oregon Launches First Licensed Psilocybin Service Centers",
        "description": "Oregon becomes the first state to open licensed psilocybin service centers where adults can legally access facilitated psilocybin experiences for therapeutic purposes.",
        "link": "https://www.oregonlive.com/psilocybin-centers",
        "source": "Oregon Live",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=8)).isoformat()
    },
    {
        "title": "Johns Hopkins Opens New Center for Psychedelic Research",
        "description": "Johns Hopkins Medicine announces the opening of its Center for Psychedelic and Consciousness Research, the first of its kind in the US, with $17 million in funding.",
        "link": "https://www.hopkinsmedicine.org/psychedelic-center",
        "source": "Johns Hopkins Medicine",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=12)).isoformat()
    },
    {
        "title": "Cybin Completes Enrollment for Phase 2 Trial of CYB003",
        "description": "Cybin Inc. announces completion of patient enrollment for its Phase 2 trial evaluating CYB003, a proprietary deuterated psilocybin analog, for major depressive disorder.",
        "link": "https://www.cybin.com/phase-2-enrollment",
        "source": "Cybin Inc",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=15)).isoformat()
    },
    {
        "title": "ATAI Life Sciences Partners with Major Pharma on DMT Research",
        "description": "ATAI Life Sciences announces strategic partnership with leading pharmaceutical company to advance development of DMT-based therapies for treatment-resistant depression.",
        "link": "https://www.atai.life/partnership-announcement",
        "source": "ATAI Life Sciences",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(hours=18)).isoformat()
    },
    {
        "title": "Australia Legalizes Psilocybin and MDMA for Medical Use",
        "description": "Australia becomes the first country to legalize the prescription of MDMA and psilocybin for psychiatric treatment, marking a historic shift in drug policy.",
        "link": "https://www.tga.gov.au/psychedelic-medicines",
        "source": "TGA Australia",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
    },
    {
        "title": "Numinus Wellness Reports Record Quarter as Therapy Demand Surges",
        "description": "Numinus reports 156% increase in psychedelic-assisted therapy sessions in Q3, driven by growing acceptance and clinical evidence for mental health applications.",
        "link": "https://numinus.com/q3-earnings",
        "source": "Numinus Wellness",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=1, hours=6)).isoformat()
    },
    {
        "title": "Field Trip Health Expands Ketamine Clinic Network to 15 Locations",
        "description": "Field Trip Health opens three new ketamine-assisted therapy clinics in major US cities, expanding its North American footprint to 15 locations.",
        "link": "https://fieldtriphealth.com/expansion",
        "source": "Field Trip Health",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=1, hours=12)).isoformat()
    },
    {
        "title": "Red Light Holland Launches Microdosing Education Platform",
        "description": "Red Light Holland introduces comprehensive online education platform for psilocybin microdosing, featuring expert videos, dosing guides, and integration coaching.",
        "link": "https://redlight.co/education-platform",
        "source": "Red Light Holland",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
    },
    {
        "title": "Study Shows Psilocybin Outperforms SSRIs for Depression Treatment",
        "description": "New research published in JAMA Psychiatry finds psilocybin-assisted therapy significantly more effective than traditional antidepressants for major depressive disorder.",
        "link": "https://jamanetwork.com/psilocybin-study",
        "source": "JAMA Psychiatry",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=2, hours=8)).isoformat()
    },
    {
        "title": "Imperial College London Receives £5M for Psychedelic Research",
        "description": "Imperial College London's Centre for Psychedelic Research secures £5 million grant to study psilocybin's effects on brain connectivity and consciousness.",
        "link": "https://www.imperial.ac.uk/psychedelic-research-grant",
        "source": "Imperial College London",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=3)).isoformat()
    },
    {
        "title": "California Senate Passes Bill to Decriminalize Psychedelics",
        "description": "California State Senate votes to advance legislation that would decriminalize possession of psilocybin, DMT, and mescaline for adults over 21.",
        "link": "https://leginfo.legislature.ca.gov/psychedelic-bill",
        "source": "California Legislature",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=3, hours=10)).isoformat()
    },
    {
        "title": "Psychedelic Medicine ETF Launches on NASDAQ",
        "description": "First-ever psychedelic medicine ETF begins trading on NASDAQ, offering investors diversified exposure to leading companies in the emerging sector.",
        "link": "https://www.nasdaq.com/psychedelic-etf",
        "source": "NASDAQ",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=4)).isoformat()
    },
    {
        "title": "Veterans Affairs Approves Psychedelic Research for PTSD",
        "description": "US Department of Veterans Affairs greenlights clinical trials studying MDMA and psilocybin for treatment of post-traumatic stress disorder in military veterans.",
        "link": "https://www.va.gov/psychedelic-ptsd-study",
        "source": "VA Research",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=4, hours=14)).isoformat()
    },
    {
        "title": "Beckley Psytech Reports Success in DMT Therapy Trial",
        "description": "Beckley Psytech announces positive interim results from Phase 1/2a trial of BPL-003, a novel DMT-based formulation for depression and anxiety disorders.",
        "link": "https://beckleypsytech.com/trial-results",
        "source": "Beckley Psytech",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
    },
    {
        "title": "Psilocybin Shows Promise for Alcohol Use Disorder in NYU Study",
        "description": "NYU Langone researchers publish findings showing psilocybin-assisted therapy reduced heavy drinking by 83% in alcohol use disorder patients over 8-month period.",
        "link": "https://med.nyu.edu/psilocybin-alcohol-study",
        "source": "NYU Medicine",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=5, hours=9)).isoformat()
    },
    {
        "title": "Psychedelic Stocks Rally on Positive Clinical Data",
        "description": "Psychedelic medicine stocks surge with CMPS up 23%, MNMD up 18% following multiple positive clinical trial announcements and regulatory progress.",
        "link": "https://www.bloomberg.com/psychedelic-stocks-rally",
        "source": "Bloomberg",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=6)).isoformat()
    },
    {
        "title": "Colorado Opens First Legal Psilocybin Healing Centers",
        "description": "Following voter approval of Proposition 122, Colorado launches regulated psilocybin access program with licensed facilitators and healing centers statewide.",
        "link": "https://cdphe.colorado.gov/psilocybin-program",
        "source": "Colorado Health Dept",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=6, hours=11)).isoformat()
    },
    {
        "title": "MAPS Completes Final MDMA-PTSD Trial Enrollment",
        "description": "Multidisciplinary Association for Psychedelic Studies announces completion of Phase 3 enrollment for MDMA-assisted therapy for PTSD, with FDA review expected in 2025.",
        "link": "https://maps.org/mdma-trial-complete",
        "source": "MAPS",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    },
    {
        "title": "Psychedelic Therapy Market to Reach $10.75B by 2027",
        "description": "New market research report projects global psychedelic therapy market will exceed $10 billion by 2027, driven by FDA approvals and growing mental health crisis.",
        "link": "https://www.marketresearch.com/psychedelic-therapy-forecast",
        "source": "Market Research",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=7, hours=8)).isoformat()
    },
    {
        "title": "Psychedelic Science Conference Draws Record 12,000 Attendees",
        "description": "Largest-ever psychedelic medicine conference concludes in Denver with groundbreaking research presentations and networking among clinicians, researchers, and investors.",
        "link": "https://psychedelicscience.org/conference-2025",
        "source": "Psychedelic Science",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=8)).isoformat()
    },
    {
        "title": "Insurance Companies Begin Covering Ketamine Therapy",
        "description": "Major health insurers announce coverage for ketamine-assisted therapy for treatment-resistant depression, signaling mainstream acceptance of psychedelic medicine.",
        "link": "https://www.healthcare.com/ketamine-insurance-coverage",
        "source": "Healthcare News",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=8, hours=15)).isoformat()
    },
    {
        "title": "GH Research Advances Phase 2 Trial of 5-MeO-DMT",
        "description": "GH Research announces positive topline data from Phase 2a trial of GH001, a proprietary 5-MeO-DMT therapy for treatment-resistant depression.",
        "link": "https://www.ghres.com/phase-2-results",
        "source": "GH Research",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=9)).isoformat()
    },
    {
        "title": "Yale Launches Psychedelic Neuroscience Initiative",
        "description": "Yale School of Medicine establishes dedicated program to study neural mechanisms of psychedelic compounds with $15 million in initial funding.",
        "link": "https://medicine.yale.edu/psychedelic-initiative",
        "source": "Yale Medicine",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=9, hours=10)).isoformat()
    },
    {
        "title": "Psilocybin Reduces End-of-Life Anxiety in Cancer Patients",
        "description": "Long-term follow-up study shows psilocybin-assisted therapy provided sustained reduction in existential distress and improved quality of life for terminal cancer patients.",
        "link": "https://www.ncbi.nlm.nih.gov/psilocybin-cancer-anxiety",
        "source": "Nature Medicine",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=10)).isoformat()
    },
    {
        "title": "Psychedelic Startups Raise $500M in Venture Funding This Quarter",
        "description": "Psychedelic medicine companies secure record $500 million in Q3 venture capital funding as institutional investors embrace the emerging therapeutic sector.",
        "link": "https://www.crunchbase.com/psychedelic-vc-funding",
        "source": "Crunchbase",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=10, hours=12)).isoformat()
    },
    {
        "title": "WHO Recommends Rescheduling Psilocybin for Medical Research",
        "description": "World Health Organization expert committee recommends rescheduling psilocybin to facilitate medical research while maintaining appropriate regulatory controls.",
        "link": "https://www.who.int/psilocybin-scheduling",
        "source": "WHO",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=11)).isoformat()
    },
    {
        "title": "Psychedelic Retreats See 300% Increase in Bookings",
        "description": "Legal psilocybin retreat centers in Jamaica, Netherlands, and Oregon report 300% year-over-year increase in bookings as mainstream interest grows.",
        "link": "https://www.retreatinsights.com/psychedelic-tourism",
        "source": "Retreat Insights",
        "category": "psychedelics",
        "sentiment": "neutral",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=11, hours=7)).isoformat()
    },
    {
        "title": "FDA Fast-Tracks Review of COMP360 for Treatment-Resistant Depression",
        "description": "FDA grants Priority Review designation for COMPASS Pathways' New Drug Application for COMP360 psilocybin therapy, with decision expected within 6 months.",
        "link": "https://www.fda.gov/comp360-priority-review",
        "source": "FDA",
        "category": "psychedelics",
        "sentiment": "bullish",
        "published_at": (datetime.now(timezone.utc) - timedelta(days=12)).isoformat()
    }
]

async def populate_psychedelic_news():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    print('📰 Populating Psychedelic News...\n')
    
    # Check existing
    existing_count = await db.legacy_articles.count_documents({'category': 'psychedelics'})
    if existing_count > 0:
        print(f"⚠️  Found {existing_count} existing psychedelic articles.")
        response = input("Clear and repopulate? (yes/no): ")
        if response.lower() == 'yes':
            await db.legacy_articles.delete_many({'category': 'psychedelics'})
            print("Cleared existing psychedelic articles.")
        else:
            print("Skipping population.")
            client.close()
            return
    
    # Add articles
    for article in psychedelic_articles:
        article['id'] = str(uuid.uuid4())
        await db.legacy_articles.insert_one(article)
    
    print(f'✅ Successfully inserted {len(psychedelic_articles)} psychedelic news articles!')
    
    # Show breakdown
    bullish = len([a for a in psychedelic_articles if a['sentiment'] == 'bullish'])
    neutral = len([a for a in psychedelic_articles if a['sentiment'] == 'neutral'])
    bearish = len([a for a in psychedelic_articles if a['sentiment'] == 'bearish'])
    
    print(f'\n📊 Sentiment Breakdown:')
    print(f'   🟢 Bullish: {bullish}')
    print(f'   🟡 Neutral: {neutral}')
    print(f'   🔴 Bearish: {bearish}')
    
    print(f'\n📅 Date Range:')
    print(f'   Most Recent: 2 hours ago')
    print(f'   Oldest: 12 days ago')
    
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_psychedelic_news())
