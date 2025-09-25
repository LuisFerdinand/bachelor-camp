"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  MessageCircle,
  Facebook,
  Instagram,
  User,
  Loader2,
  Star,
  Award,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { trpc } from "@/trpc/client";

// Types must match your backend return shape
export type TeamMemberFetch = {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  avatarUrl: string | null;
  bio: string | null;
  socialLinks:
    | {
        type:
          | "email"
          | "linkedin"
          | "twitter"
          | "website"
          | "whatsapp"
          | "facebook"
          | "instagram";
        url: string;
      }[]
    | null;
  order: number;
};

type TeamMembersByDepartment = Record<string, TeamMemberFetch[]>;

// Social media icons mapping
const getSocialIcon = (type: string) => {
  const iconProps = { size: 18 };
  switch (type) {
    case "email":
      return <Mail {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "website":
      return <Globe {...iconProps} />;
    case "whatsapp":
      return <MessageCircle {...iconProps} />;
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    default:
      return <Globe {...iconProps} />;
  }
};

// Professional avatar fallback component
const AvatarFallback: React.FC<{ name: string; size?: number }> = ({
  name,
  size = 96,
}) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-inner"
      style={{ width: size, height: size }}
    >
      <span className={`${size >= 96 ? "text-2xl" : "text-lg"}`}>
        {initials}
      </span>
    </div>
  );
};

// Team member card component
const TeamMemberCard: React.FC<{
  member: TeamMemberFetch;
  department: string;
  index: number;
}> = ({ member, department, index }) => {
  const getDepartmentIcon = (dept: string) => {
    switch (dept.toLowerCase()) {
      case "leadership":
        return <Star className="w-4 h-4" />;
      case "academic":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept.toLowerCase()) {
      case "leadership":
        return "from-blue-500 to-blue-600";
      case "academic":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <Card
      className="group overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white relative"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Department badge */}
      <div
        className={`absolute top-4 right-4 bg-gradient-to-r ${getDepartmentColor(department)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 z-10`}
      >
        {getDepartmentIcon(department)}
        <span className="capitalize">{department}</span>
      </div>

      {/* Decorative background element */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getDepartmentColor(department)} opacity-5 rounded-bl-full transition-all duration-500 group-hover:opacity-10 group-hover:w-40 group-hover:h-40`}
      />

      <CardContent className="p-8 text-center relative z-10">
        {/* Member Image */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-brand-200 transition-all duration-300 bg-gray-100">
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div className={member.avatarUrl ? "hidden" : ""}>
              <AvatarFallback name={member.name} size={96} />
            </div>
          </div>
        </div>

        {/* Member Info */}
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-brand-600 transition-colors">
            {member.name}
          </h4>
          <p className="text-brand-600 font-semibold text-base mb-3">
            {member.title}
          </p>

          {member.bio && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          )}
        </div>

        {/* Social Links */}
        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 mt-6">
            {member.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 hover:bg-brand-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                title={`${member.name} on ${link.type}`}
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Loading skeleton component
const TeamMemberSkeleton: React.FC = () => (
  <Card className="overflow-hidden border border-gray-200 shadow-md bg-white animate-pulse">
    <CardContent className="p-8 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-6"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
      <div className="flex justify-center gap-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-300 rounded-full"></div>
          ))}
      </div>
    </CardContent>
  </Card>
);

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
}

export function TeamSection({
  title = "BachelorCamp Leadership & Academic Team",
  subtitle = "Meet the experienced professionals leading the BachelorCamp program in Kampung Inggris Kediri",
}: TeamSectionProps) {
  const { data, isLoading } = trpc.teamMembers.getMany.useQuery();

  const departmentConfig: Record<
    string,
    { color: string; icon: React.ReactNode; description: string }
  > = {
    Leadership: {
      color: "from-blue-500 to-blue-600",
      icon: <Star className="w-5 h-5" />,
      description:
        "Our leadership team guides the vision and strategy of the BachelorCamp program, ensuring excellence in every aspect of our English education journey in Kampung Inggris.",
    },
    Academic: {
      color: "from-green-500 to-green-600",
      icon: <GraduationCap className="w-5 h-5" />,
      description:
        "Our dedicated academic team brings years of English teaching expertise, creating comprehensive learning experiences that transform students' language skills and confidence.",
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-6 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Team Skeletons */}
          <div className="max-w-7xl mx-auto">
            {Array(2)
              .fill(0)
              .map((_, deptIndex) => (
                <div key={deptIndex} className="mb-20">
                  <div className="text-center mb-12">
                    <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array(4)
                      .fill(0)
                      .map((_, memberIndex) => (
                        <TeamMemberSkeleton key={memberIndex} />
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-center mt-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500 mr-3" />
            <span className="text-gray-600 font-medium text-lg">
              Loading our amazing team...
            </span>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!data?.grouped || Object.keys(data.grouped).length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No team members found
            </h3>
            <p className="text-gray-600">
              Our team information will be available soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const groupedTeam: TeamMembersByDepartment = data.grouped;
  const totalMembers = Object.values(groupedTeam).flat().length;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 border-0 px-6 py-3">
            <Users className="w-4 h-4 mr-2" />
            Our Professional Team
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Team stats */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-brand-500" />
                <span className="font-semibold text-gray-900">
                  {totalMembers} Team Members
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">
                  {Object.keys(groupedTeam).length} Departments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members by Department */}
        <div className="max-w-7xl mx-auto">
          {Object.entries(groupedTeam).map(
            ([department, members], deptIndex) => (
              <div key={department} className="mb-20 last:mb-0">
                {/* Department Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${departmentConfig[department]?.color || "from-gray-500 to-gray-600"} text-white rounded-xl flex items-center justify-center mr-4 shadow-lg`}
                    >
                      {departmentConfig[department]?.icon || (
                        <Briefcase className="w-5 h-5" />
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {department} Team
                    </h3>
                  </div>
                  <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
                    {departmentConfig[department]?.description ||
                      "This department is an essential part of our BachelorCamp team, contributing to the success of our English education program."}
                  </p>
                  <div className="mt-4">
                    <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                      {members.length}{" "}
                      {members.length === 1 ? "Member" : "Members"}
                    </span>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div
                  className={`grid gap-8 ${
                    members.length === 1
                      ? "grid-cols-1 max-w-sm mx-auto"
                      : members.length === 2
                        ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                        : members.length === 3
                          ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {members.map((member, index) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      department={department}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
