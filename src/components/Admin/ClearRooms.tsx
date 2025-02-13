import { useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

interface ClearRoomsProps {
  onClose: () => void;
}

const ClearRooms = ({ onClose }: ClearRoomsProps) => {
  const [loading, setLoading] = useState(false);
  const handleClearRooms = async () => {
    setLoading(true);

    try {
      const collectionName = "AdminHSK";
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);

      if (snapshot.empty) {
        console.log("No rooms found in AdminHSK.");
        setLoading(false);
        onClose();
        return;
      }

      console.log(`Clearing all rooms`);
      const deletePromises = snapshot.docs.map(async (roomDoc) => {
        await deleteDoc(doc(collectionRef, roomDoc.id));
      });
      await Promise.all(deletePromises);
      console.log(`Successfully cleared all rooms`);
      onClose();
    } catch (error) {
      console.error("Error clearing rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-lightred p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl mb-4 text-red-600">End of Day</h2>
        <p>Are you sure you want to clear all rooms from the day?</p>
        <p className="text-xs italic">there would be a 'yes' button to clear the rooms but for now just explore the site</p>
        <div className="flex justify-end mt-5">
          <button
            className="text-black px-4 py-2 rounded-md hover:bg-dustyblue mr-2"
            onClick={onClose}
            disabled={loading}
          >
            No
          </button>
            {/* <p
            className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
            onClick={handleClearRooms}
            disabled={loading}
            >
            {loading ? "Clearing..." : "Yes"}
            </p> */}
            <p className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine">
              'Yes'
            </p>
        </div>
      </div>
    </div>
  );
};

export default ClearRooms;
