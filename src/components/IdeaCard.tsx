"use client";

import Link from "next/link";
import { Idea } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus, ArrowUp, Clock, BarChart3 } from "lucide-react";
import { MiniTrendChart } from "./MiniTrendChart";

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-700";
    case "Medium": return "bg-yellow-100 text-yellow-700";
    case "Hard": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

function getCompetitionColor(level: string) {
  switch (level) {
    case "Low": return "text-green-600";
    case "Medium": return "text-yellow-600";
    case "High": return "text-red-600";
    default: return "text-gray-600";
  }
}

function getTrendIcon(direction: string) {
  switch (direction) {
    case "Rising": return <TrendingUp className="w-4 h-4 text-green-500" />;
    case "Declining": return <TrendingDown className="w-4 h-4 text-red-500" />;
    default: return <Minus className="w-4 h-4 text-gray-400" />;
  }
}

function getDemandColor(score: number) {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-orange-500";
}

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <Link href={`/idea/${idea.slug}`}>
      <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {idea.category}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="font-medium">{idea.upvotes}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
          {idea.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{idea.tagline}</p>

        <div className="mb-4 h-16">
          <MiniTrendChart data={idea.trendData} />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
          <div>
            <span className="text-gray-400 text-xs">Market Size</span>
            <p className="font-semibold text-gray-900">{idea.marketSize}</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Revenue Est.</span>
            <p className="font-semibold text-gray-900">{idea.monthlyRevenueEstimate}</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Viability</span>
            <p className={`font-bold ${
              idea.viabilityScore >= 5 ? "text-green-600" :
              idea.viabilityScore >= 3 ? "text-yellow-600" :
              "text-red-600"
            }`}>{idea.viabilityScore}/10</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(idea.difficulty)}`}>
              {idea.difficulty}
            </span>
            <span className={`text-xs font-medium ${getCompetitionColor(idea.competitionLevel)}`}>
              {idea.competitionLevel} Competition
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {getTrendIcon(idea.trendDirection)}
            <div className="flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
              <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getDemandColor(idea.demandScore)}`}
                  style={{ width: `${idea.demandScore}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{idea.demandScore}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
