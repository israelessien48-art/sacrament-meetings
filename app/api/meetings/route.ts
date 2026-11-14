import { NextRequest, NextResponse } from "next/server";
import { getAllMeetings, getMeetingsByDate } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");

    const meetings = date
      ? await getMeetingsByDate(date)
      : await getAllMeetings();

    return NextResponse.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);

    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}