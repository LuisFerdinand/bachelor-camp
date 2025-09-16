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
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccreditationAction } from "../AccreditationContext";
import { BooleanType, PageType } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";
import { UpdateAccreditationModal } from "../UpdateAccreditationModal";

interface AccreditationActionsProps {
  id: string;
  isActive: BooleanType;
  order: number;
  children: React.ReactNode;
}

const AccreditationActions = ({
  id,
  children,
  isActive,
  order,
}: AccreditationActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isMutating, setIsMutating } = useAccreditationAction();

  const accreditationRemove = trpc.accreditations.remove.useMutation({
    onSuccess: (data) => {
      toast.success(`Accreditation deleted`);
      utils.accreditations.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete accreditation: Something went wrong");
    },
  });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Accreditation",
    message: "Are you sure you want to delete this accreditation?",
    variant: "destructive",
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();

    if (!confirmed) return;

    setIsMutating(true);

    accreditationRemove.mutate(
      { accreditationId: id },
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

  const updateAccreditationMutation =
    trpc.accreditations.updateActiveAndOrder.useMutation({
      onSuccess: () => {
        toast.success("Accreditation updated");
        utils.accreditations.getFiltered.invalidate();
        utils.accreditations.getMaxOrder.invalidate();
        setIsMutating(false);
      },
      onError: (err) => {
        toast.error(err.message || "Failed to update accreditation");
        setIsMutating(false);
      },
    });

  const handleActivateToggle = (checked: boolean) => {
    setIsMutating(true);
    updateAccreditationMutation.mutate({
      accreditationId: id,
      action: "toggleActive",
      activate: checked,
    });
    utils.accreditations.getMaxOrder.invalidate();
  };

  const handleOrderChange = (direction: "up" | "down") => {
    setIsMutating(true);
    updateAccreditationMutation.mutate({
      accreditationId: id,
      action: direction,
    });
  };

  const maxOrderQuery = trpc.accreditations.getMaxOrder.useQuery();
  const maxOrder = maxOrderQuery.data ?? 0;

  const disableUp = isMutating || isActive !== "true" || order === 1;
  const disableDown = isMutating || isActive !== "true" || order === maxOrder;

  return (
    <div className="flex justify-end">
      <ConfirmDeleteDialog></ConfirmDeleteDialog>
      <UpdateAccreditationModal
        onOpenChange={setUpdateModalOpen}
        open={updateModalOpen}
        accreditationId={id}
      ></UpdateAccreditationModal>
      <DropdownMenu
        modal={false}
        open={dropdownOpen}
        onOpenChange={(open) => setDropdownOpen(open)}
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

        <DropdownMenuContent align="end" className="w-56 space-y-1">
          {/* View Details */}
          <DropdownMenuItem
            className="font-medium p-2 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOpen();
            }}
            disabled
          >
            <ExternalLinkIcon className="w-4 h-4 stroke-2" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Active Toggle */}
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-sm font-medium">Active</span>
            <Switch
              checked={isActive === "true"}
              onCheckedChange={handleActivateToggle}
              disabled={isMutating}
              className="w-10 h-5"
            />
          </div>

          <DropdownMenuSeparator />

          {/* Order Controls */}
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-sm font-medium">Order</span>
            <div className="flex gap-2">
              <button
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOrderChange("up");
                }}
                disabled={disableUp}
              >
                <ArrowUpIcon className="w-4 h-4 stroke-2" />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOrderChange("down");
                }}
                disabled={disableDown}
              >
                <ArrowDownIcon className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Edit */}
          <DropdownMenuItem
            className="font-medium p-2 flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setUpdateModalOpen(true);
            }}
            disabled={isMutating}
          >
            <PencilIcon className="w-4 h-4 stroke-2" />
            <span>Edit</span>
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem
            className="text-red-700 font-medium p-2 flex items-center gap-2 bg-red-100 hover:bg-red-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isMutating}
          >
            <TrashIcon className="w-4 h-4 stroke-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccreditationActions;
