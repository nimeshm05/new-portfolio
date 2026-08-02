---
name: Rename Sidebar Extract
overview: Rename the left-column Portfolio UI to Sidebar, extract Tab and ListItem into their own components with matching CSS, and move page layout + preview composition out of the old Portfolio shell.
todos: []
isProject: false
---

# Rename Portfolio to Sidebar and extract Tab / ListItem

## Goal
- `Sidebar` = only the left column (today’s `.portfolio-sidebar`)
- Extract **Tab** and **ListItem** as standalone components
- Rename `portfolio-*` CSS to match the new structure
- Page shell (layout + `ProjectPreview`) leaves `Portfolio`

## Target structure

```
src/components/
  Sidebar/
    Sidebar.tsx
    Sidebar.css
  SidebarTab/
    SidebarTab.tsx
    SidebarTab.css
  SidebarListItem/
    SidebarListItem.tsx
    SidebarListItem.css
  ProjectPreview/          (unchanged behavior)
src/app/
  page.tsx                 (composes Sidebar + ProjectPreview)
  home.css                 (page shell / layout styles)
```

Delete [`src/components/Portfolio/`](src/components/Portfolio/).

## Component responsibilities

### [`Sidebar`](src/components/Sidebar/Sidebar.tsx)
Owns left-column UI only:
- identity (logo + name + role)
- tab nav
- work / about section lists

Owns `activeTab` state internally. Reports hover/focus item to parent via:

```ts
onActiveItemChange: (item: PreviewItem | null) => void
```

Clears active item when switching tabs (same behavior as today).

### [`SidebarTab`](src/components/SidebarTab/SidebarTab.tsx)
Single nav control used for work / about / writings.
- Button mode for work & about (`onClick`, `isActive`)
- Link mode for writings (`href`)
- Styles moved from `.portfolio-nav-link*` → `.sidebar-tab*`

### [`SidebarListItem`](src/components/SidebarListItem/SidebarListItem.tsx)
Extract current `ProjectListItem`:
- props: `item` (icon + title + id), `isActive`, `onActivate`, `onDeactivate`
- Styles moved from `.portfolio-project*` → `.sidebar-list-item*`

### Page shell ([`src/app/page.tsx`](src/app/page.tsx) + `home.css`)
Become a client page that:
1. Holds `activeItem` state
2. Renders layout:

```tsx
<main className="home">
  <div className="home-layout">
    <Sidebar onActiveItemChange={setActiveItem} />
    <ProjectPreview project={activeItem} />
  </div>
</main>
```

Move `.portfolio` / `.portfolio-layout` (+ responsive rules) into `home.css` as `.home` / `.home-layout`.

## CSS rename map
| Current | New |
|---|---|
| `.portfolio` / `.portfolio-layout` | `.home` / `.home-layout` |
| `.portfolio-sidebar*` | `.sidebar*` |
| `.portfolio-header`, identity, logo, name, roles | `.sidebar-header`, `.sidebar-identity`, etc. |
| `.portfolio-nav` | `.sidebar-nav` |
| `.portfolio-nav-link*` | `.sidebar-tab*` (in SidebarTab.css) |
| `.portfolio-content`, section, label, divider, list | `.sidebar-content`, `.sidebar-section`, etc. |
| `.portfolio-project*` | `.sidebar-list-item*` (in SidebarListItem.css) |

Keep visual values identical — rename only.

## Data / types
- Keep shared `SidebarItem = PreviewItem & { icon: LucideIcon }` near Sidebar (or a small shared type export from Sidebar)
- No changes to [`projects.ts`](src/data/projects.ts) / [`about.ts`](src/data/about.ts) content

## Out of scope
- Behavior changes (tabs, hover preview, motion)
- Writings tab implementation
- ProjectPreview internals beyond accepting the same `PreviewItem` prop