import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, CreditCard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import StripeCheckout from '../components/StripeCheckout';

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: user?.shippingAddress?.address || '123 Tech Avenue',
    city: user?.shippingAddress?.city || 'San Francisco',
    postalCode: user?.shippingAddress?.postalCode || '94107',
    country: user?.shippingAddress?.country || 'USA',
  });

  const handleOrderSuccess = (order) => {
    navigate(`/order-success/${order._id}`, { state: { order } });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Checkout & Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Shipping Form & Review */}
        <div className="space-y-6">
          
          {/* Shipping Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">1. Shipping Address</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">2. Order Items Review</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded-lg bg-slate-900" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200 line-clamp-1">{item.title}</p>
                    <p className="text-slate-400">{item.qty} x ${item.price.toFixed(2)}</p>
                  </div>
                  <span className="font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stripe Payment Step */}
        <div>
          <StripeCheckout shippingAddress={shippingAddress} onSuccess={handleOrderSuccess} />
        </div>

      </div>
    </div>
  );
}
