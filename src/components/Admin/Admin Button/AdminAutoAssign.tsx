import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";
import RoomData from "../../RoomData"; 

interface AdminAutoAssignProps {
  onClose?: () => void;
}

const AdminAutoAssign = ({ onClose }: AdminAutoAssignProps) => {
  const [checkOutRoomNumbers, setCheckOutRoomNumbers] = useState(""); 
  const [stayOverRoomNumbers, setStayOverRoomNumbers] = useState(""); 
  const [housekeepers, setHousekeepers] = useState<number>(1); 

  const handleClose = () => {
    if (onClose) {
      onClose();
      console.log("autassign closed");
    }
  };

  const handleAutoAssign = (rooms: string, coStatus: string) => {
    if (!rooms.trim()) {
      console.error("No room numbers provided.");
      return;
    }
    const roomList = rooms.split(",").map((room) => room.trim());
    const totalRooms = roomList.length;
    const assignedRooms = Math.floor(totalRooms / housekeepers);
    const remainder = totalRooms % housekeepers;

    let currentHousekeeper = 1;
    let assignedCount = 0;

    const currentTime = new Date();
    const formattedTime = currentTime.toISOString();

    roomList.forEach((roomNumber) => {
      const room = RoomData.find((r) => r.roomNumber === roomNumber);
      if (!room) {
        console.error(`Room ${roomNumber} not found in RoomData.`);
        return;
      }
      const assignedto = `HSK${currentHousekeeper}`;
      const updatedRoom = { ...room, assignedto, roomStatus: "Dirty", coStatus, time_stamp: formattedTime };
      const roomRef = doc(db, "AdminHSK", roomNumber);

      getDoc(roomRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            return setDoc(roomRef, updatedRoom, { merge: true });
          } else {
            return setDoc(roomRef, updatedRoom);
          }
        })
        .then(() => {
          console.log(`Room ${roomNumber} assigned to ${assignedto} at ${formattedTime}`);
          assignedCount++;
          if (assignedCount === assignedRooms + (currentHousekeeper <= remainder ? 1 : 0)) {
            currentHousekeeper++;
            assignedCount = 0;
          }
        })
        .catch((error) => {
          console.error(`Error assigning room ${roomNumber}:`, error);
        });
    });
  };

  const handleSubmit = () => {
    handleAutoAssign(checkOutRoomNumbers, "DUE");
    handleAutoAssign(stayOverRoomNumbers, "STAYOVER");

    setCheckOutRoomNumbers("");
    setStayOverRoomNumbers("");
    setHousekeepers(1);
    console.log("Auto assign completed.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-30%">
        <h2 className="text-xl mb-4">Auto Assign Rooms</h2>
        <div className="makethis2 flex space-x-4">
                    <div className="w-50%">
            <h3 className="text-md mb-2">Check-Out Rooms</h3>
            <input
              type="text"
              placeholder="(Comma separated)"
              value={checkOutRoomNumbers}
              onChange={(e) => setCheckOutRoomNumbers(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md"
            />
          </div>
          <div className="w-50%">
            <h3 className="text-md mb-2">Stayover Rooms</h3>
            <input
              type="text"
              placeholder="(Comma separated)"
              value={stayOverRoomNumbers}
              onChange={(e) => setStayOverRoomNumbers(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-md mb-2">Number of Housekeepers</h3>
          <input
            type="number"
            placeholder="Enter number of housekeepers"
            value={housekeepers}
            onChange={(e) => setHousekeepers(Number(e.target.value))}
            className="w-full mb-3 p-2 border rounded-md"
            min={1}
          />
        </div>

        <div className="flex justify-end">
          <button onClick={handleClose} className="text-black bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine">
            Auto Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAutoAssign;
