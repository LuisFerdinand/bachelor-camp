"use client";

import { useState, useCallback, useMemo } from "react";
import {
  BookingType,
  type BookingItem,
  type Course,
  createAccommodationOnlyBooking,
  createProgramOnlyBooking,
  createProgramWithAccommodationBooking,
  getSuitableBuildings,
} from "@/app/util/bookingData";
import type { Building } from "@/app/util/buildingData";

export interface BookingFlowState {
  bookingType: BookingType | null;
  selectedBuilding: Building | null;
  selectedCourse: Course | null;
  selectedPricing: Building["pricing"][0] | null;
  personCount: number;
  selectedStartMonth: { month: string; year: number } | null;
}

const initialState: BookingFlowState = {
  bookingType: null,
  selectedBuilding: null,
  selectedCourse: null,
  selectedPricing: null,
  personCount: 1,
  selectedStartMonth: null,
};

export function useBookingFlow() {
  const [state, setState] = useState<BookingFlowState>(initialState);

  const setBookingType = useCallback((bookingType: BookingType) => {
    setState((prev) => ({
      ...initialState,
      bookingType,
    }));
  }, []);

  const setSelectedBuilding = useCallback((building: Building | null) => {
    setState((prev) => ({
      ...prev,
      selectedBuilding: building,
      selectedPricing: null, // Reset pricing when building changes
    }));
  }, []);

  const setSelectedCourse = useCallback((course: Course | null) => {
    setState((prev) => ({
      ...prev,
      selectedCourse: course,
      selectedStartMonth: null, // Reset start month when course changes
    }));
  }, []);

  const setSelectedPricing = useCallback(
    (pricing: Building["pricing"][0] | null) => {
      setState((prev) => ({
        ...prev,
        selectedPricing: pricing,
        personCount: pricing ? pricing.capacity : 1, // Set to minimum capacity
      }));
    },
    []
  );

  const setPersonCount = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      personCount: count,
    }));
  }, []);

  const setSelectedStartMonth = useCallback(
    (startMonth: { month: string; year: number } | null) => {
      setState((prev) => ({
        ...prev,
        selectedStartMonth: startMonth,
      }));
    },
    []
  );

  const currentBookingItem = useMemo((): BookingItem | null => {
    const {
      bookingType,
      selectedBuilding,
      selectedCourse,
      selectedPricing,
      personCount,
      selectedStartMonth,
    } = state;

    if (!bookingType) return null;

    try {
      switch (bookingType) {
        case BookingType.ACCOMMODATION_ONLY:
          if (selectedBuilding && selectedPricing && personCount) {
            return createAccommodationOnlyBooking(
              selectedBuilding,
              selectedPricing,
              personCount
            );
          }
          break;

        case BookingType.PROGRAM_ONLY:
          if (selectedCourse && selectedStartMonth) {
            return createProgramOnlyBooking(selectedCourse, selectedStartMonth);
          }
          break;

        case BookingType.PROGRAM_WITH_ACCOMMODATION:
          if (
            selectedBuilding &&
            selectedCourse &&
            selectedPricing &&
            personCount &&
            selectedStartMonth
          ) {
            return createProgramWithAccommodationBooking(
              selectedBuilding,
              selectedCourse,
              selectedPricing,
              personCount,
              selectedStartMonth
            );
          }
          break;
      }
    } catch (error) {
      console.error("Error generating booking item:", error);
    }

    return null;
  }, [state]);

  const resetBooking = useCallback(() => {
    setState(initialState);
  }, []);

  const isBookingComplete = useMemo((): boolean => {
    const {
      bookingType,
      selectedBuilding,
      selectedCourse,
      selectedPricing,
      personCount,
      selectedStartMonth,
    } = state;

    if (!bookingType) return false;

    switch (bookingType) {
      case BookingType.ACCOMMODATION_ONLY:
        return !!(selectedBuilding && selectedPricing && personCount);

      case BookingType.PROGRAM_ONLY:
        return !!(selectedCourse && selectedStartMonth);

      case BookingType.PROGRAM_WITH_ACCOMMODATION:
        return !!(
          selectedBuilding &&
          selectedCourse &&
          selectedPricing &&
          personCount &&
          selectedStartMonth
        );

      default:
        return false;
    }
  }, [state]);

  const getAvailableBuildings = useCallback((): Building[] => {
    const { bookingType, selectedCourse } = state;

    if (
      bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION &&
      selectedCourse
    ) {
      return getSuitableBuildings(selectedCourse.id);
    }

    // For accommodation-only, return all buildings
    // This would typically come from a buildings API or context
    return [];
  }, [state]);

  const getNextStep = useMemo((): string | null => {
    const {
      bookingType,
      selectedBuilding,
      selectedCourse,
      selectedPricing,
      selectedStartMonth,
    } = state;

    if (!bookingType) return "Select booking type";

    switch (bookingType) {
      case BookingType.ACCOMMODATION_ONLY:
        if (!selectedBuilding) return "Select accommodation";
        if (!selectedPricing) return "Select room type";
        return null; // Complete

      case BookingType.PROGRAM_ONLY:
        if (!selectedCourse) return "Select program";
        if (!selectedStartMonth) return "Select start month";
        return null; // Complete

      case BookingType.PROGRAM_WITH_ACCOMMODATION:
        if (!selectedCourse) return "Select program";
        if (!selectedBuilding) return "Select accommodation";
        if (!selectedPricing) return "Select room type";
        if (!selectedStartMonth) return "Select start month";
        return null; // Complete

      default:
        return "Unknown booking type";
    }
  }, [state]);

  return {
    state,
    setBookingType,
    setSelectedBuilding,
    setSelectedCourse,
    setSelectedPricing,
    setPersonCount,
    setSelectedStartMonth,
    currentBookingItem, // Return the computed booking item directly
    resetBooking,
    isBookingComplete,
    getAvailableBuildings,
    getNextStep,
  };
}
