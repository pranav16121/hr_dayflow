import { useState } from "react";
import { toast } from "sonner";
import { useAsync } from "@/hooks/useAsync";
import { getActiveEmployee, getPersonalPayroll, updateEmployeeContact } from "@/services/employeePortalService";
import { LoadingState, ErrorState } from "@/components/feedback";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { formatDate, formatCurrency } from "@/lib/format";
import { Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, Edit3, ShieldCheck } from "lucide-react";

export function Profile() {
  const { data: employee, loading, error, refetch } = useAsync(getActiveEmployee, []);
  const { data: payroll } = useAsync(
    () => (employee ? getPersonalPayroll(employee.id) : Promise.resolve(null)),
    [employee?.id],
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenEdit = () => {
    if (employee) {
      setPhone(employee.phone || "");
      setAddress(employee.address || "");
      setIsEditModalOpen(true);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setIsSaving(true);
    try {
      await updateEmployeeContact(employee.id, {
        phone: phone.trim() || null,
        address: address.trim() || null,
      });
      toast.success("Contact details updated successfully in database");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update contact info");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <LoadingState label="Loading employee profile…" />;
  if (error || !employee) return <ErrorState onRetry={refetch} description={error?.message || "Employee profile not found"} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="My Profile"
          description="Review your employee records, personal information, and salary structure."
        />
        <Button
          variant="outline"
          icon={<Edit3 className="h-4 w-4" />}
          onClick={handleOpenEdit}
        >
          Edit Contact Info
        </Button>
      </div>

      {/* Header Profile Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar name={employee.full_name} src={employee.profile_picture} size="xl" />
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h2 className="text-2xl font-bold text-text-primary">{employee.full_name}</h2>
                <StatusBadge status={employee.employment_status} />
              </div>
              <p className="text-sm font-medium text-text-secondary">
                {employee.designation} • <span className="text-primary-600">{employee.department}</span>
              </p>
              <p className="text-xs text-text-muted">
                Employee ID: <span className="font-mono font-semibold text-text-primary">{employee.employee_id}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-600" />
              Personal & Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Email Address</span>
                <p className="mt-1 font-medium text-text-primary flex items-center gap-1.5 truncate">
                  <Mail className="h-3.5 w-3.5 text-text-muted" />
                  {employee.email}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Phone Number</span>
                <p className="mt-1 font-medium text-text-primary flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-text-muted" />
                  {employee.phone || "Not provided"}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-xs font-semibold uppercase text-text-muted">Residential Address</span>
                <p className="mt-1 font-medium text-text-primary flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-text-muted" />
                  {employee.address || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Account Created</span>
                <p className="mt-1 font-medium text-text-primary flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-text-muted" />
                  {formatDate(employee.created_at)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Employment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary-600" />
              Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Department</span>
                <p className="mt-1 font-medium text-text-primary">{employee.department}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Designation</span>
                <p className="mt-1 font-medium text-text-primary">{employee.designation}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Joining Date</span>
                <p className="mt-1 font-medium text-text-primary">{formatDate(employee.joining_date)}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-text-muted">Account Role</span>
                <p className="mt-1 font-medium text-text-primary flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-success-600" /> Employee / Staff
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Salary & Compensation Structure */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary-600" />
              Compensation Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payroll ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <div>
                  <span className="text-xs text-text-muted uppercase font-semibold">Basic Salary</span>
                  <p className="text-base font-bold text-text-primary mt-1">{formatCurrency(payroll.basic_salary)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase font-semibold">Allowances</span>
                  <p className="text-base font-bold text-success-600 mt-1">+{formatCurrency(payroll.allowances)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase font-semibold">Deductions</span>
                  <p className="text-base font-bold text-danger-600 mt-1">-{formatCurrency(payroll.deductions)}</p>
                </div>
                <div className="bg-primary-50 p-2.5 rounded-lg border border-primary-100">
                  <span className="text-xs text-primary-700 uppercase font-semibold">Net Take-Home Pay</span>
                  <p className="text-lg font-extrabold text-primary-700 mt-0.5">{formatCurrency(payroll.net_salary)}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">No salary breakdown assigned yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Contact Info Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact Information"
        description="Update your phone number and address. Changes reflect across the company database."
        size="md"
      >
        <form onSubmit={handleSaveContact} className="space-y-4">
          <Input
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
          />
          <Input
            label="Residential Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Apartment, Street, City, State"
          />

          <div className="flex justify-end gap-2.5 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSaving}>
              Save Contact Details
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Profile;
