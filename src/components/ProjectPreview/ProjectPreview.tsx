"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { PREVIEW_VIDEO_VARIANTS } from "@/motion";
import "./ProjectPreview.css";

export type PreviewItem = {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  previewVideo?: string;
};

type ProjectPreviewProps = {
  project: PreviewItem | null;
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
      {project?.previewVideo ? (
        <motion.video
          key={project.id}
          ref={videoRef}
          className="project-preview-video"
          src={project.previewVideo}
          muted
          loop
          playsInline
          autoPlay
          variants={PREVIEW_VIDEO_VARIANTS}
          initial="hidden"
          animate="show"
        />
      ) : project ? (
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
