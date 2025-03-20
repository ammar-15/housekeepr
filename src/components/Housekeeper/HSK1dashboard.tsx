import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK1dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <HSKNavbar assignedtoHSK="HSK1" />
      <HSKdashboardfilter assignedtoHSK="HSK1" />
    </div>
  );
};

export default HSK1dashboard;
