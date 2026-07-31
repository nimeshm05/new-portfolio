"use client";

import type { Project } from "@/data/projects";
import "./ProjectPreview.css";

type ProjectPreviewProps = {
  project: Project | null;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <aside className="project-preview" aria-live="polite" aria-hidden={!project}>
      {project ? (
        <div className="project-preview-card" key={project.id}>
          <div className="project-preview-content">
            <p className="project-preview-title">{project.title}</p>
            <p className="project-preview-tagline">
              {project.tagline ?? project.description}
            </p>
            <p className="project-preview-soon">coming soon</p>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
