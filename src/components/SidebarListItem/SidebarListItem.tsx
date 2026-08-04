import { ChevronRight, type LucideIcon } from "lucide-react";
import "./SidebarListItem.css";

export type SidebarListItemData = {
  id: string;
  title: string;
  icon?: LucideIcon;
};

type SidebarListItemProps = {
  item: SidebarListItemData;
  isActive: boolean;
  onSelect: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  showIcon?: boolean;
  showChevron?: boolean;
  number?: number;
};

export function SidebarListItem({
  item,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
  showIcon = true,
  showChevron = true,
  number,
}: SidebarListItemProps) {
  const Icon = item.icon;
  const label =
    number != null ? `${number}. ${item.title}` : item.title;

  return (
    <li>
      <button
        type="button"
        className={`sidebar-list-item${isActive ? " is-active" : ""}`}
        onClick={onSelect}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
      >
        {showIcon && Icon ? (
          <Icon
            className="sidebar-list-item-icon"
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
        <span className="sidebar-list-item-title">{label}</span>
        {showChevron ? (
          <ChevronRight
            className="sidebar-list-item-chevron"
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ) : null}
      </button>
    </li>
  );
}
