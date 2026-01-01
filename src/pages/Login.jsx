import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, Lock, Mail, ArrowRight } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Direct navigation as user requested, no logic.
        setTimeout(() => {
            navigate("/dashboard");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Awesome Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-yellow-500/10 to-orange-500/10 rounded-full blur-[80px] animate-float"></div>
                <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-sm relative z-10 hover:shadow-yellow-500/10 transition-all duration-500 group">
                {/* Logo Section */}
                <div className="pt-10 pb-2 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <img src="/logo.jpg" alt="Logo" className="relative w-full h-full rounded-2xl shadow-inner border border-white/20 object-cover" />
                    </div>

                    <h1 className="text-2xl font-bold text-white tracking-tight">Akasha Lavishlines</h1>
                    <p className="text-slate-400 mt-2 text-sm font-medium">Authorized Staff Only</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                            Email Address
                        </label>
                        <div className="relative group/input">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-yellow-500 transition-colors" />
                            <input
                                type="email"
                                placeholder="staff@bus.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-600 focus:bg-slate-800 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                            Password
                        </label>
                        <div className="relative group/input">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within/input:text-yellow-500 transition-colors" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-600 focus:bg-slate-800 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all font-bold tracking-widest"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale mt-2 group/btn relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            {loading ? "Accessing Dashboard..." : <>Secure Login <ArrowRight className="w-5 h-5" /></>}
                        </span>
                    </button>
                </form>

                <div className="bg-slate-950/30 p-4 text-center border-t border-white/5 backdrop-blur-sm rounded-b-3xl">
                    <p className="text-xs text-slate-500 font-medium">
                        © 2025 Bus Admin System v2.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
