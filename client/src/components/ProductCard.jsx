import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import Rating from './Rating';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-950/80 backdrop-blur border border-white/10 text-indigo-300">
            {product.category}
          </span>
          {product.featured && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-600/90 text-white shadow">
              Featured
            </span>
          )}
        </div>
        
        {/* Quick hover overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product._id}`}
            className="p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-indigo-600 transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-slate-700 transition-colors shadow-lg"
            title={product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <Rating value={product.rating} text={`(${product.numReviews})`} />
        </div>
        <Link to={`/product/${product._id}`} className="group-hover:text-indigo-400 transition-colors line-clamp-2 font-medium text-slate-100 mb-2">
          {product.title}
        </Link>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-auto">
          <div>
            <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold gradient-button flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.countInStock > 0 ? 'Add' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
