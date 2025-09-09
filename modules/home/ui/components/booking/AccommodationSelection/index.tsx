"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Users, CheckCircle } from "lucide-react";
import { Building } from "@/app/util/buildingData";

interface AccommodationSelectionProps {
  selectedBuilding: Building | null;
  selectedPricing: Building["pricing"][0] | null;
  personCount: number;
  onPricingSelect: (pricing: Building["pricing"][0]) => void;
  onPersonCountChange: (count: number) => void;
}

export function AccommodationSelection({
  selectedBuilding,
  selectedPricing,
  personCount,
  onPricingSelect,
  onPersonCountChange,
}: AccommodationSelectionProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-neutral-900">
          <Home className="h-5 w-5 mr-2 text-blue-500" />
          Select Your Accommodation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedBuilding ? (
          <div className="text-center py-8">
            <Home className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">
              Building information not available
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">
                {selectedBuilding.name}
              </h4>
              <p className="text-sm text-neutral-600">
                {selectedBuilding.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedBuilding.pricing.map((pricing) => (
                <Card
                  key={pricing.id}
                  className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                    selectedPricing?.id === pricing.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => onPricingSelect(pricing)}
                >
                  <CardContent className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-bold text-neutral-900">
                        {pricing.type}
                      </h5>
                      {selectedPricing?.id === pricing.id && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">
                      {pricing.description}
                    </p>
                    <div className="flex items-center text-sm text-neutral-600 mb-2">
                      <Users className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>
                        Capacity: {pricing.capacity} - {pricing.maxCapacity}{" "}
                        persons
                      </span>
                    </div>
                    <div className="font-bold text-blue-600 mt-auto">
                      {pricing.price}
                    </div>
                    {pricing.highlight && (
                      <Badge className="mt-2 bg-blue-100 text-blue-800">
                        Recommended
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Person Selection */}
            {selectedPricing && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-neutral-900">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Select Number of Persons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPersonCountChange(personCount - 1)}
                      disabled={personCount <= selectedPricing.capacity}
                    >
                      -
                    </Button>
                    <div className="text-lg font-semibold min-w-[40px] text-center">
                      {personCount}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPersonCountChange(personCount + 1)}
                      disabled={personCount >= selectedPricing.maxCapacity}
                    >
                      +
                    </Button>
                    <span className="text-sm text-neutral-600 ml-2">
                      persons (max: {selectedPricing.maxCapacity})
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-neutral-600">
                    Total accommodation cost: Rp{" "}
                    {(
                      selectedPricing.numericPrice * personCount
                    ).toLocaleString("id-ID")}
                    /month
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
