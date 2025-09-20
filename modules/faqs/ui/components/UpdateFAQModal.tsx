"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateFAQForm } from "./UpdateFAQForm";
import { useEffect } from "react";

interface UpdateFaqModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faqId: string;
}

export const UpdateFAQModal = ({
  open,
  onOpenChange,
  faqId,
}: UpdateFaqModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update FAQ"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateFAQForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            faqId={faqId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
