//this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/cart/page.tsx
"use client";
import { useCartStore } from "../../../lib/store/useCartStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useCartStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <Link href="/products" className="text-teal-600 hover:underline">Shop now</Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <ul className="divide-y border rounded-lg bg-white shadow">
        {cart.map(item => (
          <li key={item.id} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price} x {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={e => updateQty(item.id, Number(e.target.value))}
                className="w-14 border rounded text-center"
              />
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <div className="font-bold text-xl">Total: ${total.toFixed(2)}</div>
        <button
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="mt-8 text-right">
        <Link href="/checkout">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition">
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
}