import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ShoppingBag, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const autofillCustomer = () => {
    setEmail('john@example.com');
    setPassword('user123');
  };

  const autofillAdmin = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass-card p-8 rounded-3xl space-y-6 border border-indigo-500/20 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 w-14 h-14 mx-auto flex items-center justify-center border border-indigo-500/30">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to manage your cart and order history</p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={autofillCustomer}
            className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-300 text-slate-300 text-left font-semibold transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Customer Demo</span>
          </button>
          <button
            type="button"
            onClick={autofillAdmin}
            className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 text-left font-semibold transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Demo</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-button font-bold text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
