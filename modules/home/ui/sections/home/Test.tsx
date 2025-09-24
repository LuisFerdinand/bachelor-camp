import React, { useState } from "react";
import {
  CheckCircle,
  Star,
  Users,
  Award,
  BookOpen,
  Globe,
  Target,
  Zap,
} from "lucide-react";

interface HighlightFeature {
  text: string;
}

interface Highlight {
  id: number;
  title: string;
  subtitle: string;
  iconUrl: string | null;
  features: HighlightFeature[];
}

// Mock data for demonstration
const mockHighlights: Highlight[] = [
  {
    id: 1,
    title: "Expert Native Instructors",
    subtitle: "Learn from certified teachers with years of experience",
    iconUrl: null,
    features: [
      { text: "TESOL Certified" },
      { text: "5+ Years Experience" },
      { text: "Native Speakers" },
      { text: "Personalized Approach" },
    ],
  },
  {
    id: 2,
    title: "Flexible Learning Options",
    subtitle: "Study at your own pace with multiple schedule choices",
    iconUrl: null,
    features: [
      { text: "Online & Offline" },
      { text: "Weekend Classes" },
      { text: "Evening Sessions" },
      { text: "Self-Paced Learning" },
      { text: "Mobile App Access" },
    ],
  },
  {
    id: 3,
    title: "Proven Success Rate",
    subtitle: "Join thousands of students who achieved their English goals",
    iconUrl: null,
    features: [
      { text: "95% Success Rate" },
      { text: "IELTS/TOEFL Prep" },
      { text: "Career Advancement" },
      { text: "University Admission" },
    ],
  },
];

// Skeleton Components
const SkeletonCircle: React.FC<{ className?: string }> = ({
  className = "",
}) => <div className={`bg-gray-200 rounded-full animate-pulse ${className}`} />;

const SkeletonText: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const SkeletonFeatureItem = () => (
  <div className="flex items-start space-x-3">
    <SkeletonCircle className="w-6 h-6 flex-shrink-0 mt-1" />
    <div className="flex-1">
      <SkeletonText className="h-5 w-32 mb-2" />
      <SkeletonText className="h-4 w-48 mb-3" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="flex items-center">
            <SkeletonCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <SkeletonText className="h-3 w-20" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Loading State Component
const LoadingState = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="max-w-xl">
            <div className="mb-6">
              <SkeletonText className="h-8 w-64 mb-2" />
              <SkeletonText className="h-8 w-48" />
            </div>
            <div className="mb-8">
              <SkeletonText className="h-5 w-full mb-2" />
              <SkeletonText className="h-5 w-3/4 mb-2" />
              <SkeletonText className="h-5 w-5/6" />
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <SkeletonFeatureItem key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <div className="w-full max-w-sm mx-auto lg:max-w-md">
              <SkeletonText className="w-full h-80 rounded-lg" />
            </div>
            <div className="absolute -bottom-4 lg:-top-4 right-4 lg:-left-12 max-w-xs">
              <div className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full lg:hidden">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></div>
                </div>
                <div className="absolute bottom-0 right-8 transform translate-y-full hidden lg:block">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white"></div>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <SkeletonCircle className="w-8 h-8" />
                  <div>
                    <SkeletonText className="h-4 w-24 mb-1" />
                    <SkeletonText className="h-3 w-20" />
                  </div>
                </div>
                <SkeletonText className="h-4 w-full mb-1" />
                <SkeletonText className="h-4 w-3/4 mb-3" />
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonCircle className="w-2 h-2" />
                  </div>
                  <SkeletonText className="h-3 w-24 ml-2" />
                </div>
              </div>
            </div>
            <div className="absolute -top-8 right-4 lg:right-8">
              <SkeletonText className="h-8 w-24 rounded-full" />
            </div>
            <div className="absolute bottom-64 lg:bottom-4 left-0 lg:-left-8">
              <SkeletonText className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Main Section Component
interface SectionProps {
  highlights: Highlight[];
  isLoading?: boolean;
}

const WhyChooseUsSection: React.FC<SectionProps> = ({
  highlights,
  isLoading = false,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Your Success Is Our{" "}
                <span className="text-blue-600">Priority</span>
              </h2>

              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We combine proven teaching methods with world-class facilities
                to deliver exceptional English learning experiences that
                transform your future.
              </p>

              {/* Key Features List */}
              <div className="space-y-4">
                {highlights?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="h-4 w-4 text-white flex items-center justify-center">
                        {index === 0 && <BookOpen className="h-3 w-3" />}
                        {index === 1 && <Globe className="h-3 w-3" />}
                        {index === 2 && <Award className="h-3 w-3" />}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-neutral-900 mb-1">
                        {feature.title}
                      </h5>
                      <p className="text-neutral-600 text-sm">
                        {feature.subtitle}
                      </p>
                      {feature.features && feature.features.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                          {feature.features.slice(0, 5).map((f, i) => (
                            <li
                              key={i}
                              className="flex items-center text-xs text-neutral-500"
                            >
                              <CheckCircle className="w-3 h-3 text-blue-600 mr-1.5 flex-shrink-0" />
                              {f.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image with Conversation Bubble */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Image Placeholder */}
              <div className="w-full max-w-sm mx-auto lg:max-w-md h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-600 font-semibold">Happy Student</p>
                </div>
              </div>

              {/* Conversation Bubble */}
              <div className="absolute -bottom-4 lg:-top-4 right-4 lg:-left-12 max-w-xs">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 relative">
                  {/* Speech bubble tail */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full lg:hidden">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></div>
                  </div>
                  <div className="absolute bottom-0 right-8 transform translate-y-full hidden lg:block">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white"></div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">BC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        Bachelor Camp
                      </p>
                      <p className="text-neutral-500 text-xs">English Expert</p>
                    </div>
                  </div>

                  <p className="text-neutral-700 text-sm leading-relaxed">
                    "Ready to achieve your English goals? Join thousands of
                    successful students! 🚀"
                  </p>

                  {/* Typing indicator */}
                  <div className="flex items-center space-x-1 mt-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-500 ml-2">
                      Bachelor Camp is typing...
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 right-4 lg:right-8">
                <div className="bg-yellow-400 text-neutral-900 px-3 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>

              <div className="absolute bottom-64 lg:bottom-4 left-0 lg:-left-8">
                <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>1000+ Graduates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Alternative Dark Theme Version
const DarkThemeSection: React.FC<{ highlights: Highlight[] }> = ({
  highlights,
}) => (
  <section className="py-16 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Your Success Is Our{" "}
              <span className="text-blue-400">Priority</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We combine proven teaching methods with world-class facilities to
              deliver exceptional English learning experiences that transform
              your future.
            </p>
            <div className="space-y-4">
              {highlights?.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-4 w-4 text-white flex items-center justify-center">
                      {index === 0 && <BookOpen className="h-3 w-3" />}
                      {index === 1 && <Globe className="h-3 w-3" />}
                      {index === 2 && <Award className="h-3 w-3" />}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-1">
                      {feature.title}
                    </h5>
                    <p className="text-gray-400 text-sm">{feature.subtitle}</p>
                    {feature.features && feature.features.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                        {feature.features.slice(0, 5).map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center text-xs text-gray-400"
                          >
                            <CheckCircle className="w-3 h-3 text-blue-400 mr-1.5 flex-shrink-0" />
                            {f.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <div className="w-full max-w-sm mx-auto lg:max-w-md h-80 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-400 font-semibold">Happy Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Compact Version
const CompactSection: React.FC<{ highlights: Highlight[] }> = ({
  highlights,
}) => (
  <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
          Why Choose <span className="text-blue-600">Bachelor Camp</span>?
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students who achieved their English goals
          with our proven methods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights?.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <div className="h-6 w-6 text-white flex items-center justify-center">
                  {index === 0 && <BookOpen className="h-5 w-5" />}
                  {index === 1 && <Globe className="h-5 w-5" />}
                  {index === 2 && <Award className="h-5 w-5" />}
                </div>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Main Display Component
const WhyChooseUsDisplayPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "default" | "dark" | "compact" | "loading"
  >("default");
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const views = [
    {
      id: "default",
      name: "Default Layout",
      description: "Standard two-column layout",
    },
    { id: "dark", name: "Dark Theme", description: "Dark mode version" },
    {
      id: "compact",
      name: "Compact Layout",
      description: "Card-based compact design",
    },
    {
      id: "loading",
      name: "Loading State",
      description: "Skeleton loading animation",
    },
  ] as const;

  const renderCurrentView = () => {
    switch (currentView) {
      case "dark":
        return <DarkThemeSection highlights={mockHighlights} />;
      case "compact":
        return <CompactSection highlights={mockHighlights} />;
      case "loading":
        return (
          <WhyChooseUsSection highlights={mockHighlights} isLoading={true} />
        );
      default:
        return (
          <WhyChooseUsSection
            highlights={mockHighlights}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Why Choose Us Section - Display Page
              </h1>
              <p className="text-neutral-600">
                Interactive preview of different layouts and states
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Loading
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* View Selector */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === view.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {view.name}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Current:{" "}
              <strong>{views.find((v) => v.id === currentView)?.name}</strong> -{" "}
              {views.find((v) => v.id === currentView)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{renderCurrentView()}</main>

      {/* Stats Section */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Layout Variants</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Bachelor Camp - English Learning Excellence
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a comprehensive display page showcasing different variations
            of the Why Choose Us section.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WhyChooseUsDisplayPage;
