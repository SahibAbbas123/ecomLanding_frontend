"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectIsAdmin, useAuthStore } from "../../lib/store/useAuthStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAdmin = useAuthStore(selectIsAdmin);

  useEffect(() => {
    if (!isAdmin) router.replace("/");
  }, [isAdmin, router]);

  if (!isAdmin) return null;
  return <>{children}</>;
}
