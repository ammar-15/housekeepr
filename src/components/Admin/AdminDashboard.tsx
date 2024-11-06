import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboardHsk from "./AdminDashboardHsk";
import AdminDashboardSup from "./AdminDashboardSup";


const AdminDashboard = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl text-wine">Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Dirty Rooms: 32</span>
          </div>
          <div className="stats-box px-2">
            <span>Clean Rooms: 20</span>
          </div>
          <div className="stats-box px-2">
            <span>Inspected Rooms: 15</span>
          </div>
        </div>
      </div>
      <div className="section-container ">
        <h2 className="housekeeperheader-admin text-lg pb-5">Housekeepers</h2>
        <div className="housekeepers-container flex pb-5">
          {[...Array(6)].map((_, index) => (
            <AdminDashboardHsk key={index} />
          ))}
        </div>
      </div>
      <div className="section-container">
        <h2 className="supervisorheader-admin text-tg pb-5">Supervisors</h2>
        <div className="supervisors-container flex pb-5">
          {[...Array(4)].map((_, index) => (
            <AdminDashboardSup key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
