import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Projects & Logistics Directory — Find Global Freight & Logistics Providers",
    template: "%s | Projects & Logistics Directory",
  },
  description:
    "Find and compare sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers worldwide. Free to list.",
  openGraph: {
    title: "Projects & Logistics Directory",
    description:
      "Find and compare sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers worldwide. Free to list.",
    url: SITE_URL,
    siteName: "Projects & Logistics Directory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
