import { Idea } from "./types";

export interface BusinessPlan {
  productSpecs: {
    coreFeatures: string[];
    mvpFeatures: string[];
    v2Features: string[];
    techStack: { layer: string; technology: string; reason: string }[];
    integrations: string[];
    platforms: string[];
  };
  buildPlan: {
    phases: {
      name: string;
      duration: string;
      tasks: string[];
      deliverables: string[];
      cost: string;
    }[];
    totalTimeline: string;
    teamRequired: { role: string; type: string; monthlyCost: string }[];
  };
  financials: {
    startupCosts: { item: string; cost: string }[];
    totalStartupCost: string;
    monthlyOperatingCosts: { item: string; cost: string }[];
    totalMonthlyCost: string;
    revenueProjections: { month: string; mrr: string; customers: string }[];
    breakEvenTimeline: string;
    pricingTiers: { name: string; price: string; features: string[] }[];
  };
  businessModel: {
    valueProposition: string;
    revenueStreams: string[];
    keyPartners: string[];
    channels: string[];
    customerSegments: string[];
    costStructure: string[];
    unfairAdvantage: string;
  };
  launchStrategy: {
    prelaunch: string[];
    launch: string[];
    growth: string[];
    milestones: { target: string; timeline: string }[];
  };
  legalCompliance: string[];
  kpis: { metric: string; target: string; frequency: string }[];
}

function getTechStack(idea: Idea): BusinessPlan["productSpecs"]["techStack"] {
  const category = idea.category.toLowerCase();
  const tags = idea.tags.map((t) => t.toLowerCase());

  const base: BusinessPlan["productSpecs"]["techStack"] = [
    { layer: "Frontend", technology: "React / Next.js", reason: "SEO-friendly, fast rendering, large ecosystem" },
    { layer: "Styling", technology: "Tailwind CSS", reason: "Rapid UI development, consistent design system" },
    { layer: "Backend", technology: "Node.js / Express", reason: "JavaScript ecosystem, fast development, large talent pool" },
    { layer: "Database", technology: "PostgreSQL", reason: "Reliable, scalable, strong JSON support" },
    { layer: "Auth", technology: "Clerk or Auth0", reason: "Secure authentication with minimal setup" },
    { layer: "Hosting", technology: "Vercel + AWS", reason: "Edge deployment, auto-scaling, cost-effective" },
    { layer: "Payments", technology: "Stripe", reason: "Industry standard, excellent API, global support" },
    { layer: "Analytics", technology: "PostHog", reason: "Product analytics, session replay, feature flags" },
  ];

  if (tags.includes("ai") || category.includes("ai")) {
    base.push(
      { layer: "AI/ML", technology: "OpenAI API + LangChain", reason: "State-of-the-art LLMs with orchestration framework" },
      { layer: "Vector DB", technology: "Pinecone or Weaviate", reason: "Semantic search and RAG pipeline support" },
    );
  }

  if (tags.includes("marketplace") || category.includes("marketplace")) {
    base.push(
      { layer: "Search", technology: "Algolia or Meilisearch", reason: "Fast, typo-tolerant search with faceted filtering" },
      { layer: "Escrow", technology: "Stripe Connect", reason: "Multi-party payments and marketplace payouts" },
    );
  }

  if (category.includes("mobile") || tags.includes("app") || idea.title.toLowerCase().includes("app")) {
    base.push(
      { layer: "Mobile", technology: "React Native / Expo", reason: "Code sharing with web, native performance" },
      { layer: "Push Notifications", technology: "Firebase Cloud Messaging", reason: "Reliable cross-platform push notifications" },
    );
  }

  if (tags.includes("saas") || tags.includes("b2b")) {
    base.push(
      { layer: "Email", technology: "Resend + React Email", reason: "Transactional emails with templating" },
      { layer: "Monitoring", technology: "Sentry + Datadog", reason: "Error tracking and infrastructure monitoring" },
    );
  }

  return base;
}

function getCoreFeatures(idea: Idea): string[] {
  const features: string[] = [];
  features.push(`Core ${idea.title.split(" ").slice(0, 3).join(" ")} engine`);
  features.push("User dashboard with key metrics and activity feed");
  features.push("User authentication and role-based access control");

  if (idea.revenueModel.toLowerCase().includes("subscription") || idea.revenueModel.toLowerCase().includes("saas")) {
    features.push("Subscription management with billing portal");
    features.push("Usage tracking and plan limits enforcement");
    features.push("Team management with invite system");
  }

  if (idea.revenueModel.toLowerCase().includes("marketplace") || idea.revenueModel.toLowerCase().includes("transaction")) {
    features.push("Two-sided marketplace with listing management");
    features.push("Secure escrow and payment processing");
    features.push("Rating and review system");
    features.push("Search and filtering with relevance ranking");
  }

  if (idea.tags.some((t) => t.toLowerCase() === "ai")) {
    features.push("AI-powered analysis and recommendations");
    features.push("Natural language processing pipeline");
    features.push("Model performance monitoring and feedback loop");
  }

  features.push("Email notifications and alerts system");
  features.push("Analytics dashboard with exportable reports");
  features.push("RESTful API for third-party integrations");
  features.push("Mobile-responsive design");

  return features;
}

function getMvpFeatures(idea: Idea): string[] {
  return [
    `Core ${idea.title.split(" ").slice(-2).join(" ").toLowerCase()} functionality`,
    "Basic user registration and login",
    "Simple dashboard with primary use case",
    "Stripe integration for payments",
    "Email onboarding flow",
    "Basic analytics tracking",
  ];
}

function getV2Features(idea: Idea): string[] {
  const features = [
    "Advanced reporting and custom dashboards",
    "API access for enterprise customers",
    "White-label / custom branding options",
    "Advanced admin panel with user management",
    "Webhook integrations",
    "Multi-language support (i18n)",
  ];

  if (idea.tags.some((t) => t.toLowerCase() === "ai")) {
    features.push("Fine-tuned custom AI models per customer");
    features.push("Batch processing and scheduled AI tasks");
  }

  if (idea.competitionLevel === "High") {
    features.push("Migration tools from competitor platforms");
    features.push("Dedicated onboarding and concierge setup");
  }

  return features;
}

function getIntegrations(idea: Idea): string[] {
  const integrations: string[] = [];
  const tags = idea.tags.map((t) => t.toLowerCase());
  const title = idea.title.toLowerCase();

  if (tags.includes("slack") || title.includes("team")) integrations.push("Slack", "Microsoft Teams");
  if (tags.includes("saas") || tags.includes("b2b")) integrations.push("Salesforce", "HubSpot CRM", "Zapier");
  if (title.includes("email") || tags.includes("email")) integrations.push("Gmail API", "Outlook/Microsoft Graph API", "SendGrid");
  if (tags.includes("ai") || tags.includes("meetings")) integrations.push("Zoom API", "Google Meet API", "Microsoft Teams API");
  if (tags.includes("e-commerce") || title.includes("commerce")) integrations.push("Shopify", "WooCommerce", "Amazon Seller API");
  if (tags.includes("hr") || title.includes("employee")) integrations.push("Workday", "BambooHR", "Gusto");
  if (tags.includes("compliance") || tags.includes("legal")) integrations.push("DocuSign", "AWS CloudTrail", "Google Workspace Admin");
  if (title.includes("social") || tags.includes("influencer")) integrations.push("Instagram Graph API", "TikTok API", "YouTube Data API");

  if (integrations.length < 4) {
    integrations.push("Zapier", "Webhooks", "REST API", "Google Sheets");
  }

  return [...new Set(integrations)];
}

function getBuildPhases(idea: Idea): BusinessPlan["buildPlan"]["phases"] {
  const isHard = idea.difficulty === "Hard";
  const isMedium = idea.difficulty === "Medium";
  const hasAI = idea.tags.some((t) => t.toLowerCase() === "ai");

  return [
    {
      name: "Discovery & Design",
      duration: isHard ? "3-4 weeks" : isMedium ? "2-3 weeks" : "1-2 weeks",
      tasks: [
        "User research interviews (10-15 target customers)",
        "Competitive analysis deep dive",
        "User flow and information architecture",
        "Wireframing and UI/UX design in Figma",
        "Technical architecture documentation",
        "Database schema design",
      ],
      deliverables: ["PRD document", "Figma designs", "Technical spec", "Database ERD"],
      cost: isHard ? "$8,000-$15,000" : isMedium ? "$5,000-$10,000" : "$3,000-$6,000",
    },
    {
      name: "MVP Development",
      duration: idea.timeToMvp,
      tasks: [
        "Set up development environment and CI/CD",
        "Build authentication and user management",
        "Develop core product features",
        hasAI ? "Integrate AI/ML pipeline with prompt engineering" : "Build primary business logic",
        "Implement payment processing with Stripe",
        "Build admin dashboard",
        "Set up error tracking and logging",
        "Responsive design implementation",
      ],
      deliverables: ["Working MVP", "Admin panel", "Payment integration", "Staging environment"],
      cost: isHard ? "$40,000-$80,000" : isMedium ? "$20,000-$45,000" : "$10,000-$25,000",
    },
    {
      name: "Testing & QA",
      duration: isHard ? "2-3 weeks" : "1-2 weeks",
      tasks: [
        "Unit and integration test coverage (>80%)",
        "End-to-end testing with Playwright",
        "Security audit and penetration testing",
        "Performance testing and optimization",
        "Cross-browser and device testing",
        "User acceptance testing with beta users",
      ],
      deliverables: ["Test reports", "Security audit", "Performance benchmarks", "Bug-free release candidate"],
      cost: isHard ? "$8,000-$15,000" : isMedium ? "$5,000-$10,000" : "$3,000-$6,000",
    },
    {
      name: "Launch & Growth",
      duration: "2-4 weeks",
      tasks: [
        "Production deployment and monitoring setup",
        "Landing page and marketing site",
        "Content marketing kickoff (blog, social)",
        "Set up customer support (Intercom/Zendesk)",
        "Launch on Product Hunt and Hacker News",
        "Begin outbound sales/marketing campaigns",
        "Set up analytics dashboards",
        "Customer feedback loop implementation",
      ],
      deliverables: ["Production app", "Marketing site", "Support system", "Analytics dashboards"],
      cost: "$5,000-$12,000",
    },
  ];
}

function getTeam(idea: Idea): BusinessPlan["buildPlan"]["teamRequired"] {
  const isHard = idea.difficulty === "Hard";
  const hasAI = idea.tags.some((t) => t.toLowerCase() === "ai");
  const team: BusinessPlan["buildPlan"]["teamRequired"] = [];

  team.push({ role: "Full-Stack Developer", type: isHard ? "Full-time" : "Contract", monthlyCost: isHard ? "$10,000-$15,000" : "$8,000-$12,000" });

  if (isHard || hasAI) {
    team.push({ role: "Senior Backend / AI Engineer", type: "Full-time", monthlyCost: "$12,000-$18,000" });
  }

  team.push({ role: "UI/UX Designer", type: "Part-time / Contract", monthlyCost: "$3,000-$6,000" });

  if (idea.competitionLevel === "High" || idea.difficulty === "Hard") {
    team.push({ role: "Product Manager", type: "Part-time", monthlyCost: "$4,000-$8,000" });
  }

  team.push({ role: "Marketing / Growth", type: "Part-time / Founder", monthlyCost: "$2,000-$5,000" });

  return team;
}

function getStartupCosts(idea: Idea): { costs: BusinessPlan["financials"]["startupCosts"]; total: string } {
  const isHard = idea.difficulty === "Hard";
  const isMedium = idea.difficulty === "Medium";
  const hasAI = idea.tags.some((t) => t.toLowerCase() === "ai");

  const costs: BusinessPlan["financials"]["startupCosts"] = [
    { item: "Design & UX (Figma, user research)", cost: isHard ? "$8,000-$15,000" : isMedium ? "$5,000-$10,000" : "$3,000-$6,000" },
    { item: "MVP Development", cost: isHard ? "$40,000-$80,000" : isMedium ? "$20,000-$45,000" : "$10,000-$25,000" },
    { item: "QA & Security Testing", cost: isHard ? "$8,000-$15,000" : isMedium ? "$5,000-$10,000" : "$3,000-$6,000" },
    { item: "Legal (incorporation, ToS, privacy policy)", cost: "$2,000-$5,000" },
    { item: "Branding & Marketing Site", cost: "$3,000-$8,000" },
    { item: "Initial Marketing Budget", cost: "$3,000-$10,000" },
    { item: "SaaS Tools & Subscriptions (3 months)", cost: "$1,500-$3,000" },
  ];

  if (hasAI) {
    costs.push({ item: "AI/LLM API Credits (initial training & testing)", cost: "$2,000-$8,000" });
  }

  if (idea.revenueModel.toLowerCase().includes("marketplace")) {
    costs.push({ item: "Seed Inventory / Supply Side Acquisition", cost: "$5,000-$15,000" });
  }

  const lowTotal = isHard ? 75000 : isMedium ? 42000 : 25000;
  const highTotal = isHard ? 160000 : isMedium ? 95000 : 55000;

  return {
    costs,
    total: `$${(lowTotal / 1000).toFixed(0)}K-$${(highTotal / 1000).toFixed(0)}K`,
  };
}

function getMonthlyOperatingCosts(idea: Idea): { costs: BusinessPlan["financials"]["monthlyOperatingCosts"]; total: string } {
  const hasAI = idea.tags.some((t) => t.toLowerCase() === "ai");
  const isHard = idea.difficulty === "Hard";

  const costs: BusinessPlan["financials"]["monthlyOperatingCosts"] = [
    { item: "Cloud Hosting (Vercel, AWS, etc.)", cost: "$200-$1,500" },
    { item: "Database (managed PostgreSQL)", cost: "$50-$300" },
    { item: "SaaS Tools (analytics, email, support)", cost: "$200-$800" },
    { item: "Domain & SSL", cost: "$15-$30" },
    { item: "Error Tracking (Sentry)", cost: "$26-$80" },
    { item: "Customer Support Tool", cost: "$50-$200" },
  ];

  if (hasAI) {
    costs.push({ item: "AI/LLM API Costs (OpenAI, etc.)", cost: "$500-$5,000" });
  }

  costs.push({ item: "Marketing & Content", cost: "$1,000-$5,000" });

  if (isHard) {
    costs.push({ item: "Compliance & Security", cost: "$200-$500" });
  }

  const lowTotal = hasAI ? 2500 : 1800;
  const highTotal = hasAI ? 14000 : 8500;

  return {
    costs,
    total: `$${lowTotal.toLocaleString()}-$${highTotal.toLocaleString()}`,
  };
}

function getRevenueProjections(idea: Idea): BusinessPlan["financials"]["revenueProjections"] {
  const rev = idea.monthlyRevenueEstimate;
  const match = rev.match(/\$([0-9,]+)K?/);
  const baseTarget = match ? parseInt(match[1].replace(/,/g, "")) * (rev.includes("K") ? 1000 : 1) : 10000;

  return [
    { month: "Month 1-2", mrr: "$0", customers: "Beta users (free)" },
    { month: "Month 3", mrr: `$${Math.round(baseTarget * 0.02).toLocaleString()}`, customers: "5-15" },
    { month: "Month 6", mrr: `$${Math.round(baseTarget * 0.08).toLocaleString()}`, customers: "20-60" },
    { month: "Month 9", mrr: `$${Math.round(baseTarget * 0.2).toLocaleString()}`, customers: "50-150" },
    { month: "Month 12", mrr: `$${Math.round(baseTarget * 0.4).toLocaleString()}`, customers: "100-300" },
    { month: "Month 18", mrr: `$${Math.round(baseTarget * 0.8).toLocaleString()}`, customers: "250-700" },
    { month: "Month 24", mrr: `$${Math.round(baseTarget * 1.5).toLocaleString()}`, customers: "500-1,500" },
  ];
}

function getPricingTiers(idea: Idea): BusinessPlan["financials"]["pricingTiers"] {
  const model = idea.revenueModel.toLowerCase();

  if (model.includes("subscription") || model.includes("saas")) {
    return [
      {
        name: "Free / Starter",
        price: "$0/mo",
        features: ["Limited usage (up to 100 actions/mo)", "1 user seat", "Community support", "Basic dashboard"],
      },
      {
        name: "Pro",
        price: "$29-$79/mo",
        features: ["Unlimited core usage", "Up to 5 team members", "Priority email support", "Advanced analytics", "Integrations"],
      },
      {
        name: "Business",
        price: "$149-$299/mo",
        features: ["Unlimited everything", "Unlimited team members", "Priority chat support", "Custom branding", "API access", "SSO / SAML"],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        features: ["Dedicated account manager", "Custom integrations", "SLA guarantees", "On-premise option", "Training & onboarding"],
      },
    ];
  }

  if (model.includes("marketplace") || model.includes("transaction")) {
    return [
      {
        name: "Basic Listing",
        price: "Free",
        features: ["1 active listing", "Basic visibility", "Standard support"],
      },
      {
        name: "Pro Seller",
        price: "$19-$49/mo + 5% transaction fee",
        features: ["Unlimited listings", "Featured placement", "Analytics dashboard", "Priority support"],
      },
      {
        name: "Business",
        price: "$99-$199/mo + 3% transaction fee",
        features: ["Bulk listing tools", "API access", "Dedicated account rep", "Reduced transaction fees"],
      },
    ];
  }

  return [
    {
      name: "Free Trial",
      price: "14-day free trial",
      features: ["Full access to all features", "No credit card required"],
    },
    {
      name: "Individual",
      price: "$19-$39/mo",
      features: ["Core features", "Email support", "Basic analytics"],
    },
    {
      name: "Team",
      price: "$49-$129/mo",
      features: ["All features", "Team collaboration", "Priority support", "Advanced analytics"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom deployment", "SLA", "Dedicated support", "Custom integrations"],
    },
  ];
}

function getBusinessModelCanvas(idea: Idea): BusinessPlan["businessModel"] {
  return {
    valueProposition: `${idea.solution} Unlike competitors, we focus on ${idea.targetAudience.split(",")[0].toLowerCase()} with a streamlined, affordable solution.`,
    revenueStreams: [
      `Primary: ${idea.revenueModel}`,
      "Secondary: Premium feature upsells",
      "Tertiary: API access for enterprise",
      idea.tags.some((t) => t.toLowerCase() === "ai") ? "Data insights and benchmarking reports" : "Professional services and consulting",
    ],
    keyPartners: getIntegrations(idea).slice(0, 4).map((i) => `${i} (integration partner)`),
    channels: idea.goToMarket.map((g) => g.split(" ").slice(0, 5).join(" ")),
    customerSegments: [
      idea.targetAudience,
      "Early adopters willing to try new solutions",
      "Teams frustrated with incumbent pricing",
    ],
    costStructure: [
      "Engineering team salaries (60-70% of costs)",
      "Cloud infrastructure and API costs",
      "Marketing and customer acquisition",
      "Customer support operations",
    ],
    unfairAdvantage: idea.difficulty === "Hard"
      ? "Deep domain expertise and technical moat create high barriers to entry for new competitors"
      : idea.tags.some((t) => t.toLowerCase() === "ai")
      ? "Proprietary AI models trained on domain-specific data improve with every customer interaction"
      : "Speed of execution and laser focus on underserved segment that incumbents overlook",
  };
}

function getLaunchStrategy(idea: Idea): BusinessPlan["launchStrategy"] {
  return {
    prelaunch: [
      "Build landing page with email capture (target 500+ signups)",
      "Create content marketing calendar (2 blog posts/week)",
      "Engage in 5-10 relevant online communities daily",
      "Line up 20-30 beta users from target audience",
      "Prepare Product Hunt launch assets",
      "Record demo video and product walkthrough",
    ],
    launch: [
      "Product Hunt launch (Tuesday, 12:01 AM PT)",
      "Hacker News Show HN post",
      "Email blast to waitlist with early-bird pricing",
      "Social media announcement campaign",
      "Outreach to 10 relevant newsletters for coverage",
      "Reddit posts in relevant subreddits",
    ],
    growth: [
      "SEO-optimized content targeting long-tail keywords",
      `Paid ads targeting '${idea.tags[0].toLowerCase()}' keywords ($${idea.customerAcquisitionCost.replace(/[^0-9]/g, "")} target CAC)`,
      "Referral program with meaningful incentives",
      "Partnership and integration marketplace",
      "Case studies from early customers",
      "Webinars and thought leadership content",
    ],
    milestones: [
      { target: "100 registered users", timeline: "Month 1" },
      { target: "First 10 paying customers", timeline: "Month 2-3" },
      { target: "50 paying customers", timeline: "Month 4-6" },
      { target: "$10K MRR", timeline: "Month 6-9" },
      { target: "Product-market fit signal (40% 'very disappointed')", timeline: "Month 9-12" },
      { target: idea.monthlyRevenueEstimate.split("-")[0] + " MRR", timeline: "Month 12-18" },
    ],
  };
}

function getLegalCompliance(idea: Idea): string[] {
  const items = [
    "Business incorporation (LLC or C-Corp for fundraising)",
    "Terms of Service and Privacy Policy",
    "GDPR compliance (cookie consent, data processing agreement)",
    "CCPA compliance for California users",
  ];

  const tags = idea.tags.map((t) => t.toLowerCase());

  if (tags.includes("ai")) {
    items.push("AI transparency and disclosure requirements");
    items.push("AI bias testing and documentation (EU AI Act)");
  }

  if (tags.includes("compliance") || tags.includes("legal") || tags.includes("security")) {
    items.push("SOC 2 Type II certification (within 12 months)");
    items.push("Industry-specific regulatory compliance");
  }

  if (tags.includes("fintech") || idea.category.toLowerCase().includes("fin")) {
    items.push("Financial data handling regulations (PCI DSS)");
    items.push("Money transmitter licensing if applicable");
  }

  if (tags.includes("health") || idea.category.toLowerCase().includes("health")) {
    items.push("HIPAA compliance for health data");
    items.push("FDA regulations if applicable");
  }

  items.push("Intellectual property protection (trademarks, patents)");
  items.push("Cyber liability insurance ($1M-$2M coverage)");

  return items;
}

function getKPIs(idea: Idea): BusinessPlan["kpis"] {
  return [
    { metric: "Monthly Recurring Revenue (MRR)", target: idea.monthlyRevenueEstimate, frequency: "Weekly" },
    { metric: "Customer Acquisition Cost (CAC)", target: `< ${idea.customerAcquisitionCost}`, frequency: "Monthly" },
    { metric: "Monthly Active Users (MAU)", target: "20% MoM growth", frequency: "Weekly" },
    { metric: "Churn Rate", target: "< 5% monthly", frequency: "Monthly" },
    { metric: "Net Promoter Score (NPS)", target: "> 50", frequency: "Quarterly" },
    { metric: "LTV:CAC Ratio", target: "> 3:1", frequency: "Monthly" },
    { metric: "Time to Value", target: "< 5 minutes to first success", frequency: "Weekly" },
    { metric: "Feature Adoption Rate", target: "> 60% of core features used", frequency: "Monthly" },
    { metric: "Support Ticket Resolution Time", target: "< 4 hours", frequency: "Weekly" },
    { metric: "Organic Traffic Growth", target: "15% MoM increase", frequency: "Monthly" },
  ];
}

export function generateBusinessPlan(idea: Idea): BusinessPlan {
  const { costs: startupCosts, total: totalStartupCost } = getStartupCosts(idea);
  const { costs: monthlyOpCosts, total: totalMonthlyCost } = getMonthlyOperatingCosts(idea);

  return {
    productSpecs: {
      coreFeatures: getCoreFeatures(idea),
      mvpFeatures: getMvpFeatures(idea),
      v2Features: getV2Features(idea),
      techStack: getTechStack(idea),
      integrations: getIntegrations(idea),
      platforms: idea.title.toLowerCase().includes("app") || idea.tags.some((t) => t.toLowerCase() === "mobile")
        ? ["Web (Desktop & Mobile)", "iOS App", "Android App"]
        : ["Web (Desktop & Mobile)", "Progressive Web App (PWA)"],
    },
    buildPlan: {
      phases: getBuildPhases(idea),
      totalTimeline: idea.timeToMvp,
      teamRequired: getTeam(idea),
    },
    financials: {
      startupCosts,
      totalStartupCost,
      monthlyOperatingCosts: monthlyOpCosts,
      totalMonthlyCost,
      revenueProjections: getRevenueProjections(idea),
      breakEvenTimeline: idea.difficulty === "Hard" ? "12-18 months" : idea.difficulty === "Medium" ? "8-14 months" : "5-10 months",
      pricingTiers: getPricingTiers(idea),
    },
    businessModel: getBusinessModelCanvas(idea),
    launchStrategy: getLaunchStrategy(idea),
    legalCompliance: getLegalCompliance(idea),
    kpis: getKPIs(idea),
  };
}
