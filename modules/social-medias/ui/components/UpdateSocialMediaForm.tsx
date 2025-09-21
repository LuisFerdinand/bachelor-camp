"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSocialMediaAction } from "./SocialMediaContext";
import { socialMediaUpdateSchema } from "@/db/schema";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
import { cn } from "@/lib/utils";

interface UpdateSocialMediaFormProps {
  socialMediaId: string;
  onCancel?: () => void;
  onSuccess?: (socialMediaId: string) => void;
  open?: boolean;
}

export const UpdateSocialMediaForm = (props: UpdateSocialMediaFormProps) => {
  return (
    <Suspense
      fallback={<UpdateSocialMediaFormSkeleton></UpdateSocialMediaFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateSocialMediaFormSuspense
          {...props}
        ></UpdateSocialMediaFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateSocialMediaFormSkeleton = () => {
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

const UpdateSocialMediaFormSuspense = ({
  socialMediaId,
  onCancel,
  onSuccess,
  open,
}: UpdateSocialMediaFormProps) => {
  const utils = trpc.useUtils();
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing socialMedia
  const [socialMedia] = trpc.socialMedias.getOneProtected.useSuspenseQuery({
    id: socialMediaId,
  });

  const form = useForm<z.infer<typeof socialMediaUpdateSchema>>({
    resolver: zodResolver(socialMediaUpdateSchema),
    values: {
      url: socialMedia.url ?? "",
      isActive: socialMedia.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;

  const isModified = formState.isDirty;

  const updateSocialMedia = trpc.socialMedias.update.useMutation();

  const onSubmit = async (values: z.infer<typeof socialMediaUpdateSchema>) => {
    const toastId = toast.loading("Updating socialMedia...");
    setIsMutating(true);

    try {
      const updatedSocialMedia = await updateSocialMedia.mutateAsync({
        id: socialMediaId,
        ...values,
      });

      form.reset(values);

      await utils.socialMedias.getFiltered.invalidate();
      await utils.socialMedias.getOneProtected.invalidate({
        id: socialMediaId,
      });
      toast.success("SocialMedia updated successfully!", { id: toastId });
      onSuccess?.(socialMediaId);
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setIsMutating(false);
    }
  };
  const disableActivate =
    isMutating ||
    !form.getValues("url") || // nothing in form
    !!formState.errors.url; // invalid URL

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
                    Configure the main content of your socialMedia
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isMutating}
                          placeholder="Enter your account url..."
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
                      <div
                        className={cn(
                          "flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/40 transition-opacity",
                          (isMutating || disableActivate) &&
                            "opacity-60 cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-medium">
                            Active SocialMedia
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
                                {isMutating
                                  ? "Updating in progress. Please wait..."
                                  : disableActivate
                                    ? "Activation is disabled due to current settings."
                                    : field.value === "true"
                                      ? "Deactivating will hide this social media from the home page."
                                      : "Activating will make this social media visible on the home page."}
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
                            disabled={isMutating || disableActivate}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                {isMutating ? "Updating..." : "Update SocialMedia"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
