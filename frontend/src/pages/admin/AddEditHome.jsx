import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHome, createHome, updateHome } from "../../api/homes";
import ErrorList from "../../components/ErrorList";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const emptyForm = {
  homeName: "",
  homePrice: "",
  homeLocation: "",
  homeRating: "",
  homeDiscription: "",
  photoURL: "", // used as a fallback if no file is chosen
};

export default function AddEditHome() {
  const { homeId } = useParams();
  const editing = Boolean(homeId);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!photoFile) {
      setFilePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(photoFile);
    setFilePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  useEffect(() => {
    if (!editing) return;
    getHome(homeId).then((home) => {
      setForm({
        homeName: home.homeName || "",
        homePrice: home.homePrice || "",
        homeLocation: home.homeLocation || "",
        homeRating: home.homeRating || "",
        homeDiscription: home.homeDiscription || "",
        photoURL: home.photoURL || "",
      });
    });
  }, [editing, homeId]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // A freshly-picked file (blob URL, already a valid <img> src as-is) wins
  // over a stored/pasted URL, which may be a backend-relative path that
  // needs resolving against the backend's origin.
  const photoPreview = filePreview || resolveImageUrl(form.photoURL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = new FormData();
    data.append("homeName", form.homeName);
    data.append("homePrice", form.homePrice);
    data.append("homeLocation", form.homeLocation);
    data.append("homeRating", form.homeRating);
    data.append("homeDiscription", form.homeDiscription);

    if (photoFile) {
      data.append("photo", photoFile);
    } else if (form.photoURL) {
      data.append("photoURL", form.photoURL);
    }

    try {
      if (editing) {
        await updateHome(homeId, data);
      } else {
        await createHome(data);
      }
      navigate("/admin/admin-home-list");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrors([message]);
    }
  };

  return (
    <main className="mx-auto mt-10 w-full max-w-2xl px-4 pb-16">
      <div className="rise-in mb-8 text-center">
        <p className="eyebrow mb-3">{editing ? "Editing your place" : "List your place"}</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          {editing ? "Tell guests what's new" : "Open your doors to guests"}
        </h1>
        <p className="mt-3 text-ink-soft">
          {editing
            ? "A fresh photo and an honest description go a long way."
            : "A few details is all it takes — guests are already looking."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-line bg-card p-6 shadow-[0_10px_40px_-18px_rgba(29,29,27,0.25)] sm:p-10"
      >
        <ErrorList errors={errors} />

        <div className="space-y-5">
          <div>
            <label htmlFor="homeName" className="mb-1.5 block text-sm font-semibold">
              House name
            </label>
            <input
              id="homeName"
              type="text"
              placeholder="e.g. The Saltbox by the shore"
              value={form.homeName}
              onChange={update("homeName")}
              required
              className="field"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="homePrice" className="mb-1.5 block text-sm font-semibold">
                Price per night
              </label>
              <input
                id="homePrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="₹ per night"
                value={form.homePrice}
                onChange={update("homePrice")}
                required
                className="field"
              />
            </div>

            <div>
              <label htmlFor="homeRating" className="mb-1.5 block text-sm font-semibold">
                Rating
              </label>
              <input
                id="homeRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="e.g. 3.6"
                value={form.homeRating}
                onChange={update("homeRating")}
                required
                className="field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="homeLocation" className="mb-1.5 block text-sm font-semibold">
              Location
            </label>
            <input
              id="homeLocation"
              type="text"
              placeholder="Town, city, or area"
              value={form.homeLocation}
              onChange={update("homeLocation")}
              required
              className="field"
            />
          </div>

          <div>
            <label htmlFor="photo" className="mb-1.5 block text-sm font-semibold">
              Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              className="field file:mr-4 file:rounded-md file:border-0 file:bg-sage-soft file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-sage hover:file:bg-paper-deep"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="mb-1.5 block text-sm font-semibold">
              Or paste an image link
            </label>
            <input
              id="photoURL"
              type="url"
              placeholder="https://…"
              value={form.photoURL}
              onChange={update("photoURL")}
              disabled={Boolean(photoFile)}
              className="field"
            />
          </div>

          {photoPreview && (
            <div className="overflow-hidden rounded-xl border border-line">
              <img
                src={photoPreview}
                alt="Selected home"
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                onError={() => setErrors(["The image URL could not be loaded. Please use a direct image link."])}
              />
            </div>
          )}

          <div>
            <label htmlFor="homeDiscription" className="mb-1.5 block text-sm font-semibold">
              Description
            </label>
            <textarea
              id="homeDiscription"
              placeholder="What makes staying here special? Morning light, the walk to the market, the quiet…"
              value={form.homeDiscription}
              onChange={update("homeDiscription")}
              rows={4}
              className="field resize-y"
            />
          </div>

          <button type="submit" className="btn-base btn-primary w-full">
            {editing ? "Save changes" : "List this home"}
          </button>
        </div>
      </form>
    </main>
  );
}
