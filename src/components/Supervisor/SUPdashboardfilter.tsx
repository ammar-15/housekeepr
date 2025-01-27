import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import SUPnavbar from "./SUPnavbar.tsx";
import HSKRoomContainer from "../Admin/HSKRoomContainer.tsx";
import SortButton from "../SortButton.tsx";

interface SUPdashboardfilterProps {
  floorNumber?: string; 
}

const SUPdashboardfilter = ({ floorNumber }: SUPdashboardfilterProps) => {
  const [filteredRooms, setFilteredRooms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const filteredFloorRooms = allRooms.filter(
        (room) => room.roomStatus === "Clean" && room.roomNumber.startsWith(floorNumber)
      );
      setFilteredRooms(filteredFloorRooms);
      setSortedRooms(filteredFloorRooms);
    });

    return () => unsubscribe();
  }, [floorNumber]);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <SUPnavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-10 mt-4">
        <h1 className="text-3xl text-wine">SUP-{floorNumber} Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Rooms Clean: {sortedRooms.length}</span>
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

export default SUPdashboardfilter;
