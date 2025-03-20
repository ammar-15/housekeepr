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
import SortButton from "../components/SortButton";

const NoteContainer = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [sortedNotes, setSortedNotes] = useState<any[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    const notesList = notesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt
        ? doc.data().createdAt.toDate()
        : new Date(),
    }));
    setNotes(notesList);
    setSortedNotes(notesList); 
  };

  const addNote = async () => {
    const newNote = { content: "", createdAt: new Date() };
    const docRef = await addDoc(collection(db, "notes"), newNote);
    const updatedNotes = [...notes, { ...newNote, id: docRef.id }];
    setNotes(updatedNotes);
    setSortedNotes(updatedNotes);
  };

  const updateNote = async (id: string, newContent: string) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { content: newContent });
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
    setSortedNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSortedNotes(updatedNotes);
  };

  return (
    <div className="note-container flex flex-col ">
      <div className="noteheader-container flex justify-between items-center m-0 mb-4">
        <h2 className="text-3xl text-wine">Notes</h2>
        <SortButton
          rooms={notes}
          onSortedRooms={setSortedNotes}
          sortProps={["recent", "oldest"]}
        />
      </div>

      <div className="notes-container grid sm:grid-cols-4 grid-cols-2 gap-4">
        {sortedNotes.map((note) => (
          <Notes
            key={note.id}
            note={note}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        ))}
        <button
          className="add-notes rounded-full py-10 bg-wine text-darkpurple text-3xl w-40 font-bold"
          onClick={addNote}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NoteContainer;
