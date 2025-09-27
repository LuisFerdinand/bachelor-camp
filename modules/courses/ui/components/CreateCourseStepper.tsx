"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useFieldArray,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
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
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LayoutGridIcon,
  Loader2,
  Upload,
  X,
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
  AlertTriangle,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { courseCreateSchema, courses } from "@/db/schema";
import { uploadFiles } from "@/lib/uploadthing";
import { Combobox } from "@/components/ui/combobox";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  CourseCategory,
  courseCategoryEnum,
  CourseLevel,
  courseLevelEnum,
} from "@/db/schema/enums";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MAX_LEARNING_GOALS,
  MAX_RESOURCES,
  MAX_SYLLABUS,
  MAX_TARGET_AUDIENCE,
  MAX_TEACHING_METHODS,
} from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CourseFormValues = z.infer<typeof courseCreateSchema>;

interface StepProps {
  form: UseFormReturn<CourseFormValues>;
  isSubmitting: boolean;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

interface NavigationWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  targetStepTitle: string;
  currentStepTitle: string;
  hasUnsavedChanges: boolean;
}

// Navigation Warning Modal Component
const NavigationWarningModal: React.FC<NavigationWarningModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  targetStepTitle,
  currentStepTitle,
  hasUnsavedChanges,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Navigate to Incomplete Step?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 space-y-2">
            <p>
              You're about to navigate from{" "}
              <strong>"{currentStepTitle}"</strong> to{" "}
              <strong>"{targetStepTitle}"</strong>.
            </p>
            {hasUnsavedChanges && (
              <p className="text-amber-600 font-medium">
                ⚠️ The target step has validation errors that need to be fixed.
              </p>
            )}
            <p>
              Any unsaved changes in your current step may be lost. Make sure to
              complete all required fields before navigating away.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Stay Here
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          >
            Continue Navigation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function ResourcesStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const {
    fields: resourcesFields,
    append: resourcesAppend,
    remove: resourcesRemove,
  } = useFieldArray({
    control,
    name: "resources",
  });
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-800">
          <FileText className="w-5 h-5" />
          <p className="font-medium">Course Materials</p>
        </div>
        <p className="text-green-700 text-sm mt-1">
          List the resources, tools, and materials students will need or
          receive.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Resources:
        </h3>
        <Button
          onClick={() => resourcesAppend({ text: "", iconUrl: "" })}
          disabled={resourcesFields.length >= MAX_RESOURCES}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            resourcesFields.length >= MAX_RESOURCES
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          <Target className="w-4 h-4" />
          {resourcesFields.length >= MAX_RESOURCES
            ? "Max resources reached"
            : `Add Resources (${resourcesFields.length}/${MAX_RESOURCES})`}
        </Button>
      </div>

      <div className="space-y-4">
        {(resourcesFields || []).map((resources, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}.
                </span>
                <span className="font-medium text-gray-900">
                  Resources {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => resourcesRemove(index)}
                disabled={isSubmitting}
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
                      <RequiredLabel>Resources</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          "e.g., Quick progress review at the end of the program"
                        }
                        {...field}
                        disabled={isSubmitting}
                        className="border-muted-foreground/50 h-11 "
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11 "
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

        {(!resourcesFields || resourcesFields.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No resources added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add resources to help students understand what they'll achieve
            </p>
            <button
              onClick={() => resourcesAppend({ text: "", iconUrl: "" })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Resources
            </button>
          </div>
        )}
      </div>
      {resourcesFields.length > 0 && resourcesFields.length < MAX_RESOURCES && (
        <Button
          type="button"
          variant="outline"
          onClick={() => resourcesAppend({ text: "", iconUrl: "" })}
          disabled={isSubmitting || resourcesFields.length >= 5}
          className="w-full border-muted-foreground/50 border-dashed h-11"
        >
          <Plus className="size-4 mr-2" />
          Add Another Item ({resourcesFields.length}/{MAX_RESOURCES})
        </Button>
      )}
    </div>
  );
}

function TargetAudienceStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const {
    fields: targetAudienceFields,
    append: targetAudienceAppend,
    remove: targetAudienceRemove,
  } = useFieldArray({
    control,
    name: "targetAudience",
  });
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-indigo-800">
          <Users className="w-5 h-5" />
          <p className="font-medium">Target Students</p>
        </div>
        <p className="text-indigo-700 text-sm mt-1">
          Define who this course is designed for and any prerequisites.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Target Audience:
        </h3>
        <Button
          onClick={() => targetAudienceAppend({ text: "", iconUrl: "" })}
          disabled={targetAudienceFields.length >= MAX_TARGET_AUDIENCE}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            targetAudienceFields.length >= MAX_TARGET_AUDIENCE
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          <Target className="w-4 h-4" />
          {targetAudienceFields.length >= MAX_TARGET_AUDIENCE
            ? "Max target audience reached"
            : `Add Target (${targetAudienceFields.length}/${MAX_TARGET_AUDIENCE})`}
        </Button>
      </div>

      <div className="space-y-4">
        {(targetAudienceFields || []).map((targetAudience, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}.
                </span>
                <span className="font-medium text-gray-900">
                  Target Audience {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => targetAudienceRemove(index)}
                disabled={isSubmitting}
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
                      <RequiredLabel>Target Audience</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          "e.g., Students/professionals with limited time"
                        }
                        {...field}
                        disabled={isSubmitting}
                        className="border-muted-foreground/50 h-11 "
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11 "
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

        {(!targetAudienceFields || targetAudienceFields.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No targetAudience added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add target audience to help students understand what they'll
              achieve
            </p>
            <button
              onClick={() => targetAudienceAppend({ text: "", iconUrl: "" })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Target Audience
            </button>
          </div>
        )}
      </div>
      {targetAudienceFields.length > 0 &&
        targetAudienceFields.length < MAX_TARGET_AUDIENCE && (
          <Button
            type="button"
            variant="outline"
            onClick={() => targetAudienceAppend({ text: "", iconUrl: "" })}
            disabled={isSubmitting || targetAudienceFields.length >= 5}
            className="w-full border-muted-foreground/50 border-dashed h-11"
          >
            <Plus className="size-4 mr-2" />
            Add Another Item ({targetAudienceFields.length}/
            {MAX_TARGET_AUDIENCE})
          </Button>
        )}
    </div>
  );
}

type Step = {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface StepperProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  visitedSteps: Set<number>;
  stepValidation: Record<number, boolean>;
  onStepClick: (stepNumber: number) => void;
}

interface StepperCourseFormProps {
  onCancel?: () => void;
  onSuccess?: (courseId: string) => void;
  open: boolean;
}

export function BasicInfoStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");

  const getUniqueSlugQuery = trpc.courses.getUniqueSlug.useQuery(
    { title: watchedTitle || "" },
    {
      enabled: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    }
  );

  const updateSlug = useCallback(
    debounce(async (title: string) => {
      if (!title.trim()) {
        setValue("slug", "", { shouldValidate: false });
        return;
      }

      try {
        const res = await getUniqueSlugQuery.refetch();
        if (res.data) {
          setValue("slug", res.data, { shouldValidate: false }); // Don't trigger validation immediately
        }
      } catch (err) {
        console.error("Failed to get unique slug", err);
      }
    }, 500),
    [setValue, getUniqueSlugQuery]
  );

  useEffect(() => {
    updateSlug(watchedTitle || "");
  }, [watchedTitle, updateSlug]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          control={control}
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
                  disabled={isSubmitting}
                  className="border-muted-foreground/50 h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
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
          control={control}
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
                      disabled={isSubmitting}
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
                    <CommandEmpty>No product found.</CommandEmpty>
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
          control={control}
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
                      disabled={isSubmitting}
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
                    <CommandEmpty>No product found.</CommandEmpty>
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
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-0 mt-1">
              {" "}
              <FormLabel className="font-semibold flex items-center gap-1 mb-0.5">
                <RequiredLabel>Price</RequiredLabel>
              </FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value.toString()}
                  onValueChange={(values) => {
                    field.onChange(parseFloat(values.value));
                  }}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  allowNegative={false}
                  disabled={isSubmitting}
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
          control={control}
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
              const match = value.match(/^(\d+)\s+(day|week|month)s?$/i);
              if (match) {
                return {
                  number: parseInt(match[1], 10),
                  unit: match[2].toLowerCase() as DurationUnit,
                };
              }
              return { number: "", unit: "" };
            };

            const [localState, setLocalState] = useState<LocalDurationState>(
              () => parseExistingValue(field.value)
            );

            const updateDuration = (
              updates: Partial<LocalDurationState>
            ): void => {
              const newState = { ...localState, ...updates };
              setLocalState(newState);

              const { number, unit } = newState;
              if (number && unit && typeof number === "number") {
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const numberValue =
                          value === "" ? "" : parseInt(value, 10) || "";
                        updateDuration({ number: numberValue });
                      }}
                      disabled={isSubmitting}
                      className="border-muted-foreground/50 h-11 flex-1 rounded-r-none"
                    />
                    <Select
                      value={localState.unit || ""}
                      onValueChange={(unit: DurationUnit) =>
                        updateDuration({ unit })
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="border-muted-foreground/50 h-11 w-32 rounded-l-none">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day(s)</SelectItem>
                        <SelectItem value="week">Week(s)</SelectItem>
                        <SelectItem value="month">Month(s)</SelectItem>
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
          control={control}
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
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 1)
                  }
                  disabled={isSubmitting}
                  className="border-muted-foreground/50 h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of the course..."
                  {...field}
                  disabled={isSubmitting}
                  className="border-muted-foreground/50 min-h-[100px] resize-none mb-2"
                  maxLength={500}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-gray-500 mt-2">
          {watchedDescription?.length}/500 characters
        </p>
      </div>

      <FormField
        control={control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base font-semibold">
                Featured Course
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                Mark this course as featured to highlight it on the homepage
              </p>
            </div>
            <FormControl>
              <Switch
                checked={field.value === "true"}
                onCheckedChange={(checked) =>
                  field.onChange(checked ? "true" : "false")
                }
                disabled={isSubmitting}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

function BuildingsStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const { data: buildingList = [] } = trpc.buildings.getMany.useQuery();

  const selectedBuildings: string[] = watch("buildingIds") || [];

  const toggleBuilding = (buildingId: string) => {
    const updated = selectedBuildings.includes(buildingId)
      ? selectedBuildings.filter((id) => id !== buildingId)
      : [...selectedBuildings, buildingId];
    setValue("buildingIds", updated, { shouldValidate: true });
  };

  const [buildingSearchOpen, setBuildingSearchOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-blue-800 mb-3">
          <Building2 className="w-5 h-5" />
          <p className="font-semibold">Select Course Locations</p>
        </div>

        <Popover open={buildingSearchOpen} onOpenChange={setBuildingSearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={buildingSearchOpen}
              className="w-full justify-between h-12 bg-white border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              disabled={isSubmitting}
            >
              <span className="text-gray-900 font-medium">
                {selectedBuildings.length > 0
                  ? `${selectedBuildings.length} building${selectedBuildings.length > 1 ? "s" : ""} selected`
                  : "Choose buildings for this course"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0 max-h-80 overflow-hidden bg-white border-2 border-blue-200 shadow-xl rounded-xl"
            align="start"
            sideOffset={4}
          >
            <Command className="rounded-xl">
              <CommandInput
                placeholder="Search buildings..."
                className="h-12 px-4 border-0 border-b border-gray-100 text-sm"
              />
              <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                No buildings found matching your search.
              </CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto p-2 ">
                {buildingList.map((building) => (
                  <CommandItem
                    key={building.id}
                    onSelect={() => toggleBuilding(building.id)}
                    className="px-4 py-3 rounded-lg cursor-pointer  transition-colors hover:bg-blue-50 border"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Check
                        className={cn(
                          "h-4 w-4 flex-shrink-0 transition-opacity",
                          selectedBuildings.includes(building.id)
                            ? "opacity-100 text-blue-600"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 truncate">
                            {building.name}
                          </span>
                          {building.badge && (
                            <Badge
                              className="text-xs px-2 py-0.5"
                              style={{
                                backgroundColor: stringToColor(building.badge)
                                  .background,
                                color: stringToColor(building.badge).text,
                              }}
                            >
                              {building.badge}
                            </Badge>
                          )}
                        </div>
                        {building.description && (
                          <p className="text-sm text-gray-500 truncate">
                            {building.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <p className="text-blue-700 text-sm mt-3 leading-relaxed">
          Choose one or more buildings where this course will be offered.
          Students will be able to attend at any of these locations.
        </p>
      </div>

      {/* Selected Buildings Display */}
      {selectedBuildings.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Selected Locations:
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {selectedBuildings.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {selectedBuildings.map((buildingId) => {
              const building = buildingList.find((b) => b.id === buildingId);
              return building ? (
                <div
                  key={building.id}
                  className={`border-2 rounded-lg p-5 cursor-pointer transition-all duration-200 border-blue-500 bg-blue-50 shadow-md`}
                  onClick={() => toggleBuilding(building.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors bg-blue-500 border-blue-500
                      }`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">
                        {building.name}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {building.description}
                      </p>
                      {building.badge && (
                        <Badge
                          className="text-sm font-semibold shadow-sm"
                          style={{
                            backgroundColor: stringToColor(building.badge)
                              .background,
                            color: stringToColor(building.badge).text,
                            border: `1px solid ${stringToColor(building.badge).border}`,
                          }}
                        >
                          {building.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">
                {selectedBuildings.length} location
                {selectedBuildings.length !== 1 ? "s" : ""} configured
              </p>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              Your course will be available at multiple locations, giving
              students flexibility in choosing where to attend.
            </p>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No buildings selected
          </h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto leading-relaxed">
            Select at least one building where students can attend this course.
            You can choose multiple locations to give students flexibility.
          </p>
          <Button
            type="button"
            onClick={() => setBuildingSearchOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Select Buildings
          </Button>
        </div>
      )}
    </div>
  );
}

function LearningGoalsStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const {
    fields: learningGoalFields,
    append: learningGoalAppend,
    remove: learningGoalRemove,
  } = useFieldArray({
    control,
    name: "learningGoals",
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-amber-800">
          <Target className="w-5 h-5" />
          <p className="font-medium">Define Learning Outcomes</p>
        </div>
        <p className="text-amber-700 text-sm mt-1">
          What specific skills or knowledge will students gain? Be clear and
          measurable.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Learning Goals:
        </h3>
        <Button
          onClick={() => learningGoalAppend({ text: "", iconUrl: "" })}
          disabled={learningGoalFields.length >= MAX_LEARNING_GOALS}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            learningGoalFields.length >= MAX_LEARNING_GOALS
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          <Target className="w-4 h-4" />
          {learningGoalFields.length >= MAX_LEARNING_GOALS
            ? "Max goals reached"
            : `Add Learning Goal (${learningGoalFields.length}/${MAX_LEARNING_GOALS})`}
        </Button>
      </div>

      <div className="space-y-4">
        {(learningGoalFields || []).map((goal, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}.
                </span>
                <span className="font-medium text-gray-900">
                  Learning Goal {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => learningGoalRemove(index)}
                disabled={isSubmitting}
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
                      <RequiredLabel>Goal</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"e.g., Reach target IELTS Band score 4.5"}
                        {...field}
                        disabled={isSubmitting}
                        className="border-muted-foreground/50 h-11 "
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11 "
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

        {(!learningGoalFields || learningGoalFields.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No learning goals added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add goals to help students understand what they'll achieve
            </p>
            <button
              onClick={() => learningGoalAppend({ text: "", iconUrl: "" })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Learning Goal
            </button>
          </div>
        )}
      </div>
      {learningGoalFields.length > 0 &&
        learningGoalFields.length < MAX_LEARNING_GOALS && (
          <Button
            type="button"
            variant="outline"
            onClick={() => learningGoalAppend({ text: "", iconUrl: "" })}
            disabled={isSubmitting || learningGoalFields.length >= 5}
            className="w-full border-muted-foreground/50 border-dashed h-11"
          >
            <Plus className="size-4 mr-2" />
            Add Another Item ({learningGoalFields.length}/{MAX_LEARNING_GOALS})
          </Button>
        )}
    </div>
  );
}

function SyllabusStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const {
    fields: syllabusFields,
    append: syllabusAppend,
    remove: syllabusRemove,
  } = useFieldArray({
    control,
    name: "syllabus",
  });

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-purple-800">
          <List className="w-5 h-5" />
          <p className="font-medium">Course Curriculum</p>
        </div>
        <p className="text-purple-700 text-sm mt-1">
          Outline the topics and modules that will be covered in your course.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Syllabus:
        </h3>
        <Button
          onClick={() => syllabusAppend({ text: "", iconUrl: "" })}
          disabled={syllabusFields.length >= MAX_SYLLABUS}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            syllabusFields.length >= MAX_SYLLABUS
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          <Target className="w-4 h-4" />
          {syllabusFields.length >= MAX_SYLLABUS
            ? "Max syllabus reached"
            : `Add Syllabus (${syllabusFields.length}/${MAX_SYLLABUS})`}
        </Button>
      </div>

      <div className="space-y-4">
        {(syllabusFields || []).map((syllabus, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}.
                </span>
                <span className="font-medium text-gray-900">
                  Syllabus {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => syllabusRemove(index)}
                disabled={isSubmitting}
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
                      <RequiredLabel>Syllabus</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          "e.g., Basic vocabulary and grammar for IELTS"
                        }
                        {...field}
                        disabled={isSubmitting}
                        className="border-muted-foreground/50 h-11 "
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11 "
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

        {(!syllabusFields || syllabusFields.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No syllabus added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add syllabus to help students understand what they'll achieve
            </p>
            <button
              onClick={() => syllabusAppend({ text: "", iconUrl: "" })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Syllabus
            </button>
          </div>
        )}
      </div>
      {syllabusFields.length > 0 && syllabusFields.length < MAX_SYLLABUS && (
        <Button
          type="button"
          variant="outline"
          onClick={() => syllabusAppend({ text: "", iconUrl: "" })}
          disabled={isSubmitting || syllabusFields.length >= 5}
          className="w-full border-muted-foreground/50 border-dashed h-11"
        >
          <Plus className="size-4 mr-2" />
          Add Another Item ({syllabusFields.length}/{MAX_SYLLABUS})
        </Button>
      )}
    </div>
  );
}

function TeachingMethodsStep({ form, isSubmitting }: StepProps) {
  const { control, setValue, watch } = form;

  const {
    fields: teachingMethodFields,
    append: teachingMethodAppend,
    remove: teachingMethodRemove,
  } = useFieldArray({
    control,
    name: "teachingMethods",
  });
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-800">
          <Lightbulb className="w-5 h-5" />
          <p className="font-medium">Teaching Approaches</p>
        </div>
        <p className="text-yellow-700 text-sm mt-1">
          Describe the methods and techniques you'll use to deliver the course
          content.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Teaching Methods:
        </h3>
        <Button
          onClick={() => teachingMethodAppend({ text: "", iconUrl: "" })}
          disabled={teachingMethodFields.length >= MAX_TEACHING_METHODS}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            teachingMethodFields.length >= MAX_TEACHING_METHODS
              ? "bg-gray-300 text-gray-500 cursor-not-allowed border-none"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          <Target className="w-4 h-4" />
          {teachingMethodFields.length >= MAX_TEACHING_METHODS
            ? "Max teaching method reached"
            : `Add Teaching (${teachingMethodFields.length}/${MAX_TEACHING_METHODS})`}
        </Button>
      </div>

      <div className="space-y-4">
        {(teachingMethodFields || []).map((teachingMethod, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}.
                </span>
                <span className="font-medium text-gray-900">
                  Teaching Method {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => teachingMethodRemove(index)}
                disabled={isSubmitting}
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
                      <RequiredLabel>Teaching Method</RequiredLabel>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          "e.g., Immediate feedback for Writing & Speaking"
                        }
                        {...field}
                        disabled={isSubmitting}
                        className="border-muted-foreground/50 h-11 "
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
                          disabled={isSubmitting}
                          className="border-muted-foreground/50 h-11 "
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

        {(!teachingMethodFields || teachingMethodFields.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No teachingMethod added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add teaching method to help students understand what they'll
              achieve
            </p>
            <button
              onClick={() => teachingMethodAppend({ text: "", iconUrl: "" })}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Teaching Method
            </button>
          </div>
        )}
      </div>
      {teachingMethodFields.length > 0 &&
        teachingMethodFields.length < MAX_TEACHING_METHODS && (
          <Button
            type="button"
            variant="outline"
            onClick={() => teachingMethodAppend({ text: "", iconUrl: "" })}
            disabled={isSubmitting || teachingMethodFields.length >= 5}
            className="w-full border-muted-foreground/50 border-dashed h-11"
          >
            <Plus className="size-4 mr-2" />
            Add Another Item ({teachingMethodFields.length}/
            {MAX_TEACHING_METHODS})
          </Button>
        )}
    </div>
  );
}

export const StepperCourseForm = ({
  onCancel,
  onSuccess,
  open,
}: StepperCourseFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  const [highestReachedStep, setHighestReachedStep] = useState(1);

  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<number | null>(
    null
  );

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      slug: "",
      title: "",
      category: undefined,
      level: undefined,
      duration: "",
      totalSessions: 0,
      description: "",
      learningGoals: [],
      syllabus: [],
      teachingMethods: [],
      resources: [],
      targetAudience: [],
      price: 0,
      isFeatured: "false",
    },
  });

  const { control, setValue, watch } = form;
  const courseCreate = trpc.courses.create.useMutation();

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Configure the main details of your course",
      icon: BookOpen,
      component: BasicInfoStep,
    },
    {
      id: 2,
      title: "Buildings",
      description:
        "Location Select buildings where this course will be offered",
      icon: Building2,
      component: BuildingsStep,
    },
    {
      id: 3,
      title: "Learning Goals",
      description: "Define what students will learn from this course",
      icon: Target,
      component: LearningGoalsStep,
    },
    {
      id: 4,
      title: "Syllabus",
      description: "Outline the topics and modules covered in the course",
      icon: List,
      component: SyllabusStep,
    },
    {
      id: 5,
      title: "Methods",
      description: "Describe the methods and techniques used in teaching",
      icon: Lightbulb,
      component: TeachingMethodsStep,
    },
    {
      id: 6,
      title: "Resources",
      description: "List the resources and materials provided with the course",
      icon: FileText,
      component: ResourcesStep,
    },
    {
      id: 7,
      title: "Audience",
      description: "Define the ideal students for this course",
      icon: Users,
      component: TargetAudienceStep,
    },
    {
      id: 8,
      title: "Cover Image",
      description: "Upload a cover image for your course",
      icon: ImageIcon,
      component: UploadImageStep,
    },
  ];
  const getStepValidation = useMemo(() => {
    const validateStep = (stepNumber: number): boolean => {
      const values = form.getValues();

      // Force a fresh read of the form values
      const formState = form.getFieldState("learningGoals");

      switch (stepNumber) {
        case 1:
          return !!(
            values.title?.trim() &&
            values.slug?.trim() &&
            values.category &&
            values.level &&
            values.duration?.trim() &&
            values.totalSessions > 0 &&
            values.price >= 0
          );

        case 2:
          return true;

        case 3:
          // Get fresh learning goals data
          const learningGoals = values.learningGoals || [];
          const hasGoals = learningGoals.length > 0;
          const allGoalsValid = learningGoals.every((goal) => {
            const hasText = goal && goal.text && goal.text.trim().length > 0;
            return hasText;
          });

          const isValid = hasGoals && allGoalsValid;

          // Debug logging
          console.log("Step 3 Validation Debug:", {
            learningGoals,
            hasGoals,
            allGoalsValid,
            isValid,
            formIsDirty: formState.isDirty,
            formError: formState.error,
          });

          return isValid;

        case 4:
          const syllabus = values.syllabus || [];
          return (
            syllabus.length > 0 &&
            syllabus.every(
              (item) => item && item.text && item.text.trim().length > 0
            )
          );

        case 5:
          const teachingMethods = values.teachingMethods || [];
          return (
            teachingMethods.length > 0 &&
            teachingMethods.every(
              (method) => method && method.text && method.text.trim().length > 0
            )
          );

        case 6:
          const resources = values.resources || [];
          return (
            resources.length > 0 &&
            resources.every(
              (resource) =>
                resource && resource.text && resource.text.trim().length > 0
            )
          );

        case 7:
          const targetAudience = values.targetAudience || [];
          return (
            targetAudience.length > 0 &&
            targetAudience.every(
              (audience) =>
                audience && audience.text && audience.text.trim().length > 0
            )
          );

        case 8:
          return true;

        default:
          return true;
      }
    };

    const validationResults = steps.reduce(
      (acc, step) => {
        acc[step.id] = validateStep(step.id);
        return acc;
      },
      {} as Record<number, boolean>
    );

    console.log("All Step Validations:", validationResults);
    return validationResults;
  }, [
    // Use useWatch for more reliable form state tracking
    form.watch(), // This watches all form fields
    steps,
  ]);
  const hasUnsavedChanges = (stepNumber: number): boolean => {
    // You can implement more sophisticated logic here
    // For now, we'll check if the current step is invalid and has been interacted with
    return !getStepValidation[stepNumber] && visitedSteps.has(stepNumber);
  };

  const completedSteps = useMemo(() => {
    const completed = Object.entries(getStepValidation)
      .filter(([_, isValid]) => isValid)
      .map(([stepId]) => parseInt(stepId));
    console.log("✅ Completed Steps:", completed);
    return completed;
  }, [getStepValidation]);

  const handlePreview = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  const onSubmit = async (values: z.infer<typeof courseCreateSchema>) => {
    const toastId = toast.loading("Creating course...");
    setIsSubmitting(true);

    try {
      const data = await courseCreate.mutateAsync({
        ...values,
      });

      if (selectedFile) {
        toast.loading("Uploading course image...", { id: toastId });

        const res = await uploadFiles("courseImageUploader", {
          files: [selectedFile],
          input: { courseId: data.id },
        });

        if (!res[0]) throw new Error("Failed to upload course image.");
      }

      utils.courses.getFiltered.invalidate();
      toast.success("Course created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating course.", { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

  const performNavigation = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    setVisitedSteps((prev) => new Set([...prev, stepNumber]));

    if (stepNumber > highestReachedStep) {
      setHighestReachedStep(stepNumber);
    }
  };

  // Track visited steps when user navigates
  const handleStepClick = (stepNumber: number) => {
    console.log("👆 HandleStepClick Debug:", {
      targetStep: stepNumber,
      currentStep,
      targetStepValid: getStepValidation[stepNumber],
      visitedSteps: Array.from(visitedSteps),
      completedSteps,
      highestReachedStep,
    });

    const canNavigateToStep = (targetStep: number): boolean => {
      if (targetStep === currentStep) return true;
      if (visitedSteps.has(targetStep)) return true;
      if (completedSteps.includes(targetStep)) return true;
      if (targetStep === currentStep + 1 && getStepValidation[currentStep])
        return true;
      if (targetStep <= highestReachedStep) return true;
      return false;
    };

    const canNavigate = canNavigateToStep(stepNumber);
    console.log("🚀 Navigation Decision:", { stepNumber, canNavigate });

    if (!canNavigate) {
      console.log("❌ Navigation blocked");
      return;
    }

    const targetStepNeedsWarning =
      stepNumber !== currentStep &&
      visitedSteps.has(stepNumber) &&
      !getStepValidation[stepNumber];

    const currentStepHasUnsaved = hasUnsavedChanges(currentStep);

    console.log("⚠️ Warning Check:", {
      targetStepNeedsWarning,
      currentStepHasUnsaved,
    });

    if (targetStepNeedsWarning || currentStepHasUnsaved) {
      setPendingNavigation(stepNumber);
      setShowNavigationWarning(true);
      return;
    }

    performNavigation(stepNumber);
  };

  const handleNavigationConfirm = () => {
    if (pendingNavigation !== null) {
      performNavigation(pendingNavigation);
    }
    setShowNavigationWarning(false);
    setPendingNavigation(null);
  };

  // Handle modal cancellation
  const handleNavigationCancel = () => {
    setShowNavigationWarning(false);
    setPendingNavigation(null);
  };

  const handleNext = (e?: React.MouseEvent) => {
    // Prevent any default form submission behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("HandleNext Debug:", {
      currentStep,
      totalSteps: steps.length,
      currentStepValid: getStepValidation[currentStep],
      canProceed: getStepValidation[currentStep] && currentStep < steps.length,
    });

    if (getStepValidation[currentStep] && currentStep < steps.length) {
      const nextStep = currentStep + 1;
      performNavigation(nextStep);
    } else {
      toast.error("Please complete all required fields before continuing.");
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      performNavigation(prevStep);
    }
  };

  const getStepTitle = (stepNumber: number): string => {
    const step = steps.find((s) => s.id === stepNumber);
    return step?.title || `Step ${stepNumber}`;
  };

  const StepComponent = currentStepData.component;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <NavigationWarningModal
        isOpen={showNavigationWarning}
        onClose={handleNavigationCancel}
        onConfirm={handleNavigationConfirm}
        targetStepTitle={getStepTitle(pendingNavigation || 0)}
        currentStepTitle={getStepTitle(currentStep)}
        hasUnsavedChanges={
          pendingNavigation !== null &&
          !getStepValidation[pendingNavigation || 0]
        }
      />

      {/* Header */}
      <div className="text-center">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create New Course
        </h1>
        <p className="text-lg text-gray-600">
          Follow the steps below to create your comprehensive course
        </p>

        {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm">
          <p>
            <strong>Current Step:</strong> {currentStep}
          </p>
          <p>
            <strong>Step 3 Valid:</strong>{" "}
            {JSON.stringify(getStepValidation[3])}
          </p>
          <p>
            <strong>Learning Goals:</strong>{" "}
            {JSON.stringify(form.watch("learningGoals"))}
          </p>
          <p>
            <strong>Completed Steps:</strong> {JSON.stringify(completedSteps)}
          </p>
          <p>
            <strong>Visited Steps:</strong>{" "}
            {JSON.stringify(Array.from(visitedSteps))}
          </p>
          <p>
            <strong>Highest Reached:</strong> {highestReachedStep}
          </p>
        </div> */}
      </div>

      {/* Progress Stepper */}
      <StepperProgress
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        visitedSteps={visitedSteps}
        stepValidation={getStepValidation}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            // Prevent Enter key from submitting the form unless we're on the last step
            if (e.key === "Enter" && currentStep !== steps.length) {
              e.preventDefault();
            }
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-8 border">
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <currentStepData.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      {currentStepData.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {currentStepData.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Step {currentStep} of {steps.length}
                  </div>
                </div>
              </div>
              <GradientSeparator className="my-4"></GradientSeparator>

              {currentStep === 8 ? (
                <UploadImageStep
                  form={form}
                  isSubmitting={isSubmitting}
                  previewUrl={previewUrl}
                  selectedFile={selectedFile}
                  fileInputRef={fileInputRef}
                  handlePreview={handlePreview}
                  setPreviewUrl={setPreviewUrl}
                  setSelectedFile={setSelectedFile}
                />
              ) : (
                <StepComponent
                  form={form}
                  isSubmitting={isSubmitting}
                  previewUrl={null}
                  selectedFile={null}
                  fileInputRef={undefined}
                  handlePreview={function (file: File): void {
                    throw new Error("Function not implemented.");
                  }}
                  setPreviewUrl={function (url: string | null): void {
                    throw new Error("Function not implemented.");
                  }}
                  setSelectedFile={function (file: File | null): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <Button
                  onClick={handlePrevious}
                  size={"lg"}
                  type="button"
                  variant={"outline"}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: steps.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {currentStep === steps.length ? (
                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3  rounded-lg font-medium  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Course...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Create Course
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    type="button"
                    size={"lg"}
                    disabled={!getStepValidation[currentStep]}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      getStepValidation[currentStep]
                        ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-600"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      !getStepValidation[currentStep]
                        ? "Complete all required fields to continue"
                        : ""
                    }
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

const StepperProgress: React.FC<StepperProgressProps> = ({
  steps,
  currentStep,
  completedSteps,
  visitedSteps,
  stepValidation,
  onStepClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-around overflow-x-auto pb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          const isValid = stepValidation[stepNumber];
          const isVisited = visitedSteps.has(stepNumber);

          const isAccessible = () => {
            // Current step is always accessible
            if (isCurrent) return true;

            // Completed steps are always accessible
            if (isCompleted) return true;

            // Previously visited steps are always accessible
            if (isVisited) return true;

            // Next step is accessible if current step is valid
            if (stepNumber === currentStep + 1 && stepValidation[currentStep]) {
              return true;
            }

            return false;
          };

          const accessible = isAccessible();

          // Determine step state for styling
          const getStepState = () => {
            if (isCompleted) return "completed";
            if (isCurrent) return "current";
            if (isVisited && !isValid) return "visited-invalid";
            if (isVisited && isValid) return "visited-valid";
            if (accessible) return "accessible";
            return "disabled";
          };

          const stepState = getStepState();

          const getStepStyles = () => {
            switch (stepState) {
              case "completed":
                return "bg-green-500 border-green-500 text-white shadow-lg scale-100 cursor-pointer hover:bg-green-600";
              case "current":
                return "bg-blue-500 border-blue-500 text-white shadow-lg scale-100 cursor-pointer ring-2 ring-blue-200";
              case "visited-invalid":
                return "bg-amber-100 border-amber-400 text-amber-700 scale-95 cursor-pointer hover:border-amber-500 hover:bg-amber-200";
              case "visited-valid":
                return "bg-blue-100 border-blue-400 text-blue-700 scale-100 cursor-pointer hover:border-blue-500 hover:bg-blue-200";
              case "accessible":
                return "border-gray-300 text-gray-500 hover:border-blue-300 hover:scale-100 cursor-pointer hover:bg-gray-50";
              default:
                return "border-gray-200 text-gray-300 opacity-50 cursor-not-allowed scale-95";
            }
          };
          const getTitleStyles = () => {
            switch (stepState) {
              case "completed":
                return "text-green-600 font-medium";
              case "current":
                return "text-blue-600 font-semibold";
              case "visited-invalid":
                return "text-amber-600";
              case "visited-valid":
                return "text-blue-600";
              case "accessible":
                return "text-gray-600";
              default:
                return "text-gray-400";
            }
          };

          const getStatusText = () => {
            switch (stepState) {
              case "completed":
                return "Complete";
              case "current":
                return "Current";
              case "visited-invalid":
                return "Needs Review";
              case "visited-valid":
                return "Valid";
              case "accessible":
                return "Available";
              default:
                return "Locked";
            }
          };

          return (
            <div
              key={step.id}
              className={`flex items-center justify-start ${
                index === steps.length - 1 ? "" : "flex-1"
              }`}
            >
              <div className="flex flex-col items-center flex-shrink-0 w-24">
                <div
                  onClick={() => accessible && onStepClick(stepNumber)}
                  className={`flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-200 ${getStepStyles()}`}
                  title={`${step.title} - ${getStatusText()}`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : stepState === "visited-invalid" ? (
                    <X className="w-5 h-5" />
                  ) : stepState === "visited-valid" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="mt-2 text-center w-full">
                  <p className={`text-xs font-medium ${getTitleStyles()}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {getStatusText()}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center px-2">
                  <div
                    className={`h-0.5 w-full transition-colors ${
                      stepNumber <= Math.max(...completedSteps, currentStep)
                        ? "bg-blue-300"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Click on any visited step to navigate back and make changes
        </p>
      </div>
    </div>
  );
};

interface UploadImageStepProps {
  form: UseFormReturn<CourseFormValues>;
  isSubmitting: boolean;
  previewUrl: string | null;
  selectedFile: File | null;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  handlePreview: (file: File) => void;
  setPreviewUrl: (url: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}

function UploadImageStep({
  form,
  isSubmitting,
  previewUrl,
  selectedFile,
  fileInputRef,
  handlePreview,
  setPreviewUrl,
  setSelectedFile,
}: UploadImageStepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit.");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPG, PNG allowed.");
        return;
      }

      handlePreview(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef!.current) {
      fileInputRef!.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];

      // Same validation as file input
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit.");
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPG, PNG allowed.");
        return;
      }

      handlePreview(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-800">
          <ImageIcon className="w-5 h-5" />
          <p className="font-medium">Course Cover Image</p>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Upload an engaging cover image for your course. This will be displayed
          on course cards and details page.
        </p>
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Course Cover Image (Optional)
        </h3>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          {previewUrl ? (
            // Preview State
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                  <Image
                    src={previewUrl}
                    alt="Course cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center space-y-4">
                <div>
                  <p className="font-medium text-gray-900">
                    Image uploaded successfully!
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedFile?.name} (
                    {(selectedFile?.size! / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef!.current?.click()}
                    disabled={isSubmitting}
                    className="border-gray-300"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveImage}
                    disabled={isSubmitting}
                    className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Image
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Upload State
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef!.current?.click()}
            >
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-lg font-medium text-gray-900">
                  Upload course cover image
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop your image here, or click to browse
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                  disabled={isSubmitting}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>

                <div className="text-xs text-gray-400 space-y-1">
                  <p>Supported formats: JPG, PNG</p>
                  <p>Maximum file size: 2MB</p>
                  <p>
                    Recommended dimensions: 1200x675 pixels (16:9 aspect ratio)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="font-medium text-gray-900 mb-2">💡 Image Tips</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • Use high-quality, relevant images that represent your course
              content
            </li>
            <li>
              • Ensure the image looks good at different sizes (thumbnail to
              full width)
            </li>
            <li>
              • Avoid images with too much text as they may be hard to read when
              scaled
            </li>
            <li>• Consider using bright, engaging colors that stand out</li>
          </ul>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        disabled={isSubmitting}
      />
    </div>
  );
}

export default UploadImageStep;
