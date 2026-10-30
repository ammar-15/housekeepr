import SUPNavbar from "./SUPNavbar";
import NoteContainer from "../NoteContainer";
import { PageShell } from "../ui/Page";

const SUPNotes = () => {
  const assignedtoSUP = sessionStorage.getItem("lastSUP") ?? "SUP1";

  return (
    <PageShell nav={<SUPNavbar assignedtoSUP={assignedtoSUP} />}>
      <NoteContainer />
    </PageShell>
  );
};

export default SUPNotes;
