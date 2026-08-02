"use client";

import { useState } from "react";
import { Sidebar, type SidebarItem } from "@/components/Sidebar/Sidebar";
import { ProjectPreview } from "@/components/ProjectPreview/ProjectPreview";
import "./home.css";

export default function Home() {
  const [activeItem, setActiveItem] = useState<SidebarItem | null>(null);

  return (
    <main className="home">
      <div className="home-layout">
        <Sidebar
          activeItem={activeItem}
          onActiveItemChange={setActiveItem}
        />
        <ProjectPreview project={activeItem} />
      </div>
    </main>
  );
}
