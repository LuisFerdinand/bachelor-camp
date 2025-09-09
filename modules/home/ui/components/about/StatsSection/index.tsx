"use client";

import React from "react";

interface StatsItem {
  id: number;
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: StatsItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-50 to-accent-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-brand-100"
            >
              <div className="text-4xl font-bold text-brand-600 mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}