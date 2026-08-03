"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import type { DetailItem } from "@/data/details";
import "./home.css";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null);
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

  const isFullscreen = selectedItem?.kind === "project";
  const displayedItem = selectedItem ?? activeItem;

  return (
    <main className="home">
      <div
        className={`home-layout${isFullscreen ? " is-details-open" : ""}`}
      >
        <Sidebar
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          onActivateItem={setActiveItem}
          onDeactivateItem={() => setActiveItem(null)}
          isHidden={isFullscreen}
        />

        <div className="home-stage">
          {displayedItem ? (
            <ProjectDetails
              key={displayedItem.id}
              item={displayedItem}
              onClose={() => handleSelectItem(null)}
              sectionTarget={sectionTarget}
              onSelectSection={setSectionTarget}
              onSectionScrolled={handleSectionScrolled}
              onActiveSectionChange={setActiveSectionId}
              activeSectionId={activeSectionId}
              showClose={Boolean(selectedItem)}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
