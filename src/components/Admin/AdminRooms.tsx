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
    totalRooms: 0,
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
        totalRooms,
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
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <div className="AdminRoomsNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex flex-col md:flex-row justify-between items-center md:items-center sm:mb-6 gap-2">
        <h1 className="text-3xl sm:text-3xl text-wine">Rooms</h1>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-1 items-start sm:items-center">
          <div className="flex items-center justify-center w-full sm:w-auto order-2 sm:order-1">
            <div className="flex">
              <button
                className="hover:bg-lightgreen p-2 rounded"
                onClick={handlePrint}
              >
                <img src={PrintIcon} alt="Print Rooms" className="w-5 h-5" />
              </button>
              <button
                className="hover:bg-lightred p-2 rounded"
                onClick={() => setShowClearModal(true)}
              >
                <img src={MoonIcon} alt="Clear Rooms" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="order-1 sm:order-2 w-full sm:w-auto">
            <StatsHeader pagename="AdminRooms" stats={stats} />
          </div>
        </div>
      </div>
      <SortButton rooms={allRooms} onSortedRooms={setSortedRooms} />
      <div className="room-header">
        <RoomHeader />
      </div>
      <div className="section-container grid grid-cols-2 sm:grid-cols-1 sm:gap-0 gap-x-4 gap-y-5 w-full">
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
