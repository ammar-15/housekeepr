import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import SortButton from "../SortButton";

import Notes from ".././Note";
import AdminNavbar from "./AdminNavbar";

const AdminNotes = () => {
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
  };

  const addNote = async () => {
    const newNote = { content: "", createdAt: new Date() };
    const docRef = await addDoc(collection(db, "notes"), newNote);
    const updatedNotes = [...notes, { ...newNote, id: docRef.id }];
    setNotes(updatedNotes);
  };

  const updateNote = async (id: string, newContent: string) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { content: newContent });
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-main flex flex-col m-0 py-11p px-10">
      <AdminNavbar />
      <div className="noteheader-container flex justify-between items-center m-0 mb-5">
        <h2 className="text-3xl text-wine">Notes</h2>
        <SortButton
          rooms={notes}
          onSortedRooms={setSortedNotes}
          sortProps={["recent", "oldest"]}
        />
      </div>

      <div className="notes-container grid grid-cols-4 gap-4">
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

export default AdminNotes; 
