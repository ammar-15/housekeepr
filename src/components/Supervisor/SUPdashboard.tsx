import { useState } from "react";
import HSKRoomContainer from "../Admin/HSKRoomContainer.tsx";
import SUPnavbar from "./SUPnavbar.tsx";

const SUPdashboard = () => {
  const [roomContainers, setRoomContainers] = useState<number[]>([]);

  const addRoomContainer = () => {
    setRoomContainers((prev) => [...prev, prev.length]);
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <SUPnavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-10 mt-4">
        <h1 className="text-3xl text-wine">SUP Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Supervisors: 12</span>
          </div>
          <div className="stats-box px-2">
            <span>Total Rooms to Inspect: 50</span>
          </div>
        </div>
      </div>
      <div className="section-container">
        <button
          className="text-black"
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

export default SUPdashboard;
