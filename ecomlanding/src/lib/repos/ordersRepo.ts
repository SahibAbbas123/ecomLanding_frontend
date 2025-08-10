// lib/repos/ordersRepo.ts
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  date: string;
};

let _orders: Order[] = [
  { id: "ORD-1001", customer: "Jane Doe", total: 199, status: "processing", date: "2025-08-06" },
  { id: "ORD-1002", customer: "John Smith", total: 79, status: "shipped", date: "2025-08-07" },
];

export const ordersRepo = {
  async list() { return [..._orders]; },
  async setStatus(id: string, status: OrderStatus) {
    _orders = _orders.map((o) => (o.id === id ? { ...o, status } : o));
  },
};
