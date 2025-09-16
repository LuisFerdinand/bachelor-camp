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
import { Trash2, Plus, Tag, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { highlightCreateSchema } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import { Switch } from "@/components/ui/switch";

interface CreateHighlightFormProps {
  onCancel?: () => void;
  onSuccess?: (highlightId: string) => void;
  open: boolean;
}

export const CreateHighlightForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateHighlightFormProps) => {
  const utils = trpc.useUtils();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof highlightCreateSchema>>({
    resolver: zodResolver(highlightCreateSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      iconUrl: "",
      features: [],
    },
  });

  const { control, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const highlightCreate = trpc.highlights.create.useMutation();

  const onSubmit = async (values: z.infer<typeof highlightCreateSchema>) => {
    const toastId = toast.loading("Creating highlight...");
    setIsSubmitting(true);

    try {
      const data = await highlightCreate.mutateAsync({
        title: values.title,
        subtitle: values.subtitle,
        iconUrl: values.iconUrl,
        features: values.features,
      });

      utils.highlights.getFiltered.invalidate();
      toast.success("Highlight created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating highlight.", {
        id: toastId,
      });
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
                    Configure the main content of your highlight
                  </p>
                </div>

                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Title</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter highlight title"
                          {...field}
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subtitle */}
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Subtitle</FormLabel>
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

                {/* Main Icon URL */}
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

              {/* Features */}
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

                {/* Empty State */}
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
                      disabled={isSubmitting}
                      className="border-muted-foreground/50"
                    >
                      <Plus className="size-4 mr-2" />
                      Add First Feature
                    </Button>
                  </div>
                )}

                {/* Feature List */}
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Feature Text */}
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
                                  disabled={isSubmitting}
                                  className="border-muted-foreground/50 h-10 bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Feature Icon */}
                        <FormField
                          control={control}
                          name={`features.${index}.iconUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Feature Icon URL
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    placeholder="Paste icon URL"
                                    {...field}
                                    disabled={isSubmitting}
                                    className="border-muted-foreground/50 h-10 bg-background"
                                  />
                                  {field.value && (
                                    <img
                                      src={field.value}
                                      alt="feature icon preview"
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
                    disabled={isSubmitting}
                    className="w-full border-muted-foreground/50 border-dashed h-11"
                  >
                    <Plus className="size-4 mr-2" />
                    Add Another Feature ({fields.length}/3)
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
                {isSubmitting ? "Creating..." : "Create Highlight"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
