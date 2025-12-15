"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Settings,
  AlertTriangle,
  Plus,
  Trash2,
  Check,
  X,
  Loader2,
  ChevronDown,
  ArrowRight,
  Zap,
  Calendar as CalendarIcon,
  MoreHorizontal,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import {
  DAY_OF_WEEK,
  DayOfWeek,
  DELIVERY_MODES,
  DeliveryMode,
  BooleanType,
} from "@/db/schema/enums";
import { courseBatchCreateSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { RequiredLabel } from "@/components/RequiredLabel";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";

type CourseBatchFormValues = z.infer<typeof courseBatchCreateSchema>;

interface StepProps {
  form: UseFormReturn<CourseBatchFormValues>;
  isSubmitting: boolean;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
}

interface CreateCourseBatchStepperFormProps {
  onCancel?: () => void;
  onSuccess?: (batchId: string) => void;
  open: boolean;
}

type Step = {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

interface GeneratedSession {
  order: number;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
}

const dayLabels: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// Navigation Warning Modal
const NavigationWarningModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  targetStepTitle: string;
  currentStepTitle: string;
  hasUnsavedChanges: boolean;
}> = ({
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

// Step 1: Select Course - REDESIGNED WITH SEARCH
function SelectCourseStep({
  form,
  isSubmitting,
  selectedCourseId,
  setSelectedCourseId,
}: StepProps) {
  const { data: courseList = [], isLoading } = trpc.courses.getMany.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCourse = courseList.find((c) => c.id === selectedCourseId);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courseList;

    const query = searchQuery.toLowerCase();
    return courseList.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.level.toLowerCase().includes(query)
    );
  }, [courseList, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-3 text-blue-900">
          <div className="p-2 bg-blue-200 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Select Your Course</p>
            <p className="text-sm text-blue-800">
              Pick a course to create a new batch for
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {courseList.length > 0 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses by name or level..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 placeholder-gray-500"
          />
          <svg
            className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-3" />
          <p className="text-gray-500">Loading available courses...</p>
        </div>
      ) : courseList.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-600 font-medium mb-2">No Courses Found</p>
          <p className="text-sm text-gray-500">
            You need to create a course before you can create batches
          </p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-gray-600 font-medium">No courses match</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredCourses.map((course) => {
            const isSelected = selectedCourseId === course.id;
            return (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  form.setValue("courseId", course.id);
                  form.setValue("price", course.price);
                }}
                className={`group relative border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                {/* Gradient overlay on hover */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-lg text-gray-900">
                        {course.title}
                      </h3>
                      {isSelected && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                          <Check className="w-3 h-3" />
                          Selected
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {course.totalSessions} sessions
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-blue-600">
                          Rp {course.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-400"
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Calendar Date Picker Component
const CalendarDatePicker: React.FC<{
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}> = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthYear = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateStr = date.toISOString().split("T")[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
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
        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg bg-white text-gray-900 text-left font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {displayValue}
      </button>
      <CalendarIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 w-80">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">{monthYear}</h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
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

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => day && handleDateClick(day)}
                disabled={!day}
                className={`
                  w-10 h-10 rounded-lg text-sm font-medium transition-all
                  ${
                    !day
                      ? "bg-transparent"
                      : isSelectedDate(day)
                        ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                        : "hover:bg-blue-50 text-gray-700 border border-transparent hover:border-blue-200"
                  }
                `}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {isOpen && !disabled && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// Step 2: Batch Details - IMPROVED DATE INPUT
function BatchDetailsStep({
  form,
  isSubmitting,
  selectedCourseId,
}: StepProps & { selectedCourse: any }) {
  const { data: courseList = [] } = trpc.courses.getMany.useQuery();
  const selectedCourse = courseList.find((c) => c.id === selectedCourseId);

  const startDate = form.watch("startDate");
  const weeklySchedules = form.watch("weeklySchedules") || [];

  const calculatedEndDate = useMemo((): string | null => {
    if (
      !startDate ||
      !selectedCourse ||
      form.getValues().weeklySchedules?.length === 0
    )
      return null;

    const start = new Date(startDate);
    let sessionsCount = 0;
    let currentDate = new Date(start);

    while (sessionsCount < selectedCourse.totalSessions) {
      const dayIndex =
        currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

      const daySchedulesCount = weeklySchedules.filter(
        (s) =>
          DAY_OF_WEEK.indexOf(s.dayOfWeek) === dayIndex &&
          s.isClosed === "false"
      ).length;

      sessionsCount += daySchedulesCount;

      if (sessionsCount < selectedCourse.totalSessions) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return currentDate.toISOString().split("T")[0];
  }, [startDate, weeklySchedules, selectedCourse]);

  const handleDateChange = (date: string) => {
    form.setValue("startDate", date, { shouldValidate: true });
  };

  const endDateDisplay = calculatedEndDate
    ? new Date(calculatedEndDate).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Calculated automatically";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5">
        <div className="flex items-center gap-3 text-amber-900">
          <div className="p-2 bg-amber-200 rounded-lg">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Configure Batch Settings</p>
            <p className="text-sm text-amber-800">
              Set start date, capacity, delivery mode, and pricing
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Start Date - CALENDAR ONLY */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">
                <RequiredLabel>Start Date</RequiredLabel>
              </FormLabel>
              <FormControl>
                <CalendarDatePicker
                  value={field.value || ""}
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
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
              {endDateDisplay}
            </button>
            <CalendarIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Calculated based on schedule
          </p>
        </div>

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">
                <RequiredLabel>Capacity</RequiredLabel>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Max students"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                  disabled={isSubmitting}
                  className="border-gray-300 h-11 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryMode"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">
                <RequiredLabel>Delivery Mode</RequiredLabel>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="border-gray-300 h-11 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Choose delivery mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DELIVERY_MODES.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-semibold">
                <RequiredLabel>Price (Rp)</RequiredLabel>
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
                  className="border-gray-300 h-11 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-2">
                Course default: Rp{" "}
                {selectedCourse?.price.toLocaleString("id-ID")}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// Step 3: Weekly Schedule
function WeeklyScheduleStep({ form, isSubmitting }: StepProps) {
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "weeklySchedules",
  });
  type FieldWithIndex = (typeof fields)[number] & { index: number };

  const schedulesByDay = useMemo(() => {
    const grouped: Record<DayOfWeek, FieldWithIndex[]> = {
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

  const addScheduleForDay = (day: DayOfWeek) => {
    append({
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "11:00",
      isClosed: "false",
      location: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
        <div className="flex items-center gap-3 text-purple-900">
          <div className="p-2 bg-purple-200 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Set Up Recurring Schedule</p>
            <p className="text-sm text-purple-800">
              Define when classes occur each week
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {DAY_OF_WEEK.map((day) => {
          const daySchedules = schedulesByDay[day];
          const hasSchedules = daySchedules.length > 0;

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
                  size="sm"
                  onClick={() => addScheduleForDay(day)}
                  disabled={isSubmitting}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Schedule
                </Button>
              </div>

              {hasSchedules ? (
                <div className="space-y-3">
                  {daySchedules.map((schedule) => {
                    const fieldIndex = schedule.index as number;
                    return (
                      <div
                        key={fieldIndex}
                        className="bg-white border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={schedule.isClosed === "false"}
                              onChange={(e) => {
                                update(fieldIndex, {
                                  ...schedule,
                                  isClosed: e.target.checked ? "false" : "true",
                                });
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-sm font-medium">Active</span>
                          </label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(fieldIndex)}
                            disabled={isSubmitting}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {schedule.isClosed === "false" && (
                          <div className="grid grid-cols-2 gap-3">
                            <FormField
                              control={form.control}
                              name={`weeklySchedules.${fieldIndex}.startTime`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormLabel className="text-xs text-gray-600">
                                    Start Time
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="time"
                                      {...field}
                                      className="border-gray-300"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`weeklySchedules.${fieldIndex}.endTime`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormLabel className="text-xs text-gray-600">
                                    End Time
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="time"
                                      {...field}
                                      className="border-gray-300"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`weeklySchedules.${fieldIndex}.location`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormLabel className="text-xs text-gray-600">
                                    Location (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Room 204"
                                      {...field}
                                      className="border-gray-300"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`weeklySchedules.${fieldIndex}.notes`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormLabel className="text-xs text-gray-600">
                                    Notes (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Lab session"
                                      {...field}
                                      className="border-gray-300"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No schedules added for {dayLabels[day]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step 4: Review & Confirm - REDESIGNED
function ReviewConfirmStep({
  form,
  isSubmitting,
  selectedCourseId,
  generatedSessions,
}: StepProps & { generatedSessions: GeneratedSession[] }) {
  const { data: courseList = [] } = trpc.courses.getMany.useQuery();
  const [displayedSessions, setDisplayedSessions] = useState(() =>
    Math.min(8, generatedSessions.length)
  );
  const selectedCourse = courseList.find((c) => c.id === selectedCourseId);
  const values = form.getValues();

  const handleLoadMore = () => {
    setDisplayedSessions((prev) =>
      Math.min(prev + 8, generatedSessions.length)
    );
  };

  const hasMoreSessions = displayedSessions < generatedSessions.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
        <div className="flex items-center gap-3 text-green-900">
          <div className="p-2 bg-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Review Your Batch</p>
            <p className="text-sm text-green-800">
              Verify all details before creating
            </p>
          </div>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          Course Information
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">Course</p>
            <p className="text-sm font-semibold text-gray-900">
              {selectedCourse?.title}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">Level</p>
            <p className="text-sm font-semibold text-gray-900">
              {selectedCourse?.level}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Total Sessions
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {selectedCourse?.totalSessions}
            </p>
          </div>
        </div>
      </div>

      {/* Batch Details Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Settings className="w-5 h-5 text-amber-600" />
          </div>
          Batch Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">Capacity</p>
            <p className="text-lg font-bold text-gray-900">
              {values.capacity}
              <span className="text-sm font-normal text-gray-600 ml-1">
                students
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Delivery Mode
            </p>
            <p className="text-lg font-bold text-gray-900 capitalize">
              {values.deliveryMode}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">Start Date</p>
            <p className="text-lg font-bold text-gray-900">
              {values.startDate}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-600 mb-1">Price</p>
            <p className="text-lg font-bold text-blue-600">
              Rp {values.price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Generated Sessions Card */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  Generated Sessions
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  {generatedSessions.length} sessions scheduled
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                Showing {displayedSessions} of {generatedSessions.length}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {generatedSessions.slice(0, displayedSessions).map((session) => (
              <div
                key={session.order}
                className="p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Session Order Badge */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0">
                      {session.order}
                    </div>

                    {/* Session Details */}
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
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {session.location}
                            </span>
                          </div>
                        )}

                        {session.notes && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded">
                              {session.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Checkmark */}
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreSessions && (
            <div className="p-4 border-t border-gray-100 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleLoadMore}
                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
              >
                <ChevronDown className="w-4 h-4 mr-2" />
                Load More Sessions (
                {Math.min(8, generatedSessions.length - displayedSessions)} more
                )
              </Button>
            </div>
          )}

          {/* All Sessions Loaded Message */}
          {!hasMoreSessions && generatedSessions.length > 0 && (
            <div className="p-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                All {generatedSessions.length} sessions loaded
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component
export const CreateCourseBatchStepperForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateCourseBatchStepperFormProps) => {
  const utils = trpc.useUtils();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  const [highestReachedStep, setHighestReachedStep] = useState(1);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<number | null>(
    null
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [generatedSessions, setGeneratedSessions] = useState<
    GeneratedSession[]
  >([]);

  const { data: courseList = [] } = trpc.courses.getMany.useQuery();
  const selectedCourse = courseList.find((c) => c.id === selectedCourseId);

  const form = useForm<CourseBatchFormValues>({
    resolver: zodResolver(courseBatchCreateSchema),
    defaultValues: {
      courseId: "",
      startDate: "",
      capacity: 0,
      deliveryMode: "offline",
      price: 0,
      status: "upcoming",
      weeklySchedules: [],
    },
  });

  const courseBatchCreate = trpc.courseBatches.create.useMutation();

  const steps: Step[] = [
    {
      id: 1,
      title: "Select Course",
      icon: BookOpen,
      description: "Choose the course for this batch",
    },
    {
      id: 2,
      title: "Batch Details",
      icon: Settings,
      description: "Configure batch settings",
    },
    {
      id: 3,
      title: "Weekly Schedule",
      icon: Clock,
      description: "Set up recurring schedule",
    },
    {
      id: 4,
      title: "Review & Confirm",
      icon: CheckCircle,
      description: "Review and create batch",
    },
  ];

  // Generate sessions
  const generateSessions = () => {
    const startDate = form.getValues().startDate;
    const weeklySchedules = form.getValues().weeklySchedules || [];

    if (!startDate || !selectedCourse) return;

    const sessions: GeneratedSession[] = [];
    const start = new Date(startDate);
    let currentDate = new Date(start);
    let sessionOrder = 1;

    while (sessions.length < selectedCourse.totalSessions) {
      const dayIndex =
        currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
      const dayName = DAY_OF_WEEK[dayIndex];

      const daySchedules = weeklySchedules.filter(
        (s) => s.dayOfWeek === dayName && s.isClosed === "false"
      );

      for (const sched of daySchedules) {
        if (sessions.length >= selectedCourse.totalSessions) break;
        sessions.push({
          order: sessionOrder++,
          date: currentDate.toISOString().split("T")[0],
          day: dayLabels[dayName],
          startTime: sched.startTime,
          endTime: sched.endTime,
          location: sched.location || "",
          notes: sched.notes || "",
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setGeneratedSessions(sessions);
  };

  // Validation
  const getStepValidation = useMemo(() => {
    const values = form.getValues();

    const validateStep = (step: number): boolean => {
      switch (step) {
        case 1:
          return !!selectedCourseId;
        case 2:
          return !!(
            values.startDate &&
            values.capacity! > 0 &&
            values.price > 0
          );
        case 3:
          const schedules = values.weeklySchedules || [];
          const activeSchedules = schedules.filter(
            (s) => s.isClosed === "false"
          );
          return (
            activeSchedules.length > 0 &&
            activeSchedules.every(
              (s) => s.startTime && s.endTime && s.startTime < s.endTime
            )
          );
        case 4:
          return !!(
            !!selectedCourseId &&
            values.startDate &&
            values.capacity! > 0 &&
            values.price > 0 &&
            values.weeklySchedules?.length! > 0
          );
        default:
          return false;
      }
    };

    return steps.reduce(
      (acc, step) => {
        acc[step.id] = validateStep(step.id);
        return acc;
      },
      {} as Record<number, boolean>
    );
  }, [form.watch(), selectedCourseId, steps]);

  const completedSteps = useMemo(() => {
    return Object.entries(getStepValidation)
      .filter(([_, isValid]) => isValid)
      .map(([stepId]) => parseInt(stepId));
  }, [getStepValidation]);

  const hasUnsavedChanges = (stepNumber: number): boolean => {
    return !getStepValidation[stepNumber] && visitedSteps.has(stepNumber);
  };

  // Navigation handlers
  const performNavigation = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    setVisitedSteps((prev) => new Set([...prev, stepNumber]));
    if (stepNumber > highestReachedStep) {
      setHighestReachedStep(stepNumber);
    }

    // Generate sessions when entering step 4
    if (stepNumber === 4) {
      generateSessions();
    }
  };

  const handleStepClick = (stepNumber: number) => {
    const canNavigateToStep = (targetStep: number): boolean => {
      if (targetStep === currentStep) return true;
      if (visitedSteps.has(targetStep)) return true;
      if (completedSteps.includes(targetStep)) return true;
      if (targetStep === currentStep + 1 && getStepValidation[currentStep])
        return true;
      if (targetStep <= highestReachedStep) return true;
      return false;
    };

    if (!canNavigateToStep(stepNumber)) return;

    const targetStepNeedsWarning =
      stepNumber !== currentStep &&
      visitedSteps.has(stepNumber) &&
      !getStepValidation[stepNumber];

    const currentStepHasUnsaved = hasUnsavedChanges(currentStep);

    if (targetStepNeedsWarning || currentStepHasUnsaved) {
      setPendingNavigation(stepNumber);
      setShowNavigationWarning(true);
      return;
    }

    performNavigation(stepNumber);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (getStepValidation[currentStep] && currentStep < steps.length) {
      const nextStep = currentStep + 1;
      performNavigation(nextStep);
    } else {
      toast.error("Please complete all required fields before continuing.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      performNavigation(currentStep - 1);
    }
  };

  const handleNavigationConfirm = () => {
    if (pendingNavigation !== null) {
      performNavigation(pendingNavigation);
    }
    setShowNavigationWarning(false);
    setPendingNavigation(null);
  };

  const handleNavigationCancel = () => {
    setShowNavigationWarning(false);
    setPendingNavigation(null);
  };

  const getStepTitle = (stepNumber: number): string => {
    const step = steps.find((s) => s.id === stepNumber);
    return step?.title || `Step ${stepNumber}`;
  };

  // Submit handler
  const onSubmit = async (values: CourseBatchFormValues) => {
    const toastId = toast.loading("Creating course batch...");
    setIsSubmitting(true);

    try {
      const data = await courseBatchCreate.mutateAsync(values);
      utils.courseBatches.getFiltered.invalidate();
      toast.success("Course batch created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating course batch.", {
        id: toastId,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep - 1];

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
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create Course Batch
        </h1>
        <p className="text-lg text-gray-600">
          Set up a new batch schedule for your course
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-start justify-around overflow-x-auto pb-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isCurrent = currentStep === stepNumber;
            const isValid = getStepValidation[stepNumber];
            const isVisited = visitedSteps.has(stepNumber);

            const isAccessible = () => {
              if (isCurrent) return true;
              if (isCompleted) return true;
              if (isVisited) return true;
              if (
                stepNumber === currentStep + 1 &&
                getStepValidation[currentStep]
              ) {
                return true;
              }
              return false;
            };

            const accessible = isAccessible();

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
                    onClick={() => accessible && handleStepClick(stepNumber)}
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

      {/* Step Content */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentStep !== steps.length) {
              e.preventDefault();
            }
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
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

              <GradientSeparator className="my-4" />

              {/* Render current step */}
              {currentStep === 1 && (
                <SelectCourseStep
                  form={form}
                  isSubmitting={isSubmitting}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                />
              )}
              {currentStep === 2 && (
                <BatchDetailsStep
                  form={form}
                  isSubmitting={isSubmitting}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  selectedCourse={selectedCourse}
                />
              )}
              {currentStep === 3 && (
                <WeeklyScheduleStep
                  form={form}
                  isSubmitting={isSubmitting}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                />
              )}
              {currentStep === 4 && (
                <ReviewConfirmStep
                  form={form}
                  isSubmitting={isSubmitting}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  generatedSessions={generatedSessions}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <Button
                  onClick={handlePrevious}
                  size="lg"
                  type="button"
                  variant="outline"
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
                    size="lg"
                    disabled={isSubmitting || !getStepValidation[currentStep]}
                    className="flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Batch...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Create Batch
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    type="button"
                    size="lg"
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
