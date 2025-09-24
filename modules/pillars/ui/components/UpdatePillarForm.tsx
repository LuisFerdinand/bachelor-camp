"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { usePillarAction } from "./PillarContext";
import { pillarUpdateSchema } from "@/db/schema";
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

interface UpdatePillarFormProps {
  pillarId: string;
  onCancel?: () => void;
  onSuccess?: (pillarId: string) => void;
  open?: boolean;
}

export const UpdatePillarForm = (props: UpdatePillarFormProps) => {
  return (
    <Suspense fallback={<UpdatePillarFormSkeleton></UpdatePillarFormSkeleton>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdatePillarFormSuspense {...props}></UpdatePillarFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdatePillarFormSkeleton = () => {
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

const UpdatePillarFormSuspense = ({
  pillarId,
  onCancel,
  onSuccess,
  open,
}: UpdatePillarFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing pillar
  const [pillar] = trpc.pillars.getOneProtected.useSuspenseQuery({
    id: pillarId,
  });

  const form = useForm<z.infer<typeof pillarUpdateSchema>>({
    resolver: zodResolver(pillarUpdateSchema),
    values: {
      title: pillar.title,
      subtitle: pillar.subtitle ?? "",
      ctaText: pillar.ctaText ?? "",
      ctaLink: pillar.ctaLink ?? "",
      features: pillar.features ?? [],
      isActive: pillar.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const isModified =
    formState.isDirty ||
    selectedFile !== null ||
    (pillar.imageUrl && !previewUrl);

  const updatePillar = trpc.pillars.update.useMutation();

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
    if (pillar.imageUrl && !previewUrl) {
      setPreviewUrl(pillar.imageUrl);
      setSelectedFile(null);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [pillar.imageUrl]);

  const onSubmit = async (values: z.infer<typeof pillarUpdateSchema>) => {
    const toastId = toast.loading("Updating pillar...");
    setIsMutating(true);

    try {
      if (!previewUrl) {
        if (pillar.imageKey && pillar.imageUrl) {
          const res = await fetch(`/api/file/pillars/${pillarId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("Pillar image removed!", { id: toastId });
        } else if (pillar.imageUrl && !pillar.imageKey) {
          await updatePillar.mutateAsync({
            id: pillarId,
            imageUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading pillar image...", { id: toastId });

        const res = await uploadFiles("pillarImageUploader", {
          files: [selectedFile],
          input: { pillarId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updatePillar.mutateAsync({
          id: pillarId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedPillar = await updatePillar.mutateAsync({
        id: pillarId,
        ...values,
      });

      form.reset(values);

      await utils.pillars.getFiltered.invalidate();
      await utils.pillars.getOneProtected.invalidate({ id: pillarId });
      toast.success("Pillar updated successfully!", { id: toastId });
      onSuccess?.(pillarId);
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
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={isMutating} />
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
                            Active Pillar
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
                                  ? "Deactivating will hide this pillar from the home page."
                                  : "Activating will make this pillar visible on the home page."}
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

              {/* Features */}
              {/* same features block as create form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Features
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add up to 5 features for your pillar
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    {fields.length}/5
                  </div>
                </div>
                {fields.length === 0 && (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                      <Plus className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No features added yet
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ text: "", iconUrl: "" })}
                      disabled={isMutating}
                      className="border-muted-foreground/50"
                    >
                      <Plus className="size-4 mr-2" />
                      Add First Feature
                    </Button>
                  </div>
                )}

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary leading-none">
                              {index + 1}.
                            </span>
                          </div>
                          <p className="font-medium">Feature {index + 1}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => remove(index)}
                            disabled={isMutating}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name={`features.${index}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Feature Text
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Comfortable Accommodation"
                                  {...field}
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`features.${index}.iconUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Icon Url
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    placeholder="You can get this from 'https://lucide.dev/icons/'"
                                    {...field}
                                    disabled={isMutating}
                                    className="border-muted-foreground/50 h-10 bg-background"
                                  />
                                  {/* Icon Preview */}
                                  {field.value && (
                                    <img
                                      src={field.value}
                                      alt="icon preview"
                                      className="w-8 h-8 object-contain border rounded p-1 bg-white"
                                    />
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {fields.length > 0 && fields.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ text: "", iconUrl: "" })}
                    disabled={isMutating}
                    className="w-full border-muted-foreground/50 border-dashed h-11"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Another Feature ({fields.length}/5)
                  </Button>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Call To Action</h3>
                <FormField
                  control={form.control}
                  name="ctaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Learn More"
                          {...field}
                          disabled={isMutating}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          disabled={isMutating}
                        />
                      </FormControl>
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
                    Pillar Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to represent this pillar on the homepage.
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
                        <p className="font-medium">Upload banner media</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 2MB
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];

                            // 🔍 Validate file size (max 2MB)
                            if (file.size > 2 * 1024 * 1024) {
                              toast.error("File size exceeds 2MB.");
                              return;
                            }

                            const validTypes = [
                              "image/jpeg",
                              "image/png",
                              "image/svg+xml",
                            ];
                            if (!validTypes.includes(file.type)) {
                              toast.error(
                                "Invalid file type. Only JPG, PNG, or SVG allowed."
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
                              Change Media
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
                              Remove Media
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
                            <ImageIcon className="size-4 mr-2" /> Upload Media
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
                {isMutating ? "Updating..." : "Update Pillar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
