"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Home,
  MapPin,
  Wifi,
  Coffee,
  Bath,
  Bed,
  Star,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AccommodationBooking() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const floatingFeatures = [
    { icon: Wifi, label: "Free WiFi", color: "text-brand-400" },
    { icon: Coffee, label: "Kitchen", color: "text-accent-400" },
    { icon: Bath, label: "Private Bath", color: "text-electric-400" },
    { icon: Bed, label: "Comfort Beds", color: "text-purple-400" },
  ];

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center min-h-screen bg-zinc-900 overflow-hidden">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-accent-500/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Floating feature cards */}
      {floatingFeatures.map((feature, index) => (
        <div
          key={index}
          className="absolute hidden lg:flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm px-4 py-3 rounded-full border border-zinc-700 shadow-lg"
          style={{
            animation: `floatAround ${8 + index * 2}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`,
            left: index % 2 === 0 ? "10%" : "auto",
            right: index % 2 === 1 ? "10%" : "auto",
            top: `${20 + index * 15}%`,
          }}
        >
          <feature.icon className={`h-5 w-5 ${feature.color}`} />
          <span className="text-sm font-medium text-zinc-300">
            {feature.label}
          </span>
        </div>
      ))}

      {/* Floating star icons */}
      <Sparkles
        className="absolute top-20 left-1/4 text-accent-400 h-6 w-6"
        style={{ animation: "pulse 3s ease-in-out infinite" }}
      />
      <Star
        className="absolute bottom-32 right-1/4 text-accent-300 h-5 w-5"
        style={{
          animation: "pulse 4s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />
      <Sparkles
        className="absolute top-1/3 right-20 text-accent-400 h-5 w-5"
        style={{
          animation: "pulse 3.5s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-accent-500 mb-4 animate-fade-in">
          Accommodation Booking
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Book comfortable accommodations during your language program stay.
        </p>
      </div>

      <Card className="relative z-10 max-w-2xl mx-4 md:mx-auto bg-zinc-800/90 backdrop-blur-sm border border-zinc-700 shadow-2xl shadow-accent-500/10 hover:shadow-accent-500/20 transition-all duration-300">
        <CardHeader className="text-center">
          <div className="mx-auto bg-gradient-to-br from-accent-500 to-accent-700 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg shadow-accent-500/50 animate-bounce-slow">
            <Home className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-accent-500">
            Coming Soon
          </CardTitle>
          <CardDescription className="text-lg">
            Our accommodation booking system is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-muted-foreground mb-6">
            We're working hard to bring you the best accommodation options for
            your language program stay. Check back soon to book your stay with
            us.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground hover:text-accent-400 transition-colors">
              <Calendar className="h-4 w-4 mr-2 text-accent-500" />
              <span>Flexible booking dates</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground hover:text-accent-400 transition-colors">
              <MapPin className="h-4 w-4 mr-2 text-accent-500" />
              <span>Prime locations</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              Notify Me When Available
            </Button>
            <Button className="bg-accent-600 hover:bg-accent-700 border-none hover:scale-105 transition-transform">
              View Program Options
            </Button>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes floatAround {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-15px) translateX(15px);
          }
          50% {
            transform: translateY(-25px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
