import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  BarChart3,
  Zap,
  Droplets,
  Wifi,
  Utensils,
  DollarSign,
  Users,
  Leaf,
  Calendar,
  AlertTriangle,
  Sparkles,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';

const navItems = [
  { label: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload Data', path: '/upload', icon: UploadCloud },
  { label: 'Resource Analysis', path: '/analysis', icon: BarChart3 },
  { section: 'DEPARTMENT DOMAINS' },
  { label: 'Electricity', path: '/electricity', icon: Zap },
  { label: 'Water', path: '/water', icon: Droplets },
  { label: 'Wi-Fi / IT', path: '/wifi', icon: Wifi },
  { label: 'Food / Mess', path: '/food', icon: Utensils },
  { label: 'Finance & Utility', path: '/finance', icon: DollarSign },
  { label: 'Students / Demographics', path: '/students', icon: Users },
  { label: 'Environment & Telemetry', path: '/environment', icon: Leaf },
  { label: 'Academic Calendar', path: '/calendar', icon: Calendar },
  { section: 'INTELLIGENCE & SYSTEM' },
  { label: 'System Alerts', path: '/alerts', icon: AlertTriangle, badge: '3' },
  { label: 'AI Campus Advisor', path: '/ai-advisor', icon: Sparkles, badge: 'AI' },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#0B1F3A] text-slate-200 flex flex-col h-screen sticky top-0 border-r border-[#142B4A] select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#142B4A] bg-[#08172c]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16A085] to-[#2ecc71] flex items-center justify-center text-white font-bold shadow-md shadow-[#16A085]/20">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white flex items-center gap-1.5">
              {APP_CONFIG.name}
            </h1>
            <p className="text-[10px] text-[#16A085] font-medium tracking-wider uppercase">
              Resource Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {navItems.map((item, index) => {
          if (item.section) {
            return (
              <div
                key={`sec-${index}`}
                className="pt-4 pb-1.5 px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase"
              >
                {item.section}
              </div>
            );
          }

          if (!item.path || !item.icon) return null;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#16A085] text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-[#142B4A] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    item.badge === 'AI'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-[#142B4A] bg-[#08172c] text-xs">
        <div className="bg-[#142B4A]/60 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A085] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A085]"></span>
            </span>
            <span className="text-[11px] text-slate-300 font-medium">Supabase Cloud</span>
          </div>
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A085]" />
        </div>
      </div>
    </aside>
  );
};
