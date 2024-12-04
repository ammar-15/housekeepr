import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./AdminStart.tsx";

const AdminHSK = () => {
  const navigate = useNavigate();
  const [roomContainers, setRoomContainers] = useState<number[]>([]);
  const addRoomContainer = () => {
    setRoomContainers((prev) => [...prev, prev.length]);
  };
  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <div className="AdminSUPNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Housekeepers</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Housekeepers: 12</span>
          </div>
          <div className="stats-box px-2">
            <span>Total Rooms to Clean: 50</span>
          </div>
        </div>
      </div>
      <div className="section-container">
        <button
          className="bg-blue-500 text-black px-4 py-2 rounded-md mb-4"
          onClick={addRoomContainer}
        >
          Add Room Container
        </button>
        {roomContainers.map((key) => (
          <HSKRoomContainer key={key} />
        ))}
      </div>
      <AdminStart />
    </div>
  );
};
export default AdminHSK;