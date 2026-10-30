interface StatsHeaderProps {
  stats: Record<string, number | string>;
}

const StatsHeader = ({ stats }: StatsHeaderProps) => {
  return (
    <div className="dashboard-stats">
      <div className="stats-header flex flex-col items-center gap-2 rounded-md text-clay sm:flex-row sm:bg-clay sm:px-3 sm:py-1.5 sm:text-white">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stats-box px-2" key={key}>
            <span>
              {key}: {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHeader;
