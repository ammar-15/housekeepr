import { useEffect, useState } from "react";
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

type RoomAssignment = {
  currentRoom?: RoomData;
  previousRoom?: RoomData;
};

type Stats = {
  "Dirty Rooms": number;
  "Clean Rooms": number;
  "Inspected Rooms": number;
};

const AdminDashboard = () => {
  const [housekeeperRooms, setHousekeeperRooms] = useState<
    Record<string, RoomAssignment>
  >({});
  const [supervisorRooms, setSupervisorRooms] = useState<
    Record<string, RoomAssignment>
  >({});
  const [stats, setStats] = useState<Stats>({
    "Dirty Rooms": 0,
    "Clean Rooms": 0,
    "Inspected Rooms": 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "AdminHSK"), (snapshot) => {
      const rooms: RoomData[] = snapshot.docs.map(
        (doc) => doc.data() as RoomData
      );
      const updatedHSK: Record<string, RoomAssignment> = {};
      const updatedSUP: Record<string, RoomAssignment> = {};

      let dirty = 0,
        clean = 0,
        inspected = 0;

        rooms.forEach((room) => {
          const { assignedtoHSK, assignedtoSUP, roomStatus, coStatus, time_stamp } = room;
          const timestamp = time_stamp ?? "0000-00-00T00:00:00.000Z";
        
          if (roomStatus === "Dirty" || roomStatus === "ON CHANGE") dirty++;
          if (roomStatus === "Clean" && coStatus !== "INSPECTED") clean++;
          if (roomStatus === "INSPECTED") inspected++;
        
          if (assignedtoHSK) {
            if (!updatedHSK[assignedtoHSK]) updatedHSK[assignedtoHSK] = {};
            if (roomStatus === "ON CHANGE") {
              const current = updatedHSK[assignedtoHSK].currentRoom;
              if (!current || (timestamp > (current.time_stamp ?? ""))) {
                updatedHSK[assignedtoHSK].currentRoom = room;
              }
            }
        
            if (roomStatus === "Clean" && coStatus === "VACANT") {
              const previous = updatedHSK[assignedtoHSK].previousRoom;
              if (!previous || (timestamp > (previous.time_stamp ?? ""))) {
                updatedHSK[assignedtoHSK].previousRoom = room;
              }
            }
          }
        
          if (assignedtoSUP) {
            if (!updatedSUP[assignedtoSUP]) updatedSUP[assignedtoSUP] = {};
          
            const current = updatedSUP[assignedtoSUP].currentRoom;
            const previous = updatedSUP[assignedtoSUP].previousRoom;
          
            if (coStatus === "CHECK" && roomStatus === "Clean") {
              if (!current || (timestamp > (current.time_stamp ?? ""))) {
                updatedSUP[assignedtoSUP].currentRoom = room;
              }
            }
          
            if (coStatus === "INSPECTED" && roomStatus === "Clean") {
              if (!previous || (timestamp > (previous.time_stamp ?? ""))) {
                updatedSUP[assignedtoSUP].previousRoom = room;
                updatedSUP[assignedtoSUP].currentRoom = undefined;
              }
            }
          }
        });

      setHousekeeperRooms(updatedHSK);
      setSupervisorRooms(updatedSUP);
      setStats({
        "Dirty Rooms": dirty,
        "Clean Rooms": clean,
        "Inspected Rooms": inspected,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container flex flex-col px-8 sm:px-6 md:px-10 py-11p">
      <AdminNavbar />
      <div className="dashboard-header flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl text-wine">Dashboard</h1>
        <StatsHeader stats={stats} />
      </div>

      <div className="section-container">
        <h2 className="text-lg pt-2 pb-2 text-wine">Housekeepers</h2>
        <div className="flex flex-wrap gap-5 pb-5">
          {Object.entries(housekeeperRooms).map(([hsk, data]) => (
            <div key={hsk} className="p-4 bg-pearl rounded-md shadow-md w-40">
              <h2 className="text-lg font-bold text-center">{hsk}</h2>
              <div className="text-center">
                <p className="text-sm">Previous Room</p>
                {data.previousRoom ? (
                  <p className="font-semibold">
                    {data.previousRoom.roomNumber} -{" "}
                    {data.previousRoom.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
                <p className="text-sm mt-3">Current Room</p>
                {data.currentRoom ? (
                  <p className="font-semibold">
                    {data.currentRoom.roomNumber} - {data.currentRoom.roomType}
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
        <h2 className="text-lg pt-2 pb-2 text-wine">Supervisors</h2>
        <div className="flex flex-wrap gap-5 pb-5">
          {Object.entries(supervisorRooms).map(([sup, data]) => (
            <div key={sup} className="p-4 bg-pearl rounded-md shadow-md w-40">
              <h2 className="text-lg font-bold text-center">{sup}</h2>
              <div className="text-center">
                <p className="text-sm">Previous Room</p>
                {data.previousRoom ? (
                  <p className="font-semibold">
                    {data.previousRoom.roomNumber} -{" "}
                    {data.previousRoom.roomType}
                  </p>
                ) : (
                  <p className="text-dustyblue">None</p>
                )}
                <p className="text-sm mt-3">Current Room</p>
                {data.currentRoom ? (
                  <p className="font-semibold">
                    {data.currentRoom.roomNumber} - {data.currentRoom.roomType}
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
