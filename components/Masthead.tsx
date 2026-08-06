import Link from "next/link";

const NAV_LINKS = [
  { href: "/directory", label: "Directory" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/list-your-company", label: "List your company" },
  { href: "/login", label: "Log in" },
];

export default function Masthead() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-slate-900 bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.2em] text-slate-500 [font-variant:small-caps]">
          {today}
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Projects &amp; Logistics
        </h1>
        <p className="mt-2 font-serif text-sm italic text-slate-600">
          The directory for global logistics providers
        </p>

        <div className="mt-6 border-t-4 border-slate-900" />

        <nav aria-label="Primary" className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest text-slate-700 hover:text-slate-900 [font-variant:small-caps]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-300" />
    </div>
  );
}
