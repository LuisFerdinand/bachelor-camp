"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateLocationForm } from "./CreateLocationForm";

interface CreateLocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLocationModal = ({
  open,
  onOpenChange,
}: CreateLocationModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Location"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateLocationForm
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
