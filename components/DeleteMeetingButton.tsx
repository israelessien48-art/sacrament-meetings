"use client";

import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingButtonProps {
  meetingId: number;
}

export default function DeleteMeetingButton({
  meetingId,
}: DeleteMeetingButtonProps) {
  const deleteAction = deleteMeeting.bind(null, meetingId);

  return (
    <form
      action={deleteAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this meeting? This action cannot be undone."
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800"
      >
        Delete Meeting
      </button>
    </form>
  );
}