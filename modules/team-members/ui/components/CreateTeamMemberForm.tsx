"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  Plus,
  ImageIcon,
  ChevronDown,
  Check,
  Link,
  User,
  Briefcase,
  Building2,
  FileText,
  Mail,
  Linkedin,
  Twitter,
  X,
  Phone,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { teamMemberCreateSchema } from "@/db/schema/marketing/teamMembers";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreateTeamMemberFormProps {
  onCancel?: () => void;
  onSuccess?: (id: string) => void;
}

export const CreateTeamMemberForm = ({
  onCancel,
  onSuccess,
}: CreateTeamMemberFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: departmentList, isLoading: isLoadingDepartment } =
    trpc.teamMembers.getManyDepartmentFilters.useQuery();

  const form = useForm<z.infer<typeof teamMemberCreateSchema>>({
    resolver: zodResolver(teamMemberCreateSchema),
    defaultValues: {
      name: "",
      title: "",
      departmentId: "",
      bio: "",
      socialLinks: [],
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const teamMemberCreate = trpc.teamMembers.create.useMutation();

  const handlePreview = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  const onSubmit = async (values: z.infer<typeof teamMemberCreateSchema>) => {
    const toastId = toast.loading("Creating team member...");
    setIsSubmitting(true);

    try {
      const data = await teamMemberCreate.mutateAsync(values);

      if (selectedFile) {
        toast.loading("Uploading avatar...", { id: toastId });
        const res = await uploadFiles("teamMemberAvatarUploader", {
          files: [selectedFile],
          input: { teamMemberId: data.id },
        });

        if (!res[0]) throw new Error("Failed to upload avatar.");
      }

      utils.teamMembers.getFilteredMembers.invalidate();
      toast.success("Team member created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating team member.", {
        id: toastId,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!departmentList) {
    return <></>;
  }

  return (
    <Card className="w-full border-muted-foreground/50 shadow-sm pt-4">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        <RequiredLabel>Name</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter full name"
                          {...field}
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        <RequiredLabel>Title</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter job title"
                          {...field}
                          disabled={isSubmitting}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => {
                  const selectedDepartment = departmentList.find(
                    (department) => department.id === field.value
                  );
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium text-foreground">
                        <RequiredLabel>Department</RequiredLabel>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`w-full h-11 justify-between border-muted-foreground/50 ${selectedDepartment ? "text-black" : "text-muted-foreground"} `}
                              disabled={isSubmitting}
                            >
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                {selectedDepartment?.name ||
                                  "Select department..."}
                              </div>
                              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
                          <Command>
                            <CommandInput
                              placeholder="Search department..."
                              className="h-9"
                            />
                            <CommandEmpty>No department found.</CommandEmpty>
                            <CommandGroup>
                              {departmentList.map((department, index) => (
                                <CommandItem
                                  key={department.id}
                                  value={department.id}
                                  onSelect={() => field.onChange(department.id)}
                                >
                                  {department.name}
                                  {field.value === department.id && (
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
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief biography..."
                        {...field}
                        disabled={isSubmitting}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <GradientSeparator />

            {/* Social Links Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Link className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Social Links
                  </h3>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ type: "email", url: "" })}
                  disabled={isSubmitting}
                  className="h-9 gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
                  <Link className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No social links added yet
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ type: "email", url: "" })}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Your First Link
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group p-4 border border-muted-foreground/20 rounded-lg bg-card hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex gap-4 items-end">
                        <FormField
                          control={control}
                          name={`socialLinks.${index}.type`}
                          render={({ field }) => (
                            <FormItem className="min-w-[140px]">
                              <FormLabel className="text-sm font-medium">
                                Type
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="email">
                                    <div className="flex items-center">
                                      <Mail className="size-4 mr-1" />
                                      <span className="leading-none">
                                        Email
                                      </span>
                                    </div>
                                  </SelectItem>

                                  <SelectItem value="linkedin">
                                    <div className="flex items-center">
                                      <Linkedin className="size-4 mr-1" />
                                      <span className="leading-none">
                                        LinkedIn
                                      </span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="twitter">
                                    <div className="flex items-center">
                                      <Twitter className="size-4 mr-1" />
                                      <span className="leading-none">
                                        Twitter
                                      </span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="website">
                                    <div className="flex items-center">
                                      <Globe className="size-4 mr-1" />
                                      <span className="leading-none">
                                        Website
                                      </span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="whatsapp">
                                    <div className="flex items-center">
                                      <Phone className="size-4 mr-1" />
                                      <span className="leading-none">
                                        WhatsApp
                                      </span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="facebook">
                                    <div className="flex items-center">
                                      <Facebook className="size-4 mr-1" />
                                      <span className="leading-none">
                                        Facebook
                                      </span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="instagram">
                                    <div className="flex items-center">
                                      <Instagram className="size-4 mr-1" />
                                      <span className="leading-none">
                                        Instagram
                                      </span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`socialLinks.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-sm font-medium">
                                URL
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com"
                                  {...field}
                                  disabled={isSubmitting}
                                  className="h-10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                                disabled={isSubmitting}
                                className="h-10 w-10 p-0 text-destructive  hover:bg-destructive/10 border  hover:border-red-300 hover:text-red-600 transition-colors "
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove link</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <GradientSeparator />

            {/* Avatar Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <ImageIcon className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Avatar
                </h3>
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
                      <p className="font-medium text-foreground">
                        Profile Photo
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
                {isSubmitting ? "Creating..." : "Create Member"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
