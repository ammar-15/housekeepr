import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP2dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <SUPNavbar assignedtoSUP="SUP2" />
      <SUPdashboardfilter assignedtoSUP="SUP2" />
    </div>
  );
};

export default SUP2dashboard;
