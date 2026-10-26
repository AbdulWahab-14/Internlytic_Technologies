export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="project-search" className="sr-only">
        Search by project title or intern name
      </label>
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="project-search"
        type="search"
        placeholder="Search by project title or intern name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
