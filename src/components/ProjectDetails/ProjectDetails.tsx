"use client";

import { useEffect, useRef, useState } from "react";
import type { DetailItem } from "@/data/details";
import {
  getCaseStudyMarkdown,
  getCaseStudyQuickRead,
  getProjectSections,
} from "@/data/case-studies";
import {
  ProjectDetailsNavbar,
  type DetailsViewMode,
} from "@/components/ProjectDetailsNavbar/ProjectDetailsNavbar";
import { CaseStudyContent } from "@/components/CaseStudyContent/CaseStudyContent";
import { getDetailsMetaFields } from "@/lib/projectMeta";
import "./ProjectDetails.css";

type ProjectDetailsProps = {
  item: DetailItem;
  onClose: () => void;
  sectionTarget?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSectionScrolled?: () => void;
  onActiveSectionChange?: (sectionId: string | null) => void;
  activeSectionId?: string | null;
  /** Close control — only when opened via click (fullscreen / about) */
  showClose?: boolean;
};

export function ProjectDetails({
  item,
  onClose,
  sectionTarget = null,
  onSelectSection,
  onSectionScrolled,
  onActiveSectionChange,
  activeSectionId = null,
  showClose = false,
}: ProjectDetailsProps) {
  const [viewMode, setViewMode] = useState<DetailsViewMode>("quick-read");
  const [viewItemId, setViewItemId] = useState(item.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasVideo = Boolean(item.previewVideo);
  const caseStudyMarkdown = getCaseStudyMarkdown(item.id);
  const sections = getProjectSections(item.id);
  const metaFields = getDetailsMetaFields(item.meta);
  const renderedMarkdown =
    caseStudyMarkdown == null
      ? null
      : viewMode === "quick-read"
        ? getCaseStudyQuickRead(caseStudyMarkdown)
        : caseStudyMarkdown;

  if (item.id !== viewItemId) {
    setViewItemId(item.id);
    setViewMode("quick-read");
  }

  function handleSelectSection(sectionId: string) {
    setViewMode("deep-dive");
    onSelectSection?.(sectionId);
  }

  useEffect(() => {
    if (!sectionTarget || viewMode !== "deep-dive") return;

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
        showClose={showClose}
        sections={sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
      />

      <div className="project-details-body" ref={bodyRef}>
        <div className="project-details-hero">
          <div className="project-details-media-wrap">
            <div
              className={`project-details-media${item.mediaTone ? ` is-${item.mediaTone}` : ""}`}
            >
              <div
                className="project-details-media-backdrop"
                aria-hidden="true"
              />
              {item.previewVideo ? (
                <div key={item.id} className="project-details-video-layer">
                  <video
                    ref={videoRef}
                    className="project-details-video"
                    src={item.previewVideo}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="project-details-intro">
            <div className="project-details-title-wrap">
              <h1 className="project-details-title">{item.title}</h1>
            </div>
            {metaFields.length > 0 ? (
              <dl className="project-details-meta">
                {metaFields.map((field) => (
                  <div key={field.label} className="project-details-meta-item">
                    <dt className="project-details-meta-label">{field.label}</dt>
                    <dd className="project-details-meta-value">{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

        {renderedMarkdown ? (
          <>
            <hr className="project-details-divider" />
            <CaseStudyContent
              key={`${item.id}-${viewMode}`}
              markdown={renderedMarkdown}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
