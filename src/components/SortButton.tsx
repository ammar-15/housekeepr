import { useState, useEffect, useRef } from "react";
import sortIcon from "../components/assets/sort.svg";

interface SortButtonProps {
  rooms: any[];
  onSortedRooms: (sortedRooms: any[]) => void;
  sortProps?: string[];
}

const SortButton = ({
  rooms = [],
  onSortedRooms = () => {},
  sortProps = ["recent", "oldest", "ascending", "descending"],
}: SortButtonProps) => {
  const [isSortingVisible, setIsSortingVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>("recent");
  const [sortedRooms, setSortedRooms] = useState<any[]>(rooms);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setSortedRooms(sortRooms(rooms, sortOption));
  }, [rooms, sortOption]);

  const sortRooms = (rooms: any[], option: string | null) => {
    switch (option) {
      case "recent":
        return [...rooms].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      case "oldest":
        return [...rooms].sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      case "ascending":
        return [...rooms].sort((a, b) =>
          a.roomNumber.localeCompare(b.roomNumber)
        );
      case "descending":
        return [...rooms].sort((a, b) =>
          b.roomNumber.localeCompare(a.roomNumber)
        );
      default:
        return rooms;
    }
  };

  const toggleSorting = () => { 
    setIsSortingVisible((prev) => !prev);
  };

  const handleSortOptionChange = (option: string) => {
    setIsSortingVisible(false);
    setSortOption(option);
  };

  useEffect(() => {
    onSortedRooms(sortedRooms); 
  }, [sortedRooms]); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortingVisible(false);
      }
    };

    if (isSortingVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortingVisible]);

  return (
    <div className="sort-container flex justify-end relative mb-2 sm:mb-0" ref={dropdownRef}>
      <button
        className="bg-transparent border-none cursor-pointer"
        onClick={toggleSorting}
      >
        <img src={sortIcon} alt="Sort" className="w-5 h-5" />
      </button>

      {isSortingVisible && (
        <div className="absolute right-0 mt-5 bg-white rounded-md shadow-lg z-10">
          <ul className="list-none p-2">
            {sortProps.includes("recent") && (
              <li
                className="cursor-pointer text-center w-3r p-1 rounded-md hover:bg-mistysky"
                onClick={() => handleSortOptionChange("recent")}
              >
                Recent
              </li>
            )}
            {sortProps.includes("oldest") && (
              <li
                className="cursor-pointer text-center w-3r p-1 rounded-md hover:bg-mistysky"
                onClick={() => handleSortOptionChange("oldest")}
              >
                Oldest
              </li>
            )}
            {sortProps.includes("ascending") && (
              <li
                className="cursor-pointer text-center w-3r p-1 rounded-md hover:bg-mistysky"
                onClick={() => handleSortOptionChange("ascending")}
              >
                Ascending
              </li>
            )}
            {sortProps.includes("descending") && (
              <li
                className="cursor-pointer text-center w-3r p-1 rounded-md hover:bg-mistysky"
                onClick={() => handleSortOptionChange("descending")}
              >
                Descending
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortButton;
