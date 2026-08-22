import { useState } from "react";
import type { AdminLeaveRequest } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatDateTime } from "@/lib/format";

interface LeaveReviewModalProps {
  request: AdminLeaveRequest | null;
  onClose: () => void;
  onApprove: (leaveRequestId: string, adminComment?: string) => Promise<void>;
  onReject: (leaveRequestId: string, adminComment?: string) => Promise<void>;
}

export function LeaveReviewModal({ request, onClose, onApprove, onReject }: LeaveReviewModalProps) {
  const [comment, setComment] = useState("");
  const [submittingAction, setSubmittingAction] = useState<"approve" | "reject" | null>(null);

  if (!request) return null;

  const isPending = request.status === "pending";

  async function handleAction(action: "approve" | "reject") {
    if (!request) return;
    setSubmittingAction(action);
    try {
      if (action === "approve") {
        await onApprove(request.id, comment.trim() || undefined);
      } else {
        await onReject(request.id, comment.trim() || undefined);
      }
    } finally {
      setSubmittingAction(null);
    }
  }

  return (
    <Modal
      open={!!request}
      onClose={onClose}
      title="Leave Request Review"
      description={`${request.employee?.full_name ?? "Employee"} · ${request.employee?.employee_id ?? ""}`}
      size="md"
    >
      <div className="space-y-4">
        <dl className="grid grid-cols-2 gap-4 rounded-button bg-zinc-50 p-4">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Leave Type</dt>
            <dd className="mt-1 text-sm capitalize text-text-primary">{request.leave_type}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Department</dt>
            <dd className="mt-1 text-sm text-text-primary">{request.employee?.department ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Start Date</dt>
            <dd className="mt-1 text-sm text-text-primary">{formatDate(request.start_date)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">End Date</dt>
            <dd className="mt-1 text-sm text-text-primary">{formatDate(request.end_date)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Remarks</dt>
            <dd className="mt-1 text-sm text-text-primary">{request.remarks ?? "No remarks provided."}</dd>
          </div>
        </dl>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">Current Status:</span>
          <StatusBadge status={request.status} />
        </div>

        {!isPending && (
          <div className="rounded-button border border-border p-4 text-sm text-text-secondary">
            <p>
              Reviewed {formatDateTime(request.reviewed_at)}
              {request.admin_comment && <> — “{request.admin_comment}”</>}
            </p>
          </div>
        )}

        {isPending && (
          <Textarea
            label="Admin Comment (optional)"
            placeholder="Add a note for the employee…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        )}
      </div>

      {isPending && (
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={!!submittingAction}>
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={submittingAction === "reject"}
            disabled={!!submittingAction}
            onClick={() => handleAction("reject")}
          >
            Reject
          </Button>
          <Button
            variant="success"
            loading={submittingAction === "approve"}
            disabled={!!submittingAction}
            onClick={() => handleAction("approve")}
          >
            Approve
          </Button>
        </div>
      )}
    </Modal>
  );
}

