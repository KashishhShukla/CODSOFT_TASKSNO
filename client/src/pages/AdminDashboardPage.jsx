import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, Plus, Shield } from 'lucide-react';
import API from '../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const { data: orderData } = await API.get('/orders');
        const { data: productData } = await API.get('/products?pageSize=100');

        setStats({
          totalSales: orderData.totalSales || 0,
          totalOrders: orderData.totalOrders || 0,
          totalProducts: productData.totalProducts || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-amber-400" /> Admin Control Dashboard
          </h1>
          <p className="text-xs text-slate-400">Overview of platform revenue, product inventory, and customer orders</p>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/products" className="px-4 py-2 rounded-xl gradient-button text-xs font-bold flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Manage Products
          </Link>
          <Link to="/admin/orders" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Sales Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">${stats.totalSales.toFixed(2)}</p>
          <span className="text-[11px] text-emerald-400">Stripe payment verified</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.totalOrders}</p>
          <span className="text-[11px] text-slate-400">Customer placed orders</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Inventory Items</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">{stats.totalProducts}</p>
          <span className="text-[11px] text-slate-400">Products in database</span>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 group">
          <Package className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white">Product Catalog Management</h3>
          <p className="text-xs text-slate-400">Create new products, update prices and stock availability, or delete existing items.</p>
        </Link>

        <Link to="/admin/orders" className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 group">
          <ShoppingBag className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white">Customer Order Fulfillment</h3>
          <p className="text-xs text-slate-400">View customer orders, review shipping addresses, and update delivery status (Processing / Shipped / Delivered).</p>
        </Link>
      </div>
    </div>
  );
}
