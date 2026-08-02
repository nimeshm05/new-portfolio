"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { industryProjects, personalProjects } from "@/data/projects";
import { aboutTopics } from "@/data/about";
import {
  ProjectPreview,
  type PreviewItem,
} from "@/components/ProjectPreview/ProjectPreview";
import { SIDEBAR_BLUR_VARIANTS } from "@/motion";
import "./Portfolio.css";

type Tab = "work" | "about";

type SidebarItem = PreviewItem & {
  icon: LucideIcon;
};

function ProjectListItem({
  item,
  isActive,
  onActivate,
  onDeactivate,
}: {
  item: SidebarItem;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = item.icon;

  return (
    <li>
      <button
        type="button"
        className={`portfolio-project${isActive ? " is-active" : ""}`}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
      >
        <Icon
          className="portfolio-project-icon"
          size={16}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="portfolio-project-title">{item.title}</span>
        <ChevronRight
          className="portfolio-project-chevron"
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const [activeItem, setActiveItem] = useState<SidebarItem | null>(null);

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    setActiveItem(null);
  }

  return (
    <main className="portfolio">
      <div className="portfolio-layout">
        <motion.div
          className="portfolio-sidebar"
          variants={SIDEBAR_BLUR_VARIANTS}
          initial="hidden"
          animate="show"
        >
          <header className="portfolio-header">
            <div className="portfolio-identity">
              <div className="portfolio-avatar" aria-hidden="true">
                <svg
                  className="portfolio-logo"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 0.57735C11.6188 0.220084 12.3812 0.220085 13 0.57735L21.3923 5.42265C22.0111 5.77992 22.3923 6.44017 22.3923 7.1547V16.8453C22.3923 17.5598 22.0111 18.2201 21.3923 18.5774L13 23.4226C12.3812 23.7799 11.6188 23.7799 11 23.4226L2.6077 18.5774C1.98889 18.2201 1.6077 17.5598 1.6077 16.8453V7.1547C1.6077 6.44017 1.98889 5.77992 2.6077 5.42265L11 0.57735Z" />
                </svg>
              </div>
              <div className="portfolio-info">
                <p className="portfolio-name">Nimesh Mohanakrishnan</p>
                <p className="portfolio-roles">
                  <span className="portfolio-role">Product Designer.</span>
                </p>
              </div>
            </div>

            <nav className="portfolio-nav" aria-label="Primary">
              <button
                type="button"
                className={`portfolio-nav-link${activeTab === "work" ? " is-active" : ""}`}
                aria-current={activeTab === "work" ? "page" : undefined}
                onClick={() => selectTab("work")}
              >
                work
              </button>
              <button
                type="button"
                className={`portfolio-nav-link${activeTab === "about" ? " is-active" : ""}`}
                aria-current={activeTab === "about" ? "page" : undefined}
                onClick={() => selectTab("about")}
              >
                about
              </button>
              <a className="portfolio-nav-link" href="#writings">
                writings
              </a>
            </nav>
          </header>

          <div className="portfolio-content">
            {activeTab === "work" ? (
              <>
                <section
                  className="portfolio-section"
                  aria-labelledby="industry-label"
                >
                  <h2 className="portfolio-section-label" id="industry-label">
                    Industry
                  </h2>
                  <ul className="portfolio-project-list">
                    {industryProjects.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        item={project}
                        isActive={activeItem?.id === project.id}
                        onActivate={() => setActiveItem(project)}
                        onDeactivate={() => setActiveItem(null)}
                      />
                    ))}
                  </ul>
                </section>

                <hr className="portfolio-divider" />

                <section
                  className="portfolio-section"
                  aria-labelledby="personal-label"
                >
                  <h2 className="portfolio-section-label" id="personal-label">
                    Personal
                  </h2>
                  <ul className="portfolio-project-list">
                    {personalProjects.map((project) => (
                      <ProjectListItem
                        key={project.id}
                        item={project}
                        isActive={activeItem?.id === project.id}
                        onActivate={() => setActiveItem(project)}
                        onDeactivate={() => setActiveItem(null)}
                      />
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <section
                className="portfolio-section"
                aria-labelledby="about-label"
              >
                <h2 className="portfolio-section-label" id="about-label">
                  learn about me
                </h2>
                <ul className="portfolio-project-list">
                  {aboutTopics.map((topic) => (
                    <ProjectListItem
                      key={topic.id}
                      item={topic}
                      isActive={activeItem?.id === topic.id}
                      onActivate={() => setActiveItem(topic)}
                      onDeactivate={() => setActiveItem(null)}
                    />
                  ))}
                </ul>
              </section>
            )}
          </div>
        </motion.div>

        <ProjectPreview project={activeItem} />
      </div>
    </main>
  );
}
