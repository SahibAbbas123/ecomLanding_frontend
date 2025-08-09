//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/profile/ChangePassword.tsx
"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../lib/store/useAuthStore";
import { toast } from "sonner";
import { validatePassword } from "../../lib/utils/passwordValidation";

interface ValidationErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

export default function ChangePassword({ onClose }: { onClose: () => void }) {
  const changePassword = useAuthStore(s => s.changePassword);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Real-time password strength calculation
  useEffect(() => {
    if (!next) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (next.length >= 8) strength += 20;
    if (/[A-Z]/.test(next)) strength += 20;
    if (/[a-z]/.test(next)) strength += 20;
    if (/[0-9]/.test(next)) strength += 20;
    if (/[!@#$%^&*]/.test(next)) strength += 20;
    
    setPasswordStrength(strength);
  }, [next]);

  // Real-time validation for confirm password
  useEffect(() => {
    if (confirm && next !== confirm) {
      setErrors(prev => ({ ...prev, confirm: "Passwords do not match" }));
    } else {
      setErrors(prev => ({ ...prev, confirm: undefined }));
    }
  }, [next, confirm]);

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate current password
      if (!current) {
        setErrors(prev => ({ ...prev, current: "Current password is required" }));
        return;
      }

      // Validate new password
      const { isValid, error } = validatePassword(next);
      if (!isValid) {
        setErrors(prev => ({ ...prev, next: error }));
        return;
      }

      // Validate confirm password
      if (next !== confirm) {
        setErrors(prev => ({ ...prev, confirm: "Passwords do not match" }));
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Here you would typically make an API call to verify the current password
      // and update to the new password
      if (!changePassword(current, next)) {
        setErrors(prev => ({ ...prev, current: "Current password is incorrect" }));
        return;
      }

      setErrors({});
      setCurrent("");
      setNext("");
      setConfirm("");
      toast.success("Password successfully updated!");
      onClose?.();
      
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
      console.error("Password change error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleChange} className="space-y-6">
      <div>
        <label htmlFor="current" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="current"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {errors.current && (
          <p className="mt-1 text-sm text-red-600">{errors.current}</p>
        )}
      </div>

      <div>
        <label htmlFor="new" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="new"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {next && (
          <div className="mt-2">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength <= 20
                      ? "bg-red-500"
                      : passwordStrength <= 40
                      ? "bg-orange-500"
                      : passwordStrength <= 60
                      ? "bg-yellow-500"
                      : passwordStrength <= 80
                      ? "bg-lime-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {passwordStrength}%
              </span>
            </div>
          </div>
        )}
        {errors.next && (
          <p className="mt-1 text-sm text-red-600">{errors.next}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {errors.confirm && (
          <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );

  return (
    <form className="space-y-4 max-w-sm" onSubmit={handleChange}>
      <div>
        <label className="block text-sm font-semibold mb-1">Current password</label>
        <input className="w-full border rounded px-4 py-2" type="password" value={current} onChange={e => setCurrent(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">New password</label>
        <input className="w-full border rounded px-4 py-2" type="password" value={next} onChange={e => setNext(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Confirm new password</label>
        <input className="w-full border rounded px-4 py-2" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
      </div>

      <button className="w-full bg-teal-600 text-white rounded px-4 py-2 font-semibold hover:bg-teal-700 transition" type="submit">
        Update Password
      </button>
    </form>
  );
}
