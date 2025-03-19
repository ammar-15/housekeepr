interface StatsData {
  totalHousekeepers?: number;
  totalSupervisors?: number;
  totalRoomsToClean?: number;
  totalRoomsToInspect?: number;
  totalRooms?: number;
  dirtyRooms?: number;
  cleanRooms?: number;
  inspectedRooms?: number;
}

interface StatsHeaderProps {
  pagename: string;
  stats: StatsData;
}

const StatsHeader = ({ pagename, stats }: StatsHeaderProps) => {
  const adminDashboardStats = (
    <div className="stats-dashoard flex bg-clay text-white rounded-md px-3 py-1.5">
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
  );

  const adminHSKStats = (
    <div className="stats-HSK flex bg-clay text-white rounded-md px-3 py-1.5">
      <div className="stats-box px-2">
        <span>Total Housekeepers: {stats.totalHousekeepers}</span>
      </div>
      <div className="stats-box px-2">
        <span>Total Rooms to Clean: {stats.totalRoomsToClean}</span>
      </div>
    </div>
  );

  const adminSUPStats = (
    <div className="stats-HSK flex bg-clay text-white rounded-md px-3 py-1.5">
      <div className="stats-box px-2">
        <span>Total Supervisors: {stats.totalSupervisors}</span>
      </div>
      <div className="stats-box px-2">
        <span>Total Rooms to Inspect: {stats.totalRoomsToInspect}</span>
      </div>
    </div>
  );

  const adminRoomsStats = (
    <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
      <span>Total Rooms: {stats.totalRooms}</span>
    </div>
  );

  const hskFilterStats = (
    <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
      <span>Total Rooms to Clean: {stats.totalRoomsToClean}</span>
    </div>
  );

  const supFilterStats = (
    <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
      <span>Total Rooms to Inspect: {stats.totalRoomsToInspect}</span>
    </div>
  );

return (
  <div className="dashboard-stats">
      {pagename === "AdminDashboard" && adminDashboardStats}
      {pagename === "AdminHSK" && adminHSKStats}
      {pagename === "AdminSUP" && adminSUPStats}
      {pagename === "AdminRooms" && adminRoomsStats}
      {pagename === "HSKfilter" && hskFilterStats}
      {pagename === "SUPfilter" && supFilterStats}
    </div>
)

};

export default StatsHeader;
