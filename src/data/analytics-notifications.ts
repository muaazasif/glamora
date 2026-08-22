export const analytics = Array.from({ length: 90 }, (_, i) => ({
  date: `2026-05-${String(i % 30 + 1).padStart(2, '0')}`,
  revenue: Math.floor(Math.random() * 5000) + 1000,
  orders: Math.floor(Math.random() * 50) + 5,
}));

export const notifications = [
  { id: 'n1', message: 'New order #12345 received.', date: '2026-08-20' },
  { id: 'n2', message: 'Low stock on Aurelia Radiance Serum.', date: '2026-08-19' },
  // ... more notifications
];
