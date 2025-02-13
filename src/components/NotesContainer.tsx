import { useState } from "react";
import threeDotsIcon from "./assets/threedots.svg";

interface NotesContainerProps {
  note: { id: string; content: string };
  updateNote: (id: string, newContent: string) => void;
  deleteNote: (id: string) => void;
}

const NotesContainer = ({ note, updateNote, deleteNote }: NotesContainerProps) => {
  const [content, setContent] = useState(note.content);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
        <button onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
          <img src={threeDotsIcon} alt="Options" className="w-5 h-5" />
        </button>
        {isDropdownVisible && (
          <div className="right-0 mt-2 w-32 bg-red shadow-lg rounded-md">
            <button className="w-full text-left text-white px-4 py-2 hover:bg-lightred" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
