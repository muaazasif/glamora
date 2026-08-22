import { Bell, Search, Plus, User } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search products, orders, customers..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-champagne rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 bg-espresso text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-chocolate transition-colors">
          <Plus size={18} />
          Quick Add
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
          <User size={20} className="text-slate-600" />
        </div>
      </div>
    </header>
  );
};
