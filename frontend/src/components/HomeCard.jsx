import { Link } from "react-router-dom";
import { resolveImageUrl } from "../utils/resolveImageUrl";

// `actions` is whatever buttons/links this particular page needs under the
// card (Detail + Favourite on the guest list, Edit + Delete on the admin
// list, etc) — kept as a prop instead of forking this component three ways.
// `overlayAction` sits on top of the photo (the heart button), and `index`
// only staggers the entrance animation.
export default function HomeCard({ home, actions, overlayAction, index = 0 }) {
  return (
    <li
      className="rise-in group overflow-hidden rounded-xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(29,29,27,0.55)]"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={resolveImageUrl(home.photoURL)}
          alt={home.homeName}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {overlayAction && <div className="absolute right-3 top-3">{overlayAction}</div>}
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">{home.homeName}</h2>
            <p className="mt-1 text-sm text-ink-muted">{home.homeLocation}</p>
          </div>

          <span className="shrink-0 rounded-full bg-sage-soft px-3 py-1 text-sm font-semibold text-sage">
            ★ {Number(home.homeRating).toFixed(1)}
          </span>
        </div>

        <div className="mb-5 flex items-baseline justify-between border-t border-line pt-4">
          <p className="font-display text-lg font-semibold text-ink">Rs {home.homePrice}</p>
          <p className="text-sm text-ink-muted">per night</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/store/home-detail/${home._id}`} className="btn-base btn-ink">
            Detail
          </Link>
          {actions}
        </div>
      </div>
    </li>
  );
}
