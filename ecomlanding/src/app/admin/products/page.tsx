"use client";
import { useState } from 'react';
import { products as initialProducts } from '../../../lib/data/products';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleSave = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast.success('Product updated successfully');
    } else {
      // Add new product
      setProducts([...products, { ...product, id: crypto.randomUUID() }]);
      toast.success('Product added successfully');
    }
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  const ProductForm = ({ product, onSave, onCancel }: {
    product?: Product;
    onSave: (product: Product) => void;
    onCancel: () => void;
  }) => {
    const [form, setForm] = useState<Partial<Product>>(product || {
      title: '',
      category: '',
      price: 0,
      rating: 5,
      image: '',
      inStock: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.title || !form.category || !form.price || !form.image) {
        toast.error('Please fill all required fields');
        return;
      }
      onSave(form as Product);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category *</label>
          <select
            value={form.category || ''}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            required
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home-garden">Home & Garden</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
            <option value="beauty">Beauty</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price *</label>
          <input
            type="number"
            value={form.price || ''}
            onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL *</label>
          <input
            type="url"
            value={form.image || ''}
            onChange={e => setForm({ ...form, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            value={form.rating || 5}
            onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={e => setForm({ ...form, inStock: e.target.checked })}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">In Stock</span>
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
        >
          Add Product
        </button>
      </div>

      {isAddingProduct && (
        <ProductForm
          onSave={handleSave}
          onCancel={() => setIsAddingProduct(false)}
        />
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.title} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{product.category.replace('-', ' ')}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-teal-600 hover:text-teal-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
