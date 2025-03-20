import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "../Admin/HSKRoomContainer.tsx";
import SortButton from "../SortButton.tsx";
import StatsHeader from "../StatsHeader.tsx";
import RoomHeader from "../Admin/RoomHeader.tsx";

interface HSKdashboardfilterProps {
  assignedtoHSK: string;
}

const HSKdashboardfilter = ({ assignedtoHSK }: HSKdashboardfilterProps) => {
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRoomsToClean: 0,
  });


  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());

      const assignedRooms = allRooms.filter(
        (room) =>
          (room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE") &&
          room.assignedtoHSK === assignedtoHSK
      );
      const HSKfilterrooms = assignedRooms.filter(
        ((room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE")
      ).length;

      const updatedStats = {
        totalRoomsToClean: HSKfilterrooms,
      };
      
      setStats(updatedStats);
      setFilteredRooms(assignedRooms);
      setSortedRooms(assignedRooms);
    });

    return () => unsubscribe();
  }, [assignedtoHSK]);

  return (
    <>
      <div className="dashboard-header flex flex-col md:flex-row justify-between items-center md:items-center sm:mb-6 gap-4">
      <h1 className="text-3xl sm:text-3xl text-wine">{assignedtoHSK}-Dashboard</h1>
      <StatsHeader pagename="HSKfilter" stats={stats} />
    </div>
    <SortButton rooms={filteredRooms} onSortedRooms={setSortedRooms} />
    <div className="room-header">
      <RoomHeader />
    </div>
    <div className="section-container grid grid-cols-2 sm:grid-cols-1 sm:gap-0 gap-x-4 gap-y-5 w-full">
    {sortedRooms.length > 0 ? (
        sortedRooms.map((room, index) => (
          <HSKRoomContainer key={index} room={room} />
        ))
      ) : (
        <div className="text-center text-gray text-lg mt-10 animate-bounce">
          No rooms
        </div>
      )}
    </div>
  </>
  );
};

export default HSKdashboardfilter;
