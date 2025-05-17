import { ReactNode } from "react";

interface OverviewCardProps {
  label: string;
  data: {
    value: string | number;
    change?: number;
    changeLabel?: string;
  };
  Icon: React.ComponentType<{ className?: string }>;
}

export function OverviewCard({ label, data, Icon }: OverviewCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{label}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{data.value}</div>
        {data.change !== undefined && (
          <p className="text-xs text-muted-foreground">
            {data.change > 0 ? "+" : ""}{data.change}% {data.changeLabel}
          </p>
        )}
      </div>
    </div>
  );
} 