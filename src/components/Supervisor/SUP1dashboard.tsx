import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP1dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <SUPNavbar assignedtoSUP="SUP1" />
      <SUPdashboardfilter assignedtoSUP="SUP1" />
    </div>
  );
};

export default SUP1dashboard;
