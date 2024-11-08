import { useState } from "react";
import AdminNavbar from "./AdminNavbar.tsx";

const AdminRooms = () => {

  const [message, setMessage] = useState('');

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <div className="SdminRoomsNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Rooms</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Rooms to Clean: 50</span>
          </div>
        </div>
      </div>
      <div className="section-container ">
        <div>
          <button onClick={() => setMessage("Hello, World!")}>Current Rooms</button>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
