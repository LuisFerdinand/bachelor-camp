"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateStatisticForm } from "./UpdateStatisticForm";
import { useEffect } from "react";

interface UpdateStatisticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statisticId: string;
}

export const UpdateStatisticModal = ({
  open,
  onOpenChange,
  statisticId,
}: UpdateStatisticModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Statistic"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateStatisticForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            statisticId={statisticId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
