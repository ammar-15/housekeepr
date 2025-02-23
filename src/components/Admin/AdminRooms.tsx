import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import AdminNavbar from "./AdminNavbar.tsx";
import HSKRoomContainer from "./HSKRoomContainer.tsx";
import ClearRooms from "./ClearRooms.tsx";
import TrashIcon from "../assets/trashicon.svg";
import StatsHeader from "../StatsHeader.tsx";

const AdminRooms = () => {
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [stats, setStats] = useState({
    totalRooms: 0,
  });

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
       <StatsHeader onStatsUpdate={setStats} />

      <div className="AdminRoomsNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Rooms</h1>
        <div className="flex gap-1">
          <button
            className="ml-3 hover:bg-lightred p-2 rounded"
            onClick={() => setShowClearModal(true)}
          >
            <img src={TrashIcon} alt="Clear Rooms" className="w-5 h-5" />
          </button>
          <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
            <div className="stats-box px-2">
              <span>Total Rooms: {stats.totalRooms}</span>
            </div>
          </div>
        </div>
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
