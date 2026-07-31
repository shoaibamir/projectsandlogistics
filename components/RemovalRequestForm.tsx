"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

type Status = "idle" | "submitting" | "success" | "error";

function extractListingId(link: string): string | null {
  if (!link.trim()) return null;
  try {
    const url = new URL(link, "https://placeholder.local");
    const match = url.pathname.match(/\/directory\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

export default function RemovalRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [listingLink, setListingLink] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const listingId = extractListingId(listingLink);
    const combinedMessage = [
      message.trim(),
      !listingId && listingLink.trim() ? `Listing reference provided: ${listingLink.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const { error } = await supabase.from("removal_requests").insert({
      business_name: businessName,
      email,
      listing_id: listingId,
      message: combinedMessage || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
        Thanks — we&apos;ve received your request and will follow up at the email you provided.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div>
        <label htmlFor="removal-business-name" className="block text-sm font-medium text-slate-700">
          Business name
        </label>
        <input
          id="removal-business-name"
          type="text"
          required
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="removal-email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="removal-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="removal-listing-link" className="block text-sm font-medium text-slate-700">
          Listing link (optional)
        </label>
        <input
          id="removal-listing-link"
          type="text"
          value={listingLink}
          onChange={(event) => setListingLink(event.target.value)}
          placeholder="https://projectsandlogistics.com/directory/..."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="removal-message" className="block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="removal-message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Let us know why you'd like this listing removed."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
