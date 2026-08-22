import { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const fetchDashboardData = async () => {
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    const totalOrders = orders.length;

    return { orders, totalRevenue, totalOrders };
};

export default function AdminDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data, isLoading } = useQuery({
      queryKey: ['dashboardData'],
      queryFn: fetchDashboardData
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
          <h1 className="text-3xl font-bold text-espresso mb-8">Dashboard</h1>
          
          {isLoading ? <Loader2 className="animate-spin mx-auto" /> : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm text-slate-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-espresso">${data?.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm text-slate-500">Orders</h3>
                <p className="text-2xl font-bold text-espresso">{data?.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm text-slate-500">Customers</h3>
                <p className="text-2xl font-bold text-espresso">N/A</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm text-slate-500">Conversion Rate</h3>
                <p className="text-2xl font-bold text-espresso">N/A</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-espresso mb-4">Recent Orders</h2>
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Total</th>
                        <th className="px-6 py-4 text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data?.orders.slice(0, 5).map((order: any) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 font-medium text-espresso">{order.customer_name}</td>
                            <td className="px-6 py-4 font-medium text-espresso">${order.total_amount}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">{order.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          </>
          )}
        </main>
      </div>
    </div>
  );
};
