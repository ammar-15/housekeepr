import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";
import AdminSUPassign from "./Admin Button/AdminSUPassign";
import HSKRoomContainer from "./HSKRoomContainer";

const AdminSUP = () => {
  const [SUProomNumbers, setSUProomNumbers] = useState<string[]>([]);

  const handleAddSUProom = (newSUProomNumber: string) => {
    setSUProomNumbers((prev) => [...prev, newSUProomNumber]);
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <div className="AdminSUPNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Supervisors</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Supervisors: 3</span>
          </div>
          <div className="stats-box px-2">
            <span>Total Rooms to Inspect: 50</span>
          </div>
        </div>
      </div>
      <div className="section-container">
        {SUProomNumbers.map((roomNumber, index) => (
          <HSKRoomContainer key={index} roomNumber={roomNumber} />
        ))}
      </div>
      <AdminStart
        onAddSUProom={handleAddSUProom}
      />
    </div>
  );
};

export default AdminSUP;