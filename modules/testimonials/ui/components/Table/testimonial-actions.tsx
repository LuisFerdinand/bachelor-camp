"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { trpc } from "@/trpc/client";
import {
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTestimonialAction } from "../TestimonialContext";
import { UpdateTestimonialModal } from "../UpdateTestimonialModal";
import { BooleanType, PageType } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";

interface TestimonialActionsProps {
  id: string;
  isShown: BooleanType;
  children: React.ReactNode;
}

const TestimonialActions = ({
  id,
  children,
  isShown,
}: TestimonialActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isMutating, setIsMutating } = useTestimonialAction();

  const testimonialRemove = trpc.testimonials.remove.useMutation({
    onSuccess: (data) => {
      toast.success(`Testimonial deleted`);
      utils.testimonials.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete testimonial: Something went wrong");
    },
  });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Testimonial",
    message: "Are you sure you want to delete this testimonial?",
    variant: "destructive",
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();

    if (!confirmed) return;

    setIsMutating(true);

    testimonialRemove.mutate(
      { testimonialId: id },
      {
        onSettled: () => {
          setIsMutating(false);
        },
      }
    );
  };

  const handleOpen = () => {
    router.push(`${pathname}/${id}`);
  };

  const testimonialToggleShown = trpc.testimonials.setShown.useMutation({
    onSuccess: () => {
      toast.success(
        isShown === "true"
          ? "Testimonial is now hidden"
          : "Testimonial is now visible"
      );
      utils.testimonials.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to update testimonial visibility");
    },
  });

  const [ConfirmToggleShownDialog, confirmToggleShown] = useConfirm({
    title: isShown === "true" ? "Hide Testimonial" : "Show Testimonial",
    message:
      isShown === "true"
        ? "Hiding this testimonial will remove it from the website. Continue?"
        : "Showing this testimonial will make it visible on the website. Continue?",
    variant: "default",
  });

  const handleToggleShown = async () => {
    const confirmed = await confirmToggleShown();
    if (!confirmed) return;

    setIsMutating(true);
    testimonialToggleShown.mutate(
      { id, shown: isShown !== "true" }, // toggle state
      {
        onSettled: () => setIsMutating(false),
      }
    );
  };

  return (
    <div className="flex justify-end">
      <ConfirmDeleteDialog></ConfirmDeleteDialog>
      <ConfirmToggleShownDialog></ConfirmToggleShownDialog>
      <UpdateTestimonialModal
        onOpenChange={setUpdateModalOpen}
        open={updateModalOpen}
        testimonialId={id}
      ></UpdateTestimonialModal>
      <DropdownMenu
        modal={false}
        open={dropdownOpen}
        onOpenChange={(open) => {
          setDropdownOpen(open);
        }}
      >
        <DropdownMenuTrigger asChild>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px] "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpen();
            }}
            // disabled={isMutating}
            disabled
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2"></ExternalLinkIcon>
            <p className="leading-none">View Details</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>

          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-sm font-medium">
              {isShown === "true" ? "Set to Hidden" : "Set to Shown"}
            </span>
            <Switch
              checked={isShown === "true"}
              onCheckedChange={handleToggleShown}
              disabled={isMutating}
              className="w-10 h-5"
            />
          </div>

          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUpdateModalOpen(true);
            }}
            disabled={isMutating}
          >
            <PencilIcon className="size-4 mr-2 stroke-2"></PencilIcon>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-700 focus:text-red-700 font-medium p-[10px] bg-red-100 hover:bg-red-100 leading-none"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isMutating}
          >
            <TrashIcon className="size-4 mr-2 stroke-2"></TrashIcon>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TestimonialActions;
