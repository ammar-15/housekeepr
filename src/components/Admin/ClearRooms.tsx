import { useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Modal from "../ui/Modal";
import { buttonGhost, buttonPrimary } from "../ui/form";

// The public demo shares one database, so wiping it is switched off.
const DEMO_MODE = true;

interface ClearRoomsProps {
  onClose: () => void;
}

const ClearRooms = ({ onClose }: ClearRoomsProps) => {
  const [loading, setLoading] = useState(false);

  const handleClearRooms = async () => {
    setLoading(true);

    try {
      const collectionRef = collection(db, "AdminHSK");
      const snapshot = await getDocs(collectionRef);

      if (!snapshot.empty) {
        await Promise.all(
          snapshot.docs.map((roomDoc) => deleteDoc(doc(collectionRef, roomDoc.id)))
        );
      }
      onClose();
    } catch (error) {
      console.error("Error clearing rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      tone="danger"
      eyebrow="End of day"
      title="Clear today's board?"
      size="sm"
      onClose={onClose}
      footer={
        <>
          <button type="button" className={buttonGhost} onClick={onClose} disabled={loading}>
            Keep rooms
          </button>
          <button
            type="button"
            className={buttonPrimary}
            onClick={DEMO_MODE ? undefined : handleClearRooms}
            disabled={DEMO_MODE || loading}
            title={DEMO_MODE ? "Disabled in the demo" : undefined}
          >
            {loading ? "Clearing…" : "Clear all rooms"}
          </button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-chocolate/80">
        Every room, status and assignment is removed so tomorrow starts empty. This can't be
        undone.
      </p>
      {DEMO_MODE && (
        <p className="mt-3 rounded-md bg-pearl px-3 py-2 text-xs text-chocolate/60">
          Clearing is turned off in this demo so the board stays explorable.
        </p>
      )}
    </Modal>
  );
};

export default ClearRooms;
