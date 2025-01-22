import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import threedotsIcon from "../assets/threedots.svg";

interface RoomDataType {
  roomNumber: string;
  roomType: string;
  roomStatus: string;
  coStatus: string;
  people: string;
  arrival: string;
  departs: string;
  extras: string;
  early_ci: string;
  assignedto: string;
  time_stamp: string;
}

interface HSKRoomContainerProps {
  room: RoomDataType;
}
const HSKRoomContainer = ({ room }: HSKRoomContainerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleStatusChange = async () => {
    const newStatus = room.roomStatus === "Dirty" ? "Clean" : "Dirty";
    try {
      const roomRef = doc(db, "AdminHSK", room.roomNumber);
      await updateDoc(roomRef, { roomStatus: newStatus });
      console.log(`Room ${room.roomNumber} status updated to ${newStatus}`);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };
  if (!room) {
    console.log("Room not found");
    return <div>Room not found</div>;
  }

  return (
    <div className="HSKRoomContainer flex items-center justify-between p-4 bg-white rounded-md shadow-md mb-2">
      <button onClick={toggleModal} className="mr-2">
        <img src={threedotsIcon} alt="Options" className="w-5 h-5" />
      </button>
      <p className="flex-1 text-center">{room.roomNumber}</p>
      <p className="flex-1 text-center">{room.roomType}</p>
      <p className="flex-1 text-center">{room.roomStatus}</p>
      <p className="flex-1 text-center">{room.coStatus}</p>
      <p className="flex-1 text-center">{room.people}</p>
      <p className="flex-1 text-center">{room.arrival}</p>
      <p className="flex-1 text-center">{room.departs}</p>
      <p className="flex-1 text-center">{room.extras}</p>
      <p className="flex-1 text-center">{room.early_ci}</p>
      <p className="flex-1 text-center">{room.assignedto}</p>
      <p className="flex-1 text-center">{room.time_stamp}</p>
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl mb-4">Change Room Status</h2>
            <p className="mb-4">
              Do you want to set room {room.roomNumber} to{" "}
              {room.roomStatus === "Dirty" ? "Clean" : "Dirty"}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="text-black bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine"
              >
                Set to {room.roomStatus === "Dirty" ? "Clean" : "Dirty"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HSKRoomContainer;
