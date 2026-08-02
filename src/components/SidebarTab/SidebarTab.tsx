import type { ReactNode } from "react";
import "./SidebarTab.css";

type SidebarTabButtonProps = {
  children: ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

type SidebarTabLinkProps = {
  children: ReactNode;
  href: string;
};

export function SidebarTab({
  children,
  isActive = false,
  onClick,
}: SidebarTabButtonProps) {
  return (
    <button
      type="button"
      className={`sidebar-tab${isActive ? " is-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SidebarTabLink({ children, href }: SidebarTabLinkProps) {
  return (
    <a className="sidebar-tab" href={href}>
      {children}
    </a>
  );
}
