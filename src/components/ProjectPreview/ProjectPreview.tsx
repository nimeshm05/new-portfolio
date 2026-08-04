"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PREVIEW_VIDEO_VARIANTS } from "@/motion";
import "./ProjectPreview.css";

export type PreviewItem = {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  previewVideo?: string;
  impact?: string;
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
      className={`project-preview${project ? " is-visible" : ""}`}
      aria-live="polite"
      aria-hidden={!project}
    >
      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.id}
            className="project-preview-card"
            variants={PREVIEW_VIDEO_VARIANTS}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <div className="project-preview-body">
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
                ) : null}
              </div>
              <p className="project-preview-description">{project.description}</p>
            </div>
            {project.impact ? (
              <p className="project-preview-impact">Impact: {project.impact}</p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </aside>
  );
}
