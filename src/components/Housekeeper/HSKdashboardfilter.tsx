import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKnavbar from "./HSKnavbar.tsx";
import HSKRoomContainer from "../Admin/HSKRoomContainer.tsx";
import SortButton from "../SortButton.tsx";

interface HSKdashboardfilterProps {
  assignedto: string;
}

const HSKdashboardfilter = ({ assignedto }: HSKdashboardfilterProps) => {
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());

      const assignedRooms = allRooms.filter(
        (room) => (room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE") && room.assignedto === assignedto
      );

      setFilteredRooms(assignedRooms);
      setSortedRooms(assignedRooms);
    });

    return () => unsubscribe();
  }, [assignedto]);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <HSKnavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-5">
        <h1 className="text-3xl text-wine">{assignedto}-Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Rooms to Clean: {sortedRooms.length}</span>
          </div>
        </div>
      </div>

      <SortButton rooms={filteredRooms} onSortedRooms={setSortedRooms} />

      <div className="section-container">
        {sortedRooms.map((room, index) => (
          <HSKRoomContainer key={index} room={room} />
        ))}
      </div>
    </div>
  );
};

export default HSKdashboardfilter;
