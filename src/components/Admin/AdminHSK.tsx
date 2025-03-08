import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import SortButton from "../SortButton.tsx";
import RoomHeader from "./RoomHeader.tsx";

const AdminHSK = () => {
  const [HSKrooms, setHSKrooms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalHousekeepers: 0,
    totalRoomsToClean: 0,
  });

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const dirtyRooms = allRooms.filter(
        (room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE"
      );
      const maxHousekeeper = dirtyRooms.reduce((max, room) => {
        if (room.assignedtoHSK && room.assignedtoHSK.startsWith("HSK")) {
          const num = parseInt(room.assignedtoHSK.replace("HSK", ""), 10);
          return num > max ? num : max;
        } else {
          console.log("maxHousekeeper can't find a room assigned to HSK");
        }
        return max;
      }, 0);
      const HSKfilterrooms = allRooms.filter(
        ((room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE")
      ).length;

      const updatedStats = {
        totalHousekeepers: maxHousekeeper,
        totalRoomsToClean: HSKfilterrooms,
      };

      setStats(updatedStats);
      setHSKrooms(dirtyRooms);
      setSortedRooms(dirtyRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <AdminNavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-4">
        <h1 className="text-3xl text-wine">Housekeepers</h1>
        <StatsHeader pagename="AdminHSK" stats={stats} />
      </div>
      <SortButton rooms={HSKrooms} onSortedRooms={setSortedRooms} />
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container">
        {HSKrooms.length > 0 ? (
          sortedRooms.map((room, index) => (
            <HSKRoomContainer key={index} room={room} />
          ))
        ) : (
          <div className="text-center text-gray text-lg mt-10 animate-bounce">
            No rooms
          </div>
        )}
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminHSK;
