export default function FilterControls({ tracks, active, onSelect, disabled }) {
  return (
    <div className="filters" role="group" aria-label="Filter by track">
      {tracks.map((t) => (
        <button
          key={t}
          type="button"
          className={`chip${active === t ? " chip-active" : ""}`}
          aria-pressed={active === t}
          disabled={disabled}
          onClick={() => onSelect(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
