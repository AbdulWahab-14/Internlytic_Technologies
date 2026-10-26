import { useEffect, useMemo, useState } from "react";
import { fetchApprovedProjects } from "./services/projectsService.js";
import ProjectsPage from "./components/ProjectsPage.jsx";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready

  const load = useMemo(
    () => () => {
      setStatus("loading");
      fetchApprovedProjects()
        .then((data) => {
          setProjects(data);
          setStatus("ready");
        })
        .catch(() => setStatus("error"));
    },
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <a className="skip-link" href="#gallery">
        Skip to projects
      </a>
      <Header />
      <main>
        <ProjectsPage projects={projects} status={status} onRetry={load} />
      </main>
      <footer className="site-footer">
        <p>
          Internlytic Technologies &middot; Learn &bull; Build &bull; Showcase
        </p>
        <p className="footer-note">
          Concept page built with clearly labelled sample data. Not connected to
          any company database.
        </p>
      </footer>
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <span className="badge" title="All data on this page is fictional">
          Sample data
        </span>
      </div>
    </header>
  );
}

/**
 * Put the OFFICIAL logo file at public/logo.png (see README).
 * It is displayed with height only, so its proportions are never distorted.
 * If the file is missing, a plain text wordmark is shown instead.
 */
function Logo() {
  const [missing, setMissing] = useState(false);
  return (
    <a className="logo" href="./" aria-label="Internlytic Technologies home">
      {missing ? (
        <span className="logo-text">
          Internlytic <span>Technologies</span>
        </span>
      ) : (
        <img
          src="./logo.png"
          alt="Internlytic Technologies"
          height="40"
          onError={() => setMissing(true)}
        />
      )}
    </a>
  );
}
