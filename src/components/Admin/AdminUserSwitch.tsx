import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import user_switch from "../assets/user_switch.svg";

const AdminUserSwitch = () => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserSwitch = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleHSK1dashboard = () => {
    navigate("/HSK1dashboard");
  };
  const handleHSK2dashboard = () => {
    navigate("/HSK2dashboard");
  };
  const handleHSK3dashboard = () => {
    navigate("/HSK3dashboard");
  };

  const handleSUP1dashboard = () => {
    navigate("/SUP1dashboard");
  };
  const handleSUP2dashboard = () => {
    navigate("/SUP2dashboard");
  };
  const handleSUP3dashboard = () => {
    navigate("/SUP3dashboard");
  };

  const handleAdminDashboard = () => {
    navigate("/AdminDashboard");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="container">
      <button
        onClick={toggleUserSwitch}
        className="user-switch-button focus:outline-none"
      >
        <img src={user_switch} alt="User Switch" className="w-8 h-8 invert" />
      </button>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 bg-white text-black shadow-lg rounded-md p-2 flex flex-col gap-2"
   
        >
          <button onClick={handleAdminDashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Admin
          </button>
          <button onClick={handleHSK1dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Housekeeper 1
          </button>
          <button onClick={handleHSK2dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Housekeeper 2
          </button>
          <button onClick={handleHSK3dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Housekeeper 3
          </button>
          <button onClick={handleSUP1dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Supervisor 1
          </button>
          <button onClick={handleSUP2dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Supervisor 2
          </button>
          <button onClick={handleSUP3dashboard} className="px-4 py-2 hover:bg-mistysky rounded-md text-sm">
            Supervisor 3
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserSwitch;
