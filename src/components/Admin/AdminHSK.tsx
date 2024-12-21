import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";

const AdminHSK = () => {
  const [HSKrooms, setHSKrooms] = useState<any[]>([]);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const dirtyRooms = allRooms.filter((room) => room.roomStatus === "Dirty"); 
      setHSKrooms(dirtyRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <AdminNavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Housekeepers</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">Total Housekeepers: 12</div>
          <div className="stats-box px-2">Total Rooms to Clean: {HSKrooms.length}</div>
        </div>
      </div>
      <div className="section-container">
        {HSKrooms.map((room, index) => (
          <HSKRoomContainer key={index} room={room} />
        ))}
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminHSK;
