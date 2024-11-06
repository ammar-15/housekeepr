const HSKRoomContainer = () => {
    const roomData = {
      roomNumber: "301",
      tag: "NK",
      status: "DUE",
      change: "2/0",
      arrives: "12/Oct/2024",
      departs: "13/Oct/2024",
      extras: "Rollaway Bed",
      time: "2 PM",
    };
  
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md mb-2">
        <p className="flex-1 text-center">{roomData.roomNumber}</p>
        <p className="flex-1 text-center">{roomData.tag}</p>
        <p className="flex-1 text-center">{roomData.status}</p>
        <p className="flex-1 text-center">{roomData.change}</p>
        <p className="flex-1 text-center">{roomData.arrives}</p>
        <p className="flex-1 text-center">{roomData.departs}</p>
        <p className="flex-1 text-center">{roomData.extras}</p>
        <p className="flex-1 text-center">{roomData.time}</p>
      </div>
    );
  };
  
  export default HSKRoomContainer;
  