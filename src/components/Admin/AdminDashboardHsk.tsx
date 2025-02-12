import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

interface HousekeeperData {
  assignedto: string;
  roomNumber: string;
  roomType: string;
  roomStatus: string;
  time_stamp: string;
}

const AdminDashboardHsk = () => {
  const [housekeeperRooms, setHousekeeperRooms] = useState<{ 
    [key: string]: { previousRoom?: HousekeeperData; currentRoom?: HousekeeperData };
  }>({});

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");

    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        time_stamp: doc.data().time_stamp || "",
      })) as HousekeeperData[];

      const updatedHousekeeperRooms: {
        [key: string]: { previousRoom?: HousekeeperData; currentRoom?: HousekeeperData };
      } = { ...housekeeperRooms };

      roomsData.forEach((room) => {
        if (!room.assignedto) return;

        if (!updatedHousekeeperRooms[room.assignedto]) {
          updatedHousekeeperRooms[room.assignedto] = {};
        }

        const hskData = updatedHousekeeperRooms[room.assignedto];

        if (room.roomStatus === "ON CHANGE") {
          updatedHousekeeperRooms[room.assignedto].currentRoom = room;
        } 
        else if (room.roomStatus === "Clean") {
          if (hskData.currentRoom) {
            updatedHousekeeperRooms[room.assignedto].previousRoom = hskData.currentRoom;
          }
          updatedHousekeeperRooms[room.assignedto].previousRoom = room; 
        }
        
      });

      setHousekeeperRooms(updatedHousekeeperRooms);
    });

    return () => unsubscribe();
  }, []);

  const sortedKeys = Object.keys(housekeeperRooms).sort((a, b) => {
    const numA = parseInt(a.replace("HSK", ""), 10);
    const numB = parseInt(b.replace("HSK", ""), 10);
    return numA - numB;
  });

  return (
    <div className="admin-dashboard-hsk flex flex-wrap gap-4">
      {sortedKeys.map((hskKey) => {
        const { previousRoom, currentRoom } = housekeeperRooms[hskKey];

        return (
          <div key={hskKey} className="hsk-container p-4 bg-white rounded-md shadow-md w-40">
            <h2 className="text-lg font-bold text-center">{hskKey}</h2>
            <div className="hsk-details text-center">
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

export default AdminDashboardHsk;
