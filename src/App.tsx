import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/Login/LoginPage";
import AdminDashboard from "./components/Admin/AdminDashboard.tsx";
import AdminHSK from "./components/Admin/AdminHSK.tsx";
import AdminSUP from "./components/Admin/AdminSUP.tsx";
import AdminRooms from "./components/Admin/AdminRooms.tsx";
import AdminNavbar from "./components/Admin/AdminNavbar.tsx";
import AdminUserSwitch from "./components/Admin/AdminUserSwitch.tsx";
import HSKdashboard from "./components/Housekeeper/HSKdashboard.tsx";
import SUPdashboard from "./components/Supervisor/SUPdashboard.tsx";
import AdminStart from "./components/Admin/Admin Button/AdminStart.tsx";
import AdminAutoAssign from "./components/Admin/Admin Button/AdminAutoAssign.tsx"
import AdminHSKassign from "./components/Admin/Admin Button/AdminHSKassign.tsx";
import AdminSUPassign from "./components/Admin/Admin Button/AdminSUPassign.tsx";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminHSK" element={<AdminHSK />} />
          <Route path="/AdminSUP" element={<AdminSUP />} />
          <Route path="/AdminRooms" element={<AdminRooms />} />
          <Route path="/AdminNavbar" element={<AdminNavbar />} />
          <Route path="/AdminUserSwitch" element={<AdminUserSwitch />} />
          <Route path="/HSKdashboard" element={<HSKdashboard />} />
          <Route path="/SUPdashboard" element={<SUPdashboard />} />
          <Route path="/AdminStart" element={<AdminStart />} />
          <Route path="/AdminAutoAssign" element={<AdminAutoAssign />} />
          <Route path="/AdminHSKassign" element={<AdminHSKassign />} />
          <Route path="/AdminSUPassign" element={<AdminSUPassign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
