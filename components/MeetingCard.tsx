
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-sm font-semibold text-blue-800">
          {meeting.type === "ward-conference"
            ? "Ward Conference"
            : meeting.type === "special"
              ? "Special Meeting"
              : "Sacrament Meeting"}
        </span>

        {meeting.isCurrent && (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            Current
          </span>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>

      <p className="text-gray-600 mb-2">{meeting.time}</p>

      <p className="text-sm text-gray-600 mb-5">
        Presiding: {meeting.presiding}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
      >
        View Meeting
      </Link>
    </article>
  );
}
