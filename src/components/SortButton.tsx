import { useState } from "react";
import sortIcon from ".sort.svg"; 


const SortButton = () => {
    const [sortOption, setSortOption] = useState<string | null>(null); 
    const [isSortingVisible, setIsSortingVisible] = useState(false); 

  const toggleSorting = () => {
    setIsSortingVisible((prev) => !prev);
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option); 
    setIsSortingVisible(false); 
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
      <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
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