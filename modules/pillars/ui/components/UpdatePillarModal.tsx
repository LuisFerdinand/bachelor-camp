"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdatePillarForm } from "./UpdatePillarForm";
import { useEffect } from "react";

interface UpdatePillarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pillarId: string;
}

export const UpdatePillarModal = ({
  open,
  onOpenChange,
  pillarId,
}: UpdatePillarModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Pillar"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdatePillarForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            pillarId={pillarId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
