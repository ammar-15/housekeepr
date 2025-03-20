import { useState, useEffect, useRef } from "react";
import AdminAutoAssign from "./AdminAutoAssign";
import AdminHSKassign from "./AdminHSKassign";

interface AdminStartProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onAddSUProom?: (SUProom: string) => void;
}

const AdminStart = ({ onAddHSKroom }: AdminStartProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeModal, setActiveModal] = useState<"HSK" | "AUTO" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => setShowOptions(!showOptions);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShowOptions(false);
        }
      };
  
      if (showOptions) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setShowOptions]);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={toggleOptions}
        className="text-xl bg-chocolate text-white rounded-full px-5 py-3 hover:bg-wine"
      >
        +
      </button>

      {showOptions && (
        <div ref={dropdownRef} className="absolute bottom-16 right-0 flex flex-col space-y-2">
          <button
            onClick={() => setActiveModal("HSK")}
            className="bg-white w-40 px-4 py-2 rounded-md shadow hover:bg-mistysky"
          >
            Assign Room
          </button>
          <button
            onClick={() => setActiveModal("AUTO")}
            className="bg-white w-40 px-4 py-2 rounded-md shadow hover:bg-mistysky"
          >
            Start The day
          </button>
        </div>
      )}

      {activeModal === "HSK" && (
        <AdminHSKassign
          onAddHSKroom={(HSKroomNumber) => {
            if (onAddHSKroom) onAddHSKroom(HSKroomNumber);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === "AUTO" && (
        <AdminAutoAssign onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default AdminStart;
