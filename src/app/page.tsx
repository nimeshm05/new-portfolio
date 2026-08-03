"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import type { DetailItem } from "@/data/details";
import "./home.css";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);

  return (
    <main className="home">
      <div className="home-layout">
        <Sidebar
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />
        {selectedItem ? (
          <ProjectDetails
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        ) : (
          <div className="project-details-pane" aria-hidden="true" />
        )}
      </div>
    </main>
  );
}
