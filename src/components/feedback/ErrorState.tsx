import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-card border border-danger-700/20 bg-danger-50 py-16 text-center",
        className,
      )}
    >
      <AlertTriangle className="mb-1 h-8 w-8 text-danger-700" aria-hidden="true" />
      <p className="text-sm font-semibold text-danger-700">{title}</p>
      <p className="max-w-sm text-sm text-danger-700/80">{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" className="mt-3" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
