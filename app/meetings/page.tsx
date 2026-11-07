
import { headers } from "next/headers";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export const instant = false;

async function getMeetings(): Promise<SacramentMeeting[]> {
  const headersList = await headers();

  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "localhost:3001";

  const protocol =
    headersList.get("x-forwarded-proto") || "http";

  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  return response.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
          Meeting Schedule
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          All Sacrament Meetings
        </h1>

        <p className="text-gray-600 mt-3">
          Browse upcoming and previous meeting programs.
        </p>
      </div>

      {meetings.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No meetings are available.</p>
      )}
    </div>
  );
}
