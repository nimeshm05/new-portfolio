"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import "./TextDropdown.css";

export type TextDropdownOption = {
  id: string;
  label: string;
};

type TextDropdownProps = {
  label?: string;
  options?: TextDropdownOption[];
  activeOptionId?: string | null;
  onSelectOption?: (optionId: string) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function TextDropdown({
  label = "Sections",
  options = [],
  activeOptionId = null,
  onSelectOption,
  className,
  type = "button",
  onClick,
  ...props
}: TextDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const hasOptions = options.length > 0;

  return (
    <div
      className={`text-dropdown-root${className ? ` ${className}` : ""}`}
      ref={rootRef}
    >
      <button
        type={type}
        className={`text-dropdown${isOpen ? " is-open" : ""}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={hasOptions ? menuId : undefined}
        disabled={!hasOptions}
        onClick={(event) => {
          onClick?.(event);
          if (hasOptions) setIsOpen((open) => !open);
        }}
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

      {isOpen && hasOptions ? (
        <ul className="text-dropdown-menu" id={menuId} role="menu">
          {options.map((option) => (
            <li key={option.id} role="none">
              <button
                type="button"
                role="menuitem"
                className={`text-dropdown-option${
                  activeOptionId === option.id ? " is-active" : ""
                }`}
                onClick={() => {
                  onSelectOption?.(option.id);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
