import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/Login/LoginPage";
import AdminDashboard from "./components/Admin/AdminDashboard.tsx";
import AdminHSK from "./components/Admin/AdminHSK.tsx";
import AdminSUP from "./components/Admin/AdminSUP.tsx";
import AdminRooms from "./components/Admin/AdminRooms.tsx";
import AdminUserSwitch from "./components/Admin/AdminUserSwitch.tsx";
import HSK1dashboard from "./components/Housekeeper/HSK1dashboard.tsx";
import HSK2dashboard from "./components/Housekeeper/HSK2dashboard.tsx";
import HSK3dashboard from "./components/Housekeeper/HSK3dashboard.tsx";
import SUP1dashboard from "./components/Supervisor/SUP1dashboard.tsx";
import SUP2dashboard from "./components/Supervisor/SUP2dashboard.tsx";
import SUP3dashboard from "./components/Supervisor/SUP3dashboard.tsx";
import AdminStart from "./components/Admin/Admin Button/AdminStart.tsx";
import AdminAutoAssign from "./components/Admin/Admin Button/AdminAutoAssign.tsx";
import AdminHSKassign from "./components/Admin/Admin Button/AdminHSKassign.tsx";
import Notes from "./components/NoteContainer.tsx";
import AdminNotes from "./components/Admin/AdminNotes.tsx";
import HSKNotes from "./components/Housekeeper/HSKNotes.tsx";
import SUPNotes from "./components/Supervisor/SUPNotes.tsx";

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
          <Route path="/AdminUserSwitch" element={<AdminUserSwitch />} />
          <Route path="/HSK1dashboard" element={<HSK1dashboard />} />
          <Route path="/HSK2dashboard" element={<HSK2dashboard />} />
          <Route path="/HSK3dashboard" element={<HSK3dashboard />} />
          <Route path="/SUP1dashboard" element={<SUP1dashboard />} />
          <Route path="/SUP2dashboard" element={<SUP2dashboard />} />
          <Route path="/SUP3dashboard" element={<SUP3dashboard />} />
          <Route path="/AdminStart" element={<AdminStart />} />
          <Route path="/AdminAutoAssign" element={<AdminAutoAssign />} />
          <Route path="/AdminHSKassign" element={<AdminHSKassign />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/AdminNotes" element={<AdminNotes />} />
          <Route path="/HSKNotes" element={<HSKNotes />} />
          <Route path="/SUPNotes" element={<SUPNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
