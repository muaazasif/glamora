import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '' });

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: any) => {
      const { data, error } = await supabase.from('products').insert([newProduct]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductMutation.mutate({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
            <h1 className="text-3xl font-bold text-espresso mb-8">Add New Product</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4">Basic Information</h2>
                    <input className="w-full p-3 border rounded-xl mb-4" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
                    <textarea className="w-full p-3 border rounded-xl mb-4" placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4">Pricing & Inventory</h2>
                    <input className="w-full p-3 border rounded-xl mb-4" placeholder="Price" type="number" onChange={e => setFormData({...formData, price: e.target.value})} />
                    <input className="w-full p-3 border rounded-xl mb-4" placeholder="Stock" type="number" onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
                <button type="submit" className="col-span-2 bg-espresso text-white py-3 rounded-xl font-bold">Save Product</button>
            </form>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;
