"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, Trash2, Plus, Eye, EyeOff, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { MultiSelect } from "@/components/MultiSelect";
import { RequiredLabel } from "@/components/RequiredLabel";
import { bannerCreateSchema } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_TYPES } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";

interface CreateBannerFormProps {
  onCancel?: () => void;
  onSuccess?: (bannerId: string) => void;
  open: boolean;
}

export const CreateBannerForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateBannerFormProps) => {
  const utils = trpc.useUtils();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preview of uploaded image
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // Selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Created banner ID
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!open) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      setSelectedFile(null);
      form.reset();
      setShowBadge(false);
    }
  }, [open]);

  const form = useForm<z.infer<typeof bannerCreateSchema>>({
    resolver: zodResolver(bannerCreateSchema),
    defaultValues: {
      headline: "",
      subheadline: "",
      type: "Home",
      badgeText: "",
      ctas: [],
    },
  });

  const { control, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({ control, name: "ctas" });

  const bannerCreate = trpc.banners.create.useMutation();

  const handlePreview = (files: File[]) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setSelectedFile(files[0] ?? null);
  };

  const onSubmit = async (values: z.infer<typeof bannerCreateSchema>) => {
    const toastId = toast.loading("Creating banner...");
    setIsSubmitting(true);

    try {
      const data = await bannerCreate.mutateAsync({
        type: values.type,
        headline: values.headline,
        subheadline: values.subheadline,
        badgeText: showBadge ? values.badgeText : "",
        ctas: values.ctas,
      });

      // If a media is selected, upload it
      if (selectedFile) {
        toast.loading("Uploading banner media...", { id: toastId });

        const res = await uploadFiles("bannerMediaUploader", {
          files: [selectedFile],
          input: { bannerId: data.id },
        });

        console.log("Upload response:", res);

        const uploadedFile = res[0];
        if (!uploadedFile) {
          throw new Error("Failed to upload media.");
        }
      }

      utils.banners.getFiltered.invalidate();
      toast.success("Banner created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred during banner creation.",
        {
          id: toastId,
        }
      );
      console.log({ error });
    } finally {
      setIsSubmitting(false);
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
                  <h3 className="text-lg font-semibold text-foreground">
                    Basic Information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure the main content of your banner
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
                          disabled={isSubmitting}
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
                          placeholder="Enter supporting description"
                          {...field}
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 min-h-[80px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Page Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Page</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger
                            disabled={isSubmitting}
                            className="border-muted-foreground/50 h-11"
                          >
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                          <SelectContent>
                            {PAGE_TYPES.map((type) => (
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
              </div>

              <GradientSeparator />

              {/* Badge Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Tag className="size-5" />
                    Badge Settings
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add an optional promotional badge to your banner
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 border border-muted-foreground/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={showBadge}
                        onCheckedChange={(val) => {
                          setShowBadge(val);
                          if (!val) {
                            setValue("badgeText", "");
                          }
                        }}
                        disabled={isSubmitting}
                      />
                      <div>
                        <FormLabel className="font-medium text-base">
                          Enable Badge
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Show a promotional badge on the banner
                        </p>
                      </div>
                    </div>
                  </div>

                  {showBadge && (
                    <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                      <FormField
                        control={form.control}
                        name="badgeText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">
                              Badge Text
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., New, Limited Time, Sale"
                                {...field}
                                disabled={isSubmitting}
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

              <GradientSeparator />

              {/* CTA Buttons Section */}
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
                      disabled={isSubmitting}
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
                      <div className="flex items-center justify-between">
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
                                    disabled={isSubmitting}
                                    className="scale-75"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {field.value ? (
                                    <span className="flex items-center  text-green-600">
                                      <Eye className="size-5" />
                                      <p className="leading-none font-semibold text-xs">
                                        Visible
                                      </p>
                                    </span>
                                  ) : (
                                    <span className="flex items-center text-muted-foreground">
                                      <EyeOff className="size-4" />
                                      <p className="leading-none font-semibold">
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
                            variant="outline"
                            size="sm"
                            onClick={() => remove(index)}
                            disabled={isSubmitting}
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
                              <FormLabel className="text-sm font-medium">
                                Button Text
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Get Started, Learn More"
                                  {...field}
                                  disabled={isSubmitting}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
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
                                  placeholder="https://example.com or /path"
                                  {...field}
                                  disabled={isSubmitting}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
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
                    disabled={isSubmitting}
                    className="w-full border-muted-foreground/50 border-dashed h-11"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Another CTA Button ({fields.length}/3)
                  </Button>
                )}
              </div>

              <GradientSeparator />

              {/* Media Upload & Preview */}
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
                    {previewUrls.length > 0 ? (
                      <div className="size-20 relative rounded-lg overflow-hidden border-2 border-muted-foreground/20">
                        <Image
                          src={previewUrls[0]}
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

                            handlePreview([file]);
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        {previewUrls.length > 0 ? (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isSubmitting}
                              className="border-muted-foreground/50"
                            >
                              Change Media
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setPreviewUrls([]);
                                setSelectedFile(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              disabled={isSubmitting}
                            >
                              Remove Media
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isSubmitting}
                            className="border-muted-foreground/50"
                          >
                            <ImageIcon className="size-4 mr-2" />
                            Upload Media
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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? "Creating..." : "Create Banner"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
