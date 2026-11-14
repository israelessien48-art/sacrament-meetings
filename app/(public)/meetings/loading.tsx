export default function MeetingsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="animate-pulse">
        <div className="h-9 w-64 bg-gray-200 rounded mb-4" />

        <div className="h-5 w-96 max-w-full bg-gray-200 rounded mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-7 w-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-40 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-36 bg-gray-200 rounded mb-6" />
              <div className="h-9 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}