"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface Accreditation {
  id: number;
  name: string;
  description: string;
  logo: string;
}

interface AccreditationsSectionProps {
  accreditations: Accreditation[];
}

export function AccreditationsSection({
  accreditations,
}: AccreditationsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
            <Award className="w-4 h-4 mr-2" />
            Accreditations & Partnerships
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Recognized Excellence
          </h2>
          <p className="text-lg text-neutral-600">
            We&apos;re proud to be recognized by leading international
            organizations for our quality standards.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accreditations.map((accreditation) => (
            <Card
              key={accreditation.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-brand-600">
                    {accreditation.logo}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{accreditation.name}</h3>
                <p className="text-neutral-600 text-sm">
                  {accreditation.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
