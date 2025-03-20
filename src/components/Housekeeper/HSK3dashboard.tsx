import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK3dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <HSKNavbar assignedtoHSK="HSK3" />
      <HSKdashboardfilter assignedtoHSK="HSK3" />
    </div>
  );
};

export default HSK3dashboard;