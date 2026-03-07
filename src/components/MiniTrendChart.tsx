"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendDataPoint } from "@/lib/types";

export function MiniTrendChart({ data }: { data: TrendDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="searchVolume"
          stroke="#6366f1"
          strokeWidth={1.5}
          fill="url(#miniGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
