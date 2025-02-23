import { useState } from "react";
import trashIcon from "./assets/trashicon.svg";

interface NotesProps {
  note: { id: string; content: string };
  updateNote: (id: string, newContent: string) => void;
  deleteNote: (id: string) => void;
}

const Notes = ({ note, updateNote, deleteNote }: NotesProps) => {
  const [content, setContent] = useState(note.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    updateNote(note.id, content);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteNote(note.id);
    setShowDeleteModal(false);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="note">
      <div className="note-container flex items-start justify-between p-4 bg-pearl rounded-md shadow-md mb-2">
        <textarea
          className="w-full h-24 bg-pearl resize-none focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Empty Note"
        />
        <div className="top-2 right-2">
          <button onClick={handleDelete} className="hover">
            <img src={trashIcon} alt="Delete" className="w-5 h-5 hover:bg-white" />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-68"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center mb-4">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="text-black px-4 py-2 rounded-md hover:bg-dustyblue mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
