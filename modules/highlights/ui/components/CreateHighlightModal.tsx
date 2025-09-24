"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateHighlightForm } from "./CreateHighlightForm";

interface CreateHighlightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateHighlightModal = ({
  open,
  onOpenChange,
}: CreateHighlightModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Highlight"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateHighlightForm
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
