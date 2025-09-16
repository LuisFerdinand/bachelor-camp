"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateAccreditationForm } from "./UpdateAccreditationForm";
import { useEffect } from "react";

interface UpdateAccreditationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accreditationId: string;
}

export const UpdateAccreditationModal = ({
  open,
  onOpenChange,
  accreditationId,
}: UpdateAccreditationModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Accreditation"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateAccreditationForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            accreditationId={accreditationId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
