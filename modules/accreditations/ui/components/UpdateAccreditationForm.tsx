"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAccreditationAction } from "./AccreditationContext";
import { accreditationUpdateSchema } from "@/db/schema";
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
import { PAGE_TYPES } from "@/db/schema/enums";
import { Eye, EyeOff, ImageIcon, Plus, Tag, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface UpdateAccreditationFormProps {
  accreditationId: string;
  onCancel?: () => void;
  onSuccess?: (accreditationId: string) => void;
  open?: boolean;
}

export const UpdateAccreditationForm = (
  props: UpdateAccreditationFormProps
) => {
  return (
    <Suspense
      fallback={
        <UpdateAccreditationFormSkeleton></UpdateAccreditationFormSkeleton>
      }
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateAccreditationFormSuspense
          {...props}
        ></UpdateAccreditationFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateAccreditationFormSkeleton = () => {
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

const UpdateAccreditationFormSuspense = ({
  accreditationId,
  onCancel,
  onSuccess,
  open,
}: UpdateAccreditationFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isMutating, setIsMutating } = useAccreditationAction();

  const [accreditation] = trpc.accreditations.getOneProtected.useSuspenseQuery({
    id: accreditationId,
  });

  const form = useForm<z.infer<typeof accreditationUpdateSchema>>({
    resolver: zodResolver(accreditationUpdateSchema),
    values: {
      title: accreditation.title,
      description: accreditation.description ?? "",
      isActive: accreditation.isActive ?? "false",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = form;

  const isModified =
    isDirty || // form field changed
    selectedFile !== null || // new logo selected
    (accreditation.imageUrl && !previewUrl); // original logo removed

  const updateAccreditation = trpc.accreditations.update.useMutation();

  const handlePreview = (file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  useEffect(() => {
    if (open === false) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      setSelectedFile(null);
      form.reset();
    }
  }, [open]);

  useEffect(() => {
    if (accreditation.imageUrl && !previewUrl) {
      setPreviewUrl(accreditation.imageUrl);
      setSelectedFile(null); // Ensure selectedFile is null when loading existing image
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [accreditation.imageUrl]);

  const onSubmit = async (
    values: z.infer<typeof accreditationUpdateSchema>
  ) => {
    const toastId = toast.loading("Updating accreditation...");
    setIsMutating(true);

    try {
      // Handle image removal if applicable
      const isRemovingImage =
        !selectedFile && !previewUrl && accreditation.imageKey;

      if (isRemovingImage) {
        const res = await fetch(
          `/api/accreditations/${accreditationId}/image`,
          {
            method: "DELETE",
          }
        );
        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        await utils.accreditations.getFiltered.invalidate();
        toast.success("Accreditation updated and image removed!", {
          id: toastId,
        });
        onSuccess?.(accreditationId);
        return;
      }

      const updatedAccreditation = await updateAccreditation.mutateAsync({
        id: accreditationId,
        ...values,
      });

      form.reset(values); // ✅ reset dirty state

      if (selectedFile) {
        toast.loading("Uploading accreditation image...", { id: toastId });

        const res = await uploadFiles("accreditationImageUploader", {
          files: [selectedFile],
          input: { accreditationId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updateAccreditation.mutateAsync({
          id: accreditationId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      await utils.accreditations.getFiltered.invalidate();
      toast.success("Accreditation updated successfully!", { id: toastId });
      onSuccess?.(accreditationId);
    } catch (error: any) {
      toast.error(error.message || "Update failed", { id: toastId });
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <Card className="w-full border-muted-foreground/50 shadow-none pt-4">
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Update the main content of your accreditation
                  </p>
                </div>

                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Title</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter compelling title"
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter supportive description"
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 min-h-[80px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <GradientSeparator />

              {/* Image Upload (same as Create form but preload with accreditation.imageUrl) */}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Accreditation Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image or graphic for your accreditation
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
                        <p className="font-medium">
                          Upload accreditation image
                        </p>
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
                {isMutating ? "Updating..." : "Update Accreditation"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
