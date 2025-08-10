// app/(admin)/admin/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import { usersRepo, UserRow } from "../../../../lib/repos/usersRepo";

export default function AdminUsers() {
  const [rows, setRows] = useState<UserRow[]>([]);

  useEffect(() => { usersRepo.list().then(setRows); }, []);

  async function setRole(id: string, role: "user" | "admin") {
    await usersRepo.setRole(id, role);
    setRows((r) => r.map((u) => (u.id === id ? { ...u, role } : u)));
  }
  async function toggleActive(id: string) {
    await usersRepo.toggleActive(id);
    setRows((r) => r.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <select
                    className="rounded-md border px-2 py-1 text-sm"
                    value={u.role}
                    onChange={(e) => setRole(u.id, e.target.value as "user" | "admin")}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${u.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                    {u.active ? "active" : "inactive"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleActive(u.id)}
                    className="px-3 py-1 rounded-md border hover:bg-gray-50 text-sm"
                  >
                    {u.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-6 text-center text-gray-500" colSpan={5}>No users</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
