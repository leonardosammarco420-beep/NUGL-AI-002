import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, ExternalLink, Search, Globe, Phone, Clock, Star } from 'lucide-react';

export default function DispensariesPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dispensary data organized by region
  const dispensaries = {
    jamaica: [
      {
        id: 'kaya-ocho-rios',
        name: 'Kaya Herb House - Ocho Rios',
        location: 'Ocho Rios, Jamaica',
        address: 'Shop #6, Island Village, Ocho Rios, St. Ann, Jamaica',
        phone: '+1 (876) 795-4490',
        website: 'https://www.kayaherbhouse.com',
        hours: 'Mon-Sun: 10:00 AM - 8:00 PM',
        description: 'Jamaica\'s premier cannabis dispensary featuring premium strains, edibles, and wellness products.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://share.google/aFY22wqcHg364IoMa'
      },
      {
        id: 'kaya-kingston',
        name: 'Kaya Herb House - Kingston',
        location: 'Kingston, Jamaica',
        address: 'Shop #8, Marketplace, Kingston, Jamaica',
        phone: '+1 (876) 123-4567',
        website: 'https://www.kayaherbhouse.com',
        hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
        description: 'Urban location serving the capital with a full range of cannabis products and accessories.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://maps.app.goo.gl/KayaKingstonJamaica'
      }
    ],
    amsterdam: [
      {
        id: 'grey-area',
        name: 'Grey Area Coffeeshop',
        location: 'Amsterdam, Netherlands',
        address: 'Oude Leliestraat 2, 1015 AW Amsterdam',
        phone: '+31 20 420 4301',
        website: 'https://www.greyarea.nl',
        hours: 'Mon-Sun: 12:00 PM - 8:00 PM',
        description: 'Award-winning coffeeshop known for premium cannabis and friendly atmosphere.',
        featured: true,
        rating: 4.9,
        google_maps_link: 'https://maps.app.goo.gl/ZxK8vYqMQE9nwVWh9'
      },
      {
        id: 'greenhouse',
        name: 'Green House Coffeeshop',
        location: 'Amsterdam, Netherlands',
        address: 'Oudezijds Voorburgwal 191, 1012 EX Amsterdam',
        phone: '+31 20 627 1739',
        website: 'https://www.greenhousecoffeeshop.com',
        hours: 'Mon-Sun: 9:00 AM - 1:00 AM',
        description: 'Famous coffeeshop with multiple Cannabis Cup awards and a great selection.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://maps.app.goo.gl/GreenhouseAmsterdam'
      },
      {
        id: 'barney',
        name: 'Barney\'s Coffeeshop',
        location: 'Amsterdam, Netherlands',
        address: 'Haarlemmerstraat 102, 1013 EW Amsterdam',
        phone: '+31 20 625 9761',
        website: 'https://www.barneysamsterdam.com',
        hours: 'Mon-Sun: 7:00 AM - 8:00 PM',
        description: 'Iconic coffeeshop and breakfast spot, winner of numerous awards.',
        featured: false,
        rating: 4.7,
        google_maps_link: 'https://maps.app.goo.gl/BarneysAmsterdam'
      }
    ],
    usa: [
      {
        id: 'medmen-la',
        name: 'MedMen - West Hollywood',
        location: 'Los Angeles, California',
        address: '8208 Santa Monica Blvd, West Hollywood, CA 90046',
        phone: '+1 (323) 848-6633',
        website: 'https://www.medmen.com',
        hours: 'Mon-Sun: 8:00 AM - 10:00 PM',
        description: 'Upscale cannabis retailer with a wide selection of products and knowledgeable staff.',
        featured: true,
        rating: 4.6,
        google_maps_link: 'https://maps.app.goo.gl/MedMenWestHollywood'
      },
      {
        id: 'cookies-sf',
        name: 'Cookies - San Francisco',
        location: 'San Francisco, California',
        address: '1563 Mission St, San Francisco, CA 94103',
        phone: '+1 (415) 735-9067',
        website: 'https://www.cookiessf.com',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        description: 'Premium cannabis brand flagship store featuring exclusive strains and apparel.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://maps.app.goo.gl/CookiesSanFrancisco'
      },
      {
        id: 'stiiizy-dtla',
        name: 'STIIIZY DTLA',
        location: 'Los Angeles, California',
        address: '800 E 4th Pl, Los Angeles, CA 90013',
        phone: '+1 (213) 908-0671',
        website: 'https://www.stiiizy.com',
        hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
        description: 'Modern dispensary specializing in premium vapes and cannabis products.',
        featured: false,
        rating: 4.7,
        google_maps_link: 'https://maps.app.goo.gl/STIIIZYDowntownLA'
      }
    ],
    canada: [
      {
        id: 'tokyo-smoke-toronto',
        name: 'Tokyo Smoke - Queen West',
        location: 'Toronto, Ontario',
        address: '669 Queen St W, Toronto, ON M6J 1E6',
        phone: '+1 (416) 546-1420',
        website: 'https://www.tokyosmoke.com',
        hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        description: 'Stylish cannabis retail concept combining lifestyle and premium products.',
        featured: true,
        rating: 4.5,
        google_maps_link: 'https://maps.app.goo.gl/TokyoSmokeToronto'
      },
      {
        id: 'fire-flower-vancouver',
        name: 'Fire & Flower - Vancouver',
        location: 'Vancouver, British Columbia',
        address: '1095 Robson St, Vancouver, BC V6E 1B5',
        phone: '+1 (604) 336-3473',
        website: 'https://www.fireandflower.com',
        hours: 'Mon-Sun: 10:00 AM - 11:00 PM',
        description: 'Premium cannabis retailer with expert staff and diverse product selection.',
        featured: true,
        rating: 4.6,
        google_maps_link: 'https://maps.app.goo.gl/FireFlowerVancouver'
      },
      {
        id: 'spiritleaf-calgary',
        name: 'Spiritleaf - Calgary',
        location: 'Calgary, Alberta',
        address: '1414 8 St SW, Calgary, AB T2R 1J6',
        phone: '+1 (403) 454-7100',
        website: 'https://www.spiritleaf.ca',
        hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        description: 'Canada\'s favorite cannabis store with friendly service and quality products.',
        featured: false,
        rating: 4.7,
        google_maps_link: 'https://maps.app.goo.gl/SpiritleafCalgary'
      }
    ]
  };

  const getAllDispensaries = () => {
    return Object.values(dispensaries).flat();
  };

  const getFilteredDispensaries = () => {
    let filtered = selectedRegion === 'all' 
      ? getAllDispensaries() 
      : dispensaries[selectedRegion] || [];

    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const legalRegions = [
    { name: 'Jamaica', count: dispensaries.jamaica.length, status: 'Legal (Medical)', color: 'emerald' },
    { name: 'Netherlands', count: dispensaries.amsterdam.length, status: 'Decriminalized', color: 'orange' },
    { name: 'United States', count: dispensaries.usa.length, status: 'State-by-State', color: 'blue' },
    { name: 'Canada', count: dispensaries.canada.length, status: 'Fully Legal', color: 'teal' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-10 h-10 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Global Dispensary Map
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Explore cannabis dispensaries, herb houses, and coffeeshops worldwide
          </p>
        </div>

        {/* World Map Visualization */}
        <Card className="mb-8 bg-slate-800/50 border-emerald-500/20 p-8">
          <div className="text-center mb-6">
            <Globe className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white mb-2">Cannabis Legal Status Map</h2>
            <p className="text-gray-400 text-sm">Click on a region to explore dispensaries</p>
          </div>

          {/* Interactive Region Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {legalRegions.map((region) => (
              <button
                key={region.name}
                onClick={() => {
                  const regionKey = region.name === 'Netherlands' ? 'amsterdam' : region.name.toLowerCase().replace(' ', '-');
                  setSelectedRegion(regionKey === 'united-states' ? 'usa' : regionKey);
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className={`p-6 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                  region.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500' :
                  region.color === 'orange' ? 'border-orange-500/30 bg-orange-500/10 hover:border-orange-500' :
                  region.color === 'blue' ? 'border-blue-500/30 bg-blue-500/10 hover:border-blue-500' :
                  'border-teal-500/30 bg-teal-500/10 hover:border-teal-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin className={`w-6 h-6 text-${region.color}-400`} />
                  <span className="text-2xl font-bold text-white">{region.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{region.name}</h3>
                <p className={`text-xs font-semibold text-${region.color}-400 mb-2`}>{region.status}</p>
                <p className="text-xs text-gray-400">Click to view dispensaries</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Search and Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search dispensaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-emerald-500/30 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setSelectedRegion('all')}
              variant={selectedRegion === 'all' ? 'default' : 'outline'}
              className={selectedRegion === 'all' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              All Regions
            </Button>
            <Button
              onClick={() => setSelectedRegion('jamaica')}
              variant={selectedRegion === 'jamaica' ? 'default' : 'outline'}
              className={selectedRegion === 'jamaica' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              Jamaica
            </Button>
            <Button
              onClick={() => setSelectedRegion('amsterdam')}
              variant={selectedRegion === 'amsterdam' ? 'default' : 'outline'}
              className={selectedRegion === 'amsterdam' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              Amsterdam
            </Button>
            <Button
              onClick={() => setSelectedRegion('usa')}
              variant={selectedRegion === 'usa' ? 'default' : 'outline'}
              className={selectedRegion === 'usa' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              USA
            </Button>
            <Button
              onClick={() => setSelectedRegion('canada')}
              variant={selectedRegion === 'canada' ? 'default' : 'outline'}
              className={selectedRegion === 'canada' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              Canada
            </Button>
          </div>
        </div>

        {/* Dispensary Listings */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            {selectedRegion === 'all' ? 'All Dispensaries' : 
             selectedRegion === 'jamaica' ? 'Jamaica - Herb Houses' :
             selectedRegion === 'amsterdam' ? 'Amsterdam - Coffeeshops' :
             selectedRegion === 'usa' ? 'United States - Dispensaries' :
             'Canada - Cannabis Stores'}
            <span className="text-gray-500 text-lg ml-2">({getFilteredDispensaries().length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredDispensaries().map((dispensary) => (
              <Card 
                key={dispensary.id} 
                className={`bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 p-6 transition-all ${
                  dispensary.featured ? 'ring-2 ring-emerald-500/30' : ''
                }`}
              >
                {dispensary.featured && (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{dispensary.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      {dispensary.location}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(dispensary.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-400 ml-1">{dispensary.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{dispensary.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{dispensary.address}</span>
                  </div>
                  {dispensary.phone && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{dispensary.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{dispensary.hours}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(dispensary.website, '_blank')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${dispensary.coordinates.lat},${dispensary.coordinates.lng}`, '_blank')}
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {getFilteredDispensaries().length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No dispensaries found matching your search</p>
            </div>
          )}
        </div>

        {/* Legal Disclaimer */}
        <Card className="mt-8 bg-slate-800/30 border-yellow-500/30 p-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-400 font-bold">!</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-yellow-400 mb-1">Legal Notice</h3>
              <p className="text-xs text-gray-400">
                Cannabis laws vary by country and jurisdiction. Please verify local regulations before visiting any dispensary. 
                This directory is for informational purposes only. NUGL Inc. does not sell cannabis products directly.
                You must be of legal age in your jurisdiction to purchase cannabis.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
