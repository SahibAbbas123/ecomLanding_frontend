// lib/repos/productsRepo.ts
export type Product = {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
};

let _data: Product[] = [
  { id: "1", title: "Wireless Headphones Pro", price: 199, stock: 42, category: "Electronics" },
  { id: "2", title: "Premium Leather Jacket",   price: 299, stock: 12, category: "Fashion" },
];

export const productsRepo = {
  async list() { return [..._data]; },
  async create(p: Omit<Product, "id">) {
    const id = String(Date.now());
    const row = { id, ...p };
    _data.unshift(row);
    return row;
  },
  async update(id: string, patch: Partial<Product>) {
    _data = _data.map((x) => (x.id === id ? { ...x, ...patch } : x));
  },
  async remove(id: string) { _data = _data.filter((x) => x.id !== id); },
};
