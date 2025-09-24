"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreatePillarForm } from "./CreatePillarForm";

interface CreatePillarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePillarModal = ({
  open,
  onOpenChange,
}: CreatePillarModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Pillar"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreatePillarForm
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
