import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import RoomList from "../RoomList.tsx";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page.tsx";
import { countStaff, needsCleaning, useRooms } from "../../lib/rooms.ts";

const AdminHSK = () => {
  const { rooms, loaded, syncedAt } = useRooms();
  const dirtyRooms = useMemo(() => rooms.filter(needsCleaning), [rooms]);

  const stats = {
    Housekeepers: countStaff(dirtyRooms, "assignedtoHSK", "HSK"),
    "To clean": dirtyRooms.length,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Housekeepers"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={dirtyRooms}
        loaded={loaded}
        emptyLabel="Every room is clean"
        emptyHint="Dirty and on-change rooms show up here until a housekeeper marks them clean."
      />
      <AdminStart />
    </PageShell>
  );
};

export default AdminHSK;
