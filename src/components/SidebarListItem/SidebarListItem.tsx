import { ChevronRight, type LucideIcon } from "lucide-react";
import "./SidebarListItem.css";

export type SidebarListItemData = {
  id: string;
  title: string;
  icon: LucideIcon;
};

type SidebarListItemProps = {
  item: SidebarListItemData;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

export function SidebarListItem({
  item,
  isActive,
  onActivate,
  onDeactivate,
}: SidebarListItemProps) {
  const Icon = item.icon;

  return (
    <li>
      <button
        type="button"
        className={`sidebar-list-item${isActive ? " is-active" : ""}`}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
      >
        <Icon
          className="sidebar-list-item-icon"
          size={16}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="sidebar-list-item-title">{item.title}</span>
        <ChevronRight
          className="sidebar-list-item-chevron"
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}
