import React from 'react';
import { Bell, Search, Building2, UserCircle2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-[#D6E1DE] px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Search / Campus Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#F4F7F6] border border-[#D6E1DE] px-3 py-1.5 rounded-xl text-xs text-[#10213A]">
          <Building2 className="w-3.5 h-3.5 text-[#16A085]" />
          <span className="font-semibold">Main Campus</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
            AY 2026–27
          </span>
        </div>

        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources, departments, anomalies..."
            className="w-72 bg-[#F4F7F6] border border-[#D6E1DE] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#10213A] placeholder:text-slate-400 focus:outline-hidden focus:border-[#16A085] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right User & Status Area */}
      <div className="flex items-center gap-3">
        {/* System Tag */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5F1] text-[#16A085] text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A085]"></span>
          Intelligence Active
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-500 hover:bg-[#F4F7F6] hover:text-[#10213A] border border-transparent hover:border-[#D6E1DE] transition-all cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D64550] rounded-full"></span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#D6E1DE]">
          <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs">
            <UserCircle2 className="w-5 h-5 text-slate-200" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-[#10213A] leading-tight">Campus Admin</p>
            <p className="text-[10px] text-slate-500">Estates & Sustainability</p>
          </div>
        </div>
      </div>
    </header>
  );
};
