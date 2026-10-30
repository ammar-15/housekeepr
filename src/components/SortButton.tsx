import { useState, useEffect, useRef } from "react";
import { SORT_LABELS, SortOption } from "../lib/rooms";
import { buttonOutline } from "./ui/form";
import { ArrowUpDown, Check } from "./ui/icons";

interface SortButtonProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
  options?: SortOption[];
}

const SortButton = ({
  value,
  onChange,
  options = ["ascending", "descending", "recent", "oldest"],
}: SortButtonProps) => {
  const [isSortingVisible, setIsSortingVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSortingVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortingVisible(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSortingVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSortingVisible]);

  return (
    <div className="sort-container relative print:hidden" ref={dropdownRef}>
      <button
        type="button"
        className={buttonOutline}
        onClick={() => setIsSortingVisible((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isSortingVisible}
        aria-label={`Sort: ${SORT_LABELS[value]}`}
      >
        <ArrowUpDown className="text-chocolate/60" />
        <span className="hidden whitespace-nowrap sm:inline">{SORT_LABELS[value]}</span>
      </button>

      {isSortingVisible && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-1.5 w-56 animate-modal-in rounded-lg border border-line bg-white p-1.5 shadow-lg"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setIsSortingVisible(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-mistysky/60"
              >
                {SORT_LABELS[option]}
                {option === value && <Check className="text-clay" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortButton;
