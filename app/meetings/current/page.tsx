
import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/data";

export default function CurrentMeetingPage() {
  const meeting = getCurrentMeeting();

  if (!meeting) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          No Current Meeting
        </h1>
        <p className="text-gray-600">
          There is no current meeting scheduled at this time.
        </p>
      </div>
    );
  }

  redirect(`/meetings/${meeting.id}`);
}
