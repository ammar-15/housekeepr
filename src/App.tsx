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
import HSK2dashboard from "./components/Housekeeper/HSK2dashboard.tsx";
import HSK3dashboard from "./components/Housekeeper/HSK3dashboard.tsx";
import SUPdashboard from "./components/Supervisor/SUPdashboard.tsx";
import SUP2dashboard from "./components/Supervisor/SUP2dashboard.tsx";
import SUP3dashboard from "./components/Supervisor/SUP3dashboard.tsx";
import AdminStart from "./components/Admin/Admin Button/AdminStart.tsx";
import AdminAutoAssign from "./components/Admin/Admin Button/AdminAutoAssign.tsx";
import AdminHSKassign from "./components/Admin/Admin Button/AdminHSKassign.tsx";
import Notes from "./components/Notes.tsx";

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
          <Route path="/HSK2dashboard" element={<HSK2dashboard />} />
          <Route path="/HSK3dashboard" element={<HSK3dashboard />} />
          <Route path="/SUPdashboard" element={<SUPdashboard />} />
          <Route path="/SUP2dashboard" element={<SUP2dashboard />} />
          <Route path="/SUP3dashboard" element={<SUP3dashboard />} />
          <Route path="/AdminStart" element={<AdminStart />} />
          <Route path="/AdminAutoAssign" element={<AdminAutoAssign />} />
          <Route path="/AdminHSKassign" element={<AdminHSKassign />} />
          <Route path="/Notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
