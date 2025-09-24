"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateFacilityForm } from "./UpdateFacilityForm";
import { useEffect } from "react";

interface UpdateFacilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilityId: string;
}

export const UpdateFacilityModal = ({
  open,
  onOpenChange,
  facilityId,
}: UpdateFacilityModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Facility"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateFacilityForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            facilityId={facilityId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
