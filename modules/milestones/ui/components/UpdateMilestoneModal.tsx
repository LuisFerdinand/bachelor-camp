"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateMilestoneForm } from "./UpdateMilestoneForm";
import { useEffect } from "react";

interface UpdateMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestoneId: string;
}

export const UpdateMilestoneModal = ({
  open,
  onOpenChange,
  milestoneId,
}: UpdateMilestoneModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Milestone"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateMilestoneForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            milestoneId={milestoneId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
