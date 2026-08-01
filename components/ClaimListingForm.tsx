"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ClaimListingFormProps = {
  listingId: string;
};

type Status =
  | "loading"
  | "signed-out"
  | "idle"
  | "open"
  | "submitting"
  | "success"
  | "error";

export default function ClaimListingForm({ listingId }: ClaimListingFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("loading");
  const [businessEmail, setBusinessEmail] = useState("");
  const [verificationInfo, setVerificationInfo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setStatus(user ? "idle" : "signed-out");
      if (user?.email) setBusinessEmail(user.email);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus("signed-out");
      return;
    }

    const { error } = await supabase.from("claim_requests").insert({
      listing_id: listingId,
      user_id: user.id,
      business_email: businessEmail,
      verification_info: verificationInfo.trim() === "" ? null : verificationInfo,
      message: message.trim() === "" ? null : message,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "loading") {
    return null;
  }

  if (status === "success") {
    return (
      <div
        id="claim"
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
      >
        Thanks — we&apos;ll verify and follow up at the email you provided.
      </div>
    );
  }

  if (status === "signed-out") {
    return (
      <Link
        id="claim"
        href={`/login?redirectTo=${encodeURIComponent(pathname)}`}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Sign in to claim this listing
      </Link>
    );
  }

  if (status === "idle") {
    return (
      <button
        type="button"
        id="claim"
        onClick={() => setStatus("open")}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Claim this listing
      </button>
    );
  }

  return (
    <form
      id="claim"
      onSubmit={handleSubmit}
      className="max-w-sm rounded-lg border border-slate-200 bg-slate-50 p-5"
    >
      <h2 className="font-semibold text-slate-900">Claim this listing</h2>
      <p className="mt-1 text-sm text-slate-600">
        Let us know you&apos;re authorized to manage this company&apos;s listing and we&apos;ll
        follow up.
      </p>

      <div className="mt-4">
        <label htmlFor="claim-email" className="block text-sm font-medium text-slate-700">
          Business email
        </label>
        <input
          id="claim-email"
          type="email"
          required
          value={businessEmail}
          onChange={(event) => setBusinessEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="claim-verification" className="block text-sm font-medium text-slate-700">
          Proof of affiliation (optional)
        </label>
        <input
          id="claim-verification"
          type="text"
          placeholder="LinkedIn profile, phone number, etc."
          value={verificationInfo}
          onChange={(event) => setVerificationInfo(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="claim-message" className="block text-sm font-medium text-slate-700">
          Message (optional)
        </label>
        <textarea
          id="claim-message"
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit claim"}
      </button>
    </form>
  );
}
