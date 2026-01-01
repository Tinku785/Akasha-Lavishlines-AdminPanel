import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Ticket, Wallet, ArrowRight, TrendingUp, Clock, MapPin } from "lucide-react";

const Dashboard = ({ bookings = [] }) => {
    const navigate = useNavigate();

    // Filter out cancelled bookings for stats
    const activeBookings = bookings.filter(b => b.status !== 'Cancelled');

    // Calculate stats dynamic
    const totalBookings = activeBookings.length;
    const totalRevenue = activeBookings.reduce((sum, b) => sum + Number(b.fare), 0);

    // Recent showing ALL (so we can see activity), but maybe visual diff for cancelled?
    // Let's stick to showing all in recent list but mark them
    const recentBookings = bookings.slice(0, 5);

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative flex items-center gap-4">
                <div className={`p-4 rounded-xl bg-${color}-50 text-${color}-600 group-hover:text-${color}-700 group-hover:bg-${color}-100 transition-colors`}>
                    <Icon className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-0.5">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
                        {trend && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{trend}</span>}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 shadow-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats now reflect only active bookings */}
                <StatCard title="Total Bookings" value={totalBookings} icon={Ticket} color="blue" trend="+12%" />
                <StatCard title="Active Passengers" value={totalBookings} icon={Users} color="indigo" trend="+5" />
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={Wallet} color="yellow" trend="+8.5%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10 flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                            <Ticket className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Offline Counter</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                            Instantly issuance of tickets for walk-in passengers. Optimized for speed and efficiency.
                        </p>
                        <button
                            onClick={() => navigate("/new-booking")}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group-hover:translate-x-1 duration-300"
                        >
                            Book Ticket Now <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Recent Bookings</h3>
                            <p className="text-xs text-slate-500 font-medium">Real-time ticketing activity</p>
                        </div>
                        <button
                            onClick={() => navigate("/bookings")}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-bold px-3 py-1.5 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="overflow-x-auto flex-1 p-2">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-4 py-2 pl-6">ID</th>
                                    <th className="px-4 py-2">Passenger</th>
                                    <th className="px-4 py-2">Route</th>
                                    <th className="px-4 py-2">Timings</th>
                                    <th className="px-4 py-2 pr-6 text-right">Fare</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b) => (
                                    <tr key={b.id} className={`group hover:bg-slate-50/80 transition-all cursor-default ${b.status === 'Cancelled' ? 'opacity-50 grayscale' : ''}`}>
                                        <td className="px-4 py-3 pl-6 rounded-l-xl border-y border-l border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                                            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{b.id}</span>
                                        </td>
                                        <td className="px-4 py-3 border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                                            <div className="font-bold text-slate-700 text-sm">{b.name}</div>
                                            <div className="text-xs text-slate-400 font-mono">{b.phone}</div>
                                        </td>
                                        <td className="px-4 py-3 border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                                            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                                {b.route ? b.route.split('→')[0].trim() : 'Local'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                                            <div className="text-xs text-slate-500 space-y-0.5">
                                                <div className="flex items-center gap-1"><span className="text-green-600 font-bold">D:</span> {b.departure || '06:00 AM'}</div>
                                                <div className="flex items-center gap-1"><span className="text-blue-600 font-bold">A:</span> {b.arrival || '12:30 PM'}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 pr-6 rounded-r-xl border-y border-r border-transparent group-hover:border-slate-100 group-hover:shadow-sm text-right">
                                            {b.status === 'Cancelled' ? (
                                                <span className="text-xs font-bold text-red-500">CANCELLED</span>
                                            ) : (
                                                <span className="font-bold text-slate-800">₹{b.fare}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-12 text-slate-400 italic">
                                            No bookings recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
