"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdatePrincipleForm } from "./UpdatePrincipleForm";
import { useEffect } from "react";

interface UpdatePrincipleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  principleId: string;
}

export const UpdatePrincipleModal = ({
  open,
  onOpenChange,
  principleId,
}: UpdatePrincipleModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Principle"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdatePrincipleForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            principleId={principleId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
