//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/profile/AddressBook.tsx
"use client";
import { useAuthStore } from "../../lib/store/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";

type EditingType = null | "add" | string;

export default function AddressBook() {
  const { user, addAddress, editAddress, deleteAddress } = useAuthStore();
  const [editing, setEditing] = useState<EditingType>(null);
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  const addresses = user?.addresses || [];

  function openAdd() {
    setEditing("add");
    setForm({ name: "", street: "", city: "", zip: "", country: "" });
  }

  function openEdit(addr) {
    setEditing(addr.id);
    setForm({
      name: addr.name,
      street: addr.street,
      city: addr.city,
      zip: addr.zip,
      country: addr.country,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing && editing !== "add") {
      editAddress(editing, form);
      toast.success("Address updated!");
    } else if (editing === "add") {
      addAddress(form);
      toast.success("Address added!");
    }
    setEditing(null);
    setForm({ name: "", street: "", city: "", zip: "", country: "" });
  }

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Address Book</h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          onClick={openAdd}
        >Add Address</button>
      </div>
      {(editing !== null) && (
        <form className="mb-6 bg-gray-50 p-4 rounded" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="border rounded px-3 py-2" placeholder="Street" value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} required />
            <input className="border rounded px-3 py-2" placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} required />
            <input className="border rounded px-3 py-2" placeholder="ZIP" value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} required />
            <input className="border rounded px-3 py-2" placeholder="Country" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} required />
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700" type="submit">
              {editing === "add" ? "Add" : "Save"}
            </button>
            <button className="px-6 py-2 rounded bg-gray-100" onClick={() => setEditing(null)} type="button">
              Cancel
            </button>
          </div>
        </form>
      )}
      <ul className="space-y-4">
        {addresses.length === 0 && <li className="text-gray-400">No addresses yet.</li>}
        {addresses.map(addr => (
          <li key={addr.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold">{addr.name}</div>
              <div>{addr.street}, {addr.city}, {addr.zip}, {addr.country}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className="text-sm text-teal-600 hover:underline"
                onClick={() => openEdit(addr)}
              >Edit</button>
              <button
                className="text-sm text-red-500 hover:underline"
                onClick={() => { deleteAddress(addr.id); toast("Address deleted", { icon: "🗑️" }); }}
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
