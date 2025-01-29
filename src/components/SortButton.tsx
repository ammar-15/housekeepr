import { useState } from "react";
import sortIcon from "../components/assets/sort.svg"; 

interface SortButtonProps {
  rooms: any[];  
  onSortedRooms: (sortedRooms: any[]) => void;  
}

const SortButton = ({ rooms = [], onSortedRooms = () => {} }: SortButtonProps) => {
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  const sortRooms = (rooms: any[], option: string | null) => {
    switch (option) {
      case "recent":
        return [...rooms].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      case "ascending":
        return [...rooms].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
      case "descending":
        return [...rooms].sort((a, b) => b.roomNumber.localeCompare(a.roomNumber));
      default:
        return rooms;
    }
  };

  const toggleSorting = () => {
    setIsSortingVisible((prev) => !prev);
  };

  const handleSortOptionChange = (option: string) => {
    setIsSortingVisible(false);
    onSortedRooms(sortRooms(rooms, option));
  };

  return (
    <div className="sort-container flex justify-end relative">
      <button
        className="bg-transparent border-none cursor-pointer"
        onClick={toggleSorting}
      >
        <img src={sortIcon} alt="Sort" className="w-5 h-5" />
      </button>

      {isSortingVisible && (
        <div className="absolute right-0 mt-5 bg-white border border-gray-300 rounded-md shadow-lg">
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
  );
};

export default SortButton;
