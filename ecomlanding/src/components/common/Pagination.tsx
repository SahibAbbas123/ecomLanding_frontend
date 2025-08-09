// this is src/components/common/Pagination.tsx
"use client";
export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex gap-2 justify-center">
      <button
        className="px-3 py-1 rounded border"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-teal-600 text-white" : ""}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}