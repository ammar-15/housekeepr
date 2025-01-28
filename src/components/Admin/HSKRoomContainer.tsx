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
  const [newRoomStatus, setNewRoomStatus] = useState(room.roomStatus);
  const [newCoStatus, setNewCoStatus] = useState(room.coStatus);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleStatusChange = async () => {
    try {
      const roomRef = doc(db, "AdminHSK", room.roomNumber);
      await updateDoc(roomRef, {
        roomStatus: newRoomStatus,
        coStatus: newCoStatus,
      });
      console.log(
        `Room ${room.roomNumber} updated to Status: ${newRoomStatus}, CO: ${newCoStatus}`
      );
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
      <p
        className={`flex-1 text-center px-2 py-1 rounded-md ${
          room.roomStatus === "Clean"
            ? "bg-lightgreen text-black"
            : "bg-lightyellow text-black"
        }`}
      >
        {room.roomStatus}
      </p>
      <p
        className={`flex-1 text-center mx-3 px-0.1 py-1 rounded-md ${
          room.coStatus === "DUE" ? "bg-mistysky text-black"
            : room.coStatus === "OUT" ? "bg-lightyellow text-black"
            : room.coStatus === "VACANT" ? "bg-yellow text-black"
            : room.coStatus === "INSPECTED" ? "bg-lightblue text-black"
            : "bg-red text-black"
        }`}
      >
        {room.coStatus}
      </p>
      <p className="flex-1 text-center">{room.people}</p>
      <p className="flex-1 text-center">{room.arrival}</p>
      <p className="flex-1 text-center">{room.departs}</p>
      <p className="flex-1 text-center">{room.extras}</p>
      <p className="flex-1 text-center">{room.early_ci}</p>
      <p className="flex-1 text-center">{room.assignedto}</p>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl mb-4">Update Room {room.roomNumber}</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Status
                </label>
                <select
                  value={newRoomStatus}
                  onChange={(e) => setNewRoomStatus(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Clean">Clean</option>
                  <option value="Dirty">Dirty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check out Status
                </label>
                <select
                  value={newCoStatus}
                  onChange={(e) => setNewCoStatus(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="DUE">DUE</option>
                  <option value="OUT">OUT</option>
                  <option value="VACANT">VACANT</option>
                  <option value="INSPECTED">INSPECTED</option>
                </select>
              </div>
            </div>

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
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HSKRoomContainer;
