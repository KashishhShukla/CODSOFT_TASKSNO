import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Tag, Truck } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, itemsPrice, shippingPrice, taxPrice, totalPrice } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXUS10') {
      setDiscount(10);
      setPromoMsg('Promo code NEXUS10 applied ($10 OFF)!');
    } else {
      setPromoMsg('Invalid promo code. Try NEXUS10!');
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 glass-card p-10 rounded-3xl text-center space-y-4">
        <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 w-16 h-16 mx-auto flex items-center justify-center">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Looks like you haven't added any items to your shopping cart yet.</p>
        <Link to="/" className="inline-block px-6 py-3 rounded-xl gradient-button text-xs font-bold">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart ({cartItems.length} items)</h1>
        <Link to="/" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="glass-card p-4 rounded-2xl border border-indigo-500/20 flex items-center gap-3 text-xs text-slate-300">
        <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
        {itemsPrice >= 100 ? (
          <span>🎉 You've unlocked <strong className="text-emerald-400">FREE Global Shipping</strong> on this order!</span>
        ) : (
          <span>Add <strong className="text-indigo-400">${(100 - itemsPrice).toFixed(2)}</strong> more to qualify for FREE Shipping!</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product} className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 border border-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-xl bg-slate-900"
              />
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <Link to={`/product/${item.product}`} className="font-semibold text-sm text-slate-100 hover:text-indigo-400 transition-colors line-clamp-1">
                  {item.title}
                </Link>
                <p className="text-xs text-slate-400">${item.price.toFixed(2)} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                  <button
                    onClick={() => updateQuantity(item.product, item.qty - 1)}
                    className="px-3 py-1 text-slate-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-white">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.product, item.qty + 1)}
                    className="px-3 py-1 text-slate-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-bold text-white w-20 text-right">
                  ${(item.price * item.qty).toFixed(2)}
                </span>

                <button
                  onClick={() => removeFromCart(item.product)}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-4 border border-slate-800">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Order Summary</h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-white">
                  {shippingPrice === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-white">${taxPrice.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-extrabold text-white">
                <span>Total Amount</span>
                <span className="text-indigo-400 text-lg">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-2 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (NEXUS10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700">
                  Apply
                </button>
              </div>
              {promoMsg && <p className="text-[11px] text-indigo-300">{promoMsg}</p>}
            </form>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl gradient-button font-bold text-sm flex items-center justify-center gap-2 mt-4"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
