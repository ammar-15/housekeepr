import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP2dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <SUPNavbar assignedtoSUP="SUP2" />
      <SUPdashboardfilter assignedtoSUP="SUP2" />
    </div>
  );
};

export default SUP2dashboard;
