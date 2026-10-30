import { useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Modal from "../ui/Modal";
import { buttonGhost, buttonPrimary } from "../ui/form";

// Clearing is off for the public demo.
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
      title="End of Day"
      size="sm"
      onClose={onClose}
      footer={
        <>
          <button type="button" className={buttonGhost} onClick={onClose} disabled={loading}>
            No
          </button>
          <button
            type="button"
            className={buttonPrimary}
            onClick={DEMO_MODE ? undefined : handleClearRooms}
            disabled={DEMO_MODE || loading}
            title={DEMO_MODE ? "Disabled in the demo" : undefined}
          >
            {loading ? "Clearing..." : "Yes"}
          </button>
        </>
      }
    >
      <p>Are you sure you want to clear all rooms from the day?</p>
      {DEMO_MODE && (
        <p className="mt-2 text-xs italic">
          there would be a 'yes' button to clear the rooms but for now just explore the site
        </p>
      )}
    </Modal>
  );
};

export default ClearRooms;
