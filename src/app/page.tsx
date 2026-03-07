"use client";

import { useState, useMemo } from "react";
import { ideas } from "@/lib/ideas";
import { IdeaCard } from "@/components/IdeaCard";
import { FilterBar } from "@/components/FilterBar";
import { Rocket, TrendingUp, Database, Zap } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("upvotes");
  const [trendDirection, setTrendDirection] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("");

  const filteredIdeas = useMemo(() => {
    let filtered = ideas.filter((idea) => {
      const matchesSearch =
        !search ||
        idea.title.toLowerCase().includes(search.toLowerCase()) ||
        idea.tagline.toLowerCase().includes(search.toLowerCase()) ||
        idea.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = !category || idea.category === category;
      const matchesDifficulty = !difficulty || idea.difficulty === difficulty;
      const matchesTrend = !trendDirection || idea.trendDirection === trendDirection;
      const matchesCompetition = !competitionLevel || idea.competitionLevel === competitionLevel;
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTrend && matchesCompetition;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "upvotes": return b.upvotes - a.upvotes;
        case "demandScore": return b.demandScore - a.demandScore;
        case "dateAdded": return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case "marketSize": return b.marketSizeValue - a.marketSizeValue;
        default: return 0;
      }
    });

    return filtered;
  }, [search, category, difficulty, sortBy, trendDirection, competitionLevel]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">IdeaEngine</span>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <a href="#" className="text-indigo-600 font-medium">Browse Ideas</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Top Ideas</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Categories</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Next Startup Idea
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Data-backed startup ideas with market analysis, trend data, and execution strategies.
            Each idea represents 50+ hours of research.
          </p>
          <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-500" />
              <span><strong className="text-gray-900">{ideas.length}</strong> Ideas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span><strong className="text-gray-900">{ideas.filter(i => i.trendDirection === "Rising").length}</strong> Trending Up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          sortBy={sortBy}
          setSortBy={setSortBy}
          trendDirection={trendDirection}
          setTrendDirection={setTrendDirection}
          competitionLevel={competitionLevel}
          setCompetitionLevel={setCompetitionLevel}
        />

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing <strong className="text-gray-900">{filteredIdeas.length}</strong> ideas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No ideas match your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setDifficulty("");
                setTrendDirection("");
                setCompetitionLevel("");
              }}
              className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-gray-700">IdeaEngine</span>
            </div>
            <p>Data-backed startup ideas, updated daily.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
