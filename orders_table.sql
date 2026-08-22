-- Create orders table
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  total_amount decimal NOT NULL,
  items jsonb NOT NULL,
  status text DEFAULT 'Pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for checkout)
CREATE POLICY "Public insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Allow authenticated read (for admin)
CREATE POLICY "Admin read orders" ON public.orders
  FOR SELECT TO authenticated USING (true);
