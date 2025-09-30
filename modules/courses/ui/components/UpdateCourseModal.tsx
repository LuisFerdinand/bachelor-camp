"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { useEffect } from "react";
import { UpdateCourseForm } from "./UpdateCourseForm";

interface UpdateCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
}

export const UpdateCourseModal = ({
  open,
  onOpenChange,
  courseId,
}: UpdateCourseModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal mode="double" open={open} onOpenChange={onOpenChange}>
          <UpdateCourseForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            courseId={courseId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
