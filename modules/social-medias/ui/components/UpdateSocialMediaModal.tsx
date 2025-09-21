"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateSocialMediaForm } from "./UpdateSocialMediaForm";

interface UpdateSocialMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socialMediaId: string;
}

export const UpdateSocialMediaModal = ({
  open,
  onOpenChange,
  socialMediaId,
}: UpdateSocialMediaModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update SocialMedia"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateSocialMediaForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            socialMediaId={socialMediaId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
