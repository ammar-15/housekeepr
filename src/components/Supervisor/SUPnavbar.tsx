import { useNavigate } from "react-router-dom";
import { useState } from "react";
import user_switch from "../assets/user_switch.svg";
import AdminUserSwitch from "../Admin/AdminUserSwitch";

const SUPNavbar = () => {
  const navigate = useNavigate();
  const [showUserSwitch, setShowUserSwitch] = useState(false);

  const handleDashboard = () => {
    navigate("/AdminDashboard");
  };
  const handleSupervisor = () => {
    navigate("/SUPdashboard");
  };

  const toggleUserSwitch = () => {
    setShowUserSwitch(!showUserSwitch);
  };

  return (
    <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
      <div className="relative">
        <button
          onClick={toggleUserSwitch}
          className="user-switch-button focus:outline-none"
        >
          <img src={user_switch} alt="User Switch" className="w-8 h-8 invert" />
        </button>
        {showUserSwitch && (
          <div className="absolute top-12 left-0 bg-white text-black border border-gray-300 shadow-lg rounded-md p-2 z-50">
            <AdminUserSwitch />
          </div>
        )}
      </div>
      <div className="flex gap-5">
        <button onClick={handleDashboard} className="hover:underline">
          Dashboard
        </button>
        <button onClick={handleSupervisor} className="hover:underline">
          Rooms
        </button>
      </div>
    </nav>
  );
};

export default SUPNavbar;
