import { useNavigate } from "react-router-dom";
import user_switch from "../assets/user_switch.svg";

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

  const handleUserSwitch = () => {
    navigate("../AdminUserSwitch");
  };

  return (
    <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
      <div className="navbar-left invert">
        <button onClick={handleUserSwitch} className="user-switch-button">
          <img src={user_switch} alt="User Switch" />
        </button>
      </div>
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
