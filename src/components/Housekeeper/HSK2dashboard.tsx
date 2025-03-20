import HSKdashboardfilter from "./HSKdashboardfilter";
import HSKNavbar from "./HSKNavbar";

const HSK2dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <HSKNavbar assignedtoHSK="HSK2" />
      <HSKdashboardfilter assignedtoHSK="HSK2" />
    </div>
  );
};

export default HSK2dashboard;
