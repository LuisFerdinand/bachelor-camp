"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateCourseForm, EnhancedCourseForm } from "./CreateCourseForm";
import { CreateCourseStepperForm } from "./CreateCourseStepperForm";

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
        <CreateCourseStepperForm
          open={open}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            onOpenChange(false);
          }}
        ></CreateCourseStepperForm>
      </ResponsiveModal>
    </>
  );
};
