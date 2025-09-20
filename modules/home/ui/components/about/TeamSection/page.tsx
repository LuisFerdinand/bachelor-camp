"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail } from "lucide-react";

// Team Section Interfaces
interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image?: string;
  email?: string;
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
  title?: string;
  subtitle?: string;
}

// BachelorCamp team members data
export const bachelorCampTeamMembers: TeamMember[] = [
  // Leadership Team (2 members)
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    position: "Direktur Program",
    department: "Kepemimpinan",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    email: "sarah.johnson@bachelorcamp.id",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    position: "Direktur Akademik",
    department: "Kepemimpinan",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    email: "priya.sharma@bachelorcamp.id",
  },
  // Academic Team (4 members)
  {
    id: 3,
    name: "Michael Chen",
    position: "Kepala Instruktur IELTS",
    department: "Akademik",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    email: "michael.chen@bachelorcamp.id",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    position: "Pemimpin Program Cambridge",
    department: "Akademik",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    email: "emma.rodriguez@bachelorcamp.id",
  },
  {
    id: 5,
    name: "James Thompson",
    position: "Instruktur Speaking & Pronunciation",
    department: "Akademik",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    email: "james.thompson@bachelorcamp.id",
  },
  {
    id: 6,
    name: "Lisa Wang",
    position: "Instruktur Grammar & Writing",
    department: "Akademik",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    email: "lisa.wang@bachelorcamp.id",
  },
];

export function TeamSection({
  teamMembers = bachelorCampTeamMembers,
  title = "Tim Kepemimpinan & Akademik BachelorCamp",
  subtitle = "Kenali para profesional berpengalaman yang memimpin program BachelorCamp di Kampung Inggris Kediri",
}: TeamSectionProps) {
  // Group team members by department
  const groupedTeam = teamMembers.reduce(
    (acc, member) => {
      if (!acc[member.department]) {
        acc[member.department] = [];
      }
      acc[member.department].push(member);
      return acc;
    },
    {} as Record<string, TeamMember[]>
  );

  const departmentColors: Record<string, string> = {
    Kepemimpinan: "bg-blue-100 text-blue-800",
    Akademik: "bg-green-100 text-green-800",
  };

  const departmentDescriptions: Record<string, string> = {
    Kepemimpinan:
      "Tim kepemimpinan kami mengarahkan visi dan strategi program BachelorCamp di Kampung Inggris.",
    Akademik:
      "Tim akademik kami memberikan pendidikan bahasa Inggris terbaik melalui pengalaman pembelajaran yang menyeluruh.",
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-0 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Tim Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Team Members by Department */}
        <div className="max-w-7xl mx-auto">
          {Object.entries(groupedTeam).map(([department, members]) => (
            <div key={department} className="mb-20 last:mb-0">
              {/* Department Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  Tim {department}
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                  {departmentDescriptions[department]}
                </p>
              </div>

              {/* Team Members Grid */}
              <div
                className={`grid gap-8 ${
                  members.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {members.map((member) => (
                  <Card
                    key={member.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        {/* Member Image */}
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                          <img
                            src={
                              member.image ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
                            }
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Member Info */}
                        <h4 className="text-xl font-bold mb-2 text-gray-900">
                          {member.name}
                        </h4>
                        <p className="text-blue-600 font-semibold mb-4">
                          {member.position}
                        </p>

                        {/* Contact Info */}
                        {member.email && (
                          <div className="flex items-center justify-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
