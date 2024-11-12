import { useNavigate } from "react-router-dom";
import user_switch from "../assets/user_switch.svg";

const AdminUserSwitch = () => {
    const navigate = useNavigate();
    
    const handleHSKdashboard = () => {
        navigate("/HSKdashboard");
    };

    const handleSUPdashboard = () => {
        navigate("/SUPdashboard");
    };

    return (
        <div>
            <button onClick={handleHSKdashboard}>
            </button>
            <button onClick={handleSUPdashboard}>
            </button>
        </div>
        
    );
};

export default AdminUserSwitch;
