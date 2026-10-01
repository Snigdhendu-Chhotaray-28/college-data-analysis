import React from 'react';
import { Bell, ShieldCheck, Menu, Building2, Calendar, Clock, Sparkles, Database } from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export interface TopbarProps {
  onOpenSidebar: () => void;
  title?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSidebar,
  title = APP_CONFIG.appName,
}) => {
  const { isDemoMode, toggleDemoMode } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[64px] lg:h-[72px] px-4 lg:px-8 bg-white border-b border-[#D6E1DE] shadow-xs">
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-[#536477] hover:text-[#10213A] hover:bg-[#F4F7F6] lg:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#8A9AAB] uppercase tracking-wider">
            <span>{APP_CONFIG.brandName}</span>
            <span>/</span>
            <span className="text-[#16A085]">Resource Intelligence</span>
          </div>
          <h1 className="text-base lg:text-xl font-extrabold text-[#10213A] tracking-tight truncate">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Demo Mode Toggle Badge */}
        <button
          onClick={toggleDemoMode}
          title="Click to toggle between Demo Scenario Mode and Real Data Mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border shadow-2xs ${
            isDemoMode
              ? 'bg-[#F0A202]/15 text-[#B87A00] border-[#F0A202]/40 hover:bg-[#F0A202]/25'
              : 'bg-[#16A085]/15 text-[#0D6352] border-[#16A085]/40 hover:bg-[#16A085]/25'
          }`}
        >
          {isDemoMode ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#F0A202] animate-spin" />
              <span>DEMO DATASET ACTIVE</span>
            </>
          ) : (
            <>
              <Database className="w-3.5 h-3.5 text-[#16A085]" />
              <span>VERIFIED REAL DATA</span>
            </>
          )}
        </button>

        {/* Campus Selector */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE] text-xs font-semibold text-[#10213A]">
          <Building2 className="w-3.5 h-3.5 text-[#16A085]" />
          <select className="bg-transparent border-none outline-none font-bold text-xs text-[#10213A] cursor-pointer">
            <option value="main">Main Campus</option>
            <option value="north">North Quad</option>
            <option value="south">South Tech Park</option>
          </select>
        </div>

        {/* Academic Year */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE] text-xs font-semibold text-[#536477]">
          <Calendar className="w-3.5 h-3.5 text-[#314B80]" />
          <span>AY: <strong className="text-[#10213A]">2025–2026</strong></span>
        </div>

        {/* Current Month */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7F6] border border-[#D6E1DE] text-xs font-semibold text-[#536477]">
          <Clock className="w-3.5 h-3.5 text-[#F0A202]" />
          <span>Month: <strong className="text-[#10213A]">August 2026</strong></span>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5F1] border border-[#16A085]/30 text-xs text-[#16A085] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#16A085] animate-pulse" />
          <span className="hidden xl:inline">System Status:</span>
          <span>ONLINE</span>
        </div>

        <button
          className="relative p-2 rounded-xl text-[#536477] hover:text-[#10213A] hover:bg-[#F4F7F6] transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D64550]" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#D6E1DE]">
          <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-extrabold text-xs shadow-xs border border-[#142B4A]">
            AD
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#10213A] leading-tight">Admin User</div>
            <div className="text-[10px] text-[#8A9AAB] flex items-center gap-0.5 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#16A085]" />
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
