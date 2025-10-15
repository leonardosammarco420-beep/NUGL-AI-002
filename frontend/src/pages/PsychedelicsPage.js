import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Sparkles, 
  Leaf, 
  Pill, 
  Candy,
  Cookie,
  Shield,
  AlertCircle,
  Brain,
  Heart,
  Activity,
  BookOpen,
  CheckCircle,
  Info,
  Scale
} from 'lucide-react';

export default function PsychedelicsPage() {
  const [selectedForm, setSelectedForm] = useState('all');

  const products = [
    {
      id: 1,
      form: 'raw',
      name: 'SPORES Raw Mushrooms',
      subtitle: 'Psilocybe Cubensis - Golden Teacher',
      description: 'Premium dried magic mushrooms, hand-selected and carefully preserved for maximum potency and purity.',
      potency: '1.5-2.5% Psilocybin',
      dosage: {
        microdose: '0.1-0.3g',
        low: '0.5-1.5g',
        medium: '2-3.5g',
        high: '3.5-5g+'
      },
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800',
      benefits: [
        'Natural, unprocessed form',
        'Full spectrum alkaloids',
        'Flexible dosing',
        'Traditional experience',
        'Lab-tested purity'
      ],
      price: '$35/3.5g',
      duration: '4-6 hours',
      onset: '30-60 minutes'
    },
    {
      id: 2,
      form: 'capsules',
      name: 'SPORES Microdose Capsules',
      subtitle: 'Precision-Dosed Psilocybin',
      description: 'Pre-measured capsules containing 100mg of finely ground psilocybin mushrooms. Perfect for consistent microdosing protocols.',
      potency: '100mg per capsule',
      dosage: {
        microdose: '1 capsule (100mg)',
        low: '5-10 capsules',
        medium: '20-30 capsules',
        high: 'Not recommended'
      },
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
      benefits: [
        'Precise, consistent dosing',
        'No taste or texture',
        'Discreet and portable',
        'Extended shelf life',
        'Ideal for microdosing'
      ],
      price: '$45/30 capsules',
      duration: '4-6 hours',
      onset: '45-90 minutes'
    },
    {
      id: 3,
      form: 'gummies',
      name: 'SPORES Cosmic Gummies',
      subtitle: 'Fruit-Flavored Psilocybin Edibles',
      description: 'Delicious vegan gummies infused with precisely measured psilocybin extract. Available in Mixed Berry, Citrus Blast, and Tropical flavors.',
      potency: '250mg per gummy',
      dosage: {
        microdose: '1/4 gummy (62.5mg)',
        low: '1-2 gummies',
        medium: '3-4 gummies',
        high: '5+ gummies'
      },
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800',
      benefits: [
        'Great taste, no mushroom flavor',
        'Easy to dose and share',
        'Vegan and gluten-free',
        'Colorful and appealing',
        'Travel-friendly'
      ],
      price: '$55/10 gummies',
      duration: '5-7 hours',
      onset: '60-120 minutes'
    },
    {
      id: 4,
      form: 'chocolates',
      name: 'SPORES Bliss Chocolates',
      subtitle: 'Premium Dark Chocolate Psilocybin Bars',
      description: '70% dark chocolate bars infused with premium psilocybin mushrooms. Each bar contains 12 breakable squares for flexible dosing.',
      potency: '3g total per bar (250mg per square)',
      dosage: {
        microdose: '1/2 square (125mg)',
        low: '2-4 squares',
        medium: '5-8 squares',
        high: '9-12 squares'
      },
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800',
      benefits: [
        'Rich, gourmet chocolate',
        'Easy to break and dose',
        'Masks mushroom taste',
        'Antioxidant-rich',
        'Elegant packaging'
      ],
      price: '$65/bar',
      duration: '5-7 hours',
      onset: '60-120 minutes'
    }
  ];

  const filteredProducts = selectedForm === 'all' 
    ? products 
    : products.filter(p => p.form === selectedForm);

  const getFormIcon = (form) => {
    switch(form) {
      case 'raw': return <Leaf className="w-5 h-5" />;
      case 'capsules': return <Pill className="w-5 h-5" />;
      case 'gummies': return <Candy className="w-5 h-5" />;
      case 'chocolates': return <Cookie className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-purple-500/30"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              SPORES
            </h1>
          </div>
          <p className="text-2xl text-purple-300 mb-2 font-semibold">Premium Psilocybin Products</p>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore consciousness with our carefully curated selection of magic mushroom products. 
            From traditional raw mushrooms to convenient capsules, delicious gummies, and gourmet chocolates.
          </p>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Educational & Harm Reduction Information</h3>
              <p className="text-gray-300 text-sm">
                This page provides educational information about psilocybin mushroom products. 
                Psilocybin remains a controlled substance in many jurisdictions. Always check local laws 
                and consult healthcare professionals before use. Practice harm reduction and responsible use.
              </p>
            </div>
          </div>
        </Card>

        {/* Product Filter Tabs */}
        <Tabs value={selectedForm} onValueChange={setSelectedForm} className="mb-8">
          <TabsList className="bg-slate-800 grid grid-cols-5 gap-1">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              All Forms
            </TabsTrigger>
            <TabsTrigger value="raw" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Raw
            </TabsTrigger>
            <TabsTrigger value="capsules" className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Capsules
            </TabsTrigger>
            <TabsTrigger value="gummies" className="flex items-center gap-2">
              <Candy className="w-4 h-4" />
              Gummies
            </TabsTrigger>
            <TabsTrigger value="chocolates" className="flex items-center gap-2">
              <Cookie className="w-4 h-4" />
              Chocolates
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="bg-slate-800/50 border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500/90 text-white border-0 text-lg px-4 py-2">
                    {getFormIcon(product.form)}
                    <span className="ml-2 capitalize">{product.form}</span>
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>

              <div className="p-6">
                {/* Product Header */}
                <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-purple-400 mb-3">{product.subtitle}</p>
                <p className="text-gray-300 mb-4">{product.description}</p>

                {/* Potency & Price */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Potency</p>
                    <p className="text-white font-semibold">{product.potency}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Price</p>
                    <p className="text-green-400 font-bold text-lg">{product.price}</p>
                  </div>
                </div>

                {/* Dosage Guide */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-400" />
                    Dosage Guide
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Microdose:</span>
                      <span className="text-white ml-2 font-medium">{product.dosage.microdose}</span>
                    </div>
                    <div className="p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Low:</span>
                      <span className="text-white ml-2 font-medium">{product.dosage.low}</span>
                    </div>
                    <div className="p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-400">Medium:</span>
                      <span className="text-white ml-2 font-medium">{product.dosage.medium}</span>
                    </div>
                    <div className="p-2 bg-slate-700/30 rounded">
                      <span className="text-gray-400">High:</span>
                      <span className="text-white ml-2 font-medium">{product.dosage.high}</span>
                    </div>
                  </div>
                </div>

                {/* Effects Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span>Onset: {product.onset}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span>Duration: {product.duration}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Educational Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <Brain className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Therapeutic Benefits</h3>
            <p className="text-gray-300 text-sm mb-3">
              Research suggests psilocybin may help with depression, anxiety, PTSD, and addiction treatment.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Enhanced creativity & focus</li>
              <li>• Improved mood & well-being</li>
              <li>• Reduced anxiety & depression</li>
              <li>• Increased emotional connection</li>
            </ul>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <Shield className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Safety & Set/Setting</h3>
            <p className="text-gray-300 text-sm mb-3">
              Ensure a safe, comfortable environment and positive mindset before use.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Start low, go slow</li>
              <li>• Have a trusted trip sitter</li>
              <li>• Comfortable, safe environment</li>
              <li>• Test products for purity</li>
            </ul>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <BookOpen className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Microdosing Protocol</h3>
            <p className="text-gray-300 text-sm mb-3">
              A structured approach to regular sub-perceptual dosing for cognitive enhancement.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Day 1: Microdose (0.1-0.3g)</li>
              <li>• Day 2-3: Off days (observe)</li>
              <li>• Day 4: Microdose</li>
              <li>• Repeat cycle for 4-8 weeks</li>
            </ul>
          </Card>
        </div>

        {/* Warning Banner */}
        <Card className="bg-red-500/10 border-red-500/30 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Important Safety Information</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>
                  <strong>Legal Status:</strong> Psilocybin is a Schedule I controlled substance in many countries. 
                  Some jurisdictions have decriminalized or legalized therapeutic use. Always verify local laws.
                </p>
                <p>
                  <strong>Contraindications:</strong> Not recommended for individuals with schizophrenia, bipolar disorder, 
                  or family history of psychotic disorders. Avoid mixing with SSRIs, MAOIs, or other medications.
                </p>
                <p>
                  <strong>Pregnancy & Breastfeeding:</strong> Safety not established. Avoid use during pregnancy or while breastfeeding.
                </p>
                <p>
                  <strong>Driving & Operating Machinery:</strong> Never drive or operate heavy machinery while under the influence.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Brand Info */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border-purple-500/30 p-8 text-center">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold text-white mb-3">About SPORES</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            SPORES is committed to providing the highest quality psilocybin products while promoting 
            education, harm reduction, and responsible use. All our products are lab-tested for potency 
            and purity, sourced from organic cultivation, and produced in clean, controlled environments.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-purple-400">
              <CheckCircle className="w-5 h-5" />
              <span>Lab-Tested</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <CheckCircle className="w-5 h-5" />
              <span>Organic Cultivation</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <CheckCircle className="w-5 h-5" />
              <span>Third-Party Verified</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
