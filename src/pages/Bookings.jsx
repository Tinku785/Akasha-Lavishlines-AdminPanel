import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Download, Calendar, MapPin, ChevronLeft, ChevronRight, SlidersHorizontal, CheckCircle2, Clock, X, Edit2, AlertCircle, Ban, Armchair, Phone } from 'lucide-react';

const Bookings = ({ bookings, onUpdateBooking, onCancelBooking }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');

    // Edit/Action State
    const [activeActionId, setActiveActionId] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editForm, setEditForm] = useState({});

    // Filtering Logic
    const filteredBookings = bookings.filter(b => {
        const matchesSearch =
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.phone.includes(searchTerm) ||
            b.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'All' || (b.status || 'Confirmed') === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        setEditForm({ ...booking });
        setEditModalOpen(true);
        setActiveActionId(null);
    };

    const handleCancelClick = (id) => {
        if (window.confirm('Are you sure you want to cancel this ticket? This action cannot be undone.')) {
            onCancelBooking(id);
            setActiveActionId(null);
        }
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        onUpdateBooking(selectedBooking.id, editForm);
        setEditModalOpen(false);
    };

    const exportToCSV = () => {
        const headers = ["ID,Name,Phone,Route,Date,Departure,Arrival,Seat,Fare,Status"];
        const rows = filteredBookings.map(b =>
            `${b.id},${b.name},${b.phone},"${b.route}",${b.date},${b.departure},${b.arrival},${b.seat},${b.fare},${b.status}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bus_bookings.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const StatusBadge = ({ status = 'Confirmed' }) => {
        const styles = {
            Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            Pending: 'bg-amber-100 text-amber-700 border-amber-200',
            Cancelled: 'bg-rose-100 text-rose-700 border-rose-200'
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.Confirmed}`}>
                {status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                {status === 'Pending' && <Clock className="w-3 h-3" />}
                {status === 'Cancelled' && <Ban className="w-3 h-3" />}
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in-up relative">

            {/* Action Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Booking Management</h1>
                    <p className="text-slate-500 mt-1">Track, manage, and export passenger tickets.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg ${showFilters ? 'bg-yellow-500 text-slate-900 shadow-yellow-500/20' : 'bg-slate-900 text-white shadow-slate-900/10'}`}
                    >
                        <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Filter Views'}
                    </button>
                </div>
            </div>

            {/* Editing Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-scale-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-800">Edit Ticket Details</h3>
                            <button onClick={() => setEditModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">

                            {/* Personal Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Passenger Name</label>
                                    <input
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                                    <input
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 font-mono"
                                    />
                                </div>
                            </div>

                            {/* Journey Details */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Route</label>
                                <select
                                    value={editForm.route}
                                    onChange={(e) => setEditForm({ ...editForm, route: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                                >
                                    <option value="Golaghat -> Guwahati">Golaghat {'->'} Guwahati</option>
                                    <option value="Golaghat -> Bokakhat">Golaghat {'->'} Bokakhat</option>
                                    <option value="Golaghat -> Kamarbandha">Golaghat {'->'} Kamarbandha</option>
                                    <option value="Guwahati -> Golaghat">Guwahati {'->'} Golaghat</option>
                                    <option value="Guwahati -> Bokakhat">Guwahati {'->'} Bokakhat</option>
                                    <option value="Guwahati -> Kamarbandha">Guwahati {'->'} Kamarbandha</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                                    <input
                                        type="date"
                                        value={editForm.date}
                                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Seat Number</label>
                                    <input
                                        value={editForm.seat}
                                        onChange={(e) => setEditForm({ ...editForm, seat: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 uppercase font-bold"
                                    />
                                </div>
                            </div>

                            {/* Times */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Departure</label>
                                    <input
                                        value={editForm.departure}
                                        onChange={(e) => setEditForm({ ...editForm, departure: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                                        placeholder="e.g. 06:00 AM"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Arrival</label>
                                    <input
                                        value={editForm.arrival}
                                        onChange={(e) => setEditForm({ ...editForm, arrival: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                                        placeholder="e.g. 12:30 PM"
                                    />
                                </div>
                            </div>

                            {/* Fare */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Total Fare (₹)</label>
                                <input
                                    type="number"
                                    value={editForm.fare}
                                    onChange={(e) => setEditForm({ ...editForm, fare: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 font-bold"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setEditModalOpen(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-yellow-500 text-slate-900 rounded-xl font-bold hover:bg-yellow-400 shadow-lg shadow-yellow-500/20">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Filters */}
            {showFilters && (
                <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-inner animate-scale-in">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><SlidersHorizontal className="w-5 h-5" /> Filter Data</h3>
                        <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex gap-4">
                        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden min-h-[600px]">
                {/* Search Bar */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center gap-4 justify-between">
                    <div className="relative w-full max-w-lg group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all sm:text-sm font-medium"
                            placeholder="Quick Search by ID, Name, or Phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Total Records: <span className="font-bold text-slate-800">{filteredBookings.length}</span></span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-visible">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Passenger</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Journey</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Timings</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Seat</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Fare</th>
                                <th className="px-6 py-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-50">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="group hover:bg-slate-50/80 transition-colors relative">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="block text-sm font-bold text-slate-800 font-mono bg-slate-100 w-fit px-2 py-0.5 rounded border border-slate-200">{b.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <span className="text-xs font-bold text-slate-500">{b.name.charAt(0)}</span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-bold text-slate-700">{b.name}</div>
                                                    <div className="text-xs text-slate-500 font-mono">{b.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                                                    <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                                                    {b.route.split('->')[0]} <span className="text-slate-300">→</span> {b.route.split('->')[1]}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {b.date || '2025-01-01'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs font-mono text-slate-600 space-y-1">
                                                <div className="flex items-center gap-2"><span className="w-8 text-slate-400">Dep:</span> <span className="font-bold">{b.departure || '06:00 AM'}</span></div>
                                                <div className="flex items-center gap-2"><span className="w-8 text-slate-400">Arr:</span> <span>{b.arrival || '12:30 PM'}</span></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 font-mono">
                                                {b.seat || 'A1'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <StatusBadge status={b.status || 'Confirmed'} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-sm font-bold text-slate-800">₹{b.fare}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                            <button
                                                onClick={() => setActiveActionId(activeActionId === b.id ? null : b.id)}
                                                className={`text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors ${activeActionId === b.id ? 'bg-slate-100 text-slate-900' : ''}`}
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeActionId === b.id && (
                                                <div className="absolute right-10 top-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-scale-in origin-top-right">
                                                    <div className="p-1">
                                                        <button
                                                            onClick={() => handleEditClick(b)}
                                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 font-medium"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-slate-400" /> Edit Details
                                                        </button>
                                                        <div className="h-px bg-slate-100 my-1"></div>
                                                        <button
                                                            onClick={() => handleCancelClick(b.id)}
                                                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 font-medium"
                                                        >
                                                            <Ban className="w-4 h-4" /> Cancel Ticket
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="bg-slate-50 p-4 rounded-full mb-4">
                                                <Search className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800">No records found</h3>
                                            <p className="text-slate-500 max-w-xs mx-auto mt-1">Try adjusting your search or filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Click outside to close dropdown helper overlay */}
            {activeActionId && (
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setActiveActionId(null)} />
            )}
        </div>
    );
};

export default Bookings;
