"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { getCategories } from "@/lib/ideas";

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  difficulty: string;
  setDifficulty: (d: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  trendDirection: string;
  setTrendDirection: (t: string) => void;
  competitionLevel: string;
  setCompetitionLevel: (c: string) => void;
}

export function FilterBar({
  search, setSearch,
  category, setCategory,
  difficulty, setDifficulty,
  sortBy, setSortBy,
  trendDirection, setTrendDirection,
  competitionLevel, setCompetitionLevel,
}: FilterBarProps) {
  const categories = getCategories();
  const hasFilters = category || difficulty || trendDirection || competitionLevel;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="upvotes">Most Popular</option>
          <option value="demandScore">Highest Demand</option>
          <option value="dateAdded">Newest First</option>
          <option value="marketSize">Largest Market</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Any Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          value={trendDirection}
          onChange={(e) => setTrendDirection(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Any Trend</option>
          <option value="Rising">Rising</option>
          <option value="Stable">Stable</option>
          <option value="Declining">Declining</option>
        </select>
        <select
          value={competitionLevel}
          onChange={(e) => setCompetitionLevel(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="">Any Competition</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {hasFilters && (
          <button
            onClick={() => { setCategory(""); setDifficulty(""); setTrendDirection(""); setCompetitionLevel(""); }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
