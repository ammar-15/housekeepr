import { useState, useRef, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import RoomData from "../../RoomData";

interface AdminHSKassignProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onassignedtoHSK?: (assignedtoHSK: string) => void;
  onassignedtoSUP?: (assignedtoSUP: string) => void;
  onClose?: () => void;
}

const AdminHSKassign = ({
  onAddHSKroom,
  onassignedtoHSK,
  onassignedtoSUP,
  onClose,
}: AdminHSKassignProps) => {
  const [HSKroomNumber, setHSKRoomNumber] = useState("");
  const [assignedto, setAssignedto] = useState("");
  const [statusOption, setStatusOption] = useState("Dirty");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleClose = () => {
    if (onClose) {
      onClose();
      console.log("hskassign closed");
    }
  };

  const handleSave = async () => {
    console.log("room sent to Firebase");

    if (HSKroomNumber.trim() !== "" && assignedto.trim() !== "") {
      const room = RoomData.find((r) => r.roomNumber === HSKroomNumber);

      if (!room) {
        console.error("room not found in RoomData.");
        return;
      }

      const currentTime = new Date().toISOString();
      const roomRef = doc(db, "AdminHSK", HSKroomNumber);
      let updatedRoom = {
        ...room,
        roomStatus: statusOption,
        coStatus: statusOption === "Clean" ? "VACANT" : room.coStatus, 
        time_stamp: currentTime,
      };

      if (assignedto.startsWith("HSK")) {
        updatedRoom = { ...updatedRoom, assignedtoHSK: assignedto };
        if (onassignedtoHSK) onassignedtoHSK(assignedto);
      } else if (assignedto.startsWith("SUP")) {
        updatedRoom = { ...updatedRoom, assignedtoSUP: assignedto };
        if (onassignedtoSUP) onassignedtoSUP(assignedto);
      } else {
        console.error("Invalid assignment! Must start with 'HSK' or 'SUP'.");
        return;
      }

      try {
        await setDoc(roomRef, updatedRoom);
        console.log(`Room ${HSKroomNumber} assigned to ${assignedto} and saved to Firebase.`);

        if (onAddHSKroom) onAddHSKroom(HSKroomNumber);
        setHSKRoomNumber("");
        setAssignedto("");
      } catch (error) {
        console.error("Firebase room error", error);
      }
    } else {
      console.error("Room Number and Assignment cannot be empty.");
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4">Assign Room</h2>
        <input
          type="text"
          placeholder="Room Number"
          value={HSKroomNumber}
          onChange={(e) => setHSKRoomNumber(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Assigned To (HSK# or SUP#)"
          value={assignedto}
          onChange={(e) => setAssignedto(e.target.value)}
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
