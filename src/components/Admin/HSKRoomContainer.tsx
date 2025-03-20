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
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div
      className="HSKRoomContainer flex flex-col sm:flex-row sm:p-4 items-center sm:justify-between p-4 bg-pearl rounded-md shadow-md mb-3 cursor-pointer w-[100%] sm:w-full"
      onClick={toggleModal}
    >
      <div className="flex w-full justify-around sm:flex-1 sm:justify-around sm:gap-4 mb-2 sm:mb-0">
        <p className="text-left">{room.roomNumber}</p>
        <p className="text-right">{room.roomType}</p>
      </div>

      <div className="w-full sm:flex-1 text-center mb-2 sm:mb-0">
        <p
          className={`inline-block min-w-[100px] px-3 py-1 rounded-md ${
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
      </div>

      <div className="w-full sm:flex-1 text-center mb-2 sm:mb-0">
        <p
          className={`inline-block min-w-[100px] px-3 py-1 rounded-md ${
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
      </div>

      <div className="w-full sm:flex-1 text-center mb-2 sm:mb-0">
        <p>{room.extras}</p>
      </div>

      <div className="w-full flex justify-around sm:flex-1 sm:justify-around sm:gap-4">
        <p className="text-left">{room.assignedtoHSK}</p>
        <p className="text-right">{room.assignedtoSUP}</p>
      </div>

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
