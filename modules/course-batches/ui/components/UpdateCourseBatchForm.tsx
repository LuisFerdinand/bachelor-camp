"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  BookOpen,
  Settings,
  AlertTriangle,
  Plus,
  Trash2,
  Check,
  Loader2,
  Save,
  RefreshCw,
  Info,
  ArrowRight,
  Users,
  Zap,
  Calendar as CalendarIcon,
  CheckCircle,
  List,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { courseBatchUpdateSchema } from "@/db/schema";
import {
  COURSE_BATCH_STATUSES,
  DAY_OF_WEEK,
  DELIVERY_MODES,
} from "@/db/schema/enums";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";
import { useCourseBatchAction } from "./CourseBatchContext";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RequiredLabel } from "@/components/RequiredLabel";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TimePicker } from "@/components/Inputs/TimePicker";

type UpdateCourseBatchFormValues = z.infer<typeof courseBatchUpdateSchema>;

const dayLabels: Record<(typeof DAY_OF_WEEK)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

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

const CalendarDatePicker: React.FC<{
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthYear = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const days = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onChange(date.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const isSelectedDate = (day: number) => {
    if (!value || !day) return false;
    const selectedDate = new Date(value);
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const displayValue = value
    ? new Date(value).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Select a date";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg bg-white text-gray-900 text-left font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {displayValue}
      </button>
      <CalendarIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />

      {isOpen && !disabled && (
        <>
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {monthYear}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1
                    )
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day && handleDateClick(day)}
                  disabled={!day}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    !day
                      ? "bg-transparent"
                      : isSelectedDate(day)
                        ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                        : "hover:bg-blue-50 text-gray-700 border border-transparent hover:border-blue-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

interface UpdateCourseBatchFormProps {
  onCancel?: () => void;
  onSuccess?: (courseBatchId: string) => void;
  open: boolean;
  courseBatchId: string;
}

export const UpdateCourseBatchForm = (props: UpdateCourseBatchFormProps) => {
  return (
    <Suspense fallback={<>Load</>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateCourseBatchFormSuspense
          {...props}
        ></UpdateCourseBatchFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateCourseBatchFormSuspense = ({
  onCancel,
  onSuccess,
  open,
  courseBatchId,
}: UpdateCourseBatchFormProps) => {
  const utils = trpc.useUtils();
  const { isMutating, setIsMutating } = useCourseBatchAction();

  const [courseBatchData] = trpc.courseBatches.getOneProtected.useSuspenseQuery(
    {
      courseBatchId: courseBatchId,
    }
  );

  const courseBatch = courseBatchData?.courseBatch;
  const weeklySchedulesData = courseBatchData?.weeklySchedules || [];
  const sessionsData = courseBatchData?.sessions || [];
  const sessionsMeta = courseBatchData?.meta;

  const [hasUnsavedScheduleChanges, setHasUnsavedScheduleChanges] =
    useState(false);
  const [sessionsRegenerated, setSessionsRegenerated] = useState(true);

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [displayedSessions, setDisplayedSessions] = useState(8);
  const [initialSchedules, setInitialSchedules] = useState<any>(null);
  const [previewSessions, setPreviewSessions] = useState<any[]>([]);

  const truncateSeconds = (t?: string | null) =>
    t ? (t.length >= 5 ? t.substring(0, 5) : t) : undefined;

  const form = useForm<UpdateCourseBatchFormValues>({
    resolver: zodResolver(courseBatchUpdateSchema),
    defaultValues: {
      startDate: courseBatch.startDate,
      capacity: courseBatch.capacity || 0,
      deliveryMode: courseBatch.deliveryMode,
      price: courseBatch.price,
      status: courseBatch.status,
      weeklySchedules:
        weeklySchedulesData?.map((w) => ({
          dayOfWeek: w.dayOfWeek,
          startTime: truncateSeconds(w.startTime),
          endTime: truncateSeconds(w.endTime),
          isClosed: w.isClosed,
          notes: w.notes ?? undefined,
          location: w.location ?? undefined,
        })) ?? [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    // Store initial schedules
    setInitialSchedules(form.getValues("weeklySchedules"));
    // Initialize preview sessions with original sessions
    setPreviewSessions(sessionsData);
  }, []);

  const {
    control,
    setValue,
    watch,
    formState,
    formState: { errors },
  } = form;
  const { fields, append, remove, update } = useFieldArray({
    control: control,
    name: "weeklySchedules",
  });

  const watchedStartDate = watch("startDate");
  const watchedSchedules = watch("weeklySchedules");

  const isModified = formState.isDirty;

  const updateCourseBatch = trpc.courseBatches.update.useMutation();

  // Track schedule changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith("weeklySchedules")) {
        const currentSchedules = value.weeklySchedules ?? [];

        const hasChanges =
          JSON.stringify(currentSchedules) !==
          JSON.stringify(initialSchedules ?? []);

        setHasUnsavedScheduleChanges(hasChanges);
        if (hasChanges) setSessionsRegenerated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, initialSchedules]);

  // Calculate end date
  const calculatedEndDate = useMemo(() => {
    if (!watchedStartDate || watchedSchedules!.length === 0) return null;
    const start = new Date(watchedStartDate);
    let sessionsCount = 0;
    let currentDate = new Date(start);

    while (sessionsCount < courseBatch.totalSessions!) {
      const dayIndex =
        currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
      const daySchedulesCount = watchedSchedules!.filter(
        (s) =>
          DAY_OF_WEEK.indexOf(s.dayOfWeek as any) === dayIndex &&
          s.isClosed === "false"
      ).length;
      sessionsCount += daySchedulesCount;
      if (sessionsCount < courseBatch.totalSessions!) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return currentDate.toISOString().split("T")[0];
  }, [watchedStartDate, watchedSchedules]);

  const schedulesByDay = useMemo(() => {
    const grouped: Record<string, any[]> = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    fields.forEach((field, index) => {
      grouped[field.dayOfWeek].push({ ...field, index });
    });
    return grouped;
  }, [fields]);

  // Generate preview sessions based on current form values
  const generatePreviewSessions = (schedules: any[], startDate: string) => {
    const sessions = [];
    const start = new Date(startDate);
    let sessionOrder = 1;
    let currentDate = new Date(start);

    while (sessionOrder <= courseBatch.totalSessions!) {
      const dayIndex =
        currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
      const dayName = Object.keys(dayLabels)[dayIndex];

      const daySchedules = schedules.filter(
        (s) => s.dayOfWeek === dayName && s.isClosed === "false"
      );

      for (const schedule of daySchedules) {
        if (sessionOrder <= courseBatch.totalSessions!) {
          const dateStr = currentDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          sessions.push({
            id: `preview-${sessionOrder}`,
            order: sessionOrder,
            day: dayLabels[dayName as keyof typeof dayLabels],
            date: dateStr,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            location: schedule.location || "",
            notes: schedule.notes || "",
          });
          sessionOrder++;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return sessions;
  };

  const handleRegenerateSessions = async () => {
    setIsRegenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newPreviewSessions = generatePreviewSessions(
      watchedSchedules ?? [],
      watchedStartDate ?? ""
    );

    setPreviewSessions(newPreviewSessions);
    setDisplayedSessions(8);

    setIsRegenerating(false);
    setHasUnsavedScheduleChanges(false);
    setSessionsRegenerated(true);
    toast.success("Sessions regenerated successfully!");
  };

  const handleDiscardScheduleChanges = () => {
    if (initialSchedules) {
      form.setValue("weeklySchedules", initialSchedules);
      form.trigger("weeklySchedules");
      setHasUnsavedScheduleChanges(false);
      setSessionsRegenerated(true);
      setPreviewSessions(sessionsData);
      setInitialSchedules(initialSchedules);
      toast.success("Schedule changes discarded");
    }
  };

  const sessionsToDisplay = sessionsRegenerated
    ? previewSessions
    : sessionsData;

  const onSubmit = async (values: z.infer<typeof courseBatchUpdateSchema>) => {
    // Check if schedule changes exist but not regenerated
    console.log("Submit");
    toast.success("Submit");
    if (hasUnsavedScheduleChanges && !sessionsRegenerated) {
      toast.error("Please regenerate sessions before saving");
      return;
    }

    const toastId = toast.loading("Update course batch...");
    setIsSaving(true);
    setIsMutating(true);

    try {
      const updatedCourseBatch = await updateCourseBatch.mutateAsync({
        id: courseBatchId,
        ...values,
      });

      utils.courseBatches.getFiltered.invalidate();
      utils.courseBatches.getOneProtected.invalidate({ courseBatchId });
      toast.success("Course batch updated successfully!", { id: toastId });
      onSuccess?.(courseBatchId);
    } catch (error: any) {
      toast.error(error.message || "Update failed", { id: toastId });
      console.error(error);
    } finally {
      setIsMutating(false);
      setIsSaving(false);
    }
  };

  return (
    <div className="p-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Update Course Batch
              </h1>
              <p className="text-blue-100 text-sm">
                Modify batch settings and schedule
              </p>
            </div>
          </div>
        </div>
        {/* Status Indicators */}
        <div className="mt-4 flex items-center gap-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                isModified ? "bg-yellow-300 animate-pulse" : "bg-green-300"
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 w-full"
            >
              {JSON.stringify(form.getValues())}
              {/* Accordion Structure */}
              <Accordion
                type="multiple"
                defaultValue={["course-details"]}
                className="w-full space-y-4"
              >
                <AccordionItem
                  value="course-details"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 transition-colors text-lg font-semibold">
                    <button type="button">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">
                            Course Details
                          </p>
                          <p className="text-sm text-gray-500">
                            Reference information about the course
                          </p>
                        </div>
                      </div>
                    </button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Course Title
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {courseBatch.courseTitle}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Level
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {courseBatch.courseLevel}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Total Sessions
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {courseBatch.totalSessions}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Base Price
                          </p>
                          <p className="text-sm font-semibold text-blue-600">
                            Rp {courseBatch.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Duration
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {courseBatch.courseDuration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="batch-details"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 transition-colors text-lg font-semibold">
                    <button type="button">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <Settings className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">
                            Batch Settings
                          </p>
                          <p className="text-sm text-gray-500">
                            Configure capacity, pricing, and dates
                          </p>
                        </div>
                      </div>
                    </button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <CalendarDatePicker
                            value={form.watch("startDate")!}
                            onChange={(date) =>
                              form.setValue("startDate", date)
                            }
                            disabled={isSaving}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            End Date
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              disabled
                              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-left font-medium cursor-not-allowed"
                            >
                              {calculatedEndDate
                                ? new Date(
                                    calculatedEndDate
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Calculated automatically"}
                            </button>
                            <CalendarIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <FormField
                          control={form.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">
                                <RequiredLabel>Capacity</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter capacity"
                                  {...field}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-11"
                                  disabled={isSaving || isMutating}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="deliveryMode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={`font-semibold `}>
                                <RequiredLabel>Delivery Mode</RequiredLabel>
                              </FormLabel>
                              <FormControl>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          disabled={isMutating}
                                        >
                                          <SelectTrigger
                                            disabled={isMutating}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-11"
                                          >
                                            <SelectValue placeholder="Select delivery" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {DELIVERY_MODES.map((type) => (
                                              <SelectItem
                                                key={type}
                                                value={type}
                                              >
                                                <span>
                                                  {type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    type.slice(1)}
                                                </span>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </TooltipTrigger>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="">
                              {" "}
                              <FormLabel className="font-semibold">
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
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-11"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={`font-semibold }`}>
                                Status
                              </FormLabel>
                              <FormControl>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          disabled={isMutating}
                                        >
                                          <SelectTrigger
                                            disabled={isMutating}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-11"
                                          >
                                            <SelectValue placeholder="Select page" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {COURSE_BATCH_STATUSES.map(
                                              (type) => (
                                                <SelectItem
                                                  key={type}
                                                  value={type}
                                                >
                                                  <span>
                                                    {type
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      type.slice(1)}
                                                  </span>
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </TooltipTrigger>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="weekly-schedule"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 transition-colors text-lg font-semibold">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">
                            Weekly Schedule
                          </p>
                          <p className="text-sm text-gray-500">
                            Configure recurring class times
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasUnsavedScheduleChanges && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                            Unsaved
                          </span>
                        )}
                      </div>
                    </button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-6 border-t border-gray-100">
                      {hasUnsavedScheduleChanges && !sessionsRegenerated && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-amber-900 mb-1">
                              Schedule Changes Detected
                            </p>
                            <p className="text-sm text-amber-700 mb-3">
                              You've made changes to the weekly schedule. Click
                              the button below to regenerate all sessions.
                            </p>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleRegenerateSessions}
                                disabled={isRegenerating}
                                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                              >
                                {isRegenerating ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Regenerating...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="w-4 h-4" />
                                    Regenerate Sessions
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={handleDiscardScheduleChanges}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-medium transition-colors"
                              >
                                Discard Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        {DAY_OF_WEEK.map((day) => {
                          const daySchedules = schedulesByDay[day];
                          return (
                            <div
                              key={day}
                              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-gray-900">
                                  {dayLabels[day]}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    append({
                                      dayOfWeek: day as any,
                                      startTime: "09:00",
                                      endTime: "11:00",
                                      isClosed: "false",
                                      location: "",
                                      notes: "",
                                    })
                                  }
                                  disabled={isSaving}
                                  className="text-sm px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-1"
                                >
                                  <Plus className="w-4 h-4" />
                                  Add Schedule
                                </Button>
                              </div>

                              {daySchedules && daySchedules.length > 0 ? (
                                <div className="space-y-3">
                                  {daySchedules.map((schedule: any) => (
                                    <div
                                      key={schedule.index}
                                      className="bg-white border border-gray-200 rounded-lg p-3"
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                          <Checkbox
                                            checked={
                                              schedule.isClosed === "false"
                                            }
                                            onCheckedChange={(checked) => {
                                              update(schedule.index, {
                                                ...schedule,
                                                isClosed: checked
                                                  ? "false"
                                                  : "true",
                                              });
                                            }}
                                            className="border-gray-300 data-[state=checked]:bg-blue-600 rounded"
                                          />

                                          <span className="text-sm font-medium">
                                            Active
                                          </span>
                                        </label>
                                        <button
                                          type="button"
                                          onClick={() => remove(schedule.index)}
                                          disabled={isSaving}
                                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>

                                      {schedule.isClosed === "false" && (
                                        <div className="grid grid-cols-2 gap-3">
                                          <FormField
                                            control={control}
                                            name={`weeklySchedules.${schedule.index}.startTime`}
                                            render={({ field }) => (
                                              <FormItem className="space-y-0">
                                                <FormControl>
                                                  <TimePicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label="Start Time"
                                                    error={
                                                      errors.weeklySchedules?.[
                                                        schedule.index
                                                      ]?.startTime?.message
                                                    }
                                                    disabled={isSaving}
                                                  />
                                                </FormControl>
                                              </FormItem>
                                            )}
                                          />
                                          <FormField
                                            control={control}
                                            name={`weeklySchedules.${schedule.index}.endTime`}
                                            render={({ field }) => (
                                              <FormItem className="space-y-0">
                                                <FormControl>
                                                  <TimePicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label="End Time"
                                                    error={
                                                      errors.weeklySchedules?.[
                                                        schedule.index
                                                      ]?.startTime?.message
                                                    }
                                                    disabled={isSaving}
                                                  />
                                                </FormControl>
                                              </FormItem>
                                            )}
                                          />
                                          <div>
                                            <FormField
                                              control={control}
                                              name={`weeklySchedules.${schedule.index}.location`}
                                              render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                  <FormLabel className="text-xs font-medium text-gray-600">
                                                    Location
                                                  </FormLabel>
                                                  <FormControl>
                                                    <Input
                                                      placeholder="e.g. Room 204"
                                                      {...field}
                                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                    />
                                                  </FormControl>
                                                  <FormMessage></FormMessage>
                                                </FormItem>
                                              )}
                                            ></FormField>
                                          </div>
                                          <FormField
                                            control={control}
                                            name={`weeklySchedules.${schedule.index}.notes`}
                                            render={({ field }) => (
                                              <FormItem className="space-y-0">
                                                <FormLabel className="text-xs font-medium text-gray-600">
                                                  Notes
                                                </FormLabel>
                                                <FormControl>
                                                  <Input
                                                    placeholder="e.g. Grammar Session"
                                                    {...field}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                  />
                                                </FormControl>
                                                <FormMessage></FormMessage>
                                              </FormItem>
                                            )}
                                          ></FormField>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                  No schedule on this day
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="sessions"
                  className="border rounded-lg bg-white"
                >
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-green-50 to-white hover:from-green-100 transition-colors text-lg font-semibold">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <List className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">
                            Generated Sessions
                          </p>
                          <p className="text-sm text-gray-500">
                            View all scheduled class sessions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {sessionsToDisplay.length} sessions
                        </span>
                      </div>
                    </button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="border-t border-gray-100">
                      <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-blue-900">
                          <Info className="w-4 h-4" />
                          <span>
                            Last regenerated:{" "}
                            {new Date(courseBatch.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        <div className="divide-y divide-gray-100">
                          {sessionsToDisplay
                            .slice(0, displayedSessions)
                            .map((session) => (
                              <div
                                key={session.id}
                                className="p-4 hover:bg-gray-50 transition-colors group"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-4 flex-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0">
                                      {session.order}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className="font-semibold text-gray-900">
                                          {session.day}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                          {session.date}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-1.5">
                                          <Clock className="w-4 h-4 text-gray-400" />
                                          <span className="text-sm font-medium text-gray-900">
                                            {session.startTime}
                                          </span>
                                          <ArrowRight className="w-3 h-3 text-gray-400" />
                                          <span className="text-sm font-medium text-gray-900">
                                            {session.endTime}
                                          </span>
                                        </div>

                                        {session.location && (
                                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            {session.location}
                                          </span>
                                        )}

                                        {session.notes && (
                                          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                            {session.notes}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Check className="w-3 h-3" />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {displayedSessions < sessionsToDisplay.length && (
                          <div className="p-4 border-t border-gray-100 flex justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                setDisplayedSessions((prev) =>
                                  Math.min(prev + 8, sessionsToDisplay.length)
                                )
                              }
                              className="w-full px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                              Load More Sessions (
                              {Math.min(
                                8,
                                sessionsToDisplay.length - displayedSessions
                              )}{" "}
                              more)
                            </button>
                          </div>
                        )}

                        {displayedSessions >= sessionsToDisplay.length &&
                          sessionsToDisplay.length > 0 && (
                            <div className="p-4 border-t border-gray-100 text-center">
                              <p className="text-sm text-gray-600">
                                All {sessionsToDisplay.length} sessions loaded
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {Object.values(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded">
                  {Object.entries(errors).map(([key, error]) => (
                    <p key={key}>{error?.message?.toString()}</p>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 pb-4 mt-8 -mx-6 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                    {form.formState.isDirty && !hasUnsavedScheduleChanges && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-yellow-800 font-medium">
                          Unsaved changes
                        </span>
                      </div>
                    )}
                    {hasUnsavedScheduleChanges && !sessionsRegenerated && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-red-800 font-medium">
                          Regenerate sessions before saving
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      disabled={isSaving}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        isSaving ||
                        !form.formState.isDirty ||
                        (hasUnsavedScheduleChanges && !sessionsRegenerated)
                      }
                      className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
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
