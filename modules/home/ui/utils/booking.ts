import { BookingType } from "@/app/util/bookingData";

// Utility functions for booking date handling and calculations

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function isDateAvailable(
  date: Date,
  availabilityData: Record<string, { capacity: number }>
): boolean {
  const dateStr = formatDate(date);
  const availability = availabilityData[dateStr];
  return availability ? availability.capacity > 0 : true; // Default to available if no data
}

export function isDateSelected(date: Date, selectedDate: Date | null): boolean {
  if (!selectedDate) return false;
  return formatDate(date) === formatDate(selectedDate);
}

export function isDateInRange(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate) return false;
  if (!endDate) return isDateSelected(date, startDate);

  const dateTime = date.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  return dateTime >= startTime && dateTime <= endTime;
}

export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getSelectedWeeks(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.ceil(daysDiff / 7);
}

export function getSelectedMonths(startDate: Date, endDate: Date): number {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const dayDiff = endDate.getDate() - startDate.getDate();

  let totalMonths = yearDiff * 12 + monthDiff;

  // If end date is before start date in the month, subtract one month
  if (dayDiff < 0) {
    totalMonths -= 1;
  }

  // Minimum 1 month for any selection
  return Math.max(1, totalMonths + 1);
}

export function calculateAccommodationDurationPrice(
  pricingOption: { numericPrice: number },
  personCount: number,
  startDate: Date,
  endDate: Date
): number {
  const months = getSelectedMonths(startDate, endDate);
  return pricingOption.numericPrice * personCount * months;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to calculate duration in months from course duration string
export function calculateDurationInMonths(duration: string): number {
  if (duration.includes("Bulan")) {
    const months = Number.parseInt(duration.split(" ")[0]);
    return months;
  } else if (duration.includes("Minggu")) {
    const weeks = Number.parseInt(duration.split(" ")[0]);
    return Math.ceil(weeks / 4); // Convert weeks to months (round up)
  }
  return 1; // Default to 1 month minimum
}

// Updated calculateTotal function that works with the BookingType enum
export function calculateTotal(
  bookingType: BookingType,
  selectedCourse?: any,
  selectedPricing?: any,
  personCount = 1,
  startDate?: Date | null,
  endDate?: Date | null
): number {
  if (!bookingType) return 0;

  switch (bookingType) {
    case BookingType.ACCOMMODATION_ONLY:
      if (!selectedPricing) return 0;
      // For accommodation only, return monthly rate
      return selectedPricing.numericPrice * personCount;

    case BookingType.PROGRAM_ONLY:
      if (!selectedCourse) return 0;
      return selectedCourse.investment || 0;

    case BookingType.PROGRAM_WITH_ACCOMMODATION:
      if (!selectedCourse || !selectedPricing) return 0;
      const programCost = selectedCourse.investment || 0;
      const durationInMonths = calculateDurationInMonths(
        selectedCourse.duration
      );
      const accommodationCost =
        selectedPricing.numericPrice * personCount * durationInMonths;
      return programCost + accommodationCost;

    default:
      return 0;
  }
}

// Function to get booking type labels
export function getBookingTypeLabel(bookingType: BookingType): string {
  switch (bookingType) {
    case BookingType.ACCOMMODATION_ONLY:
      return "Accommodation Only";
    case BookingType.PROGRAM_ONLY:
      return "Program Only";
    case BookingType.PROGRAM_WITH_ACCOMMODATION:
      return "Program with Accommodation";
    default:
      return "Unknown";
  }
}
