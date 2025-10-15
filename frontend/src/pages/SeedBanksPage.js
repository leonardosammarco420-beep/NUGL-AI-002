import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Store,
  Star,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Award,
  ExternalLink,
  ThumbsUp,
  Globe,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

export default function SeedBanksPage() {
  const [filter, setFilter] = useState('all');

  const seedBanks = [
    // Featured Partners
    {
      id: 1,
      name: "Tyson 2.0 Seeds",
      tagline: "Champions Choice - Premium Genetics",
      logo: "🥊",
      country: "USA",
      founded: 2021,
      rating: 4.9,
      reviews: 1250,
      featured: true,
      partner: true,
      exclusive: "Caribbean Exclusive Partner",
      description: "Mike Tyson's official cannabis seed brand offering championship-grade genetics. Known for knockout potency and premium quality. Exclusive Caribbean distribution partner.",
      specialties: ["High THC Strains", "Celebrity Genetics", "Knockout Potency"],
      shipping: ["USA", "Caribbean", "International"],
      paymentMethods: ["Credit Card", "Crypto", "Bank Transfer"],
      germination: "90% guarantee",
      stealth: true,
      pricing: "Premium ($140-160/10 seeds)",
      prosCons: {
        pros: [
          "Celebrity-backed quality assurance",
          "Exclusive Caribbean access",
          "Consistently high THC levels (25-30%)",
          "Premium packaging and branding",
          "Strong genetics and stability"
        ],
        cons: [
          "Higher price point",
          "Limited strain selection (boutique)",
          "Newer brand (less history)"
        ]
      },
      topStrains: ["Toad", "Undisputed", "KO Kush"],
      affiliateLink: "https://tyson20.com?ref=nugl",
      category: "featured"
    },
    {
      id: 2,
      name: "Royal Queen Seeds",
      tagline: "Europe's Leading Seed Bank",
      logo: "👑",
      country: "Spain/Netherlands",
      founded: 2004,
      rating: 4.8,
      reviews: 8450,
      featured: true,
      partner: true,
      exclusive: null,
      description: "One of Europe's most respected seed banks with over 20 years of experience. Royal Queen Seeds combines Dutch breeding expertise with Spanish sunshine to produce award-winning genetics at affordable prices.",
      specialties: ["Fast Flowering", "Autoflowers", "High Yields"],
      shipping: ["Worldwide", "Discreet Packaging", "EU Fast Delivery"],
      paymentMethods: ["Credit Card", "Crypto", "Cash"],
      germination: "80% guarantee",
      stealth: true,
      pricing: "Mid-range ($28-65/5-10 seeds)",
      prosCons: {
        pros: [
          "Excellent value for money",
          "Wide strain selection (100+ varieties)",
          "Fast European shipping",
          "Reliable genetics",
          "Great customer service",
          "Award-winning strains"
        ],
        cons: [
          "Slightly lower germination rate than premium brands",
          "International shipping can be slow"
        ]
      },
      topStrains: ["Royal Gorilla", "Royal Cookies", "Royal Bluematic"],
      affiliateLink: "https://royalqueenseeds.com?ref=nugl",
      category: "featured"
    },
    {
      id: 3,
      name: "The Herbies Headshop",
      tagline: "3000+ Strains - World's Largest Selection",
      logo: "🌿",
      country: "United Kingdom",
      founded: 2000,
      rating: 4.9,
      reviews: 15840,
      featured: true,
      partner: true,
      exclusive: "Official Partner - The Digital Greenhouse",
      description: "The Herbies Headshop is one of the world's leading cannabis seed banks, offering the largest selection of premium genetics from top international breeders. With over 20 years of experience and 3000+ strains, Herbies provides discreet worldwide shipping with stealth packaging and germination guarantees.",
      specialties: ["Massive Selection", "Worldwide Shipping", "Top Breeders", "Stealth Packaging"],
      shipping: ["Worldwide Discreet", "Stealth Packaging", "Tracked Delivery"],
      paymentMethods: ["Credit Card", "Bitcoin", "Crypto", "Bank Transfer"],
      germination: "95% guarantee",
      stealth: true,
      pricing: "Budget to Premium ($15-200/seed pack)",
      prosCons: {
        pros: [
          "Largest strain selection (3000+ strains)",
          "Excellent germination guarantee (95%)",
          "Stealth packaging for discreet delivery",
          "Worldwide shipping to most countries",
          "Top breeder genetics (Dutch Passion, Barney's Farm, FastBuds)",
          "Bitcoin and crypto accepted",
          "Frequent sales and promotions",
          "Excellent customer support"
        ],
        cons: [
          "UK shipping can take 2-3 weeks internationally",
          "Some strains may be out of stock due to high demand"
        ]
      },
      topStrains: ["Gorilla Glue #4", "Girl Scout Cookies", "Bruce Banner", "Wedding Cake", "Zkittlez"],
      affiliateLink: "https://herbiesheadshop.com/?utm_source=digitalgreenhouse&utm_medium=people&utm_campaign=digitalgreenhouse_partner&a_aid=digitalgreenhouse",
      category: "featured"
    },
    // Other Reputable Banks
    {
      id: 4,
      name: "Seedsman",
      tagline: "20+ Years of Excellence",
      logo: "🌱",
      country: "UK/Spain",
      founded: 2003,
      rating: 4.7,
      reviews: 15200,
      featured: false,
      partner: false,
      exclusive: null,
      description: "One of the oldest and most trusted online seed banks. Massive catalog with over 3,000 strains from 65+ breeders. Known for fast delivery and excellent customer service.",
      specialties: ["Huge Selection", "Regular Promos", "Breeder Variety"],
      shipping: ["Worldwide", "Tracked Shipping", "Guaranteed Delivery"],
      paymentMethods: ["Credit Card", "Bitcoin", "Cash"],
      germination: "90% guarantee",
      stealth: true,
      pricing: "Budget to Premium ($25-200)",
      prosCons: {
        pros: [
          "Largest strain selection",
          "Frequent promotions and freebies",
          "Ships worldwide reliably",
          "Multiple breeder options",
          "Good customer support"
        ],
        cons: [
          "Can be overwhelming (too many options)",
          "Some budget strains have lower quality"
        ]
      },
      topStrains: ["Various breeders", "3000+ strains"],
      affiliateLink: "https://seedsman.com",
      category: "established"
    },
    {
      id: 5,
      name: "ILoveGrowingMarijuana (ILGM)",
      tagline: "Beginner-Friendly with Guarantees",
      logo: "💚",
      country: "Netherlands",
      founded: 2012,
      rating: 4.6,
      reviews: 6800,
      featured: false,
      partner: false,
      exclusive: null,
      description: "Perfect for beginners with detailed growing guides and excellent customer support. Offers germination guarantee and ships discretely worldwide.",
      specialties: ["Beginner-Friendly", "Growing Guides", "Guarantees"],
      shipping: ["USA", "Canada", "Europe", "Australia"],
      paymentMethods: ["Credit Card", "Bitcoin", "Cash"],
      germination: "100% guarantee (will replace)",
      stealth: true,
      pricing: "Mid-range ($89-249/5-20 seeds)",
      prosCons: {
        pros: [
          "Best for beginners",
          "Free growing guides and support",
          "100% germination guarantee",
          "USA-friendly shipping",
          "Quality genetics"
        ],
        cons: [
          "Limited strain selection",
          "Slightly pricier than competitors",
          "Smaller community/reviews"
        ]
      },
      topStrains: ["Gorilla Glue", "Girl Scout Cookies", "White Widow"],
      affiliateLink: "https://ilgm.com",
      category: "beginner"
    },
    {
      id: 6,
      name: "Barney's Farm",
      tagline: "Amsterdam's Finest Since 1985",
      logo: "🏆",
      country: "Netherlands",
      founded: 1985,
      rating: 4.8,
      reviews: 5600,
      featured: false,
      partner: false,
      exclusive: null,
      description: "Multiple Cannabis Cup winners with legendary Dutch breeding heritage. Premium genetics known for potency, flavor, and stability.",
      specialties: ["Cup Winners", "Premium Genetics", "Dutch Heritage"],
      shipping: ["Worldwide", "EU Priority", "Discreet"],
      paymentMethods: ["Credit Card", "Bank Transfer", "Cash"],
      germination: "85% guarantee",
      stealth: true,
      pricing: "Premium ($50-120/3-5 seeds)",
      prosCons: {
        pros: [
          "Multiple Cup winners",
          "Excellent genetics and stability",
          "Strong terpene profiles",
          "Legendary breeder reputation",
          "Premium quality control"
        ],
        cons: [
          "Expensive",
          "Smaller seed counts per pack",
          "Can sell out quickly"
        ]
      },
      topStrains: ["LSD", "Pineapple Chunk", "Tangerine Dream"],
      affiliateLink: "https://barneysfarm.com",
      category: "premium"
    },
    {
      id: 7,
      name: "Crop King Seeds",
      tagline: "Canada's #1 Seed Bank",
      logo: "🍁",
      country: "Canada",
      founded: 2005,
      rating: 4.5,
      reviews: 4200,
      featured: false,
      partner: false,
      exclusive: null,
      description: "Leading Canadian seed bank with a focus on North American genetics. Fast shipping to USA and Canada with discreet packaging.",
      specialties: ["Canadian Genetics", "Fast NA Shipping", "Autoflowers"],
      shipping: ["Canada", "USA", "International"],
      paymentMethods: ["Credit Card", "E-transfer", "Bitcoin"],
      germination: "90% guarantee",
      stealth: true,
      pricing: "Mid-range ($65-200/5-25 seeds)",
      prosCons: {
        pros: [
          "Fast North American shipping",
          "Good customer service",
          "Canadian-compliant",
          "Regular sales",
          "Bulk options available"
        ],
        cons: [
          "Limited European availability",
          "Mid-tier genetics (not top shelf)"
        ]
      },
      topStrains: ["Early Miss", "Candy Cane", "Crown Royale"],
      affiliateLink: "https://cropkingseeds.com",
      category: "regional"
    },
    {
      id: 8,
      name: "Sensi Seeds",
      tagline: "Legendary Dutch Genetics Since 1985",
      logo: "🌿",
      country: "Netherlands",
      founded: 1985,
      rating: 4.7,
      reviews: 7100,
      featured: false,
      partner: false,
      exclusive: null,
      description: "One of the oldest and most prestigious seed banks. Created legendary strains like Northern Lights, Skunk #1, and Jack Herer. Museum-quality genetics.",
      specialties: ["Legendary Strains", "Genetic Preservation", "Museum Quality"],
      shipping: ["Worldwide", "Tracked", "Guaranteed"],
      paymentMethods: ["Credit Card", "Bank Transfer", "Cash"],
      germination: "80% guarantee",
      stealth: true,
      pricing: "Mid to Premium ($30-150)",
      prosCons: {
        pros: [
          "Legendary breeder status",
          "Original genetics (not copies)",
          "Genetic preservation focus",
          "Cannabis museum affiliation",
          "Stable, proven genetics"
        ],
        cons: [
          "Some genetics are dated",
          "Higher prices for classics",
          "Less innovation than newer banks"
        ]
      },
      topStrains: ["Jack Herer", "Northern Lights", "Skunk #1"],
      affiliateLink: "https://sensiseeds.com",
      category: "legendary"
    },
    {
      id: 9,
      name: "Fast Buds",
      tagline: "Autoflower Specialists",
      logo: "⚡",
      country: "USA/Spain",
      founded: 2010,
      rating: 4.6,
      reviews: 5800,
      featured: false,
      partner: false,
      exclusive: null,
      description: "Leading autoflower breeder known for fast-finishing, high-yielding genetics. Perfect for quick turnaround and beginner growers.",
      specialties: ["Autoflowers", "Fast Finishing", "High Yields"],
      shipping: ["Worldwide", "Discreet", "Fast"],
      paymentMethods: ["Credit Card", "Crypto", "Cash"],
      germination: "90% guarantee",
      stealth: true,
      pricing: "Mid-range ($40-90/3-7 seeds)",
      prosCons: {
        pros: [
          "Best autoflower genetics",
          "Fast harvest (8-10 weeks total)",
          "High THC for autos (20-25%)",
          "Easy for beginners",
          "Compact plants"
        ],
        cons: [
          "Auto-only (no photoperiod)",
          "Can't clone autos",
          "Smaller yields than photos"
        ]
      },
      topStrains: ["Gorilla Glue Auto", "Wedding Cheesecake Auto", "LSD-25"],
      affiliateLink: "https://fastbuds.com",
      category: "specialist"
    }
  ];

  const filteredBanks = filter === 'all' 
    ? seedBanks 
    : filter === 'partners'
    ? seedBanks.filter(b => b.partner)
    : seedBanks.filter(b => b.category === filter);

  const handleVisitBank = (bank) => {
    toast.success(`Opening ${bank.name}`, {
      description: 'You will be redirected to their website'
    });
    window.open(bank.affiliateLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Store className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Seed Bank Directory & Reviews
            </h1>
          </div>
          <p className="text-gray-400 text-xl">
            Trusted cannabis seed banks with verified reviews and detailed ratings
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-8">
          <TabsList className="bg-slate-800 grid grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="all">All Banks</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="established">Established</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="specialist">Specialist</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Seed Banks List */}
        <div className="space-y-6">
          {filteredBanks.map((bank) => (
            <Card 
              key={bank.id}
              className={`${
                bank.partner 
                  ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30' 
                  : 'bg-slate-800/50 border-slate-700'
              } overflow-hidden hover:scale-[1.01] transition-all duration-300`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {bank.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-white">{bank.name}</h2>
                        {bank.partner && (
                          <Badge className="bg-yellow-500/90 text-black border-0">
                            <Award className="w-3 h-3 mr-1" />
                            Partner
                          </Badge>
                        )}
                      </div>
                      <p className="text-green-400 mb-2">{bank.tagline}</p>
                      {bank.exclusive && (
                        <Badge className="bg-purple-500/90 text-white border-0 mb-2">
                          {bank.exclusive}
                        </Badge>
                      )}
                      <p className="text-gray-300 mb-3">{bank.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {bank.specialties.map((spec, idx) => (
                          <Badge key={idx} variant="outline" className="border-green-500/30 text-gray-300">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating Box */}
                  <div className="bg-slate-700/30 rounded-lg p-4 text-center min-w-[140px]">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(bank.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{bank.rating}</p>
                    <p className="text-gray-400 text-sm">{bank.reviews.toLocaleString()} reviews</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400 text-sm">Location</span>
                    </div>
                    <p className="text-white font-semibold">{bank.country}</p>
                    <p className="text-gray-400 text-xs">Est. {bank.founded}</p>
                  </div>

                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Germination</span>
                    </div>
                    <p className="text-white font-semibold">{bank.germination}</p>
                    {bank.stealth && <p className="text-gray-400 text-xs">Stealth shipping</p>}
                  </div>

                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400 text-sm">Payment</span>
                    </div>
                    <p className="text-white text-sm">{bank.paymentMethods.join(', ')}</p>
                  </div>

                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-teal-400" />
                      <span className="text-gray-400 text-sm">Pricing</span>
                    </div>
                    <p className="text-white font-semibold text-sm">{bank.pricing}</p>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-5 h-5 text-green-400" />
                      <h4 className="text-white font-semibold">Pros</h4>
                    </div>
                    <ul className="space-y-1">
                      {bank.prosCons.pros.map((pro, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-red-400" />
                      <h4 className="text-white font-semibold">Cons</h4>
                    </div>
                    <ul className="space-y-1">
                      {bank.prosCons.cons.map((con, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-red-400">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Top Strains and CTA */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Popular Strains:</p>
                    <div className="flex flex-wrap gap-2">
                      {bank.topStrains.map((strain, idx) => (
                        <Badge key={idx} className="bg-slate-700/50 text-white border-slate-600">
                          {strain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Special handling for Herbies - show both Global and USA links */}
                  {bank.name === "The Herbies Headshop" ? (
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => handleVisitBank(bank)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white whitespace-nowrap"
                        size="lg"
                      >
                        Visit Herbies (Global)
                        <Globe className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        onClick={() => {
                          const usaLink = "https://herbiesheadshop.com/usa?utm_source=digitalgreenhouse&utm_medium=people&utm_campaign=digitalgreenhouse_partner&a_aid=digitalgreenhouse&a_cid=d4a9f156";
                          window.open(usaLink, '_blank');
                          toast.success("Redirecting to Herbies USA...");
                        }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white whitespace-nowrap"
                        size="lg"
                      >
                        Visit Herbies USA 🇺🇸
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleVisitBank(bank)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white whitespace-nowrap"
                      size="lg"
                    >
                      Visit {bank.name}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
