"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { useEffect } from "react";
import { UpdateCourseBatchForm } from "./UpdateCourseBatchForm";

interface UpdateCourseBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseBatchId: string;
}

export const UpdateCourseBatchModal = ({
  open,
  onOpenChange,
  courseBatchId,
}: UpdateCourseBatchModalProps) => {
  return (
    <>
      <div className="bg-black">
        <ResponsiveModal mode="double" open={open} onOpenChange={onOpenChange}>
          <UpdateCourseBatchForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            courseBatchId={courseBatchId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
