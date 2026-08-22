import { Menu, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onOpenMobile: () => void;
}

export function Navbar({ onOpenMobile }: NavbarProps) {
  const { user, profile, employee, signOut } = useAuth();

  const displayName = employee?.full_name || profile?.email || user?.email || "Admin User";
  const displayRole = profile?.role === "admin" ? "Administrator" : "Employee";
  const displayEmail = user?.email || profile?.email || "";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open navigation"
          className="rounded-button p-2 text-text-secondary hover:bg-zinc-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="hidden text-lg font-semibold text-text-primary md:block">HR / Admin Portal</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-text-primary">{displayName}</p>
            <p className="text-xs text-text-muted">{displayRole} {displayEmail ? `· ${displayEmail}` : ""}</p>
          </div>
          <Avatar name={displayName} src={employee?.profile_picture} size="sm" />
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<LogOut className="h-4 w-4" />}
          onClick={() => signOut()}
          aria-label="Sign out"
          className="text-xs"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
