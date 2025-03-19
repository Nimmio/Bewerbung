import React, { ReactNode } from "react";

interface DashboardElementParams {
  title: ReactNode;
  icon: ReactNode;
  main: ReactNode;
  sub: ReactNode;
}

const DashboardElement = (params: DashboardElementParams) => {
  const { title, icon, main, sub } = params;
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        {title}
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold mb-2">{main}</div>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
};

export default DashboardElement;
