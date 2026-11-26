"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  createMeetingInDatabase,
  updateMeetingInDatabase,
  deleteMeetingFromDatabase,
} from "@/lib/meetings-db";

const HymnSchema = z.object({
  title: z.string().trim().min(1, "Hymn title is required."),
  number: z.coerce.number().int().positive("Enter a valid hymn number."),
});

const SpeakerSchema = z.object({
  name: z.string().trim().min(1, "Speaker name is required."),
  topic: z.string().trim().min(1, "Speaker topic is required."),
  order: z.number().int().positive(),
});

const MeetingSchema = z.object({
  date: z.string().min(1, "Meeting date is required."),
  time: z.string().trim().min(1, "Meeting time is required."),
  type: z.enum(["sacrament", "ward-conference", "special"]),
  presiding: z.string().trim().min(1, "Presiding officer is required."),
  conducting: z.string().trim().min(1, "Conducting officer is required."),
  openingHymn: HymnSchema,
  sacramentHymn: HymnSchema,
  closingHymn: HymnSchema,
  intermediateHymn: HymnSchema.optional(),
  speakers: z.array(SpeakerSchema),
  wardBusiness: z.array(
    z.object({
      title: z.string().trim().min(1),
      description: z.string().optional(),
    })
  ),
  announcements: z.array(z.string().trim().min(1)),
  isCurrent: z.boolean(),
});

export type MeetingFormState = {
  message: string;
  errors?: Record<string, string[]>;
};

async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
}

function readArray(formData: FormData, field: string): string[] {
  return formData
    .getAll(field)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function readHymn(formData: FormData, prefix: string) {
  const title = String(formData.get(`${prefix}Title`) ?? "").trim();
  const number = String(formData.get(`${prefix}Number`) ?? "").trim();

  if (!title && !number) return undefined;

  return { title, number };
}

function getMeetingValues(formData: FormData) {
  const speakerNames = readArray(formData, "speakerName");
  const speakerTopics = readArray(formData, "speakerTopic");

  const wardTitles = readArray(formData, "wardBusinessTitle");
  const wardDescriptions = readArray(formData, "wardBusinessDescription");

  const announcements = String(
    formData.get("announcement") ?? ""
  )
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
    type: String(formData.get("type") ?? ""),
    presiding: String(formData.get("presiding") ?? ""),
    conducting: String(formData.get("conducting") ?? ""),
    openingHymn: readHymn(formData, "openingHymn"),
    sacramentHymn: readHymn(formData, "sacramentHymn"),
    closingHymn: readHymn(formData, "closingHymn"),
    intermediateHymn: readHymn(formData, "intermediateHymn"),
    speakers: speakerNames.map((name, index) => ({
      name,
      topic: speakerTopics[index] ?? "",
      order: index + 1,
    })),
    wardBusiness: wardTitles.map((title, index) => ({
      title,
      description: wardDescriptions[index] ?? "",
    })),
    announcements,
    isCurrent: formData.get("isCurrent") === "on",
  };
}

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await requireAdmin();

  const validated = MeetingSchema.safeParse(getMeetingValues(formData));

  if (!validated.success) {
    return {
      message: "Please correct the errors below.",
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createMeetingInDatabase(validated.data);
  } catch (error) {
    console.error("Create meeting error:", error);
    return { message: "Database error: unable to create meeting." };
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  revalidatePath("/meetings/current");

  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await requireAdmin();

  if (!Number.isInteger(id) || id <= 0) {
    return { message: "Invalid meeting ID." };
  }

  const validated = MeetingSchema.safeParse(getMeetingValues(formData));

  if (!validated.success) {
    return {
      message: "Please correct the errors below.",
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const result = await updateMeetingInDatabase(id, validated.data);

    if (result.length === 0) {
      return { message: "Meeting not found." };
    }
  } catch (error) {
    console.error("Update meeting error:", error);
    return { message: "Database error: unable to update meeting." };
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath("/meetings/current");

  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  await requireAdmin();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  try {
    const result = await deleteMeetingFromDatabase(id);

    if (result.length === 0) {
      throw new Error("Meeting not found.");
    }
  } catch (error) {
    console.error("Delete meeting error:", error);
    throw new Error("Unable to delete meeting.");
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  revalidatePath("/meetings/current");

  redirect("/meetings");
}
