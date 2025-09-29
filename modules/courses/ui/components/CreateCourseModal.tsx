"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateCourseForm, EnhancedCourseForm } from "./CreateCourseForm";
import { StepperCourseForm } from "./CreateCourseStepper";

interface CreateCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCourseModal = ({
  open,
  onOpenChange,
}: CreateCourseModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal mode="double" open={open} onOpenChange={onOpenChange}>
        {/* <EnhancedCourseForm></EnhancedCourseForm> */}
        {/* <CreateCourseForm
          open={open}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            onOpenChange(false);
          }}
        /> */}
        <StepperCourseForm
          open={open}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            onOpenChange(false);
          }}
        ></StepperCourseForm>
      </ResponsiveModal>
    </>
  );
};
