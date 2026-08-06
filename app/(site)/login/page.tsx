import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to claim a listing or list your company on Projects & Logistics Directory.",
};

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-sm px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-2 text-sm text-slate-600">
        Sign in to claim a listing or list your company.
      </p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
