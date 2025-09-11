"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateBannerForm } from "./CreateBannerForm";

interface CreateBannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateBannerModal = ({
  open,
  onOpenChange,
}: CreateBannerModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Banner"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateBannerForm
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
