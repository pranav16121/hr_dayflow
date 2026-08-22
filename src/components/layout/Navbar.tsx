import { Menu } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface NavbarProps {
  onOpenMobile: () => void;
}

export function Navbar({ onOpenMobile }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur md:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label="Open navigation"
        className="rounded-button p-2 text-text-secondary hover:bg-zinc-100 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="hidden text-lg font-semibold text-text-primary md:block">HR / Admin Portal</h1>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-text-primary">Priya Sharma</p>
          <p className="text-xs text-text-muted">HR Manager</p>
        </div>
        <Avatar name="Priya Sharma" size="sm" />
      </div>
    </header>
  );
}
