import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  tone?: "primary" | "success" | "warning" | "danger" | "info";
}

const toneClasses = {
  primary: "bg-primary-light text-primary-active",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-50 text-danger-700",
  info: "bg-info-50 text-info-700",
};

export function DashboardStatCard({ label, value, icon, tone = "primary" }: DashboardStatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-button", toneClasses[tone])}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          <p className="text-sm text-text-secondary">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
