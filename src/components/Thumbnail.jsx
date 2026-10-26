// Shows the real screenshot when thumbnailUrl exists (and loads); otherwise a
// clean branded placeholder with the project's initials. Fixed aspect ratio
// prevents layout shift and keeps image proportions intact.

import { useState } from "react";

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Thumbnail({ project, large = false }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.thumbnailUrl && !failed;

  return (
    <div className={`thumb${large ? " thumb-large" : ""}`}>
      {showImage ? (
        <img
          src={project.thumbnailUrl}
          alt={`Screenshot of ${project.projectTitle}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="thumb-placeholder" role="img" aria-label={`${project.projectTitle} placeholder thumbnail`}>
          <span>{initials(project.projectTitle)}</span>
        </div>
      )}
    </div>
  );
}
