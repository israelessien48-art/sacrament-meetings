
import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-blue-900">
          Sacrament Planner
        </Link>

        <Suspense fallback={<div className="h-6" aria-hidden="true" />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
