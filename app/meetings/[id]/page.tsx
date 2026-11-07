import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { SacramentMeeting } from "@/lib/types";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";

export const instant = false;

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
  const headersList = await headers();

  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host");

  const protocol =
    headersList.get("x-forwarded-proto") || "http";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${protocol}://${host || "localhost:3001"}`;

  const response = await fetch(
    `${baseUrl}/api/meetings/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    notFound();
  }

  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
            Meeting Details
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Sacrament Meeting Program
          </h1>
        </div>

        <PrintButton />
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}