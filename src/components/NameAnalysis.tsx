import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Globe,
  History,
  Lightbulb,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wand2,
} from "lucide-react";

interface NameAnalysisProps {
  name: string;
  nameType: string;
  meaning: string;
  origin?: string;
  culturalContext?: string;
  popularity?: number;
  characteristics?: string[];
  similarNames?: string[];
  analysis: {
    linguistic?: string;
    cultural?: string;
    modern?: string;
    personality?: string;
  };
}

const NameAnalysis: React.FC<NameAnalysisProps> = ({
  name,
  nameType,
  meaning,
  origin,
  culturalContext,
  popularity,
  characteristics,
  similarNames,
  analysis,
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Analysis */}
      <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Wand2 className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-800 mb-1">Name Analysis</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{meaning}</p>
          </div>
        </div>
      </Card>

      {/* Detailed Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {/* Linguistic Insights */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-slate-800 mb-1">Linguistic Insights</h5>
              <p className="text-xs text-slate-600">{analysis.linguistic}</p>
            </div>
          </div>
        </Card>

        {/* Cultural Background */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-emerald-50 rounded-lg">
              <Globe className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-slate-800 mb-1">Cultural Background</h5>
              <p className="text-xs text-slate-600">{analysis.cultural}</p>
            </div>
          </div>
        </Card>

        {/* Modern Context */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-purple-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-slate-800 mb-1">Modern Context</h5>
              <p className="text-xs text-slate-600">{analysis.modern}</p>
            </div>
          </div>
        </Card>

        {/* Personality & Characteristics */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-amber-50 rounded-lg">
              <Sparkles className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-slate-800 mb-1">Personality Traits</h5>
              <p className="text-xs text-slate-600">{analysis.personality}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid md:grid-cols-3 gap-3">
        {/* Origin */}
        {origin && (
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Origin</div>
                <div className="text-xs font-medium text-slate-700">{origin}</div>
              </div>
            </div>
          </Card>
        )}

        {/* Popularity */}
        {popularity && (
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Popularity</div>
                <div className="text-xs font-medium text-slate-700">
                  {popularity}% of similar names
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Characteristics */}
        {characteristics && (
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500">Key Characteristics</div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {characteristics.map((trait, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-slate-100 px-1.5 py-0.5"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Similar Names */}
      {similarNames && (
        <Card className="p-4">
          <h5 className="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            Similar Names You Might Like
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {similarNames.map((similarName, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-2 py-0.5 text-xs hover:bg-slate-50 cursor-pointer"
              >
                {similarName}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NameAnalysis; 