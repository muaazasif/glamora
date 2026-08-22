export const products = [
  { id: 'P001', name: 'Luxury Foundation', sku: 'L-FOUND-001', category: 'Face', price: 85, stock: 45, status: 'Active', rating: 4.8 },
  { id: 'P002', name: 'Velvet Matte Lipstick', sku: 'L-LIP-002', category: 'Lips', price: 45, stock: 120, status: 'Active', rating: 4.9 },
  { id: 'P003', name: 'Hydrating Serum', sku: 'L-SER-003', category: 'Skincare', price: 120, stock: 30, status: 'Active', rating: 4.7 },
  { id: 'P004', name: 'Vitamin C Serum', sku: 'L-SER-004', category: 'Skincare', price: 95, stock: 60, status: 'Active', rating: 4.6 },
  { id: 'P005', name: 'Glow Primer', sku: 'L-PRI-005', category: 'Face', price: 55, stock: 80, status: 'Active', rating: 4.5 },
  // ... add more products to reach 20
];

export const orders = [
  { id: 'ORD-1001', customer: 'Alice Smith', product: 'Luxury Foundation', date: '2026-08-20', amount: 85, status: 'Shipped' },
  { id: 'ORD-1002', customer: 'Bob Jones', product: 'Velvet Matte Lipstick', date: '2026-08-21', amount: 45, status: 'Processing' },
  // ... add more orders
];
