import { useNavigate } from "react-router-dom";
import AdminUserSwitch from "../Admin/AdminUserSwitch";

interface SUPNavbarProps {
  assignedtoSUP: string;
}

const SUPNavbar = ({ assignedtoSUP }: SUPNavbarProps) => {
  const navigate = useNavigate();

  const handleSUP = () => { 
    navigate(`../${assignedtoSUP}dashboard`);
  };

  const handleNotes = () => {
    sessionStorage.setItem("lastSUP", assignedtoSUP);
    navigate("../SUPNotes");
  };

  return (
    <nav className="navbar fixed z-10 px-10 py-2 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
      <div className="relative">
        <AdminUserSwitch />
      </div>

      <div className="flex gap-5">
        <button onClick={handleSUP} className="hover:underline">
          Rooms
        </button>
        <button onClick={handleNotes} className="hover:underline">
            Notes
          </button>
      </div>
    </nav>
  );
};

export default SUPNavbar;
