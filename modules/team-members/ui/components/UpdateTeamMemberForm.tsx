"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTeamMemberAction } from "./TeamMemberContext";
import { teamMemberUpdateSchema } from "@/db/schema";
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
  Building2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Facebook,
  Globe,
  ImageIcon,
  InfoIcon,
  Instagram,
  Link,
  Linkedin,
  Mail,
  Phone,
  Plus,
  Tag,
  Trash2,
  Twitter,
  Upload,
  User,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
import Image from "next/image";

interface UpdateTeamMemberFormProps {
  teamMemberId: string;
  onCancel?: () => void;
  onSuccess?: (teamMemberId: string) => void;
  open?: boolean;
}

export const UpdateTeamMemberForm = (props: UpdateTeamMemberFormProps) => {
  return (
    <Suspense
      fallback={<UpdateTeamMemberFormSkeleton></UpdateTeamMemberFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateTeamMemberFormSuspense {...props}></UpdateTeamMemberFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateTeamMemberFormSkeleton = () => {
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

const UpdateTeamMemberFormSuspense = ({
  teamMemberId,
  onCancel,
  onSuccess,
  open,
}: UpdateTeamMemberFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [departmentList] =
    trpc.teamMembers.getManyDepartmentFilters.useSuspenseQuery();

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const [teamMember] = trpc.teamMembers.getOneProtected.useSuspenseQuery({
    id: teamMemberId,
  });

  const form = useForm<z.infer<typeof teamMemberUpdateSchema>>({
    resolver: zodResolver(teamMemberUpdateSchema),
    values: {
      title: teamMember.title,
      name: teamMember.name ?? "",
      bio: teamMember.bio ?? "",
      departmentId: teamMember.departmentId ?? "",
      socialLinks: teamMember.socialLinks ?? [],
      isActive: teamMember.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const isModified =
    formState.isDirty ||
    selectedFile !== null ||
    (teamMember.avatarUrl && !previewUrl);

  const updateTeamMember = trpc.teamMembers.update.useMutation();

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
    if (teamMember.avatarUrl && !previewUrl) {
      setPreviewUrl(teamMember.avatarUrl);
      setSelectedFile(null);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [teamMember.avatarUrl]);

  const onSubmit = async (values: z.infer<typeof teamMemberUpdateSchema>) => {
    const toastId = toast.loading("Updating teamMember...");
    setIsMutating(true);

    try {
      // Handle avatar removal
      if (!previewUrl) {
        if (teamMember.avatarKey && teamMember.avatarUrl) {
          const res = await fetch(`/api/file/teamMembers/${teamMemberId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("TeamMember avatar removed!", { id: toastId });
        } else if (teamMember.avatarUrl && !teamMember.avatarKey) {
          await updateTeamMember.mutateAsync({
            id: teamMemberId,
            avatarUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading teamMember avatar...", { id: toastId });

        const res = await uploadFiles("teamMemberAvatarUploader", {
          files: [selectedFile],
          input: { teamMemberId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload avatar.");

        await updateTeamMember.mutateAsync({
          id: teamMemberId,
          avatarUrl: uploadedFile.ufsUrl,
          avatarKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedTeamMember = await updateTeamMember.mutateAsync({
        id: teamMemberId,
        ...values,
      });

      form.reset(values);

      await utils.teamMembers.getFilteredMembers.invalidate();
      await utils.teamMembers.getOneProtected.invalidate({ id: teamMemberId });
      toast.success("TeamMember updated successfully!", { id: toastId });
      onSuccess?.(teamMemberId);
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
                                disabled={isMutating}
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
                                    onSelect={() =>
                                      field.onChange(department.id)
                                    }
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
                          {...field}
                          disabled={isMutating}
                          className="min-h-[100px] resize-none"
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
                            Active Member
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
                                  ? "Deactivating will hide this teamMember from the home page."
                                  : "Activating will make this teamMember visible on the home page."}
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
                    disabled={isMutating}
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
                      disabled={isMutating}
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
                                  disabled={isMutating}
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
                                    disabled={isMutating}
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
                                  disabled={isMutating}
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

              {/* Avatar Upload */}
              {/* same upload block as create form but preload previewUrl */}
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
                              disabled={isMutating}
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
                              disabled={isMutating}
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
                            disabled={isMutating}
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
                {isMutating ? "Updating..." : "Update TeamMember"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
