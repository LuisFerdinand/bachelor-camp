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
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LayoutGridIcon,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

type LearningGoal = {
  text: string;
  iconUrl?: string;
};
type Syllabus = {
  text: string;
  iconUrl?: string;
};
type TeachingMethod = {
  text: string;
  iconUrl?: string;
};
type Resource = {
  text: string;
  iconUrl?: string;
};
type TargetAudience = {
  text: string;
  iconUrl?: string;
};
type FormData = {
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: string;
  duration: string;
  totalSessions: string;
  learningGoals: LearningGoal[];
  syllabus: Syllabus[];
  teachingMethods: TeachingMethod[];
  resources: Resource[];
  targetAudience: TargetAudience[];
  selectedBuildings: string[];
};
type StepProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const basicInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(COURSE_CATEGORIES),
  level: z.enum(COURSE_LEVELS),
  price: z.string().min(1, "Price is required"),
  description: z.string().max(500).optional(),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

interface BasicInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function BasicInfoStep({ formData, setFormData }: BasicInfoStepProps) {
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: formData.title,
      category: formData.category,
      level: formData.level,
      price: formData.price,
      description: formData.description,
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormData({ ...formData, ...values });
    });
    return () => subscription.unsubscribe();
  }, [form, formData, setFormData]);

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Course Title
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter an engaging course title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {formData.title && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                Title looks good!
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as CourseCategory,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select a category</option>
              <option value="Programming">💻 Programming</option>
              <option value="Design">🎨 Design</option>
              <option value="Business">📈 Business</option>
              <option value="Marketing">📣 Marketing</option>
              <option value="Languages">🌍 Languages</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Course Level *
            </label>
            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  level: e.target.value as CourseLevel,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select difficulty level</option>
              <option value="Beginner">
                🌱 Beginner - No prior experience needed
              </option>
              <option value="Intermediate">
                🌿 Intermediate - Some experience helpful
              </option>
              <option value="Advanced">
                🌳 Advanced - Extensive experience required
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Course Price *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Course Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe what students will learn and why this course is valuable..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
          />
          <p className="text-sm text-gray-500">
            {formData.description?.length || 0}/500 characters
          </p>
        </div>
      </div>
    </Form>
  );
}

function BuildingsStep({ formData, setFormData }: StepProps) {
  const buildings = [
    {
      id: "1",
      name: "Main Campus Building",
      description: "Primary building with modern facilities",
      capacity: "200 students",
    },
    {
      id: "2",
      name: "Science & Technology Center",
      description: "State-of-the-art laboratory facilities",
      capacity: "150 students",
    },
    {
      id: "3",
      name: "Creative Arts Building",
      description: "Specialized creative and design spaces",
      capacity: "100 students",
    },
    {
      id: "4",
      name: "Business Innovation Hub",
      description: "Modern business and entrepreneurship center",
      capacity: "120 students",
    },
  ];

  const toggleBuilding = (buildingId: string) => {
    const current = formData.selectedBuildings || [];
    const updated = current.includes(buildingId)
      ? current.filter((id) => id !== buildingId)
      : [...current, buildingId];
    setFormData({ ...formData, selectedBuildings: updated });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-blue-800">
          <Building2 className="w-5 h-5" />
          <p className="font-medium">Select Course Locations</p>
        </div>
        <p className="text-blue-700 text-sm mt-1">
          Choose one or more buildings where this course will be offered.
          Students will be able to attend at any of these locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildings.map((building) => (
          <div
            key={building.id}
            className={`border-2 rounded-lg p-5 cursor-pointer transition-all duration-200 ${
              formData.selectedBuildings?.includes(building.id)
                ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
            onClick={() => toggleBuilding(building.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors ${
                  formData.selectedBuildings?.includes(building.id)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {formData.selectedBuildings?.includes(building.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  {building.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {building.description}
                </p>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  📍 {building.capacity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formData.selectedBuildings?.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <CheckCircle className="w-5 h-5" />
            <p className="font-medium">
              {formData.selectedBuildings.length} location
              {formData.selectedBuildings.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <p className="text-green-700 text-sm">
            Your course will be available at multiple locations, giving students
            flexibility in choosing where to attend.
          </p>
        </div>
      )}
    </div>
  );
}

function LearningGoalsStep({ formData, setFormData }: StepProps) {
  const addGoal = () => {
    const goals = formData.learningGoals || [];
    setFormData({
      ...formData,
      learningGoals: [...goals, { text: "", iconUrl: "" }],
    });
  };

  const removeGoal = (index: number) => {
    const goals = formData.learningGoals || [];
    setFormData({
      ...formData,
      learningGoals: goals.filter((_, i) => i !== index),
    });
  };

  const updateGoal = (
    index: number,
    field: keyof LearningGoal,
    value: string
  ) => {
    const goals = formData.learningGoals || [];
    const updated = goals.map((goal, i) =>
      i === index ? { ...goal, [field]: value } : goal
    );
    setFormData({ ...formData, learningGoals: updated });
  };

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
          Course Learning Goals
        </h3>
        <button
          onClick={addGoal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Target className="w-4 h-4" />
          Add Learning Goal
        </button>
      </div>

      <div className="space-y-4">
        {(formData.learningGoals || []).map((goal, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-900">
                  Learning Goal {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeGoal(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Learning Goal *
                </label>
                <input
                  value={goal.text}
                  onChange={(e) => updateGoal(index, "text", e.target.value)}
                  placeholder="e.g., Build responsive websites with React and Tailwind CSS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Icon URL (Optional)
                </label>
                <input
                  value={goal.iconUrl}
                  onChange={(e) => updateGoal(index, "iconUrl", e.target.value)}
                  placeholder="https://example.com/icon.svg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        {(!formData.learningGoals || formData.learningGoals.length === 0) && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No learning goals added yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Add goals to help students understand what they'll achieve
            </p>
            <button
              onClick={addGoal}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Your First Learning Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simplified step components for remaining steps
function SyllabusStep({ formData, setFormData }: StepProps) {
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
      <div className="text-center py-8 text-gray-500">
        <List className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Syllabus configuration coming soon...</p>
      </div>
    </div>
  );
}

function TeachingMethodsStep({ formData, setFormData }: StepProps) {
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
      <div className="text-center py-8 text-gray-500">
        <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Teaching methods configuration coming soon...</p>
      </div>
    </div>
  );
}

function ResourcesStep({ formData, setFormData }: StepProps) {
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
      <div className="text-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Resources configuration coming soon...</p>
      </div>
    </div>
  );
}

function TargetAudienceStep({ formData, setFormData }: StepProps) {
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
      <div className="text-center py-8 text-gray-500">
        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Target audience configuration coming soon...</p>
      </div>
    </div>
  );
}

type ImageStepProps = {
  previewUrl: string | null;
  onFileSelect: (file: File | null) => void;
  isUploading: boolean;
  uploadProgress: number;
};

function ImageStep({
  previewUrl,
  onFileSelect,
  isUploading,
  uploadProgress,
}: ImageStepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-pink-800">
          <ImageIcon className="w-5 h-5" />
          <p className="font-medium">Course Cover Image</p>
        </div>
        <p className="text-pink-700 text-sm mt-1">
          Upload an engaging cover image that represents your course (optional
          but recommended).
        </p>
      </div>

      <ImageUploadWithProgress
        previewUrl={previewUrl}
        onFileSelect={onFileSelect}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      {!previewUrl && !isUploading && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Tip: High-quality images with good contrast and clear text work
            best. Avoid cluttered designs.
          </p>
        </div>
      )}
    </div>
  );
}

type ImageUploadWithProgressProps = {
  onFileSelect: (file: File | null) => void;
  previewUrl: string | null;
  isUploading: boolean;
  uploadProgress: number;
};

const ImageUploadWithProgress: React.FC<ImageUploadWithProgressProps> = ({
  onFileSelect,
  previewUrl,
  isUploading,
  uploadProgress,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB");
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
          dragOver
            ? "border-blue-400 bg-blue-50 scale-105"
            : "border-gray-300 bg-gray-50"
        } ${isUploading ? "pointer-events-none opacity-75" : "cursor-pointer hover:bg-gray-100 hover:border-gray-400"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading && (
          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-3">
              Uploading image...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${uploadProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">JPG, PNG or JPEG, max 2MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0]!)}
        />
      </div>
    </div>
  );
};

type Step = {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

type StepperProgressProps = {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  setCurrentStep: (step: number) => void;
};

export const EnhancedCourseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: COURSE_CATEGORIES[0],
    level: COURSE_LEVELS[0],
    price: "",
    duration: "",
    totalSessions: "",
    learningGoals: [],
    syllabus: [],
    teachingMethods: [],
    resources: [],
    targetAudience: [],
    selectedBuildings: [],
  });

  // Image upload states
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      description: "Location assignment",
      icon: Building2,
      component: BuildingsStep,
    },
    {
      id: 3,
      title: "Learning Goals",
      description: "Course objectives",
      icon: Target,
      component: LearningGoalsStep,
    },
    {
      id: 4,
      title: "Syllabus",
      description: "Course curriculum",
      icon: List,
      component: SyllabusStep,
    },
    {
      id: 5,
      title: "Methods",
      description: "Teaching approaches",
      icon: Lightbulb,
      component: TeachingMethodsStep,
    },
    {
      id: 6,
      title: "Resources",
      description: "Course materials",
      icon: FileText,
      component: ResourcesStep,
    },
    {
      id: 7,
      title: "Audience",
      description: "Target students",
      icon: Users,
      component: TargetAudienceStep,
    },
    {
      id: 8,
      title: "Image",
      description: "Course cover",
      icon: ImageIcon,
      component: ImageStep,
    },
  ];

  const currentStepData = steps[currentStep - 1];

  const updateCompletedSteps = (step: number) => {
    if (validateStep(step)) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps((prev) => [...prev, step]);
      }
    } else {
      setCompletedSteps((prev) => prev.filter((s) => s !== step));
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return (
          formData.title.trim() &&
          formData.category &&
          formData.level &&
          formData.price
        );
      case 2:
        return formData.selectedBuildings.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return true;
      case 7:
        return true;
      case 8:
        return true; // Image optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    updateCompletedSteps(currentStep);

    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    updateCompletedSteps(currentStep);

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    updateCompletedSteps(currentStep);

    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleFileSelect = async (file: File | null | undefined) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Simulate upload with progress
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Course created successfully!");
    }, 2000);
  };

  const StepComponent = currentStepData.component;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {JSON.stringify(formData)}
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
      </div>

      {/* Progress Stepper */}
      <StepperProgress
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        setCurrentStep={setCurrentStep}
      />

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8 border">
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <currentStepData.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  {currentStepData.title}aa
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

          <StepComponent
            formData={formData}
            setFormData={setFormData}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

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
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  validateStep(currentStep)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepperProgress: React.FC<StepperProgressProps> = ({
  steps,
  currentStep,
  completedSteps,
  setCurrentStep,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-around overflow-x-auto pb-4 ">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          const isAccessible =
            isCurrent || isCompleted || completedSteps.includes(stepNumber - 1);

          return (
            <div
              key={step.id}
              className={`flex items-center justify-start ${index === steps.length - 1 ? "" : "flex-1"} `}
            >
              {/* Step circle + title */}
              <div className="flex flex-col items-center flex-shrink-0 w-20 ">
                <div
                  onClick={() => isAccessible && setCurrentStep(stepNumber)}
                  className={`flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-200 scale-95 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white shadow-lg scale-100 cursor-pointer"
                      : isCurrent
                        ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-100 cursor-pointer"
                        : isAccessible
                          ? "border-gray-300 text-gray-500 hover:border-blue-300 hover:scale-100 cursor-pointer"
                          : "border-gray-200 text-gray-300 opacity-50 cursor-not-allowed"
                  } `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="mt-2 text-center w-full">
                  <p
                    className={`text-xs font-medium ${
                      isCurrent
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-px flex-1 mx-0 transition-colors ${
                    isCompleted ? "bg-green-300" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface CreateCourseFormProps {
  onCancel?: () => void;
  onSuccess?: (courseId: string) => void;
  open: boolean;
}

export const CreateCourseForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateCourseFormProps) => {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image states
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Building selection states
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>([]);
  const [buildingSearchOpen, setBuildingSearchOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch buildings
  const { data: buildings = [] } = trpc.buildings.getMany.useQuery();

  const form = useForm<z.infer<typeof courseCreateSchema>>({
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

  const maxLearningGoals = 5;
  const maxSyllabus = 10;
  const maxTeachingMethods = 5;
  const maxResources = 5;
  const maxTargetAudience = 5;

  const { control, setValue, watch } = form;

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

  const courseCreate = trpc.courses.create.useMutation();

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

      if (selectedBuildings.length > 0) {
        toast.loading("Linking course to buildings...", { id: toastId });

        // await Promise.all(
        //   selectedBuildings.map((buildingId) =>
        //     trpc.courses.linkToBuilding.mutate({
        //       courseId: data.id,
        //       buildingId,
        //     })
        //   )
        // );
      }

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

  const watchedTitle = watch("title");

  const getUniqueSlugQuery = trpc.courses.getUniqueSlug.useQuery(
    { title: watchedTitle || "" },
    { enabled: false } // Don't run automatically
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

  // Dynamic section component

  return (
    <Card className="w-full border-muted-foreground/50 shadow-none pt-4">
      <CardContent className="px-4 overflow-visible">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-2 px-0">
            <Accordion
              type="multiple"
              defaultValue={["basic-info", "buildings"]}
              className="w-full space-y-4"
            >
              {/* Basic Information */}
              <AccordionItem
                value="basic-info"
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold ">
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-6 text-primary" />
                      Basic Information
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">
                      Configure the main details of your course
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="">
                  <GradientSeparator></GradientSeparator>

                  <div className="p-4 space-y-4">
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
                              disabled={isSubmitting}
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
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-6 text-primary" />
                      Building Assignment
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">
                      Select buildings where this course will be offered
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="">
                  <GradientSeparator></GradientSeparator>
                  <div className="space-y-2 p-4">
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
                        {selectedBuildings.length} selected
                      </div>
                    </div>

                    <Popover
                      open={buildingSearchOpen}
                      onOpenChange={setBuildingSearchOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={buildingSearchOpen}
                          className="w-full justify-between border-muted-foreground/50 h-11"
                          disabled={isSubmitting}
                        >
                          {selectedBuildings.length > 0
                            ? `${selectedBuildings.length} building(s) selected`
                            : "Select buildings..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto scrollbar-custom">
                        <Command>
                          <CommandInput placeholder="Search buildings..." />
                          <CommandEmpty>No buildings found.</CommandEmpty>
                          <CommandGroup className="max-h-60 overflow-auto">
                            {buildings.map((building) => (
                              <CommandItem
                                key={building.id}
                                onSelect={() => {
                                  setSelectedBuildings((prev) =>
                                    prev.includes(building.id)
                                      ? prev.filter((id) => id !== building.id)
                                      : [...prev, building.id]
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedBuildings.includes(building.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {building.name}
                                  </span>
                                  {building.description && (
                                    <span className="text-sm text-muted-foreground truncate">
                                      {building.description}
                                    </span>
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Selected Buildings Display */}
                    {selectedBuildings.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Selected Buildings:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedBuildings.map((buildingId) => {
                            const building = buildings.find(
                              (b) => b.id === buildingId
                            );
                            return building ? (
                              <div
                                key={buildingId}
                                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                              >
                                <Building2 className="size-3" />
                                <span>{building.name}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedBuildings((prev) =>
                                      prev.filter((id) => id !== buildingId)
                                    )
                                  }
                                  className="ml-1 hover:bg-primary/20 rounded-full p-1"
                                  disabled={isSubmitting}
                                >
                                  <Trash2 className="size-3" />
                                </button>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {selectedBuildings.length === 0 && (
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
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Learning Goals */}
              <AccordionItem
                key={"learning-goals"}
                value="learning-goals"
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Target className="size-6 text-primary" />
                    Learning Goals
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator></GradientSeparator>

                  <div className="space-y-4 p-4">
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
                        {learningGoalFields.length}/{maxLearningGoals}
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
                            isSubmitting ||
                            learningGoalFields.length >= maxLearningGoals
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
                                    Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "e.g., Reach target IELTS Band score 4.5"
                                      }
                                      {...field}
                                      disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                      learningGoalFields.length < maxLearningGoals && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            learningGoalAppend({ text: "", iconUrl: "" })
                          }
                          disabled={
                            isSubmitting || learningGoalFields.length >= 5
                          }
                          className="w-full border-muted-foreground/50 border-dashed h-11"
                        >
                          <Plus className="size-4 mr-2" />
                          Add Another Item ({learningGoalFields.length}/
                          {maxLearningGoals})
                        </Button>
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Syllabus */}
              <AccordionItem
                key="syllabus"
                value="syllabus"
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <List className="size-6 text-primary" />
                    Course Syllabus
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator></GradientSeparator>

                  <div className="space-y-4 p-4">
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
                        {syllabusFields.length}/{maxSyllabus}
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
                            isSubmitting || syllabusFields.length >= maxSyllabus
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
                                    Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "e.g., Basic vocabulary and grammar for IELTS"
                                      }
                                      {...field}
                                      disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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

                    {syllabusFields.length > 0 && syllabusFields.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          syllabusAppend({ text: "", iconUrl: "" })
                        }
                        disabled={
                          isSubmitting || syllabusFields.length >= maxSyllabus
                        }
                        className="w-full border-muted-foreground/50 border-dashed h-11"
                      >
                        <Plus className="size-4 mr-2" />
                        Add Another Item ({syllabusFields.length}/{maxSyllabus})
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Teaching Methods */}
              <AccordionItem
                value="teaching-methods"
                key={"teaching-methods"}
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="size-5 text-primary" />
                    Teaching Methods
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator></GradientSeparator>

                  <div className="space-y-4 p-4">
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
                        {teachingMethodFields.length}/{maxTeachingMethods}
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
                            isSubmitting ||
                            teachingMethodFields.length >= maxTeachingMethods
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
                                    Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "e.g., Weekly mini-test simulations"
                                      }
                                      {...field}
                                      disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                      teachingMethodFields.length < maxTeachingMethods && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            teachingMethodAppend({ text: "", iconUrl: "" })
                          }
                          disabled={
                            isSubmitting || teachingMethodFields.length >= 5
                          }
                          className="w-full border-muted-foreground/50 border-dashed h-11"
                        >
                          <Plus className="size-4 mr-2" />
                          Add Another Item ({teachingMethodFields.length}/
                          {maxTeachingMethods})
                        </Button>
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Resources */}
              <AccordionItem
                value="resources"
                key={"resources"}
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    Course Resources
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator></GradientSeparator>

                  <div className="space-y-4 p-4">
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
                        {resourcesFields.length}/{maxResources}
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
                            isSubmitting ||
                            resourcesFields.length >= maxResources
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
                                    Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={
                                        "e.g., Monthly progress report"
                                      }
                                      {...field}
                                      disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                            isSubmitting ||
                            resourcesFields.length >= maxResources
                          }
                          className="w-full border-muted-foreground/50 border-dashed h-11"
                        >
                          <Plus className="size-4 mr-2" />
                          Add Another Item ({resourcesFields.length}/
                          {maxResources})
                        </Button>
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Target Audience */}
              <AccordionItem
                value="target-audience"
                key={"target-audience"}
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-primary" />
                    Target Audience
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator></GradientSeparator>

                  <div className="space-y-4 p-4">
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
                        {targetAudienceFields.length}/{maxTargetAudience}
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
                            isSubmitting ||
                            targetAudienceFields.length >= maxTargetAudience
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
                                    Text
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={"e.g., Students"}
                                      {...field}
                                      disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                            isSubmitting ||
                            targetAudienceFields.length >= maxTargetAudience
                          }
                          className="w-full border-muted-foreground/50 border-dashed h-11"
                        >
                          <Plus className="size-4 mr-2" />
                          Add Another Item ({targetAudienceFields.length}/
                          {maxTargetAudience})
                        </Button>
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Course Image */}
              <AccordionItem
                value="course-image"
                key={"course-image"}
                className="border p-4 rounded-lg bg-white"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-5 text-primary" />
                    Course Image
                  </div>
                </AccordionTrigger>
                <AccordionContent>
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
                          <div className="flex gap-2">
                            {previewUrl ? (
                              <>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                  disabled={isSubmitting}
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
                                  disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
