const RoomHeader = () => {
  return (
    <div className="hidden sm:flex flex-row sm:p-4 items-center justify-between w-full">
      <div className="flex flex-1 justify-around gap-4">
        <p className="text-center flex-1 ml-0 opacity-50">Room Number</p>
        <p className="text-center flex-1 opacity-50">Room Type</p>
      </div>
      <div className="flex-1 text-center">
        <p className="text-center opacity-50">Room Status</p>
      </div>
      <div className="flex-1 text-center">
        <p className="text-center opacity-50">C/O Status</p>
      </div>
      <div className="flex-1 text-center">
        <p className="text-center opacity-50">Extras</p>
      </div>
      <div className="flex flex-1 justify-around gap-4">
        <p className="text-center opacity-50">Housekeeper</p>
        <p className="text-center opacity-50">Supervisor</p>
      </div>
    </div>
  );
};

export default RoomHeader;
