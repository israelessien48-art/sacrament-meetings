
"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden bg-blue-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
    >
      Print Meeting Program
    </button>
  );
}
