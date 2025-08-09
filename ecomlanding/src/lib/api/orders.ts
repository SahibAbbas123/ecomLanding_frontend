// this is /Users/sahibabc/ecomLanding/ecomlanding/src/lib/api/orders.ts
// Simulated API for orders
import { Order } from '../types/order';

// Generate more mock orders
const generateMockOrders = (count: number): Order[] => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];
  const products = [
    { title: "Premium Headphones", price: 199.99 },
    { title: "Wireless Mouse", price: 29.99 },
    { title: "Mechanical Keyboard", price: 149.99 },
    { title: "4K Monitor", price: 399.99 },
    { title: "Gaming Mouse Pad", price: 19.99 },
    { title: "USB-C Hub", price: 49.99 },
  ];

  return Array.from({ length: count }, (_, i) => {
    const items = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, j) => {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        return {
          id: `ITEM${i}${j}`,
          ...product,
          quantity,
        };
      }
    );

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days

    return {
      id: `ORD${String(i + 1).padStart(3, '0')}`,
      date: date.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total,
      items,
      shippingAddress: {
        name: "John Doe",
        address: "123 Main St",
        city: "Springfield",
        zip: "12345"
      }
    };
  });
};

// Simulated API endpoints
export const ordersApi = {
  // Get orders with pagination, sorting, and filtering
  getOrders: async ({
    page = 1,
    limit = 10,
    sort = 'date',
    order = 'desc',
    status,
  }: {
    page: number;
    limit: number;
    sort?: 'date' | 'total';
    order?: 'asc' | 'desc';
    status?: Order['status'];
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate 50 mock orders
    let orders = generateMockOrders(50);

    // Apply filtering
    if (status) {
      orders = orders.filter(order => order.status === status);
    }

    // Apply sorting
    orders.sort((a, b) => {
      const multiplier = order === 'asc' ? 1 : -1;
      if (sort === 'date') {
        return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return multiplier * (a.total - b.total);
    });

    // Apply pagination
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      pagination: {
        total: totalOrders,
        totalPages,
        currentPage: page,
        limit,
      }
    };
  },

  // Get a single order by ID
  getOrder: async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const orders = generateMockOrders(50);
    const order = orders.find(o => o.id === id);

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  },
};
