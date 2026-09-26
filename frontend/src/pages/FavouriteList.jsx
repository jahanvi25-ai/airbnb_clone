import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import * as favouritesApi from "../api/favourites";

export default function FavouriteList() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    favouritesApi
      .getFavourites()
      .then(setFavourites)
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (homeId) => {
    // The remove endpoint returns the raw favourites array (just IDs, not
    // populated home documents), so re-fetch the populated list instead of
    // rendering the response directly.
    await favouritesApi.removeFavourite(homeId);
    const updated = await favouritesApi.getFavourites();
    setFavourites(updated);
  };

  if (loading) return null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-xl">
        <p className="eyebrow">Your shortlist</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Places you've saved
        </h2>
        <p className="mt-2 text-ink-soft">Kept here until you're ready to decide.</p>
      </div>

      {favourites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-card px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">Nothing saved yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            Tap the heart on any home and it will wait for you right here.
          </p>
          <Link to="/" className="btn-base btn-primary mt-6">
            Find a home
          </Link>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((home, index) => (
            <HomeCard
              key={home._id}
              home={home}
              index={index}
              actions={
                <button onClick={() => handleRemove(home._id)} className="btn-base btn-outline">
                  Remove
                </button>
              }
            />
          ))}
        </ul>
      )}
    </main>
  );
}
