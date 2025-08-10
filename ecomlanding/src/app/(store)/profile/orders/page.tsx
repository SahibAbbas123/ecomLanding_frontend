"use client";

import { useState, useEffect } from "react";
import { Order } from "../../../../lib/types/order";
import { ordersApi } from "../../../../lib/api/orders";
import Pagination from "../../../../components/common/Pagination";

type SortOption = "date" | "total";
type SortOrder = "asc" | "desc";

// Helper function for status colors
const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderHistory() {
  // State for orders and selected order
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // Filtering and sorting state
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "">("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getOrders({
        page,
        limit,
        sort: sortBy,
        order: sortOrder,
        status: statusFilter || undefined,
      });
      setOrders(response.orders);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {!selectedOrder && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <select
              className="border rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as Order["status"] | "");
                setPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split(
                  "-"
                ) as [SortOption, SortOrder];
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
                setPage(1);
              }}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest Amount</option>
              <option value="total-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      )}

      {selectedOrder ? (
        <div>
          <button
            onClick={() => setSelectedOrder(null)}
            className="mb-4 text-teal-600 hover:underline flex items-center gap-2"
          >
            ← Back to Orders
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Order #{selectedOrder.id}
                </h2>
                <p className="text-gray-600">
                  Placed on{" "}
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status.charAt(0).toUpperCase() +
                  selectedOrder.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-b py-4 my-4">
              <h3 className="font-semibold mb-2">Items</h3>
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-gray-600">
                  <p>{selectedOrder.shippingAddress.name}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.zip}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-semibold mb-2">Order Total</h3>
                <p className="text-2xl font-bold">
                  ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() +
                    order.status.slice(1)}
                </span>
              </div>

              <div className="mt-2">
                <p className="text-gray-600">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
                <p className="font-medium mt-1">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
