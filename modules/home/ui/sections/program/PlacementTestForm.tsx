"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

interface PlacementTestFormProps {
  categories: string[];
}

export function PlacementTestForm({ categories }: PlacementTestFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    currentLevel: "",
    programInterest: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.currentLevel ||
      !formData.programInterest
    ) {
      setFormError(true);
      return;
    }
    // In a real application, this would send the data to a server
    console.log("Placement test form submitted:", formData);
    // Simulate sending to admin
    setTimeout(() => {
      setFormSubmitted(true);
      setFormError(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        currentLevel: "",
        programInterest: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-none">
      <CardHeader className="w-full">
        <CardTitle className="text-xl">Online Placement Test</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll recommend the right program for
          you
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {formSubmitted ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Thank you for taking our placement test! Our team will review your
              information and send a program recommendation to your email
              shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  Please fill in all required fields.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+62 812 3456 7890"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="currentLevel"
                  className="block text-sm font-medium mb-1"
                >
                  Current English Level *
                </label>
                <select
                  id="currentLevel"
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (A1-A2)</option>
                  <option value="intermediate">Intermediate (B1-B2)</option>
                  <option value="advanced">Advanced (C1-C2)</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="programInterest"
                className="block text-sm font-medium mb-1"
              >
                Program of Interest *
              </label>
              <select
                id="programInterest"
                name="programInterest"
                value={formData.programInterest}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              >
                <option value="">Select a program</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Additional Information (Optional)
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your learning goals or any questions you have..."
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              Submit Placement Test
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
