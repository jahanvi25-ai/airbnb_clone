import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useAuth } from "../context/AuthContext";
import { getHomes } from "../api/homes";
import * as favouritesApi from "../api/favourites";
import heroImage from "../assets/hero.jpg";

export default function Home() {
  const { isLoggedIn, isAdmin } = useAuth();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  // Purely visual: remembers which hearts were tapped this session so the
  // button can fill in. It does not change what gets sent to the backend.
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    getHomes()
      .then(setHomes)
      .finally(() => setLoading(false));
  }, []);

  const handleAddFavourite = async (homeId) => {
    try {
      await favouritesApi.addFavourite(homeId);
      setSavedIds((prev) => (prev.includes(homeId) ? prev : [...prev, homeId]));
    } catch (err) {
      console.error("Could not add favourite", err);
    }
  };

  if (loading) return null;

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="A sunlit terrace looking out over the sea at golden hour"
          width={1920}
          height={1088}
          className="h-[520px] w-full object-cover sm:h-[600px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="rise-in max-w-2xl">
              <p className="eyebrow text-clay-soft">Stay a while</p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-paper sm:text-6xl">
                Homes worth the long way round.
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/85">
                Quiet rooms, kind hosts and mornings that start slowly. Find a
                place that feels lived-in, not listed.
              </p>
            </div>

            <div
              className="rise-in mt-8 max-w-3xl rounded-2xl border border-white/20 bg-card/95 p-3 shadow-2xl backdrop-blur"
              style={{ animationDelay: "120ms" }}
            >
              <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="px-4 py-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ink-muted">
                    Where
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-ink">
                    Anywhere you like
                  </p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ink-muted">
                    When
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-ink">Any week</p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-ink-muted">
                    Who
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-ink">Add guests</p>
                </div>
              </div>
              <a href="#stays" className="btn-base btn-primary mt-3 w-full">
                Browse the homes
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="stays" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
        <div className="mb-8 max-w-xl">
          <p className="eyebrow">Picked for you</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Suggested homes
          </h2>
          <p className="mt-2 text-ink-soft">
            A short list to start with — every one of them real, and ready when
            you are.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((home, index) => {
            const saved = savedIds.includes(home._id);
            return (
              <HomeCard
                key={home._id}
                home={home}
                index={index}
                overlayAction={
                  // Guests get the favourite button; hosts manage listings from
                  // the admin list instead, so it's hidden here for them.
                  isLoggedIn && !isAdmin ? (
                    <button
                      onClick={() => handleAddFavourite(home._id)}
                      aria-label={`Add ${home.homeName} to favourites`}
                      className={`grid h-10 w-10 place-items-center rounded-full bg-card/90 text-lg shadow-md transition hover:bg-card active:scale-90 ${
                        saved ? "heart-pop text-clay" : "text-ink"
                      }`}
                    >
                      {saved ? "\u2665" : "\u2661"}
                    </button>
                  ) : null
                }
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
