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
      className={`inline-flex min-w-[5.75rem] items-center justify-center rounded px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-chocolate ${tone}`}
    >
      {value || "Unknown"}
    </span>
  );
};

export default StatusPill;
