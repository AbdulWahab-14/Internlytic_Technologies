import { useMemo, useState } from "react";
import SearchBar from "./SearchBar.jsx";
import FilterControls from "./FilterControls.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";
import { LoadingGrid, EmptyState, NoResults, ErrorState } from "./States.jsx";

export default function ProjectsPage({ projects, status, onRetry }) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [selected, setSelected] = useState(null);

  const tracks = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.track))).sort()],
    [projects]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTrack = track === "All" || p.track === track;
      const matchesQuery =
        q === "" ||
        p.projectTitle.toLowerCase().includes(q) ||
        p.internName.toLowerCase().includes(q);
      return matchesTrack && matchesQuery;
    });
  }, [projects, query, track]);

  const isFiltered = query.trim() !== "" || track !== "All";

  function reset() {
    setQuery("");
    setTrack("All");
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Phase 1 &middot; 2026</p>
          <h1>Internlytic Projects Showcase</h1>
          <p className="hero-sub">
            Explore what our interns have built. Search by project title or
            intern name, or filter by track.
          </p>
        </div>
      </section>

      <section className="container toolbar" aria-label="Search and filters">
        <SearchBar value={query} onChange={setQuery} />
        <FilterControls
          tracks={tracks}
          active={track}
          onSelect={setTrack}
          disabled={status !== "ready"}
        />
        {isFiltered && (
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset filters
          </button>
        )}
      </section>

      <section id="gallery" className="container gallery-section" tabIndex={-1}>
        {status === "ready" && (
          <p className="result-count" role="status" aria-live="polite">
            Showing {results.length} of {projects.length} project
            {projects.length === 1 ? "" : "s"}
          </p>
        )}

        {status === "loading" && <LoadingGrid />}
        {status === "error" && <ErrorState onRetry={onRetry} />}
        {status === "ready" && projects.length === 0 && <EmptyState />}
        {status === "ready" && projects.length > 0 && results.length === 0 && (
          <NoResults onReset={reset} />
        )}

        {status === "ready" && results.length > 0 && (
          <ul className="grid">
            {results.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} onOpen={() => setSelected(p)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
