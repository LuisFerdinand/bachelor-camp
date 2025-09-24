"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateFacilityForm } from "./CreateFacilityForm";

interface CreateFacilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateFacilityModal = ({
  open,
  onOpenChange,
}: CreateFacilityModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Facility"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateFacilityForm
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
