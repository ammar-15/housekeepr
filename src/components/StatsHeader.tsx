import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface StatsData {
  totalHousekeepers: number;
  totalSupervisors: number;
  totalRoomsToClean: number;
  totalRoomsToInspect: number;
  totalRooms: number;
  dirtyRooms: number;
  cleanRooms: number;
  inspectedRooms: number;
}

interface StatsHeaderProps {
  onStatsUpdate: (stats: StatsData) => void; 
}

const StatsHeader = ({ onStatsUpdate }: StatsHeaderProps) => {
  const setStats = useState<StatsData>({
    totalHousekeepers: 0,
    totalSupervisors: 3, //change later
    totalRoomsToClean: 0,
    totalRoomsToInspect: 0,
    totalRooms: 0,
    dirtyRooms: 0,
    cleanRooms: 0,
    inspectedRooms: 0,
  })[1];

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");

    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => doc.data());

      const maxHousekeeper = roomsData.reduce((max, room) => {
        if (room.assignedto && room.assignedto.startsWith("HSK")) {
          const num = parseInt(room.assignedto.replace("HSK", ""), 10);
          return num > max ? num : max;
        }
        return max;
      }, 0);

      const totalRooms = roomsData.length;
      const dirtyRooms = roomsData.filter((room) => room.roomStatus === "Dirty").length;
      const cleanRooms = roomsData.filter(
        (room) => room.roomStatus === "Clean" && room.coStatus !== "INSPECTED"
      ).length;
      const inspectedRooms = roomsData.filter((room) => room.coStatus === "INSPECTED").length;
      const totalRoomsToClean = dirtyRooms;
      const totalRoomsToInspect = cleanRooms;

      const updatedStats = {
        totalHousekeepers: maxHousekeeper,
        totalSupervisors: 3, //change later
        totalRoomsToClean,
        totalRoomsToInspect,
        totalRooms,
        dirtyRooms,
        cleanRooms,
        inspectedRooms,
      };

      setStats(updatedStats);
      onStatsUpdate(updatedStats);
    });

    return () => unsubscribe();
  }, [onStatsUpdate]);

  return null;
};

export default StatsHeader;
 
