"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Building2,
  ImageIcon,
  PackageIcon,
  PlusIcon,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { CoursesSection } from "../../../sections/services/courses/CoursesSection";
import { CreateCourseModal } from "@/modules/courses/ui/components/CreateCourseModal";
import { EnhancedCourseForm } from "@/modules/courses/ui/components/CreateCourseForm";
import { StepperCourseForm } from "@/modules/courses/ui/components/CreateCourseStepper";
// import { EnhancedCourseForm } from "@/modules/courses/ui/components/CreateCourseStepper";

export const CoursesView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateCourseModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      {/* <EnhancedCourseForm></EnhancedCourseForm> */}
      {/* <StepperCourseForm open={true}></StepperCourseForm> */}
      <PageHeader
        icon={<BookOpen className="size-4 text-primary" />}
        title=" Courses Management"
        description={`View and manage all Courses.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: " Courses", isCurrent: true },
        ]}
        action={
          <Button
            variant="default"
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create</span>
          </Button>
        }
      />
      <CoursesSection></CoursesSection>
    </div>
  );
};
