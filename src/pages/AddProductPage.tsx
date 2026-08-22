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
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("File:", file);
    console.log("FormData:", formData);
    
    if (!file) return alert('Please select an image');

    setUploading(true);
    console.log("Uploading set to true");
    try {
      // 1. Upload file
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      console.log("Starting upload:", fileName);
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      console.log("Upload successful");

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
      console.log("Public URL:", publicUrl);

      // 3. Save product
      console.log("Saving product to DB...");
      addProductMutation.mutate({
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/ /g, '-'),
        description: formData.description,
        price: parseFloat(formData.price),
        images: [publicUrl],
        thumbnail: publicUrl,
        category: 'Uncategorized',
        rating: 5,
        stock: 0
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert('Error uploading image or saving product. Check console.');
    } finally {
      setUploading(false);
      console.log("Uploading set to false");
    }
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
                    <input className="w-full p-3 border rounded-xl mb-4" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <textarea className="w-full p-3 border rounded-xl mb-4" placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} required />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4">Pricing & Images</h2>
                    <input className="w-full p-3 border rounded-xl mb-4" placeholder="Price" type="number" onChange={e => setFormData({...formData, price: e.target.value})} required />
                    <input className="w-full p-3 border rounded-xl mb-4" type="file" onChange={e => setFile(e.target.files?.[0] || null)} required />
                </div>
                <button type="submit" disabled={uploading} className="col-span-2 bg-espresso text-white py-3 rounded-xl font-bold disabled:bg-gray-400">
                  {uploading ? 'Uploading...' : 'Save Product'}
                </button>
            </form>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;
