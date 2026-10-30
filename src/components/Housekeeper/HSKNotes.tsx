import HSKNavbar from "./HSKNavbar";
import NoteContainer from "../NoteContainer";
import { PageShell } from "../ui/Page";

const HSKNotes = () => {
  const assignedtoHSK = sessionStorage.getItem("lastHSK") ?? "HSK1";

  return (
    <PageShell nav={<HSKNavbar assignedtoHSK={assignedtoHSK} />}>
      <NoteContainer />
    </PageShell>
  );
};

export default HSKNotes;
