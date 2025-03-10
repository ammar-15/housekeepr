import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK1dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <HSKNavbar assignedtoHSK="HSK1" />
      <HSKdashboardfilter assignedtoHSK="HSK1" />
    </div>
  );
};

export default HSK1dashboard;
