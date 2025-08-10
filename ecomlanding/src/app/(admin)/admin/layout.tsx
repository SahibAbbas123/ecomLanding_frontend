"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "../../../components/admin/AdminGuard";
import { useAuthStore } from "../../../lib/store/useAuthStore";
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import DevAuthSwitch from "../../../components/admin/DevAuthSwitch";

const nav = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  return (
    <AdminGuard>
      <div className="min-h-screen grid grid-cols-[260px_1fr] bg-gray-50">
        <aside className="bg-white border-r flex flex-col">
          <div className="p-4 font-bold text-xl">ShopFlow Admin</div>
          <nav className="px-2 space-y-1">
            {nav.map((item) => {
              const Active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                    ${Active ? "bg-teal-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-2 mt-auto">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        <div className="min-h-screen">
          <header className="h-14 bg-white border-b flex items-center justify-between px-4">
            <div className="text-sm text-gray-500">Admin Panel</div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
      <DevAuthSwitch />  
    </AdminGuard>
  );
}
