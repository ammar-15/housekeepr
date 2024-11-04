import React from 'react';
import AdminDashboardHsk from './AdminDashboardHsk';
import AdminDashboardSup from './AdminDashboardSup';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="dashboard-container m-0 py-20">
      <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-between items-center bg-chocolate">
        <div className="navbar-left">
        </div>
        <div className="navbar-right">
          <ul>
            <li>Dashboard</li>
            <li>Housekeeper</li>
            <li>Supervisors</li>
            <li>Rooms</li>
          </ul>
        </div>
      </nav>
      <div className="dashboard-header w-full flex items-center justify-between">
        <h1>Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stats-box">
            <span>Dirty Rooms: 32</span>
          </div>
          <div className="stats-box">
            <span>Clean Rooms: 20</span>
          </div>
          <div className="stats-box">
            <span>Inspected Rooms: 15</span>
          </div>
        </div>
      </div>
      <div className="section-container">
        <h2>Housekeepers</h2>
        <div className="housekeepers-container">
          {[...Array(6)].map((_, index) => (
            <AdminDashboardHsk key={index} />
          ))}
        </div>
      </div>
      <div className="section-container">
        <h2>Supervisors</h2>
        <div className="supervisors-container">
          {[...Array(4)].map((_, index) => (
            <AdminDashboardSup key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
