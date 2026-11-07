
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
          {meeting.type === "ward-conference"
            ? "Ward Conference"
            : meeting.type === "special"
              ? "Special Meeting"
              : "Sacrament Meeting"}
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          Meeting Program
        </h1>

        <p className="text-gray-600 mt-2">
          {meeting.date} at {meeting.time}
        </p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Presiding:</strong> {meeting.presiding}</p>
          <p><strong>Conducting:</strong> {meeting.conducting}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Opening Hymn
        </h2>
        <p className="text-gray-700">
          Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Sacrament Hymn
        </h2>
        <p className="text-gray-700">
          Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.intermediateHymn && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Intermediate Hymn
          </h2>
          <p className="text-gray-700">
            Hymn {meeting.intermediateHymn.number}: {meeting.intermediateHymn.title}
          </p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Speakers
        </h2>
        <div className="space-y-4">
          {meeting.speakers
            .sort((a, b) => a.order - b.order)
            .map((speaker) => (
              <div key={`${speaker.order}-${speaker.name}`} className="border-l-4 border-blue-800 pl-4">
                <p className="font-semibold text-gray-900">{speaker.name}</p>
                <p className="text-gray-600">{speaker.topic}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Closing Hymn
        </h2>
        <p className="text-gray-700">
          Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
        </p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Ward Business
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={`${item.title}-${index}`}>
                <strong>{item.title}</strong>
                {item.description && ` — ${item.description}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Announcements
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {meeting.announcements.map((announcement, index) => (
            <li key={index}>{announcement}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
