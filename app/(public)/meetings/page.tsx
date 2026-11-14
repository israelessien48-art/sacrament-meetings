
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { getFilteredMeetings } from "@/lib/data";
import type { MeetingType } from "@/lib/types";

interface MeetingsPageProps {
  searchParams: Promise<{
    speaker?: string;
    presiding?: string;
    conducting?: string;
    type?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const validTypes: MeetingType[] = [
    "sacrament",
    "ward-conference",
    "special",
  ];

  const type = validTypes.includes(params.type as MeetingType)
    ? (params.type as MeetingType)
    : undefined;

  const parsedPage = Number(params.page);
  const page =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const result = await getFilteredMeetings({
    speaker: params.speaker,
    presiding: params.presiding,
    conducting: params.conducting,
    type,
    page,
  });

  const { meetings, totalMeetings, totalPages, currentPage } = result;

  const query = new URLSearchParams();

  if (params.speaker) query.set("speaker", params.speaker);
  if (params.presiding) query.set("presiding", params.presiding);
  if (params.conducting) query.set("conducting", params.conducting);
  if (type) query.set("type", type);

  function pageUrl(pageNumber: number) {
    const search = new URLSearchParams(query);
    search.set("page", String(pageNumber));
    return `/meetings?${search.toString()}`;
  }

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
          Browse and search upcoming and previous meeting programs.
        </p>
      </div>

      <form
        method="GET"
        action="/meetings"
        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      >
        <input
          type="text"
          name="speaker"
          defaultValue={params.speaker}
          placeholder="Search speaker"
          aria-label="Search by speaker"
          className="border rounded-lg px-4 py-3"
        />

        <input
          type="text"
          name="presiding"
          defaultValue={params.presiding}
          placeholder="Search presiding"
          aria-label="Search by presiding"
          className="border rounded-lg px-4 py-3"
        />

        <input
          type="text"
          name="conducting"
          defaultValue={params.conducting}
          placeholder="Search conducting"
          aria-label="Search by conducting"
          className="border rounded-lg px-4 py-3"
        />

        <select
          name="type"
          defaultValue={type ?? ""}
          aria-label="Filter by meeting type"
          className="border rounded-lg px-4 py-3"
        >
          <option value="">All meeting types</option>
          <option value="sacrament">Sacrament</option>
          <option value="ward-conference">Ward Conference</option>
          <option value="special">Special</option>
        </select>

        <button
          type="submit"
          className="bg-blue-800 text-white rounded-lg px-4 py-3 font-semibold hover:bg-blue-900"
        >
          Search
        </button>
      </form>

      <div className="mb-6 text-sm text-gray-600">
        Showing {meetings.length} of {totalMeetings} meetings
      </div>

      {meetings.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No meetings match your search.</p>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Meeting pages"
          className="flex items-center justify-center gap-4 mt-10"
        >
          {currentPage > 1 && (
            <Link
              href={pageUrl(currentPage - 1)}
              className="border rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Previous
            </Link>
          )}

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={pageUrl(currentPage + 1)}
              className="border rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
