// app/(admin)/admin/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
// import ProductForm, { ProductFormValues } from '../ProductForm.tsx';
import { productsRepo, Product } from "../../../../lib/repos/productsRepo";
import { toast } from "sonner";
import ProductForm, { ProductFormOutput } from "../../../../components/admin/ProductForm";


export default function AdminProducts() {
  const [rows, setRows] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    productsRepo.list().then(setRows);
  }, []);

  async function handleCreate(values: ProductFormOutput) {
    // values.price and values.stock are numbers here (already coerced)
    const created = await productsRepo.create(values);
    setRows((r) => [created, ...r]);
    setOpen(false);
    toast.success("Product created");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-600 text-white text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md border hover:bg-gray-50" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-md border hover:bg-gray-50"
                      title="Delete"
                      onClick={async () => {
                        await productsRepo.remove(p.id);
                        setRows((r) => r.filter((x) => x.id !== p.id));
                        toast("Deleted");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-6 text-center text-gray-500" colSpan={5}>No products</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simple modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-4 shadow-xl">
            <div className="mb-3 text-lg font-semibold">Add Product</div>
            <ProductForm onSubmit={handleCreate} onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
