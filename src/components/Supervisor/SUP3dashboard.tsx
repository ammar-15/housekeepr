import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP3dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <SUPNavbar assignedtoSUP="SUP3" />
      <SUPdashboardfilter assignedtoSUP="SUP3" />
    </div>
  );
};

export default SUP3dashboard;
