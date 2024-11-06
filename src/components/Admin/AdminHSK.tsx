import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HSKRoomContainer from "./HSKRoomContainer";

const AdminHSK = () => {
  const navigate = useNavigate();
  const [roomContainers, setRoomContainers] = useState<number[]>([]);

  const addRoomContainer = () => {
    setRoomContainers((prev) => [...prev, prev.length]);
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-end items-center bg-chocolate text-white">
        <div className="navbar-right">
          <ul className="flex flex-column gap-5 m-0">
            <button onClick={() => navigate("../AdminDashboard")}>
              Dashboard
            </button>
            <button onClick={() => navigate("../AdminHSK")}>Housekeeper</button>
            <button onClick={() => navigate("../AdminSUP")}>Supervisors</button>
            <button onClick={() => navigate("../AdminRooms")}>Rooms</button>
          </ul>
        </div>
      </nav>
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
    </div>
  );
};

export default AdminHSK;
