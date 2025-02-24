import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import user_switch from "./assets/user_switch.svg";
import sortIcon from "../components/assets/sort.svg";
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
import AdminUserSwitch from "./Admin/AdminUserSwitch";

const NoteContainer = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [sortedNotes, setSortedNotes] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const navigate = useNavigate();
  const [showUserSwitch, setShowUserSwitch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserSwitch = () => {
    setShowUserSwitch(!showUserSwitch);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    sortNotes(notesList, sortOrder);
  };

  const addNote = async () => {
    const newNote = { content: "", createdAt: new Date() };
    const docRef = await addDoc(collection(db, "notes"), newNote);
    const updatedNotes = [...notes, { ...newNote, id: docRef.id }];
    setNotes(updatedNotes);
    sortNotes(updatedNotes, sortOrder);
  };

  const updateNote = async (id: string, newContent: string) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { content: newContent });
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updatedNotes);
    sortNotes(updatedNotes, sortOrder);
  };

  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    sortNotes(updatedNotes, sortOrder);
  };

  const sortNotes = (notesList: any[], order: "oldest" | "newest") => {
    const sorted = [...notesList].sort((a, b) =>
      order === "oldest"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime()
    );
    setSortedNotes(sorted);
  };

  const changeSortOrder = (order: "oldest" | "newest") => {
    setSortOrder(order);
    sortNotes(notes, order);
    setShowSortDropdown(false); 
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
          <button
            onClick={toggleUserSwitch}
            className="user-switch-button focus:outline-none"
          >
            <img
              src={user_switch}
              alt="User Switch"
              className="w-8 h-8 invert"
            />
          </button>
          {showUserSwitch && (
            <div className="absolute top-12 left-0 bg-white text-black border shadow-lg rounded-md p-2">
              <AdminUserSwitch />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-5">
          <button onClick={handleGoBack} className="hover:underline">
            Rooms
          </button>
          <button
            onClick={() => navigate("/Notes")}
            className="hover:underline"
          >
            Notes
          </button>
        </div>
      </nav>

      <div className="noteheader-container flex justify-between items-center m-0 mb-5">
        <h2 className="text-3xl text-wine">Notes</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center text-white rounded-md"
          >
            <img src={sortIcon} alt="Sort" className="w-5 h-5" />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-3r bg-white border rounded-md shadow-lg">
              <button
                className={`block px-2 py-2 text-center w-full  ${
                  sortOrder === "newest" ? "text-black" : ""
                }`}
                onClick={() => changeSortOrder("newest")}
              >
                Newest
              </button>
              <button
                className={`block px-2 py-2 text-center w-full ${
                  sortOrder === "oldest" ? "text-black" : ""
                }`}
                onClick={() => changeSortOrder("oldest")}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
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

export default NoteContainer;
