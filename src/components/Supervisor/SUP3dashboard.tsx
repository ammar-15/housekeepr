import SUPdashboardfilter from "./SUPdashboardfilter";
import SUPNavbar from "./SUPNavbar";

const SUP3dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <SUPNavbar assignedtoSUP="SUP3" />
      <SUPdashboardfilter assignedtoSUP="SUP3" />
    </div>
  );
};

export default SUP3dashboard;
