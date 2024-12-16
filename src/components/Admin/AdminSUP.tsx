import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";

const AdminSUP = () => {
  const [SUProoms, setSUProoms] = useState<any[]>([]);

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const cleanRooms = allRooms.filter((room) => room.roomStatus === "Clean"); 
      setSUProoms(cleanRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <AdminNavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Supervisors</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">Total Supervisors: 12</div>
          <div className="stats-box px-2">Total Rooms to Inspect: {SUProoms.length}</div>
        </div>
      </div>
      <div className="section-container">
        {SUProoms.map((room, index) => (
          <HSKRoomContainer key={index} room={room} />
        ))}
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminSUP;
