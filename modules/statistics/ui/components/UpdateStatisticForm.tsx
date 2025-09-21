"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useStatisticAction } from "./StatisticContext";
import { statisticUpdateSchema } from "@/db/schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredLabel } from "@/components/RequiredLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Eye,
  EyeOff,
  ImageIcon,
  InfoIcon,
  Plus,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface UpdateStatisticFormProps {
  statisticId: string;
  onCancel?: () => void;
  onSuccess?: (statisticId: string) => void;
  open?: boolean;
}

export const UpdateStatisticForm = (props: UpdateStatisticFormProps) => {
  return (
    <Suspense
      fallback={<UpdateStatisticFormSkeleton></UpdateStatisticFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateStatisticFormSuspense {...props}></UpdateStatisticFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateStatisticFormSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32"></Skeleton>
          <Skeleton className="h-4 w-40"></Skeleton>
        </div>
        <Skeleton className="h-9 w-24"></Skeleton>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="space-y-8 lg:col-span-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24"></Skeleton>
            <Skeleton className="h-[220px] w-full"></Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20"></Skeleton>
            <Skeleton className="h-[84px] w-[153px]"></Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 lg:col-span-2">
          <div className="flex flex-col gap-4 bg-[#f9f9f9] rounded-xl overflow-hidden">
            <Skeleton className="aspect-video"></Skeleton>
            <div className="px-4 py-4 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20"></Skeleton>
                <Skeleton className="h-5 w-full"></Skeleton>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24"></Skeleton>
                <Skeleton className="h-5 w-32"></Skeleton>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20"></Skeleton>
            <Skeleton className="h-10 w-full"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateStatisticFormSuspense = ({
  statisticId,
  onCancel,
  onSuccess,
  open,
}: UpdateStatisticFormProps) => {
  const utils = trpc.useUtils();
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing statistic
  const [statistic] = trpc.statistics.getOneProtected.useSuspenseQuery({
    id: statisticId,
  });

  const form = useForm<z.infer<typeof statisticUpdateSchema>>({
    resolver: zodResolver(statisticUpdateSchema),
    values: {
      label: statistic.label,
      value: statistic.value ?? "",
      iconUrl: statistic.iconUrl ?? "",
      description: statistic.description ?? "",
      isActive: statistic.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;

  const isModified = formState.isDirty;

  const updateStatistic = trpc.statistics.update.useMutation();

  const onSubmit = async (values: z.infer<typeof statisticUpdateSchema>) => {
    const toastId = toast.loading("Updating statistic...");
    setIsMutating(true);

    try {
      const updatedStatistic = await updateStatistic.mutateAsync({
        id: statisticId,
        ...values,
      });

      form.reset(values);

      await utils.statistics.getFiltered.invalidate();
      await utils.statistics.getOneProtected.invalidate({ id: statisticId });
      toast.success("Statistic updated successfully!", { id: toastId });
      onSuccess?.(statisticId);
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <Card className="w-full border-muted-foreground/50 shadow-none pt-4">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure the main content of your statistic
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RequiredLabel>Label</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isMutating} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RequiredLabel>Value</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isMutating} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={isMutating} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Main Icon URL
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Paste icon URL (e.g., from Lucide.dev)"
                            {...field}
                            disabled={isMutating}
                            className="border-muted-foreground/50 h-11"
                          />
                          {field.value && (
                            <img
                              src={field.value}
                              alt="main icon preview"
                              className="w-8 h-8 object-contain border rounded p-1 bg-white"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* isActive Switch */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/40">
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-medium">
                            Active Statistic
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="max-w-xs text-sm"
                              >
                                {field.value === "true"
                                  ? "Deactivating will hide this statistic from the home page."
                                  : "Activating will make this statistic visible on the home page."}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "true"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "true" : "false")
                            }
                            disabled={isMutating}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <GradientSeparator className="my-6" />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  disabled={isMutating}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={isMutating || !isModified}
                className="min-w-[140px]"
              >
                {isMutating ? "Updating..." : "Update Statistic"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
