import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminUserSwitch from "./AdminUserSwitch";
import menuIcon from "../assets/menu.svg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="navbar fixed z-10 top-0 left-0 right-0 bg-chocolate text-white px-8 md:px-10 py-2 flex justify-between items-center">
      <div className="relative">
        <AdminUserSwitch />
      </div>

      <div className="hidden md:flex gap-5">
        <button
          onClick={() => handleNavigate("../AdminDashboard")}
          className="hover:underline"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigate("../AdminHSK")}
          className="hover:underline"
        >
          Housekeeper
        </button>
        <button
          onClick={() => handleNavigate("../AdminSUP")}
          className="hover:underline"
        >
          Supervisors
        </button>
        <button
          onClick={() => handleNavigate("../AdminRooms")}
          className="hover:underline"
        >
          Rooms
        </button>
        <button
          onClick={() => handleNavigate("../AdminNotes")}
          className="hover:underline"
        >
          Notes
        </button>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <img src={menuIcon} className="w-8 h-8 invert" alt="menu" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-10 mt-2 w-48 bg-chocolate text-white border border-white rounded-lg shadow-lg md:hidden flex flex-col gap-2 p-4 z-20">
          <button
            onClick={() => handleNavigate("../AdminDashboard")}
            className="hover:underline text-left"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavigate("../AdminHSK")}
            className="hover:underline text-left"
          >
            Housekeeper
          </button>
          <button
            onClick={() => handleNavigate("../AdminSUP")}
            className="hover:underline text-left"
          >
            Supervisors
          </button>
          <button
            onClick={() => handleNavigate("../AdminRooms")}
            className="hover:underline text-left"
          >
            Rooms
          </button>
          <button
            onClick={() => handleNavigate("../AdminNotes")}
            className="hover:underline text-left"
          >
            Notes
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;