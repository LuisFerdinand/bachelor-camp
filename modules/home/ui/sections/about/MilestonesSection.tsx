"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { trpc } from "@/trpc/client";

export function MilestonesSection() {
  const { data: milestones, isLoading: isLoadingMilestones } =
    trpc.milestones.getMany.useQuery();

  if (isLoadingMilestones) {
    return <>Loading</>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-success-100 text-success-800 border-0">
            <History className="w-4 h-4 mr-2" />
            Our Journey
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Key Milestones
          </h2>
          <p className="text-lg text-neutral-600">
            Important moments in our mission to provide exceptional English
            education.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brand-200 to-accent-200"></div>
            {milestones?.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative mb-12 ${index % 2 === 0 ? "text-right" : "text-left"}`}
              >
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 border-4 border-white z-10`}
                ></div>
                <div
                  className={`w-5/12 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-brand-100 text-brand-800">
                        {milestone.year}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-neutral-600">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
