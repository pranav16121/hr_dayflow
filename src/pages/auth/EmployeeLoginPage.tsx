import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormValues } from "./loginSchema";

export function EmployeeLoginPage() {
  const { signIn, user, isAdmin, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/employee/dashboard";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Already signed in — bounce to the portal that matches the account's role.
  useEffect(() => {
    if (loading || !user) return;
    if (isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    } else if (profile?.role === "employee") {
      navigate(from, { replace: true });
    }
  }, [loading, user, isAdmin, profile?.role, from, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    setAuthError(null);
    try {
      const res = await signIn(values.email, values.password);
      if (res.error) {
        setAuthError(res.error);
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Failed to sign in to Supabase");
    }
  });

  const handleFillDemoEmployee = () => {
    setValue("email", "amogh@dayflow.io");
    setValue("password", "admin123");
    setAuthError(null);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
            Dayflow <span className="text-primary">HRMS</span>
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Sign in to your account to access the Employee Portal
          </p>
        </div>

        <Card className="mt-8 shadow-modal">
          <CardHeader className="flex-col items-start gap-1">
            <CardTitle>Employee Sign In</CardTitle>
            <CardDescription>
              Enter your Supabase credentials to view your attendance, leave, and payroll.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {authError && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2.5 rounded-card border border-danger-700/20 bg-danger-50 p-3 text-sm text-danger-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Authentication Failed</p>
                  <p className="mt-0.5 text-xs text-danger-700/90">{authError}</p>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@dayflow.io"
                autoComplete="email"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Button
                type="submit"
                className="w-full justify-center"
                loading={isSubmitting}
                icon={<LogIn className="h-4 w-4" />}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">Development Demo Account:</span>
                <button
                  type="button"
                  onClick={handleFillDemoEmployee}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <Sparkles className="h-3 w-3" /> Fill Demo Employee
                </button>
              </div>
              <p className="mt-1 text-[11px] text-text-muted">
                Employee: <code className="bg-zinc-100 px-1 py-0.5 rounded text-text-secondary">amogh@dayflow.io</code> / <code className="bg-zinc-100 px-1 py-0.5 rounded text-text-secondary">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Looking for the Admin Portal?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
