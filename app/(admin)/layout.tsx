
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {children}
    </section>
  );
}
