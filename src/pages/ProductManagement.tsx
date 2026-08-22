import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { products } from '../data/mockData';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';

const ProductManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-espresso">Products</h1>
            <button className="flex items-center gap-2 bg-espresso text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-chocolate transition-colors">
              <Plus size={18} />
              Add Product
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl w-64">
                    <Search size={18} className="text-slate-400" />
                    <input type="text" placeholder="Search products..." className="bg-transparent border-none outline-none text-sm w-full" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">
                    <Filter size={18} />
                    Filters
                </button>
            </div>
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Product</th>
                        <th className="px-6 py-4 text-left">SKU</th>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Stock</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-espresso">{product.name}</td>
                            <td className="px-6 py-4 text-slate-600">{product.sku}</td>
                            <td className="px-6 py-4 text-slate-600">{product.category}</td>
                            <td className="px-6 py-4 font-medium text-espresso">${product.price}</td>
                            <td className="px-6 py-4 text-slate-600">{product.stock}</td>
                            <td className="px-6 py-4">
                                <button className="text-slate-400 hover:text-espresso"><MoreVertical size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;
