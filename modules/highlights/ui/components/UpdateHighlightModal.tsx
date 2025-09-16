"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateHighlightForm } from "./UpdateHighlightForm";
import { useEffect } from "react";

interface UpdateHighlightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  highlightId: string;
}

export const UpdateHighlightModal = ({
  open,
  onOpenChange,
  highlightId,
}: UpdateHighlightModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Highlight"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateHighlightForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            highlightId={highlightId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
