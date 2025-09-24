import { type BookingItem, BookingType } from "./bookingData";

export function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export function getBookingTypeLabel(bookingType: BookingType): string {
  switch (bookingType) {
    case BookingType.ACCOMMODATION_ONLY:
      return "Accommodation Only";
    case BookingType.PROGRAM_ONLY:
      return "Program Only";
    case BookingType.PROGRAM_WITH_ACCOMMODATION:
      return "Program + Accommodation";
    default:
      return "Unknown";
  }
}

export function validateBookingItem(bookingItem: BookingItem): boolean {
  switch (bookingItem.bookingType) {
    case BookingType.ACCOMMODATION_ONLY:
      return !!(
        bookingItem.building &&
        bookingItem.pricingOption &&
        bookingItem.personCount
      );
    case BookingType.PROGRAM_ONLY:
      return !!(bookingItem.course && bookingItem.selectedStartMonth);
    case BookingType.PROGRAM_WITH_ACCOMMODATION:
      return !!(
        bookingItem.building &&
        bookingItem.course &&
        bookingItem.pricingOption &&
        bookingItem.personCount &&
        bookingItem.selectedStartMonth
      );
    default:
      return false;
  }
}

export function getBookingSummaryTitle(bookingType: BookingType): string {
  switch (bookingType) {
    case BookingType.ACCOMMODATION_ONLY:
      return "Accommodation Booking Summary";
    case BookingType.PROGRAM_ONLY:
      return "Program Booking Summary";
    case BookingType.PROGRAM_WITH_ACCOMMODATION:
      return "Program + Accommodation Booking Summary";
    default:
      return "Booking Summary";
  }
}
