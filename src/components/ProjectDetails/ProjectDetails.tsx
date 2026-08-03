"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { DetailItem } from "@/data/details";
import {
  ProjectDetailsNavbar,
  type DetailsViewMode,
} from "@/components/ProjectDetailsNavbar/ProjectDetailsNavbar";
import { DETAILS_MEDIA_VARIANTS } from "@/motion";
import "./ProjectDetails.css";

type ProjectDetailsProps = {
  item: DetailItem;
  onClose: () => void;
};

export function ProjectDetails({ item, onClose }: ProjectDetailsProps) {
  const [viewMode, setViewMode] = useState<DetailsViewMode>("quick-read");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(item.previewVideo);

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
  }, [item.id, hasVideo]);

  return (
    <section className="project-details" aria-label={item.title}>
      <ProjectDetailsNavbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onClose={onClose}
      />

      <div className="project-details-body">
        <div className="project-details-media-wrap">
          <div
            className={`project-details-media${item.mediaTone ? ` is-${item.mediaTone}` : ""}`}
          >
            <div className="project-details-media-backdrop" aria-hidden="true" />
            <AnimatePresence initial={false}>
              {item.previewVideo ? (
                <motion.div
                  key={item.id}
                  className="project-details-video-layer"
                  variants={DETAILS_MEDIA_VARIANTS}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <video
                    ref={videoRef}
                    className="project-details-video"
                    src={item.previewVideo}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <div className="project-details-title-wrap">
          <h1 className="project-details-title">{item.title}</h1>
        </div>
      </div>
    </section>
  );
}
