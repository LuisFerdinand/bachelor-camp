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
import { faqUpdateSchema } from "@/db/schema";
import { StarRatingInput } from "@/components/Inputs/StarRatingInput";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { trpc } from "@/trpc/client";
import { useFAQAction } from "./FAQContext";
import { RequiredLabel } from "@/components/RequiredLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";
import { stringToColor } from "@/lib/utils";
import { ImageIcon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UpdateFAQFormProps {
  faqId: string;
  onCancel?: () => void;
  onSuccess?: (faqId: string) => void;
  open?: boolean;
}

export function UpdateFAQForm({
  faqId,
  onCancel,
  onSuccess,
  open,
}: UpdateFAQFormProps) {
  const utils = trpc.useUtils();

  const { isMutating, setIsMutating } = useFAQAction();

  const [{ faq, allCategories }] = trpc.faqs.getOneProtected.useSuspenseQuery({
    faqId,
  });

  const form = useForm<z.infer<typeof faqUpdateSchema>>({
    resolver: zodResolver(faqUpdateSchema),
    defaultValues: {
      question: faq.question || "",
      answer: faq.answer || "",
      iconUrl: faq.iconUrl || "",
      categories: faq.categories || [],
      isActive: faq.isActive || "false",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty },
  } = form;

  const isModified = isDirty;

  const updateFAQ = trpc.faqs.update.useMutation();

  const onSubmit = async (values: z.infer<typeof faqUpdateSchema>) => {
    const toastId = toast.loading("Updating FAQ...");
    setIsMutating(true);

    try {
      const updatedFAQ = await updateFAQ.mutateAsync({
        id: faqId,
        ...values,
      });

      form.reset(values);

      await utils.faqs.getFiltered.invalidate();
      await utils.faqs.getOneProtected.invalidate({ faqId: updatedFAQ.id });
      toast.success("FAQ updated successfully!", { id: toastId });
      onSuccess?.(faqId);
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
                    Update the main content of this fAQ
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Question</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter FAQ question"
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
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Answer</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write FAQ answer..."
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
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between rounded-lg border px-3 py-2 bg-muted/40">
                        <div className="flex items-center gap-2">
                          <FormLabel className="font-medium">
                            Active FAQ
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
                                  ? "Deactivating will hide this FAQ from the home page."
                                  : "Activating will make this FAQ visible on the home page."}
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
                        color: stringToColor(c.name, true),
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
                {isMutating ? "Updating..." : "Update FAQ"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
