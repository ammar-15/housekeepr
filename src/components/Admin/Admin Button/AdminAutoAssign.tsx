import { useState, useRef, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import RoomData from "../../RoomData";

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

const AdminAutoAssign = ({ onClose }: AdminAutoAssignProps): JSX.Element => {
  const [checkOutRoomNumbers, setCheckOutRoomNumbers] = useState("");
  const [stayOverRoomNumbers, setStayOverRoomNumbers] = useState("");
  const [housekeepers, setHousekeepers] = useState<number>(1);
  const [supervisors, setSupervisors] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    onClose?.();
    console.log("Auto Assign modal closed");
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
    const checkoutList = checkOutRoomNumbers.split(",").map((room) => room.trim());
    const stayoverList = stayOverRoomNumbers.split(",").map((room) => room.trim());
  
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
  
    setCheckOutRoomNumbers("");
    setStayOverRoomNumbers("");
    setHousekeepers(1);
    setSupervisors(1);
    console.log("Auto assign completed.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-md shadow-lg w-30%">
        <h2 className="text-xl mb-4">Auto Assign Rooms</h2>
        <div className="flex space-x-4">
          <div className="w-50%">
            <h3 className="text-md mb-2">Check-Out Rooms</h3>
            <input
              type="text"
              placeholder="(Comma separated)"
              value={checkOutRoomNumbers}
              onChange={(e) => setCheckOutRoomNumbers(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md"
            />
          </div>
          <div className="w-50%">
            <h3 className="text-md mb-2">Stayover Rooms</h3>
            <input
              type="text"
              placeholder="(Comma separated)"
              value={stayOverRoomNumbers}
              onChange={(e) => setStayOverRoomNumbers(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-3">
          <div className="w-50%">
            <h3 className="text-md mb-2">Number of Housekeepers</h3>
            <input
              type="number"
              placeholder="Enter number of housekeepers"
              value={housekeepers}
              onChange={(e) => setHousekeepers(Number(e.target.value))}
              className="w-full mb-3 p-2 border rounded-md"
              min={1}
            />
          </div>
          <div className="w-50%">
            <h3 className="text-md mb-2">Number of Supervisors</h3>
            <input
              type="number"
              placeholder="Enter number of supervisors"
              value={supervisors}
              onChange={(e) => setSupervisors(Number(e.target.value))}
              className="w-full mb-3 p-2 border rounded-md"
              min={1}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleClose} className="text-black px-4 py-2 rounded-md hover:bg-dustyblue mr-2">
            Cancel
          </button>
          <button onClick={handleSubmit} className="text-white bg-chocolate px-4 py-2 rounded-md hover:bg-wine">
            Auto Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAutoAssign;
