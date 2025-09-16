"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateStatisticForm } from "./CreateStatisticForm";

interface CreateStatisticModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateStatisticModal = ({
  open,
  onOpenChange,
}: CreateStatisticModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Statistic"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateStatisticForm
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
