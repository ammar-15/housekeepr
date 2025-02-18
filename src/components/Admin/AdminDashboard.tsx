import { useState } from "react";
import AdminDashboardHsk from "./AdminDashboardHsk";
import AdminDashboardSup from "./AdminDashboardSup";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart.tsx";
import StatsHeader from "../StatsHeader.tsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    dirtyRooms: 0,
    cleanRooms: 0,
    inspectedRooms: 0,
  });



  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
       <StatsHeader onStatsUpdate={setStats} />
      <div className="AdminNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Dirty Rooms: {stats.dirtyRooms}</span>
          </div>
          <div className="stats-box px-2">
            <span>Clean Rooms: {stats.cleanRooms}</span>
          </div>
          <div className="stats-box px-2">
            <span>Inspected Rooms: {stats.inspectedRooms}</span>
          </div>
        </div>
      </div>
      <div className="section-container ">
        <h2 className="housekeeperheader-admin text-lg pb-5">Housekeepers</h2>
        <div className="housekeepers-container flex pb-5">
          <AdminDashboardHsk />
        </div>
      </div>
      <div className="section-container">
        <h2 className="supervisorheader-admin text-lg pb-5">Supervisors</h2>
        <div className="supervisors-container flex pb-5">
          <AdminDashboardSup />
        </div>
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminDashboard;
