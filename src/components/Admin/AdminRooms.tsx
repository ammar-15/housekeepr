import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import AdminNavbar from "./AdminNavbar.tsx";
import HSKRoomContainer from "./HSKRoomContainer.tsx";
import ClearRooms from "./ClearRooms.tsx";
import MoonIcon from "../assets/moon.svg";
import StatsHeader from "../StatsHeader.tsx";
import RoomHeader from "./RoomHeader.tsx";
import PrintIcon from "../assets/print.svg";
import SortButton from "../SortButton.tsx";

const AdminRooms = () => {
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [sortedRooms, setSortedRooms] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRooms: 0
  });

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const totalRooms = roomsData.length;
      const updatedStats = {
        totalRooms
      };

      setStats(updatedStats);
      setAllRooms(roomsData);
      setSortedRooms(roomsData);
    });
    return () => unsubscribe();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <div className="AdminRoomsNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-4">
        <h1 className="text-3xl text-wine">Rooms</h1>
        <div className="flex gap-1">
          <button
            className="ml-3 hover:bg-lightgreen p-2 rounded"
            onClick={handlePrint}
          >
            <img src={PrintIcon} alt="Clear Rooms" className="w-5 h-5" />
          </button>
          <button
            className=" hover:bg-lightred p-2 rounded"
            onClick={() => setShowClearModal(true)}
          >
            <img src={MoonIcon} alt="Clear Rooms" className="w-5 h-5" />
          </button>
          <StatsHeader pagename="AdminRooms" stats={stats} />
        </div>
      </div>
      <SortButton rooms={allRooms} onSortedRooms={setSortedRooms} />
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container">
        {allRooms.length > 0 ? (
          sortedRooms.map((room, index) => (
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
