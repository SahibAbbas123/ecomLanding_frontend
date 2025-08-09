//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/auth/AuthModal.tsx
"use client";
import { useState } from "react";
import { useAuthStore } from "../../lib/store/useAuthStore";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function AuthModal({ open, onClose, initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore(s => s.login);
  const register = useAuthStore(s => s.register);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(email, password)) setError("Invalid credentials (demo: email = password)");
    else {
      onClose();
      toast.success("Logged in successfully!");
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!register(email, password, name)) setError("Fill all fields");
    else {
      onClose();
      toast.success("Signed in successfully!");
    }
  };


  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full relative animate-fade-in">
        <button className="absolute top-4 right-4" onClick={onClose}><X /></button>
        <div className="mb-6 flex justify-center gap-8">
          <button
            onClick={() => { setTab("login"); setError(""); }}
            className={`font-bold pb-2 border-b-2 ${tab === "login" ? "border-teal-600 text-teal-700" : "border-transparent text-gray-400"}`}
          >Login</button>
          <button
            onClick={() => { setTab("register"); setError(""); }}
            className={`font-bold pb-2 border-b-2 ${tab === "register" ? "border-teal-600 text-teal-700" : "border-transparent text-gray-400"}`}
          >Register</button>
        </div>
        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input className="w-full border rounded px-4 py-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="w-full border rounded px-4 py-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-teal-600 text-white rounded px-4 py-2 font-semibold hover:bg-teal-700 transition">Login</button>
            <button type="button" className="w-full bg-gray-100 text-gray-700 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2" disabled>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> Continue with Google
            </button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input className="w-full border rounded px-4 py-2" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="w-full border rounded px-4 py-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="w-full border rounded px-4 py-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-teal-600 text-white rounded px-4 py-2 font-semibold hover:bg-teal-700 transition">Register</button>
            <button type="button" className="w-full bg-gray-100 text-gray-700 rounded px-4 py-2 font-semibold flex items-center justify-center gap-2" disabled>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> Continue with Google
            </button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>

        )}
      </div>
    </div>
  );
}