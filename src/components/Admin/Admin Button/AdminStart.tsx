import { useState, useEffect, useRef } from "react";
import AdminAutoAssign from "./AdminAutoAssign";
import AdminHSKassign from "./AdminHSKassign";
import { Plus } from "../../ui/icons";

interface AdminStartProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onAddSUProom?: (SUProom: string) => void;
}

const ACTIONS = [
  {
    key: "AUTO" as const,
    title: "Start the day",
    body: "Load check-outs and stayovers and split them across staff",
  },
  {
    key: "HSK" as const,
    title: "Assign a room",
    body: "Add or reassign a single room",
  },
];

const AdminStart = ({ onAddHSKroom }: AdminStartProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeModal, setActiveModal] = useState<"HSK" | "AUTO" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowOptions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showOptions]);

  return (
    <>
      <div
        ref={dropdownRef}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 print:hidden"
      >
        {showOptions && (
          <div
            role="menu"
            className="w-72 animate-modal-in overflow-hidden rounded-lg border border-line bg-white shadow-lg"
          >
            {ACTIONS.map((action) => (
              <button
                key={action.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  setActiveModal(action.key);
                  setShowOptions(false);
                }}
                className="block w-full border-b border-line px-4 py-3 text-left last:border-b-0 hover:bg-pearl"
              >
                <span className="block text-sm font-medium">{action.title}</span>
                <span className="block text-xs text-chocolate/55">{action.body}</span>
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowOptions((open) => !open)}
          aria-label={showOptions ? "Close actions" : "Open actions"}
          aria-expanded={showOptions}
          className="grid h-14 w-14 place-items-center rounded-full bg-chocolate text-pearl shadow-[0_8px_24px_-8px_rgba(64,27,27,0.6)] transition-colors hover:bg-wine"
        >
          <Plus
            width={22}
            height={22}
            strokeWidth={2}
            className={`transition-transform duration-200 ${showOptions ? "rotate-45" : ""}`}
          />
        </button>
      </div>

      {activeModal === "HSK" && (
        <AdminHSKassign
          onAddHSKroom={(HSKroomNumber) => {
            if (onAddHSKroom) onAddHSKroom(HSKroomNumber);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "AUTO" && <AdminAutoAssign onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default AdminStart;
