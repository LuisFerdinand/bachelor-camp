"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UploadButton, uploadFiles } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { UTApi } from "uploadthing/server";
import { testimonialUpdateSchema } from "@/db/schema";
import { StarRatingInput } from "@/components/Inputs/StarRatingInput";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { trpc } from "@/trpc/client";
import { useTestimonialAction } from "./TestimonialContext";
import { RequiredLabel } from "@/components/RequiredLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TESTIMONIAL_SOURCES } from "@/db/schema/enums";
import { MultiSelect } from "@/components/MultiSelect";
import { stringToColor } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface UpdateTestimonialFormProps {
  testimonialId: string;
  onCancel?: () => void;
  onSuccess?: (testimonialId: string) => void;
  open?: boolean;
}

export function UpdateTestimonialForm({
  testimonialId,
  onCancel,
  onSuccess,
  open,
}: UpdateTestimonialFormProps) {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isMutating, setIsMutating } = useTestimonialAction();

  const [{ testimonial, allCategories }] =
    trpc.testimonials.getOneProtected.useSuspenseQuery({
      testimonialId,
    });

  const form = useForm<z.infer<typeof testimonialUpdateSchema>>({
    resolver: zodResolver(testimonialUpdateSchema),
    defaultValues: {
      userId: testimonial.userId,
      role: testimonial.role || "student",
      categories: testimonial.categories || [],
      content: testimonial.content || "",
      isFeatured: testimonial.isFeatured || "false",
      isShown: testimonial.isShown || "false",
      name: testimonial.name || "",
      rating: testimonial.rating,
      source: testimonial.source,
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
    (testimonial.imageUrl && !previewUrl); // original logo removed

  const updateTestimonial = trpc.testimonials.update.useMutation();

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
    if (testimonial.imageUrl && !previewUrl) {
      setPreviewUrl(testimonial.imageUrl);
      setSelectedFile(null); // Ensure selectedFile is null when loading existing image
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [testimonial.imageUrl]);

  const onSubmit = async (values: z.infer<typeof testimonialUpdateSchema>) => {
    const toastId = toast.loading("Updating testimonial...");
    setIsMutating(true);

    try {
      // Handle image removal if applicable
      if (!previewUrl) {
        if (testimonial.imageKey && testimonial.imageUrl) {
          const res = await fetch(`/api/file/testimonials/${testimonialId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("Testimonial image removed!", { id: toastId });
        } else if (testimonial.imageUrl && !testimonial.imageKey) {
          await updateTestimonial.mutateAsync({
            id: testimonialId,
            imageUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading testimonial image...", { id: toastId });

        const res = await uploadFiles("testimonialImageUploader", {
          files: [selectedFile],
          input: { testimonialId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updateTestimonial.mutateAsync({
          id: testimonialId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedTestimonial = await updateTestimonial.mutateAsync({
        id: testimonialId,
        ...values,
      });

      form.reset(values);

      await utils.testimonials.getFiltered.invalidate();
      await utils.testimonials.getOneProtected.invalidate({
        testimonialId,
      });
      toast.success("Testimonial updated successfully!", { id: toastId });
      onSuccess?.(testimonialId);
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
                    Update the main content of this testimonial
                  </p>
                </div>

                {/* Headline */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Name</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter person's name"
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., CEO at Company"
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Source</FormLabel>
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
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            {TESTIMONIAL_SOURCES.map((src) => (
                              <SelectItem key={src} value={src}>
                                {src.charAt(0).toUpperCase() + src.slice(1)}
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
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Content</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write testimonial content..."
                          {...field}
                          disabled={isMutating}
                          className="border-muted-foreground/50 min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Rating: {field.value ?? 0}
                      </FormLabel>
                      <FormControl>
                        <div>
                          <StarRatingInput
                            value={parseFloat(field.value || "0") ?? 0}
                            onChange={(val) => field.onChange(val.toString())}
                            disabled={isMutating}
                          />
                          <input
                            type="range"
                            step="0.1"
                            min="0"
                            max="5"
                            value={field.value ?? 0}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={isMutating}
                            className="w-full accent-yellow-400"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <GradientSeparator />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Categories</FormLabel>
                    <MultiSelect
                      options={allCategories!.map((c) => ({
                        label: c.name,
                        value: c.id,
                        color: stringToColor(c.name, true).text,
                      }))}
                      value={field.value!}
                      onChange={field.onChange}
                      placeholder="Select categories..."
                      disabled={isMutating}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <GradientSeparator />

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Testimonial Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a profile image for this user
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-6 border border-muted-foreground/20">
                  <div className="flex items-start gap-6">
                    {/* {JSON.stringify(previewUrl)} */}
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
                        <p className="font-medium">Upload testimonial image</p>
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
                {isMutating ? "Updating..." : "Update Testimonial"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
