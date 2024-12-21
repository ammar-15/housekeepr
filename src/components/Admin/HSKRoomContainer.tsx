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
  if (!room) {
    console.log("Room not found");
    return <div>Room not found</div>;
  }

  return (
    <div className="HSKRoomContainer flex items-center justify-between p-4 bg-white rounded-md shadow-md mb-2">
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
    </div>
  );
};

export default HSKRoomContainer;
