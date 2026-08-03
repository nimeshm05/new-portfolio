"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { DetailItem } from "@/data/details";
import { getPreviewMetaFields } from "@/lib/projectMeta";
import "./ProjectPreview.css";

type ProjectPreviewProps = {
  project: DetailItem | null;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project?.previewVideo);
  const metaFields = getPreviewMetaFields(project?.meta);

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
        <div key={project.id} className="project-preview-card">
          <div
            className={`project-preview-media${project.mediaTone ? ` is-${project.mediaTone}` : ""}`}
          >
            <div
              className="project-preview-media-backdrop"
              aria-hidden="true"
            />
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

          <div className="project-preview-info">
            <div className="project-preview-header">
              <p className="project-preview-title">{project.title}</p>
            </div>
            {metaFields.length > 0 ? (
              <dl
                className="project-preview-meta"
                style={
                  {
                    "--preview-meta-cols": metaFields.length,
                  } as CSSProperties
                }
              >
                {metaFields.map((field) => (
                  <div key={field.label} className="project-preview-meta-item">
                    <dt className="project-preview-meta-label">{field.label}</dt>
                    <dd className="project-preview-meta-value">{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="project-preview-header">
                <p className="project-preview-tagline">
                  {project.tagline ?? project.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
