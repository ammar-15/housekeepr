import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import RoomList from "../RoomList.tsx";
import { PageHeader, PageShell } from "../ui/Page.tsx";
import { awaitingInspection, countStaff, useRooms } from "../../lib/rooms.ts";

const AdminSUP = () => {
  const { rooms, loaded } = useRooms();
  const cleanRooms = useMemo(
    () =>
      rooms.filter(
        (room) =>
          room.roomStatus === "Clean" ||
          room.roomStatus === "CHECK" ||
          room.coStatus === "INSPECTED"
      ),
    [rooms]
  );

  const stats = {
    "Total Supervisors": countStaff(cleanRooms, "assignedtoSUP", "SUP"),
    "Total Rooms to Inspect": rooms.filter(awaitingInspection).length,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Supervisors"
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={cleanRooms}
        loaded={loaded}
      />
      <AdminStart />
    </PageShell>
  );
};

export default AdminSUP;
