"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, CheckCircle } from "lucide-react";
import type { Building } from "@/app/util/buildingData";

interface BuildingSelectionProps {
  buildings: Building[];
  selectedBuilding: Building | null;
  onBuildingSelect: (building: Building) => void;
}

export function BuildingSelection({
  buildings,
  selectedBuilding,
  onBuildingSelect,
}: BuildingSelectionProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-neutral-900">
          <Home className="h-5 w-5 mr-2 text-blue-500" />
          Select Your Building
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <Card
              key={building.id}
              className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                selectedBuilding?.id === building.id
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => onBuildingSelect(building)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={building.image}
                  alt={building.imageAlt}
                  className="w-full h-full object-cover"
                />
                {building.badge && (
                  <Badge
                    className={`absolute top-3 right-3 ${building.badgeColor}`}
                  >
                    {building.badge}
                  </Badge>
                )}
              </div>
              <CardContent className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-neutral-900">
                    {building.name}
                  </h4>
                  {selectedBuilding?.id === building.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 mb-4">
                  {building.description}
                </p>
                <div className="flex items-center text-sm text-neutral-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-neutral-500" />
                  <span className="truncate">
                    {building.location.address.split(",")[0]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {building.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {building.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{building.features.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="font-bold text-blue-600 mt-auto">
                  From Rp{" "}
                  {Math.min(
                    ...building.pricing.map((p) => p.numericPrice)
                  ).toLocaleString("id-ID")}
                  /month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
