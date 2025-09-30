// modules/home/ui/pages/campBooking/index.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, MapPin } from "lucide-react";

export default function CampBooking() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-600 mb-4">Camp Booking</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Book our immersive language camps that combine programs with
          accommodation.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border border-border">
        <CardHeader className="text-center">
          <div className="mx-auto bg-accent-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-accent-600" />
          </div>
          <CardTitle className="text-2xl text-brand-700">Coming Soon</CardTitle>
          <CardDescription className="text-lg">
            Our camp booking system is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-muted-foreground mb-6">
            We're working hard to bring you the best language camp experiences
            that combine our top programs with comfortable accommodations. Check
            back soon to book your camp experience.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-brand-500" />
              <span>Flexible booking dates</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-brand-500" />
              <span>Prime locations</span>
            </div>
          </div>
          <Button variant="outline" className="mr-4">
            Notify Me When Available
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700">
            View Program Options
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
