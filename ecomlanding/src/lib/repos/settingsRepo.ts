// lib/repos/settingsRepo.ts
export type StoreSettings = {
  storeName: string;
  currency: "USD" | "EUR" | "BDT";
  lowStockThreshold: number;
  payments: { cod: boolean; card: boolean; bkash: boolean; nagad: boolean };
};

let _settings: StoreSettings = {
  storeName: "ShopFlow",
  currency: "USD",
  lowStockThreshold: 5,
  payments: { cod: true, card: false, bkash: false, nagad: false },
};

export const settingsRepo = {
  async get() { return { ..._settings }; },
  async update(patch: Partial<StoreSettings>) {
    _settings = { ..._settings, ...patch };
    return { ..._settings };
  },
};
