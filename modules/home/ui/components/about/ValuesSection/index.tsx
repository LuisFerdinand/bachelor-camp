"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface Value {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

interface ValuesSectionProps {
  values: Value[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-brand-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
            <BookOpen className="w-4 h-4 mr-2" />
            Our Core Values
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Guiding Principles
          </h2>
          <p className="text-lg text-neutral-600">
            The values that guide everything we do at our institution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
