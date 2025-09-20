"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateFAQForm } from "./CreateFAQForm";

interface CreateFAQModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateFAQModal = ({ open, onOpenChange }: CreateFAQModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create FAQ"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateFAQForm
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
