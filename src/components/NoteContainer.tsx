import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Notes from "./Note";
import SortButton from "./SortButton";
import { PageHeader } from "./ui/Page";
import { Plus } from "./ui/icons";
import { SortOption, sortItems } from "../lib/rooms";

interface NoteData {
  id: string;
  content: string;
  createdAt: Date;
}

const NoteContainer = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("recent");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    const notesList = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      content: doc.data().content ?? "",
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
    }));
    setNotes(notesList);
    setLoaded(true);
  };

  const addNote = async () => {
    const newNote = { content: "", createdAt: new Date() };
    const docRef = await addDoc(collection(db, "notes"), newNote);
    setNotes((current) => [...current, { ...newNote, id: docRef.id }]);
  };

  const updateNote = async (id: string, newContent: string) => {
    await updateDoc(doc(db, "notes", id), { content: newContent });
    setNotes((current) =>
      current.map((note) => (note.id === id ? { ...note, content: newContent } : note))
    );
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  const sortedNotes = sortItems(notes, sortOption);

  return (
    <div className="note-container flex flex-col">
      <PageHeader
        title="Notes"
        meta={
          loaded
            ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} · visible to every role`
            : "Loading…"
        }
        actions={
          <SortButton value={sortOption} onChange={setSortOption} options={["recent", "oldest"]} />
        }
      />

      <div className="notes-container mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <button
          type="button"
          className="add-notes flex min-h-[11rem] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-dustyblue text-sm text-chocolate/60 transition-colors hover:border-wine hover:bg-white hover:text-wine"
          onClick={addNote}
        >
          <Plus width={20} height={20} />
          New note
        </button>
        {sortedNotes.map((note) => (
          <Notes key={note.id} note={note} updateNote={updateNote} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default NoteContainer;
