import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Meeting Not Found
      </h1>

      <p className="text-gray-600 mb-6">
        Sorry, the meeting you are looking for does not exist.
      </p>

      <Link
        href="/meetings"
        className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
      >
        View All Meetings
      </Link>
    </div>
  );
}