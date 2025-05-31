import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Heart, Baby, Building, Crown, Star, Wand2, Quote, Users, Award, Mic2, Music, Palette } from "lucide-react";
import NameGenerator from "@/components/NameGenerator";
import NameResult from "@/components/NameResult";
import { toast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-XXXXXXXXXX"; // 替换为你的 Google Analytics 跟踪 ID

const Index = () => {
  const configSectionRef = useRef<HTMLDivElement>(null);

  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [nameType, setNameType] = useState("baby");
  const [gender, setGender] = useState("any");
  const [style, setStyle] = useState("modern");
  const [origin, setOrigin] = useState("any");
  const [length, setLength] = useState("medium");
  const [surname, setSurname] = useState("");
  const [requirements, setRequirements] = useState("");
  const [avoidWords, setAvoidWords] = useState("");
  const [generatedNames, setGeneratedNames] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const nameCategories = [
    { id: "baby", label: "Baby Names", icon: Baby, color: "bg-rose-100 text-rose-700" },
    { id: "foreign", label: "Foreign Names", icon: Users, color: "bg-orange-100 text-orange-700" },
    { id: "company", label: "Business", icon: Building, color: "bg-blue-100 text-blue-700" },
    { id: "brand", label: "Brand", icon: Crown, color: "bg-purple-100 text-purple-700" },
    { id: "stage", label: "Stage Names", icon: Mic2, color: "bg-pink-100 text-pink-700" },
    { id: "pet", label: "Pet Names", icon: Heart, color: "bg-emerald-100 text-emerald-700" },
  ];

  const artistTypes = [
    { id: "musician", label: "Musician/Singer", icon: Music },
    { id: "actor", label: "Actor/Actress", icon: Star },
    { id: "writer", label: "Writer/Poet", icon: Quote },
    { id: "artist", label: "Visual Artist", icon: Palette },
    { id: "streamer", label: "Streamer/YouTuber", icon: Users },
    { id: "performer", label: "Performer", icon: Mic2 },
  ];

  const stageNameStyles = [
    { id: "memorable", label: "Memorable & Catchy" },
    { id: "mysterious", label: "Mysterious & Intriguing" },
    { id: "professional", label: "Professional & Elegant" },
    { id: "edgy", label: "Edgy & Bold" },
    { id: "friendly", label: "Friendly & Approachable" },
    { id: "exotic", label: "Exotic & Unique" },
  ];

  const foreignNameTypes = [
    { id: "english", label: "English" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "italian", label: "Italian" },
    { id: "spanish", label: "Spanish" },
    { id: "russian", label: "Russian" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "chinese", label: "Chinese" },
    { id: "arabic", label: "Arabic" },
  ];

  const styles = [
    { id: "traditional", label: "Traditional & Classic" },
    { id: "modern", label: "Modern & Contemporary" },
    { id: "creative", label: "Creative & Unique" },
    { id: "international", label: "International" },
    { id: "trendy", label: "Trendy & Popular" },
    { id: "vintage", label: "Vintage & Retro" },
  ];

  const origins = [
    { id: "any", label: "Any Origin" },
    { id: "english", label: "English" },
    { id: "latin", label: "Latin" },
    { id: "greek", label: "Greek" },
    { id: "hebrew", label: "Hebrew" },
    { id: "celtic", label: "Celtic" },
    { id: "nordic", label: "Nordic" },
    { id: "french", label: "French" },
    { id: "italian", label: "Italian" },
    { id: "spanish", label: "Spanish" },
  ];

  const lengths = [
    { id: "short", label: "Short (1-2 syllables)" },
    { id: "medium", label: "Medium (2-3 syllables)" },
    { id: "long", label: "Long (3+ syllables)" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "New Mom",
      content: "Found the perfect name for our daughter in just minutes! The cultural insights and meaning explanations made the decision so much easier.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      content: "NameCraft AI helped us rebrand our company with a name that perfectly captures our mission. The business name suggestions were incredibly creative!",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Pet Owner",
      content: "My rescue dog needed a special name, and this tool delivered! Love how it considers personality traits and provides pronunciation guides.",
      rating: 5
    }
  ];

  return (
    <>
      <SEO 
        title="NameCraft AI - Find Perfect Names for Babies, Brands & Businesses"
        description="Create meaningful names for your baby, business, or brand using advanced AI technology. Join 50,000+ satisfied users worldwide."
        keywords="baby names, business names, brand names, name generator, AI naming tool, foreign names"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Wand2 className="h-6 w-6 text-indigo-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  NameCraft AI
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50/50">
                  <Star className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50/50">
                  Premium
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
          <div className="relative max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 mb-8">
                <div className="relative">
                  <Wand2 className="h-12 w-12 text-indigo-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 leading-tight">
                Discover the Perfect
                <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Name with AI Magic
                </span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed text-center max-w-3xl">
                From precious babies to breakthrough brands, our advanced AI crafts meaningful names that resonate with your vision. 
                Join over <span className="font-semibold text-indigo-600">50,000+ families and businesses</span> who found their perfect names.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md transition-all">
                  <Award className="h-8 w-8 text-amber-500" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">#1 Naming Tool</div>
                    <div className="text-sm text-slate-600">AI-Powered Innovation</div>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md transition-all">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">50K+ Users</div>
                    <div className="text-sm text-slate-600">Trusted Worldwide</div>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md transition-all">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">4.9/5 Rating</div>
                    <div className="text-sm text-slate-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8"
                onClick={scrollToConfig}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Naming
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-300 hover:bg-slate-50"
              >
                <Star className="h-5 w-5 mr-2" />
                View Examples
              </Button>
            </div>

            <div className="text-center text-sm text-slate-500">
              Trusted by companies and families worldwide
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6">
          {/* Configuration Panel */}
          <div ref={configSectionRef}>
            <Card className="mb-8 p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
              <div className="flex items-center space-x-2 mb-8">
                <Sparkles className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">Naming Preferences</h2>
              </div>
              
              {/* Name Type Selection */}
              <div className="mb-8">
                <Label className="text-lg font-semibold text-slate-800 mb-4 block">What would you like to name?</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {nameCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setNameType(category.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          nameType === category.id 
                            ? `${category.color} border-transparent shadow-lg scale-105` 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`rounded-full p-3 mb-3 ${
                            nameType === category.id 
                              ? 'bg-white/80' 
                              : 'bg-slate-50'
                          }`}>
                            <Icon className={`h-6 w-6 ${
                              nameType === category.id 
                                ? category.color.replace('bg-', 'text-').replace('-100', '-600')
                                : 'text-slate-600'
                            }`} />
                          </div>
                          <div className={`text-sm font-semibold ${
                            nameType === category.id 
                              ? 'text-slate-800' 
                              : 'text-slate-600'
                          }`}>
                            {category.label}
                          </div>
                          <div className="text-xs mt-1 text-slate-500">
                            {category.id === 'baby' && 'Perfect names for your little one'}
                            {category.id === 'foreign' && 'Names from different cultures'}
                            {category.id === 'company' && 'Professional business names'}
                            {category.id === 'brand' && 'Memorable brand identities'}
                            {category.id === 'stage' && 'Creative artistic names'}
                            {category.id === 'pet' && 'Lovely names for your pets'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {/* Foreign Name Options */}
                  {nameType === "foreign" && (
                    <div className="mb-6">
                      <Label className="text-sm font-semibold text-slate-700 mb-3 block">Name Origin</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {foreignNameTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setOrigin(type.id)}
                            className={`p-2 rounded-lg border transition-all duration-200 ${
                              origin === type.id 
                                ? 'border-indigo-400 bg-indigo-50 shadow-sm' 
                                : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="text-sm font-medium text-slate-700">{type.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gender Selection */}
                  {(nameType === "baby" || nameType === "foreign") && (
                    <div className="mb-6">
                      <Label className="text-sm font-semibold text-slate-700 mb-3 block">Gender Preference</Label>
                      <RadioGroup value={gender} onValueChange={setGender} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="font-medium">Boy/Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="font-medium">Girl/Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="any" />
                          <Label htmlFor="any" className="font-medium">Gender Neutral</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Style Selection */}
                  <div className="mb-6">
                    <Label className="text-sm font-semibold text-slate-700 mb-3 block">Style Preference</Label>
                    <RadioGroup value={style} onValueChange={setStyle} className="space-y-2">
                      {styles.map((styleOption) => (
                        <div key={styleOption.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={styleOption.id} id={styleOption.id} />
                          <Label htmlFor={styleOption.id} className="font-medium">{styleOption.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  {/* Advanced Options */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800">Advanced Options</h3>
                    
                    {/* Origin Selection */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-2 block">Cultural Origin</Label>
                      <Select value={origin} onValueChange={setOrigin}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select origin" />
                        </SelectTrigger>
                        <SelectContent>
                          {origins.map((originOption) => (
                            <SelectItem key={originOption.id} value={originOption.id}>
                              {originOption.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Length Preference */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-2 block">Name Length</Label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {lengths.map((lengthOption) => (
                            <SelectItem key={lengthOption.id} value={lengthOption.id}>
                              {lengthOption.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Surname Input */}
                    {(nameType === "baby" || nameType === "foreign") && (
                      <div>
                        <Label htmlFor="surname" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Last Name <span className="text-slate-500 font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="surname"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          placeholder="Enter last name to check flow"
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid md:grid-cols-2 gap-6">
                {/* Special Requirements */}
                <div>
                  <Label htmlFor="requirements" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Special Requirements <span className="text-slate-500 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="e.g., starts with 'A', has religious meaning, sounds strong..."
                    className="w-full h-20 resize-none"
                  />
                </div>

                {/* Words to Avoid */}
                <div>
                  <Label htmlFor="avoidWords" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Avoid Words/Sounds <span className="text-slate-500 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="avoidWords"
                    value={avoidWords}
                    onChange={(e) => setAvoidWords(e.target.value)}
                    placeholder="e.g., John, Mary, names ending in -son"
                    className="w-full"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-center">
                <NameGenerator 
                  nameType={nameType}
                  gender={gender}
                  style={style}
                  origin={origin}
                  length={length}
                  surname={surname}
                  requirements={requirements}
                  avoidWords={avoidWords}
                  onGenerate={setGeneratedNames}
                  isGenerating={isGenerating}
                  setIsGenerating={setIsGenerating}
                />
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="w-full">
            <NameResult 
              names={generatedNames}
              isGenerating={isGenerating}
              nameType={nameType}
            />
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-800 mb-3">What Our Users Say</h3>
            <p className="text-lg text-slate-600">Join thousands of satisfied customers who found their perfect names</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-indigo-300 mb-4" />
                <p className="text-slate-700 mb-6 leading-relaxed italic">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/60 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-slate-600">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Wand2 className="h-6 w-6 text-indigo-600" />
                <p className="text-lg font-semibold">© 2024 NameCraft AI</p>
              </div>
              <p className="text-sm">Crafting perfect names with artificial intelligence</p>
              <p className="text-xs mt-2 text-slate-500">Professional naming solutions for families and businesses worldwide</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
