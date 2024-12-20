import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";
import RoomData from "../../RoomData"; 
const AdminAutoAssign = () => {
  const [roomNumbers, setRoomNumbers] = useState(""); 
  const [housekeepers, setHousekeepers] = useState<number>(1); 

  const handleAutoAssign = async () => {
    if (!roomNumbers.trim()) {
      console.error("No room numbers provided.");
      return;
    }

    const roomList = roomNumbers.split(",").map((room) => room.trim());
    const totalRooms = roomList.length;
    const assignedRooms = Math.floor(totalRooms / housekeepers);
    const remainder = totalRooms % housekeepers;

    let currentHousekeeper = 1;
    let assignedCount = 0;
//try promise for this
    for (let i = 0; i < roomList.length; i++) {
      const roomNumber = roomList[i];
      const room = RoomData.find((r) => r.roomNumber === roomNumber);

      if (!room) {
        console.error(`Room ${roomNumber} not found in RoomData.`);
        continue;
      }
      const assignedto = `HSK${currentHousekeeper}`;
      const updatedRoom = { ...room, assignedto, roomStatus: "Dirty" };

      try {
        const roomRef = doc(db, "AdminHSK", roomNumber);
        const docSnapshot = await getDoc(roomRef);

        if (docSnapshot.exists()) {
          await setDoc(roomRef, updatedRoom, { merge: true });
        } else {
          await setDoc(roomRef, updatedRoom);
        }
        console.log(`Room ${roomNumber} assigned to ${assignedto}`);
        assignedCount++;
        if (
          assignedCount === assignedRooms + (currentHousekeeper <= remainder ? 1 : 0)
        ) {
          currentHousekeeper++;
          assignedCount = 0;
        }
      } catch (error) {
        console.error(`Error assigning room ${roomNumber}:`, error);
      }
    }

    setRoomNumbers("");
    setHousekeepers(1);
    console.log("Auto assign doneeeeeeee.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4">Auto Assign Rooms</h2>
        <input
          type="text"
          placeholder="Enter room numbers (separated with commas)"
          value={roomNumbers}
          onChange={(e) => setRoomNumbers(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Enter number of housekeepers"
          value={housekeepers}
          onChange={(e) => setHousekeepers(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded-md"
          min={1}
        />
        <div className="flex justify-end">
          <button
            onClick={handleAutoAssign}
            className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
          >
            Auto Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAutoAssign;
