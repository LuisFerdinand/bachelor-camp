"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreatePrincipleForm } from "./CreatePrincipleForm";

interface CreatePrincipleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePrincipleModal = ({
  open,
  onOpenChange,
}: CreatePrincipleModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Principle"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreatePrincipleForm
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
