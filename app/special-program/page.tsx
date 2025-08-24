'use client'

import { useState } from 'react';
import Link from 'next/link';

interface Program {
  id: number;
  title: string;
  description: string;
  levels: string[];
  duration: string;
  price: number;
  features: string[];
}

export default function SpecialProgramPage() {
  const [activeProgram, setActiveProgram] = useState<string>('general-english');
  
  const programs: Program[] = [
    {
      id: 1,
      title: "General English",
      description: "Comprehensive English language course covering all skills - reading, writing, listening, and speaking.",
      levels: ["Beginner (A1)", "Elementary (A2)", "Intermediate (B1)", "Upper Intermediate (B2)"],
      duration: "4-12 weeks",
      price: 3500000,
      features: [
        "20 hours of instruction per week",
        "Small class sizes (max 12 students)",
        "Weekly progress tests",
        "Certificate upon completion"
      ]
    },
    {
      id: 2,
      title: "IELTS Preparation",
      description: "Intensive preparation course for the International English Language Testing System.",
      levels: ["Intermediate (B1)", "Upper Intermediate (B2)", "Advanced (C1)"],
      duration: "4-8 weeks",
      price: 5000000,
      features: [
        "Focus on all four IELTS sections",
        "Practice tests with feedback",
        "Test-taking strategies",
        "Mock exams under real conditions"
      ]
    },
    {
      id: 3,
      title: "Business English",
      description: "Professional English course for business environments and workplace communication.",
      levels: ["Intermediate (B1)", "Upper Intermediate (B2)", "Advanced (C1)"],
      duration: "2-6 weeks",
      price: 4500000,
      features: [
        "Business vocabulary and terminology",
        "Email and report writing",
        "Presentation skills",
        "Negotiation and meeting practice"
      ]
    }
  ];

  const cefrLevels = [
    { level: "A1", title: "Beginner", description: "Can understand and use familiar everyday expressions and very basic phrases." },
    { level: "A2", title: "Elementary", description: "Can communicate in simple and routine tasks requiring a simple exchange of information." },
    { level: "B1", title: "Intermediate", description: "Can deal with most situations likely to arise whilst travelling and describe experiences." },
    { level: "B2", title: "Upper Intermediate", description: "Can interact with a degree of fluency and spontaneity with native speakers." },
    { level: "C1", title: "Advanced", description: "Can use language flexibly and effectively for social, academic and professional purposes." },
    { level: "C2", title: "Proficient", description: "Can understand with ease virtually everything heard or read and summarize information." }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Special Programs</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Explore our specialized English programs designed to meet your specific learning goals.
          </p>
        </div>
      </section>

      {/* Program Tabs */}
      <div className="bg-background-secondary sticky top-16 z-10 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveProgram(program.title.toLowerCase().replace(/\s+/g, '-'))}
                className={`px-6 py-4 font-medium ${
                  activeProgram === program.title.toLowerCase().replace(/\s+/g, '-')
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {program.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Details */}
      <section className="py-12 bg-background-primary">
        <div className="container mx-auto px-4 max-w-4xl">
          {programs.map((program) => (
            activeProgram === program.title.toLowerCase().replace(/\s+/g, '-') && (
              <div key={program.id} className="animate-fade-in">
                <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h2 className="text-2xl font-bold text-text-primary mb-4 md:mb-0">{program.title}</h2>
                    <div className="text-xl font-bold text-primary-600">{formatCurrency(program.price)}</div>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{program.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">CEFR Levels</h3>
                      <ul className="space-y-2">
                        {program.levels.map((level, index) => (
                          <li key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-text-secondary">{level}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">Duration</h3>
                      <p className="text-text-secondary">{program.duration}</p>
                      
                      <h3 className="text-lg font-semibold text-text-primary mb-3 mt-6">Program Features</h3>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span className="text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/booking" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-center">
                      Book This Program
                    </Link>
                    <Link href="/contact-us" className="bg-background-primary border border-neutral-300 text-text-primary font-medium py-3 px-8 rounded-lg transition-colors hover:bg-primary-50 text-center">
                      Ask a Question
                    </Link>
                  </div>
                </div>
              </div>
            )
          ))}
          
          {/* CEFR Levels Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">CEFR Levels Explained</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cefrLevels.map((level, index) => (
                <div key={index} className="bg-background-secondary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary-600">{level.level}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">{level.title}</h3>
                  </div>
                  <p className="text-text-secondary">{level.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-secondary rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Not Sure Which Program is Right for You?</h2>
            <p className="max-w-2xl mx-auto mb-6">Take our free placement test to determine your current English level and get personalized recommendations.</p>
            <Link href="/contact-us" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-medium inline-block">
              Take Placement Test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}