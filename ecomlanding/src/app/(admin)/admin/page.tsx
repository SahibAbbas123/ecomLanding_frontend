// app/(admin)/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { ordersRepo } from "../../../lib/repos/ordersRepo";
import { productsRepo } from "../../../lib/repos/productsRepo";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function AdminOverview() {
  const cards = [
    { label: "Revenue", value: "$24,300", sub: "+12% this month" },
    { label: "Orders", value: "1,284", sub: "+5% this week" },
    { label: "Customers", value: "3,912", sub: "+2% this week" },
    { label: "Products", value: "128", sub: "4 low stock" },
  ];

  const [kpis, setKpis] = useState([
    { label: "Revenue", value: "$24,300", sub: "+12% this month" },
    { label: "Orders", value: "1,284", sub: "+5% this week" },
    { label: "Customers", value: "3,912", sub: "+2% this week" },
    { label: "Products", value: "—", sub: "" },
  ]);
  const [sales, setSales] = useState<{ day: string; amount: number }[]>([]);
  const [byCat, setByCat] = useState<{ category: string; count: number }[]>([]);

  useEffect(() => {
    // mock data; replace with API when ready
    (async () => {
      const products = await productsRepo.list();
      setKpis((x) => x.map((c) => (c.label === "Products" ? { ...c, value: String(products.length) } : c)));
      setSales([
        { day: "Mon", amount: 420 }, { day: "Tue", amount: 510 }, { day: "Wed", amount: 380 },
        { day: "Thu", amount: 560 }, { day: "Fri", amount: 610 }, { day: "Sat", amount: 450 },
        { day: "Sun", amount: 700 },
      ]);
      const catMap = new Map<string, number>();
      products.forEach((p) => catMap.set(p.category, (catMap.get(p.category) ?? 0) + 1));
      setByCat(Array.from(catMap.entries()).map(([category, count]) => ({ category, count })));
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {/* Numbers */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="text-2xl font-bold">{c.value}</div>
            <div className="text-xs text-gray-500">{c.sub}</div>
          </div>
        ))}
      </section>
      {/* KPI cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((c) => (
          <div key={c.label} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-gray-500">{c.label}</div>
            <div className="text-2xl font-bold">{c.value}</div>
            {c.sub && <div className="text-xs text-gray-500">{c.sub}</div>}
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-4">
          <div className="font-medium mb-2">Weekly Sales</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="font-medium mb-2">Products by Category</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCat}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section> 
    </div>
  );
}
