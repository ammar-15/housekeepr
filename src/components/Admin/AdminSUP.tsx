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
  const [stats, setStats] = useState({
    totalSupervisors: 0,
    totalRoomsToInspect: 0,
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

      const updatedStats = {
        totalSupervisors: maxSupervisor,
        totalRoomsToInspect: SUPfilterrooms,
      };

      setStats(updatedStats);
      setSUProoms(cleanRooms);
      setSortedRooms(cleanRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <AdminNavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-4">
        <h1 className="text-3xl text-wine">Supervisors</h1>
        <StatsHeader pagename="AdminSUP" stats={stats} />
      </div>
      <SortButton rooms={SUProoms} onSortedRooms={setSortedRooms} />
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container">
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
