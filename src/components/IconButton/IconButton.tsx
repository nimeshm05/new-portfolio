import type { ButtonHTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import "./IconButton.css";

type IconButtonProps = {
  "aria-label": string;
  onClick?: () => void;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label">;

export function IconButton({
  "aria-label": ariaLabel,
  onClick,
  children,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`icon-button${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {children ?? (
        <X className="icon-button-icon" size={20} strokeWidth={1.75} />
      )}
    </button>
  );
}
