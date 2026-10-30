import { CO_STATUS_TONE, ROOM_STATUS_TONE } from "./tones";

interface StatusPillProps {
  value?: string;
  kind: "room" | "checkout";
}

const StatusPill = ({ value, kind }: StatusPillProps) => {
  const tones = kind === "room" ? ROOM_STATUS_TONE : CO_STATUS_TONE;
  const tone = (value && tones[value]) || "bg-red";

  return (
    <span
      className={`inline-block min-w-[100px] rounded-md px-3 py-1 text-center text-sm text-black ${tone}`}
    >
      {value}
    </span>
  );
};

export default StatusPill;
