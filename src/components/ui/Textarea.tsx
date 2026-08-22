import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={!!error}
          className={cn(
            "w-full resize-none rounded-button border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-outline",
            error && "border-danger-700 focus:border-danger-700 focus:ring-danger-700/10",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-danger-700">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-text-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
