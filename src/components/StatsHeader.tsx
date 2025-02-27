import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface StatsData {
  totalHousekeepers: number;
  totalSupervisors: number;
  totalRoomsToClean: number;
  totalRoomsToInspect: number;
  totalRooms: number;
  dirtyRooms: number;
  cleanRooms: number;
  inspectedRooms: number;
}

interface StatsHeaderProps {
  pagename: string;
  displayedRooms?: any[];
}

const StatsHeader = ({ pagename, displayedRooms = [] }: StatsHeaderProps) => {
  const [stats, setStats] = useState<StatsData>({
    totalHousekeepers: 0,
    totalSupervisors: 0,
    totalRoomsToClean: 0,
    totalRoomsToInspect: 0,
    totalRooms: 0,
    dirtyRooms: 0,
    cleanRooms: 0,
    inspectedRooms: 0,
  });

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");

    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => doc.data());

      const maxHousekeeper = roomsData.reduce((max, room) => {
        if (room.assignedtoHSK && room.assignedtoHSK.startsWith("HSK")) {
          const num = parseInt(room.assignedtoHSK.replace("HSK", ""), 10);
          return num > max ? num : max;
        } else {
          console.log("maxHousekeeper can't find a room assigned to HSK");
        }
        return max;
      }, 0);

      const maxSupervisor = roomsData.reduce((max, room) => {
        if (room.assignedtoSUP && room.assignedtoSUP.startsWith("SUP")) {
          const num = parseInt(room.assignedtoSUP.replace("SUP", ""), 10);
          return num > max ? num : max;
        } else {
          console.log("maxSupervisor can't find a room assigned to SUP");
        }
        return max;
      }, 0);

      const totalRooms = roomsData.length;
      const dirtyRooms = roomsData.filter(
        ((room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE")
      ).length;
      const cleanRooms = roomsData.filter(
        (room) => room.roomStatus === "Clean" && room.coStatus !== "INSPECTED"
      ).length;
      const inspectedRooms = roomsData.filter(
        (room) => room.coStatus === "INSPECTED"
      ).length;
      const HSKfilterrooms = displayedRooms.filter(
        ((room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE")
      ).length;
      const SUPfilterrooms = displayedRooms.filter(
        (room) => room.roomStatus === "Clean"
      ).length;

      const updatedStats = {
        totalHousekeepers: maxHousekeeper,
        totalSupervisors: maxSupervisor,
        totalRoomsToClean: HSKfilterrooms,
        totalRoomsToInspect: SUPfilterrooms,
        totalRooms,
        dirtyRooms,
        cleanRooms,
        inspectedRooms,
      };

      setStats(updatedStats);
    });

    return () => unsubscribe();
  }, [displayedRooms]);

  return (
    <div className="dashboard-stats ">
      {pagename === "AdminDashboard" && (
        <div className="stats-dashoard flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Dirty Rooms: {stats.dirtyRooms}</span>
          </div>
          <div className="stats-box px-2">
            <span>Clean Rooms: {stats.cleanRooms}</span>
          </div>
          <div className="stats-box px-2">
            <span>Inspected Rooms: {stats.inspectedRooms}</span>
          </div>
        </div>
      )}

      {pagename === "AdminHSK" && (
        <div className="stats-HSK flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Housekeepers: {stats.totalHousekeepers}</span>
          </div>
          <div className="stats-box px-2">
            <span>Total Rooms to Clean: {stats.totalRoomsToClean}</span>
          </div>
        </div>
      )}

      {pagename === "AdminSUP" && (
        <div className="stats-HSK flex bg-clay text-white rounded-md px-3 py-1.5">
          <div className="stats-box px-2">
            <span>Total Supervisors: {stats.totalSupervisors}</span>
          </div>
          <div className="stats-box px-2">
            <span>Total Rooms to Clean: {stats.totalRoomsToInspect}</span>
          </div>
        </div>
      )}

      {pagename === "AdminRooms" && (
        <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
          <span>Total Rooms: {stats.totalRooms}</span>
        </div>
      )}

      {pagename === "HSKfilter" && (
        <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
          <span>Total Rooms to Clean: {stats.totalRoomsToClean}</span>
        </div>
      )}

      {pagename === "SUPfilter" && (
        <div className="stats-box flex bg-clay text-white rounded-md px-5 py-1.5">
          <span>Total Rooms to Inspect: {stats.totalRoomsToInspect}</span>
        </div>
      )}
    </div>
  );
};

export default StatsHeader;
