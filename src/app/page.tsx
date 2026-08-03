"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import type { DetailItem } from "@/data/details";
import "./home.css";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [sectionTarget, setSectionTarget] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const handleSelectItem = useCallback((item: DetailItem | null) => {
    setSelectedItem(item);
    setSectionTarget(null);
    setActiveSectionId(null);
  }, []);

  const handleSectionScrolled = useCallback(() => {
    setSectionTarget(null);
  }, []);

  return (
    <main className="home">
      <div className="home-layout">
        <Sidebar
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          activeSectionId={activeSectionId}
          onSelectSection={setSectionTarget}
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
          <div className="project-details-pane" aria-hidden="true" />
        )}
      </div>
    </main>
  );
}
