import React from 'react';
import AdminDashboardHsk from './AdminDashboardHsk';
import AdminDashboardSup from './AdminDashboardSup';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
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
      <div className="dashboard-header">
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
