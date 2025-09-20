"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateTeamMemberForm } from "./UpdateTeamMemberForm";
import { useEffect } from "react";

interface UpdateTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamMemberId: string;
}

export const UpdateTeamMemberModal = ({
  open,
  onOpenChange,
  teamMemberId,
}: UpdateTeamMemberModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Team Member"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateTeamMemberForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            teamMemberId={teamMemberId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
