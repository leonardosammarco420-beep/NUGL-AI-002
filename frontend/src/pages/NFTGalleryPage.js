import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  Star, 
  Users, 
  Eye,
  Heart,
  Sparkles,
  Layers,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

export default function NFTGalleryPage() {
  const [filter, setFilter] = useState('all');

  const artists = [
    {
      id: 1,
      name: 'CryptoCanvas Collective',
      username: '@cryptocanvas',
      avatar: '🎨',
      bio: 'Premier cannabis art collective creating psychedelic digital masterpieces',
      specialty: 'Psychedelic Art',
      verified: true,
      followers: '125K',
      collections: 5,
      totalSales: '245 ETH',
      featured: [
        {
          title: 'Mind Expansion #7',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
          price: '2.5 ETH',
          likes: 342
        },
        {
          title: 'Sacred Geometry',
          image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800',
          price: '1.8 ETH',
          likes: 289
        },
        {
          title: 'Cannabis Cosmos',
          image: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800',
          price: '3.2 ETH',
          likes: 421
        }
      ]
    },
    {
      id: 2,
      name: 'GreenLeaf Studios',
      username: '@greenleafnft',
      avatar: '🌿',
      bio: 'Botanical illustrations meet blockchain - celebrating cannabis culture through art',
      specialty: 'Botanical Illustration',
      verified: true,
      followers: '89K',
      collections: 3,
      totalSales: '178 ETH',
      featured: [
        {
          title: 'Indica Dreams',
          image: 'https://images.unsplash.com/photo-1523340240824-e827a46850a0?w=800',
          price: '1.5 ETH',
          likes: 267
        },
        {
          title: 'Sativa Sunrise',
          image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=800',
          price: '1.2 ETH',
          likes: 198
        },
        {
          title: 'Trichome Close-up',
          image: 'https://images.unsplash.com/photo-1587339078087-38e72099be01?w=800',
          price: '2.0 ETH',
          likes: 345
        }
      ]
    },
    {
      id: 3,
      name: 'DigitalDank',
      username: '@digitaldank',
      avatar: '💎',
      bio: '3D rendered cannabis scenes with cinematic lighting and photorealistic detail',
      specialty: '3D Rendering',
      verified: true,
      followers: '156K',
      collections: 7,
      totalSales: '412 ETH',
      featured: [
        {
          title: 'Glass Paradise',
          image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800',
          price: '4.5 ETH',
          likes: 589
        },
        {
          title: 'Neon Dispensary',
          image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800',
          price: '3.8 ETH',
          likes: 512
        },
        {
          title: 'Crystal Cultivation',
          image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800',
          price: '5.2 ETH',
          likes: 678
        }
      ]
    },
    {
      id: 4,
      name: 'Abstract Herb',
      username: '@abstractherb',
      avatar: '🌈',
      bio: 'Abstract interpretations of cannabis culture through vibrant colors and bold shapes',
      specialty: 'Abstract Art',
      verified: true,
      followers: '67K',
      collections: 4,
      totalSales: '134 ETH',
      featured: [
        {
          title: 'Chromatic Cannabis',
          image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800',
          price: '1.9 ETH',
          likes: 234
        },
        {
          title: 'Geometric Green',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
          price: '2.2 ETH',
          likes: 301
        },
        {
          title: 'Fluid Forms',
          image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
          price: '1.7 ETH',
          likes: 189
        }
      ]
    },
    {
      id: 5,
      name: 'RetroReef',
      username: '@retroreef',
      avatar: '🕹️',
      bio: 'Retro gaming aesthetics meets cannabis culture - pixel art and vaporwave vibes',
      specialty: 'Pixel Art',
      verified: true,
      followers: '94K',
      collections: 6,
      totalSales: '203 ETH',
      featured: [
        {
          title: '8-Bit Budz',
          image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
          price: '0.8 ETH',
          likes: 456
        },
        {
          title: 'Vaporwave Valley',
          image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800',
          price: '1.1 ETH',
          likes: 389
        },
        {
          title: 'Retro Dispensary',
          image: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800',
          price: '0.9 ETH',
          likes: 278
        }
      ]
    },
    {
      id: 6,
      name: 'PhotoSynthesis Lab',
      username: '@photosynth',
      avatar: '📸',
      bio: 'High-resolution cannabis photography transformed into exclusive digital collectibles',
      specialty: 'Photography',
      verified: true,
      followers: '112K',
      collections: 8,
      totalSales: '289 ETH',
      featured: [
        {
          title: 'Purple Haze Macro',
          image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
          price: '2.8 ETH',
          likes: 567
        },
        {
          title: 'Golden Hour Grow',
          image: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=800',
          price: '2.1 ETH',
          likes: 412
        },
        {
          title: 'Trichome Universe',
          image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
          price: '3.5 ETH',
          likes: 689
        }
      ]
    }
  ];

  const filteredArtists = filter === 'all' 
    ? artists 
    : artists.filter(artist => {
        if (filter === 'top') return parseFloat(artist.totalSales) > 200;
        if (filter === 'trending') return artist.followers.includes('K') && parseInt(artist.followers) > 100;
        return artist.specialty.toLowerCase().includes(filter);
      });

  const handleViewArtist = (artist) => {
    toast.success(`Opening ${artist.name}'s gallery`);
    // In real implementation, would navigate to artist's full profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              NFT Artist Gallery
            </h1>
          </div>
          <p className="text-gray-400 text-xl mb-4">
            Discover exclusive cannabis art from verified creators worldwide
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">6 Featured Artists • 33 Collections • 1,461 ETH Total Sales</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-8">
          <TabsList className="bg-slate-800 grid grid-cols-3 lg:grid-cols-7 gap-1">
            <TabsTrigger value="all">All Artists</TabsTrigger>
            <TabsTrigger value="top">Top Sellers</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="psychedelic">Psychedelic</TabsTrigger>
            <TabsTrigger value="3d">3D Art</TabsTrigger>
            <TabsTrigger value="photography">Photography</TabsTrigger>
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Artists Grid */}
        <div className="space-y-12">
          {filteredArtists.map((artist) => (
            <Card 
              key={artist.id}
              className="bg-slate-800/50 border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="p-6">
                {/* Artist Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl">
                      {artist.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
                        {artist.verified && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-purple-400 mb-2">{artist.username}</p>
                      <p className="text-gray-400 max-w-2xl">{artist.bio}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleViewArtist(artist)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    View Gallery
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Artist Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Specialty</p>
                    <p className="text-white font-semibold">{artist.specialty}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Collections</p>
                    <div className="flex items-center gap-1">
                      <Layers className="w-4 h-4 text-teal-400" />
                      <p className="text-white font-semibold">{artist.collections}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Followers</p>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-purple-400" />
                      <p className="text-white font-semibold">{artist.followers}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Sales</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <p className="text-green-400 font-bold">{artist.totalSales}</p>
                    </div>
                  </div>
                </div>

                {/* Featured Works */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Featured Works
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {artist.featured.map((work, idx) => (
                      <div 
                        key={idx}
                        className="group relative overflow-hidden rounded-lg bg-slate-700/30 hover:scale-105 transition-transform duration-300"
                      >
                        <img 
                          src={work.image} 
                          alt={work.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h4 className="text-white font-semibold mb-2">{work.title}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-teal-400 font-bold">{work.price}</span>
                              <div className="flex items-center gap-1 text-pink-400">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{work.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtists.length === 0 && (
          <Card className="bg-slate-800/50 border-purple-500/20 p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Artists Found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </Card>
        )}

        {/* Info Banner */}
        <Card className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Become a Featured Artist</h3>
              <p className="text-gray-300 mb-4">
                Join our curated gallery and showcase your cannabis-inspired art to collectors worldwide. 
                We support artists through promotional campaigns, gallery features, and community exposure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-white">Submit Your Portfolio</h4>
                  </div>
                  <p className="text-sm">Share your best cannabis-themed artwork with our curation team.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-white">Get Verified</h4>
                  </div>
                  <p className="text-sm">Receive your verification badge and gallery profile page.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-white">Start Selling</h4>
                  </div>
                  <p className="text-sm">List your NFTs and connect with collectors in our marketplace.</p>
                </div>
              </div>
              <Button 
                className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                size="lg"
              >
                Apply as Artist
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
