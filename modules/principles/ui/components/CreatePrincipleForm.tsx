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
import { principleCreateSchema } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import { Switch } from "@/components/ui/switch";

interface CreatePrincipleFormProps {
  onCancel?: () => void;
  onSuccess?: (principleId: string) => void;
  open: boolean;
}

export const CreatePrincipleForm = ({
  onCancel,
  onSuccess,
  open,
}: CreatePrincipleFormProps) => {
  const utils = trpc.useUtils();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof principleCreateSchema>>({
    resolver: zodResolver(principleCreateSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      iconUrl: "",
    },
  });

  const { control, setValue, watch } = form;

  const principleCreate = trpc.principles.create.useMutation();

  const onSubmit = async (values: z.infer<typeof principleCreateSchema>) => {
    const toastId = toast.loading("Creating principle...");
    setIsSubmitting(true);

    try {
      const data = await principleCreate.mutateAsync({
        title: values.title,
        subtitle: values.subtitle,
        iconUrl: values.iconUrl,
      });

      utils.principles.getFiltered.invalidate();
      toast.success("Principle created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating principle.", {
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
                    Configure the main content of your principle
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
                          placeholder="Enter principle title"
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
                {isSubmitting ? "Creating..." : "Create Principle"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
