import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

interface SupervisorData {
  assignedto: string;
  roomNumber: string;
  roomType: string;
  roomStatus: string;
  time_stamp: string;
}

const AdminDashboardSup = () => {
  const [supervisorRooms, setSupervisorRooms] = useState<{
    [key: string]: { previousRoom?: SupervisorData; currentRoom?: SupervisorData };
  }>({});

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");

    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        time_stamp: doc.data().time_stamp || "",
      })) as SupervisorData[];

      const updatedSupervisorRooms: {
        [key: string]: { previousRoom?: SupervisorData; currentRoom?: SupervisorData };
      } = { ...supervisorRooms };

      roomsData.forEach((room) => {
        if (!room.assignedto) return;

        if (!updatedSupervisorRooms[room.assignedto]) {
          updatedSupervisorRooms[room.assignedto] = {};
        }

        const supData = updatedSupervisorRooms[room.assignedto];

        if (room.roomStatus === "Clean") {
          if (supData.currentRoom) {
            updatedSupervisorRooms[room.assignedto].previousRoom = supData.currentRoom;
          }
          updatedSupervisorRooms[room.assignedto].currentRoom = room;
        }
      });

      setSupervisorRooms(updatedSupervisorRooms);
    });

    return () => unsubscribe();
  }, []);

  const sortedKeys = Object.keys(supervisorRooms).sort((a, b) => {
    const numA = parseInt(a.replace("HSK", ""), 10);
    const numB = parseInt(b.replace("HSK", ""), 10);
    return numA - numB;
  });

  return (
    <div className="admin-dashboard-sup flex flex-wrap gap-4">
      {sortedKeys.map((supKey) => {
        const { previousRoom, currentRoom } = supervisorRooms[supKey];

        return (
          <div key={supKey} className="sup-container p-4 bg-white rounded-md shadow-md w-40">
            <h2 className="text-lg font-bold text-center">{supKey}</h2>
            <div className="sup-details text-center">
              <p className="text-sm">Previous Room</p>
              {previousRoom ? (
                <p className="font-semibold">
                  {previousRoom.roomNumber} - {previousRoom.roomType}
                </p>
              ) : (
                <p className="text-dustyblue">None</p>
              )}
              <p className="text-sm mt-3">Current Room</p>
              {currentRoom ? (
                <p className="font-semibold">
                  {currentRoom.roomNumber} - {currentRoom.roomType}
                </p>
              ) : (
                <p className="text-dustyblue">None</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboardSup;
