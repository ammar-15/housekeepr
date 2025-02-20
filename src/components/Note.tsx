import { useState } from "react";
import trashIcon from "./assets/trashicon.svg";

interface NotesProps {
  note: { id: string; content: string };
  updateNote: (id: string, newContent: string) => void;
  deleteNote: (id: string) => void;
}

const Notes = ({ note, updateNote, deleteNote }: NotesProps) => {
  const [content, setContent] = useState(note.content);
  
  const handleUpdate = () => {
    updateNote(note.id, content);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
    }
  };

  return (
    <div className="note-container flex items-start justify-between p-4 bg-pearl rounded-md shadow-md mb-2">
      <textarea
        className="w-full h-24 border-none bg-pearl resize-none focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleUpdate}
        placeholder="Empty Note"
      />
      <div className="top-2 right-2">
        <button onClick={handleDelete} className="hover:rounded-md">
          <img src={trashIcon} alt="Options" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notes;
