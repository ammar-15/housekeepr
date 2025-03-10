import { useNavigate } from "react-router-dom";
import AdminUserSwitch from "./AdminUserSwitch";

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

  const handleNotes = () => {
    navigate("../AdminNotes");
  };

  return (
    <nav className="navbar fixed z-10 px-10 py-2 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
      <div className="relative">
            <AdminUserSwitch />
      </div>

      <div className="flex gap-5">
        <button onClick={handleDashboard} className="hover:underline">
          Dashboard
        </button>
        <button onClick={handleHousekeeper} className="hover:underline">
          Housekeeper
        </button>
        <button onClick={handleSupervisor} className="hover:underline">
          Supervisors
        </button>
        <button onClick={handleRooms} className="hover:underline">
          Rooms
        </button>
        <button onClick={handleNotes} className="hover:underline">
            Notes
          </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
