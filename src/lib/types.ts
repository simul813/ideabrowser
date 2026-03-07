export interface TrendDataPoint {
  month: string;
  searchVolume: number;
  redditMentions: number;
}

export interface Competitor {
  name: string;
  url: string;
  funding: string;
  weakness: string;
}

export interface Idea {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  marketSize: string;
  marketSizeValue: number;
  revenueModel: string;
  monthlyRevenueEstimate: string;
  customerAcquisitionCost: string;
  timeToMvp: string;
  competitionLevel: "Low" | "Medium" | "High";
  demandScore: number; // 1-100
  trendDirection: "Rising" | "Stable" | "Declining";
  summary: string;
  problem: string;
  solution: string;
  targetAudience: string;
  goToMarket: string[];
  trendData: TrendDataPoint[];
  competitors: Competitor[];
  keyMetrics: { label: string; value: string }[];
  viabilityScore: number; // 1-10, critic assessment
  keyRisks: string[];
  upvotes: number;
  dateAdded: string;
}
