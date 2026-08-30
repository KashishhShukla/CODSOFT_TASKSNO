import React, { useState, useContext } from 'react';
import { CreditCard, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';
import { CartContext } from '../context/CartContext';

export default function StripeCheckout({ shippingAddress, onSuccess }) {
  const { totalPrice, cartItems, clearCart } = useContext(CartContext);
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [cardName, setCardName] = useState('John Doe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExp('12/28');
    setCardCvc('123');
    setCardName('Test Customer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Call backend payment intent endpoint
      const { data: paymentIntent } = await API.post('/payment/create-payment-intent', {
        amount: totalPrice,
      });

      // Simulating payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Build order payload
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          title: item.title,
          qty: item.qty,
          image: item.image,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod: 'Stripe Credit Card',
        paymentResult: {
          id: paymentIntent.clientSecret || 'ch_test_' + Date.now(),
          status: 'succeeded',
          update_time: new Date().toISOString(),
          email_address: 'customer@stripe-test.com',
        },
        itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
        taxPrice: Number((totalPrice * 0.08).toFixed(2)),
        shippingPrice: totalPrice > 100 ? 0 : 15,
        totalPrice,
      };

      // 3. Save order to backend
      const { data: createdOrder } = await API.post('/orders', orderData);

      clearCart();
      setLoading(false);
      onSuccess(createdOrder);
    } catch (err) {
      console.error('Payment Error:', err);
      setError(err.response?.data?.message || err.message || 'Payment processing failed');
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Stripe Card Payment</h3>
            <p className="text-xs text-slate-400">Encrypted test card checkout</p>
          </div>
        </div>
        <button
          type="button"
          onClick={fillTestCard}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
        >
          Autofill Test Card
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Cardholder Name</label>
          <input
            type="text"
            required
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Card Number (Test mode)</label>
          <div className="relative">
            <input
              type="text"
              required
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date</label>
            <input
              type="text"
              required
              value={cardExp}
              onChange={(e) => setCardExp(e.target.value)}
              placeholder="MM/YY"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">CVC Code</label>
            <input
              type="text"
              required
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
              placeholder="123"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl gradient-button font-bold text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Pay ${totalPrice.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
