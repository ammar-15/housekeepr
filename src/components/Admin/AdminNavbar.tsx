import Navbar from "../Navbar";

const ADMIN_LINKS = [
  { label: "Dashboard", to: "/AdminDashboard" },
  { label: "Housekeepers", to: "/AdminHSK" },
  { label: "Supervisors", to: "/AdminSUP" },
  { label: "Rooms", to: "/AdminRooms" },
  { label: "Notes", to: "/AdminNotes" },
];

const AdminNavbar = () => <Navbar role="Admin" items={ADMIN_LINKS} />;

export default AdminNavbar;
