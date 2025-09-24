"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateMilestoneForm } from "./CreateMilestoneForm";

interface CreateMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMilestoneModal = ({
  open,
  onOpenChange,
}: CreateMilestoneModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Milestone"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateMilestoneForm
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
