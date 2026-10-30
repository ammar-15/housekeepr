import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import RoomList from "../RoomList.tsx";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page.tsx";
import { awaitingInspection, countStaff, useRooms } from "../../lib/rooms.ts";

const AdminSUP = () => {
  const { rooms, loaded, syncedAt } = useRooms();
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
    Supervisors: countStaff(cleanRooms, "assignedtoSUP", "SUP"),
    "To inspect": rooms.filter(awaitingInspection).length,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Supervisors"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={cleanRooms}
        loaded={loaded}
        emptyLabel="Nothing to inspect yet"
        emptyHint="Rooms land here once a housekeeper marks them clean."
      />
      <AdminStart />
    </PageShell>
  );
};

export default AdminSUP;
