import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("../AdminDashboard");
  };
  const handleHousekeeper = () => {
    navigate("../AdminHSK");
  };

  const handleSupervisor = () => {
    navigate("../AdminSUP");
  };

  const handleRooms = () => {
    navigate("../AdminRooms");
  };

  return (
    <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-end items-center bg-chocolate text-white">
      <div className="navbar-right">
        <ul className="flex flex-column gap-5 m-0">
          <button onClick={handleDashboard}>Dashboard</button>
          <button onClick={handleHousekeeper}>Housekeeper</button>
          <button onClick={handleSupervisor}>Supervisors</button>
          <button onClick={handleRooms}>Rooms</button>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
