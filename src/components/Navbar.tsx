import { useNavigate } from "react-router-dom";
import { useState } from "react";
import user_switch from "./assets/user_switch.svg";
import AdminUserSwitch from "./Admin/AdminUserSwitch";

interface NavbarProps {
  navItems: string[];
}

const Navbar = ({ navItems }: NavbarProps) => {
  const navigate = useNavigate();
  const [showUserSwitch, setShowUserSwitch] = useState(false);

  const toggleUserSwitch = () => {
    setShowUserSwitch(!showUserSwitch);
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case "Dashboard":
        navigate("../AdminDashboard");
        break;
      case "Housekeeper":
        navigate("../AdminHSK");
        break;
      case "Supervisors":
        navigate("../AdminSUP");
        break;
      case "Rooms":
        navigate("../AdminRooms");
        break;
      case "Notes":
        navigate("/Notes");
        break;
        case "H-Dashboard":
          navigate("/HSKdashboard");
          break;
          case "S-Dashboard":
        navigate("/SUPdashboard");
        break;
      default:
        console.log(`${page} dont exist`);
    }
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
          <div className="absolute top-12 left-0 bg-white text-black shadow-lg rounded-md p-2 z-50">
            <AdminUserSwitch />
          </div>
        )}
      </div>

      <div className="flex gap-5">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavigation(item)}
            className="hover:underline"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
