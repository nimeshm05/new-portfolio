"use client";

import { useEffect, useRef } from "react";
import type { DetailItem } from "@/data/details";
import "./ProjectPreview.css";

type ProjectPreviewProps = {
  project: DetailItem;
  className?: string;
};

export function ProjectPreview({ project, className }: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project.previewVideo);

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
  }, [project.id, hasVideo]);

  return (
    <div
      className={[
        "project-preview-card",
        project.mediaTone ? `is-${project.mediaTone}` : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="project-preview-card-backdrop" aria-hidden="true" />
      <div className="project-preview-media">
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
          <div className="project-preview-media-fallback">
            <p className="project-preview-soon">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
