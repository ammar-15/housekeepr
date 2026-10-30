interface SegmentedOption {
  value: string;
  label: string;
  tone?: string;
}

interface SegmentedProps {
  label: string;
  value: string;
  options: SegmentedOption[];
  onChange: (value: string) => void;
}

const Segmented = ({ label, value, options, onChange }: SegmentedProps) => (
  <div
    role="radiogroup"
    aria-label={label}
    className="grid auto-cols-fr grid-flow-col gap-0.5 rounded-md border border-line bg-pearl p-0.5"
  >
    {options.map((option) => {
      const active = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(option.value)}
          className={`inline-flex items-center justify-center gap-2 rounded px-3 py-1.5 text-sm transition-colors ${
            active
              ? "bg-white text-chocolate shadow-sm ring-1 ring-line"
              : "text-chocolate/60 hover:text-chocolate"
          }`}
        >
          {option.tone && (
            <span className={`h-2 w-2 rounded-full ${option.tone}`} aria-hidden />
          )}
          {option.label}
        </button>
      );
    })}
  </div>
);

export default Segmented;
