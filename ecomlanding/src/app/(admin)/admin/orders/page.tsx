// app/(admin)/admin/orders/page.tsx
"use client";
import { useEffect, useState } from "react";
import { ordersRepo, Order, OrderStatus } from "../../../../lib/repos/ordersRepo";

const statuses: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [rows, setRows] = useState<Order[]>([]);

  useEffect(() => { ordersRepo.list().then(setRows); }, []);

  async function setStatus(id: string, status: OrderStatus) {
    await ordersRepo.setStatus(id, status);
    setRows((r) => r.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3">${o.total}</td>
                <td className="p-3">{o.date}</td>
                <td className="p-3">
                  <select
                    className="rounded-md border px-2 py-1 text-sm"
                    value={o.status}
                    onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-6 text-center text-gray-500" colSpan={5}>No orders</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
