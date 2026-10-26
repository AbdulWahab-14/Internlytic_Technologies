// Data access layer for the showcase.
//
// Today this reads clearly-labelled SAMPLE data. Later, only the body of
// fetchApprovedProjects() needs to change to call Supabase (see README,
// "Connecting Supabase safely"). Components never touch the data source directly.

import { SAMPLE_PROJECTS } from "../data/sampleProjects.js";

const FAKE_NETWORK_DELAY_MS = 700;

/**
 * Returns approved projects only.
 *
 * Demo switches (add to the page URL to preview the other UI states):
 *   ?demo=error  -> simulates a failed request
 *   ?demo=empty  -> simulates a gallery with no approved projects yet
 */
export function fetchApprovedProjects() {
  const demo = new URLSearchParams(window.location.search).get("demo");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (demo === "error") {
        reject(new Error("Could not load projects."));
        return;
      }
      if (demo === "empty") {
        resolve([]);
        return;
      }
      // Never trust the client to decide what is public: filter on approval status.
      resolve(SAMPLE_PROJECTS.filter((p) => p.approvalStatus === "approved"));
    }, FAKE_NETWORK_DELAY_MS);
  });
}

/** Only allow http(s) links so a bad record can never inject javascript: URLs. */
export function isValidHttpUrl(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
