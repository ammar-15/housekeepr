interface StatsHeaderProps {
  stats: Record<string, number | string>;
}

const StatsHeader = ({ stats }: StatsHeaderProps) => {
  return (
    <dl className="dashboard-stats inline-flex divide-x divide-white/20 overflow-hidden rounded-md bg-clay text-white">
      {Object.entries(stats).map(([key, value]) => (
        <div className="stats-box flex flex-col-reverse px-4 py-2" key={key}>
          <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/75">
            {key}
          </dt>
          <dd className="font-mono text-lg font-medium leading-tight tabular-nums">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default StatsHeader;
