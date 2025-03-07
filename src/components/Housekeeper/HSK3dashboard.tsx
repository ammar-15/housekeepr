import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK3dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <HSKNavbar assignedtoHSK="HSK3" />
      <HSKdashboardfilter assignedtoHSK="HSK3" />
    </div>
  );
};

export default HSK3dashboard;