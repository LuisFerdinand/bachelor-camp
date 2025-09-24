"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useBannerAction } from "./BannerContext";
import { bannerUpdateSchema } from "@/db/schema";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UpdateBannerFormProps {
  bannerId: string;
  onCancel?: () => void;
  onSuccess?: (bannerId: string) => void;
  open?: boolean;
}

export const UpdateBannerForm = (props: UpdateBannerFormProps) => {
  return (
    <Suspense fallback={<UpdateBannerFormSkeleton></UpdateBannerFormSkeleton>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateBannerFormSuspense {...props}></UpdateBannerFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateBannerFormSkeleton = () => {
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

const UpdateBannerFormSuspense = ({
  bannerId,
  onCancel,
  onSuccess,
  open,
}: UpdateBannerFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isMutating, setIsMutating } = useBannerAction();

  const [banner] = trpc.banners.getOneProtected.useSuspenseQuery({
    id: bannerId,
  });

  const form = useForm<z.infer<typeof bannerUpdateSchema>>({
    resolver: zodResolver(bannerUpdateSchema),
    values: {
      type: banner.type,
      headline: banner.headline,
      subheadline: banner.subheadline ?? "",
      badgeText: banner.badgeText ?? "",
      ctas: banner.ctas ?? [],
    },
    mode: "onChange",
  });
  const [showBadge, setShowBadge] = useState(banner.badgeText ? true : false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "ctas" });

  const isModified =
    isDirty || // form field changed
    selectedFile !== null || // new logo selected
    (banner.mediaUrl && !previewUrl); // original logo removed

  const updateBanner = trpc.banners.update.useMutation();

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
    if (banner.mediaUrl && !previewUrl) {
      setPreviewUrl(banner.mediaUrl);
      setSelectedFile(null); // Ensure selectedFile is null when loading existing media
    }
    setShowBadge(!!banner.badgeText);

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [banner.mediaUrl]);

  const onSubmit = async (values: z.infer<typeof bannerUpdateSchema>) => {
    const toastId = toast.loading("Updating banner...");
    setIsMutating(true);

    try {
      if (!previewUrl) {
        if (banner.mediaKey && banner.mediaUrl) {
          const res = await fetch(`/api/file/banners/${bannerId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("Banner media removed!", { id: toastId });
        } else if (banner.mediaUrl && !banner.mediaKey) {
          await updateBanner.mutateAsync({
            id: bannerId,
            mediaUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading banner media...", { id: toastId });

        const res = await uploadFiles("bannerMediaUploader", {
          files: [selectedFile],
          input: { bannerId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload media.");

        await updateBanner.mutateAsync({
          id: bannerId,
          mediaUrl: uploadedFile.ufsUrl,
          mediaKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedBanner = await updateBanner.mutateAsync({
        id: bannerId,
        ...values,
        badgeText: showBadge ? values.badgeText : "",
      });

      form.reset(values); // ✅ reset dirty state

      await utils.banners.getFiltered.invalidate();
      await utils.banners.getOneProtected.invalidate({ id: bannerId });

      toast.success("Banner updated successfully!", { id: toastId });
      onSuccess?.(bannerId);
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
                    Update the main content of your banner
                  </p>
                </div>

                {/* Headline */}
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Headline</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter compelling headline"
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subheadline */}
                <FormField
                  control={form.control}
                  name="subheadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Subheadline
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter supportive subheadline"
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 min-h-[80px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Page Type */}
                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`font-semibold ${banner.isActive === "true" && "text-muted-foreground"}`}
                      >
                        Page
                      </FormLabel>
                      <FormControl>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={
                                    isMutating || banner.isActive === "true"
                                  }
                                >
                                  <SelectTrigger
                                    disabled={
                                      isMutating || banner.isActive === "true"
                                    }
                                    className="h-11 border-muted-foreground/50"
                                  >
                                    <SelectValue placeholder="Select page" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {PAGE_TYPES.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        <span>
                                          {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </TooltipTrigger>
                            {banner.isActive === "true" && (
                              <TooltipContent>
                                <p>
                                  You cannot change page type while banner is
                                  active
                                </p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <GradientSeparator />

              {/* Badge Section (with Switch same as Create form) */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Tag className="size-5" /> Badge Settings
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-lg border border-muted-foreground">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={showBadge}
                          onCheckedChange={(val) => {
                            setShowBadge(val);
                            if (!val) setValue("badgeText", "");
                          }}
                          disabled={isMutating}
                        />

                        <FormLabel className="font-medium text-base">
                          Enable Badge
                        </FormLabel>
                      </div>
                    </div>
                    {showBadge && (
                      <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                        <FormField
                          control={control}
                          name="badgeText"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className="font-medium">
                                Badge Text
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-11 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <GradientSeparator />

              {/* CTA Buttons Section (reuse useFieldArray like Create form) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Call-to-Action Buttons
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add up to 3 action buttons for your banner
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    {fields.length}/3
                  </div>
                </div>

                {fields.length === 0 && (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                      <Plus className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No CTA buttons added yet
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        append({ ctaText: "", ctaLink: "", isShown: true })
                      }
                      disabled={isMutating}
                      className="border-muted-foreground/50"
                    >
                      <Plus className="size-4 mr-2" />
                      Add First CTA Button
                    </Button>
                  </div>
                )}
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary leading-none">
                              {index + 1}.
                            </span>
                          </div>
                          <p className="font-medium">CTA Button {index + 1}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FormField
                            control={control}
                            name={`ctas.${index}.isShown`}
                            render={({ field }) => (
                              <FormItem className="flex items-center space-y-0 border border-black p-1 rounded-full">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isMutating}
                                    className="scale-75"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {field.value ? (
                                    <span className="flex items-center  text-green-600">
                                      <Eye className="size-4" />
                                      <p className="leading-none font-semibold text-xs">
                                        Visible
                                      </p>
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-muted-foreground">
                                      <EyeOff className="size-4" />
                                      <p className="leading-none font-semibold text-xs">
                                        Hidden
                                      </p>
                                    </span>
                                  )}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
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
                          name={`ctas.${index}.ctaText`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Button Text</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., Get Started, Learn More"
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`ctas.${index}.ctaLink`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Button Link
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="https://example.com or /path"
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage></FormMessage>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {fields.length > 0 && fields.length < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({ ctaText: "", ctaLink: "", isShown: true })
                    }
                    disabled={isMutating}
                    className="w-full border-muted-foreground/50 border-dashed h-11"
                  >
                    <Plus className="size-4 mr-2" /> Add Another CTA Button (
                    {fields.length}/3)
                  </Button>
                )}
              </div>

              <GradientSeparator />

              {/* Media Upload (same as Create form but preload with banner.mediaUrl) */}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Banner Media
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image or graphic for your banner
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
                {isMutating ? "Updating..." : "Update Banner"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
