"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { locationCreateSchema, hoursSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { DAY_OF_WEEK } from "@/db/schema/enums";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  Calendar,
  X,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { RequiredLabel } from "@/components/RequiredLabel";
import { getAbbr, stringToColor } from "@/lib/utils";

interface CreateLocationFormProps {
  onCancel?: () => void;
  onSuccess?: (locationId: string) => void;
  open: boolean;
}

export const CreateLocationForm = ({
  onCancel,
  onSuccess,
  open,
}: CreateLocationFormProps) => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>("basic");

  const DAY_COLORS = DAY_OF_WEEK.map((day) => stringToColor(day));

  const form = useForm<z.infer<typeof locationCreateSchema>>({
    resolver: zodResolver(locationCreateSchema),
    defaultValues: {
      name: "",
      address: "",
      lat: "",
      lng: "",
      mapsLink: "",
      phone: "",
      email: "",
      hours: DAY_OF_WEEK.map((day) => ({
        day,
        open: "09:00",
        close: "17:00",
        isClosed: false,
      })),
    },
  });

  const { control, setValue, watch } = form;
  const { fields } = useFieldArray({ control, name: "hours" });
  const watchedHours = watch("hours");

  const createLocation = trpc.locations.create.useMutation();

  const onSubmit = async (values: z.infer<typeof locationCreateSchema>) => {
    const toastId = toast.loading("Creating location...");
    setIsSubmitting(true);

    try {
      const data = await createLocation.mutateAsync({
        ...values,
        lat: values.lat.toString(),
        lng: values.lng.toString(),
      });
      utils.locations.getFiltered.invalidate();
      toast.success("Location created successfully!", { id: toastId });
      onSuccess?.(data.id);
    } catch (error: any) {
      toast.error(error.message || "Error creating location.", { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
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

  //   const copyPreviousDay = (index: number) => {
  //     if (index > 0) {
  //       const prevDay = watchedHours[index - 1];
  //       setValue(`hours.${index}.open`, prevDay.open);
  //       setValue(`hours.${index}.close`, prevDay.close);
  //       setValue(`hours.${index}.isClosed`, prevDay.isClosed);
  //     }
  //   };

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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                        {watchedHours.filter((h) => !h.isClosed).length} days
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
                      const isClosed = watchedHours[index]?.isClosed;

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
                              style={{
                                backgroundColor: DAY_COLORS[index].background,
                                color: DAY_COLORS[index].text,
                                border: `2px solid ${DAY_COLORS[index].border}`,
                              }}
                              className={`text-sm font-medium px-3 py-1 ${isClosed ? "opacity-50" : ""}`}
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
                                      disabled={isSubmitting}
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
                                      disabled={isSubmitting || isClosed}
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
                                      disabled={isSubmitting || isClosed}
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
                                disabled={isSubmitting}
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
                          {watchedHours.filter((h) => !h.isClosed).length}/7
                          days
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                      {watchedHours.map((h, index) => {
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
                          const totalMinutes = watchedHours.reduce((acc, h) => {
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
                          }, 0);
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

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-3">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4 mr-2" />
                      Create Location
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
