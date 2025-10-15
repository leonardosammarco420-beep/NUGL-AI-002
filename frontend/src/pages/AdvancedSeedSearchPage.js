import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Search, 
  Filter, 
  Leaf,
  Clock,
  TrendingUp,
  Droplet,
  Sun,
  Award,
  ExternalLink,
  Star
} from 'lucide-react';

export default function AdvancedSeedSearchPage() {
  const [seeds, setSeeds] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [thcFilter, setThcFilter] = useState('all');
  const [floweringFilter, setFloweringFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  // Sample seed data - in production this would come from API
  const allSeeds = [
    // Tyson 2.0 Seeds
    {
      id: 1,
      name: "Tyson 2.0 - Toad",
      breeder: "Tyson 2.0",
      type: "indica",
      thc: 28,
      cbd: 0.5,
      flowering: "8-9 weeks",
      difficulty: "easy",
      yield: "High",
      climate: "Indoor/Outdoor",
      genetics: "Chemdawg x Girl Scout Cookies",
      price: "$150/10 seeds",
      effects: ["Relaxed", "Euphoric", "Sleepy"],
      flavors: ["Earthy", "Pine", "Diesel"],
      rating: 4.8,
      featured: true,
      affiliate: "tyson",
      image: "https://images.unsplash.com/photo-1536157317384-5b3d1194daa8?w=400"
    },
    {
      id: 2,
      name: "Tyson 2.0 - Undisputed",
      breeder: "Tyson 2.0",
      type: "hybrid",
      thc: 26,
      cbd: 0.8,
      flowering: "9-10 weeks",
      difficulty: "medium",
      yield: "Very High",
      climate: "Indoor/Outdoor",
      genetics: "Gelato x Wedding Cake",
      price: "$140/10 seeds",
      effects: ["Happy", "Creative", "Uplifted"],
      flavors: ["Sweet", "Vanilla", "Cream"],
      rating: 4.9,
      featured: true,
      affiliate: "tyson",
      image: "https://images.unsplash.com/photo-1583912267550-d974273b6e9c?w=400"
    },
    {
      id: 3,
      name: "Tyson 2.0 - KO Kush",
      breeder: "Tyson 2.0",
      type: "indica",
      thc: 30,
      cbd: 0.3,
      flowering: "7-8 weeks",
      difficulty: "easy",
      yield: "High",
      climate: "Indoor/Greenhouse",
      genetics: "OG Kush x Purple Punch",
      price: "$160/10 seeds",
      effects: ["Relaxed", "Sedated", "Pain Relief"],
      flavors: ["Grape", "Berry", "Spice"],
      rating: 4.7,
      featured: true,
      affiliate: "tyson",
      image: "https://images.unsplash.com/photo-1612564838998-1b945ef5a8f6?w=400"
    },
    // Royal Queen Seeds
    {
      id: 4,
      name: "Royal Gorilla",
      breeder: "Royal Queen Seeds",
      type: "hybrid",
      thc: 27,
      cbd: 0.6,
      flowering: "8-9 weeks",
      difficulty: "medium",
      yield: "Very High",
      climate: "Indoor/Outdoor",
      genetics: "Sour Dubb x Chem Sis x Chocolate Diesel",
      price: "$35/5 seeds",
      effects: ["Euphoric", "Uplifted", "Creative"],
      flavors: ["Sour", "Pine", "Earthy"],
      rating: 4.6,
      featured: true,
      affiliate: "rqs",
      image: "https://images.unsplash.com/photo-1605523952458-1946af1cf12f?w=400"
    },
    {
      id: 5,
      name: "Royal Cookies",
      breeder: "Royal Queen Seeds",
      type: "hybrid",
      thc: 23,
      cbd: 1.0,
      flowering: "8 weeks",
      difficulty: "easy",
      yield: "Medium",
      climate: "Indoor/Outdoor",
      genetics: "Forum Cookies x GSC",
      price: "$30/5 seeds",
      effects: ["Relaxed", "Happy", "Creative"],
      flavors: ["Sweet", "Earthy", "Vanilla"],
      rating: 4.5,
      featured: true,
      affiliate: "rqs",
      image: "https://images.unsplash.com/photo-1530639834082-82976e2e2e40?w=400"
    },
    {
      id: 6,
      name: "Royal Bluematic",
      breeder: "Royal Queen Seeds",
      type: "hybrid",
      thc: 14,
      cbd: 0.4,
      flowering: "8-9 weeks (Auto)",
      difficulty: "easy",
      yield: "Medium",
      climate: "Indoor/Outdoor",
      genetics: "Blueberry x Ruderalis",
      price: "$28/5 seeds",
      effects: ["Relaxed", "Happy", "Uplifted"],
      flavors: ["Blueberry", "Sweet", "Fruity"],
      rating: 4.4,
      featured: true,
      affiliate: "rqs",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400"
    },
    // Other Premium Seeds
    {
      id: 7,
      name: "Blue Dream",
      breeder: "Various",
      type: "sativa",
      thc: 21,
      cbd: 0.2,
      flowering: "9-10 weeks",
      difficulty: "easy",
      yield: "High",
      climate: "Indoor/Outdoor",
      genetics: "Blueberry x Haze",
      price: "$65/10 seeds",
      effects: ["Creative", "Energetic", "Euphoric"],
      flavors: ["Blueberry", "Sweet", "Berry"],
      rating: 4.7,
      featured: false,
      affiliate: null,
      image: "https://images.unsplash.com/photo-1616684519368-92c99f85e4b6?w=400"
    },
    {
      id: 8,
      name: "Northern Lights",
      breeder: "Various",
      type: "indica",
      thc: 18,
      cbd: 0.1,
      flowering: "7-8 weeks",
      difficulty: "easy",
      yield: "Medium",
      climate: "Indoor",
      genetics: "Afghani x Thai",
      price: "$55/10 seeds",
      effects: ["Relaxed", "Sleepy", "Happy"],
      flavors: ["Earthy", "Pine", "Sweet"],
      rating: 4.8,
      featured: false,
      affiliate: null,
      image: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=400"
    }
  ];

  useEffect(() => {
    setSeeds(allSeeds);
  }, []);

  const filteredSeeds = seeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(search.toLowerCase()) ||
                         seed.breeder.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || seed.type === typeFilter;
    const matchesTHC = thcFilter === 'all' || 
                      (thcFilter === 'high' && seed.thc >= 25) ||
                      (thcFilter === 'medium' && seed.thc >= 15 && seed.thc < 25) ||
                      (thcFilter === 'low' && seed.thc < 15);
    const matchesFlowering = floweringFilter === 'all' ||
                            (floweringFilter === 'fast' && seed.flowering.includes('7-8')) ||
                            (floweringFilter === 'medium' && (seed.flowering.includes('8-9') || seed.flowering.includes('9-10'))) ||
                            (floweringFilter === 'auto' && seed.flowering.includes('Auto'));
    const matchesDifficulty = difficultyFilter === 'all' || seed.difficulty === difficultyFilter;

    return matchesSearch && matchesType && matchesTHC && matchesFlowering && matchesDifficulty;
  });

  const sortedSeeds = [...filteredSeeds].sort((a, b) => {
    if (sortBy === 'thc') return b.thc - a.thc;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.featured ? 1 : -1; // popularity (featured first)
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Advanced Seed Search
            </h1>
          </div>
          <p className="text-gray-400 text-xl">
            Find the perfect cannabis seeds for your grow with advanced filters
          </p>
        </div>

        {/* Partner Banner */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 p-6 mb-8">
          <div className="flex items-center gap-4">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Official Partners</h3>
              <p className="text-gray-300">Featuring <span className="text-green-400 font-semibold">Tyson 2.0</span> (Exclusive Caribbean Partner) & <span className="text-green-400 font-semibold">Royal Queen Seeds</span></p>
            </div>
          </div>
        </Card>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search seeds by name or breeder..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Strain Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="indica">Indica</SelectItem>
                <SelectItem value="sativa">Sativa</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={thcFilter} onValueChange={setThcFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="THC Level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All THC Levels</SelectItem>
                <SelectItem value="high">High (25%+)</SelectItem>
                <SelectItem value="medium">Medium (15-25%)</SelectItem>
                <SelectItem value="low">Low (&lt;15%)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={floweringFilter} onValueChange={setFloweringFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Flowering Time" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Flowering Times</SelectItem>
                <SelectItem value="fast">Fast (7-8 weeks)</SelectItem>
                <SelectItem value="medium">Medium (8-10 weeks)</SelectItem>
                <SelectItem value="auto">Autoflowering</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="thc">THC Level</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Found <span className="text-white font-semibold">{sortedSeeds.length}</span> seeds
          </p>
        </div>

        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSeeds.map((seed) => (
            <Card 
              key={seed.id}
              className="bg-slate-800/50 border-green-500/20 overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={seed.image} 
                  alt={seed.name}
                  className="w-full h-full object-cover"
                />
                {seed.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500/90 text-black border-0">
                      <Award className="w-3 h-3 mr-1" />
                      Partner
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className={`${
                    seed.type === 'indica' ? 'bg-purple-500/90' :
                    seed.type === 'sativa' ? 'bg-orange-500/90' :
                    'bg-blue-500/90'
                  } text-white border-0 capitalize`}>
                    {seed.type}
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                {/* Name and Breeder */}
                <h3 className="text-xl font-bold text-white mb-1">{seed.name}</h3>
                <p className="text-green-400 text-sm mb-3">{seed.breeder}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-700/30 rounded p-2">
                    <p className="text-gray-400 text-xs mb-1">THC</p>
                    <p className="text-white font-semibold">{seed.thc}%</p>
                  </div>
                  <div className="bg-slate-700/30 rounded p-2">
                    <p className="text-gray-400 text-xs mb-1">CBD</p>
                    <p className="text-white font-semibold">{seed.cbd}%</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span>{seed.flowering}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>Yield: {seed.yield}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span>{seed.climate}</span>
                  </div>
                </div>

                {/* Effects */}
                <div className="mb-4">
                  <p className="text-gray-400 text-xs mb-2">Effects:</p>
                  <div className="flex flex-wrap gap-1">
                    {seed.effects.map((effect, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-500/30 text-gray-300">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{seed.rating}</span>
                  </div>
                  <span className="text-green-400 font-bold">{seed.price}</span>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedSeeds.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
            <Leaf className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Seeds Found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}
