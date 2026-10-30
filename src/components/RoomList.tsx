import { useMemo, useState } from "react";
import EditRoomContainer from "./Admin/EditRoomContainer";
import SortButton from "./SortButton";
import StatusPill from "./ui/StatusPill";
import { inputClass } from "./ui/form";
import { ChevronRight, Search, X } from "./ui/icons";
import { Room, SortOption, floorOf, sortItems } from "../lib/rooms";

interface RoomListProps {
  rooms: Room[];
  loaded: boolean;
  emptyLabel?: string;
  emptyHint?: string;
}

const STATUS_FILTERS = [
  { value: "Dirty", label: "Dirty" },
  { value: "ON CHANGE", label: "On change" },
  { value: "Clean", label: "Clean" },
];

// Shared by the header and every row so the columns line up.
const COLUMNS =
  "lg:grid lg:grid-cols-[4.5rem_4.5rem_7rem_7rem_minmax(0,1fr)_5.5rem_5.5rem_1rem] lg:items-center lg:gap-4";

const assigneeText = (code?: string) => (code && code !== "N/A" ? code : "—");

const FilterChip = ({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors ${
      active
        ? "border-chocolate bg-chocolate text-pearl"
        : "border-line bg-white text-chocolate/75 hover:border-dustyblue hover:text-chocolate"
    }`}
  >
    {label}
    <span className={`font-mono text-xs tabular-nums ${active ? "text-pearl/70" : "text-chocolate/40"}`}>
      {count}
    </span>
  </button>
);

const RoomList = ({
  rooms,
  loaded,
  emptyLabel = "No rooms",
  emptyHint,
}: RoomListProps) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("ascending");
  const [selected, setSelected] = useState<Room | null>(null);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rooms.forEach((room) => {
      counts[room.roomStatus] = (counts[room.roomStatus] ?? 0) + 1;
    });
    return counts;
  }, [rooms]);

  const visibleRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = rooms.filter((room) => {
      if (statusFilter && room.roomStatus !== statusFilter) return false;
      if (!q) return true;
      return [room.roomNumber, room.roomType, room.assignedtoHSK, room.assignedtoSUP, room.extras]
        .some((value) => value?.toLowerCase().includes(q));
    });
    return sortItems(filtered, sortOption);
  }, [rooms, query, statusFilter, sortOption]);

  // Group by floor when sorted by room number; time-based sorts stay flat.
  const groups = useMemo(() => {
    if (sortOption !== "ascending" && sortOption !== "descending") {
      return [{ key: "all", label: null, rooms: visibleRooms }];
    }
    const byFloor = new Map<string, Room[]>();
    visibleRooms.forEach((room) => {
      const floor = floorOf(room.roomNumber);
      byFloor.set(floor, [...(byFloor.get(floor) ?? []), room]);
    });
    return [...byFloor.entries()].map(([floor, floorRooms]) => ({
      key: floor,
      label: `Floor ${floor}`,
      rooms: floorRooms,
    }));
  }, [visibleRooms, sortOption]);

  const clearFilters = () => {
    setQuery("");
    setStatusFilter(null);
  };

  const presentFilters = STATUS_FILTERS.filter((filter) => statusCounts[filter.value]);

  return (
    <section className="section-container">
      <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip
            active={statusFilter === null}
            label="All"
            count={rooms.length}
            onClick={() => setStatusFilter(null)}
          />
          {presentFilters.length > 1 &&
            presentFilters.map((filter) => (
              <FilterChip
                key={filter.value}
                active={statusFilter === filter.value}
                label={filter.label}
                count={statusCounts[filter.value]}
                onClick={() =>
                  setStatusFilter((current) => (current === filter.value ? null : filter.value))
                }
              />
            ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative flex-1 sm:w-64 sm:flex-none">
            <span className="sr-only">Search rooms</span>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-chocolate/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Room, type or staff code"
              className={`${inputClass} pl-8 pr-8`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-chocolate/40 hover:text-chocolate"
              >
                <X width={14} height={14} />
              </button>
            )}
          </label>
          <SortButton value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <div
          className={`room-header hidden border-b border-line bg-pearl px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-chocolate/50 ${COLUMNS}`}
        >
          <span>Room</span>
          <span>Type</span>
          <span>Status</span>
          <span>Check-out</span>
          <span>Extras</span>
          <span>Housekeeper</span>
          <span>Supervisor</span>
          <span />
        </div>

        {!loaded ? (
          <div className="divide-y divide-line" aria-label="Loading rooms">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex animate-pulse items-center gap-4 px-4 py-4">
                <span className="h-4 w-10 rounded bg-pearl" />
                <span className="h-4 w-8 rounded bg-pearl" />
                <span className="ml-auto h-5 w-24 rounded bg-pearl lg:ml-0" />
                <span className="hidden h-5 w-24 rounded bg-pearl lg:block" />
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="font-display text-lg text-chocolate">{emptyLabel}</p>
            {emptyHint && <p className="mt-1 text-sm text-chocolate/55">{emptyHint}</p>}
          </div>
        ) : visibleRooms.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-chocolate/70">
              No rooms match{query ? ` “${query}”` : " this filter"}.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-sm font-medium text-wine underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.key}>
              {group.label && (
                <div className="flex items-center justify-between border-b border-line bg-pearl/60 px-4 py-2 [&:not(:first-child)]:border-t">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-chocolate/70">
                    {group.label}
                  </span>
                  <span className="font-mono text-[11px] text-chocolate/45">
                    {group.rooms.length} {group.rooms.length === 1 ? "room" : "rooms"}
                  </span>
                </div>
              )}
              <ul className="divide-y divide-line">
                {group.rooms.map((room) => (
                  <li key={room.id ?? room.roomNumber}>
                    <button
                      type="button"
                      onClick={() => setSelected(room)}
                      className={`group flex w-full flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 text-left transition-colors hover:bg-pearl/70 focus-visible:bg-pearl focus-visible:ring-inset ${COLUMNS}`}
                    >
                      <span className="font-mono text-[15px] font-semibold tabular-nums">
                        {room.roomNumber}
                      </span>
                      <span className="font-mono text-xs text-chocolate/60">{room.roomType}</span>
                      <span className="ml-auto lg:ml-0">
                        <StatusPill kind="room" value={room.roomStatus} />
                      </span>
                      <span>
                        <StatusPill kind="checkout" value={room.coStatus} />
                      </span>
                      <span className="basis-full lg:hidden" aria-hidden />
                      <span
                        className={`truncate text-xs text-chocolate/60 lg:text-sm ${
                          room.extras ? "order-last basis-full lg:order-none" : "hidden lg:block"
                        }`}
                      >
                        {room.extras}
                      </span>
                      <span className="font-mono text-xs text-chocolate/70 lg:text-[13px]">
                        <span className="lg:hidden text-chocolate/40">HSK </span>
                        {assigneeText(room.assignedtoHSK)}
                      </span>
                      <span className="font-mono text-xs text-chocolate/70 lg:text-[13px]">
                        <span className="lg:hidden text-chocolate/40">SUP </span>
                        {assigneeText(room.assignedtoSUP)}
                      </span>
                      <ChevronRight className="ml-auto text-chocolate/25 transition-colors group-hover:text-clay lg:ml-0 print:hidden" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {selected && (
        <EditRoomContainer
          roomNumber={selected.roomNumber}
          roomType={selected.roomType}
          initialRoomStatus={selected.roomStatus}
          initialCoStatus={selected.coStatus}
          assignedtoHSK={selected.assignedtoHSK}
          assignedtoSUP={selected.assignedtoSUP}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default RoomList;
