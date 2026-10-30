import { useMemo } from "react";
import HSKNavbar from "./HSKNavbar";
import RoomList from "../RoomList.tsx";
import StatsHeader from "../StatsHeader.tsx";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page.tsx";
import { needsCleaning, staffLabel, useRooms } from "../../lib/rooms.ts";
import { formatToday } from "../../lib/format.ts";

interface HSKdashboardfilterProps {
  assignedtoHSK: string;
}

const HSKdashboardfilter = ({ assignedtoHSK }: HSKdashboardfilterProps) => {
  const { rooms, loaded, syncedAt } = useRooms();

  const assignedRooms = useMemo(
    () => rooms.filter((room) => room.assignedtoHSK === assignedtoHSK),
    [rooms, assignedtoHSK]
  );
  const toClean = useMemo(() => assignedRooms.filter(needsCleaning), [assignedRooms]);

  const workload = toClean.reduce(
    (sum, room) => sum + (parseFloat(String(room.workload ?? 0)) || 0),
    0
  );

  const stats = {
    "To clean": toClean.length,
    Done: assignedRooms.length - toClean.length,
    Workload: workload.toFixed(1),
  };

  return (
    <PageShell nav={<HSKNavbar assignedtoHSK={assignedtoHSK} />}>
      <PageHeader
        eyebrow={`${staffLabel(assignedtoHSK)} · ${formatToday()}`}
        title="My rooms"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={toClean}
        loaded={loaded}
        emptyLabel="Nothing left to clean"
        emptyHint="New rooms appear here as soon as they're assigned to you."
      />
    </PageShell>
  );
};

export default HSKdashboardfilter;
