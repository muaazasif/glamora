import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Loader2, DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const fetchDashboardData = async () => {
    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
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
          <h1 className="text-3xl font-bold text-espresso mb-8">Dashboard Overview</h1>

          {isLoading ? (
              <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-champagne" size={48} /></div>
          ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: 'Total Revenue', value: `$${data?.totalRevenue.toLocaleString()}`, icon: DollarSign },
                    { title: 'Total Orders', value: data?.totalOrders, icon: ShoppingBag },
                    { title: 'Total Customers', value: 'N/A', icon: Users },
                    { title: 'Growth', value: '+12.5%', icon: TrendingUp },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm text-slate-500 mb-1">{stat.title}</h3>
                            <p className="text-2xl font-bold text-espresso">{stat.value}</p>
                        </div>
                        <stat.icon className="text-champagne" size={24} />
                    </div>
                ))}
            </div>

            {/* Analytics Graph */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-xl font-bold text-espresso mb-6">Revenue Analytics</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data?.orders.slice(0, 7).reverse().map(o => ({ name: new Date(o.created_at).toLocaleDateString(), revenue: o.total_amount })) || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE9DE" />
                            <XAxis dataKey="name" tick={{fontSize: 12}} />
                            <YAxis tick={{fontSize: 12}} />
                            <Tooltip contentStyle={{backgroundColor: '#211C19', color: '#FFF', borderRadius: '8px'}} />
                            <Line type="monotone" dataKey="revenue" stroke="#C7A875" strokeWidth={3} dot={{r: 4}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-espresso mb-6">Recent Orders</h2>
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
                                <td className="px-6 py-4 font-medium text-espresso">{order.customer_name || 'N/A'}</td>     
                                <td className="px-6 py-4 text-espresso">${order.total_amount || 0}</td>     
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}>{order.status || 'Pending'}</span>
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
}
