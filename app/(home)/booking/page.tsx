"use client";
import { Suspense } from 'react';
import BookingPage from "@/modules/home/ui/pages/booking";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading booking information...</div>}>
      <BookingPage />
    </Suspense>
  );
}