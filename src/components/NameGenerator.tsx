
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Wand2 } from "lucide-react";

interface NameGeneratorProps {
  nameType: string;
  gender: string;
  style: string;
  origin: string;
  length: string;
  surname: string;
  requirements: string;
  avoidWords: string;
  onGenerate: (names: any[]) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const NameGenerator: React.FC<NameGeneratorProps> = ({
  nameType,
  gender,
  style,
  origin,
  length,
  surname,
  requirements,
  avoidWords,
  onGenerate,
  isGenerating,
  setIsGenerating
}) => {
  
  const generateNames = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Enhanced name database with more sophisticated options
    const nameDatabase = {
      baby: {
        traditional: {
          male: ["Alexander", "William", "James", "Benjamin", "Theodore", "Sebastian", "Nathaniel", "Christopher"],
          female: ["Elizabeth", "Catherine", "Margaret", "Victoria", "Charlotte", "Isabella", "Anastasia", "Genevieve"],
          any: ["Taylor", "Jordan", "Cameron", "Morgan", "Riley", "Quinn", "Sage", "River"]
        },
        modern: {
          male: ["Aiden", "Mason", "Logan", "Lucas", "Noah", "Ethan", "Oliver", "Liam"],
          female: ["Emma", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"],
          any: ["Avery", "Parker", "Blake", "Skylar", "Rowan", "Phoenix", "Dakota", "Emery"]
        },
        creative: {
          male: ["Zephyr", "Atlas", "Orion", "Phoenix", "Sage", "River", "Sterling", "Aurelius"],
          female: ["Luna", "Aurora", "Seraphina", "Celeste", "Iris", "Nova", "Lyra", "Aria"],
          any: ["Ocean", "Storm", "Sage", "River", "Phoenix", "Sky", "Rain", "Star"]
        },
        international: {
          male: ["Leonardo", "Matteo", "Gabriel", "Rafael", "Santiago", "Adrian", "Emilio", "Diego"],
          female: ["Valentina", "Gabriella", "Sofia", "Isabella", "Camila", "Elena", "Lucia", "Natalia"],
          any: ["Alexis", "Andrea", "Carmen", "Francis", "Reese", "Jules", "Sage", "River"]
        },
        trendy: {
          male: ["Kai", "Axel", "Jaxon", "Zayden", "Maverick", "Knox", "Finn", "Declan"],
          female: ["Aria", "Zoe", "Chloe", "Mila", "Stella", "Hazel", "Violet", "Scarlett"],
          any: ["Indie", "Sage", "River", "Onyx", "Atlas", "Rain", "Echo", "Wren"]
        },
        vintage: {
          male: ["Arthur", "Henry", "George", "Edward", "Frederick", "Albert", "Walter", "Ernest"],
          female: ["Rose", "Pearl", "Ruby", "Hazel", "Violet", "Ivy", "Grace", "Clara"],
          any: ["Francis", "Robin", "Leslie", "Sidney", "Aubrey", "Beverly", "Carroll", "Vivian"]
        }
      },
      company: {
        traditional: ["Sterling Enterprises", "Heritage Corp", "Classic Solutions", "Prestige Group", "Summit Holdings", "Elite Partners"],
        modern: ["Nexus Technologies", "Catalyst Ventures", "Pulse Innovations", "Vertex Solutions", "Quantum Dynamics", "Apex Digital"],
        creative: ["Lunar Labs", "Phoenix Rising", "Stellar Concepts", "Cosmic Ventures", "Prism Studios", "Eclipse Innovations"],
        international: ["Global Connect", "Universal Dynamics", "International Nexus", "WorldWide Solutions", "Continental Group", "TransGlobal"],
        trendy: ["Byte Studios", "Cloud Nine", "Digital Spark", "Tech Pulse", "Innovation Hub", "Future Labs"],
        vintage: ["Heritage & Co", "Classic Craft", "Timeless Solutions", "Legacy Group", "Traditional Holdings", "Vintage Ventures"]
      },
      brand: {
        traditional: ["Majestic", "Royal", "Heritage", "Classic", "Prestige", "Elite"],
        modern: ["Pulse", "Nexus", "Catalyst", "Vertex", "Quantum", "Apex"],
        creative: ["Zenith", "Aurora", "Phoenix", "Stellar", "Prism", "Eclipse"],
        international: ["Globale", "Univa", "Cosmis", "Terrana", "Mondiale", "Universus"],
        trendy: ["Luxe", "Vibe", "Flow", "Spark", "Glow", "Zen"],
        vintage: ["Artisan", "Craft", "Heritage", "Legacy", "Timeless", "Classic"]
      },
      pet: {
        traditional: ["Max", "Buddy", "Charlie", "Lucy", "Bella", "Cooper"],
        modern: ["Luna", "Milo", "Zoe", "Oscar", "Stella", "Leo"],
        creative: ["Pixel", "Storm", "Echo", "Sage", "River", "Phoenix"],
        international: ["Koda", "Akira", "Suki", "Diego", "Coco", "Mika"],
        trendy: ["Kai", "Nova", "Atlas", "Indie", "Onyx", "Rebel"],
        vintage: ["Oliver", "Ruby", "Henry", "Pearl", "Arthur", "Rose"]
      }
    };

    let selectedNames;
    
    if (nameType === 'baby') {
      selectedNames = nameDatabase.baby[style]?.[gender] || nameDatabase.baby[style]?.any || [];
    } else {
      selectedNames = nameDatabase[nameType]?.[style] || [];
    }

    // Apply filtering based on advanced options
    if (length === 'short') {
      selectedNames = selectedNames.filter(name => name.split(/\s+/)[0].length <= 6);
    } else if (length === 'long') {
      selectedNames = selectedNames.filter(name => name.split(/\s+/)[0].length >= 7);
    }

    // Filter out avoided words
    if (avoidWords) {
      const avoidList = avoidWords.toLowerCase().split(',').map(word => word.trim());
      selectedNames = selectedNames.filter(name => 
        !avoidList.some(avoid => name.toLowerCase().includes(avoid))
      );
    }

    // Randomly select 8 names and add detailed information
    const shuffled = [...selectedNames].sort(() => 0.5 - Math.random());
    const generated = shuffled.slice(0, 8).map((name, index) => ({
      id: index + 1,
      name,
      meaning: generateMeaning(name, nameType, requirements),
      pronunciation: generatePronunciation(name),
      popularity: Math.floor(Math.random() * 100) + 1,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      tags: generateTags(name, style, nameType, origin),
      flowScore: surname ? generateFlowScore(name, surname) : null
    }));

    onGenerate(generated);
    setIsGenerating(false);
  };

  const generateMeaning = (name: string, type: string, requirements: string) => {
    const meanings = {
      baby: [
        "Symbolizes strength, wisdom, and noble character",
        "Represents joy, light, and boundless potential", 
        "Embodies grace, intelligence, and natural leadership",
        "Signifies creativity, compassion, and inner strength",
        "Conveys harmony, prosperity, and positive energy",
        "Reflects courage, determination, and bright future"
      ],
      company: [
        "Represents innovation, growth, and market leadership",
        "Symbolizes trust, reliability, and professional excellence",
        "Embodies vision, progress, and industry advancement",
        "Signifies quality, integrity, and customer focus",
        "Conveys expertise, innovation, and sustainable success"
      ],
      brand: [
        "Reflects premium quality, sophistication, and exclusivity",
        "Embodies modern elegance, style, and distinction",
        "Represents authenticity, craftsmanship, and heritage",
        "Signifies innovation, trendsetting, and market presence",
        "Conveys luxury, refinement, and aspirational appeal"
      ],
      pet: [
        "Perfect for a loyal, playful, and loving companion",
        "Ideal for an intelligent, energetic, and friendly pet",
        "Suits a gentle, affectionate, and well-behaved animal",
        "Great for a spirited, adventurous, and charming pet",
        "Wonderful for a calm, wise, and deeply bonded companion"
      ]
    };
    
    const typeMeanings = meanings[type] || meanings.baby;
    let meaning = typeMeanings[Math.floor(Math.random() * typeMeanings.length)];
    
    // Add custom requirements context
    if (requirements && requirements.length > 10) {
      meaning += `. Aligns with your preference for ${requirements.toLowerCase().substring(0, 50)}...`;
    }
    
    return meaning;
  };

  const generatePronunciation = (name: string) => {
    // Enhanced pronunciation guide
    const pronunciationMap: { [key: string]: string } = {
      'Alexander': 'AL-ig-ZAN-der', 'Seraphina': 'ser-uh-FEE-nuh',
      'Theodore': 'THEE-uh-door', 'Genevieve': 'JEN-uh-veev',
      'Sebastian': 'se-BAS-chun', 'Anastasia': 'an-uh-STAY-zhuh',
      'Zephyr': 'ZEF-er', 'Aurelius': 'aw-REEL-ee-us'
    };
    
    return pronunciationMap[name] || name.toLowerCase().split('').map(char => char.toUpperCase()).join('-');
  };

  const generateTags = (name: string, style: string, type: string, origin: string) => {
    const styleTags = {
      traditional: ['Classic', 'Timeless', 'Elegant'],
      modern: ['Contemporary', 'Fresh', 'Stylish'],
      creative: ['Unique', 'Artistic', 'Imaginative'],
      international: ['Global', 'Sophisticated', 'Worldly'],
      trendy: ['Popular', 'On-trend', 'Current'],
      vintage: ['Retro', 'Nostalgic', 'Heritage']
    };
    
    const typeTags = {
      baby: ['Adorable', 'Sweet'],
      company: ['Professional', 'Trustworthy'],
      brand: ['Premium', 'Distinctive'],
      pet: ['Cute', 'Lovable']
    };

    const originTags = origin !== 'any' ? [origin.charAt(0).toUpperCase() + origin.slice(1)] : [];
    
    return [
      ...(styleTags[style] || []),
      ...(typeTags[type] || []),
      ...originTags,
      'Meaningful'
    ].slice(0, 4);
  };

  const generateFlowScore = (firstName: string, lastName: string) => {
    // Simple flow scoring algorithm
    const firstSyllables = firstName.split(/[aeiou]/i).length - 1;
    const lastSyllables = lastName.split(/[aeiou]/i).length - 1;
    const totalLength = firstName.length + lastName.length;
    
    let score = 85;
    
    // Penalize very long or very short combinations
    if (totalLength > 20 || totalLength < 8) score -= 10;
    
    // Reward good syllable balance
    if (Math.abs(firstSyllables - lastSyllables) <= 1) score += 10;
    
    // Add some randomness
    score += Math.floor(Math.random() * 10) - 5;
    
    return Math.max(65, Math.min(100, score));
  };

  return (
    <Button 
      onClick={generateNames}
      disabled={isGenerating}
      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
          Crafting Perfect Names...
        </>
      ) : (
        <>
          <Wand2 className="mr-3 h-5 w-5" />
          Generate Names
        </>
      )}
    </Button>
  );
};

export default NameGenerator;
