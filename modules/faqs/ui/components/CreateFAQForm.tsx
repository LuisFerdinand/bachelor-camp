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
import { uploadFiles } from "@/lib/uploadthing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { stringToColor } from "@/lib/utils";
import { StarRatingInput } from "@/components/Inputs/StarRatingInput";
import { faqCreateSchema } from "@/db/schema";

interface CreateFAQFormProps {
  onCancel?: () => void;
  onSuccess?: (faqId: string) => void;
  open: boolean;
}

export const CreateFAQForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateFAQFormProps) => {
  const utils = trpc.useUtils();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = trpc.faqs.getAllCategories.useQuery();

  const form = useForm<z.infer<typeof faqCreateSchema>>({
    resolver: zodResolver(faqCreateSchema),
    defaultValues: {
      question: "",
      answer: "",
      iconUrl: "",
      categories: [],
    },
  });

  const { control, setValue, watch } = form;

  const faqCreate = trpc.faqs.create.useMutation();

  const onSubmit = async (values: z.infer<typeof faqCreateSchema>) => {
    const toastId = toast.loading("Creating faq...");
    setIsSubmitting(true);

    try {
      const data = await faqCreate.mutateAsync(values);

      utils.faqs.getFiltered.invalidate();
      // utils.faqs.getOneProtected.invalidate()
      toast.success("Faq created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during faq creation.", {
        id: toastId,
      });
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
                    Provide the core details for this faq
                  </p>
                </div>

                {/* Name */}
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
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        <RequiredLabel>Answer</RequiredLabel>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write faq answer..."
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

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      <RequiredLabel>Categories</RequiredLabel>
                    </FormLabel>
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
                {isSubmitting ? "Creating..." : "Create Faq"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
