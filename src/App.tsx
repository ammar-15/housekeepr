import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login/LoginPage';
import AdminDashboard from './components/Admin/AdminDashboard.tsx';
import AdminHSK from './components/Admin/AdminHSK.tsx';
import AdminSUP from './components/Admin/AdminSUP.tsx';
import AdminRooms from './components/Admin/AdminRooms.tsx';
import AdminNavbar from './components/Admin/AdminNavbar.tsx';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
