import { Mail, Phone, MapPin, Briefcase, CalendarDays } from "lucide-react";
import type { Employee } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";

interface EmployeeSummaryProps {
  employee: Employee;
}

export function EmployeeSummary({ employee }: EmployeeSummaryProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <Avatar name={employee.full_name} src={employee.profile_picture} size="lg" />
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-text-primary">{employee.full_name}</h2>
          <StatusBadge status={employee.employment_status} />
        </div>
        <p className="text-sm text-text-secondary">
          {employee.employee_id} · {employee.designation ?? "No designation"}
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-text-secondary sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-text-muted" /> {employee.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-text-muted" /> {employee.phone ?? "—"}
          </span>
          <span className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-text-muted" /> {employee.department ?? "—"}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-text-muted" /> Joined {formatDate(employee.joining_date)}
          </span>
          <span className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 text-text-muted" /> {employee.address ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
