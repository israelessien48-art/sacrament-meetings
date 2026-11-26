import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Administrator Login | Sacrament Meeting Planner",
  description: "Sign in to manage sacrament meeting programs and schedules.",
};

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3">
        Administrator Login
      </h1>

      <p className="text-gray-600 mb-8">
        Sign in to manage sacrament meeting programs.
      </p>

      <LoginForm />
    </main>
  );
}
