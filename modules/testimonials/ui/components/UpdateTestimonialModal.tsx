"use client";

import { ResponsiveModal } from "@/components/ResponsiveModal";
import { UpdateTestimonialForm } from "./UpdateTestimonialForm";
import { useEffect } from "react";

interface UpdateTestimonialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonialId: string;
}

export const UpdateTestimonialModal = ({
  open,
  onOpenChange,
  testimonialId,
}: UpdateTestimonialModalProps) => {
  return (
    <>
      <div>
        <ResponsiveModal
          title="Update Testimonial"
          open={open}
          onOpenChange={onOpenChange}
        >
          <UpdateTestimonialForm
            open={open}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onOpenChange(false);
            }}
            testimonialId={testimonialId}
          />
        </ResponsiveModal>
      </div>
    </>
  );
};
