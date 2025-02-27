import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import Navbar from "../Navbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import SortButton from "../SortButton.tsx";

const AdminHSK = () => {
  const [HSKrooms, setHSKrooms] = useState<any[]>([]);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const dirtyRooms = allRooms.filter(
        (room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE"
      );
      setHSKrooms(dirtyRooms);
      setSortedRooms(dirtyRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <Navbar
        navItems={["Dashboard", "Housekeeper", "Supervisors", "Rooms", "Notes"]}
      />
      <div className="dashboard-header flex justify-between items-center m-0 mb-5">
        <h1 className="text-3xl text-wine">Housekeepers</h1>
        <StatsHeader pagename="AdminHSK" displayedRooms={HSKrooms} />
      </div>
      <SortButton rooms={HSKrooms} onSortedRooms={setSortedRooms} />
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
