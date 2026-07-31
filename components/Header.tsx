import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link href="/" className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
          Projects<span className="text-blue-600">&amp;</span>Logistics
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/directory"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Directory
          </Link>
          <Link
            href="/list-your-company"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            List your company
          </Link>
        </div>
      </nav>
    </header>
  );
}
