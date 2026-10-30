import { useMemo } from "react";
import HSKNavbar from "./HSKNavbar";
import RoomList from "../RoomList.tsx";
import StatsHeader from "../StatsHeader.tsx";
import { PageHeader, PageShell } from "../ui/Page.tsx";
import { needsCleaning, useRooms } from "../../lib/rooms.ts";

interface HSKdashboardfilterProps {
  assignedtoHSK: string;
}

const HSKdashboardfilter = ({ assignedtoHSK }: HSKdashboardfilterProps) => {
  const { rooms, loaded } = useRooms();

  const assignedRooms = useMemo(
    () => rooms.filter((room) => room.assignedtoHSK === assignedtoHSK),
    [rooms, assignedtoHSK]
  );
  const toClean = useMemo(() => assignedRooms.filter(needsCleaning), [assignedRooms]);

  const stats = {
    "Total Rooms to Clean": toClean.length,
  };

  return (
    <PageShell nav={<HSKNavbar assignedtoHSK={assignedtoHSK} />}>
      <PageHeader
        title={`${assignedtoHSK}-Dashboard`}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={toClean}
        loaded={loaded}
      />
    </PageShell>
  );
};

export default HSKdashboardfilter;
