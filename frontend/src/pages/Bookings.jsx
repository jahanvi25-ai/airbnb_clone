import { Link } from "react-router-dom";

export default function Bookings() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-xl">
        <p className="eyebrow">Your trips</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Bookings</h1>
      </div>

      <div className="rise-in mt-8 rounded-2xl border border-line bg-card px-6 py-16 text-center">
        <p className="font-display text-xl font-semibold text-ink">No trips booked yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
          When you reserve a home, the details will show up here — dates, host
          and directions, all in one place.
        </p>
        <Link to="/" className="btn-base btn-primary mt-6">
          Start looking
        </Link>
      </div>
    </main>
  );
}
