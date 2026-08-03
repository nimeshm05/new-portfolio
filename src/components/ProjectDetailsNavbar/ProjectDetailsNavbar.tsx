import { SidebarTab } from "@/components/SidebarTab/SidebarTab";
import { TextDropdown } from "@/components/TextDropdown/TextDropdown";
import { IconButton } from "@/components/IconButton/IconButton";
import "./ProjectDetailsNavbar.css";

export type DetailsViewMode = "quick-read" | "deep-dive";

type ProjectDetailsNavbarProps = {
  viewMode: DetailsViewMode;
  onViewModeChange: (mode: DetailsViewMode) => void;
  onClose: () => void;
};

export function ProjectDetailsNavbar({
  viewMode,
  onViewModeChange,
  onClose,
}: ProjectDetailsNavbarProps) {
  return (
    <header className="project-details-navbar">
      <nav className="project-details-navbar-tabs" aria-label="Detail view">
        <SidebarTab
          isActive={viewMode === "quick-read"}
          onClick={() => onViewModeChange("quick-read")}
        >
          Quick Read
        </SidebarTab>
        <SidebarTab
          isActive={viewMode === "deep-dive"}
          onClick={() => onViewModeChange("deep-dive")}
        >
          Deep Dive
        </SidebarTab>
      </nav>

      <div className="project-details-navbar-actions">
        {/* <TextDropdown label="Sections" /> */}
        <IconButton aria-label="Close details" onClick={onClose} />
      </div>
    </header>
  );
}
