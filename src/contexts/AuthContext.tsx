import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { Employee, Profile } from "@/types";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  employee: Employee | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // 1. Fetch user's profile to determine role (admin vs employee)
      const { data: profileData, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (profileErr) {
        console.error("Error fetching user profile:", profileErr);
        setError(`Failed to fetch profile: ${profileErr.message}`);
        return;
      }

      setProfile(profileData as Profile | null);

      // 2. Fetch associated employee record if it exists
      const { data: empData } = await supabase
        .from("employees")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      setEmployee(empData as Employee | null);
      setError(null);
    } catch (err) {
      console.error("Unexpected error in fetchUserData:", err);
      setError(err instanceof Error ? err.message : "Failed to load user profile");
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Check existing active session on mount
    supabase.auth.getSession().then(({ data: { session: currentSession }, error: sessionErr }) => {
      if (!mounted) return;
      if (sessionErr) {
        console.error("Error retrieving Supabase session:", sessionErr);
        setError(sessionErr.message);
        setLoading(false);
        return;
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchUserData(currentSession.user.id).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setProfile(null);
        setEmployee(null);
        setLoading(false);
      }
    });

    // Listen for auth state changes (sign in, token refresh, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchUserData(newSession.user.id);
      } else {
        setProfile(null);
        setEmployee(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserData]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      setError(null);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        console.error("Supabase signIn error:", authError);
        return { error: authError.message };
      }

      if (data.user) {
        await fetchUserData(data.user.id);
      }

      return {};
    },
    [fetchUserData],
  );

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Supabase signOut error:", err);
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
      setEmployee(null);
      setError(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchUserData(user.id);
    }
  }, [user?.id, fetchUserData]);

  const isAdmin = useMemo(() => profile?.role === "admin", [profile?.role]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile,
      employee,
      isAdmin,
      loading,
      error,
      signIn,
      signOut,
      refreshProfile,
    }),
    [user, session, profile, employee, isAdmin, loading, error, signIn, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

