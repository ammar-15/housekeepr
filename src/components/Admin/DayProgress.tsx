import { percent } from "../../lib/format";

interface DayProgressProps {
  loaded: boolean;
  dirty: number;
  onChange: number;
  clean: number;
  inspected: number;
}

const DayProgress = ({ loaded, dirty, onChange, clean, inspected }: DayProgressProps) => {
  const total = dirty + onChange + clean + inspected;
  const ready = clean + inspected;

  // Finished work reads left to right, so the bar fills like a progress meter.
  const segments = [
    { label: "Inspected", count: inspected, tone: "bg-lightblue" },
    { label: "Clean", count: clean, tone: "bg-lightgreen" },
    { label: "On change", count: onChange, tone: "bg-orange" },
    { label: "Dirty", count: dirty, tone: "bg-lightyellow" },
  ];

  if (!loaded) {
    return (
      <section
        className="h-[8.5rem] animate-pulse rounded-lg border border-line bg-white"
        aria-label="Loading turnover"
      />
    );
  }

  if (total === 0) {
    return (
      <section className="rounded-lg border border-dashed border-dustyblue/60 bg-white px-6 py-10 text-center">
        <p className="font-display text-lg">No rooms on the board yet</p>
        <p className="mt-1 text-sm text-chocolate/55">
          Use <span className="font-medium text-chocolate">Start the day</span> (the + button)
          to load today's check-outs and stayovers.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-chocolate/50">
            Turnover
          </p>
          <p className="mt-1 flex items-baseline gap-3">
            <span className="font-display text-5xl font-medium tracking-tight text-wine">
              {percent(ready, total)}%
            </span>
            <span className="text-sm text-chocolate/60">
              {ready} of {total} rooms ready
            </span>
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-4">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-sm ${segment.tone}`} aria-hidden />
              <span className="text-chocolate/65">{segment.label}</span>
              <span className="font-mono tabular-nums">{segment.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-5 flex h-3 gap-0.5 overflow-hidden rounded-full bg-pearl"
        role="img"
        aria-label={segments.map((s) => `${s.label} ${s.count}`).join(", ")}
      >
        {segments
          .filter((segment) => segment.count > 0)
          .map((segment) => (
            <div
              key={segment.label}
              className={`${segment.tone} transition-[width] duration-500`}
              style={{ width: `${(segment.count / total) * 100}%` }}
              title={`${segment.label}: ${segment.count}`}
            />
          ))}
      </div>
    </section>
  );
};

export default DayProgress;
