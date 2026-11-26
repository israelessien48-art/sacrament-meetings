export const instant = false;

import type { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-gray-600">
          Signed in as {session.user.email}
        </p>

        <SignOutButton />
      </div>

      {children}
    </section>
  );
}

