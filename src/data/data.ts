import type { Customer, Order, Review } from '../types';

export const customers: Customer[] = [
  { id: 'c1', name: 'Eleanor Vance', email: 'e.vance@example.com' },
  { id: 'c2', name: 'Sebastian Thorne', email: 's.thorne@example.com' },
  { id: 'c3', name: 'Isolde Sterling', email: 'i.sterling@example.com' },
  // ... more customers
];

export const orders: Order[] = [
  { id: 'o1', customerId: 'c1', total: 150, date: '2026-08-01' },
  { id: 'o2', customerId: 'c2', total: 275, date: '2026-08-02' },
  // ... more orders
];

export const reviews: Review[] = [
  { id: 'r1', productId: '1', rating: 5, comment: 'Absolutely divine!' },
  { id: 'r2', productId: '2', rating: 4, comment: 'Very luxurious feel.' },
  // ... more reviews
];
