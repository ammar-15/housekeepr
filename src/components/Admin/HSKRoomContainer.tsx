import RoomData from '../RoomData.tsx'


const HSKRoomContainer = () => {
    const roomData = {
      roomNumber: "301",
      roomtype: "NK",
      roomstatus: "Dirty",
      co_status: "DUE",
      people: "2/0",
      arrival: "12/Oct/2024",
      departs: "13/Oct/2024",
      extras: "Rollaway Bed",
      early_ci: "2 PM",
    };
  
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md mb-2">
        <p className="flex-1 text-center">{roomData.roomNumber}</p>
        <p className="flex-1 text-center">{roomData.roomtype}</p>
        <p className="flex-1 text-center">{roomData.co_status}</p>
        <p className="flex-1 text-center">{roomData.people}</p>
        <p className="flex-1 text-center">{roomData.arrival}</p>
        <p className="flex-1 text-center">{roomData.departs}</p>
        <p className="flex-1 text-center">{roomData.extras}</p>
        <p className="flex-1 text-center">{roomData.early_ci}</p>
      </div>
    );
  };
  
  export default HSKRoomContainer;
  