"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import {
  ProjectPreview,
  type PreviewItem,
} from "@/components/ProjectPreview/ProjectPreview";
import type { DetailItem } from "@/data/details";
import type { Project } from "@/data/projects";
import "./home.css";

function toPreviewItem(project: Project): PreviewItem {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    tagline: project.tagline,
    previewVideo: project.previewVideo,
    impact: project.impact,
  };
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<PreviewItem | null>(
    null,
  );
  const [sectionTarget, setSectionTarget] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const isCentered = selectedItem === null;

  const handleSelectItem = useCallback((item: DetailItem | null) => {
    setSelectedItem(item);
    setHoveredProject(null);
    setSectionTarget(null);
    setActiveSectionId(null);
  }, []);

  const handleHoverProject = useCallback((project: Project | null) => {
    setHoveredProject(project ? toPreviewItem(project) : null);
  }, []);

  const handleSectionScrolled = useCallback(() => {
    setSectionTarget(null);
  }, []);

  return (
    <main className={`home${isCentered ? " is-centered" : ""}`}>
      <div
        className={`home-layout${isCentered ? " is-centered" : " is-docked"}`}
      >
        <Sidebar
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          onHoverProject={isCentered ? handleHoverProject : undefined}
          activeSectionId={activeSectionId}
          onSelectSection={setSectionTarget}
          layout={isCentered ? "centered" : "docked"}
        />
        {selectedItem ? (
          <ProjectDetails
            item={selectedItem}
            onClose={() => handleSelectItem(null)}
            sectionTarget={sectionTarget}
            onSectionScrolled={handleSectionScrolled}
            onActiveSectionChange={setActiveSectionId}
          />
        ) : (
          <ProjectPreview project={hoveredProject} />
        )}
      </div>
    </main>
  );
}
