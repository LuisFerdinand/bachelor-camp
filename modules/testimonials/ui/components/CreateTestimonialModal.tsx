"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";

import { useRouter } from "next/navigation";
import { CreateTestimonialForm } from "./CreateTestimonialForm";

interface CreateTestimonialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTestimonialModal = ({
  open,
  onOpenChange,
}: CreateTestimonialModalProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveModal
        title="Create Testimonial"
        open={open}
        onOpenChange={onOpenChange}
      >
        <CreateTestimonialForm
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
