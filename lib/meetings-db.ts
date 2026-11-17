
import { sql } from "@/lib/db";
import type { MeetingType, Hymn, SpeakerItem, WardBusinessItem } from "@/lib/types";

export interface MeetingInput {
  date: string;
  time: string;
  type: MeetingType;
  presiding: string;
  conducting: string;
  openingHymn: Hymn;
  sacramentHymn: Hymn;
  closingHymn: Hymn;
  intermediateHymn?: Hymn;
  speakers: SpeakerItem[];
  wardBusiness: WardBusinessItem[];
  announcements: string[];
  isCurrent: boolean;
}

export async function createMeetingInDatabase(meeting: MeetingInput) {
  if (meeting.isCurrent) {
    await sql`
      UPDATE meetings
      SET is_current = FALSE
      WHERE is_current = TRUE
    `;
  }

  return sql`
    INSERT INTO meetings (
      date, time, type, presiding, conducting,
      opening_hymn, sacrament_hymn, closing_hymn,
      intermediate_hymn, speakers, ward_business,
      announcements, is_current
    )
    VALUES (
      ${meeting.date},
      ${meeting.time},
      ${meeting.type},
      ${meeting.presiding},
      ${meeting.conducting},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.intermediateHymn ? JSON.stringify(meeting.intermediateHymn) : null}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${JSON.stringify(meeting.announcements)}::jsonb,
      ${meeting.isCurrent}
    )
  `;
}

export async function updateMeetingInDatabase(
  id: number,
  meeting: MeetingInput
) {
  if (meeting.isCurrent) {
    await sql`
      UPDATE meetings
      SET is_current = FALSE
      WHERE is_current = TRUE AND id != ${id}
    `;
  }

  return sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      time = ${meeting.time},
      type = ${meeting.type},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      intermediate_hymn = ${meeting.intermediateHymn ? JSON.stringify(meeting.intermediateHymn) : null}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      announcements = ${JSON.stringify(meeting.announcements)}::jsonb,
      is_current = ${meeting.isCurrent}
    WHERE id = ${id}
    RETURNING id
  `;
}

export async function deleteMeetingFromDatabase(id: number) {
  return sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;
}
