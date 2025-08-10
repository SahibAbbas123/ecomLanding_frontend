// this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/checkout/page.tsx
"use client";
import { useState } from "react";
import { useCartStore } from "../../../lib/store/useCartStore";
import Link from "next/link";

const steps = ["Address", "Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    shipping: "standard",
    payment: "cod",
    cardType: "",
    card: "",
  });
  
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    zip: false,
    cardType: false,
    card: false,
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cart.length === 0 && !orderPlaced)
    return (
      <div className="max-w-xl mx-auto py-32 text-center">
        <h1 className="text-2xl font-bold mb-2">Cart is empty</h1>
        <Link href="/products" className="text-teal-600 hover:underline">Go to Products</Link>
      </div>
    );

  if (orderPlaced)
    return (
      <div className="max-w-xl mx-auto py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-4">You’ll get an email with your order confirmation.</p>
        <Link href="/products" className="text-teal-600 hover:underline">Continue Shopping</Link>
      </div>
    );

  // Step content
  let content;
  switch (step) {
    case 0:
      content = (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <input 
                className={`border rounded px-4 py-2 ${errors.name ? 'border-red-500' : ''}`} 
                placeholder="Full Name *" 
                value={form.name} 
                onChange={e => {
                  setForm(f => ({ ...f, name: e.target.value }));
                  setErrors(e => ({ ...e, name: false }));
                }} 
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
            </div>
            <div className="flex flex-col">
              <input 
                className={`border rounded px-4 py-2 ${errors.phone ? 'border-red-500' : ''}`} 
                placeholder="Phone *" 
                value={form.phone} 
                onChange={e => {
                  setForm(f => ({ ...f, phone: e.target.value }));
                  setErrors(e => ({ ...e, phone: false }));
                }} 
              />
              {errors.phone && <span className="text-red-500 text-sm mt-1">Phone is required</span>}
            </div>
            <div className="flex flex-col">
              <input 
                className={`border rounded px-4 py-2 ${errors.email ? 'border-red-500' : ''}`} 
                placeholder="Email *" 
                value={form.email} 
                onChange={e => {
                  setForm(f => ({ ...f, email: e.target.value }));
                  setErrors(e => ({ ...e, email: false }));
                }} 
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
            </div>
            <div className="flex flex-col">
              <input 
                className={`border rounded px-4 py-2 ${errors.city ? 'border-red-500' : ''}`} 
                placeholder="City *" 
                value={form.city} 
                onChange={e => {
                  setForm(f => ({ ...f, city: e.target.value }));
                  setErrors(e => ({ ...e, city: false }));
                }} 
              />
              {errors.city && <span className="text-red-500 text-sm mt-1">City is required</span>}
            </div>
            <div className="flex flex-col sm:col-span-2">
              <input 
                className={`border rounded px-4 py-2 ${errors.address ? 'border-red-500' : ''}`} 
                placeholder="Address *" 
                value={form.address} 
                onChange={e => {
                  setForm(f => ({ ...f, address: e.target.value }));
                  setErrors(e => ({ ...e, address: false }));
                }} 
              />
              {errors.address && <span className="text-red-500 text-sm mt-1">Address is required</span>}
            </div>
            <div className="flex flex-col">
              <input 
                className={`border rounded px-4 py-2 ${errors.zip ? 'border-red-500' : ''}`} 
                placeholder="ZIP *" 
                value={form.zip} 
                onChange={e => {
                  setForm(f => ({ ...f, zip: e.target.value }));
                  setErrors(e => ({ ...e, zip: false }));
                }} 
              />
              {errors.zip && <span className="text-red-500 text-sm mt-1">ZIP is required</span>}
            </div>
          </div>
        </div>
      );
      break;
    case 1:
      content = (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Shipping Method</h2>
          <label className="flex items-center gap-2">
            <input type="radio" name="shipping" checked={form.shipping === "standard"} onChange={() => setForm(f => ({ ...f, shipping: "standard" }))} /> Standard (3-5 days)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="shipping" checked={form.shipping === "express"} onChange={() => setForm(f => ({ ...f, shipping: "express" }))} /> Express (1-2 days)
          </label>
        </div>
      );
      break;
    case 2:
      content = (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Payment</h2>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" checked={form.payment === "cod"} onChange={() => setForm(f => ({ ...f, payment: "cod" }))} /> Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" checked={form.payment === "card"} onChange={() => setForm(f => ({ ...f, payment: "card" }))} /> Credit Card
          </label>
          {form.payment === "card" && (
            <div className="space-y-4">
              <div className="flex flex-col">
                <select 
                  className={`border rounded px-4 py-2 ${errors.cardType ? 'border-red-500' : ''}`}
                  value={form.cardType}
                  onChange={e => {
                    setForm(f => ({ ...f, cardType: e.target.value }));
                    setErrors(e => ({ ...e, cardType: false }));
                  }}
                >
                  <option value="">Select Card Type *</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                  <option value="dinersclub">Diners Club</option>
                </select>
                {errors.cardType && <span className="text-red-500 text-sm mt-1">Please select a card type</span>}
              </div>
              <div className="flex flex-col">
                <input 
                  className={`border rounded px-4 py-2 ${errors.card ? 'border-red-500' : ''}`} 
                  placeholder="Card Number *" 
                  value={form.card} 
                  onChange={e => {
                    setForm(f => ({ ...f, card: e.target.value }));
                    setErrors(e => ({ ...e, card: false }));
                  }} 
                />
                {errors.card && <span className="text-red-500 text-sm mt-1">Card number is required</span>}
              </div>
            </div>
          )}
        </div>
      );
      break;
    case 3:
      content = (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Review Order</h2>
          <div className="bg-gray-50 p-4 rounded">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
          </div>
          <div className="text-gray-600">
            <div>Name: {form.name}</div>
            <div>Email: {form.email}</div>
            <div>Phone: {form.phone}</div>
            <div>Address: {form.address}, {form.city}, {form.zip}</div>
            <div>Shipping: {form.shipping === "standard" ? "Standard" : "Express"}</div>
            <div>Payment: {form.payment === "cod" ? "Cash on Delivery" : `Credit Card ${form.card}`}</div>
          </div>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6 flex items-center gap-2 justify-center">
        {steps.map((label, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${idx === step ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {label}
          </span>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          let isValid = true;
          const newErrors = { ...errors };

          if (step === 0) {
            // Validate address fields
            ['name', 'phone', 'email', 'address', 'city', 'zip'].forEach(field => {
              if (!form[field]) {
                newErrors[field] = true;
                isValid = false;
              } else {
                newErrors[field] = false;
              }
            });
          } else if (step === 2 && form.payment === 'card') {
            // Validate card fields
            if (!form.cardType) {
              newErrors.cardType = true;
              isValid = false;
            }
            if (!form.card) {
              newErrors.card = true;
              isValid = false;
            }
          }

          setErrors(newErrors);
          
          if (isValid) {
            if (step < steps.length - 1) setStep(s => s + 1);
            else {
              setOrderPlaced(true);
              clearCart();
            }
          }
        }}
        className="space-y-8"
      >
        {content}
        <div className="flex gap-4 justify-between">
          <button
            type="button"
            className="px-6 py-2 rounded bg-gray-100"
            disabled={step === 0}
            onClick={() => setStep(s => s - 1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            {step < steps.length - 1 ? "Next" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}