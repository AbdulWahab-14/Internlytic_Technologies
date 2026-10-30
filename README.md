# Internlytic Projects Showcase (Week 4 – Final Task)

A professional gallery concept where visitors can explore projects built by
interns during Phase 1, see who created each one, and open project details.

> **Sample data only.** Every project, intern name and link in this demo is
> fictional and clearly labelled as sample data. This repository does **not**
> access Internlytic's production website, private database or any credentials.

**Live demo:** _[internlytic-technologies.vercel.app)_

## Features

- **Projects gallery** – cards with thumbnail, title, intern name, track, short description
- **Links** – "View Project" and "GitHub Repository" buttons shown only when a valid `http(s)` URL exists
- **Search** – by project title or intern name (case-insensitive, instant)
- **Filters** – by track/category, with an "All" option and a **Reset filters** button
- **Details modal** – full description, technology stack, date and links (native `<dialog>`: Escape to close, focus handled by the browser)
- **UI states** – loading skeletons, empty gallery, no search results, error with retry
- **Responsive** – fluid CSS grid for phones, tablets, laptops and desktops
- **Accessible** – semantic HTML, labelled controls, visible focus, skip link, `aria-live` result count, 44px touch targets, `prefers-reduced-motion` respected
- **Brand palette** – Teal `#18B59A` (primary buttons, active filters), Deep Blue-Green `#073A40` (headings, strong elements), White `#FFFFFF`, Light tint `#EAF7F4` (page background). Buttons use deep blue-green text on teal to keep contrast readable.
- No heart/like counter, by design.

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build into /dist
npm run preview    # preview the production build
```

Requires Node.js 18 or newer.

### Preview the other UI states

Add a query string to the page URL:

| URL | Shows |
|---|---|
| `/?demo=error`  | Error state with "Try again" |
| `/?demo=empty`  | Empty gallery state |

### Add the official logo

Place the official logo file at `public/logo.png`. It is displayed by height
only (`height: 40px; width: auto`), so its proportions are never changed. If
the file is missing, a plain text wordmark is shown instead.

## Project structure

```
src/
  App.jsx                    header, footer, data loading
  data/sampleProjects.js     clearly labelled SAMPLE records
  services/projectsService.js  data access layer (swap for Supabase later)
  components/
    ProjectsPage.jsx         search + filter logic, renders states and grid
    SearchBar.jsx
    FilterControls.jsx
    ProjectCard.jsx
    ProjectModal.jsx
    Thumbnail.jsx            image with graceful placeholder fallback
    States.jsx               loading / empty / no-results / error
  index.css                  brand tokens and all styles
```

## Data model

These are **suggested** fields and are not guaranteed to match the company's
real database columns.

| Field | Type | Notes |
|---|---|---|
| `id` | string | unique key |
| `projectTitle` | string | |
| `internName` | string | in production, a reference to the intern record |
| `track` | string | used by the track filter |
| `description` | string | |
| `thumbnailUrl` | string \| null | placeholder shown if missing or broken |
| `liveUrl` | string \| null | button hidden unless a valid http(s) URL |
| `githubUrl` | string \| null | button hidden unless a valid http(s) URL |
| `technologies` | string[] | shown in the details modal |
| `approvalStatus` | `"approved"` \| `"pending"` \| … | **only `approved` is ever shown** |
| `createdAt` | ISO date string | |

The sample data includes one `pending` record to prove unapproved projects are
filtered out.

## Connecting Supabase safely (proposal – not implemented)

Only `fetchApprovedProjects()` in `src/services/projectsService.js` would
change; no component needs to know where the data comes from.

1. **Tables.** `interns` (`id`, `full_name`, …) and `projects` (the fields above plus `intern_id` referencing `interns.id`).
2. **Fetch with a join.** Select approved projects together with their intern, e.g.
   `supabase.from("projects").select("id, project_title, track, description, thumbnail_url, live_url, github_url, technologies, created_at, interns(full_name)").eq("approval_status", "approved").order("created_at", { ascending: false })`,
   then map the result to the field names used by the components (`interns.full_name` → `internName`).
3. **Row Level Security (RLS).** Enable RLS on both tables. Add a policy allowing public `SELECT` on `projects` **only where `approval_status = 'approved'`**, and expose only non-sensitive intern columns (name) through a view so emails and other private data are never readable from the browser.
4. **Keys.** Use only the public **anon** key via environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Never put the `service_role` key in front-end code. Keep `.env` out of Git (already in `.gitignore`).
5. **Approval workflow.** Interns submit projects as `pending`; a company admin approves them from a protected back-end/dashboard, which flips `approval_status` to `approved`.
6. **Safety in the UI.** Links are validated as `http(s)` before rendering, and all text is rendered through React (escaped by default).

## Known limitations

- Thumbnails use a branded placeholder because no real screenshots are included in the sample data. Set `thumbnailUrl` to a screenshot to display it.
- Search matches title and intern name only (as required); technology filters were left out as an optional feature.
- All links in the sample data are placeholders (`example.com` / sample GitHub paths).

## Tech

React 18 · Vite 5 · plain CSS (no UI framework)
