
"use client";

import { useActionState } from "react";
import { createMeeting, updateMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const initialState = { message: "" };

  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-lg bg-blue-50 text-blue-800 p-4"
        >
          {state.message}
        </p>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Meeting Information
        </h2>

        <div>
          <label htmlFor="date" className="block font-medium mb-2">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date ?? ""}
            required
            aria-describedby="date-help"
            className="w-full border rounded-lg px-4 py-3"
          />
          <p id="date-help" className="text-sm text-gray-500 mt-1">
            Select the date of the meeting.
          </p>
        </div>

        <div>
          <label htmlFor="time" className="block font-medium mb-2">
            Meeting Time
          </label>
          <input
            id="time"
            name="time"
            type="text"
            defaultValue={meeting?.time ?? ""}
            placeholder="10:00 AM"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-medium mb-2">
            Meeting Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={meeting?.type ?? "sacrament"}
            required
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="sacrament">Sacrament Meeting</option>
            <option value="ward-conference">Ward Conference</option>
            <option value="special">Special Meeting</option>
          </select>
        </div>

        <div>
          <label htmlFor="presiding" className="block font-medium mb-2">
            Presiding Officer
          </label>
          <input
            id="presiding"
            name="presiding"
            defaultValue={meeting?.presiding ?? ""}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="conducting" className="block font-medium mb-2">
            Conducting Officer
          </label>
          <input
            id="conducting"
            name="conducting"
            defaultValue={meeting?.conducting ?? ""}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Hymns</h2>

        {[
          {
            prefix: "openingHymn",
            label: "Opening Hymn",
            hymn: meeting?.openingHymn,
          },
          {
            prefix: "sacramentHymn",
            label: "Sacrament Hymn",
            hymn: meeting?.sacramentHymn,
          },
          {
            prefix: "closingHymn",
            label: "Closing Hymn",
            hymn: meeting?.closingHymn,
          },
        ].map((item) => (
          <div key={item.prefix} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${item.prefix}Title`}
                className="block font-medium mb-2"
              >
                {item.label} Title
              </label>
              <input
                id={`${item.prefix}Title`}
                name={`${item.prefix}Title`}
                defaultValue={item.hymn?.title ?? ""}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor={`${item.prefix}Number`}
                className="block font-medium mb-2"
              >
                {item.label} Number
              </label>
              <input
                id={`${item.prefix}Number`}
                name={`${item.prefix}Number`}
                type="number"
                min="1"
                defaultValue={item.hymn?.number ?? ""}
                required
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="intermediateHymnTitle"
              className="block font-medium mb-2"
            >
              Intermediate Hymn (Optional)
            </label>
            <input
              id="intermediateHymnTitle"
              name="intermediateHymnTitle"
              defaultValue={meeting?.intermediateHymn?.title ?? ""}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="intermediateHymnNumber"
              className="block font-medium mb-2"
            >
              Intermediate Hymn Number
            </label>
            <input
              id="intermediateHymnNumber"
              name="intermediateHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.intermediateHymn?.number ?? ""}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Speaker Information
        </h2>

        <div>
          <label htmlFor="speakerName" className="block font-medium mb-2">
            Speaker Name
          </label>
          <input
            id="speakerName"
            name="speakerName"
            defaultValue={meeting?.speakers[0]?.name ?? ""}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="speakerTopic" className="block font-medium mb-2">
            Speaking Topic
          </label>
          <input
            id="speakerTopic"
            name="speakerTopic"
            defaultValue={meeting?.speakers[0]?.topic ?? ""}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Ward Business and Announcements
        </h2>

        <div>
          <label
            htmlFor="wardBusinessTitle"
            className="block font-medium mb-2"
          >
            Ward Business
          </label>
          <input
            id="wardBusinessTitle"
            name="wardBusinessTitle"
            defaultValue={meeting?.wardBusiness[0]?.title ?? ""}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label
            htmlFor="wardBusinessDescription"
            className="block font-medium mb-2"
          >
            Ward Business Description
          </label>
          <textarea
            id="wardBusinessDescription"
            name="wardBusinessDescription"
            rows={3}
            defaultValue={meeting?.wardBusiness[0]?.description ?? ""}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="announcement" className="block font-medium mb-2">
            Announcements
          </label>
          <textarea
            id="announcement"
            name="announcement"
            rows={3}
            defaultValue={meeting?.announcements.join("\n") ?? ""}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <input
          id="isCurrent"
          name="isCurrent"
          type="checkbox"
          defaultChecked={meeting?.isCurrent ?? false}
          className="h-5 w-5"
        />
        <label htmlFor="isCurrent" className="font-medium">
          Set as current meeting
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-900 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending
          ? "Saving Meeting..."
          : meeting
            ? "Update Meeting"
            : "Create Meeting"}
      </button>
    </form>
  );
}
