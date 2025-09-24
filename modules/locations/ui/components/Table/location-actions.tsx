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
import { useLocationAction } from "../LocationContext";
import { BooleanType, PageType } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";
import { UpdateLocationModal } from "../UpdateLocationModal";

interface LocationActionsProps {
  id: string;
  isActive: BooleanType;
  children: React.ReactNode;
}

const LocationActions = ({ id, children, isActive }: LocationActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isMutating, setIsMutating } = useLocationAction();

  const locationRemove = trpc.locations.remove.useMutation({
    onSuccess: (data) => {
      toast.success(`Location deleted`);
      utils.locations.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete location: Something went wrong");
    },
  });
  const locationActivate = trpc.locations.activate.useMutation({
    onSuccess: (data) => {
      toast.success(`Location activated`);
      utils.locations.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to activate location: Something went wrong");
    },
  });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Location",
    message: "Are you sure you want to delete this location?",
    variant: "destructive",
  });

  const [ConfirmActivateDialog, confirmActivate] = useConfirm({
    title: "Activate Location",
    message:
      "Activating this location will deactivate the currently active location on this page. Do you want to continue?",
    variant: "default",
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();

    if (!confirmed) return;

    setIsMutating(true);

    locationRemove.mutate(
      { id },
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

  const handleActivate = async () => {
    const confirmed = await confirmActivate();
    if (!confirmed) return;

    setIsMutating(true);

    locationActivate.mutate(
      { id },
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
      <UpdateLocationModal
        onOpenChange={setUpdateModalOpen}
        open={updateModalOpen}
        locationId={id}
      ></UpdateLocationModal>
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
              onCheckedChange={handleActivate}
              disabled={isMutating || isActive === "true"}
              className="w-10 h-5"
            />
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

export default LocationActions;
