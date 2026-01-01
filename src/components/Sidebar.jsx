import React from 'react';
import { Bus, LogOut, LayoutDashboard, PlusCircle, List, UserCircle, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar, user, onLogout }) => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: PlusCircle, label: 'New Booking', path: '/new-booking' },
        { icon: List, label: 'All Bookings', path: '/bookings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 text-white transform transition-all duration-300 ease-in-out flex flex-col shadow-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800/50 bg-slate-900">
                    <div className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-yellow-500/20 object-cover" />
                        <div>
                            <h1 className="text-sm font-bold font-sans text-white tracking-tight leading-none">
                                Akasha <span className="text-yellow-500">Lavishlines</span>
                            </h1>
                            <p className="text-xs text-slate-400 font-medium">Internal Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group
                  ${isActive
                                        ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20 font-semibold'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-white'}`} />
                                    <span>{item.label}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="bg-slate-800/50 rounded-xl p-4 mb-3 border border-slate-700/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                            <p className="text-xs text-slate-400 truncate">System Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
