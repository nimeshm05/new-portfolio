"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { DetailItem } from "@/data/details";
import {
  getCaseStudyMarkdown,
  getCaseStudyQuickRead,
} from "@/data/case-studies";
import {
  ProjectDetailsNavbar,
  type DetailsViewMode,
} from "@/components/ProjectDetailsNavbar/ProjectDetailsNavbar";
import { CaseStudyContent } from "@/components/CaseStudyContent/CaseStudyContent";
import { DETAILS_MEDIA_VARIANTS } from "@/motion";
import "./ProjectDetails.css";

type ProjectDetailsProps = {
  item: DetailItem;
  onClose: () => void;
  sectionTarget?: string | null;
  onSectionScrolled?: () => void;
  onActiveSectionChange?: (sectionId: string | null) => void;
};

export function ProjectDetails({
  item,
  onClose,
  sectionTarget = null,
  onSectionScrolled,
  onActiveSectionChange,
}: ProjectDetailsProps) {
  const [viewMode, setViewMode] = useState<DetailsViewMode>("quick-read");
  const videoRef = useRef<HTMLVideoElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasVideo = Boolean(item.previewVideo);
  const caseStudyMarkdown = getCaseStudyMarkdown(item.id);
  const renderedMarkdown =
    caseStudyMarkdown == null
      ? null
      : viewMode === "quick-read"
        ? getCaseStudyQuickRead(caseStudyMarkdown)
        : caseStudyMarkdown;

  useEffect(() => {
    setViewMode("quick-read");
    onActiveSectionChange?.(null);
  }, [item.id, onActiveSectionChange]);

  useEffect(() => {
    if (!sectionTarget) return;

    if (viewMode !== "deep-dive") {
      setViewMode("deep-dive");
      return;
    }

    const body = bodyRef.current;
    if (!body) return;

    const frame = requestAnimationFrame(() => {
      const target = body.querySelector<HTMLElement>(
        `#${CSS.escape(sectionTarget)}`,
      );
      if (!target) {
        onSectionScrolled?.();
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      onActiveSectionChange?.(sectionTarget);
      onSectionScrolled?.();
    });

    return () => cancelAnimationFrame(frame);
  }, [
    sectionTarget,
    viewMode,
    item.id,
    renderedMarkdown,
    onSectionScrolled,
    onActiveSectionChange,
  ]);

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

      <div className="project-details-body" ref={bodyRef}>
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
        {renderedMarkdown ? (
          <CaseStudyContent
            key={`${item.id}-${viewMode}`}
            markdown={renderedMarkdown}
          />
        ) : null}
      </div>
    </section>
  );
}
