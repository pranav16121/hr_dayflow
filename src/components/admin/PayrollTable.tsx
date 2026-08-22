import type { AdminPayroll } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/format";
import { Pencil } from "lucide-react";

interface PayrollTableProps {
  records: AdminPayroll[];
  onEdit: (record: AdminPayroll) => void;
}

export function PayrollTable({ records, onEdit }: PayrollTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Basic Salary</TableHead>
          <TableHead>Allowances</TableHead>
          <TableHead>Deductions</TableHead>
          <TableHead>Net Salary</TableHead>
          <TableHead>Effective Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium text-text-primary">
              {p.employee?.full_name ?? "—"}
              <span className="ml-2 text-xs font-normal text-text-muted">{p.employee?.employee_id}</span>
            </TableCell>
            <TableCell>{p.employee?.department ?? "—"}</TableCell>
            <TableCell>{formatCurrency(p.basic_salary)}</TableCell>
            <TableCell>{formatCurrency(p.allowances)}</TableCell>
            <TableCell>{formatCurrency(p.deductions)}</TableCell>
            <TableCell className="font-semibold text-text-primary">{formatCurrency(p.net_salary)}</TableCell>
            <TableCell>{formatDate(p.effective_date)}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" icon={<Pencil className="h-3.5 w-3.5" />} onClick={() => onEdit(p)}>
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
