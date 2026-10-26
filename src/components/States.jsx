export function LoadingGrid() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading projects…</span>
      <ul className="grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}>
            <div className="card skeleton">
              <div className="thumb skeleton-block" />
              <div className="card-body">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="state" role="status">
      <h2>No projects yet</h2>
      <p>
        Approved intern projects will appear here. Please check back soon.
      </p>
    </div>
  );
}

export function NoResults({ onReset }) {
  return (
    <div className="state" role="status">
      <h2>No matching projects</h2>
      <p>Try a different title, intern name or track.</p>
      <button type="button" className="btn btn-primary" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <h2>Something went wrong</h2>
      <p>We couldn&apos;t load the projects. Please check your connection and try again.</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
