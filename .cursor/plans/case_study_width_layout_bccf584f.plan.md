---
name: Case Study Width Layout
overview: Constrain case-study prose to 40% width while letting images/media (and tables) span the full details pane width, so media can break between text blocks at full bleed.
todos:
  - id: media-components
    content: Customize ReactMarkdown img/p so images render as full-width .case-study-media figures
    status: completed
  - id: width-css
    content: "CSS: text max-width 40%, media/tables 100%, mobile text 100%"
    status: completed
isProject: false
---

# Case Study Text 40% / Media 100%

## Intent
In project details case study content:
- **Text** (headings, paragraphs, lists, meta) → max-width **40%** of the details content area, left-aligned
- **Media** (images now; video/figure later) → **100%** width, so they can sit between text blocks as full-bleed breaks
- **Tables** → **100%** width (too dense to fit a 40% column)

On viewports ≤1100px, text expands to **100%** so it stays readable.

## Implementation
All changes in [`CaseStudyContent`](src/components/CaseStudyContent/CaseStudyContent.tsx) + [`CaseStudyContent.css`](src/components/CaseStudyContent/CaseStudyContent.css).

### CSS
- Default direct children: `max-width: 40%`
- Full-bleed exceptions: `.case-study-media`, `table` → `width: 100%; max-width: 100%`
- Media images: `display: block; width: 100%; height: auto`
- Mobile override at `1100px`: text children `max-width: 100%`

### Markdown rendering
Markdown images usually wrap as `<p><img></p>`. Customize ReactMarkdown components so media is a true full-width block:

- `img` → `<figure className="case-study-media"><img … /></figure>`
- `p` → if the paragraph contains only an image/figure, render children without the `<p>` wrapper so the figure is a direct article child and escapes the 40% rule

Keep existing `h1` skip + `h2` id slugging.

### Content usage
No need to change copy now. When ready, insert media in the MD as:

```md
Some paragraph…

![Caption](/assets/case-studies/conversation-insights/example.png)

Next paragraph…
```

Text stays 40%; that image fills the pane width.

## Out of scope
- Centering the text column
- Changing the hero/title above the case study body
- Adding real image assets yet (layout only)
