
import { sql } from "./db";
import type { MeetingType, SacramentMeeting } from "./types";

export async function getAllMeetings(): Promise<SacramentMeeting[]> {
  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      time,
      type,
      presiding,
      conducting,
      opening_hymn AS "openingHymn",
      sacrament_hymn AS "sacramentHymn",
      closing_hymn AS "closingHymn",
      intermediate_hymn AS "intermediateHymn",
      speakers,
      ward_business AS "wardBusiness",
      announcements,
      is_current AS "isCurrent"
    FROM meetings
    ORDER BY date DESC
  `;

  return meetings as unknown as SacramentMeeting[];
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      time,
      type,
      presiding,
      conducting,
      opening_hymn AS "openingHymn",
      sacrament_hymn AS "sacramentHymn",
      closing_hymn AS "closingHymn",
      intermediate_hymn AS "intermediateHymn",
      speakers,
      ward_business AS "wardBusiness",
      announcements,
      is_current AS "isCurrent"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return meetings[0] as unknown as SacramentMeeting | undefined;
}

export async function getCurrentMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      time,
      type,
      presiding,
      conducting,
      opening_hymn AS "openingHymn",
      sacrament_hymn AS "sacramentHymn",
      closing_hymn AS "closingHymn",
      intermediate_hymn AS "intermediateHymn",
      speakers,
      ward_business AS "wardBusiness",
      announcements,
      is_current AS "isCurrent"
    FROM meetings
    WHERE is_current = TRUE
    LIMIT 1
  `;

  return meetings[0] as unknown as SacramentMeeting | undefined;
}

export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      time,
      type,
      presiding,
      conducting,
      opening_hymn AS "openingHymn",
      sacrament_hymn AS "sacramentHymn",
      closing_hymn AS "closingHymn",
      intermediate_hymn AS "intermediateHymn",
      speakers,
      ward_business AS "wardBusiness",
      announcements,
      is_current AS "isCurrent"
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return meetings as unknown as SacramentMeeting[];
}

export interface MeetingSearchFilters {
  speaker?: string;
  presiding?: string;
  conducting?: string;
  type?: MeetingType;
  page?: number;
}

export interface PaginatedMeetings {
  meetings: SacramentMeeting[];
  totalMeetings: number;
  totalPages: number;
  currentPage: number;
}

export async function getFilteredMeetings({
  speaker = "",
  presiding = "",
  conducting = "",
  type,
  page = 1,
}: MeetingSearchFilters): Promise<PaginatedMeetings> {
  const pageSize = 5;
  const currentPage = Math.max(1, page);
  const offset = (currentPage - 1) * pageSize;
  const meetingType = type || "";

  const countResult = await sql`
    SELECT COUNT(*)::int AS total
    FROM meetings
    WHERE
      (
        ${speaker} = ''
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(speakers) AS speaker_item
          WHERE speaker_item->>'name' ILIKE '%' || ${speaker} || '%'
        )
      )
      AND (
        ${presiding} = ''
        OR presiding ILIKE '%' || ${presiding} || '%'
      )
      AND (
        ${conducting} = ''
        OR conducting ILIKE '%' || ${conducting} || '%'
      )
      AND (
        ${meetingType} = ''
        OR type = ${meetingType}
      )
  `;

  const totalMeetings = countResult[0].total as number;
  const totalPages = Math.ceil(totalMeetings / pageSize);

  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      time,
      type,
      presiding,
      conducting,
      opening_hymn AS "openingHymn",
      sacrament_hymn AS "sacramentHymn",
      closing_hymn AS "closingHymn",
      intermediate_hymn AS "intermediateHymn",
      speakers,
      ward_business AS "wardBusiness",
      announcements,
      is_current AS "isCurrent"
    FROM meetings
    WHERE
      (
        ${speaker} = ''
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(speakers) AS speaker_item
          WHERE speaker_item->>'name' ILIKE '%' || ${speaker} || '%'
        )
      )
      AND (
        ${presiding} = ''
        OR presiding ILIKE '%' || ${presiding} || '%'
      )
      AND (
        ${conducting} = ''
        OR conducting ILIKE '%' || ${conducting} || '%'
      )
      AND (
        ${meetingType} = ''
        OR type = ${meetingType}
      )
    ORDER BY date DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  return {
    meetings: meetings as unknown as SacramentMeeting[],
    totalMeetings,
    totalPages,
    currentPage,
  };
}
