import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Modal from "../ui/Modal";
import Segmented from "../ui/Segmented";
import { ROOM_STATUS_TONE } from "../ui/tones";
import { buttonGhost, buttonPrimary, inputClass, labelClass } from "../ui/form";

interface EditRoomContainerProps {
  roomNumber: string;
  initialRoomStatus: string;
  initialCoStatus: string;
  assignedtoHSK: string;
  assignedtoSUP: string;
  onClose: () => void;
}

const ROOM_STATUSES = [
  { value: "Dirty", label: "Dirty", tone: ROOM_STATUS_TONE.Dirty },
  { value: "ON CHANGE", label: "ON CHANGE", tone: ROOM_STATUS_TONE["ON CHANGE"] },
  { value: "Clean", label: "Clean", tone: ROOM_STATUS_TONE.Clean },
];

const CO_STATUSES = ["DUE", "OUT", "VACANT", "CHECK", "INSPECTED", "STAYOVER"];

const EditRoomContainer = ({
  roomNumber,
  initialRoomStatus,
  initialCoStatus,
  assignedtoHSK,
  assignedtoSUP,
  onClose,
}: EditRoomContainerProps) => {
  const [newRoomStatus, setNewRoomStatus] = useState(initialRoomStatus);
  const [newCoStatus, setNewCoStatus] = useState(initialCoStatus);
  const [newAssignedto, setNewAssignedto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleRoomStatusChange = (selectedStatus: string) => {
    setNewRoomStatus(selectedStatus);
    if (
      (selectedStatus === "Clean" || selectedStatus === "ON CHANGE") &&
      newCoStatus !== "STAYOVER"
    ) {
      setNewCoStatus("VACANT");
    }
  };

  const handleStatusChange = async () => {
    const reassignTo = newAssignedto.trim().toUpperCase();
    let updatedassignedtoHSK = assignedtoHSK;
    let updatedassignedtoSUP = assignedtoSUP;

    if (reassignTo !== "") {
      if (/^HSK\d+$/.test(reassignTo)) {
        updatedassignedtoHSK = reassignTo;
      } else if (/^SUP\d+$/.test(reassignTo)) {
        updatedassignedtoSUP = reassignTo;
      } else {
        setError("Invalid. Please enter assignment correctly.");
        return;
      }
    }

    setSaving(true);
    try {
      await updateDoc(doc(db, "AdminHSK", roomNumber), {
        roomStatus: newRoomStatus,
        assignedtoHSK: updatedassignedtoHSK,
        assignedtoSUP: updatedassignedtoSUP,
        coStatus: newCoStatus,
        time_stamp: new Date().toISOString(),
      });
      onClose();
    } catch (error) {
      console.error("Error updating room status:", error);
      setError("Error updating room status.");
      setSaving(false);
    }
  };

  return (
    <Modal
      title={`Update Room ${roomNumber}`}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" onClick={onClose} className={buttonGhost}>
            Cancel
          </button>
          <button
            type="submit"
            form="edit-room-form"
            disabled={saving}
            className={buttonPrimary}
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </>
      }
    >
      <form
        id="edit-room-form"
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleStatusChange();
        }}
      >

        <div>
          <span className={labelClass}>Room Status</span>
          <Segmented
            label="Room status"
            value={newRoomStatus}
            options={ROOM_STATUSES}
            onChange={handleRoomStatusChange}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="co-status" className={labelClass}>
              Check Out Status
            </label>
            <select
              id="co-status"
              value={newCoStatus}
              onChange={(e) => setNewCoStatus(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              {CO_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reassign" className={labelClass}>
              Assigned To
            </label>
            <input
              id="reassign"
              value={newAssignedto}
              onChange={(e) => {
                setNewAssignedto(e.target.value);
                setError(null);
              }}
              placeholder={[assignedtoHSK, assignedtoSUP].filter(Boolean).join(" / ")}
              className={`${inputClass} uppercase placeholder:normal-case`}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-md bg-lightred/40 px-3 py-2 text-sm text-chocolate">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
};

export default EditRoomContainer;
