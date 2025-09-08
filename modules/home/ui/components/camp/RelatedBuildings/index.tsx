"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Building {
  id: number;
  name: string;
  image: string;
  imageAlt: string;
  slug: string;
}

interface RelatedBuildingsProps {
  buildings: Building[];
}

export function RelatedBuildings({ buildings }: RelatedBuildingsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-display-sm font-bold mb-8">Related Buildings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buildings.map((building) => (
              <Card
                key={building.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={building.image}
                    alt={building.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{building.name}</h3>
                  <Link href={`/camp/${building.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
