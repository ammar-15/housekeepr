import { useState } from "react";
import Modal from "./ui/Modal";
import { buttonGhost, buttonPrimary } from "./ui/form";
import { Trash } from "./ui/icons";
import { formatNoteDate } from "../lib/format";

interface NotesProps {
  note: { id: string; content: string; createdAt?: Date };
  updateNote: (id: string, newContent: string) => void;
  deleteNote: (id: string) => void;
}

const Notes = ({ note, updateNote, deleteNote }: NotesProps) => {
  const [content, setContent] = useState(note.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    if (content !== note.content) updateNote(note.id, content);
  };

  const confirmDelete = () => {
    deleteNote(note.id);
    setShowDeleteModal(false);
  };

  return (
    <article className="note group flex min-h-[11rem] flex-col rounded-lg border border-line bg-pearl transition-colors focus-within:border-dustyblue">
      <textarea
        aria-label="Note"
        className="flex-1 resize-none bg-transparent p-4 text-sm leading-relaxed text-chocolate placeholder:text-chocolate/35 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleUpdate}
        placeholder="Write a note for the team…"
      />
      <footer className="flex items-center justify-between border-t border-line/80 px-4 py-2 text-xs text-chocolate/50">
        <time dateTime={note.createdAt?.toISOString()}>{formatNoteDate(note.createdAt)}</time>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          aria-label="Delete note"
          className="rounded p-1 text-chocolate/50 transition hover:bg-lightred/60 hover:text-chocolate focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Trash width={14} height={14} />
        </button>
      </footer>

      {showDeleteModal && (
        <Modal
          tone="danger"
          title="Delete this note?"
          size="sm"
          onClose={() => setShowDeleteModal(false)}
          footer={
            <>
              <button type="button" onClick={() => setShowDeleteModal(false)} className={buttonGhost}>
                Cancel
              </button>
              <button type="button" onClick={confirmDelete} className={buttonPrimary}>
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm text-chocolate/80">
            It's removed for everyone on the team and can't be recovered.
          </p>
        </Modal>
      )}
    </article>
  );
};

export default Notes;
