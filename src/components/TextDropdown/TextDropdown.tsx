import type { ButtonHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import "./TextDropdown.css";

type TextDropdownProps = {
  label?: string;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function TextDropdown({
  label = "Sections",
  onClick,
  className,
  type = "button",
  ...props
}: TextDropdownProps) {
  return (
    <button
      type={type}
      className={`text-dropdown${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...props}
    >
      <span className="text-dropdown-label">{label}</span>
      <ChevronDown
        className="text-dropdown-icon"
        size={20}
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </button>
  );
}
