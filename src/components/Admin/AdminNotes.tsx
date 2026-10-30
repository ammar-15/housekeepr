import AdminNavbar from "./AdminNavbar";
import NoteContainer from "../NoteContainer";
import { PageShell } from "../ui/Page";

const AdminNotes = () => (
  <PageShell nav={<AdminNavbar />}>
    <NoteContainer />
  </PageShell>
);

export default AdminNotes;
