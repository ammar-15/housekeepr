import { ReactNode } from "react";

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
  actions?: ReactNode;
}

export const PageHeader = ({ title, actions }: PageHeaderProps) => (
  <div className="dashboard-header flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
    <h1 className="text-3xl text-wine">{title}</h1>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

