import { useMemo } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminStart from "./Admin Button/AdminStart";
import DayProgress from "./DayProgress";
import StatsHeader from "../StatsHeader";
import { PageHeader, PageShell, SyncStatus } from "../ui/Page";
import { Room, isInspected, isStaffCode, staffLabel, useRooms } from "../../lib/rooms";
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
    <span>
      <span className="font-mono font-semibold tabular-nums">{room.roomNumber}</span>
      <span className="ml-1.5 font-mono text-xs text-chocolate/50">{room.roomType}</span>
    </span>
  ) : (
    <span className="text-chocolate/35">—</span>
  );

const StaffCard = ({
  staff,
  activeLabel,
  activeTone,
  doneLabel,
}: {
  staff: StaffSummary;
  activeLabel: string;
  activeTone: string;
  doneLabel: string;
}) => {
  const progress = percent(staff.done, staff.total);

  return (
    <article className="flex flex-col rounded-lg border border-line bg-pearl p-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] text-chocolate/45">{staff.code}</p>
          <h3 className="font-medium">{staffLabel(staff.code)}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-xs text-chocolate/75 ring-1 ring-line">
          <span
            className={`h-1.5 w-1.5 rounded-full ${staff.currentRoom ? activeTone : "bg-dustyblue"}`}
            aria-hidden
          />
          {staff.currentRoom ? `${activeLabel} ${staff.currentRoom.roomNumber}` : "Between rooms"}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.1em] text-chocolate/50">Previous</dt>
          <dd className="mt-0.5">
            <RoomRef room={staff.previousRoom} />
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.1em] text-chocolate/50">Current</dt>
          <dd className="mt-0.5">
            <RoomRef room={staff.currentRoom} />
          </dd>
        </div>
      </dl>

      <footer className="mt-auto pt-4">
        <div className="flex justify-between text-xs text-chocolate/60">
          <span>
            {staff.done} of {staff.total} {doneLabel}
          </span>
          <span className="font-mono tabular-nums">{progress}%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-clay transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </article>
  );
};

const StaffSection = ({
  title,
  staff,
  empty,
  ...cardProps
}: {
  title: string;
  staff: StaffSummary[];
  empty: string;
  activeLabel: string;
  activeTone: string;
  doneLabel: string;
}) => (
  <section className="section-container">
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="font-display text-xl text-wine">{title}</h2>
      <span className="font-mono text-xs text-chocolate/45">{staff.length} on shift</span>
    </div>
    {staff.length > 0 ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {staff.map((member) => (
          <StaffCard key={member.code} staff={member} {...cardProps} />
        ))}
      </div>
    ) : (
      <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-chocolate/55">
        {empty}
      </p>
    )}
  </section>
);

const AdminDashboard = () => {
  const { rooms, loaded, syncedAt } = useRooms();

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
    Dirty: counts.dirty + counts.onChange,
    Clean: counts.clean,
    Inspected: counts.inspected,
  };

  return (
    <PageShell nav={<AdminNavbar />}>
      <PageHeader
        title="Dashboard"
        meta={<SyncStatus syncedAt={syncedAt} />}
        actions={<StatsHeader stats={stats} />}
      />

      <div className="mt-6 flex flex-col gap-10">
        <DayProgress loaded={loaded} {...counts} />
        <StaffSection
          title="Housekeepers"
          staff={housekeepers}
          empty="No housekeepers have rooms yet."
          activeLabel="In"
          activeTone="bg-orange"
          doneLabel="cleaned"
        />
        <StaffSection
          title="Supervisors"
          staff={supervisors}
          empty="No supervisors have rooms yet."
          activeLabel="Checking"
          activeTone="bg-lightgreen"
          doneLabel="inspected"
        />
      </div>

      <AdminStart />
    </PageShell>
  );
};

export default AdminDashboard;
