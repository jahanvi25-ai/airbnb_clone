import { Link } from "react-router-dom";

export default function Reserve() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-xl">
        <p className="eyebrow">Almost there</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Reserve your stay
        </h1>
      </div>

      <div className="rise-in mt-8 rounded-2xl border border-line bg-card px-6 py-16 text-center">
        <p className="font-display text-xl font-semibold text-ink">
          Reservations are opening soon
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
          We're putting the finishing touches on checkout. Keep your favourites
          saved and you'll be first in line.
        </p>
        <Link to="/" className="btn-base btn-outline mt-6">
          Back to homes
        </Link>
      </div>
    </main>
  );
}
