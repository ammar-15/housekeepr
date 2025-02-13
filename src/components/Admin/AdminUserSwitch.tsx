import { useNavigate } from "react-router-dom";

const AdminUserSwitch = () => {
  const navigate = useNavigate();

  const handleHSKdashboard = () => {
    navigate("/HSKdashboard");
  };
  const handleHSK2dashboard = () => {
    navigate("/HSK2dashboard");
  };
  const handleHSK3dashboard = () => {
    navigate("/HSK3dashboard");
  };

  const handleSUPdashboard = () => {
    navigate("/SUPdashboard");
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

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAdminDashboard}
        className="px-4 py-2 text-sm"
      >
        Admin
      </button>
      <button
        onClick={handleHSKdashboard}
        className="px-4 py-2 text-sm"
      >
        Housekeeper 1
      </button>
      <button
        onClick={handleHSK2dashboard}
        className="px-4 py-2 text-sm"
      >
        Housekeeper 2
      </button>
      <button
        onClick={handleHSK3dashboard}
        className="px-4 py-2 text-sm"
      >
        Housekeeper 3
      </button>
      <button
        onClick={handleSUPdashboard}
        className="px-4 py-2 text-sm"
      >
        Supervisor 1
      </button>
      <button
        onClick={handleSUP2dashboard}
        className="px-4 py-2 text-sm"
      >
        Supervisor 2
      </button>
      <button
        onClick={handleSUP3dashboard}
        className="px-4 py-2 text-sm"
      >
        Supervisor 3
      </button>
    </div>
  );
};

export default AdminUserSwitch;
