"use client";
import { useEffect, useState, useCallback } from "react";
import { settingsRepo, StoreSettings } from "../../../../lib/repos/settingsRepo";

export default function AdminSettings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    settingsRepo.get().then((s) => mounted && setSettings(s));
    return () => { mounted = false; };
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      setSaving(true);
      const next = await settingsRepo.update(settings);
      setSettings(next);
    } finally {
      setSaving(false);
    }
  }, [settings]);

  if (!settings) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* z-index + pointer-events safety */}
      <form
        onSubmit={onSubmit}
        className="relative z-10 pointer-events-auto rounded-xl border bg-white p-4 space-y-4 max-w-2xl"
        aria-busy={saving}
      >
        <div>
          <label className="block text-sm text-gray-600">Store Name</label>
          <input
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value as StoreSettings["currency"] })
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BDT">BDT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Low Stock Threshold</label>
            <input
              type="number"
              value={settings.lowStockThreshold}
              onChange={(e) =>
                setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-1">Payments</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["cod", "card", "bkash", "nagad"] as const).map((k) => (
              <label key={k} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={settings.payments[k]}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payments: { ...settings.payments, [k]: e.target.checked },
                    })
                  }
                />
                {k.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-1.5 rounded-md bg-teal-600 text-white text-sm disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
