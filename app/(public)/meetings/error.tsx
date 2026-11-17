"use client";

import { useEffect } from "react";

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Meetings page error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Something went wrong
      </h2>

      <p className="text-gray-600 mb-6" role="alert" aria-live="polite">
        We could not load the meetings. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
      >
        Try Again
      </button>
    </div>
  );
}