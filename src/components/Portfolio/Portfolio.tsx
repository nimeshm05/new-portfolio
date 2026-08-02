"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import {
  industryProjects,
  personalProjects,
  type Project,
} from "@/data/projects";
import { ProjectPreview } from "@/components/ProjectPreview/ProjectPreview";
import { SIDEBAR_BLUR_VARIANTS } from "@/motion";
import "./Portfolio.css";

function ProjectListItem({
  project,
  isActive,
  onActivate,
  onDeactivate,
}: {
  project: Project;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = project.icon;

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
        <span className="portfolio-project-title">{project.title}</span>
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
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
              <div className="portfolio-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/avatar.svg" alt="" width={24} height={24} />
              </div>
              <div className="portfolio-info">
                <p className="portfolio-name">Nimesh Mohanakrishnan</p>
                <p className="portfolio-roles">
                  {/* <span className="portfolio-role">
                    product design intern @ knool
                  </span> */}
                  {/* <span className="portfolio-roles-dot" aria-hidden="true" /> */}
                  <span className="portfolio-role">
                    Currently, MS-HCDE Student @ udub. Previously, designed internal tools at RozieAI.
                  </span>
                </p>
              </div>
            </div>

            <nav className="portfolio-nav" aria-label="Primary">
              <a
                className="portfolio-nav-link is-active"
                href="/"
                aria-current="page"
              >
                work
              </a>
              <a className="portfolio-nav-link" href="#about">
                about
              </a>
              <a className="portfolio-nav-link" href="#writings">
                writings
              </a>
            </nav>
          </header>

          <div className="portfolio-content">
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
                    project={project}
                    isActive={activeProject?.id === project.id}
                    onActivate={() => setActiveProject(project)}
                    onDeactivate={() => setActiveProject(null)}
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
                    project={project}
                    isActive={activeProject?.id === project.id}
                    onActivate={() => setActiveProject(project)}
                    onDeactivate={() => setActiveProject(null)}
                  />
                ))}
              </ul>
            </section>
          </div>
        </motion.div>

        <ProjectPreview project={activeProject} />
      </div>
    </main>
  );
}
