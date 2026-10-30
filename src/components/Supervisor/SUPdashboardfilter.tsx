import { useMemo } from "react";
import SUPNavbar from "./SUPNavbar";
import RoomList from "../RoomList.tsx";
import StatsHeader from "../StatsHeader.tsx";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page.tsx";
import { isInspected, staffLabel, useRooms } from "../../lib/rooms.ts";
import { formatToday } from "../../lib/format.ts";

interface SUPdashboardfilterProps {
  assignedtoSUP: string;
}

const SUPdashboardfilter = ({ assignedtoSUP }: SUPdashboardfilterProps) => {
  const { rooms, loaded, syncedAt } = useRooms();

  const assignedRooms = useMemo(
    () =>
      rooms.filter(
        (room) => room.roomStatus === "Clean" && room.assignedtoSUP === assignedtoSUP
      ),
    [rooms, assignedtoSUP]
  );
  const inspected = assignedRooms.filter(isInspected).length;

  const stats = {
    "To inspect": assignedRooms.length - inspected,
    Inspected: inspected,
  };

  return (
    <PageShell nav={<SUPNavbar assignedtoSUP={assignedtoSUP} />}>
      <PageHeader
        eyebrow={`${staffLabel(assignedtoSUP)} · ${formatToday()}`}
        title="Inspections"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={assignedRooms}
        loaded={loaded}
        emptyLabel="No rooms ready for inspection"
        emptyHint="Rooms show up here once your housekeepers mark them clean."
      />
    </PageShell>
  );
};

export default SUPdashboardfilter;
