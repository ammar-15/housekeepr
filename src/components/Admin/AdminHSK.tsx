import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminStart from "./Admin Button/AdminStart";
import StatsHeader from "../StatsHeader";
import RoomList from "../RoomList.tsx";
import { PageHeader, PageShell } from "../ui/Page.tsx";
import { countStaff, needsCleaning, useRooms } from "../../lib/rooms.ts";

const AdminHSK = () => {
  const { rooms, loaded } = useRooms();
  const dirtyRooms = useMemo(() => rooms.filter(needsCleaning), [rooms]);

  const stats = {
    "Total Housekeepers": countStaff(dirtyRooms, "assignedtoHSK", "HSK"),
    "Total Rooms to Clean": dirtyRooms.length,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Housekeepers"
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={dirtyRooms}
        loaded={loaded}
      />
      <AdminStart />
    </PageShell>
  );
};

export default AdminHSK;
