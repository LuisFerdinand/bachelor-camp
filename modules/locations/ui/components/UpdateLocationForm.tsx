"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocationAction } from "./LocationContext";
import { locationUpdateSchema } from "@/db/schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DAY_OF_WEEK, PAGE_TYPES } from "@/db/schema/enums";
import {
  Building2,
  Clock,
  Eye,
  EyeOff,
  Globe,
  ImageIcon,
  InfoIcon,
  Mail,
  MapPin,
  Phone,
  Plus,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getAbbr, stringToColor } from "@/lib/utils";

interface UpdateLocationFormProps {
  locationId: string;
  onCancel?: () => void;
  onSuccess?: (locationId: string) => void;
  open?: boolean;
}

export const UpdateLocationForm = (props: UpdateLocationFormProps) => {
  return (
    <Suspense
      fallback={<UpdateLocationFormSkeleton></UpdateLocationFormSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <UpdateLocationFormSuspense {...props}></UpdateLocationFormSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UpdateLocationFormSkeleton = () => {
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

const UpdateLocationFormSuspense = ({
  locationId,
  onCancel,
  onSuccess,
  open,
}: UpdateLocationFormProps) => {
  const utils = trpc.useUtils();
  const [accordionValue, setAccordionValue] = useState<string>("basic");

  const [isMutating, setIsMutating] = useState(false);

  // ✅ Fetch existing location
  const [location] = trpc.locations.getOneProtected.useSuspenseQuery({
    id: locationId,
  });

  const form = useForm<z.infer<typeof locationUpdateSchema>>({
    resolver: zodResolver(locationUpdateSchema),
    values: {
      name: location.name,
      address: location.address ?? "",
      email: location.email ?? "",
      isActive: location.isActive ?? "",
      lat: location.lat ?? "",
      lng: location.lng ?? "",
      mapsLink: location.mapsLink ?? "",
      hours: location.hours.map((h) => ({
        ...h,
        day: h.day as (typeof DAY_OF_WEEK)[number],
      })),
      phone: location.phone ?? "",
    },
    mode: "onChange",
  });

  const { control, setValue, formState, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hours",
  });
  const watchedHours = watch("hours");

  const isModified = formState.isDirty;

  const updateLocation = trpc.locations.update.useMutation();

  const onSubmit = async (values: z.infer<typeof locationUpdateSchema>) => {
    const toastId = toast.loading("Updating location...");
    setIsMutating(true);

    try {
      const updatedLocation = await updateLocation.mutateAsync({
        id: locationId,
        ...values,
      });

      form.reset(values);

      await utils.locations.getFiltered.invalidate();
      await utils.locations.getOneProtected.invalidate({ id: locationId });
      toast.success("Location updated successfully!", { id: toastId });
      onSuccess?.(locationId);
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setIsMutating(false);
    }
  };

  const setAllHours = (open: string, close: string) => {
    fields.forEach((_, index) => {
      setValue(`hours.${index}.open`, open);
      setValue(`hours.${index}.close`, close);
      setValue(`hours.${index}.isClosed`, false);
    });
  };

  const setWeekdaysOnly = () => {
    fields.forEach((_, index) => {
      const day = DAY_OF_WEEK[index];
      if (day === "saturday" || day === "sunday") {
        setValue(`hours.${index}.isClosed`, true);
      } else {
        setValue(`hours.${index}.open`, "09:00");
        setValue(`hours.${index}.close`, "17:00");
        setValue(`hours.${index}.isClosed`, false);
      }
    });
  };

  return (
    <Card className="w-full border-muted-foreground/50 shadow-none pt-4">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion
              type="single"
              collapsible
              value={accordionValue}
              onValueChange={setAccordionValue}
              className="w-full gap-4 space-y-4"
            >
              {/* Basic Information */}
              <AccordionItem
                value="basic"
                className="border border-slate-400 rounded-lg px-4 shadow-lg"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Basic Information
                      </span>
                    </div>
                    <Badge variant="outline" className="ml-auto mr-2">
                      Required
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-semibold">
                          <Building2 className="w-4 h-4" />

                          <p className="leading-none">
                            <RequiredLabel>Location Name</RequiredLabel>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isMutating}
                            placeholder="Main Branch, Jakarta Office"
                            className="border-muted-foreground/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <p className="leading-none">
                            <RequiredLabel>Address</RequiredLabel>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isMutating}
                            placeholder="Jl. Sudirman No. 1, Jakarta Pusat"
                            className="border-muted-foreground/50 h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <RequiredLabel>Latitude</RequiredLabel>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="any"
                              disabled={isMutating}
                              placeholder="-6.200000"
                              className="border-muted-foreground/50 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="lng"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <RequiredLabel>Longitude</RequiredLabel>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="any"
                              disabled={isMutating}
                              placeholder="106.816666"
                              className="border-muted-foreground/50 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name="mapsLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <p className="leading-none">
                            <RequiredLabel>Maps Link</RequiredLabel>
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isMutating}
                            placeholder="https://maps.google.com/..."
                            className="border-muted-foreground/50 h-11"
                          />
                        </FormControl>
                        <FormDescription>
                          Link to Google Maps or other map service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Contact Information */}
              <AccordionItem
                value="contact"
                className="border border-slate-400 shadow-lg rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center gap-2">
                      <Phone className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Contact Information
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <p className="leading-none">
                              <RequiredLabel>Phone Number</RequiredLabel>
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isMutating}
                              placeholder="+62 8123456789"
                              className="border-muted-foreground/50 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <p className="leading-none">
                              <RequiredLabel>Email Address</RequiredLabel>
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              disabled={isMutating}
                              placeholder="jakarta@company.com"
                              className="border-muted-foreground/50 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Operating Hours */}
              <AccordionItem
                value="hours"
                className="border border-slate-400 rounded-lg px-4 shadow-lg"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Operating Hours
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto mr-2">
                      <Badge variant="secondary" className="text-xs">
                        {watchedHours!.filter((h) => !h.isClosed).length} days
                        open
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 px-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground w-full">
                      Quick Setup:
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAllHours("09:00", "17:00")}
                      className="text-xs"
                    >
                      9 AM - 5 PM (All Days)
                    </Button>
                    {/* <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setAllHours("08:00", "18:00")}
                                    className="text-xs"
                                  >
                                    8 AM - 6 PM (All Days)
                                  </Button> */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={setWeekdaysOnly}
                      className="text-xs"
                    >
                      Weekdays Only
                    </Button>
                  </div>

                  {/* Hours Grid */}
                  <div className="space-y-3">
                    {fields.map((hour, index) => {
                      const isWeekend =
                        DAY_OF_WEEK[index] === "saturday" ||
                        DAY_OF_WEEK[index] === "sunday";
                      const isClosed = watchedHours![index]?.isClosed;

                      return (
                        <div
                          key={hour.id}
                          className={`grid grid-cols-12 gap-2 items-center p-4 rounded-lg border transition-colors ${
                            isClosed
                              ? "bg-muted/30 border-muted-foreground/20"
                              : isWeekend
                                ? "bg-blue-50/50 border-blue-200/50"
                                : "bg-background border-border"
                          }`}
                        >
                          {/* Day */}
                          <div className="col-span-2 md:col-span-2">
                            <Badge
                              variant="outline"
                              style={{
                                backgroundColor: stringToColor(
                                  DAY_OF_WEEK[index],
                                  false
                                ),
                                color: stringToColor(DAY_OF_WEEK[index], true),
                              }}
                              className={`text-sm font-medium px-3 py-1 ${
                                isClosed ? "opacity-50" : ""
                              }`}
                            >
                              {getAbbr(DAY_OF_WEEK[index])}
                            </Badge>
                          </div>

                          {/* Open/Close Toggle */}
                          <div className="col-span-3 md:col-span-3 flex justify-center">
                            <FormField
                              control={control}
                              name={`hours.${index}.isClosed`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col items-center space-y-2">
                                  <FormLabel className="text-xs text-muted-foreground">
                                    {isClosed ? "Closed" : "Open"}
                                  </FormLabel>
                                  <FormControl>
                                    <Switch
                                      checked={!field.value}
                                      onCheckedChange={(checked) =>
                                        field.onChange(!checked)
                                      }
                                      disabled={isMutating}
                                      className="scale-90"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Time Inputs */}
                          <div className="col-span-7 md:col-span-7 grid grid-cols-2 gap-1">
                            <FormField
                              control={control}
                              name={`hours.${index}.open`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground">
                                    Opens
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="time"
                                      disabled={isMutating || isClosed}
                                      className="text-xs"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name={`hours.${index}.close`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-muted-foreground">
                                    Closes
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="time"
                                      disabled={isMutating || isClosed}
                                      className="text-xs"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Copy Previous Day */}
                          {/* <div className="col-span-2 md:col-span-2 flex justify-center">
                                          {index > 0 && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => copyPreviousDay(index)}
                                              disabled={isMutating}
                                              className="h-8 w-8 p-0"
                                              title="Copy previous day"
                                            >
                                              <Copy className="w-3 h-3" />
                                            </Button>
                                          )}
                                        </div> */}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hours Summary */}
                  <div className="p-5 bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl border border-muted-foreground/10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Weekly Schedule Overview
                        </h4>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs font-medium"
                        >
                          {watchedHours!.filter((h) => !h.isClosed).length}/7
                          days
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                      {watchedHours!.map((h, index) => {
                        const isWeekend =
                          DAY_OF_WEEK[index] === "saturday" ||
                          DAY_OF_WEEK[index] === "sunday";
                        const dayAbbr = getAbbr(DAY_OF_WEEK[index]);

                        return (
                          <div
                            key={DAY_OF_WEEK[index]}
                            className={`
                                            flex flex-col items-center p-3 rounded-lg border transition-all duration-200
                                            ${
                                              h.isClosed
                                                ? "bg-muted/50 border-muted-foreground/20 text-muted-foreground"
                                                : isWeekend
                                                  ? "bg-blue-50 border-blue-200/50 text-blue-700"
                                                  : "bg-white border-green-200/50 text-green-700"
                                            }
                                          `}
                          >
                            <div className="text-xs font-semibold mb-1 uppercase tracking-wider">
                              {dayAbbr}
                            </div>

                            {h.isClosed ? (
                              <div className="flex flex-col items-center">
                                <X className="w-4 h-4 mb-1 opacity-60" />
                                <span className="text-xs font-medium">
                                  Closed
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center text-center">
                                <Clock className="w-3 h-3 mb-1 opacity-70" />
                                <div className="text-[10px] leading-tight">
                                  <div className="font-medium">{h.open}</div>
                                  <div className="text-muted-foreground">
                                    to
                                  </div>
                                  <div className="font-medium">{h.close}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-end mt-4 pt-3 border-t border-muted-foreground/10">
                      <div className="text-xs text-muted-foreground">
                        Total:{" "}
                        {(() => {
                          const totalMinutes = watchedHours!.reduce(
                            (acc, h) => {
                              if (h.isClosed) return acc;
                              const [openHour, openMin] = h.open
                                .split(":")
                                .map(Number);
                              const [closeHour, closeMin] = h.close
                                .split(":")
                                .map(Number);
                              return (
                                acc +
                                (closeHour * 60 +
                                  closeMin -
                                  (openHour * 60 + openMin))
                              );
                            },
                            0
                          );
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;
                          return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}/week`;
                        })()}
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
                {isMutating ? "Updating..." : "Update Location"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
