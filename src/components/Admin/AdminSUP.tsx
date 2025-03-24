import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import SortButton from "../SortButton.tsx";
import RoomHeader from "./RoomHeader.tsx";

const AdminSUP = () => {
  const [SUProoms, setSUProoms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({
    "Total Supervisors": 0,
    "Total Rooms to Inspect": 0,
  });


  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const cleanRooms = allRooms.filter(
        (room) => room.roomStatus === "Clean" || room.coStatus === "INSPECTED"
      );
      const maxSupervisor = cleanRooms.reduce((max, room) => {
        if (room.assignedtoSUP && room.assignedtoSUP.startsWith("SUP")) {
          const num = parseInt(room.assignedtoSUP.replace("SUP", ""), 10);
          return num > max ? num : max;
        } else {
          console.log("maxSupervisor can't find a room assigned to SUP");
        }
        return max;
      }, 0);
      
      const SUPfilterrooms = allRooms.filter(
        (room) => room.roomStatus === "Clean" && room.coStatus !== "INSPECTED"
      ).length;
      
      setStats({"Total Supervisors": maxSupervisor, "Total Rooms to Inspect": SUPfilterrooms});
      setSUProoms(cleanRooms);
      setSortedRooms(cleanRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <AdminNavbar />
      <div className="dashboard-header flex flex-col md:flex-row justify-between items-center md:items-center sm:mb-6 gap-4">
        <h1 className="text-3xl sm:text-3xl text-wine">Supervisors</h1>
        <StatsHeader stats={stats} />
      </div>
      <SortButton rooms={SUProoms} onSortedRooms={setSortedRooms} />
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container grid grid-cols-2 sm:grid-cols-1 sm:gap-0 gap-x-4 gap-y-5 w-full">
      {SUProoms.length > 0 ? (
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

export default AdminSUP;
