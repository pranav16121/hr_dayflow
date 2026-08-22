import type { AdminLeaveRequest } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";

interface LeaveTableProps {
  requests: AdminLeaveRequest[];
  onReview: (request: AdminLeaveRequest) => void;
}

export function LeaveTable({ requests, onReview }: LeaveTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((lr) => (
          <TableRow key={lr.id}>
            <TableCell className="font-medium text-text-primary">
              {lr.employee?.full_name ?? "—"}
              <span className="ml-2 text-xs font-normal text-text-muted">{lr.employee?.employee_id}</span>
            </TableCell>
            <TableCell>{lr.employee?.department ?? "—"}</TableCell>
            <TableCell className="capitalize">{lr.leave_type}</TableCell>
            <TableCell>
              {formatDate(lr.start_date)} – {formatDate(lr.end_date)}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">{lr.remarks ?? "—"}</TableCell>
            <TableCell>
              <StatusBadge status={lr.status} />
            </TableCell>
            <TableCell>
              <Button size="sm" variant={lr.status === "pending" ? "primary" : "outline"} onClick={() => onReview(lr)}>
                {lr.status === "pending" ? "Review" : "View"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

