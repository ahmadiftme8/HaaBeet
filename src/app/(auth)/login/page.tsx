"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="mx-auto flex min-h-screen max-w-[400px] flex-col justify-center px-4">
      <h1 className="mb-6 text-2xl font-semibold">Log in</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        No account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
