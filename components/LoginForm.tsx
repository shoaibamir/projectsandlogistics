"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "verifying" | "error";

function safeRedirectTarget(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirectTarget(searchParams.get("redirectTo"));
  const callbackError = searchParams.get("error");
  const callbackReason = searchParams.get("reason");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>(callbackError ? "error" : "idle");
  const [errorMessage, setErrorMessage] = useState(
    callbackError ? callbackReason || "Sign-in failed. Please try again." : "",
  );

  async function handleGoogleSignIn() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  async function handleMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("sent");
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("verifying");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      setStatus("sent");
      setErrorMessage(error.message);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  if (status === "sent" || status === "verifying") {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          Check your email — we sent a sign-in link to {email}. Opening the
          link in the same browser signs you in automatically. If you open it
          somewhere else, enter the verification code from that email instead.
        </div>

        <form onSubmit={handleVerifyCode}>
          <label htmlFor="login-code" className="block text-sm font-medium text-slate-700">
            Verification code
          </label>
          <input
            id="login-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
          />
          <button
            type="submit"
            disabled={status === "verifying"}
            className="mt-4 w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {status === "verifying" ? "Verifying…" : "Verify code"}
          </button>
        </form>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-xs font-medium uppercase text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleMagicLink}>
        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-4 w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send magic link"}
        </button>
      </form>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}
