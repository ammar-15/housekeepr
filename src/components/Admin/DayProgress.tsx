interface DayProgressProps {
  loaded: boolean;
  dirty: number;
  onChange: number;
  clean: number;
  inspected: number;
}

const DayProgress = ({ loaded, dirty, onChange, clean, inspected }: DayProgressProps) => {
  const total = dirty + onChange + clean + inspected;

  const segments = [
    { label: "Inspected", count: inspected, tone: "bg-lightblue" },
    { label: "Clean", count: clean, tone: "bg-lightgreen" },
    { label: "ON CHANGE", count: onChange, tone: "bg-orange" },
    { label: "Dirty", count: dirty, tone: "bg-lightyellow" },
  ];

  if (!loaded) {
    return (
      <section
        className="h-[4.75rem] animate-pulse rounded-lg border border-line bg-white"
        aria-label="Loading turnover"
      />
    );
  }

  if (total === 0) {
    return (
      <p className="rounded-lg border border-line bg-white px-6 py-8 text-center text-chocolate/60">
        No rooms
      </p>
    );
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <div
        className="flex h-3 gap-0.5 overflow-hidden rounded-full bg-pearl"
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
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${segment.tone}`} aria-hidden />
            {segment.label}: {segment.count}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DayProgress;
