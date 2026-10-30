import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";
import DayProgress from "./DayProgress";
import StatsHeader from "../StatsHeader";
import { PageHeader, PageShell } from "../ui/Page";
import { Room, isInspected, isStaffCode, useRooms } from "../../lib/rooms";
import { percent } from "../../lib/format";

type StaffSummary = {
  code: string;
  currentRoom?: Room;
  previousRoom?: Room;
  total: number;
  done: number;
};

const newer = (room: Room, than?: Room) =>
  !than || (room.time_stamp ?? "") > (than.time_stamp ?? "");

const byStaffNumber = (a: StaffSummary, b: StaffSummary) =>
  parseInt(a.code.slice(3), 10) - parseInt(b.code.slice(3), 10);

const summarise = (rooms: Room[]) => {
  const housekeepers: Record<string, StaffSummary> = {};
  const supervisors: Record<string, StaffSummary> = {};

  rooms.forEach((room) => {
    const { assignedtoHSK, assignedtoSUP, roomStatus, coStatus } = room;

    if (isStaffCode(assignedtoHSK, "HSK")) {
      const hsk = (housekeepers[assignedtoHSK] ??= { code: assignedtoHSK, total: 0, done: 0 });
      hsk.total++;
      if (roomStatus === "Clean") hsk.done++;
      if (roomStatus === "ON CHANGE" && newer(room, hsk.currentRoom)) hsk.currentRoom = room;
      if (roomStatus === "Clean" && coStatus === "VACANT" && newer(room, hsk.previousRoom)) {
        hsk.previousRoom = room;
      }
    }

    if (isStaffCode(assignedtoSUP, "SUP")) {
      const sup = (supervisors[assignedtoSUP] ??= { code: assignedtoSUP, total: 0, done: 0 });
      sup.total++;
      if (isInspected(room)) sup.done++;
      if (roomStatus === "Clean" && coStatus === "CHECK" && newer(room, sup.currentRoom)) {
        sup.currentRoom = room;
      }
      if (roomStatus === "Clean" && coStatus === "INSPECTED" && newer(room, sup.previousRoom)) {
        sup.previousRoom = room;
      }
    }
  });

  // A supervisor who has signed off a room more recently than they started
  // checking one is between rooms.
  Object.values(supervisors).forEach((sup) => {
    if (sup.currentRoom && sup.previousRoom && !newer(sup.currentRoom, sup.previousRoom)) {
      sup.currentRoom = undefined;
    }
  });

  return {
    housekeepers: Object.values(housekeepers).sort(byStaffNumber),
    supervisors: Object.values(supervisors).sort(byStaffNumber),
  };
};

const RoomRef = ({ room }: { room?: Room }) =>
  room ? (
    <p className="font-semibold">
      {room.roomNumber} - {room.roomType}
    </p>
  ) : (
    <p className="text-dustyblue">None</p>
  );

const StaffCard = ({ staff }: { staff: StaffSummary }) => (
  <div className="flex flex-col rounded-md border border-line bg-pearl p-4 text-center">
    <h3 className="text-lg font-bold">{staff.code}</h3>
    <p className="mt-2 text-sm">Previous Room</p>
    <RoomRef room={staff.previousRoom} />
    <p className="mt-3 text-sm">Current Room</p>
    <RoomRef room={staff.currentRoom} />
    <div className="mt-4 text-xs text-chocolate/60">
      {staff.done}/{staff.total}
    </div>
    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white">
      <div
        className="h-full rounded-full bg-clay transition-[width] duration-500"
        style={{ width: `${percent(staff.done, staff.total)}%` }}
      />
    </div>
  </div>
);

const StaffSection = ({ title, staff }: { title: string; staff: StaffSummary[] }) => (
  <section className="section-container">
    <h2 className="mb-3 text-lg text-wine">{title}</h2>
    {staff.length > 0 ? (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {staff.map((member) => (
          <StaffCard key={member.code} staff={member} />
        ))}
      </div>
    ) : (
      <p className="text-sm text-dustyblue">None</p>
    )}
  </section>
);

const AdminDashboard = () => {
  const { rooms, loaded } = useRooms();

  const counts = useMemo(() => {
    let dirty = 0,
      onChange = 0,
      clean = 0,
      inspected = 0;
    rooms.forEach((room) => {
      if (isInspected(room)) inspected++;
      else if (room.roomStatus === "Dirty") dirty++;
      else if (room.roomStatus === "ON CHANGE") onChange++;
      else if (room.roomStatus === "Clean") clean++;
    });
    return { dirty, onChange, clean, inspected };
  }, [rooms]);

  const { housekeepers, supervisors } = useMemo(() => summarise(rooms), [rooms]);

  const stats = {
    "Dirty Rooms": counts.dirty + counts.onChange,
    "Clean Rooms": counts.clean,
    "Inspected Rooms": counts.inspected,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Dashboard"
        actions={<StatsHeader stats={stats} />}
      />

      <div className="mt-6 flex flex-col gap-8">
        <DayProgress loaded={loaded} {...counts} />
        <StaffSection title="Housekeepers" staff={housekeepers} />
        <StaffSection title="Supervisors" staff={supervisors} />
      </div>

      <AdminStart />
    </PageShell>
  );
};

export default AdminDashboard;
