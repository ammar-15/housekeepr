import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK2dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <HSKNavbar assignedtoHSK="HSK2" />
      <HSKdashboardfilter assignedtoHSK="HSK2" />
    </div>
  );
};

export default HSK2dashboard;
