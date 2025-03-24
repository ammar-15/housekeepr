interface StatsHeaderProps {
  stats: Record<string, number>;
}

const StatsHeader = ({ stats }: StatsHeaderProps) => {
  return (
    <div className="dashboard-stats">
      <div className="stats-header flex flex-col items-center sm:flex-row sm:bg-clay sm:text-white text-clay rounded-md sm:px-3 sm:py-1.5 gap-2">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stats-box px-2" key={key}>
            <span>{key}: {value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHeader;
