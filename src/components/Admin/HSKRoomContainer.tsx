import RoomData from "../RoomData.tsx";

const HSKRoomContainer = () => {

  const room = RoomData.find((room) => room.roomNumber === "104");
  if (!room) {
    return <div>Room not found</div>;
  }
  return (
        <div
          className="HSKRoomContainer flex items-center justify-between p-4 bg-white rounded-md shadow-md mb-2"
        >
          <p className="flex-1 text-center">{room.roomNumber}</p>
          <p className="flex-1 text-center">{room.roomType}</p>
          <p className="flex-1 text-center">{room.roomStatus}</p>
          <p className="flex-1 text-center">{room.coStatus}</p>
          <p className="flex-1 text-center">{room.people}</p>
          <p className="flex-1 text-center">{room.arrival}</p>
          <p className="flex-1 text-center">{room.departs}</p>
          <p className="flex-1 text-center">{room.extras}</p>
          <p className="flex-1 text-center">{room.early_ci}</p>
        </div>
  );
};

export default HSKRoomContainer;
