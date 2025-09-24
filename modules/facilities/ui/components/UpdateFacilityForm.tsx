"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useFacilityAction } from "./FacilityContext";
import { facilityUpdateSchema } from "@/db/schema";
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
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  ImageIcon,
  InfoIcon,
  NotebookIcon,
  Plus,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  FACILITY_CATEGORIES,
  FACILITY_STATUSES,
  FACILITY_TYPES,
} from "@/db/schema/enums";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalize } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface UpdateFacilityFormProps {
  facilityId: string;
  onCancel?: () => void;
  onSuccess?: (facilityId: string) => void;
  open?: boolean;
}

export const UpdateFacilityForm = (props: UpdateFacilityFormProps) => {
  return (
    <Suspense
      fallback={<UpdateFacilityFormSkeleton></UpdateFacilityFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateFacilityFormSuspense {...props}></UpdateFacilityFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateFacilityFormSkeleton = () => {
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

const UpdateFacilityFormSuspense = ({
  facilityId,
  onCancel,
  onSuccess,
  open,
}: UpdateFacilityFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing facility
  const [facility] = trpc.facilities.getOneProtected.useSuspenseQuery({
    id: facilityId,
  });

  const form = useForm<z.infer<typeof facilityUpdateSchema>>({
    resolver: zodResolver(facilityUpdateSchema),
    values: {
      name: facility.name,
      type: facility.type ?? "camp",
      status: facility.status ?? "active",
      description: facility.description ?? "",
      iconUrl: facility.iconUrl ?? "",
      isFeatured: facility.isFeatured ?? "false",
      category: facility.category ?? "general",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;

  const isModified =
    formState.isDirty ||
    selectedFile !== null ||
    (facility.imageUrl && !previewUrl);

  const updateFacility = trpc.facilities.update.useMutation();

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
    if (facility.imageUrl && !previewUrl) {
      setPreviewUrl(facility.imageUrl);
      setSelectedFile(null);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [facility.imageUrl]);

  const onSubmit = async (values: z.infer<typeof facilityUpdateSchema>) => {
    const toastId = toast.loading("Updating facility...");
    setIsMutating(true);

    try {
      if (!previewUrl) {
        if (facility.imageKey && facility.imageUrl) {
          const res = await fetch(`/api/file/facilities/${facilityId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("Facility image removed!", { id: toastId });
        } else if (facility.imageUrl && !facility.imageKey) {
          await updateFacility.mutateAsync({
            id: facilityId,
            imageUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading facility image...", { id: toastId });

        const res = await uploadFiles("facilityImageUploader", {
          files: [selectedFile],
          input: { facilityId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updateFacility.mutateAsync({
          id: facilityId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedFacility = await updateFacility.mutateAsync({
        id: facilityId,
        ...values,
      });

      form.reset(values);

      await utils.facilities.getFiltered.invalidate();
      await utils.facilities.getOneProtected.invalidate({ id: facilityId });
      toast.success("Facility updated successfully!", { id: toastId });
      onSuccess?.(facilityId);
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <RequiredLabel>Name</RequiredLabel>
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

                {/* isFeatured Switch */}
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/40">
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-medium">
                            Featured
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
                                  ? "Deactivating will hide this facility from the home page."
                                  : "Activating will make this facility visible on the home page."}
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

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isMutating}
                        >
                          <SelectTrigger
                            disabled={isMutating}
                            className="border-muted-foreground/50 h-11"
                          >
                            <SelectValue placeholder="Select ty[e" />
                          </SelectTrigger>
                          <SelectContent>
                            {FACILITY_TYPES.map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                onSelect={() => field.onChange(type)}
                              >
                                <span>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isMutating}
                        >
                          <SelectTrigger
                            disabled={isMutating}
                            className="border-muted-foreground/50 h-11"
                          >
                            <SelectValue placeholder="Select ty[e" />
                          </SelectTrigger>
                          <SelectContent>
                            {FACILITY_STATUSES.map((status) => (
                              <SelectItem
                                key={status}
                                value={status}
                                onSelect={() => field.onChange(status)}
                              >
                                <span>
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => {
                    const selectedCategory = FACILITY_CATEGORIES.find(
                      (category) => category === field.value
                    );
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-medium text-foreground">
                          <RequiredLabel>Category</RequiredLabel>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={`w-full h-11 justify-between border-muted-foreground/50 ${selectedCategory ? "text-black" : "text-muted-foreground"} `}
                                disabled={isMutating}
                              >
                                <div className="flex items-center gap-2">
                                  <NotebookIcon className="h-4 w-4" />
                                  <p className="leading-none">
                                    {capitalize(selectedCategory!) ||
                                      "Select category..."}
                                  </p>
                                </div>
                                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
                            <Command>
                              <CommandInput
                                placeholder="Search category..."
                                className="h-9"
                              />
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {FACILITY_CATEGORIES.map((category, index) => (
                                  <CommandItem
                                    key={category}
                                    value={category}
                                    onSelect={() => field.onChange(category)}
                                  >
                                    {capitalize(category)}
                                    {field.value === category && (
                                      <Check className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="iconUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Icon URL</FormLabel>
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
              </div>

              <GradientSeparator />

              {/* Image Upload */}
              {/* same upload block as create form but preload previewUrl */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Facility Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image to represent this facility on the homepage.
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
                                "Invalid file type. Only JPG, or PNG allowed."
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
                {isMutating ? "Updating..." : "Update Facility"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
