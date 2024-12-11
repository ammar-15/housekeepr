import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import RoomData from "../../RoomData"; 

interface AdminSUPassignProps {
  onAddSUProom?: (SUProomNumber: string) => void;
}

const AdminSUPassign = ({ onAddSUProom }: AdminSUPassignProps) => {
  const [SUProomNumber, setSUPRoomNumber] = useState("");

  const handleSave = async () => {
    console.log("Room passed in SUP assign");
    if (SUProomNumber.trim() !== "") {
      const room = RoomData.find((r) => r.roomNumber === SUProomNumber);

      if (!room) {
        console.error("Room not found in RoomData.");
        return;
      }

      try {
        await setDoc(doc(db, "AdminSUP", SUProomNumber), room);

        console.log("Room saved to Firebase:", room);

        if (onAddSUProom) onAddSUProom(SUProomNumber);
        setSUPRoomNumber("");
      } catch (error) {
        console.error("Error saving room to Firebase:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4">Assign Room</h2>
        <input
          type="text"
          placeholder="Room Number"
          value={SUProomNumber}
          onChange={(e) => setSUPRoomNumber(e.target.value)}
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