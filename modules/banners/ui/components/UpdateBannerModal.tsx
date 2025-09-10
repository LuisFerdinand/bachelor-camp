"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateBannerForm } from "./UpdateBannerForm";
import { useEffect } from "react";

interface UpdateBannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bannerId: string;
}

export const UpdateBannerModal = ({
  open,
  onOpenChange,
  bannerId,
}: UpdateBannerModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Banner"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateBannerForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            bannerId={bannerId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
