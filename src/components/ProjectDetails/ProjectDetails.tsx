"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import { ProjectPreview } from "@/components/ProjectPreview/ProjectPreview";
import { getDetailsMetaFields } from "@/lib/projectMeta";
import {
  DETAILS_CONTENT_VARIANTS,
  DETAILS_EXPAND_TRANSITION,
  DETAILS_MEDIA_TRANSITION,
} from "@/motion";
import "./ProjectDetails.css";

/** Matches `--space-page-y` / `--space-md` in globals.css */
const EXPANDED_PADDING_TOP = 80;
const PREVIEW_PADDING_TOP = 12;

type ProjectDetailsProps = {
  item: DetailItem;
  onClose: () => void;
  sectionTarget?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSectionScrolled?: () => void;
  onActiveSectionChange?: (sectionId: string | null) => void;
  activeSectionId?: string | null;
  /** Full details mode (click). When false, shows video-only preview. */
  expanded?: boolean;
  /** Close control — only when opened via click */
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
  expanded = false,
  showClose = false,
}: ProjectDetailsProps) {
  const [viewMode, setViewMode] = useState<DetailsViewMode>("quick-read");
  const [viewItemId, setViewItemId] = useState(item.id);
  const [centerOffset, setCenterOffset] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const wasExpandedRef = useRef(expanded);
  const isExpandToggle = wasExpandedRef.current !== expanded;
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

  useLayoutEffect(() => {
    function measure() {
      const body = bodyRef.current;
      const media = mediaWrapRef.current;
      if (!body || !media || expanded) return;

      const offset = Math.max(
        0,
        (body.clientHeight - media.offsetHeight) / 2 - PREVIEW_PADDING_TOP,
      );
      setCenterOffset(offset);
    }

    measure();
    if (expanded) return;

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [expanded, item.id]);

  useEffect(() => {
    wasExpandedRef.current = expanded;
  }, [expanded]);

  useEffect(() => {
    if (!expanded || !sectionTarget || viewMode !== "deep-dive") return;

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
    expanded,
    sectionTarget,
    viewMode,
    item.id,
    renderedMarkdown,
    onSectionScrolled,
    onActiveSectionChange,
  ]);

  return (
    <section
      className={`project-details${expanded ? " is-expanded" : " is-preview"}`}
      aria-label={item.title}
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="details-navbar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={DETAILS_EXPAND_TRANSITION}
          >
            <ProjectDetailsNavbar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onClose={onClose}
              showClose={showClose}
              sections={sections}
              activeSectionId={activeSectionId}
              onSelectSection={handleSelectSection}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="project-details-body"
        ref={bodyRef}
        initial={false}
        animate={{
          paddingTop: expanded ? EXPANDED_PADDING_TOP : PREVIEW_PADDING_TOP,
        }}
        transition={DETAILS_EXPAND_TRANSITION}
      >
        <div className="project-details-hero">
          <motion.div
            ref={mediaWrapRef}
            className="project-details-media-wrap"
            initial={false}
            animate={{ y: expanded ? 0 : centerOffset }}
            transition={
              isExpandToggle ? DETAILS_MEDIA_TRANSITION : { duration: 0 }
            }
          >
            <ProjectPreview project={item} />
          </motion.div>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key={`${item.id}-intro`}
                className="project-details-intro"
                variants={DETAILS_CONTENT_VARIANTS}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <div className="project-details-title-wrap">
                  <h1 className="project-details-title">{item.title}</h1>
                </div>
                {metaFields.length > 0 ? (
                  <dl className="project-details-meta">
                    {metaFields.map((field) => (
                      <div
                        key={field.label}
                        className="project-details-meta-item"
                      >
                        <dt className="project-details-meta-label">
                          {field.label}
                        </dt>
                        <dd className="project-details-meta-value">
                          {field.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {expanded && renderedMarkdown ? (
            <motion.div
              key={`${item.id}-case-study`}
              className="project-details-case-study"
              variants={DETAILS_CONTENT_VARIANTS}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <hr className="project-details-divider" />
              <CaseStudyContent
                key={`${item.id}-${viewMode}`}
                markdown={renderedMarkdown}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
