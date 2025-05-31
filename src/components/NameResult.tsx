import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Share2, Download, Volume2, Star, Award, TrendingUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import NameAnalysis from './NameAnalysis';

interface Name {
  id: number;
  name: string;
  meaning: string;
  pronunciation: string;
  popularity: number;
  rating: string;
  tags: string[];
  flowScore?: number;
  analysis: {
    linguistic: string;
    cultural: string;
    modern: string;
    personality: string;
  };
  origin?: string;
  characteristics?: string[];
  similarNames?: string[];
}

interface NameResultProps {
  names: Name[];
  isGenerating: boolean;
  nameType: string;
}

const NameResult: React.FC<NameResultProps> = ({ names, isGenerating, nameType }) => {
  
  const handleLike = (name: string) => {
    toast({
      title: "Added to Favorites",
      description: `${name} has been saved to your favorites`,
    });
  };

  const handleShare = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied to Clipboard",
      description: `${name} is ready to share`,
    });
  };

  const handlePronunciation = (pronunciation: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(pronunciation);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Crafting Your Perfect Names...</h2>
          <p className="text-slate-600">Our AI is analyzing thousands of possibilities to find the ideal match</p>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="h-8 w-40 mb-3" />
                  <Skeleton className="h-5 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex gap-2 mb-6">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex gap-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 ml-6">
                  <Skeleton className="h-10 w-12" />
                  <Skeleton className="h-10 w-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (names.length === 0) {
    return (
      <Card className="p-16 text-center bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
        <div className="text-slate-500">
          <Star className="h-20 w-20 mx-auto mb-6 text-indigo-300" />
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Ready to Discover Perfect Names?</h3>
          <p className="text-lg mb-2">Configure your preferences and let our AI craft the ideal names for you</p>
          <p className="text-sm text-slate-400">Powered by advanced AI algorithms and cultural insights</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Your Curated Name Collection</h2>
          <p className="text-slate-600">Handpicked by AI based on your preferences</p>
        </div>
        <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50/50 px-3 py-1">
          <Award className="h-4 w-4 mr-1" />
          {names.length} Names
        </Badge>
      </div>

      <div className="grid gap-4">
        {names.map((name, index) => (
          <Card 
            key={name.id} 
            className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:border-indigo-200 hover:bg-white/90"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Name Header */}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-slate-800">{name.name}</h3>
                  <button
                    onClick={() => handlePronunciation(name.pronunciation)}
                    className="text-indigo-600 hover:text-indigo-700 transition-colors p-1.5 hover:bg-indigo-50 rounded-lg"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <span className="text-slate-500 text-base">[ {name.pronunciation} ]</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    #{index + 1} Recommended
                  </Badge>
                </div>

                {/* Name Analysis Component */}
                <NameAnalysis
                  name={name.name}
                  nameType={nameType}
                  meaning={name.meaning}
                  origin={name.origin}
                  popularity={name.popularity}
                  characteristics={name.characteristics}
                  similarNames={name.similarNames}
                  analysis={name.analysis}
                />

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(name.name)}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Favorites
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(name.name)}
                    className="text-blue-500 border-blue-200 hover:bg-blue-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="text-center pt-6 space-y-3">
        <div className="flex justify-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-slate-300 hover:bg-slate-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6"
          >
            Generate More
          </Button>
        </div>
        <p className="text-xs text-slate-500">All names come with detailed analysis and cultural insights</p>
      </div>
    </div>
  );
};

export default NameResult;
