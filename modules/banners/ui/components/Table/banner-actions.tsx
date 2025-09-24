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
import { useBannerAction } from "../BannerContext";
import { UpdateBannerModal } from "../UpdateBannerModal";
import { BooleanType, PageType } from "@/db/schema/enums";

interface BannerActionsProps {
  id: string;
  type: PageType;
  isActive: BooleanType;
  children: React.ReactNode;
}

const BannerActions = ({
  id,
  type,
  children,
  isActive,
}: BannerActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isMutating, setIsMutating } = useBannerAction();

  const bannerRemove = trpc.banners.remove.useMutation({
    onSuccess: (data) => {
      toast.success(`Banner deleted`);
      utils.banners.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete banner: Something went wrong");
    },
  });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Banner",
    message: "Are you sure you want to delete this banner?",
    variant: "destructive",
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();

    if (!confirmed) return;

    setIsMutating(true);

    bannerRemove.mutate(
      { bannerId: id },
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

  const bannerActivate = trpc.banners.activate.useMutation({
    onSuccess: () => {
      toast.success("Banner activated");
      utils.banners.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to activate banner");
    },
  });

  const [ConfirmActivateDialog, confirmActivate] = useConfirm({
    title: "Activate Banner",
    message:
      "Activating this banner will deactivate the currently active banner on this page. Do you want to continue?",
    variant: "default",
  });

  const handleActivate = async () => {
    const confirmed = await confirmActivate();
    if (!confirmed) return;

    setIsMutating(true);

    bannerActivate.mutate(
      { id, type },
      {
        onSettled: () => {
          setIsMutating(false);
        },
      }
    );
  };

  return (
    <div className="flex justify-end">
      <ConfirmDeleteDialog></ConfirmDeleteDialog>
      <ConfirmActivateDialog></ConfirmActivateDialog>
      <UpdateBannerModal
        onOpenChange={setUpdateModalOpen}
        open={updateModalOpen}
        bannerId={id}
      ></UpdateBannerModal>
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

          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleActivate();
            }}
            disabled={isMutating || isActive === "true"}
          >
            <CheckCircleIcon className="size-4 mr-2 stroke-2 text-green-600" />
            Activate Banner
          </DropdownMenuItem>

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
            disabled={isMutating || isActive === "true"} //  Disable if active
          >
            <TrashIcon className="size-4 mr-2 stroke-2"></TrashIcon>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BannerActions;
