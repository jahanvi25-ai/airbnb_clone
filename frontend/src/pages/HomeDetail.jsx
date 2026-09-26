import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getHome } from "../api/homes";
import * as favouritesApi from "../api/favourites";
import { useAuth } from "../context/AuthContext";
import { resolveImageUrl } from "../utils/resolveImageUrl";

export default function HomeDetail() {
  const { homeId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [home, setHome] = useState(null);
  const [saved, setSaved] = useState(false); // visual state for the heart only

  useEffect(() => {
    getHome(homeId)
      .then(setHome)
      .catch(() => navigate("/"));
  }, [homeId, navigate]);

  if (!home) return null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rise-in overflow-hidden rounded-2xl">
        <img
          src={resolveImageUrl(home.photoURL)}
          alt={home.homeName}
          className="h-[340px] w-full object-cover sm:h-[460px]"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="eyebrow">{home.homeLocation}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">{home.homeName}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-sage-soft px-3 py-1 font-semibold text-sage">
              ★ {Number(home.homeRating).toFixed(1)}
            </span>
            <span>·</span>
            <span>{home.homeLocation}</span>
          </div>

          {home.homeDiscription && (
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{home.homeDiscription}</p>
          )}

          <Link to="/" className="btn-base btn-outline mt-8">
            ← Back to all homes
          </Link>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <p className="font-display text-3xl font-semibold text-ink">
            Rs {home.homePrice}
            <span className="text-base font-normal text-ink-muted"> / night</span>
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Taxes and fees are shown before you confirm.
          </p>

          <Link to="/store/reserve" className="btn-base btn-primary mt-5 w-full">
            Reserve
          </Link>

          {isLoggedIn && (
            <button
              onClick={() => {
                favouritesApi.addFavourite(home._id);
                setSaved(true);
              }}
              className={`btn-base btn-outline mt-3 w-full ${saved ? "heart-pop text-clay" : ""}`}
            >
              {saved ? "\u2665 Saved" : "\u2661 Add to favourite"}
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}
