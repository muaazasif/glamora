import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
...
const ProductManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
...
            <h1 className="text-3xl font-bold text-espresso">Products</h1>
            <button 
              onClick={() => navigate('/admin/products/add')}
              className="flex items-center gap-2 bg-espresso text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-chocolate transition-colors">
              <Plus size={18} />
              Add Product
            </button>
          </div>
...

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {isLoading ? (
                <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin" /></div>
            ) : (
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {products?.map((product: any) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-espresso">{product.name}</td>
                            <td className="px-6 py-4 font-medium text-espresso">${product.price}</td>
                            <td className="px-6 py-4">
                                <button className="text-slate-400 hover:text-espresso"><MoreVertical size={18}/></button>
                            </td>
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
};

export default ProductManagement;
