import { useMemo } from "react";
import SUPNavbar from "./SUPNavbar";
import RoomList from "../RoomList.tsx";
import StatsHeader from "../StatsHeader.tsx";
import { PageHeader, PageShell } from "../ui/Page.tsx";
import { isInspected, useRooms } from "../../lib/rooms.ts";

interface SUPdashboardfilterProps {
  assignedtoSUP: string;
}

const SUPdashboardfilter = ({ assignedtoSUP }: SUPdashboardfilterProps) => {
  const { rooms, loaded } = useRooms();

  const assignedRooms = useMemo(
    () =>
      rooms.filter(
        (room) => room.roomStatus === "Clean" && room.assignedtoSUP === assignedtoSUP
      ),
    [rooms, assignedtoSUP]
  );
  const inspected = assignedRooms.filter(isInspected).length;

  const stats = {
    "Total Rooms to Inspect": assignedRooms.length - inspected,
  };

  return (
    <PageShell nav={<SUPNavbar assignedtoSUP={assignedtoSUP} />}>
      <PageHeader
        title={`${assignedtoSUP}-Dashboard`}
        actions={<StatsHeader stats={stats} />}
      />
      <RoomList
        rooms={assignedRooms}
        loaded={loaded}
      />
    </PageShell>
  );
};

export default SUPdashboardfilter;
