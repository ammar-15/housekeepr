import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";

export interface RoomData {
  assignedtoHSK?: string;
  assignedtoSUP?: string;
  roomNumber: string;
  roomType?: string;
  roomStatus?: string;
  coStatus?: string;
  time_stamp?: string;
}

let globalLastAssignedHSK: { [roomNumber: string]: string } = {};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    dirtyRooms: 0,
    cleanRooms: 0,
    inspectedRooms: 0,
  });

  const [housekeeperRooms, setHousekeeperRooms] = useState<{
    [hsk: string]: { previousRoom?: RoomData; currentRoom?: RoomData };
  }>({});

  const [supervisorRooms, setSupervisorRooms] = useState<{
    [sup: string]: { previousRoom?: RoomData; currentRoom?: RoomData };
  }>({});

  useEffect(() => {
    const roomsCollectionRef = collection(db, "AdminHSK");
    const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
      const roomsData: RoomData[] = snapshot.docs.map((doc) => ({
        assignedtoHSK: doc.data().assignedtoHSK || "",
        assignedtoSUP: doc.data().assignedtoSUP || "",
        roomNumber: doc.data().roomNumber || "",
        roomType: doc.data().roomType || "",
        roomStatus: doc.data().roomStatus || "",
        coStatus: doc.data().coStatus || "",
        time_stamp: doc.data().time_stamp || "",
      }));

      const updatedHousekeeperRooms: {
        [hsk: string]: { previousRoom?: RoomData; currentRoom?: RoomData };
      } = {};
      const updatedSupervisorRooms: {
        [sup: string]: { previousRoom?: RoomData; currentRoom?: RoomData };
      } = {};

      const newGlobalLastAssigned = { ...globalLastAssignedHSK };

      roomsData.forEach((room) => {
        if (room.assignedtoHSK) {
          if (!updatedHousekeeperRooms[room.assignedtoHSK]) {
            updatedHousekeeperRooms[room.assignedtoHSK] = {};
          }
          if (room.roomStatus === "ON CHANGE") {
            updatedHousekeeperRooms[room.assignedtoHSK].currentRoom = room;
            newGlobalLastAssigned[room.roomNumber] = room.assignedtoHSK;
          } else if (room.roomStatus === "Clean") {
            const lastHSK = newGlobalLastAssigned[room.roomNumber];
            if (lastHSK) {
              if (!updatedHousekeeperRooms[lastHSK]) {
                updatedHousekeeperRooms[lastHSK] = {};
              }
              updatedHousekeeperRooms[lastHSK].previousRoom = room;
            }
          }
        }
        if (room.assignedtoSUP) {
          if (!updatedSupervisorRooms[room.assignedtoSUP]) {
            updatedSupervisorRooms[room.assignedtoSUP] = {};
          }
          if (room.coStatus === "INSPECTED") {
            updatedSupervisorRooms[room.assignedtoSUP].previousRoom = room;
          } 
          else if (room.roomStatus === "Clean") {
            updatedSupervisorRooms[room.assignedtoSUP].currentRoom = room;
          }
        }
      });
      setHousekeeperRooms(updatedHousekeeperRooms);
      setSupervisorRooms(updatedSupervisorRooms);
      globalLastAssignedHSK = newGlobalLastAssigned;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-20 px-10">
      <StatsHeader onStatsUpdate={setStats} />
      <div className="AdminNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Dashboard</h1>
        <div className="dashboard-stats flex bg-clay text-white rounded-md px-3 py-1.5">
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
      </div>

      <div className="section-container">
        <h2 className="housekeeperheader-admin text-lg pb-5">Housekeepers</h2>
        <div className="housekeepers-container gap-5 flex pb-5">
          {Object.keys(housekeeperRooms).map((hskKey) => (
            <div
              key={hskKey}
              className="hsk-container p-4 bg-white rounded-md shadow-md w-40"
            >
              <h2 className="text-lg font-bold text-center">{hskKey}</h2>
              <div className="hsk-details text-center">
                <p className="text-sm">Previous Room</p>
                {housekeeperRooms[hskKey].previousRoom ? (
                  <p className="font-semibold">
                    {housekeeperRooms[hskKey].previousRoom?.roomNumber} -{" "}
                    {housekeeperRooms[hskKey].previousRoom?.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
                <p className="text-sm mt-3">Current Room</p>
                {housekeeperRooms[hskKey].currentRoom ? (
                  <p className="font-semibold">
                    {housekeeperRooms[hskKey].currentRoom?.roomNumber} -{" "}
                    {housekeeperRooms[hskKey].currentRoom?.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-container">
        <h2 className="supervisorheader-admin text-lg pb-5">Supervisors</h2>
        <div className="supervisors-container gap-5 flex pb-5">
          {Object.keys(supervisorRooms).map((supKey) => (
            <div
              key={supKey}
              className="sup-container p-4 bg-white rounded-md shadow-md w-40"
            >
              <h2 className="text-lg font-bold text-center">{supKey}</h2>
              <div className="sup-details text-center">
                <p className="text-sm">Previous Room</p>
                {supervisorRooms[supKey].previousRoom ? (
                  <p className="font-semibold">
                    {supervisorRooms[supKey].previousRoom?.roomNumber} -{" "}
                    {supervisorRooms[supKey].previousRoom?.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
                <p className="text-sm mt-3">Current Room</p>
                {supervisorRooms[supKey].currentRoom ? (
                  <p className="font-semibold">
                    {supervisorRooms[supKey].currentRoom?.roomNumber} -{" "}
                    {supervisorRooms[supKey].currentRoom?.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminDashboard;
