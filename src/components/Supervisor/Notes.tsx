import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user_switch from "../assets/user_switch.svg";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import NotesContainer from "../NotesContainer";
import SortButton from "../SortButton";
import AdminUserSwitch from "../Admin/AdminUserSwitch";

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [sortedNotes, setSortedNotes] = useState<any[]>([]);
  const navigate = useNavigate();
  const [showUserSwitch, setShowUserSwitch] = useState(false);

  const toggleUserSwitch = () => {
    setShowUserSwitch(!showUserSwitch);
  };

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
    setNotes([...notes, { ...newNote, id: docRef.id }]);
    setSortedNotes([...notes, { ...newNote, id: docRef.id }]);
  };

  const updateNote = async (id: string, newContent: string) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { content: newContent });
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
    setSortedNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    setNotes(notes.filter((note) => note.id !== id));
    setSortedNotes(notes.filter((note) => note.id !== id));
  };

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1); 
    } else {
      navigate("/SUPdashboard"); 
    }
  };

  return (
    <div className="notes-main flex flex-col m-0 py-20 px-10">
      <nav className="navbar fixed px-10 py-3 top-0 left-0 right-0 flex justify-between items-center bg-chocolate text-white">
        <div className="relative">
        <button onClick={toggleUserSwitch} className="user-switch-button focus:outline-none">
            <img src={user_switch} alt="User Switch" className="w-8 h-8 invert" />
          </button>
          {showUserSwitch && (
            <div className="absolute top-12 left-0 bg-white text-black border border-gray-300 shadow-lg rounded-md p-2 z-50">
              <AdminUserSwitch />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-5">
          <button onClick={handleGoBack} className="hover:underline">
            Rooms
          </button>
          <button onClick={() => navigate("/Notes")} className="hover:underline">
            Notes
          </button>
        </div>
      </nav>
      
      <div className="noteheader-container flex justify-between items-center m-0 mb-5">
        <h2 className="text-2xl font-semibold text-darkpurple">Notes</h2>
        <SortButton rooms={notes} onSortedRooms={setSortedNotes} />
      </div>

      <div className="notes-container grid grid-cols-4 gap-4">
        {sortedNotes.map((note) => (
          <NotesContainer
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

export default Notes;
