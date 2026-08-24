import { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function Orders() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setOrders(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state to reflect change immediately
      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ));
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
          <h1 className="text-3xl font-bold text-espresso mb-8">Orders</h1>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
            {isLoading ? (
                <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin" /></div>
            ) : error ? (
                <div className="p-8 text-red-500">Error loading orders: {error}</div>
            ) : (
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Email</th>
                        <th className="px-6 py-4 text-left">Total</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {orders.map((order: any) => (
                        <tr key={order.id || Math.random()} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-espresso">{order.customer_name || order.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-slate-600">{order.customer_email || order.email || 'N/A'}</td>
                            <td className="px-6 py-4 font-medium text-espresso">${order.total_amount || order.total || 0}</td>
                            <td className="px-6 py-4">
                                <select 
                                    value={order.status || 'Pending'}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer border-none focus:ring-0 ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                    }`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
