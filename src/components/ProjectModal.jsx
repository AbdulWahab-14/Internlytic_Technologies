// Detail view built on the native <dialog> element: it traps focus, closes on
// Escape and is announced correctly by screen readers without extra libraries.

import { useEffect, useRef } from "react";
import { isValidHttpUrl } from "../services/projectsService.js";
import Thumbnail from "./Thumbnail.jsx";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProjectModal({ project, onClose }) {
  const ref = useRef(null);

    useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const { projectTitle, internName, track, description, technologies, liveUrl, githubUrl, createdAt } = project;

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === ref.current) ref.current.close();
      }}
    >
      <div className="modal-inner">
        <button
          type="button"
          className="modal-close"
          aria-label="Close details"
          onClick={() => ref.current.close()}
        >
          &times;
        </button>

        <Thumbnail project={project} large />

        <div className="modal-body">
          <span className="tag">{track}</span>
          <h2 id="modal-title">{projectTitle}</h2>
          <p className="card-intern">
            by <strong>{internName}</strong>
            {formatDate(createdAt) && <> &middot; {formatDate(createdAt)}</>}
          </p>
          <p>{description}</p>

          <h3>Technology stack</h3>
          <ul className="tech-list">
            {technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="card-actions">
            {isValidHttpUrl(liveUrl) && (
              <a className="btn btn-primary" href={liveUrl} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )}
            {isValidHttpUrl(githubUrl) && (
              <a className="btn btn-outline" href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            )}
            {!isValidHttpUrl(liveUrl) && !isValidHttpUrl(githubUrl) && (
              <p className="muted">No public links are available for this project yet.</p>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
