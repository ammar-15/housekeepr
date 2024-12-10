import { useState } from "react";

interface AdminSUPassignProps {
  onAddSUProom?: (SUProom: string) => void;
}

const AdminSUPassign = ({ onAddSUProom }: AdminSUPassignProps) => {
  const [SUProomDescription, setSUProomDescription] = useState("");

  const handleSave = () => {
    if (SUProomDescription.trim() !== "") {
      if (onAddSUProom) onAddSUProom(SUProomDescription);
      setSUProomDescription("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4">Assign SUProom</h2>
        <input
          type="text"
          placeholder="SUProom Description"
          value={SUProomDescription}
          onChange={(e) => setSUProomDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSUPassign;