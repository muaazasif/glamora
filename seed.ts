// This script is for demonstration purposes.
// Run this in your local console or via a temporary test file after setting up Supabase.

import { supabase } from './src/lib/supabase';

const dummyProducts = [
  { name: 'Radiant Glow Serum', description: 'Hydrating serum for instant glow.', price: 29.99, image_url: 'https://via.placeholder.com/150' },
  { name: 'Velvet Matte Lipstick', description: 'Long-lasting matte finish.', price: 15.50, image_url: 'https://via.placeholder.com/150' },
  { name: 'Hydrating Night Cream', description: 'Rich cream for overnight repair.', price: 35.00, image_url: 'https://via.placeholder.com/150' },
];

async function seedData() {
  const { error } = await supabase.from('products').insert(dummyProducts);
  if (error) console.error('Error seeding data:', error);
  else console.log('Dummy data inserted successfully!');
}

// Uncomment to run:
// seedData();
