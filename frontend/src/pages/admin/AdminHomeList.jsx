import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import { getHomes, deleteHome } from "../../api/homes";

export default function AdminHomeList() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getHomes()
      .then(setHomes)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (homeId) => {
    await deleteHome(homeId);
    setHomes((prev) => prev.filter((h) => h._id !== homeId));
  };

  if (loading) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-red-500">
        Here are our registered homes:
      </h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homes.map((home) => (
          <HomeCard
            key={home._id}
            home={home}
            actions={
              <>
                <Link
                  to={`/admin/edit-home/${home._id}`}
                  className="rounded bg-red-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(home._id)}
                  className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            }
          />
        ))}
      </ul>
    </main>
  );
}
