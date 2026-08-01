"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { uniqueSlug } from "@/lib/slug";
import { CATEGORIES, type Category } from "@/lib/listings";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30";
const labelClass = "block text-sm font-medium text-slate-700";

export default function ListYourCompanyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus("error");
      setErrorMessage("You need to be signed in to submit a listing.");
      return;
    }

    const { error } = await supabase.from("listings").insert({
      id: uniqueSlug(name),
      name,
      category,
      country,
      city: city.trim() === "" ? null : city,
      state: state.trim() === "" ? null : state,
      street_address: streetAddress.trim() === "" ? null : streetAddress,
      description,
      services: services
        .split(",")
        .map((service) => service.trim())
        .filter(Boolean),
      phone: phone.trim() === "" ? null : phone,
      website: website.trim() === "" ? null : website,
      contact_email: contactEmail.trim() === "" ? null : contactEmail,
      owner_id: user.id,
      claimed: true,
      source: "self-listed",
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
        Submitted for review — you&apos;ll be able to see it live once approved.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lyc-name" className={labelClass}>
            Company name
          </label>
          <input
            id="lyc-name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lyc-category" className={labelClass}>
            Category
          </label>
          <select
            id="lyc-category"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lyc-description" className={labelClass}>
          Description
        </label>
        <textarea
          id="lyc-description"
          required
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="lyc-services" className={labelClass}>
          Services (comma-separated)
        </label>
        <input
          id="lyc-services"
          type="text"
          placeholder="FCL Ocean Freight, LCL Consolidation, Cargo Insurance"
          value={services}
          onChange={(event) => setServices(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="lyc-country" className={labelClass}>
            Country
          </label>
          <input
            id="lyc-country"
            type="text"
            required
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lyc-city" className={labelClass}>
            City
          </label>
          <input
            id="lyc-city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lyc-state" className={labelClass}>
            State / region
          </label>
          <input
            id="lyc-state"
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="lyc-street" className={labelClass}>
          Street address
        </label>
        <input
          id="lyc-street"
          type="text"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lyc-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="lyc-phone"
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lyc-email" className={labelClass}>
            Contact email
          </label>
          <input
            id="lyc-email"
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="lyc-website" className={labelClass}>
          Website
        </label>
        <input
          id="lyc-website"
          type="url"
          placeholder="https://"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className={inputClass}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
