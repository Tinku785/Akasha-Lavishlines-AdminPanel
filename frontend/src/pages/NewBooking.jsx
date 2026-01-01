import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Save, X, User, Phone, MapPin, Calendar, Armchair, Clock, Printer } from 'lucide-react';

const NewBooking = ({ onAddBooking }) => {
    const navigate = useNavigate();

    // Updated State with Departure/Arrival
    const [formData, setFormData] = useState({
        name: '', phone: '', date: '', route: 'Golaghat -> Guwahati',
        seat: '', fare: '', departure: '06:00', arrival: '12:30'
    });
    const [successId, setSuccessId] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Auto-update times based on route (Simulated Logic)
    // Auto-update times based on route
    // Auto-update times based on route
    const handleRouteChange = (e) => {
        const route = e.target.value;
        let departure = '06:00';
        let arrival = '12:00';

        if (route.includes('Guwahati -> Golaghat')) {
            departure = '14:00';
            arrival = '20:30';
        } else if (route.includes('Guwahati -> Bokakhat')) {
            departure = '15:00';
            arrival = '20:00';
        } else if (route.includes('Guwahati -> Kamarbandha')) {
            departure = '14:30';
            arrival = '20:00';
        } else if (route.includes('Guwahati')) { // Fallback for plain 'Guwahati' or 'Golaghat -> Guwahati'
            departure = '06:00';
            arrival = '12:30';
        } else if (route.includes('Bokakhat')) {
            departure = '08:00';
            arrival = '09:00';
        } else if (route.includes('Kamarbandha')) {
            departure = '07:00';
            arrival = '07:30';
        }

        setFormData(prev => ({ ...prev, route, departure, arrival }));
    };

    const formatTimeDisplay = (time) => {
        // Simple helper if we wanted 12 hour format, but input type="time" uses 24h
        return time;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert to AM/PM for display consistency in other parts of app
        const format12h = (time24) => {
            const [h, m] = time24.split(':');
            const hour = parseInt(h);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${m} ${ampm}`;
        };

        const finalData = {
            ...formData,
            departure: format12h(formData.departure),
            arrival: format12h(formData.arrival)
        };

        try {
            const newId = onAddBooking ? await onAddBooking(finalData) : `BK${Math.floor(Math.random() * 1000)}`;
            setSuccessId(newId);

            setTimeout(() => {
                setSuccessId('');
                setFormData({
                    name: '', phone: '', date: '', route: 'Golaghat -> Guwahati',
                    seat: '', fare: '', departure: '06:00', arrival: '12:30'
                });
            }, 3000);
        } catch (error) {
            console.error(error);
            alert("Failed to create booking");
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in-up space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Issue New Ticket</h1>
                    <p className="text-slate-500 mt-1">Fill in the details to generate an instant offline ticket.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Printer className="w-4 h-4" /> Print Form
                    </button>
                </div>
            </div>

            {successId && (
                <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg shadow-green-500/20 flex items-center justify-between animate-scale-in">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-full">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Booking Confirmed Successfully!</h3>
                            <p className="text-green-100 opacity-90">Ticket ID: <span className="font-mono font-bold bg-white/20 px-2 rounded">{successId}</span></p>
                        </div>
                    </div>
                    <button onClick={() => setSuccessId('')} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Input Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                            <User className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-bold text-slate-800">Passenger & Journey Details</h3>
                        </div>

                        <form id="booking-form" onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Personal Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passenger Name</label>
                                    <input
                                        required name="name" value={formData.name} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium text-slate-800"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-mono font-medium text-slate-800"
                                            placeholder="98765 43210"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Route & Time */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Route</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                                        <select
                                            name="route" value={formData.route} onChange={handleRouteChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium text-slate-800 appearance-none"
                                        >
                                            <option value="Golaghat -> Guwahati">Golaghat {'->'} Guwahati</option>
                                            <option value="Golaghat -> Bokakhat">Golaghat {'->'} Bokakhat</option>
                                            <option value="Golaghat -> Kamarbandha">Golaghat {'->'} Kamarbandha</option>
                                            <option value="Guwahati -> Golaghat">Guwahati {'->'} Golaghat</option>
                                            <option value="Guwahati -> Bokakhat">Guwahati {'->'} Bokakhat</option>
                                            <option value="Guwahati -> Kamarbandha">Guwahati {'->'} Kamarbandha</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Journey Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            required type="date" name="date" value={formData.date} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-medium text-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Editable Times */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Departure Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            type="time"
                                            name="departure"
                                            value={formData.departure}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-mono font-medium text-slate-800 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Arrival Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            type="time"
                                            name="arrival"
                                            value={formData.arrival}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-mono font-medium text-slate-800 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Seat & Fare */}
                            <div className="p-5 bg-yellow-50/50 rounded-xl border border-yellow-100 grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seat No.</label>
                                    <div className="relative">
                                        <Armchair className="absolute left-4 top-3.5 w-4 h-4 text-yellow-600" />
                                        <input
                                            required name="seat" value={formData.seat} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-bold text-slate-900 placeholder-slate-400 uppercase"
                                            placeholder="A1"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Fare</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 font-bold text-slate-400">₹</span>
                                        <input
                                            required type="number" name="fare" value={formData.fare} onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all font-bold text-slate-900 placeholder-slate-400"
                                            placeholder="000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-yellow-500 font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" /> Generate Ticket
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Live Preview Ticket */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden h-fit sticky top-6 border border-slate-700">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <img src="/logo.jpg" alt="logo" className="w-32 h-32 object-contain grayscale" />
                        </div>

                        <div className="relative z-10 border-b-2 border-dashed border-slate-700 pb-6 mb-6">
                            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Preview Ticket</h4>
                            <h2 className="text-xl font-bold text-yellow-500">Akasha Lavishlines<span className="text-white">.</span></h2>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Passenger</p>
                                <p className="text-lg font-semibold truncate">{formData.name || '---'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Date</p>
                                    <p className="font-mono">{formData.date || '--/--/----'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Departure</p>
                                    <p className="font-mono text-yellow-100">{formData.departure}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Route</p>
                                <p className="font-medium text-white truncate">{formData.route}</p>
                            </div>

                            <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between border border-slate-700">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Seat</p>
                                    <p className="text-2xl font-bold text-white">{formData.seat || '--'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Price</p>
                                    <p className="text-2xl font-bold text-yellow-400">₹{formData.fare || '0'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Valid for one journey only</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBooking;
