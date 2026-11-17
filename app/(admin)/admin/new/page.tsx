import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
        Administration
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Create New Meeting
      </h1>

      <p className="text-gray-600 mb-8">
        Enter the details below to create a sacrament meeting program.
      </p>

      <MeetingForm />
    </div>
  );
}