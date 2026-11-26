"use client";

import { useActionState } from "react";
import { authenticate, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-md border border-gray-300 px-4 py-3"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-4 py-3"
          placeholder="Enter your password"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
