import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8 text-center">
      <div className="glass-card p-10 rounded-3xl space-y-6 border border-emerald-500/30">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Payment Successful!</h1>
          <p className="text-xs text-slate-300">
            Thank you for your purchase. Your order has been placed and is currently being processed.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Order Reference ID:</span>
            <span className="font-mono font-bold text-indigo-400">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Payment Status:</span>
            <span className="text-emerald-400 font-semibold">PAID (Stripe Verified)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Estimated Delivery:</span>
            <span className="text-white font-semibold">3-5 Business Days</span>
          </div>
          {order && (
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white text-sm">
              <span>Total Paid:</span>
              <span className="text-indigo-300">${order.totalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/profile" className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white">
            View Order History
          </Link>
          <Link to="/" className="flex-1 py-3 rounded-xl gradient-button text-xs font-bold flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
