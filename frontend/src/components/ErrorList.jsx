export default function ErrorList({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div
      className="rise-in rounded-lg border border-clay/25 bg-clay-soft px-4 py-3 text-clay-deep"
      role="alert"
    >
      <strong className="font-display text-sm font-semibold">There's a problem</strong>
      <ul className="mt-1 list-inside list-disc text-sm">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
