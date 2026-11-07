import { NextRequest, NextResponse } from "next/server";
import { getAllMeetings, getMeetingsByDate } from "@/lib/data";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  const meetings = date
    ? getMeetingsByDate(date)
    : getAllMeetings();

  return NextResponse.json(meetings);
}