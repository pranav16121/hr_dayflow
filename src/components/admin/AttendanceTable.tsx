import type { AdminAttendance } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatTime } from "@/lib/format";

interface AttendanceTableProps {
  records: AdminAttendance[];
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Employee ID</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium text-text-primary">{r.employee?.full_name ?? "—"}</TableCell>
            <TableCell>{r.employee?.employee_id ?? "—"}</TableCell>
            <TableCell>{r.employee?.department ?? "—"}</TableCell>
            <TableCell>{formatDate(r.date)}</TableCell>
            <TableCell>{formatTime(r.check_in)}</TableCell>
            <TableCell>{formatTime(r.check_out)}</TableCell>
            <TableCell>
              <StatusBadge status={r.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
