"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import "./ProjectPreview.css";

type ProjectPreviewProps = {
  project: Project | null;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project?.previewVideo);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    void video.play().catch(() => {
      /* autoplay can be blocked; muted + playsInline usually allows it */
    });

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [project?.id, hasVideo]);

  return (
    <aside
      className="project-preview"
      aria-live="polite"
      aria-hidden={!project}
    >
      {project ? (
        <div
          className={`project-preview-card${hasVideo ? " has-video" : ""}`}
          key={project.id}
        >
          {project.previewVideo ? (
            <video
              ref={videoRef}
              className="project-preview-video"
              src={project.previewVideo}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <div className="project-preview-content">
              <p className="project-preview-title">{project.title}</p>
              <p className="project-preview-tagline">
                {project.tagline ?? project.description}
              </p>
              <p className="project-preview-soon">coming soon</p>
            </div>
          )}
        </div>
      ) : null}
    </aside>
  );
}
