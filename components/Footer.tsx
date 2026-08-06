import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/directory" className="text-slate-600 hover:text-slate-900">
            Directory
          </Link>
          <Link href="/guides" className="text-slate-600 hover:text-slate-900">
            Guides
          </Link>
          <Link href="/blog" className="text-slate-600 hover:text-slate-900">
            Blog
          </Link>
          <Link href="/news" className="text-slate-600 hover:text-slate-900">
            News
          </Link>
          <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/remove-listing" className="text-slate-600 hover:text-slate-900">
            Request removal
          </Link>
        </nav>
        <p className="mt-4 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Projects &amp; Logistics Directory. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
