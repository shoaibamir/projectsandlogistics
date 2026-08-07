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
    <>
      <div className="bg-white pt-8 text-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.2em] text-slate-500 [font-variant:small-caps]">
            {today}
          </p>
          <Link href="/" className="mt-3 block">
            <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Projects &amp; Logistics
            </h1>
          </Link>
          <p className="mt-2 font-serif text-sm italic text-slate-600">
            Logistics and supply chain resources
          </p>

          <div className="mt-6 border-t-4 border-slate-900" />
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-slate-300 bg-white">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6 lg:px-8"
        >
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
    </>
  );
}
