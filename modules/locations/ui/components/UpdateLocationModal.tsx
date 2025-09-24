"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateLocationForm } from "./UpdateLocationForm";
import { useEffect } from "react";

interface UpdateLocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationId: string;
}

export const UpdateLocationModal = ({
  open,
  onOpenChange,
  locationId,
}: UpdateLocationModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Location"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateLocationForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            locationId={locationId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
