// Turns a path the backend returns (e.g. "/uploads/167xxx-cabin.jpg") into a
// full URL pointing at the backend, since frontend and backend are on
// different origins now. Pasted external image URLs (already absolute)
// pass through unchanged.
const API_ORIGIN = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

export function resolveImageUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path}`;
}
