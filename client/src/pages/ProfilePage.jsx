import React, { useState, useEffect, useContext } from 'react';
import { User, Package, MapPin, CheckCircle2, Clock, Truck } from 'lucide-react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('orders');

  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(user?.shippingAddress?.address || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(user?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.shippingAddress?.country || '');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
        setLoadingOrders(false);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await updateProfile({
        name,
        email,
        password: password || undefined,
        shippingAddress: { address, city, postalCode, country },
      });
      setMsg('Profile updated successfully!');
      setSaving(false);
    } catch (err) {
      setMsg(err.message || 'Update failed');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* User Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.name}</h1>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] uppercase font-semibold">
              {user?.role} Account
            </span>
          </div>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'orders' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" /> My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Order History</h2>

          {loadingOrders ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl h-24 animate-pulse"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-card p-10 rounded-2xl text-center text-xs text-slate-400 space-y-2">
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord._id} className="glass-card p-6 rounded-2xl space-y-4 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-slate-400">Order ID: </span>
                      <span className="font-mono text-indigo-400 font-bold">{ord._id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{new Date(ord.createdAt).toLocaleDateString()}</span>
                      <span className={`px-3 py-1 rounded-full font-semibold text-[11px] ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-lg bg-slate-900" />
                          <span className="text-slate-200 font-medium line-clamp-1">{item.title}</span>
                        </div>
                        <span className="text-slate-400">{item.qty} x ${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Payment: Stripe Card</span>
                    <span className="text-sm font-extrabold text-white">Total: ${ord.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-xl">
          <h2 className="text-lg font-bold text-white">Update Profile & Default Shipping</h2>

          {msg && <p className="text-xs text-emerald-400 font-semibold">{msg}</p>}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">New Password (leave blank to keep current)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="font-semibold text-slate-200">Default Shipping Address</h4>
              <div>
                <label className="block text-slate-400 mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl gradient-button text-xs font-bold"
            >
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
