import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import HSKRoomContainer from "./HSKRoomContainer";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";
import sortIcon from "../assets/sort.svg"; 

const AdminSUP = () => {
  const [SUProoms, setSUProoms] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<string | null>(null); 
  const [isSortingVisible, setIsSortingVisible] = useState(false); 

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const allRooms = snapshot.docs.map((doc) => doc.data());
      const cleanRooms = allRooms.filter((room) => (room.roomStatus === "Clean" || room.coStatus === "INSPECTED")); 
      setSUProoms(cleanRooms);
    });
    return () => unsubscribe();
  }, []);

  const sortRooms = (rooms: any[], option: string | null) => {
    switch (option) {
      case "recent":
        return rooms.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)); 
      case "ascending":
        return rooms.sort((a, b) => a.roomNumber - b.roomNumber); 
      case "descending":
        return rooms.sort((a, b) => b.roomNumber - a.roomNumber); 
      default:
        return rooms;
    }
  };

  const toggleSorting = () => {
    setIsSortingVisible((prev) => !prev);
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option); 
    setIsSortingVisible(false); 
  };

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <AdminNavbar />
      <div className="dashboard-header flex justify-between items-center m-0 mb-5">
        <h1 className="text-3xl text-wine">Supervisors</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">Total Supervisors: 12</div>
          <div className="stats-box px-2">Total Rooms to Inspect: {SUProoms.length}</div>
        </div>
      </div>
      <div className="sort-container flex justify-end relative">
        <button
          className="bg-transparent border-none cursor-pointer"
          onClick={toggleSorting}
        >
          <img src={sortIcon} alt="Sort" className="w-5 h-5" />
        </button>
        {isSortingVisible && (
          <div className="absolute right-0 mt-5 bg-white border rounded-md shadow-lg">
            <ul className="list-none p-2">
              <li className="cursor-pointer" onClick={() => handleSortOptionChange("recent")}>
                Recent
              </li>
              <li className="cursor-pointer" onClick={() => handleSortOptionChange("ascending")}>
                Ascending
              </li>
              <li className="cursor-pointer" onClick={() => handleSortOptionChange("descending")}>
                Descending
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="section-container">
        {SUProoms.length > 0 ? (sortRooms(SUProoms, sortOption).map((room, index) => (
          <HSKRoomContainer key={index} room={room} />
        ))) : (
          <div className="text-center text-gray text-lg mt-10 animate-bounce">
            No rooms
          </div>
        )}
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminSUP;
