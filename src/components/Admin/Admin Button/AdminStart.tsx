import { useState } from "react";
import AdminAutoAssign from "./AdminAutoAssign";
import AdminHSKassign from "./AdminHSKassign";
import AdminSUPassign from "./AdminSUPassign";

interface AdminStartProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onAddSUProom?: (SUProom: string) => void;
}

const AdminStart = ({ onAddHSKroom, onAddSUProom }: AdminStartProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeModal, setActiveModal] = useState<"HSK" | "SUP" | "AUTO" | null>(null);

  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={toggleOptions}
        className="text-xl bg-chocolate text-white rounded-full px-5 py-3 hover:bg-wine"
      >
        +
      </button>
      {showOptions && (
        <div className="absolute bottom-16 right-0 flex flex-col space-y-2">
          <button
            onClick={() => setActiveModal("HSK")}
            className="bg-white px-4 py-2 rounded-md shadow hover:bg-mistysky"
          >
            AdminHSKassign
          </button>
          <button
            onClick={() => setActiveModal("SUP")}
            className="bg-white px-4 py-2 rounded-md shadow hover:bg-mistysky"
          >
            AdminSUPassign
          </button>
          <button
            onClick={() => setActiveModal("AUTO")}
            className="bg-white px-4 py-2 rounded-md shadow hover:bg-mistysky"
          >
            AdminAutoAssign
          </button>
        </div>
      )}
      {activeModal === "HSK" && (
        <AdminHSKassign
          onAddHSKroom={(HSKroomNumber) => {
            if (onAddHSKroom) onAddHSKroom(HSKroomNumber);
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "SUP" && (
        <AdminSUPassign
          onAddSUProom={(SUProom) => {
            if (onAddSUProom) onAddSUProom(SUProom);
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "AUTO" && <AdminAutoAssign />}
    </div>
  );
};

export default AdminStart;