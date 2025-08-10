"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/useAuthStore";

const enabled =
  process.env.NEXT_PUBLIC_SHOW_DEV_AUTH === "1" || process.env.NODE_ENV !== "production";

export default function DevAuthSwitch() {
  const loginAs = useAuthStore((s) => s.loginAs);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const router = useRouter();

  const label = useMemo(() => {
    if (!user) return "Guest";
    return `${user.name || user.email} ${isAdmin ? "(admin)" : ""}`;
  }, [user, isAdmin]);

  if (!enabled) return null;

  return (
    <div className="fixed z-[9999] right-4 bottom-4 flex items-center gap-2 rounded-xl border bg-white/90 backdrop-blur px-3 py-2 shadow-lg">
      <span className="text-xs text-gray-600 hidden sm:inline">Dev Auth: {label}</span>
      <button
        onClick={() => {
          loginAs({ email: "admin@example.com", name: "Admin", role: "admin" }, "mock-token-1");
          router.push("/admin"); // 
        }}
        className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
        title="Login as admin"
      >
        Admin
      </button>
      <button
        onClick={() => {
          loginAs({ email: "user@example.com", name: "Demo User", role: "user" }, "mock-token-2");
          router.push("/"); // Optional: redirect to home after user login
        }}
        className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
        title="Login as user"
      >
        User
      </button>
      <button
        onClick={logout}
        className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
}
