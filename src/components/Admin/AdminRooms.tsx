import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRooms = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleDashboard = () => {
    navigate("../AdminDashboard");
  };
  const handleHousekeeper = () => {
    navigate("../AdminHSK");
  };

  const handleSupervisor = () => {
    navigate("../AdminSUP");
  };

  const handleRooms = () => {
    navigate("../AdminRooms");
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-end items-center bg-chocolate text-white">
        <div className="navbar-right">
          <ul className="flex flex-column gap-5 m-0">
            <button onClick={handleDashboard}>Dashboard</button>
            <button onClick={handleHousekeeper}>Housekeeper</button>
            <button onClick={handleSupervisor}>Supervisors</button>
            <button onClick={handleRooms}>Rooms</button>
          </ul>
        </div>
      </nav>
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
