const RoomHeader = () => {
  return (
    <div className="header-row flex justify-between py-2 ">
      <p className="text-center flex-1 opacity-50">Room Number</p>
      <p className="text-center flex-1 opacity-50">Room Type</p>
      <p className="text-center flex-1 opacity-50">Room Status</p>
      <p className="text-center ml-5 flex-1 opacity-50">C/O Status</p>
      <p className="text-center ml-2 flex-1 opacity-50">Extras</p>
      <p className="text-center flex-1 opacity-50">Housekeeper</p>
      <p className="text-center flex-1 opacity-50">Supervisor</p>
    </div>
  );
};

export default RoomHeader;
