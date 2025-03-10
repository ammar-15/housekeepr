import { useState } from "react";
import EditRoomContainer from "./EditRoomContainer";

interface RoomDataType {
  roomNumber: string;
  roomType: string;
  roomStatus: string;
  coStatus: string;
  workload: string;
  nearElevator: string;
  extras: string;
  assignedtoHSK: string;
  assignedtoSUP: string;
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

  return (
    <div className="HSKRoomContainer flex items-center justify-between py-4 bg-pearl rounded-md shadow-md mb-2 cursor-pointer" onClick={toggleModal}>
      <p className="flex-1 text-center">{room.roomNumber}</p>
      <p className="flex-1 text-center">{room.roomType}</p>
      <p
        className={`flex-1 text-center px-2 py-1 rounded-md ${
          room.roomStatus === "Clean"
            ? "bg-lightgreen text-black"
            : room.roomStatus === "ON CHANGE"
            ? "bg-orange text-black"
            : room.roomStatus === "Dirty"
            ? "bg-lightyellow text-black"
            : "bg-red text-black"
        }`}
      >
        {room.roomStatus}
      </p>
      <p
        className={`flex-1 text-center mx-3 py-1 rounded-md ${
          room.coStatus === "DUE"
            ? "bg-mistysky text-black"
            : room.coStatus === "OUT"
            ? "bg-lightyellow text-black"
            : room.coStatus === "VACANT"
            ? "bg-yellow text-black"
            : room.coStatus === "INSPECTED"
            ? "bg-lightblue text-black"
            : room.coStatus === "STAYOVER"
            ? "bg-lightpurple text-black"
            : "bg-red text-black"
        }`}
      >
        {room.coStatus}
      </p>
      <p className="flex-1 text-center">{room.extras}</p>
      <p className="flex-1 text-center">{room.assignedtoHSK}</p>
      <p className="flex-1 text-center">{room.assignedtoSUP}</p>
      {isModalVisible && (
        <EditRoomContainer
          roomNumber={room.roomNumber}
          initialRoomStatus={room.roomStatus}
          initialCoStatus={room.coStatus}
          assignedtoHSK={room.assignedtoHSK}
          assignedtoSUP={room.assignedtoSUP}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default HSKRoomContainer;
