"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, BookOpen, Package, CheckCircle } from "lucide-react";
import { BookingType } from "@/app/util/bookingData";

interface BookingTypeSelectorProps {
  selectedBookingType: BookingType | null;
  onBookingTypeSelect: (bookingType: BookingType) => void;
}

export function BookingTypeSelector({
  selectedBookingType,
  onBookingTypeSelect,
}: BookingTypeSelectorProps) {
  const bookingOptions = [
    {
      type: BookingType.ACCOMMODATION_ONLY,
      title: "Accommodation",
      description:
        "Book accommodation and choose number of people. Admin will arrange rooms manually.",
      icon: Home,
      features: [
        "Choose accommodation",
        "Select number of people",
        "Flexible room arrangement",
        "Monthly pricing",
      ],
      badge: "Flexible",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      type: BookingType.PROGRAM_ONLY,
      title: "Program",
      description:
        "Select programs with available start months set by admin. Pay static program price.",
      icon: BookOpen,
      features: [
        "Choose program",
        "Select start month",
        "Fixed program price",
        "No accommodation",
      ],
      badge: "Study Focus",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      type: BookingType.PROGRAM_WITH_ACCOMMODATION,
      title: "Camp",
      description:
        "Complete package with program and accommodation. Select program first, then available accommodation.",
      icon: Package,
      features: [
        "Choose program first",
        "Select accommodation",
        "Complete package",
        "Best value",
      ],
      badge: "Complete Package",
      badgeColor: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-neutral-900 text-center">
          Choose Your Booking Type
        </CardTitle>
        <p className="text-neutral-600 text-center">
          Select the option that best fits your needs
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookingOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedBookingType === option.type;

            return (
              <Card
                key={option.type}
                className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => onBookingTypeSelect(option.type)}
              >
                <CardContent className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Icon className="size-8 text-blue-500 mr-2" />
                      <h5 className="font-bold text-neutral-900">
                        {option.title}
                      </h5>
                    </div>
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>

                  <Badge className={`mb-4 ${option.badgeColor}`}>
                    {option.badge}
                  </Badge>

                  <p className="text-sm text-neutral-600 mb-4">
                    {option.description}
                  </p>

                  <div className="space-y-2">
                    {option.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-neutral-600"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedBookingType && (
          <div className="mt-6 text-center">
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-2"
              onClick={() => {
                // This would typically trigger navigation to the next step
                console.log("Continue with:", selectedBookingType);
              }}
            >
              Continue with{" "}
              {
                bookingOptions.find((opt) => opt.type === selectedBookingType)
                  ?.title
              }
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
