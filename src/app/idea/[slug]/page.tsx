"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getIdeaBySlug } from "@/lib/ideas";
import {
  ArrowLeft,
  ArrowUp,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Shield,
  Lightbulb,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-700 border-green-200";
    case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Hard": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getCompetitionColor(level: string) {
  switch (level) {
    case "Low": return "text-green-600 bg-green-50";
    case "Medium": return "text-yellow-600 bg-yellow-50";
    case "High": return "text-red-600 bg-red-50";
    default: return "text-gray-600 bg-gray-50";
  }
}

function getTrendBadge(direction: string) {
  switch (direction) {
    case "Rising":
      return (
        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" /> Rising
        </span>
      );
    case "Declining":
      return (
        <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-sm font-medium">
          <TrendingDown className="w-4 h-4" /> Declining
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full text-sm font-medium">
          <Minus className="w-4 h-4" /> Stable
        </span>
      );
  }
}

export default function IdeaDetailPage() {
  const params = useParams();
  const idea = getIdeaBySlug(params.slug as string);

  if (!idea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Idea not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline">Back to ideas</Link>
        </div>
      </div>
    );
  }

  const radarData = [
    { metric: "Demand", value: idea.demandScore },
    { metric: "Market Size", value: Math.min(100, (idea.marketSizeValue / 100)) },
    {
      metric: "Ease",
      value: idea.difficulty === "Easy" ? 90 : idea.difficulty === "Medium" ? 55 : 25,
    },
    {
      metric: "Low Competition",
      value: idea.competitionLevel === "Low" ? 90 : idea.competitionLevel === "Medium" ? 50 : 20,
    },
    {
      metric: "Trend Strength",
      value: idea.trendDirection === "Rising" ? 85 : idea.trendDirection === "Stable" ? 50 : 20,
    },
  ];

  const overallScore = Math.round(
    radarData.reduce((sum, d) => sum + d.value, 0) / radarData.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-gray-900">IdeaBrowser</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all ideas
        </Link>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {idea.category}
            </span>
            {getTrendBadge(idea.trendDirection)}
            <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getDifficultyColor(idea.difficulty)}`}>
              {idea.difficulty} to Build
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{idea.title}</h1>
          <p className="text-lg text-gray-500 mb-6">{idea.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <ArrowUp className="w-4 h-4 text-indigo-500" />
              <strong className="text-gray-900">{idea.upvotes}</strong> upvotes
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-indigo-500" />
              Added {new Date(idea.dateAdded).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {idea.keyMetrics.map((metric) => (
            <div key={metric.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Search & Social Trends</h2>
              <p className="text-sm text-gray-500 mb-4">12-month trend of search volume and Reddit mentions</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={idea.trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="searchGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="redditGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: "13px" }} />
                    <Area
                      type="monotone"
                      dataKey="searchVolume"
                      name="Search Volume"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#searchGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="redditMentions"
                      name="Reddit Mentions"
                      stroke="#f97316"
                      strokeWidth={2}
                      fill="url(#redditGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-red-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">The Problem</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{idea.problem}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-green-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">The Solution</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{idea.solution}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Executive Summary</h2>
              <p className="text-gray-600 leading-relaxed">{idea.summary}</p>
            </div>

            {/* Competitor Analysis */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-orange-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Competitive Landscape</h2>
              </div>
              <div className="space-y-4">
                {idea.competitors.map((comp) => (
                  <div key={comp.name} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{comp.name}</span>
                        <span className="text-xs text-gray-400">{comp.url}</span>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {comp.funding}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="text-red-500 font-medium">Weakness:</span> {comp.weakness}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Funding Bar Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitor Funding Comparison</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={idea.competitors.map((c) => ({
                      name: c.name,
                      funding: parseFloat(c.funding.replace(/[^0-9.]/g, "")) || 1,
                    }))}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} unit="M" />
                    <Tooltip
                      formatter={(value) => [`$${value}M`, "Funding"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="funding" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Go to Market */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Go-to-Market Strategy</h2>
              </div>
              <div className="space-y-3">
                {idea.goToMarket.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Opportunity Score Radar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Opportunity Score</h2>
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{overallScore}</span>
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Radar
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Market Size
                  </span>
                  <span className="font-semibold text-gray-900">{idea.marketSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Revenue Estimate
                  </span>
                  <span className="font-semibold text-gray-900">{idea.monthlyRevenueEstimate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> CAC
                  </span>
                  <span className="font-semibold text-gray-900">{idea.customerAcquisitionCost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time to MVP
                  </span>
                  <span className="font-semibold text-gray-900">{idea.timeToMvp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Revenue Model
                  </span>
                  <span className="font-semibold text-gray-900 text-right text-xs">{idea.revenueModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Competition
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${getCompetitionColor(idea.competitionLevel)}`}>
                    {idea.competitionLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Demand Score
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${idea.demandScore}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{idea.demandScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">Target Audience</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{idea.targetAudience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
