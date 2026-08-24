import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};

const ProductManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please check console for details.");
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProductMutation.mutate(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-espresso">Products</h1>
            <button 
              onClick={() => navigate('/admin/products/add')}
              className="flex items-center gap-2 bg-espresso text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-chocolate transition-colors">
              <Plus size={18} />
              Add Product
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {isLoading ? (
                <div className="p-12 flex items-center justify-center"><Loader2 className="animate-spin text-espresso" /></div>
            ) : (
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Product Image</th>
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {products && products.length > 0 ? (
                      products.map((product: any) => (
                          <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                  {product.image_url ? (
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100">
                                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 font-medium">No Image</div>
                                  )}
                              </td>
                              <td className="px-6 py-4 font-medium text-espresso">{product.name}</td>
                              <td className="px-6 py-4 font-medium text-espresso">PKR {Number(product.price).toLocaleString()}</td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <button 
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        className="p-2 text-slate-500 hover:text-espresso hover:bg-slate-100 rounded-lg transition-colors"
                                        title="Edit"
                                      >
                                        <Edit size={16} />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-slate-500">No products found. Click "Add Product" to create one.</td>
                      </tr>
                    )}
                </tbody>
            </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;
