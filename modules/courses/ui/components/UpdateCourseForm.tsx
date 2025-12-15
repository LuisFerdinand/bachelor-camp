"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumericFormat } from "react-number-format";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronsUpDown,
  LayoutGridIcon,
  Save,
  XIcon,
} from "lucide-react";
import { cn, stringToColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  Trash2,
  Plus,
  ImageIcon,
  BookOpen,
  Target,
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  List,
  Lightbulb,
  FileText,
  Building2,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { updateCourseSchema, courses } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import { Combobox } from "@/components/ui/combobox";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/db/schema/enums";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/MultiSelect";
import {
  MAX_LEARNING_GOALS,
  MAX_RESOURCES,
  MAX_SYLLABUS,
  MAX_TARGET_AUDIENCE,
  MAX_TEACHING_METHODS,
} from "@/constants";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "react-error-boundary";
import { useCourseAction } from "./CourseContext";

const NavigationWarningModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Stay Here
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface UpdateCourseFormProps {
  onCancel?: () => void;
  onSuccess?: (courseId: string) => void;
  open: boolean;
  courseId: string;
}

export const UpdateCourseForm = (props: UpdateCourseFormProps) => {
  return (
    <Suspense fallback={<>Load</>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateCourseFormSuspense {...props}></UpdateCourseFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateCourseFormSuspense = ({
  onCancel,
  onSuccess,
  open,
  courseId,
}: UpdateCourseFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isMutating, setIsMutating } = useCourseAction();

  const [course] = trpc.courses.getOneProtected.useSuspenseQuery({
    courseId: courseId,
  });

  // Fetch buildings
  const { data: buildingList = [] } = trpc.buildings.getMany.useQuery();

  const [showNavigationWarning, setShowNavigationWarning] = useState(false);

  const form = useForm<z.infer<typeof updateCourseSchema>>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      slug: course.slug,
      title: course.title,
      category: course.category,
      level: course.level,
      duration: course.duration,
      totalSessions: course.totalSessions,
      description: course.description ?? "",
      learningGoals: course.learningGoals ?? [],
      syllabus: course.syllabus ?? [],
      teachingMethods: course.teachingMethods ?? [],
      resources: course.resources ?? [],
      targetAudience: course.targetAudience ?? [],
      price: course.price,
      isFeatured: course.isFeatured ?? "false",
      buildingIds: course.buildingIds ?? [],
      isActive: course.isActive ?? "false",
    },
    mode: "onChange",
  });

  const { control, setValue, watch, formState } = form;
  const {
    fields: learningGoalFields,
    append: learningGoalAppend,
    remove: learningGoalRemove,
  } = useFieldArray({
    control,
    name: "learningGoals",
  });
  const {
    fields: syllabusFields,
    append: syllabusAppend,
    remove: syllabusRemove,
  } = useFieldArray({
    control,
    name: "syllabus",
  });
  const {
    fields: teachingMethodFields,
    append: teachingMethodAppend,
    remove: teachingMethodRemove,
  } = useFieldArray({
    control,
    name: "teachingMethods",
  });
  const {
    fields: resourcesFields,
    append: resourcesAppend,
    remove: resourcesRemove,
  } = useFieldArray({
    control,
    name: "resources",
  });
  const {
    fields: targetAudienceFields,
    append: targetAudienceAppend,
    remove: targetAudienceRemove,
  } = useFieldArray({
    control,
    name: "targetAudience",
  });

  const targetAudienceArray = useFieldArray({
    control,
    name: "targetAudience",
  });

  const isModified =
    formState.isDirty ||
    selectedFile !== null ||
    (course.imageUrl && !previewUrl);

  const updateCourse = trpc.courses.update.useMutation();

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
    if (course.imageUrl && !previewUrl) {
      setPreviewUrl(course.imageUrl);
      setSelectedFile(null);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [course.imageUrl]);

  const onSubmit = async (values: z.infer<typeof updateCourseSchema>) => {
    const toastId = toast.loading("Update course...");
    setIsMutating(true);

    try {
      if (!previewUrl) {
        if (course.imageKey && course.imageUrl) {
          const res = await fetch(`/api/file/courses/${courseId}`, {
            method: "DELETE",
          });
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message);
          }
          toast.success("Course image removed!", { id: toastId });
        } else if (course.imageUrl && !course.imageKey) {
          await updateCourse.mutateAsync({
            id: courseId,
            imageUrl: "",
          });
        }
      }

      if (previewUrl && selectedFile) {
        toast.loading("Uploading course image...", { id: toastId });

        const res = await uploadFiles("courseImageUploader", {
          files: [selectedFile],
          input: { courseId },
        });

        const uploadedFile = res[0];
        if (!uploadedFile) throw new Error("Failed to upload image.");

        await updateCourse.mutateAsync({
          id: courseId,
          imageUrl: uploadedFile.ufsUrl,
          imageKey: uploadedFile.key,
        });

        setSelectedFile(null);
      }

      const updatedCourse = await updateCourse.mutateAsync({
        id: courseId,
        ...values,
      });

      utils.courses.getFiltered.invalidate();
      utils.courses.getOneProtected.invalidate({ courseId });
      toast.success("Course updated successfully!", { id: toastId });
      onSuccess?.(courseId);
    } catch (error: any) {
      toast.error(error.message || "Update failed", { id: toastId });
      console.error(error);
    } finally {
      setIsMutating(false);
    }
  };

  // Generate slug from title
  const watchedTitle = watch("title");

  const getUniqueSlugQuery = trpc.courses.getUniqueSlug.useQuery(
    { title: watchedTitle || "", excludeId: courseId },
    { enabled: false }
  );

  useEffect(() => {
    if (!watchedTitle) return;

    const fetchSlug = async () => {
      try {
        const res = await getUniqueSlugQuery.refetch(); // Trigger query manually
        if (res.data) {
          setValue("slug", res.data); // Update slug in form
        }
      } catch (err) {
        console.error("Failed to get unique slug", err);
      }
    };

    fetchSlug();
  }, [watchedTitle, setValue, getUniqueSlugQuery]);

  return (
    <div className="p-2">
      {/* <NavigationWarningModal
        isOpen={showNavigationWarning}
        onClose={() => setShowNavigationWarning(false)}
        onConfirm={handleNavigationConfirm}
        title="Unsaved Schedule Changes"
        message="You have unsaved changes in the weekly schedule. If you navigate away, these changes will be lost. Continue anyway?"
      /> */}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                Update Course
              </h2>
              <p className="text-blue-100 text-sm mb-3">
                Modify course details and configuration
              </p>

              {/* Course Info Pills */}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 flex items-center gap-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isModified ? "bg-yellow-300 animate-pulse" : "bg-slate-300"
              )}
            />
            <span>{isModified ? "Unsaved changes" : "No changes"}</span>
          </div>

          {formState.errors && Object.keys(formState.errors).length > 0 && (
            <div className="flex items-center gap-2 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>
                {Object.keys(formState.errors).length} validation error(s)
              </span>
            </div>
          )}
        </div>
      </div>
      <Card className="w-full border-t-0 rounded-t-none border-muted-foreground/50 shadow-none pt-4">
        <CardContent className="px-4 overflow-visible">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-2 px-0">
              <Accordion
                type="multiple"
                defaultValue={["basic-info"]}
                className="w-full space-y-3"
              >
                {/* Basic Information */}
                <AccordionItem
                  value="basic-info"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Basic Information
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Configure the main details of your course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div className="space-y-4 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="font-semibold">
                                <RequiredLabel>Course Title</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter course title"
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
                          name="slug"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="font-semibold text-muted-foreground">
                                <RequiredLabel>Course Slug</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="course-slug"
                                  {...field}
                                  disabled={true}
                                  className="border-muted-foreground/50 bg-muted/50 text-muted-foreground h-11"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="font-semibold">
                                <RequiredLabel>Category</RequiredLabel>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className="w-full justify-between border-muted-foreground/50 h-11"
                                      disabled={isMutating}
                                    >
                                      {field.value || "Choose category"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search product..."
                                      className="h-9"
                                    />
                                    <CommandEmpty>
                                      No product found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {COURSE_CATEGORIES?.map((category) => (
                                        <CommandItem
                                          key={category}
                                          value={category}
                                          onSelect={() => {
                                            field.onChange(category);
                                          }}
                                        >
                                          {category}
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
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="font-semibold">
                                <RequiredLabel>Level</RequiredLabel>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className="w-full justify-between border-muted-foreground/50 h-11"
                                      disabled={isMutating}
                                    >
                                      {field.value || "Choose level"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
                                  <Command>
                                    <CommandInput
                                      placeholder="Search product..."
                                      className="h-9"
                                    />
                                    <CommandEmpty>
                                      No product found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {COURSE_LEVELS?.map((level) => (
                                        <CommandItem
                                          key={level}
                                          value={level}
                                          onSelect={() => {
                                            field.onChange(level);
                                          }}
                                        >
                                          {level}
                                          {field.value === level && (
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
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="space-y-0 mt-1">
                              {" "}
                              <FormLabel className="font-semibold flex items-center gap-1 mb-0.5">
                                <RequiredLabel>Price</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <NumericFormat
                                  value={field.value!.toString()}
                                  onValueChange={(values) => {
                                    field.onChange(parseFloat(values.value));
                                  }}
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="Rp "
                                  allowNegative={false}
                                  disabled={isMutating}
                                  customInput={Input}
                                  className="border-muted-foreground/50 h-11"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => {
                            type DurationUnit = "day" | "week" | "month";

                            interface LocalDurationState {
                              number: number | "";
                              unit: DurationUnit | "";
                            }

                            // Parse existing value if it exists
                            const parseExistingValue = (
                              value: string | undefined
                            ): LocalDurationState => {
                              if (!value) return { number: "", unit: "" };
                              const match = value.match(
                                /^(\d+)\s+(day|week|month)s?$/i
                              );
                              if (match) {
                                return {
                                  number: parseInt(match[1], 10),
                                  unit: match[2].toLowerCase() as DurationUnit,
                                };
                              }
                              return { number: "", unit: "" };
                            };

                            const [localState, setLocalState] =
                              useState<LocalDurationState>(() =>
                                parseExistingValue(field.value)
                              );

                            const updateDuration = (
                              updates: Partial<LocalDurationState>
                            ): void => {
                              const newState = { ...localState, ...updates };
                              setLocalState(newState);

                              const { number, unit } = newState;
                              if (
                                number &&
                                unit &&
                                typeof number === "number"
                              ) {
                                const durationString = `${number} ${unit}${number > 1 ? "s" : ""}`;
                                field.onChange(durationString);
                              } else {
                                field.onChange("");
                              }
                            };

                            return (
                              <FormItem className="space-y-0">
                                <FormLabel className="font-semibold">
                                  <RequiredLabel>Duration</RequiredLabel>
                                </FormLabel>
                                <FormControl>
                                  <div className="flex ">
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      min="1"
                                      value={localState.number || ""}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const value = e.target.value;
                                        const numberValue =
                                          value === ""
                                            ? ""
                                            : parseInt(value, 10) || "";
                                        updateDuration({ number: numberValue });
                                      }}
                                      disabled={isMutating}
                                      className="border-muted-foreground/50 h-11 flex-1 rounded-r-none"
                                    />
                                    <Select
                                      value={localState.unit || ""}
                                      onValueChange={(unit: DurationUnit) =>
                                        updateDuration({ unit })
                                      }
                                      disabled={isMutating}
                                    >
                                      <SelectTrigger className="border-muted-foreground/50 h-11 w-32 rounded-l-none">
                                        <SelectValue placeholder="Unit" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="day">
                                          Day(s)
                                        </SelectItem>
                                        <SelectItem value="week">
                                          Week(s)
                                        </SelectItem>
                                        <SelectItem value="month">
                                          Month(s)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="totalSessions"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel className="font-semibold">
                                <RequiredLabel>Total Sessions</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="12"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  disabled={isMutating}
                                  className="border-muted-foreground/50 h-11"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel className="font-semibold">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide a detailed description of the course..."
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
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-semibold">
                                Featured Course
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                Mark this course as featured to highlight it on
                                the homepage
                              </p>
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
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Building Assignment */}
                <AccordionItem
                  value="buildings"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Building Assignment
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Select buildings where this course will be offered
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div className="space-y-2 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="font-semibold text-foreground">
                            Available Buildings
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Choose one or more buildings for this course
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {course.buildingIds.length} selected
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="buildingIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              <RequiredLabel>Buildings</RequiredLabel>
                            </FormLabel>
                            <MultiSelect
                              options={buildingList.map((b) => ({
                                label: b.name,
                                value: b.id,
                                color: stringToColor(b.id).text,
                              }))}
                              value={field.value ?? []}
                              onChange={field.onChange}
                              placeholder="Select buildings..."
                              disabled={isMutating}
                            ></MultiSelect>
                          </FormItem>
                        )}
                      ></FormField>

                      {course.buildingIds.length === 0 ||
                        (form.getValues("buildingIds")!.length === 0 && (
                          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                            <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                              <Building2 className="size-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground mb-2">
                              No buildings selected
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Select buildings where this course will be offered
                            </p>
                          </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Learning Goals */}
                <AccordionItem
                  key={"learning-goals"}
                  value="learning-goals"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-red-50 to-white hover:from-red-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Target className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Learning Goals
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Define what students will learn from this course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              Learning Objectives
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Define what students will learn from this course
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {learningGoalFields.length}/{MAX_LEARNING_GOALS}
                        </div>
                      </div>

                      {learningGoalFields.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                          <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                            <Plus className="size-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            No items added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              learningGoalAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              learningGoalFields.length >= MAX_LEARNING_GOALS
                            }
                            className="border-muted-foreground/50"
                          >
                            <Plus className="size-4 mr-2" />
                            Add First Item
                          </Button>
                        </div>
                      )}

                      <div className="space-y-3">
                        {learningGoalFields.map((field, index) => (
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
                                <p className="font-medium">Item {index + 1}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => learningGoalRemove(index)}
                                disabled={isMutating}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={control}
                                name={`learningGoals.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Text
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={
                                          "e.g., Reach target IELTS Band score 4.5"
                                        }
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
                                name={`learningGoals.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Icon URL (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          placeholder="https://lucide.dev/icons/"
                                          {...field}
                                          disabled={isMutating}
                                          className="border-muted-foreground/50 h-10 bg-background"
                                        />
                                        {field.value && (
                                          <img
                                            src={field.value}
                                            alt="icon preview"
                                            className="size-10 object-contain border rounded p-1 bg-white"
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

                      {learningGoalFields.length > 0 &&
                        learningGoalFields.length < MAX_LEARNING_GOALS && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              learningGoalAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating || learningGoalFields.length >= 5
                            }
                            className="w-full border-muted-foreground/50 border-dashed h-11"
                          >
                            <Plus className="size-4 mr-2" />
                            Add Another Item ({learningGoalFields.length}/
                            {MAX_LEARNING_GOALS})
                          </Button>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Syllabus */}
                <AccordionItem
                  value="syllabus"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <List className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Syllabus</p>
                        <p className="text-sm text-gray-500 font-normal">
                          Outline the topics and modules covered in the course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              Course Curriculum
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Outline the topics and modules covered in the course
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {syllabusFields.length}/{MAX_SYLLABUS}
                        </div>
                      </div>

                      {syllabusFields.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                          <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                            <Plus className="size-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            No items added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              syllabusAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              syllabusFields.length >= MAX_SYLLABUS
                            }
                            className="border-muted-foreground/50"
                          >
                            <Plus className="size-4 mr-2" />
                            Add First Item
                          </Button>
                        </div>
                      )}

                      <div className="space-y-3">
                        {syllabusFields.map((field, index) => (
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
                                <p className="font-medium">Item {index + 1}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => syllabusRemove(index)}
                                disabled={isMutating}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={control}
                                name={`syllabus.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Text
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={
                                          "e.g., Basic vocabulary and grammar for IELTS"
                                        }
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
                                name={`syllabus.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Icon URL (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          placeholder="https://lucide.dev/icons/"
                                          {...field}
                                          disabled={isMutating}
                                          className="border-muted-foreground/50 h-10 bg-background"
                                        />
                                        {field.value && (
                                          <img
                                            src={field.value}
                                            alt="icon preview"
                                            className="size-10 object-contain border rounded p-1 bg-white"
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

                      {syllabusFields.length > 0 &&
                        syllabusFields.length < 5 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              syllabusAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              syllabusFields.length >= MAX_SYLLABUS
                            }
                            className="w-full border-muted-foreground/50 border-dashed h-11"
                          >
                            <Plus className="size-4 mr-2" />
                            Add Another Item ({syllabusFields.length}/
                            {MAX_SYLLABUS})
                          </Button>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Teaching Methods */}
                <AccordionItem
                  value="teaching-methods"
                  key={"teaching-methods"}
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white hover:from-pink-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Teaching Methods
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Describe the methods and techniques used in teaching
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              Teaching Approaches
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Describe the methods and techniques used in teaching
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {teachingMethodFields.length}/{MAX_TEACHING_METHODS}
                        </div>
                      </div>

                      {teachingMethodFields.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                          <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                            <Plus className="size-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            No items added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              teachingMethodAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              teachingMethodFields.length >=
                                MAX_TEACHING_METHODS
                            }
                            className="border-muted-foreground/50"
                          >
                            <Plus className="size-4 mr-2" />
                            Add First Item
                          </Button>
                        </div>
                      )}

                      <div className="space-y-3">
                        {teachingMethodFields.map((field, index) => (
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
                                <p className="font-medium">Item {index + 1}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => teachingMethodRemove(index)}
                                disabled={isMutating}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={control}
                                name={`teachingMethods.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Text
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={
                                          "e.g., Weekly mini-test simulations"
                                        }
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
                                name={`teachingMethods.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Icon URL (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          placeholder="https://lucide.dev/icons/"
                                          {...field}
                                          disabled={isMutating}
                                          className="border-muted-foreground/50 h-10 bg-background"
                                        />
                                        {field.value && (
                                          <img
                                            src={field.value}
                                            alt="icon preview"
                                            className="size-10 object-contain border rounded p-1 bg-white"
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

                      {teachingMethodFields.length > 0 &&
                        teachingMethodFields.length < MAX_TEACHING_METHODS && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              teachingMethodAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating || teachingMethodFields.length >= 5
                            }
                            className="w-full border-muted-foreground/50 border-dashed h-11"
                          >
                            <Plus className="size-4 mr-2" />
                            Add Another Item ({teachingMethodFields.length}/
                            {MAX_TEACHING_METHODS})
                          </Button>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Resources */}
                <AccordionItem
                  value="resources"
                  key={"resources"}
                  className="border rounded-lg bg-white"
                >
                  {" "}
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <FileText className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Resources</p>
                        <p className="text-sm text-gray-500 font-normal">
                          List the resources and materials provided with the
                          course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              Learning Materials
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            List the resources and materials provided with the
                            course
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {resourcesFields.length}/{MAX_RESOURCES}
                        </div>
                      </div>

                      {resourcesFields.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                          <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                            <Plus className="size-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            No items added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              resourcesAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              resourcesFields.length >= MAX_RESOURCES
                            }
                            className="border-muted-foreground/50"
                          >
                            <Plus className="size-4 mr-2" />
                            Add First Item
                          </Button>
                        </div>
                      )}

                      <div className="space-y-3">
                        {resourcesFields.map((field, index) => (
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
                                <p className="font-medium">Item {index + 1}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => resourcesRemove(index)}
                                disabled={isMutating}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={control}
                                name={`resources.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Text
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={
                                          "e.g., Monthly progress report"
                                        }
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
                                name={`resources.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Icon URL (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          placeholder="https://lucide.dev/icons/"
                                          {...field}
                                          disabled={isMutating}
                                          className="border-muted-foreground/50 h-10 bg-background"
                                        />
                                        {field.value && (
                                          <img
                                            src={field.value}
                                            alt="icon preview"
                                            className="size-10 object-contain border rounded p-1 bg-white"
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

                      {resourcesFields.length > 0 &&
                        resourcesFields.length < 5 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              resourcesAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              resourcesFields.length >= MAX_RESOURCES
                            }
                            className="w-full border-muted-foreground/50 border-dashed h-11"
                          >
                            <Plus className="size-4 mr-2" />
                            Add Another Item ({resourcesFields.length}/
                            {MAX_RESOURCES})
                          </Button>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Target Audience */}
                <AccordionItem
                  value="target-audience"
                  key={"target-audience"}
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Target Audience
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Define the ideal students for this course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              Who This Course Is For?
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Define the ideal students for this course
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {targetAudienceFields.length}/{MAX_TARGET_AUDIENCE}
                        </div>
                      </div>

                      {targetAudienceFields.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                          <div className="mx-auto mb-4 size-12 bg-muted/50 rounded-full flex items-center justify-center">
                            <Plus className="size-6 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground mb-4">
                            No items added yet
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              targetAudienceAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              targetAudienceFields.length >= MAX_TARGET_AUDIENCE
                            }
                            className="border-muted-foreground/50"
                          >
                            <Plus className="size-4 mr-2" />
                            Add First Item
                          </Button>
                        </div>
                      )}

                      <div className="space-y-3">
                        {targetAudienceFields.map((field, index) => (
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
                                <p className="font-medium">Item {index + 1}</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => targetAudienceRemove(index)}
                                disabled={isMutating}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={control}
                                name={`targetAudience.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Text
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder={"e.g., Students"}
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
                                name={`targetAudience.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium">
                                      Icon URL (Optional)
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          placeholder="https://lucide.dev/icons/"
                                          {...field}
                                          disabled={isMutating}
                                          className="border-muted-foreground/50 h-10 bg-background"
                                        />
                                        {field.value && (
                                          <img
                                            src={field.value}
                                            alt="icon preview"
                                            className="size-10 object-contain border rounded p-1 bg-white"
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

                      {targetAudienceFields.length > 0 &&
                        targetAudienceFields.length < 5 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              targetAudienceAppend({ text: "", iconUrl: "" })
                            }
                            disabled={
                              isMutating ||
                              targetAudienceFields.length >= MAX_TARGET_AUDIENCE
                            }
                            className="w-full border-muted-foreground/50 border-dashed h-11"
                          >
                            <Plus className="size-4 mr-2" />
                            Add Another Item ({targetAudienceFields.length}/
                            {MAX_TARGET_AUDIENCE})
                          </Button>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Course Image */}
                <AccordionItem
                  value="course-image"
                  key={"course-image"}
                  className="border  rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 transition-colors text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Cover Image
                        </p>
                        <p className="text-sm text-gray-500 font-normal">
                          Upload a cover image for your course
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  {/* <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Upload a cover image for your course (Optional)
                      </p>
                      <div className="bg-muted/30 rounded-lg p-6 border border-muted-foreground/20">
                        <div className="flex gap-6 items-start">
                          {previewUrl ? (
                            <div className="size-20 relative rounded-lg overflow-hidden border-2 border-muted-foreground/20">
                              <Image
                                src={previewUrl}
                                alt="Course preview"
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
                              <p className="font-medium">Upload course image</p>
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

                                  if (file.size > 2 * 1024 * 1024) {
                                    toast.error("File size exceeds 2MB.");
                                    return;
                                  }

                                  const validTypes = [
                                    "image/jpeg",
                                    "image/png",
                                  ];
                                  if (!validTypes.includes(file.type)) {
                                    toast.error(
                                      "Invalid file type. Only JPG or PNG allowed."
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
                                    onClick={() =>
                                      fileInputRef.current?.click()
                                    }
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
                                      setPreviewUrl(null);
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
                  </AccordionContent> */}
                  <AccordionContent>
                    <GradientSeparator />
                    <div className="space-y-4 p-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];

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

                            handlePreview(file);
                          }
                        }}
                      />

                      {previewUrl ? (
                        <div className="space-y-4">
                          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-muted-foreground/20 bg-muted/50">
                            <Image
                              src={previewUrl}
                              alt="Course preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-3 right-3 flex gap-2">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isMutating}
                                className="shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white"
                              >
                                <ImageIcon className="size-4 mr-2" />
                                Change
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setPreviewUrl(null);
                                  setSelectedFile(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                                disabled={isMutating}
                                className="shadow-lg"
                              >
                                <Trash2 className="size-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <Check className="size-4 text-blue-600 flex-shrink-0" />
                            <span className="text-blue-700">
                              Image ready to upload. Click "Save Changes" to
                              apply.
                            </span>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isMutating}
                          className="w-full group"
                        >
                          <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-12 text-center transition-all hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                            <div className="mx-auto mb-4 size-16 bg-muted/50 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <ImageIcon className="size-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              Click to upload course image
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                              JPG, PNG or JPEG • Max 2MB
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Recommended size: 1200 × 675px (16:9 ratio)
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 pb-4 -mx-2 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    {isModified && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-yellow-800 font-medium">
                          You have unsaved changes
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {onCancel && (
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={onCancel}
                        disabled={isMutating}
                        className="min-w-[120px]"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isMutating || !isModified}
                      className={cn(
                        "min-w-[160px] gap-2",
                        !isModified && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isMutating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
