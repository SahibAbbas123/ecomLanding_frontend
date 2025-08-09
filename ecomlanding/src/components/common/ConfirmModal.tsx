//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/common/ConfirmModal.tsx
"use client";
export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative animate-fade-in">
        <div className="mb-4 text-lg font-bold">{title}</div>
        <div className="mb-8 text-gray-700">{message}</div>
        <div className="flex gap-4 justify-end">
          <button
            className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
            onClick={onCancel}
          >Cancel</button>
          <button
            className="px-6 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
            onClick={onConfirm}
          >Yes</button>
        </div>
      </div>
    </div>
  );
}