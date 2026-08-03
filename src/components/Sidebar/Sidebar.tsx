"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { industryProjects, personalProjects } from "@/data/projects";
import { aboutTopics } from "@/data/about";
import { getProjectSections } from "@/data/case-studies";
import type { DetailItem } from "@/data/details";
import { SidebarListItem } from "@/components/SidebarListItem/SidebarListItem";
import {
  SIDEBAR_BLUR_VARIANTS,
  SIDEBAR_PILL_TRANSITION,
  TAB_CONTENT_BLUR_VARIANTS,
} from "@/motion";
import "./Sidebar.css";

type Tab = "work" | "about" | "writings";

type SidebarProps = {
  selectedItem: DetailItem | null;
  onSelectItem: (item: DetailItem | null) => void;
  activeSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
};

export function Sidebar({
  selectedItem,
  onSelectItem,
  activeSectionId = null,
  onSelectSection,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const isProjectSelected = selectedItem?.kind === "project";
  const projectSections = isProjectSelected
    ? getProjectSections(selectedItem.id)
    : [];
  const contentKey = isProjectSelected
    ? `sections-${selectedItem.id}`
    : activeTab;

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    onSelectItem(null);
  }

  return (
    <motion.aside
      className="sidebar"
      variants={SIDEBAR_BLUR_VARIANTS}
      initial="hidden"
      animate="show"
    >
      <header className="sidebar-header">
        <div className="sidebar-identity">
          <div className="sidebar-avatar" aria-hidden="true">
            <svg
              className="sidebar-logo"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 0.57735C11.6188 0.220084 12.3812 0.220085 13 0.57735L21.3923 5.42265C22.0111 5.77992 22.3923 6.44017 22.3923 7.1547V16.8453C22.3923 17.5598 22.0111 18.2201 21.3923 18.5774L13 23.4226C12.3812 23.7799 11.6188 23.7799 11 23.4226L2.6077 18.5774C1.98889 18.2201 1.6077 17.5598 1.6077 16.8453V7.1547C1.6077 6.44017 1.98889 5.77992 2.6077 5.42265L11 0.57735Z" />
            </svg>
          </div>
          <div className="sidebar-info">
            <p className="sidebar-name">Nimesh Mohanakrishnan</p>
            <p className="sidebar-roles">
              <span className="sidebar-role">Product Designer.</span>
            </p>
          </div>
        </div>

        <nav
          className="sidebar-nav sidebar-nav-segmented"
          aria-label={isProjectSelected ? "Project" : "Primary"}
        >
          <div className="sidebar-nav-panel">
            <motion.div
              className="sidebar-nav-pill"
              initial={false}
              animate={
                isProjectSelected
                  ? { left: 0, width: "100%" }
                  : activeTab === "about"
                    ? { left: "calc(50% + 1px)", width: "calc(50% - 1px)" }
                    : { left: 0, width: "calc(50% - 1px)" }
              }
              transition={SIDEBAR_PILL_TRANSITION}
            />

            <button
              type="button"
              className={`sidebar-nav-tab${
                isProjectSelected || activeTab === "work" ? " is-active" : ""
              }`}
              aria-current={
                isProjectSelected || activeTab === "work" ? "page" : undefined
              }
              onClick={() =>
                isProjectSelected ? onSelectItem(null) : selectTab("work")
              }
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={isProjectSelected ? "back" : "work"}
                  className="sidebar-nav-label"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.12, ease: "easeIn" },
                  }}
                >
                  {isProjectSelected ? "Back to Projects" : "Work"}
                </motion.span>
              </AnimatePresence>
            </button>

            <motion.button
              type="button"
              className={`sidebar-nav-tab${activeTab === "about" ? " is-active" : ""}`}
              aria-current={
                !isProjectSelected && activeTab === "about" ? "page" : undefined
              }
              aria-hidden={isProjectSelected}
              tabIndex={isProjectSelected ? -1 : 0}
              initial={false}
              animate={{
                flexGrow: isProjectSelected ? 0 : 1,
                flexBasis: 0,
                opacity: isProjectSelected
                  ? 0
                  : activeTab === "about"
                    ? 1
                    : 0.8,
                paddingLeft: isProjectSelected ? 0 : 12,
                paddingRight: isProjectSelected ? 0 : 12,
              }}
              transition={SIDEBAR_PILL_TRANSITION}
              onClick={() => selectTab("about")}
            >
              About
            </motion.button>
          </div>
        </nav>
      </header>

      <div className="sidebar-content-stage">
        <AnimatePresence initial={false}>
          <motion.div
            key={contentKey}
            className="sidebar-content"
            variants={TAB_CONTENT_BLUR_VARIANTS}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {isProjectSelected ? (
              <section
                className="sidebar-section"
                aria-labelledby="project-sections-label"
              >
                <h2
                  className="sidebar-section-label"
                  id="project-sections-label"
                >
                  Project Sections
                </h2>
                <ul className="sidebar-list">
                  {projectSections.map((section, index) => (
                    <SidebarListItem
                      key={section.id}
                      item={section}
                      isActive={activeSectionId === section.id}
                      showIcon={false}
                      showChevron={false}
                      number={index + 1}
                      onSelect={() => onSelectSection?.(section.id)}
                    />
                  ))}
                </ul>
              </section>
            ) : activeTab === "work" ? (
              <>
                <section
                  className="sidebar-section"
                  aria-labelledby="industry-label"
                >
                  <h2 className="sidebar-section-label" id="industry-label">
                    Industry Projects
                  </h2>
                  <ul className="sidebar-list">
                    {industryProjects.map((project) => (
                      <SidebarListItem
                        key={project.id}
                        item={project}
                        isActive={selectedItem?.id === project.id}
                        onSelect={() =>
                          onSelectItem({
                            id: project.id,
                            title: project.title,
                            kind: "project",
                            previewVideo: project.previewVideo,
                            mediaTone: project.mediaTone,
                          })
                        }
                      />
                    ))}
                  </ul>
                </section>

                <hr className="sidebar-divider" />

                <section
                  className="sidebar-section"
                  aria-labelledby="personal-label"
                >
                  <h2 className="sidebar-section-label" id="personal-label">
                    Personal Projects
                  </h2>
                  <ul className="sidebar-list">
                    {personalProjects.map((project) => (
                      <SidebarListItem
                        key={project.id}
                        item={project}
                        isActive={selectedItem?.id === project.id}
                        onSelect={() =>
                          onSelectItem({
                            id: project.id,
                            title: project.title,
                            kind: "project",
                            previewVideo: project.previewVideo,
                            mediaTone: project.mediaTone,
                          })
                        }
                      />
                    ))}
                  </ul>
                </section>
              </>
            ) : activeTab === "about" ? (
              <section
                className="sidebar-section"
                aria-labelledby="about-label"
              >
                <h2 className="sidebar-section-label" id="about-label">
                  Learn About Me
                </h2>
                <ul className="sidebar-list">
                  {aboutTopics.map((topic) => (
                    <SidebarListItem
                      key={topic.id}
                      item={topic}
                      isActive={selectedItem?.id === topic.id}
                      onSelect={() =>
                        onSelectItem({
                          id: topic.id,
                          title: topic.title,
                          kind: "about",
                        })
                      }
                    />
                  ))}
                </ul>
              </section>
            ) : (
              <section
                className="sidebar-section"
                aria-labelledby="writings-label"
              >
                <h2 className="sidebar-section-label" id="writings-label">
                  Coming soon
                </h2>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
