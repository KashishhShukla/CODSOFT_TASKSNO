import React from 'react';
import { ShoppingBag, Heart, Github, Twitter, Mail, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-sm">
      
      {/* Feature highlights bar */}
      <div className="border-b border-slate-800/50 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Global Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-400">256-bit SSL & Stripe protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Multiple Payment Modes</h4>
              <p className="text-xs text-slate-400">Cards, Apple Pay, Google Pay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-600 text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white gradient-text">NEXUS MART</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Next-generation full-stack e-commerce experience built with React, Node.js, Express, MongoDB, and Stripe integration.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="/" className="hover:text-indigo-400 transition-colors">Catalog Products</a></li>
            <li><a href="/cart" className="hover:text-indigo-400 transition-colors">Shopping Cart</a></li>
            <li><a href="/profile" className="hover:text-indigo-400 transition-colors">My Profile & Orders</a></li>
            <li><a href="/login" className="hover:text-indigo-400 transition-colors">Sign In Account</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product Categories</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="/?category=Electronics" className="hover:text-indigo-400 transition-colors">Electronics & Gadgets</a></li>
            <li><a href="/?category=Accessories" className="hover:text-indigo-400 transition-colors">Leather & Accessories</a></li>
            <li><a href="/?category=Clothing" className="hover:text-indigo-400 transition-colors">Apparel & Footwear</a></li>
            <li><a href="/?category=Home%20%26%20Living" className="hover:text-indigo-400 transition-colors">Home & Living</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h3>
          <p className="text-xs mb-3 text-slate-400">Subscribe for exclusive discount offers & new product drops.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button className="px-3 py-2 rounded-lg gradient-button text-xs font-semibold">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>© 2026 NEXUS E-Commerce Inc. All rights reserved. Built with ❤️ React & Node.js.</p>
      </div>
    </footer>
  );
}
