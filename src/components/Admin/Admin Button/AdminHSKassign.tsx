import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";
import RoomData from "../../RoomData";

interface AdminHSKassignProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onClose?: () => void;
}

const AdminHSKassign = ({ onAddHSKroom, onClose }: AdminHSKassignProps) => {
  const [HSKroomNumber, setHSKRoomNumber] = useState(""); 
  const [statusOption, setStatusOption] = useState("Dirty"); 
  const handleClose = () => {
    if (onClose) {
      onClose();
      console.log("hskassign closed");
    }
  };

  const handleSave = async () => {
    console.log("room sent to Firebase");

    if (HSKroomNumber.trim() !== "") {
      const room = RoomData.find((r) => r.roomNumber === HSKroomNumber); 

      if (!room) {
        console.error("room not found in RoomData.");
        return;
      }

      const currentTime = new Date();
      const formattedTime = currentTime.toISOString();

      try {
        const roomRef = doc(db, "AdminHSK", HSKroomNumber);
        const updatedRoom = { ...room, roomStatus: statusOption, time_stamp: formattedTime };
        await setDoc(roomRef, updatedRoom);
        console.log(`room saved to Firebase with status "${statusOption}" at "${formattedTime}":`, updatedRoom);

        if (onAddHSKroom) onAddHSKroom(HSKroomNumber);
        setHSKRoomNumber(""); 
      } catch (error) {
        console.error("firebase error", error);
      }
    }
    console.log("HSK assign done!!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4">Assign Room</h2>
        <input
          type="text"
          placeholder="Room Number"
          value={HSKroomNumber}
          onChange={(e) => setHSKRoomNumber(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <select
          value={statusOption}
          onChange={(e) => setStatusOption(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        >
          <option value="Dirty">Dirty</option>
          <option value="Clean">Clean</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-black px-4 py-2 rounded-md hover:bg-dustyblue mr-2"
          >
            Cancel
          </button>
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

export default AdminHSKassign;
