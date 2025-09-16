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
import { testimonialCreateSchema } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_TYPES, TESTIMONIAL_SOURCES } from "@/db/schema/enums";
import { Switch } from "@/components/ui/switch";
import { stringToColor } from "@/lib/utils";
import { StarRatingInput } from "@/components/Inputs/StarRatingInput";

interface CreateTestimonialFormProps {
  onCancel?: () => void;
  onSuccess?: (testimonialId: string) => void;
  open: boolean;
}

export const CreateTestimonialForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateTestimonialFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preview of uploaded image
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // Selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = trpc.testimonials.getAllCategories.useQuery();

  useEffect(() => {
    if (!open) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      setSelectedFile(null);
      form.reset();
    }
  }, [open]);

  const form = useForm<z.infer<typeof testimonialCreateSchema>>({
    resolver: zodResolver(testimonialCreateSchema),
    defaultValues: {
      name: "",
      role: "",
      source: "student",
      content: "",
      rating: "5",
      categories: [],
    },
  });

  const { control, setValue, watch } = form;

  const testimonialCreate = trpc.testimonials.create.useMutation();

  const handlePreview = (files: File[]) => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setSelectedFile(files[0] ?? null);
  };

  const onSubmit = async (values: z.infer<typeof testimonialCreateSchema>) => {
    const toastId = toast.loading("Creating testimonial...");
    setIsSubmitting(true);

    try {
      const data = await testimonialCreate.mutateAsync(values);

      if (selectedFile) {
        toast.loading("Uploading testimonial image...", { id: toastId });

        const res = await uploadFiles("testimonialImageUploader", {
          files: [selectedFile],
          input: { testimonialId: data.id },
        });

        console.log("Upload response:", res);

        const uploadedFile = res[0];
        if (!uploadedFile) {
          throw new Error("Failed to upload image.");
        }
      }

      utils.testimonials.getFiltered.invalidate();
      toast.success("Testimonial created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred during testimonial creation.",
        {
          id: toastId,
        }
      );
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (isLoadingCategories) {
  //   return <>Loading</>;
  // }

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
                    Provide the core details for this testimonial
                  </p>
                </div>

                {/* Name */}
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        >
                          <SelectTrigger
                            disabled={isSubmitting}
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
                          disabled={isSubmitting}
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
                        <>
                          <StarRatingInput
                            value={parseFloat(field.value) ?? 0}
                            onChange={(val) => field.onChange(val.toString())}
                            disabled={isSubmitting}
                          />
                          <input
                            type="range"
                            step="0.1"
                            min="0"
                            max="5"
                            value={field.value ?? 0}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={isSubmitting}
                            className="w-full accent-yellow-400"
                          />
                        </>
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
                      options={categories!.map((c) => ({
                        label: c.name,
                        value: c.id,
                        color: stringToColor(c.name, true),
                      }))}
                      value={field.value!}
                      onChange={field.onChange}
                      placeholder="Select categories..."
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <GradientSeparator />

              {/* Image Upload & Preview */}
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
                        <p className="font-medium">Upload image</p>
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
                              Change Image
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
                              Remove Image
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
                            Upload Image
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
                {isSubmitting ? "Creating..." : "Create Testimonial"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
