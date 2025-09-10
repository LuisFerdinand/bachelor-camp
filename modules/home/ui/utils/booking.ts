// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Function to calculate total booking price
export const calculateTotal = (
  selectedCourse: any,
  selectedPricing: any,
  personCount: number,
  getSelectedWeeks: () => number
): number => {
  if (!selectedCourse || !selectedPricing) return 0;
  // Calculate accommodation cost based on person count
  const accommodationCostPerMonth = selectedPricing.numericPrice * personCount;
  // Calculate duration in months (approximate)
  const durationInMonths = getSelectedWeeks() / 4;
  // Calculate total cost
  const totalCost =
    selectedCourse.investment + accommodationCostPerMonth * durationInMonths;
  return totalCost;
};

// Function to get selected weeks
export const getSelectedWeeks = (
  selectedStartDate: Date | null,
  selectedEndDate: Date | null
): number => {
  if (!selectedStartDate || !selectedEndDate) return 0;
  const diffTime = Math.abs(
    selectedEndDate.getTime() - selectedStartDate.getTime()
  );
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
};

// Function to format date
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Function to check if date is available
export const isDateAvailable = (date: Date, availabilityData: any): boolean => {
  const dateStr = formatDate(date);
  return availabilityData[dateStr]?.available ?? false;
};

// Function to check if date is selected
export const isDateSelected = (
  date: Date,
  selectedStartDate: Date | null,
  selectedEndDate: Date | null
): boolean => {
  if (!selectedStartDate || !selectedEndDate) return false;
  return date >= selectedStartDate && date <= selectedEndDate;
};

// Function to check if date is in range
export const isDateInRange = (
  date: Date,
  selectedStartDate: Date | null,
  selectedEndDate: Date | null
): boolean => {
  if (!selectedStartDate) return false;
  if (!selectedEndDate) return date.getTime() === selectedStartDate.getTime();
  return date >= selectedStartDate && date <= selectedEndDate;
};

// Function to get days in month
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Function to get first day of month
export const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};
