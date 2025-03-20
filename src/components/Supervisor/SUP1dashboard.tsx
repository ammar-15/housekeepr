import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP1dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <SUPNavbar assignedtoSUP="SUP1" />
      <SUPdashboardfilter assignedtoSUP="SUP1" />
    </div>
  );
};

export default SUP1dashboard;
