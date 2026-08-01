"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type EditableListing = {
  id: string;
  description: string;
  services: string[];
  phone: string | null;
  primary_contact_name: string | null;
  website: string | null;
  contact_email: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  linkedin_url: string | null;
  certifications: string[];
};

type EditListingFormProps = {
  listing: EditableListing;
};

type Status = "idle" | "saving" | "saved" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30";
const labelClass = "block text-sm font-medium text-slate-700";

export default function EditListingForm({ listing }: EditListingFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [description, setDescription] = useState(listing.description);
  const [services, setServices] = useState(listing.services.join(", "));
  const [phone, setPhone] = useState(listing.phone ?? "");
  const [primaryContactName, setPrimaryContactName] = useState(
    listing.primary_contact_name ?? "",
  );
  const [website, setWebsite] = useState(listing.website ?? "");
  const [contactEmail, setContactEmail] = useState(listing.contact_email ?? "");
  const [streetAddress, setStreetAddress] = useState(listing.street_address ?? "");
  const [city, setCity] = useState(listing.city ?? "");
  const [state, setState] = useState(listing.state ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(listing.linkedin_url ?? "");
  const [certifications, setCertifications] = useState(listing.certifications.join(", "));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("listings")
      .update({
        description,
        services: services
          .split(",")
          .map((service) => service.trim())
          .filter(Boolean),
        phone: phone.trim() === "" ? null : phone,
        primary_contact_name: primaryContactName.trim() === "" ? null : primaryContactName,
        website: website.trim() === "" ? null : website,
        contact_email: contactEmail.trim() === "" ? null : contactEmail,
        street_address: streetAddress.trim() === "" ? null : streetAddress,
        city: city.trim() === "" ? null : city,
        state: state.trim() === "" ? null : state,
        linkedin_url: linkedinUrl.trim() === "" ? null : linkedinUrl,
        certifications: certifications
          .split(",")
          .map((certification) => certification.trim())
          .filter(Boolean),
      })
      .eq("id", listing.id);

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("saved");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="edit-description" className={labelClass}>
          Description
        </label>
        <textarea
          id="edit-description"
          required
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="edit-services" className={labelClass}>
          Services (comma-separated)
        </label>
        <input
          id="edit-services"
          type="text"
          value={services}
          onChange={(event) => setServices(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="edit-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="edit-phone"
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="edit-contact-name" className={labelClass}>
            Primary contact name
          </label>
          <input
            id="edit-contact-name"
            type="text"
            value={primaryContactName}
            onChange={(event) => setPrimaryContactName(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="edit-email" className={labelClass}>
            Contact email
          </label>
          <input
            id="edit-email"
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="edit-website" className={labelClass}>
            Website
          </label>
          <input
            id="edit-website"
            type="url"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="edit-street" className={labelClass}>
          Street address
        </label>
        <input
          id="edit-street"
          type="text"
          value={streetAddress}
          onChange={(event) => setStreetAddress(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="edit-city" className={labelClass}>
            City
          </label>
          <input
            id="edit-city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="edit-state" className={labelClass}>
            State / region
          </label>
          <input
            id="edit-state"
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="edit-linkedin" className={labelClass}>
          LinkedIn URL
        </label>
        <input
          id="edit-linkedin"
          type="url"
          value={linkedinUrl}
          onChange={(event) => setLinkedinUrl(event.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="edit-certifications" className={labelClass}>
          Certifications (comma-separated)
        </label>
        <input
          id="edit-certifications"
          type="text"
          value={certifications}
          onChange={(event) => setCertifications(event.target.value)}
          className={inputClass}
        />
      </div>

      {status === "saved" && <p className="text-sm text-emerald-700">Saved.</p>}
      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "saving"}
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
