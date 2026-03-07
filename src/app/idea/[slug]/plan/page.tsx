"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getIdeaBySlug } from "@/lib/ideas";
import { generateBusinessPlan } from "@/lib/businessPlan";
import {
  ArrowLeft,
  Rocket,
  Code2,
  Layers,
  DollarSign,
  Calendar,
  Users,
  Target,
  Scale,
  BarChart3,
  CheckCircle2,
  Zap,
  TrendingUp,
  Plug,
  Monitor,
  ArrowRight,
  CircleDot,
  Briefcase,
} from "lucide-react";

export default function BusinessPlanPage() {
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

  const plan = generateBusinessPlan(idea);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-gray-900">IdeaEngine</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/idea/${idea.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {idea.title}
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-indigo-200" />
            <span className="text-sm font-medium text-indigo-200 uppercase tracking-wider">Full Business Plan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{idea.title}</h1>
          <p className="text-lg text-indigo-100 mb-4">{idea.tagline}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
              <span className="text-indigo-200">Startup Cost:</span>{" "}
              <strong>{plan.financials.totalStartupCost}</strong>
            </div>
            <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
              <span className="text-indigo-200">Time to MVP:</span>{" "}
              <strong>{plan.buildPlan.totalTimeline}</strong>
            </div>
            <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
              <span className="text-indigo-200">Break Even:</span>{" "}
              <strong>{plan.financials.breakEvenTimeline}</strong>
            </div>
            <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
              <span className="text-indigo-200">Monthly Ops:</span>{" "}
              <strong>{plan.financials.totalMonthlyCost}</strong>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Product Specs", icon: Code2, href: "#product-specs" },
              { label: "Tech Stack", icon: Layers, href: "#tech-stack" },
              { label: "Build Plan", icon: Calendar, href: "#build-plan" },
              { label: "Team", icon: Users, href: "#team" },
              { label: "Financials", icon: DollarSign, href: "#financials" },
              { label: "Pricing", icon: BarChart3, href: "#pricing" },
              { label: "Business Model", icon: Target, href: "#business-model" },
              { label: "Launch Strategy", icon: Zap, href: "#launch-strategy" },
              { label: "Revenue Projections", icon: TrendingUp, href: "#projections" },
              { label: "KPIs", icon: BarChart3, href: "#kpis" },
              { label: "Legal & Compliance", icon: Scale, href: "#legal" },
              { label: "Integrations", icon: Plug, href: "#integrations" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">

          {/* Product Specs */}
          <section id="product-specs">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Specifications</h2>
                  <p className="text-sm text-gray-500">Core features, MVP scope, and platform targets</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    MVP Features
                  </h3>
                  <div className="space-y-2">
                    {plan.productSpecs.mvpFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    Full Product Features
                  </h3>
                  <div className="space-y-2">
                    {plan.productSpecs.coreFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    V2 Roadmap
                  </h3>
                  <div className="space-y-2">
                    {plan.productSpecs.v2Features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CircleDot className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plan.productSpecs.platforms.map((p) => (
                    <span key={p} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech-stack">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recommended Tech Stack</h2>
                  <p className="text-sm text-gray-500">Technology choices optimized for speed-to-market and scalability</p>
                </div>
              </div>

              <div className="space-y-3">
                {plan.productSpecs.techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full min-w-[80px] text-center">
                      {tech.layer}
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 text-sm">{tech.technology}</span>
                      <span className="text-gray-400 mx-2">—</span>
                      <span className="text-sm text-gray-500">{tech.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section id="integrations">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Plug className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Key Integrations</h2>
                  <p className="text-sm text-gray-500">Third-party services to connect for maximum value</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {plan.productSpecs.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Build Plan */}
          <section id="build-plan">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Build Plan & Timeline</h2>
                  <p className="text-sm text-gray-500">Phase-by-phase breakdown from design to launch</p>
                </div>
              </div>

              <div className="space-y-6">
                {plan.buildPlan.phases.map((phase, i) => (
                  <div key={i} className="relative">
                    {i < plan.buildPlan.phases.length - 1 && (
                      <div className="absolute left-5 top-12 w-0.5 h-full bg-gray-200" />
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-white font-bold text-sm">{i + 1}</span>
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                              {phase.duration}
                            </span>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                              {phase.cost}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tasks</p>
                            <div className="space-y-1.5">
                              {phase.tasks.map((task, j) => (
                                <div key={j} className="flex items-start gap-2">
                                  <ArrowRight className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Deliverables</p>
                            <div className="space-y-1.5">
                              {phase.deliverables.map((d, j) => (
                                <div key={j} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section id="team">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Team Requirements</h2>
                  <p className="text-sm text-gray-500">Key roles needed to build and launch</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plan.buildPlan.teamRequired.map((member, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4 hover:border-indigo-200 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.role}</h3>
                    <p className="text-xs text-gray-400 mb-2">{member.type}</p>
                    <p className="text-sm font-semibold text-indigo-600">{member.monthlyCost}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Financials */}
          <section id="financials">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Financial Breakdown</h2>
                  <p className="text-sm text-gray-500">Startup costs and monthly operating expenses</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Startup Costs */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    One-Time Startup Costs
                  </h3>
                  <div className="space-y-3">
                    {plan.financials.startupCosts.map((cost, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-600">{cost.item}</span>
                        <span className="text-sm font-semibold text-gray-900">{cost.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-3 bg-indigo-50 rounded-lg px-3 mt-2">
                      <span className="font-semibold text-indigo-900">Total Startup Cost</span>
                      <span className="font-bold text-indigo-600 text-lg">{plan.financials.totalStartupCost}</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Costs */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Monthly Operating Costs
                  </h3>
                  <div className="space-y-3">
                    {plan.financials.monthlyOperatingCosts.map((cost, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-600">{cost.item}</span>
                        <span className="text-sm font-semibold text-gray-900">{cost.cost}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-3 bg-green-50 rounded-lg px-3 mt-2">
                      <span className="font-semibold text-green-900">Total Monthly Cost</span>
                      <span className="font-bold text-green-600 text-lg">{plan.financials.totalMonthlyCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex-1">
                  <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wider mb-1">Break-Even Timeline</p>
                  <p className="text-xl font-bold text-yellow-800">{plan.financials.breakEvenTimeline}</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex-1">
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Target MRR</p>
                  <p className="text-xl font-bold text-indigo-800">{idea.monthlyRevenueEstimate}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pricing Strategy</h2>
                  <p className="text-sm text-gray-500">Recommended pricing tiers and positioning</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plan.financials.pricingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className={`border rounded-xl p-5 ${
                      i === 1 ? "border-indigo-300 bg-indigo-50/30 ring-1 ring-indigo-200" : "border-gray-200"
                    }`}
                  >
                    {i === 1 && (
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Most Popular</span>
                    )}
                    <h3 className="font-semibold text-gray-900 mt-1">{tier.name}</h3>
                    <p className="text-lg font-bold text-indigo-600 my-2">{tier.price}</p>
                    <div className="space-y-2 mt-3">
                      {tier.features.map((f, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Business Model Canvas */}
          <section id="business-model">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Business Model Canvas</h2>
                  <p className="text-sm text-gray-500">Key components of the business model</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-indigo-900 mb-2">Value Proposition</h3>
                  <p className="text-sm text-gray-600">{plan.businessModel.valueProposition}</p>
                </div>
                <div className="bg-green-50/50 border border-green-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-green-900 mb-2">Unfair Advantage</h3>
                  <p className="text-sm text-gray-600">{plan.businessModel.unfairAdvantage}</p>
                </div>
                <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-yellow-900 mb-2">Revenue Streams</h3>
                  <div className="space-y-1">
                    {plan.businessModel.revenueStreams.map((r, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">•</span> {r}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Customer Segments</h3>
                  <div className="space-y-1">
                    {plan.businessModel.customerSegments.map((c, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span> {c}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-orange-900 mb-2">Key Partners</h3>
                  <div className="space-y-1">
                    {plan.businessModel.keyPartners.map((p, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span> {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-red-900 mb-2">Cost Structure</h3>
                  <div className="space-y-1">
                    {plan.businessModel.costStructure.map((c, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span> {c}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Projections */}
          <section id="projections">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Revenue Projections</h2>
                  <p className="text-sm text-gray-500">Estimated MRR growth over 24 months</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Timeline</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">MRR</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.financials.revenueProjections.map((proj, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{proj.month}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-green-600">{proj.mrr}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{proj.customers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Launch Strategy */}
          <section id="launch-strategy">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Launch Strategy</h2>
                  <p className="text-sm text-gray-500">Pre-launch, launch day, and growth playbook</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Pre-Launch
                  </h3>
                  <div className="space-y-2">
                    {plan.launchStrategy.prelaunch.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold text-yellow-600 mt-0.5 w-4">{i + 1}.</span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    Launch Day
                  </h3>
                  <div className="space-y-2">
                    {plan.launchStrategy.launch.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold text-red-600 mt-0.5 w-4">{i + 1}.</span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Growth Phase
                  </h3>
                  <div className="space-y-2">
                    {plan.launchStrategy.growth.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold text-green-600 mt-0.5 w-4">{i + 1}.</span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Milestones</h3>
                <div className="flex flex-wrap gap-3">
                  {plan.launchStrategy.milestones.map((m, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">{m.timeline}</p>
                      <p className="text-sm font-semibold text-gray-900">{m.target}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KPIs */}
          <section id="kpis">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Key Performance Indicators</h2>
                  <p className="text-sm text-gray-500">Metrics to track for growth and health</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{kpi.metric}</p>
                      <p className="text-xs text-gray-400">{kpi.frequency}</p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {kpi.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Legal & Compliance */}
          <section id="legal">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Legal & Compliance Requirements</h2>
                  <p className="text-sm text-gray-500">Regulatory and legal considerations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.legalCompliance.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
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
