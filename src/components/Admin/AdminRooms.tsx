import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Navbar from "../Navbar.tsx";
import HSKRoomContainer from "./HSKRoomContainer.tsx";
import ClearRooms from "./ClearRooms.tsx";
import MoonIcon from "../assets/moon.svg";
import StatsHeader from "../StatsHeader.tsx";
import RoomHeader from "./RoomHeader.tsx";

const AdminRooms = () => {
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllRooms(roomsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <div className="AdminRoomsNav">
        <Navbar
          navItems={[
            "Dashboard",
            "Housekeeper",
            "Supervisors",
            "Rooms",
            "Notes",
          ]}
        />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Rooms</h1>
        <div className="flex gap-1">
          <button
            className="ml-3 hover:bg-lightred p-2 rounded"
            onClick={() => setShowClearModal(true)}
          >
            <img src={MoonIcon} alt="Clear Rooms" className="w-5 h-5" />
          </button>
          <StatsHeader pagename="AdminRooms" />
        </div>
      </div>
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container">
        {allRooms.length > 0 ? (
          allRooms.map((room, index) => (
            <HSKRoomContainer key={index} room={room} />
          ))
        ) : (
          <p className="text-center">No rooms available.</p>
        )}
      </div>
      {showClearModal && (
        <ClearRooms onClose={() => setShowClearModal(false)} />
      )}
    </div>
  );
};

export default AdminRooms;
