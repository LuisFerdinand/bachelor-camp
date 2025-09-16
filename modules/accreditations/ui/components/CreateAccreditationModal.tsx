"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateAccreditationForm } from "./CreateAccreditationForm";

interface CreateAccreditationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateAccreditationModal = ({
  open,
  onOpenChange,
}: CreateAccreditationModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Accreditation"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateAccreditationForm
          open={open}
          onCancel={() => onOpenChange(false)}
          onSuccess={(id) => {
            onOpenChange(false);
          }}
        />
      </ResponsiveModal>
    </>
  );
};
