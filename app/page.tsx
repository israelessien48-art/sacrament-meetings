
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import type { SacramentMeeting } from "@/lib/types";

export const instant = false;

async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
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

  const meetings: SacramentMeeting[] = await response.json();

  return meetings.find((meeting) => meeting.isCurrent) || null;
}

export default async function Home() {
  const currentMeeting = await getCurrentMeeting();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-blue-950 text-white rounded-2xl p-8 md:p-12 mb-10">
        <div className="max-w-2xl">
          <p className="text-blue-200 font-semibold uppercase tracking-wider text-sm mb-3">
            Welcome
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Sacrament Meeting Planner
          </h1>

          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Organize meeting programs, manage speakers, plan hymns, and keep
            important ward information in one place.
          </p>

          <Link
            href="/meetings"
            className="inline-block bg-white text-blue-950 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
          >
            View All Meetings
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
            Simple Planning
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prepare for meaningful worship
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Find meeting schedules, review hymn selections, see who will be
            speaking, and access meeting programs whenever you need them.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/next.svg"
            alt="Next.js logo representing the technology used to build this planner"
            width={180}
            height={38}
            priority
          />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
              This Week
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Current Meeting
            </h2>
          </div>

          <Link
            href="/meetings/current"
            className="text-blue-800 font-semibold hover:underline"
          >
            View Full Program →
          </Link>
        </div>

        {currentMeeting ? (
          <div className="border-t border-gray-200 pt-5">
            <p className="text-gray-600 mb-2">
              {currentMeeting.date} · {currentMeeting.time}
            </p>
            <p className="font-semibold text-gray-900">
              Presiding: {currentMeeting.presiding}
            </p>
            <p className="text-gray-600 mt-2">
              {currentMeeting.speakers.length} scheduled speakers
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No current meeting is scheduled.</p>
        )}
      </section>
    </div>
  );
}
