
import HSKnavbar from "./HSKnavbar.tsx"

const HSKdashboard = () => {

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <HSKnavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-10 mt-4">
        <h1 className="text-3xl text-wine">HSK Dashboard</h1>
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
        
      </div>
    </div>
  );
};

export default HSKdashboard;
