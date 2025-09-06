"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { FAQItem } from "./types";

interface FAQSectionProps {
  faqs: FAQItem[];
  expandedFaq: number | null;
  toggleFaq: (index: number) => void;
}

export default function FAQSection({ faqs, expandedFaq, toggleFaq }: FAQSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent-100 text-accent-800">
            <MessageSquare className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            BachelorCamp FAQs
          </h2>
          <p className="text-lg text-neutral-600">
            Find answers to common questions about our programs and services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left hover:bg-neutral-50"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-brand-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-brand-500" />
                      )}
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-neutral-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}