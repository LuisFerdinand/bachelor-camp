import ProgramBooking from "@/modules/home/ui/pages/programBooking";
import { Suspense } from "react";

export default function ProgramBookingPage() {
  return (
    <Suspense fallback={<div>Loading booking information...</div>}>
      <ProgramBooking />
    </Suspense>
  );
}
