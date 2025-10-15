import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  DollarSign, 
  ExternalLink, 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  Gift, 
  Sparkles,
  Trophy,
  Coins,
  Gamepad2
} from 'lucide-react';
import { toast } from 'sonner';

export default function CryptoCasinoPage() {
  const [category, setCategory] = useState('all');

  const casinos = [
    {
      id: 1,
      name: 'Stake Casino',
      logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2300b894" width="100" height="100"/><text x="50" y="60" text-anchor="middle" font-size="40" font-weight="bold" fill="white">$</text></svg>',
      description: 'The world\'s leading crypto casino with 4000+ games, sports betting, and live dealer options.',
      bonus: '$500K Daily Race + 200% Deposit Bonus',
      features: ['Instant Crypto Deposits', 'Live Casino', 'Sports Betting', 'VIP Program'],
      rating: 4.9,
      category: 'top',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'LTC', 'DOGE', 'XRP'],
      affiliateUrl: 'https://stake.com/?c=digitalgreenhouse',
      commission: '40% Revenue Share',
    },
    {
      id: 2,
      name: 'BC.Game',
      logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23fbbf24" width="100" height="100"/><text x="50" y="65" text-anchor="middle" font-size="35" font-weight="bold" fill="black">BC</text></svg>',
      description: 'Licensed crypto casino with 10,000+ slots, original games, and massive jackpots.',
      bonus: '300% Welcome Bonus up to $20,000',
      features: ['10,000+ Games', 'Original Exclusives', 'Lottery', 'Lucky Spin'],
      rating: 4.8,
      category: 'featured',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'SOL', 'BNB', 'USDT'],
      affiliateUrl: 'https://bc.game/i-441vun5xg-n/',
      commission: '45% Revenue Share',
    },
    {
      id: 3,
      name: 'Rollbit Casino',
      logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2314b8a6" width="100" height="100"/><text x="50" y="60" text-anchor="middle" font-size="40" font-weight="bold" fill="white">R</text></svg>',
      description: 'NFT-focused crypto casino with unique gamification and sports betting.',
      bonus: '$1,000 Welcome Package + NFT Rewards',
      features: ['NFT Rewards', 'Sports Book', 'Live Dealers', 'Crypto Trading'],
      rating: 4.7,
      category: 'nft',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'USDC', 'BNB'],
      affiliateUrl: 'https://rollbit.com/r/cannacrypto',
      commission: '30% Revenue Share',
    },
    {
      id: 4,
      name: 'Roobet Casino',
      logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%23ef4444;stop-opacity:1"/><stop offset="100%25" style="stop-color:%23dc2626;stop-opacity:1"/></linearGradient></defs><rect fill="url(%23grad)" width="100" height="100"/><text x="50" y="60" text-anchor="middle" font-size="50" font-weight="bold" fill="white">🦘</text></svg>',
      description: 'Vibrant crypto casino known for Crash, Dice, and exclusive partner games.',
      bonus: '$10,000 Welcome Bonus + Daily Rewards',
      features: ['Crash Games', 'Exclusive Slots', 'Daily Rakeback', 'VIP Rewards'],
      rating: 4.6,
      category: 'popular',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'LTC', 'USDT'],
      affiliateUrl: 'https://roobet.com/?ref=digitalgreenhou',
      commission: '35% Revenue Share',
    },
    {
      id: 5,
      name: 'Duelbits Casino',
      logo: 'https://duelbits.com/favicon.ico',
      description: 'Esports betting meets crypto casino with competitive gaming focus.',
      bonus: '$2,500 Welcome Bonus + Free Spins',
      features: ['Esports Betting', 'Battle Royale', 'Provably Fair', 'Tournaments'],
      rating: 4.5,
      category: 'esports',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'USDT', 'BNB'],
      affiliateUrl: 'https://duelbits.com/?a=cannacrypto',
      commission: '30% Revenue Share',
    },
    {
      id: 6,
      name: 'Wild.io Casino',
      logo: 'https://wild.io/favicon.ico',
      description: 'Premium crypto casino with focus on high rollers and exclusive games.',
      bonus: '200% up to 3 BTC + 100 Free Spins',
      features: ['High Roller Tables', '6000+ Games', 'Live Casino', 'Instant Withdrawals'],
      rating: 4.7,
      category: 'premium',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'LTC', 'DOGE', 'USDT'],
      affiliateUrl: 'https://wild.io/?ref=cannacrypto',
      commission: '35% Revenue Share',
    },
    {
      id: 7,
      name: 'Fortunejack',
      logo: 'https://fortunejack.com/favicon.ico',
      description: 'Established crypto casino since 2014 with sports betting and poker.',
      bonus: '25% Cashback + 250 Free Spins',
      features: ['Sports Betting', 'Poker', 'Jackpots', 'Live Dealers'],
      rating: 4.6,
      category: 'established',
      payoutSpeed: '1-2 hours',
      cryptos: ['BTC', 'ETH', 'LTC', 'DOGE', 'BCH'],
      affiliateUrl: 'https://fortunejack.com/?ref=cannacrypto',
      commission: '40% Revenue Share',
    },
    {
      id: 8,
      name: 'Cloudbet',
      logo: 'https://www.cloudbet.com/favicon.ico',
      description: 'Bitcoin sportsbook and casino with competitive odds and fast payouts.',
      bonus: '100% up to 5 BTC Welcome Bonus',
      features: ['Sportsbook', 'Live Betting', 'Esports', 'Fast Payouts'],
      rating: 4.5,
      category: 'sports',
      payoutSpeed: 'Instant',
      cryptos: ['BTC', 'ETH', 'BCH', 'USDT'],
      affiliateUrl: 'https://www.cloudbet.com/en/?af_token=cannacrypto',
      commission: '30% Revenue Share',
    },
  ];

  const filteredCasinos = category === 'all' 
    ? casinos 
    : casinos.filter(casino => casino.category === category);

  const handleAffiliateClick = (casino) => {
    toast.success(`Opening ${casino.name}`, {
      description: 'Remember to gamble responsibly!'
    });
    window.open(casino.affiliateUrl, '_blank');
  };

  const getCategoryBadgeColor = (cat) => {
    const colors = {
      top: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      featured: 'bg-gradient-to-r from-purple-500 to-pink-500',
      popular: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      nft: 'bg-gradient-to-r from-teal-500 to-emerald-500',
      esports: 'bg-gradient-to-r from-red-500 to-pink-500',
      premium: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      established: 'bg-gradient-to-r from-gray-500 to-slate-500',
      sports: 'bg-gradient-to-r from-green-500 to-teal-500',
    };
    return colors[cat] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="w-12 h-12 text-teal-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Crypto Casino Marketplace
            </h1>
          </div>
          <p className="text-gray-400 text-xl mb-4">
            Top-rated crypto casinos with exclusive bonuses and instant crypto payouts
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="bg-slate-800 grid grid-cols-4 lg:grid-cols-9 gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="nft">NFT</TabsTrigger>
            <TabsTrigger value="esports">Esports</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="established">Established</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Casino Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredCasinos.map((casino) => (
            <Card 
              key={casino.id}
              className="bg-slate-800/50 border-teal-500/20 overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden p-2">
                      <img 
                        src={casino.logo} 
                        alt={`${casino.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="32">🎰</text></svg>';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{casino.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(casino.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">{casino.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getCategoryBadgeColor(casino.category)} text-white border-0`}>
                    {casino.category.toUpperCase()}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{casino.description}</p>

                {/* Bonus */}
                <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-teal-400" />
                    <span className="text-teal-400 font-semibold">Welcome Bonus</span>
                  </div>
                  <p className="text-white font-bold text-lg">{casino.bonus}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {casino.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Zap className="w-4 h-4 text-teal-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between py-3 border-t border-slate-700 mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400">{casino.payoutSpeed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Licensed</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {casino.cryptos.slice(0, 4).map((crypto) => (
                      <Badge key={crypto} variant="outline" className="text-xs border-teal-500/30 text-gray-400">
                        {crypto}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => handleAffiliateClick(casino)}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold"
                  size="lg"
                >
                  Play Now & Earn Commission
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">How Crypto Casino Affiliates Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <span className="text-teal-400 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-white">Share Your Link</h4>
                  </div>
                  <p className="text-sm">Use your unique affiliate link to refer players to these top crypto casinos.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <span className="text-teal-400 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-white">Players Sign Up</h4>
                  </div>
                  <p className="text-sm">When players register and play using your link, you start earning commissions.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <span className="text-teal-400 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-white">Earn Revenue Share</h4>
                  </div>
                  <p className="text-sm">Get 25-40% revenue share for the lifetime of the player - passive income!</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-400 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <strong>Responsible Gaming:</strong> Please gamble responsibly. These links are for entertainment purposes and you should never gamble more than you can afford to lose.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
