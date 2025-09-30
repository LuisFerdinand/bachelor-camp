"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, GraduationCap, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { CoursesSection } from "../../../sections/services/courses/CoursesSection";
import { CreateCourseModal } from "@/modules/courses/ui/components/CreateCourseModal";
import { useSearchParams } from "next/navigation";

export const CoursesView = () => {
  const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);
  const [createBatchModalOpen, setCreateBatchModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "course";

  const getViewConfig = () => {
    switch (view) {
      case "course":
        return {
          icon: <BookOpen className="size-4 text-primary" />,
          title: "Courses Management",
          description: "View and manage all courses.",
          breadcrumbLabel: "Courses",
          showCreateButton: true,
          onCreateClick: () => setCreateCourseModalOpen(true),
        };
      case "batch":
        return {
          icon: <GraduationCap className="size-4 text-primary" />,
          title: "Course Batches Management",
          description: "View and manage all course batches.",
          breadcrumbLabel: "Course Batches",
          showCreateButton: true,
          onCreateClick: () => setCreateBatchModalOpen(true),
        };
      case "session":
        return {
          icon: <Calendar className="size-4 text-primary" />,
          title: "Batch Sessions Management",
          description:
            "View and manage all batch sessions. Sessions are automatically generated when creating a batch.",
          breadcrumbLabel: "Batch Sessions",
          showCreateButton: false, // Sessions are auto-generated
          onCreateClick: undefined,
        };
      default:
        return {
          icon: <BookOpen className="size-4 text-primary" />,
          title: "Courses Management",
          description: "View and manage all courses.",
          breadcrumbLabel: "Courses",
          showCreateButton: true,
          onCreateClick: () => setCreateCourseModalOpen(true),
        };
    }
  };

  const viewConfig = getViewConfig();

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateCourseModal
        open={createCourseModalOpen}
        onOpenChange={setCreateCourseModalOpen}
      />
      <PageHeader
        icon={viewConfig.icon}
        title={viewConfig.title}
        description={viewConfig.description}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: viewConfig.breadcrumbLabel, isCurrent: true },
        ]}
        action={
          viewConfig.showCreateButton ? (
            <Button
              variant="default"
              onClick={viewConfig.onCreateClick}
              className="flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create {view === "course" ? "Course" : "Batch"}</span>
            </Button>
          ) : undefined
        }
      />
      <CoursesSection></CoursesSection>
    </div>
  );
};
