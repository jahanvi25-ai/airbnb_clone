import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">Wrong turn</p>
      <h2 className="mt-3 font-display text-7xl font-semibold text-ink">404</h2>
      <p className="mt-4 text-lg text-ink-soft">
        This page has checked out. Let's get you somewhere nicer.
      </p>
      <Link to="/" className="btn-base btn-primary mt-8">
        Go back home
      </Link>
    </main>
  );
}
