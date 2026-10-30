import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export interface Room {
  id?: string;
  roomNumber: string;
  roomType: string;
  roomStatus: string;
  coStatus: string;
  workload?: string | number;
  nearElevator?: string;
  extras?: string;
  assignedtoHSK: string;
  assignedtoSUP: string;
  time_stamp?: string;
}

export const ROOMS_COLLECTION = "AdminHSK";

// Live subscription to every room on today's board.
export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [syncedAt, setSyncedAt] = useState<Date | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, ROOMS_COLLECTION),
      (snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Room) }))
        );
        setLoaded(true);
        setSyncedAt(new Date());
      }
    );
    return () => unsubscribe();
  }, []);

  return { rooms, loaded, syncedAt };
};

export const needsCleaning = (room: Room) =>
  room.roomStatus === "Dirty" || room.roomStatus === "ON CHANGE";

export const isInspected = (room: Room) => room.coStatus === "INSPECTED";

export const awaitingInspection = (room: Room) =>
  room.roomStatus === "Clean" && !isInspected(room);

export const isStaffCode = (code: string | undefined, prefix: "HSK" | "SUP") =>
  !!code && new RegExp(`^${prefix}\\d+$`).test(code);

export const countStaff = (
  rooms: Room[],
  key: "assignedtoHSK" | "assignedtoSUP",
  prefix: "HSK" | "SUP"
) => new Set(rooms.map((room) => room[key]).filter((code) => isStaffCode(code, prefix))).size;

export const staffLabel = (code: string) => {
  const match = /^(HSK|SUP)(\d+)$/.exec(code);
  if (!match) return code || "Unassigned";
  return `${match[1] === "HSK" ? "Housekeeper" : "Supervisor"} ${match[2]}`;
};

// "214" -> "2", "1012" -> "10"
export const floorOf = (roomNumber: string) => roomNumber.slice(0, -2) || "0";

export type SortOption = "recent" | "oldest" | "ascending" | "descending";

export const SORT_LABELS: Record<SortOption, string> = {
  recent: "Recent",
  oldest: "Oldest",
  ascending: "Ascending",
  descending: "Descending",
};

type Sortable = { roomNumber?: string; time_stamp?: string; createdAt?: Date };

const timeOf = (item: Sortable) =>
  item.time_stamp
    ? Date.parse(item.time_stamp) || 0
    : item.createdAt?.getTime() ?? 0;

const numberOf = (item: Sortable) => parseInt(item.roomNumber ?? "", 10) || 0;

export const sortItems = <T extends Sortable>(items: T[], option: SortOption): T[] => {
  const sorted = [...items];
  switch (option) {
    case "recent":
      return sorted.sort((a, b) => timeOf(b) - timeOf(a));
    case "oldest":
      return sorted.sort((a, b) => timeOf(a) - timeOf(b));
    case "ascending":
      return sorted.sort((a, b) => numberOf(a) - numberOf(b));
    case "descending":
      return sorted.sort((a, b) => numberOf(b) - numberOf(a));
  }
};
