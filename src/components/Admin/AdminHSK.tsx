import { useState } from "react";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";

const AdminHSK = () => {
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);

  const handleAddRoom = (newRoomNumber: string) => {
    setRoomNumbers((prev) => [...prev, newRoomNumber]);
  };

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
        {roomNumbers.map((roomNumber, index) => (
          <HSKRoomContainer key={index} roomNumber={roomNumber} />
        ))}
      </div>
      <AdminStart onAddHSKroom={handleAddRoom} />
    </div>
  );
};

export default AdminHSK;