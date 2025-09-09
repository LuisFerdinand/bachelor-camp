"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  tableOfContents: TOCItem[];
  isTOCOpen: boolean;
  setIsTOCOpen: (open: boolean) => void;
  activeSection: string | null;
  scrollToSection: (sectionId: string) => void;
}

export function TableOfContents({
  tableOfContents,
  isTOCOpen,
  setIsTOCOpen,
  activeSection,
  scrollToSection,
}: TableOfContentsProps) {
  return (
    <Card className="border-0 shadow-md mb-8 sticky top-24 z-10">
      <CardHeader
        className="pb-3 cursor-pointer"
        onClick={() => setIsTOCOpen(!isTOCOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2 text-brand-500" />
            Table of Contents
          </CardTitle>
          {isTOCOpen ? (
            <ChevronUp className="h-5 w-5 text-neutral-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-500" />
          )}
        </div>
      </CardHeader>
      {isTOCOpen && (
        <CardContent>
          <nav>
            <ul className="space-y-1">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-center ${
                      activeSection === item.id
                        ? "bg-brand-100 text-brand-700 font-medium"
                        : "hover:bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                        activeSection === item.id
                          ? "bg-brand-500"
                          : "bg-neutral-300"
                      }`}
                    >
                      {activeSection === item.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </span>
                    <span
                      className={`${
                        item.level === 1
                          ? "font-medium"
                          : item.level === 2
                          ? "ml-2"
                          : "ml-4 text-sm"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      )}
    </Card>
  );
}
