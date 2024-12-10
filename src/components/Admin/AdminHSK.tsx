import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";

const AdminHSK = () => {
  const [HSKroomNumbers, setHSKroomNumbers] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollectionRef = collection(db, "AdminHSK");
      const snapshot = await getDocs(roomsCollectionRef);
      const fetchedRooms = snapshot.docs.map((doc) => doc.data().roomNumber);
      setHSKroomNumbers(fetchedRooms);
    };
    fetchRooms();
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const updatedRooms = snapshot.docs.map((doc) => doc.data().roomNumber);
      setHSKroomNumbers(updatedRooms);
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
          <div className="stats-box px-2">Total Rooms to Clean: 50</div>
        </div>
      </div>
      <div className="section-container">
        {HSKroomNumbers.map((roomNumber, index) => (
          <HSKRoomContainer key={index} roomNumber={roomNumber} />
        ))}
      </div>
      <AdminStart onAddHSKroom={(newRoom) => setHSKroomNumbers((prev) => [...prev, newRoom])} />
    </div>
  );
};

export default AdminHSK;