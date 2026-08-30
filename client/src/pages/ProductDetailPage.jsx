import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, ShieldCheck, Truck, ArrowLeft, Star, AlertCircle } from 'lucide-react';
import API from '../services/api';
import Rating from '../components/Rating';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Product not found');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      await API.post(`/products/${id}/reviews`, { rating, comment });
      setReviewSuccess('Review submitted successfully!');
      setComment('');
      setReviewSubmitting(false);
      fetchProduct();
    } catch (err) {
      setReviewError(err.response?.data?.message || err.message || 'Failed to submit review');
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 glass-card rounded-2xl p-8 animate-pulse space-y-6">
        <div className="h-6 bg-slate-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80 bg-slate-800 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            <div className="h-20 bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 glass-card rounded-2xl text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">{error}</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl gradient-button text-xs font-semibold">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </Link>

      {/* Main product view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Product Image Frame */}
        <div className="glass-card rounded-3xl p-4 overflow-hidden border border-white/10 bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover object-center rounded-2xl"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <Rating value={product.rating} text={`(${product.numReviews} customer reviews)`} />
              <span className="text-slate-600">|</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                product.countInStock > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}>
                {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-white">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-4">
            {product.description}
          </p>

          {/* Add to Cart Actions */}
          <div className="space-y-4">
            {product.countInStock > 0 && (
              <div className="flex items-center gap-4">
                <label className="text-xs font-semibold text-slate-300">Quantity:</label>
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-white">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="flex-1 py-3.5 rounded-xl gradient-button font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span>Fast Express Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2-Year Warranty Included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          Customer Ratings & Reviews
        </h2>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {product.reviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No reviews yet for this product. Be the first to leave a review!</p>
          ) : (
            product.reviews.map((rev) => (
              <div key={rev._id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-200">{rev.name}</span>
                  <Rating value={rev.rating} />
                </div>
                <p className="text-xs text-slate-300">{rev.comment}</p>
                <span className="text-[10px] text-slate-500 block">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Write a Review */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Write a Review</h3>

          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-lg">
              {reviewError && <p className="text-xs text-rose-400">{reviewError}</p>}
              {reviewSuccess && <p className="text-xs text-emerald-400">{reviewSuccess}</p>}

              <div>
                <label className="block text-xs text-slate-400 mb-1">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-800 text-xs text-white rounded-lg px-3 py-2"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Comment</label>
                <textarea
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this item..."
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg p-3 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="px-4 py-2 rounded-xl gradient-button text-xs font-semibold"
              >
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p className="text-xs text-slate-400">
              Please <Link to="/login" className="text-indigo-400 hover:underline">sign in</Link> to write a customer review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
