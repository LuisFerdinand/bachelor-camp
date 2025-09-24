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
import { BooleanType, PageType } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";
import { useStatisticAction } from "../StatisticContext";
import { UpdateStatisticModal } from "../UpdateStatisticModal";

interface StatisticActionsProps {
  id: string;
  isActive: BooleanType;
  order: number;
  children: React.ReactNode;
}

const StatisticActions = ({
  id,
  children,
  isActive,
  order,
}: StatisticActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isMutating, setIsMutating } = useStatisticAction();

  const statisticRemove = trpc.statistics.remove.useMutation({
    onSuccess: () => {
      toast.success(`Statistic deleted`);
      utils.statistics.getFiltered.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete statistic: Something went wrong");
    },
  });

  const [ConfirmDeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Statistic",
    message: "Are you sure you want to delete this statistic?",
    variant: "destructive",
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();

    if (!confirmed) return;

    setIsMutating(true);

    statisticRemove.mutate(
      { statisticId: id },
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

  const updateStatisticMutation =
    trpc.statistics.updateActiveAndOrder.useMutation({
      onSuccess: () => {
        toast.success("Statistic updated");
        utils.statistics.getFiltered.invalidate();
        utils.statistics.getMaxOrder.invalidate();
        setIsMutating(false);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to update statistic");
        setIsMutating(false);
      },
    });

  const handleActivateToggle = (checked: boolean) => {
    setIsMutating(true);
    updateStatisticMutation.mutate({
      statisticId: id,
      action: "toggleActive",
      activate: checked,
    });
    utils.statistics.getMaxOrder.invalidate();
  };

  const handleOrderChange = (direction: "up" | "down") => {
    setIsMutating(true);
    updateStatisticMutation.mutate({ statisticId: id, action: direction });
  };

  const maxOrderQuery = trpc.statistics.getMaxOrder.useQuery();
  const maxOrder = maxOrderQuery.data ?? 0;

  const disableUp = isMutating || isActive !== "true" || order === 1;
  const disableDown = isMutating || isActive !== "true" || order === maxOrder;

  return (
    <div className="flex justify-end">
      <ConfirmDeleteDialog></ConfirmDeleteDialog>
      <UpdateStatisticModal
        onOpenChange={setUpdateModalOpen}
        open={updateModalOpen}
        statisticId={id}
      ></UpdateStatisticModal>
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

export default StatisticActions;
