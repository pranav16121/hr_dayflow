import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

interface EmployeeTableProps {
  employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Employee ID</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((emp) => (
          <TableRow
            key={emp.id}
            className="cursor-pointer"
            onClick={() => navigate(`/admin/employees/${emp.id}`)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar name={emp.full_name} src={emp.profile_picture ?? undefined} size="sm" />
                <div>
                  <p className="font-medium text-text-primary">{emp.full_name}</p>
                  <p className="text-xs text-text-muted">{emp.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{emp.employee_id}</TableCell>
            <TableCell>{emp.department ?? "—"}</TableCell>
            <TableCell>{emp.designation ?? "—"}</TableCell>
            <TableCell>
              <StatusBadge status={emp.employment_status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

