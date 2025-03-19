import AdminNavbar from "./AdminNavbar";
import NoteContainer from "../NoteContainer";

const AdminNotes = () => {
  return (
    <div className="notes-main flex flex-col m-0 py-11p px-10">
      <AdminNavbar />
      <NoteContainer />
    </div>
  );
};

export default AdminNotes;
