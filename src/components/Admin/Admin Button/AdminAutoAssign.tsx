import { useMemo, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import RoomData from "../../RoomData";
import Modal from "../../ui/Modal";
import { buttonGhost, buttonPrimary, inputClass, labelClass } from "../../ui/form";
import { Minus, Plus } from "../../ui/icons";

interface Room {
  roomNumber: string;
  roomType: string;
  coStatus: string;
  workload: number;
  nearElevator: string;
}

interface AdminAutoAssignProps {
  onClose?: () => void;
}

const knownRoomNumbers = new Set(RoomData.map((room) => room.roomNumber));

const parseRoomList = (value: string) =>
  value.split(/[\s,]+/).map((room) => room.trim()).filter(Boolean);

const RoomListField = ({
  id,
  label,
  value,
  list,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  list: string[];
  onChange: (value: string) => void;
}) => {
  const unknown = list.filter((room) => !knownRoomNumbers.has(room));
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="(Comma separated)"
        className={`${inputClass} resize-none`}
      />
      {unknown.length > 0 && (
        <p className="mt-1 text-sm text-wine">Not found: {unknown.join(", ")}</p>
      )}
    </div>
  );
};

const Stepper = ({
  label,
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) => (
  <div>
    <span className={labelClass}>{label}</span>
    <div className="inline-flex items-center rounded-md border border-line bg-white">
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="grid h-9 w-9 place-items-center text-chocolate/70 hover:bg-pearl disabled:opacity-30"
      >
        <Minus />
      </button>
      <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center text-chocolate/70 hover:bg-pearl disabled:opacity-30"
      >
        <Plus />
      </button>
    </div>
  </div>
);

const AdminAutoAssign = ({ onClose }: AdminAutoAssignProps): JSX.Element => {
  const [checkOutRoomNumbers, setCheckOutRoomNumbers] = useState("");
  const [stayOverRoomNumbers, setStayOverRoomNumbers] = useState("");
  const [housekeepers, setHousekeepers] = useState<number>(1);
  const [supervisors, setSupervisors] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);

  const checkoutList = useMemo(() => parseRoomList(checkOutRoomNumbers), [checkOutRoomNumbers]);
  const stayoverList = useMemo(() => parseRoomList(stayOverRoomNumbers), [stayOverRoomNumbers]);
  const totalRooms = new Set(
    [...checkoutList, ...stayoverList].filter((room) => knownRoomNumbers.has(room))
  ).size;

  const handleClose = () => {
    onClose?.();
  };

  const parseFloor = (roomNumber: string): number => parseInt(roomNumber[0]);

  const sortRoomsSequentially = (rooms: Room[]) => {
    return [...rooms].sort((a, b) => {
      const floorA = parseFloor(a.roomNumber);
      const floorB = parseFloor(b.roomNumber);
      if (floorA !== floorB) return floorA - floorB;
      return parseInt(a.roomNumber) - parseInt(b.roomNumber);
    });
  };

  const smartAssign = (rooms: Room[], assigneesCount: number, prefix: string) => {
    if (assigneesCount <= 0 || rooms.length === 0) return [];
    const sortedRooms = sortRoomsSequentially(rooms);

    const assignments = Array.from({ length: assigneesCount }, (_, i) => ({
      assignee: `${prefix}${i + 1}`,
      rooms: [] as Room[],
      workload: 0,
    }));

    let index = 0;
    sortedRooms.forEach((room) => {
      assignments[index].rooms.push(room);
      assignments[index].workload += room.workload;

      if (assignments[index].rooms.length >= rooms.length / assigneesCount) {
        index = (index + 1) % assigneesCount;
      }
    });

    return assignments;
  };

  const handleSubmit = async () => {
    const allRooms: Room[] = [...checkoutList, ...stayoverList]
      .map((roomNumber) => {
        const room = RoomData.find((room) => room.roomNumber === roomNumber);
        return room
          ? {
              ...room,
              workload: parseFloat(room.workload),
              coStatus: stayoverList.includes(roomNumber) ? "STAYOVER" : room.coStatus,
            }
          : null;
      })
      .filter((room) => room !== null) as Room[];

    setSubmitting(true);
    const housekeeperAssignments = smartAssign(allRooms, housekeepers, "HSK");
    const supervisorAssignments = smartAssign(allRooms, supervisors, "SUP");
    const currentTime = new Date().toISOString();

    const assignmentPromises = housekeeperAssignments.flatMap((hskAssignment) =>
      hskAssignment.rooms.map(async (room) => {
        const roomRef = doc(db, "AdminHSK", room.roomNumber);

        const assignedSupervisor = supervisorAssignments.find((sup) =>
          sup.rooms.some((r) => r.roomNumber === room.roomNumber)
        )?.assignee;

        const updatedRoom = {
          ...room,
          assignedtoHSK: hskAssignment.assignee,
          assignedtoSUP: assignedSupervisor || "",
          coStatus: stayoverList.includes(room.roomNumber) ? "STAYOVER" : room.coStatus,
          time_stamp: currentTime,
        };

        try {
          const docSnapshot = await getDoc(roomRef);
          return docSnapshot.exists()
            ? setDoc(roomRef, updatedRoom, { merge: true })
            : setDoc(roomRef, updatedRoom);
        } catch (error) {
          console.error(`Error assigning room ${room.roomNumber}:`, error);
        }
      })
    );

    await Promise.all(assignmentPromises);
    handleClose();
  };

  return (
    <Modal
      title="Auto Assign Rooms"
      onClose={handleClose}
      size="lg"
      footer={
        <>
          <button type="button" onClick={handleClose} className={buttonGhost}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={totalRooms === 0 || submitting}
            className={buttonPrimary}
          >
            {submitting ? "Assigning..." : "Auto Assign"}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <RoomListField
            id="checkout-rooms"
            label="Check-Out Rooms"
            value={checkOutRoomNumbers}
            list={checkoutList}
            onChange={setCheckOutRoomNumbers}
          />
          <RoomListField
            id="stayover-rooms"
            label="Stayover Rooms"
            value={stayOverRoomNumbers}
            list={stayoverList}
            onChange={setStayOverRoomNumbers}
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <Stepper label="Number of Housekeepers" value={housekeepers} onChange={setHousekeepers} />
          <Stepper label="Number of Supervisors" value={supervisors} onChange={setSupervisors} />
        </div>

      </div>
    </Modal>
  );
};

export default AdminAutoAssign;
