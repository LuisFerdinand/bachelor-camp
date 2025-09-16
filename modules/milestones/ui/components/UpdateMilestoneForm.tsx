"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMilestoneAction } from "./MilestoneContext";
import { milestoneUpdateSchema } from "@/db/schema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PAGE_TYPES } from "@/db/schema/enums";
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

interface UpdateMilestoneFormProps {
  milestoneId: string;
  onCancel?: () => void;
  onSuccess?: (milestoneId: string) => void;
  open?: boolean;
}

export const UpdateMilestoneForm = (props: UpdateMilestoneFormProps) => {
  return (
    <Suspense
      fallback={<UpdateMilestoneFormSkeleton></UpdateMilestoneFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateMilestoneFormSuspense {...props}></UpdateMilestoneFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateMilestoneFormSkeleton = () => {
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

const UpdateMilestoneFormSuspense = ({
  milestoneId,
  onCancel,
  onSuccess,
  open,
}: UpdateMilestoneFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing milestone
  const [milestone] = trpc.milestones.getOneProtected.useSuspenseQuery({
    id: milestoneId,
  });

  const form = useForm<z.infer<typeof milestoneUpdateSchema>>({
    resolver: zodResolver(milestoneUpdateSchema),
    values: {
      title: milestone.title,
      description: milestone.description ?? "",
      year: milestone.year ?? "",
      isActive: milestone.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;

  const isModified =
    formState.isDirty ||
    selectedFile !== null ||
    (milestone.imageUrl && !previewUrl);

  const updateMilestone = trpc.milestones.update.useMutation();

  const handlePreview = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  useEffect(() => {
    if (open === false) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      setSelectedFile(null);
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (milestone.imageUrl && !previewUrl) {
      setPreviewUrl(milestone.imageUrl);
      setSelectedFile(null);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [milestone.imageUrl]);

  const onSubmit = async (values: z.infer<typeof milestoneUpdateSchema>) => {
    const toastId = toast.loading("Updating milestone...");
    setIsMutating(true);

    try {
      // Handle image removal
      const isRemovingImage =
        !selectedFile && !previewUrl && milestone.imageKey;
      if (isRemovingImage) {
        const res = await fetch(`/api/milestones/${milestoneId}/image`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        await utils.milestones.getFiltered.invalidate();
        toast.success("Milestone updated and image removed!", { id: toastId });
        onSuccess?.(milestoneId);
        return;
      }

      const updatedMilestone = await updateMilestone.mutateAsync({
        id: milestoneId,
        ...values,
      });

      form.reset(values);

      if (selectedFile) {
        toast.loading("Uploading milestone image...", { id: toastId });
        const res = await uploadFiles("milestoneImageUploader", {
          files: [selectedFile],
          input: { milestoneId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updateMilestone.mutateAsync({
          id: milestoneId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      await utils.milestones.getFiltered.invalidate();
      toast.success("Milestone updated successfully!", { id: toastId });
      onSuccess?.(milestoneId);
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
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RequiredLabel>Title</RequiredLabel>
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
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Year</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1900}
                          max={2100}
                          placeholder="Enter year"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value, 10)
                                : undefined
                            )
                          }
                          disabled={isMutating}
                          className="border-muted-foreground/50 h-11"
                        />
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
                            Active Milestone
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
                                  ? "Deactivating will hide this milestone from the home page."
                                  : "Activating will make this milestone visible on the home page."}
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

              <GradientSeparator />

              {/* Image Upload */}
              {/* same upload block as create form but preload previewUrl */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Milestone Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to represent this milestone on the homepage.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 border border-muted-foreground/20">
                  <div className="flex items-start gap-6">
                    {previewUrl ? (
                      <div className="size-20 relative rounded-lg overflow-hidden border-2 border-muted-foreground/20">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="size-20 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                        <ImageIcon className="size-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="font-medium">Upload banner image</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG or JPEG, max 2MB
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];

                            // 🔍 Validate file size (max 2MB)
                            if (file.size > 2 * 1024 * 1024) {
                              toast.error("File size exceeds 2MB.");
                              return;
                            }

                            const validTypes = ["image/jpeg", "image/png"];
                            if (!validTypes.includes(file.type)) {
                              toast.error(
                                "Invalid file type. Only JPG or PNG allowed."
                              );
                              return;
                            }

                            handlePreview(file);
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        {previewUrl ? (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isMutating}
                              className="border-muted-foreground/50"
                            >
                              Change Image
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setPreviewUrl("");
                                setSelectedFile(null);
                                if (fileInputRef.current)
                                  fileInputRef.current.value = "";
                              }}
                              disabled={isMutating}
                            >
                              Remove Image
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isMutating}
                            className="border-muted-foreground/50"
                          >
                            <ImageIcon className="size-4 mr-2" /> Upload Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
                {isMutating ? "Updating..." : "Update Milestone"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
