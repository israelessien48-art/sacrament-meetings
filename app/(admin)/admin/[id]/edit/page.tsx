export const instant = false;

import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/data";
import MeetingForm from "@/components/MeetingForm";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
        Administration
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Edit Meeting
      </h1>

      <p className="text-gray-600 mb-8">
        Update the details of this sacrament meeting program.
      </p>

      <MeetingForm meeting={meeting} />
    </div>
  );
}
