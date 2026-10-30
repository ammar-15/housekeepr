import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import RoomData from "../../RoomData";
import Modal from "../../ui/Modal";
import Segmented from "../../ui/Segmented";
import { ROOM_STATUS_TONE } from "../../ui/tones";
import { buttonGhost, buttonPrimary, inputClass, labelClass } from "../../ui/form";

interface AdminHSKassignProps {
  onAddHSKroom?: (HSKroomNumber: string) => void;
  onassignedtoHSK?: (assignedtoHSK: string) => void;
  onassignedtoSUP?: (assignedtoSUP: string) => void;
  onClose?: () => void;
}

const AdminHSKassign = ({
  onAddHSKroom,
  onassignedtoHSK,
  onassignedtoSUP,
  onClose,
}: AdminHSKassignProps) => {
  const [HSKroomNumber, setHSKRoomNumber] = useState("");
  const [assignedto, setAssignedto] = useState("");
  const [statusOption, setStatusOption] = useState("Dirty");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const roomNumber = HSKroomNumber.trim();
  const assignee = assignedto.trim().toUpperCase();
  const room = RoomData.find((r) => r.roomNumber === roomNumber);
  const assigneeValid = /^(HSK|SUP)\d+$/.test(assignee);

  const handleClose = () => {
    onClose?.();
  };

  const handleSave = async () => {
    if (!room) {
      setError("Room not found.");
      return;
    }
    if (!assigneeValid) {
      setError("Invalid assignment. Use HSK# or SUP#.");
      return;
    }

    const roomRef = doc(db, "AdminHSK", roomNumber);
    let updatedRoom = {
      ...room,
      roomStatus: statusOption,
      coStatus: statusOption === "Clean" ? "VACANT" : room.coStatus,
      time_stamp: new Date().toISOString(),
    };

    if (assignee.startsWith("HSK")) {
      updatedRoom = { ...updatedRoom, assignedtoHSK: assignee, assignedtoSUP: "SUP1" };
      if (onassignedtoHSK) onassignedtoHSK(assignee);
      if (onassignedtoSUP) onassignedtoSUP("SUP1");
    } else {
      updatedRoom = { ...updatedRoom, assignedtoSUP: assignee, assignedtoHSK: "N/A" };
      if (onassignedtoSUP) onassignedtoSUP(assignee);
    }

    setSaving(true);
    try {
      await setDoc(roomRef, updatedRoom);
      if (onAddHSKroom) onAddHSKroom(roomNumber);
      handleClose();
    } catch (error) {
      console.error("Firebase room error", error);
      setError("Error saving room.");
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Assign Room"
      onClose={handleClose}
      footer={
        <>
          <button type="button" onClick={handleClose} className={buttonGhost}>
            Cancel
          </button>
          <button type="submit" form="assign-room-form" disabled={saving} className={buttonPrimary}>
            {saving ? "Saving..." : "Save"}
          </button>
        </>
      }
    >
      <form
        id="assign-room-form"
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="assign-room-number" className={labelClass}>
              Room Number
            </label>
            <input
              id="assign-room-number"
              autoFocus
              inputMode="numeric"
              value={HSKroomNumber}
              onChange={(e) => {
                setHSKRoomNumber(e.target.value);
                setError(null);
              }}
              placeholder="Room Number"
              className={`${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="assign-to" className={labelClass}>
              Assigned To
            </label>
            <input
              id="assign-to"
              value={assignedto}
              onChange={(e) => {
                setAssignedto(e.target.value);
                setError(null);
              }}
              placeholder="Assigned To (HSK# or SUP#)"
              className={`${inputClass} uppercase placeholder:normal-case`}
            />
          </div>
        </div>

        <div>
          <span className={labelClass}>Status</span>
          <Segmented
            label="Status"
            value={statusOption}
            onChange={setStatusOption}
            options={[
              { value: "Dirty", label: "Dirty", tone: ROOM_STATUS_TONE.Dirty },
              { value: "Clean", label: "Clean", tone: ROOM_STATUS_TONE.Clean },
            ]}
          />
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

export default AdminHSKassign;
