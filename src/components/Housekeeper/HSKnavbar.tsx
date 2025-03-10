import { useNavigate } from "react-router-dom";
import AdminUserSwitch from "../Admin/AdminUserSwitch";

interface HSKNavbarProps {
  assignedtoHSK: string;
}

const HSKNavbar = ({ assignedtoHSK }: HSKNavbarProps) => {
  const navigate = useNavigate();

  const handleHSK = () => { 
    navigate(`../${assignedtoHSK}dashboard`);
  };

  const handleNotes = () => {
    sessionStorage.setItem("lastHSK", assignedtoHSK);
    navigate("../HSKNotes");
  };

  return (
    <nav className="navbar fixed z-10 px-10 py-2 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
      <div className="relative">
        <AdminUserSwitch />
      </div>

      <div className="flex gap-5">
        <button onClick={handleHSK} className="hover:underline">
          Rooms
        </button>
        <button onClick={handleNotes} className="hover:underline">
            Notes
          </button>
      </div>
    </nav>
  );
};

export default HSKNavbar;
