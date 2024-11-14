import { useNavigate } from "react-router-dom";

const AdminUserSwitch = () => {
  const navigate = useNavigate();

  const handleHSKdashboard = () => {
    navigate("/HSKdashboard");
  };

  const handleSUPdashboard = () => {
    navigate("/SUPdashboard");
  };
  const handleAdminDashboard = () => {
    navigate("/AdminDashboard");
  };

  return (
    <div className="flex flex-col gap-2">
        <button
        onClick={handleAdminDashboard}
        className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">
        Admin
      </button>
      <button
        onClick={handleHSKdashboard}
        className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">
        Housekeeper
      </button>
      <button
        onClick={handleSUPdashboard}
        className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">
        Supervisor
      </button>
    </div>
  );
};

export default AdminUserSwitch;
