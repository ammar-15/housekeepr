import { useState, useEffect, useRef } from "react";
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
}

type RoomAssignment = { previousRoom?: RoomData; currentRoom?: RoomData };

const AdminDashboard = () => {
  const [housekeeperRooms, setHousekeeperRooms] = useState<{
    [hsk: string]: RoomAssignment;
  }>(() => {
    const HSKstoredData = sessionStorage.getItem("housekeeperRooms");
    return HSKstoredData ? JSON.parse(HSKstoredData) : {};
  });
  const [supervisorRooms, setSupervisorRooms] = useState<{
    [sup: string]: RoomAssignment;
  }>(() =>{
    const SUPstoredData = sessionStorage.getItem("supervisorRooms");
    return SUPstoredData ? JSON.parse(SUPstoredData) : {};
  });
  const [stats, setStats] = useState({
    dirtyRooms: 0,
    cleanRooms: 0,
    inspectedRooms: 0,
  });

  const lastAssignedHSKRef = useRef<Record<string, string>>({});
  const lastAssignedSUPRef = useRef<Record<string, string>>({});

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
      }));

      const dirtyRooms = roomsData.filter(
        (room) => room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE"
      ).length;
      const cleanRooms = roomsData.filter(
        (room) => room.roomStatus === "Clean" && room.coStatus !== "INSPECTED"
      ).length;
      const inspectedRooms = roomsData.filter(
        (room) => room.coStatus === "INSPECTED"
      ).length;

      const result = roomsData.reduce(
        (acc, room) => {
          const {
            assignedtoHSK,
            assignedtoSUP,
            roomStatus,
            coStatus,
            roomNumber,
          } = room;

          if (assignedtoHSK) {
            if (!acc.updatedHousekeeperRooms[assignedtoHSK]) {
              acc.updatedHousekeeperRooms[assignedtoHSK] = {};
            }

            if (roomStatus === "ON CHANGE") {
              acc.updatedHousekeeperRooms[assignedtoHSK].currentRoom = room;
              acc.HSKnewLastAssigned[roomNumber] = assignedtoHSK;
            } else if (roomStatus === "Clean") {
              const originalHSK = acc.HSKnewLastAssigned[roomNumber];
              if (originalHSK) {
                if (!acc.updatedHousekeeperRooms[originalHSK]) {
                  acc.updatedHousekeeperRooms[originalHSK] = {};
                }
                acc.updatedHousekeeperRooms[originalHSK].previousRoom = room;
              }
            }
          }

          if (assignedtoSUP) {
            if (!acc.updatedSupervisorRooms[assignedtoSUP]) {
              acc.updatedSupervisorRooms[assignedtoSUP] = {};
            }

            if (roomStatus === "Clean" && coStatus !== "INSPECTED") {
              acc.updatedSupervisorRooms[assignedtoSUP].currentRoom = room;
              acc.SUPnewLastAssigned[roomNumber] = assignedtoSUP;
            } else if (roomStatus === "Clean" && coStatus === "INSPECTED") {
              const originalSUP = acc.SUPnewLastAssigned[roomNumber];
              if (originalSUP) {
                if (!acc.updatedSupervisorRooms[originalSUP]) {
                  acc.updatedSupervisorRooms[originalSUP] = {};
                }
                acc.updatedSupervisorRooms[originalSUP].previousRoom = room;
              }
            }
          }

          return acc;
        },
        {
          updatedHousekeeperRooms: JSON.parse(
            sessionStorage.getItem("housekeeperRooms") || "{}"
          ),
          updatedSupervisorRooms: JSON.parse(
            sessionStorage.getItem("supervisorRooms") || "{}"
          ),
          HSKnewLastAssigned: { ...lastAssignedHSKRef.current },
          SUPnewLastAssigned: { ...lastAssignedSUPRef.current },

        }
      );

      sessionStorage.setItem(
        "housekeeperRooms",
        JSON.stringify(result.updatedHousekeeperRooms)
      );
      setStats({ dirtyRooms, cleanRooms, inspectedRooms });
      setHousekeeperRooms(result.updatedHousekeeperRooms);
      setSupervisorRooms(result.updatedSupervisorRooms);
      lastAssignedHSKRef.current = result.HSKnewLastAssigned;
      lastAssignedSUPRef.current = result.SUPnewLastAssigned;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col m-0 py-11p px-10">
      <div className="AdminNav">
        <AdminNavbar />
      </div>
      <div className="dashboard-header flex justify-between items-center m-0 mb-10">
        <h1 className="text-3xl text-wine">Dashboard</h1>
        <StatsHeader pagename="AdminDashboard" stats={stats} />
      </div>

      <div className="section-container">
        <h2 className="housekeeperheader-admin text-lg pb-5">Housekeepers</h2>
        {Object.keys(housekeeperRooms).length > 0 ? (
          <div className="housekeepers-container gap-5 flex pb-5">
            {Object.keys(housekeeperRooms).map((hskKey) => (
              <div
                key={hskKey}
                className="hsk-container p-4 bg-pearl rounded-md shadow-md w-40"
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
        ) : (
          <div className="text-left text-gray text-lg mb-5">No rooms</div>
        )}
      </div>
      <div className="section-container">
        <h2 className="supervisorheader-admin text-lg pb-5">Supervisors</h2>
        {Object.keys(supervisorRooms).length > 0 ? (
          <div className="supervisors-container gap-5 flex pb-5">
            {Object.keys(supervisorRooms).map((supKey) => (
              <div
                key={supKey}
                className="sup-container p-4 bg-pearl rounded-md shadow-md w-40"
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
        ) : (
          <div className="text-left text-gray text-lg mb-3">No rooms</div>
        )}
      </div>
      <AdminStart />
    </div>
  );
};

export default AdminDashboard;
