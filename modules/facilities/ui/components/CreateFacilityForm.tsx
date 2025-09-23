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
import {
  Trash2,
  Plus,
  Tag,
  ImageIcon,
  NotebookIcon,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { facilityCreateSchema } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface CreateFacilityFormProps {
  onCancel?: () => void;
  onSuccess?: (facilityId: string) => void;
  open: boolean;
}

export const CreateFacilityForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateFacilityFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image states
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof facilityCreateSchema>>({
    resolver: zodResolver(facilityCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "camp",
      status: "active",
      iconUrl: "",
      category: "general",
    },
  });

  const { control, setValue, watch } = form;

  const facilityCreate = trpc.facilities.create.useMutation();

  const handlePreview = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  const onSubmit = async (values: z.infer<typeof facilityCreateSchema>) => {
    const toastId = toast.loading("Creating facility...");
    setIsSubmitting(true);

    try {
      const data = await facilityCreate.mutateAsync({
        name: values.name,
        description: values.description,
        type: values.type,
        status: values.status,
        iconUrl: values.iconUrl,
        category: values.category,
      });

      if (selectedFile) {
        toast.loading("Uploading facility image...", { id: toastId });

        const res = await uploadFiles("facilityImageUploader", {
          files: [selectedFile],
          input: { facilityId: data.id },
        });

        if (!res[0]) throw new Error("Failed to upload facility image.");
      }

      utils.facilities.getFiltered.invalidate();
      toast.success("Facility created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating facility.", { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
                    Configure the main content of your facility
                  </p>
                </div>
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
                          placeholder="Enter facility name"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Description
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
                          disabled={isSubmitting}
                        >
                          <SelectTrigger
                            disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        >
                          <SelectTrigger
                            disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    Facility Image
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload an image or graphic for your facility
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-6 border border-muted-foreground/20">
                  <div className="flex gap-6 items-start">
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
                        <p className="font-medium">Upload facility image</p>
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
                                setPreviewUrl("");
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

            {/* Actions */}
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
                {isSubmitting ? "Creating..." : "Create Facility"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
