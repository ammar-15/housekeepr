import { ReactNode } from "react";
import { formatTime, formatToday } from "../../lib/format";

export const PageShell = ({ nav, children }: { nav: ReactNode; children: ReactNode }) => (
  <div className="min-h-screen bg-paper">
    {nav}
    <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader = ({ title, eyebrow, meta, actions }: PageHeaderProps) => (
  <div className="dashboard-header flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-clay">
        {eyebrow ?? formatToday()}
      </p>
      <h1 className="mt-1.5 font-display text-4xl font-medium tracking-tight text-wine">
        {title}
      </h1>
      {meta && <div className="mt-2 text-sm text-chocolate/55">{meta}</div>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

export const SyncStatus = ({ syncedAt }: { syncedAt: Date | null }) => (
  <span className="inline-flex items-center gap-2">
    <span
      className={`h-1.5 w-1.5 rounded-full ${syncedAt ? "bg-green" : "bg-dustyblue"}`}
      aria-hidden
    />
    {syncedAt ? `Live · updated ${formatTime(syncedAt)}` : "Connecting…"}
  </span>
);
