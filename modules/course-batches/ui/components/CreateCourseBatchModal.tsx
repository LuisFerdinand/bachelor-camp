"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateCourseBatchStepperForm } from "./CreateCourseBatchStepperForm";

interface CreateCourseBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCourseBatchModal = ({
  open,
  onOpenChange,
}: CreateCourseBatchModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal mode="double" open={open} onOpenChange={onOpenChange}>
        <CreateCourseBatchStepperForm
          open={open}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            onOpenChange(false);
          }}
        ></CreateCourseBatchStepperForm>
      </ResponsiveModal>
    </>
  );
};
