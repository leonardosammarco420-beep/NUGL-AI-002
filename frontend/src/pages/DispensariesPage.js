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
        address: '8 Main Street, Ocho Rios, St. Ann, Jamaica',
        phone: '+1 (876) 882-7233',
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
        address: '82 Lady Musgrave Road, Kingston, Jamaica',
        phone: '+1 (876) 978-9333',
        website: 'https://www.kayaherbhouse.com',
        hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
        description: 'Urban location serving the capital with a full range of cannabis products and accessories.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://www.google.com/maps/place/Kaya+Herb+House/@18.0079169,-76.8032875,17z'
      },
      {
        id: 'kaya-drax-hall',
        name: 'Kaya Herb House - Drax Hall',
        location: 'Drax Hall, St. Ann, Jamaica',
        address: 'Drax Hall, St. Ann, Jamaica',
        phone: '+1 (876) 627-9333',
        website: 'https://www.kayaherbhouse.com',
        hours: 'Mon-Sun: 10:00 AM - 8:00 PM',
        description: 'Scenic Kaya location in Drax Hall offering premium cannabis products in a relaxed atmosphere.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://share.google/Y8XDI8QZUObJ95P3Z'
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
        google_maps_link: 'https://www.google.com/maps/place/Grey+Area/@52.3746908,4.8887153,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/The+Greenhouse+Centrum/@52.3743517,4.8964293,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/Barney%27s+Coffeeshop/@52.3816271,4.8827113,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/MedMen+-+West+Hollywood/@34.0900856,-118.3727756,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/Cookies+San+Francisco/@37.7729876,-122.4196981,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/STIIIZY+DTLA/@34.0407001,-118.2489651,17z'
      }
    ],
    thailand: [
      {
        id: 'greenhouse-bangkok',
        name: 'Greenhouse Seeds Bangkok',
        location: 'Bangkok, Thailand',
        address: '46/202 Nuanchan Road, Bueng Kum, Bangkok 10230',
        phone: '+66 2 XXX XXXX',
        website: 'https://greenhousethailand.com',
        hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        description: 'Official Green House base in Thailand, blending Amsterdam cannabis expertise with Thailand\'s legal cannabis market.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://www.google.com/maps/place/Green+House+Bangkok/@13.8081929,100.6514573,17z'
      },
      {
        id: 'cookies-thailand',
        name: 'Cookies Thailand',
        location: 'Bangkok, Thailand',
        address: '51/2 Soi Ruamrudee, Lumphini, Pathum Wan, Bangkok 10330',
        phone: '+66 XX XXX XXXX',
        website: 'https://www.cookiesth.com',
        hours: 'Mon-Sun: 11:00 AM - 9:00 PM',
        description: 'First Cookies dispensary in Asia featuring premium, locally grown Cookies strains and exclusive merchandise.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://www.google.com/maps/place/Cookies+Thailand/@13.7406773,100.5462513,17z'
      },
      {
        id: 'siam-green-silom',
        name: 'Siam Green Cannabis Co. - Silom',
        location: 'Bangkok, Thailand',
        address: '18 Silom Road, Bangkok 10500',
        phone: '+66 96 893 0545',
        website: 'https://siamgreenco.com',
        hours: 'Mon-Sun: 11:00 AM - 3:00 AM',
        description: 'Premium cannabis lounge near Sala Daeng BTS featuring smoke lounge, co-working space, and private rooms.',
        featured: true,
        rating: 4.6,
        google_maps_link: 'https://www.google.com/maps/place/Siam+Green+Cannabis+Co/@13.7291667,100.5324444,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/Tokyo+Smoke/@43.6476181,-79.4099067,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/Fire+%26+Flower/@49.282705,-123.1228957,17z'
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
        google_maps_link: 'https://www.google.com/maps/place/Spiritleaf/@51.0446801,-114.0740857,17z'
      }
    ],
    germany: [
      {
        id: 'bloom-berlin',
        name: 'Bloom Berlin Cannabis Club',
        location: 'Berlin, Germany',
        address: 'Warschauer Str. 34, 10243 Berlin',
        phone: '+49 30 555 12345',
        website: 'https://www.bloomberlin.de',
        hours: 'Mon-Fri: 2:00 PM - 10:00 PM, Sat-Sun: 12:00 PM - 11:00 PM',
        description: 'Members-only cannabis social club in Berlin\'s vibrant Friedrichshain district. Legal cultivation and distribution for registered members under new German cannabis law.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://www.google.com/maps/place/Warschauer+Str.+34,+Berlin/@52.5056,13.4494,17z'
      },
      {
        id: 'green-garden-munich',
        name: 'Green Garden München',
        location: 'Munich, Germany',
        address: 'Lindwurmstraße 88, 80337 München',
        phone: '+49 89 555 67890',
        website: 'https://www.greengarden-muenchen.de',
        hours: 'Mon-Sun: 3:00 PM - 10:00 PM',
        description: 'Premium cannabis social club offering quality strains and a welcoming community atmosphere. Membership-based access following German regulations.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://www.google.com/maps/place/Lindwurmstra%C3%9Fe+88,+M%C3%BCnchen/@48.1272,11.5491,17z'
      },
      {
        id: 'hanfbar-hamburg',
        name: 'Hanfbar Hamburg Social Club',
        location: 'Hamburg, Germany',
        address: 'Reeperbahn 42, 20359 Hamburg',
        phone: '+49 40 555 23456',
        website: 'https://www.hanfbar-hamburg.de',
        hours: 'Mon-Thu: 4:00 PM - 11:00 PM, Fri-Sun: 2:00 PM - 12:00 AM',
        description: 'Hamburg\'s premier cannabis social club near the iconic Reeperbahn. Members enjoy locally grown organic strains and educational workshops.',
        featured: true,
        rating: 4.6,
        google_maps_link: 'https://www.google.com/maps/place/Reeperbahn+42,+Hamburg/@53.5495,9.9597,17z'
      }
    ],
    australia: [
      {
        id: 'cannahealth-sydney',
        name: 'CannaHealth Sydney',
        location: 'Sydney, New South Wales',
        address: '234 George Street, Sydney NSW 2000',
        phone: '+61 2 8765 4321',
        website: 'https://www.cannahealth.com.au',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM',
        description: 'Medical cannabis dispensary providing prescription cannabis products. Consultation services available with registered healthcare professionals.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://www.google.com/maps/place/234+George+St,+Sydney/@-33.8688,151.2093,17z'
      },
      {
        id: 'montu-melbourne',
        name: 'Montu Medical Cannabis Clinic',
        location: 'Melbourne, Victoria',
        address: '567 Collins Street, Melbourne VIC 3000',
        phone: '+61 3 9876 5432',
        website: 'https://www.montu.com.au',
        hours: 'Mon-Fri: 9:00 AM - 5:30 PM',
        description: 'Leading medical cannabis clinic offering comprehensive patient care, consultations, and access to premium cannabis medicines.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://www.google.com/maps/place/567+Collins+St,+Melbourne/@-37.8174,144.9581,17z'
      },
      {
        id: 'greencare-brisbane',
        name: 'GreenCare Clinic Brisbane',
        location: 'Brisbane, Queensland',
        address: '123 Queen Street, Brisbane QLD 4000',
        phone: '+61 7 3456 7890',
        website: 'https://www.greencareclinic.com.au',
        hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
        description: 'Specialized medical cannabis clinic providing personalized treatment plans and ongoing patient support for chronic conditions.',
        featured: false,
        rating: 4.6,
        google_maps_link: 'https://www.google.com/maps/place/123+Queen+St,+Brisbane/@-27.4698,153.0251,17z'
      }
    ],
    spain: [
      {
        id: 'growshop-bcn',
        name: 'GrowShop Barcelona Cannabis Social Club',
        location: 'Barcelona, Spain',
        address: 'Carrer de Mallorca 234, 08008 Barcelona',
        phone: '+34 933 445 566',
        website: 'https://www.growshopbcn.com',
        hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
        description: 'Exclusive members-only cannabis social club in Barcelona\'s Eixample district. Private consumption lounge with premium strains and events.',
        featured: true,
        rating: 4.9,
        google_maps_link: 'https://www.google.com/maps/place/Carrer+de+Mallorca+234,+Barcelona/@41.3953,2.1597,17z'
      },
      {
        id: 'green-panthers-madrid',
        name: 'Green Panthers Social Club',
        location: 'Madrid, Spain',
        address: 'Calle de Atocha 89, 28012 Madrid',
        phone: '+34 915 678 901',
        website: 'https://www.greenpanthers.es',
        hours: 'Mon-Sun: 12:00 PM - 11:00 PM',
        description: 'Madrid\'s premier cannabis social club offering a sophisticated lounge atmosphere, quality genetics, and regular member events.',
        featured: true,
        rating: 4.7,
        google_maps_link: 'https://www.google.com/maps/place/Calle+de+Atocha+89,+Madrid/@40.4119,-3.7008,17z'
      },
      {
        id: 'cannabaska-bilbao',
        name: 'Cannabaska Social Club',
        location: 'Bilbao, Spain',
        address: 'Gran Vía 45, 48011 Bilbao',
        phone: '+34 944 123 456',
        website: 'https://www.cannabaska.com',
        hours: 'Mon-Fri: 3:00 PM - 10:00 PM, Sat-Sun: 1:00 PM - 11:00 PM',
        description: 'Basque Country\'s finest cannabis social club. Members-only association with organic strains and a welcoming community.',
        featured: true,
        rating: 4.8,
        google_maps_link: 'https://www.google.com/maps/place/Gran+V%C3%ADa+45,+Bilbao/@43.2574,-2.9265,17z'
      },
      {
        id: 'el-jardin-valencia',
        name: 'El Jardín Verde Cannabis Club',
        location: 'Valencia, Spain',
        address: 'Carrer de Xàtiva 12, 46002 Valencia',
        phone: '+34 963 789 012',
        website: 'https://www.eljardinverde.es',
        hours: 'Mon-Sun: 2:00 PM - 10:00 PM',
        description: 'Valencia\'s modern cannabis social club featuring a garden terrace, premium selection, and regular cultural events for members.',
        featured: false,
        rating: 4.6,
        google_maps_link: 'https://www.google.com/maps/place/Carrer+de+X%C3%A0tiva+12,+Valencia/@39.4668,-0.3759,17z'
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
    { name: 'Thailand', count: dispensaries.thailand.length, status: 'Fully Legal (2022)', color: 'purple' },
    { name: 'United States', count: dispensaries.usa.length, status: 'State-by-State', color: 'blue' },
    { name: 'Canada', count: dispensaries.canada.length, status: 'Fully Legal', color: 'teal' },
    { name: 'Germany', count: dispensaries.germany.length, status: 'Legal (2024)', color: 'yellow' },
    { name: 'Australia', count: dispensaries.australia.length, status: 'Medical Only', color: 'cyan' },
    { name: 'Spain', count: dispensaries.spain.length, status: 'Social Clubs Legal', color: 'rose' }
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
                  const regionKey = region.name === 'Netherlands' ? 'amsterdam' : 
                                   region.name === 'United States' ? 'usa' :
                                   region.name.toLowerCase();
                  setSelectedRegion(regionKey);
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className={`p-6 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                  region.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500' :
                  region.color === 'orange' ? 'border-orange-500/30 bg-orange-500/10 hover:border-orange-500' :
                  region.color === 'purple' ? 'border-purple-500/30 bg-purple-500/10 hover:border-purple-500' :
                  region.color === 'blue' ? 'border-blue-500/30 bg-blue-500/10 hover:border-blue-500' :
                  region.color === 'teal' ? 'border-teal-500/30 bg-teal-500/10 hover:border-teal-500' :
                  region.color === 'yellow' ? 'border-yellow-500/30 bg-yellow-500/10 hover:border-yellow-500' :
                  region.color === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500' :
                  'border-rose-500/30 bg-rose-500/10 hover:border-rose-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MapPin className={`w-6 h-6 ${
                    region.color === 'emerald' ? 'text-emerald-400' :
                    region.color === 'orange' ? 'text-orange-400' :
                    region.color === 'purple' ? 'text-purple-400' :
                    region.color === 'blue' ? 'text-blue-400' :
                    region.color === 'teal' ? 'text-teal-400' :
                    region.color === 'yellow' ? 'text-yellow-400' :
                    region.color === 'cyan' ? 'text-cyan-400' :
                    'text-rose-400'
                  }`} />
                  <span className="text-2xl font-bold text-white">{region.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{region.name}</h3>
                <p className={`text-xs font-semibold mb-2 ${
                  region.color === 'emerald' ? 'text-emerald-400' :
                  region.color === 'orange' ? 'text-orange-400' :
                  region.color === 'purple' ? 'text-purple-400' :
                  region.color === 'blue' ? 'text-blue-400' :
                  region.color === 'teal' ? 'text-teal-400' :
                  region.color === 'yellow' ? 'text-yellow-400' :
                  region.color === 'cyan' ? 'text-cyan-400' :
                  'text-rose-400'
                }`}>{region.status}</p>
                <p className="text-xs text-gray-400">Click to view dispensaries</p>
              </button>
            ))}
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
              onClick={() => setSelectedRegion('thailand')}
              variant={selectedRegion === 'thailand' ? 'default' : 'outline'}
              className={selectedRegion === 'thailand' 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'}
            >
              Thailand
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
             selectedRegion === 'thailand' ? 'Thailand - Cannabis Dispensaries' :
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
                    onClick={() => window.open(dispensary.google_maps_link, '_blank')}
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    title="Open in Google Maps"
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
