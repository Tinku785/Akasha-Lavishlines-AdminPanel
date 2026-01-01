import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/new-booking': return 'Create Booking';
            case '/bookings': return 'Booking Management';
            default: return 'Dashboard Overview';
        }
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/60 px-4 lg:px-8 flex items-center justify-between transition-all">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl hover:text-slate-900 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        {getPageTitle()}
                    </h2>
                    <p className="text-xs text-slate-500 hidden sm:block">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 ring-indigo-100 transition-all">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Quick search..." className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-700" />
                </div>

                <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full hover:text-yellow-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
