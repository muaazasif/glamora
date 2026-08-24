import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { supabase } from '../lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';

const EditProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Populate form when product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
      });
      setImageUrl(product.image_url || '');
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: any) => {
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/admin/products');
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      alert('Error updating product details.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = imageUrl;

      // 1. If a new file is uploaded, upload it to storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
        
        finalImageUrl = publicUrl;
      }

      // 2. Save updated product
      await updateProductMutation.mutateAsync({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: finalImageUrl
      });
    } catch (error) {
      console.error("Update error:", error);
      alert('Error updating product. Check console.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-espresso" size={40} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-red-500 font-bold">Product not found or error loading product.</p>
            <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 bg-espresso text-white px-4 py-2 rounded-xl">
              <ArrowLeft size={18} /> Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ArrowLeft size={24} className="text-espresso" />
              </button>
              <h1 className="text-3xl font-bold text-espresso">Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4 text-espresso">Basic Information</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                      <input 
                        className="w-full p-3 border border-slate-200 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-espresso/20" 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea 
                        className="w-full p-3 border border-slate-200 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-espresso/20 h-32" 
                        placeholder="Description" 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                        required 
                      />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold mb-4 text-espresso">Pricing & Images</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Price (PKR)</label>
                      <input 
                        className="w-full p-3 border border-slate-200 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-espresso/20" 
                        placeholder="Price" 
                        type="number" 
                        step="0.01"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})} 
                        required 
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Image</label>
                      {imageUrl && (
                        <div className="mb-3 w-32 h-32 rounded-xl overflow-hidden border border-slate-100">
                          <img src={imageUrl} alt={formData.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="block text-sm font-medium text-slate-700 mb-1">Upload New Image (Optional)</label>
                      <input 
                        className="w-full p-3 border border-slate-200 rounded-xl text-espresso focus:outline-none focus:ring-2 focus:ring-espresso/20" 
                        type="file" 
                        accept="image/*"
                        onChange={e => setFile(e.target.files?.[0] || null)} 
                      />
                    </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={saving} 
                  className="col-span-1 md:col-span-2 bg-espresso text-white py-3 rounded-xl font-bold hover:bg-chocolate transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="animate-spin" size={18} />}
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </button>
            </form>
        </main>
      </div>
    </div>
  );
};

export default EditProductPage;
