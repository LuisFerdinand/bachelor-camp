"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useHighlightAction } from "./HighlightContext";
import { highlightUpdateSchema } from "@/db/schema";
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

interface UpdateHighlightFormProps {
  highlightId: string;
  onCancel?: () => void;
  onSuccess?: (highlightId: string) => void;
  open?: boolean;
}

export const UpdateHighlightForm = (props: UpdateHighlightFormProps) => {
  return (
    <Suspense
      fallback={<UpdateHighlightFormSkeleton></UpdateHighlightFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateHighlightFormSuspense {...props}></UpdateHighlightFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateHighlightFormSkeleton = () => {
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

const UpdateHighlightFormSuspense = ({
  highlightId,
  onCancel,
  onSuccess,
  open,
}: UpdateHighlightFormProps) => {
  const utils = trpc.useUtils();
  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing highlight
  const [highlight] = trpc.highlights.getOneProtected.useSuspenseQuery({
    id: highlightId,
  });

  const form = useForm<z.infer<typeof highlightUpdateSchema>>({
    resolver: zodResolver(highlightUpdateSchema),
    values: {
      title: highlight.title,
      subtitle: highlight.subtitle ?? "",
      iconUrl: highlight.iconUrl ?? "",
      features: highlight.features ?? [],
      isActive: highlight.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const isModified = formState.isDirty;

  const updateHighlight = trpc.highlights.update.useMutation();

  const onSubmit = async (values: z.infer<typeof highlightUpdateSchema>) => {
    const toastId = toast.loading("Updating highlight...");
    setIsMutating(true);

    try {
      const updatedHighlight = await updateHighlight.mutateAsync({
        id: highlightId,
        ...values,
      });

      form.reset(values);

      await utils.highlights.getFiltered.invalidate();
      toast.success("Highlight updated successfully!", { id: toastId });
      onSuccess?.(highlightId);
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
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure the main content of your highlight
                  </p>
                </div>

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

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={isMutating} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="iconUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Main Icon URL
                      </FormLabel>
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

                {/* isActive Switch */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/40">
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-medium">
                            Active Highlight
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
                                  ? "Deactivating will hide this highlight from the home page."
                                  : "Activating will make this highlight visible on the home page."}
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

              {/* Features */}
              {/* same features block as create form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Features
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add up to 5 features for your highlight
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    {fields.length}/5
                  </div>
                </div>
                {fields.length === 0 && (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                      <Plus className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No features added yet
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ text: "", iconUrl: "" })}
                      disabled={isMutating}
                      className="border-muted-foreground/50"
                    >
                      <Plus className="size-4 mr-2" />
                      Add First Feature
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
                          <p className="font-medium">Feature {index + 1}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
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
                          name={`features.${index}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Feature Text
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Comfortable Accommodation"
                                  {...field}
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`features.${index}.iconUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Icon Url
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    placeholder="Paste icon URL"
                                    {...field}
                                    disabled={isMutating}
                                    className="border-muted-foreground/50 h-10 bg-background"
                                  />
                                  {/* Icon Preview */}
                                  {field.value && (
                                    <img
                                      src={field.value}
                                      alt="icon preview"
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
                    </div>
                  ))}
                </div>

                {fields.length > 0 && fields.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ text: "", iconUrl: "" })}
                    disabled={isMutating}
                    className="w-full border-muted-foreground/50 border-dashed h-11"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Another Feature ({fields.length}/5)
                  </Button>
                )}
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
                {isMutating ? "Updating..." : "Update Highlight"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
