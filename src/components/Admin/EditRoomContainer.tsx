import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

interface EditRoomContainerProps {
  roomNumber: string;
  initialRoomStatus: string;
  initialCoStatus: string;
  assignedtoHSK: string;
  assignedtoSUP: string;
  onClose: () => void;
}

const EditRoomContainer = ({
  roomNumber,
  initialRoomStatus,
  initialCoStatus,
  assignedtoHSK,
  assignedtoSUP,
  onClose,
}: EditRoomContainerProps) => {
  const [newRoomStatus, setNewRoomStatus] = useState(initialRoomStatus);
  const [newCoStatus, setNewCoStatus] = useState(initialCoStatus);
  const [newAssignedto, setNewAssignedto] = useState(""); 

  const handleStatusChange = async () => {
    try {
      let updatedCoStatus = newCoStatus;
      const roomRef = doc(db, "AdminHSK", roomNumber);
      
      let updatedassignedtoHSK = assignedtoHSK;
      let updatedassignedtoSUP = assignedtoSUP;
      
      if (newAssignedto.trim() !== "") {
        if (newAssignedto.startsWith("HSK")) {
          updatedassignedtoHSK = newAssignedto;
        } else if (newAssignedto.startsWith("SUP")) {
          updatedassignedtoSUP = newAssignedto;
        } else {
          console.error("Invalid. Please enter assignment correctly");
          return;
        }
      }

      await updateDoc(roomRef, {
        roomStatus: newRoomStatus,
        assignedtoHSK: updatedassignedtoHSK,
        assignedtoSUP: updatedassignedtoSUP,
        coStatus: updatedCoStatus,
      });
      console.log(
        `Room ${roomNumber} updated to Status: ${newRoomStatus}, CO: ${updatedCoStatus}, Assigned to: ${newAssignedto}`
      );

      setNewAssignedto("");
      onClose();
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-35%">
        <h2 className="text-xl mb-4">Update Room {roomNumber}</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="block text-sm font-medium">Room Status</label>
            <select
              value={newRoomStatus}
              onChange={(e) => {
                const selectedStatus = e.target.value;
                setNewRoomStatus(selectedStatus);
                if (selectedStatus === "Clean" && newCoStatus !== "STAYOVER") {
                  setNewCoStatus("VACANT");
                } else if (
                  selectedStatus === "ON CHANGE" &&
                  newCoStatus !== "STAYOVER"
                ) {
                  setNewCoStatus("VACANT");
                }
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="Clean">Clean</option>
              <option value="ON CHANGE">ON CHANGE</option>
              <option value="Dirty">Dirty</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Check Out Status</label>
            <select
              value={newCoStatus}
              onChange={(e) => setNewCoStatus(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="DUE">DUE</option>
              <option value="OUT">OUT</option>
              <option value="VACANT">VACANT</option>
              <option value="INSPECTED">INSPECTED</option>
              <option value="STAYOVER">STAYOVER</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Assign To</label>
            <input
              type="text"
              placeholder="HSK# or SUP#"
              value={newAssignedto}
              onChange={(e) => setNewAssignedto(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-black px-4 py-2 rounded-md hover:bg-dustyblue mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusChange}
            className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoomContainer;
