import type { AttendanceStatus } from "@/types/attendance";
import type { LeaveStatus } from "@/types/leave";
import type { EmploymentStatus } from "@/types/employee";
import { Badge, type BadgeTone } from "./Badge";

type Status = AttendanceStatus | LeaveStatus | EmploymentStatus;

const STATUS_CONFIG: Record<Status, { label: string; tone: BadgeTone }> = {
  present: { label: "Present", tone: "success" },
  absent: { label: "Absent", tone: "danger" },
  half_day: { label: "Half Day", tone: "warning" },
  leave: { label: "Leave", tone: "info" },
  pending: { label: "Pending", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  active: { label: "Active", tone: "success" },
  inactive: { label: "Inactive", tone: "neutral" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, tone: "neutral" as BadgeTone };
  return (
    <Badge tone={config.tone} className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {config.label}
    </Badge>
  );
}
