import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  BrainCircuit,
  Map as MapIcon,
  Calendar as CalendarIcon,
  History,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { View, User } from "../types";

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  user: User | null;
  onLogout: () => void;
  isOpen: boolean; // ⬅️ TAMBAHAN
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setView,
  user,
  onLogout,
  isOpen,
}) => {
  const menuItems: {
    id: View;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Mata Kuliah", icon: BookOpen },
    { id: "tasks", label: "Tugas", icon: CheckSquare },
    { id: "smart-study", label: "AI Study Hub", icon: BrainCircuit },
    { id: "map", label: "Peta Kampus", icon: MapIcon },
    { id: "calendar", label: "Kalender", icon: CalendarIcon },
    { id: "riwayat", label: "Riwayat", icon: History },
    { id: "profile", label: "Profil Saya", icon: UserIcon },
  ];

  // ADMIN PANEL (AMAN)
  if (user?.role === "admin") {
    menuItems.push({
      id: "admin",
      label: "Admin Panel",
      icon: ShieldCheck,
    });
  }

  return (
    <aside
      className={`bg-indigo-900 text-white min-h-screen flex flex-col fixed left-0 top-0 shadow-xl z-50
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
      `}
    >
      {/* ===== LOGO ===== */}
      <div className="p-6 flex items-center gap-3 border-b border-indigo-800">
        <div className="bg-white p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-indigo-900" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          Smart Campus
        </h1>
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transform-gpu transition-all
                ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                    : "text-indigo-200 hover:bg-indigo-800 hover:text-white hover:-translate-y-1 hover:scale-105"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-white" : "text-indigo-400"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ===== USER INFO ===== */}
      <div className="p-6 border-t border-indigo-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-white border-2 border-indigo-500">
            {user?.name?.charAt(0) ?? "?"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {user?.name}
            </p>
            <p className="text-xs text-indigo-400 truncate">
              {user?.nim}
            </p>
          </div>
        </div>

        {/* ===== LOGOUT ===== */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
