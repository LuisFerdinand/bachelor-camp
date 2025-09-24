"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateTeamMemberForm } from "./CreateTeamMemberForm";

interface CreateTeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTeamMemberModal = ({
  open,
  onOpenChange,
}: CreateTeamMemberModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create TeamMember"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateTeamMemberForm
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
