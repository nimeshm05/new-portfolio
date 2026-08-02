---
name: Hover preview videos
overview: Wire hover previews so projects with a video path play muted looping video in the preview card; projects without a video keep the existing "coming soon" placeholder.
todos:
  - id: project-video-data
    content: Add optional previewVideo to Project type and map kar-no-key + gzlang assets
    status: completed
  - id: preview-video-ui
    content: Render/play video in ProjectPreview when present; keep placeholder otherwise
    status: completed
isProject: false
---

# Hover preview videos

## Behavior

- On list hover/focus, if the project has a `previewVideo`, show and play that video inside the existing preview card.
- If no video, keep the current title / tagline / "coming soon" design.
- Playback: `muted`, `loop`, `playsInline`, autoplay on show; pause and reset `currentTime` when the preview unmounts/changes.
- Video fills the card with `object-fit: cover` (no controls).

## Data

Update [`src/data/projects.ts`](src/data/projects.ts):

- Add optional `previewVideo?: string` on `Project`.
- Set paths for the two existing assets:
  - `kar-no-key` → `/assets/preview-videos/kar-no-key.mp4`
  - `gzlang` → `/assets/preview-videos/gzlang-banner.mp4`
- Leave industry projects (and any future items) without `previewVideo` until assets exist.

## Preview UI

Update [`src/components/ProjectPreview/ProjectPreview.tsx`](src/components/ProjectPreview/ProjectPreview.tsx):

- If `project.previewVideo`: render a `<video>` with `key={project.id}`, `src`, `autoPlay`, `muted`, `loop`, `playsInline`.
- Else: keep the existing text placeholder content.
- Use a small `useEffect` (or `ref` callback) to `play()` when the video project is active and `pause()` + reset on cleanup/change, so hover leave reliably stops playback.

Update [`src/components/ProjectPreview/ProjectPreview.css`](src/components/ProjectPreview/ProjectPreview.css):

- Style `.project-preview-video` to fill the card (`width/height: 100%`, `object-fit: cover`, no pointer events beyond the card’s existing `pointer-events: none` on the aside).

## Out of scope

- No changes to sidebar list interaction beyond what already sets `activeProject`.
- No new videos; future adds are data-only (`previewVideo` path).
