import { Suspense } from "react";
import BookingPageClient from "./BookingPageClient";

export default function BookPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <BookingPageClient />
    </Suspense>
  );
}