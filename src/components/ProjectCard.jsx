import { isValidHttpUrl } from "../services/projectsService.js";
import Thumbnail from "./Thumbnail.jsx";

export default function ProjectCard({ project, onOpen }) {
  const { projectTitle, internName, track, description, liveUrl, githubUrl } =
    project;

  return (
    <article className="card">
      <Thumbnail project={project} />
      <div className="card-body">
        <span className="tag">{track}</span>
        <h2 className="card-title">{projectTitle}</h2>
        <p className="card-intern">
          by <strong>{internName}</strong>
        </p>
        <p className="card-desc">{description}</p>

        <div className="card-actions">
          <button type="button" className="btn btn-ghost" onClick={onOpen}>
            Details
          </button>
          {isValidHttpUrl(liveUrl) && (
            <a
              className="btn btn-primary"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <span className="sr-only"> {projectTitle} (opens in new tab)</span>
            </a>
          )}
          {isValidHttpUrl(githubUrl) && (
            <a
              className="btn btn-outline"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
              <span className="sr-only"> for {projectTitle} (opens in new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
