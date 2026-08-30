import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const pageParam = Number(searchParams.get('page')) || 1;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(pageParam);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/products/categories');
        setCategories(['All', ...data]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await API.get('/products', {
          params: {
            keyword,
            category: selectedCategory,
            sort,
            pageNumber: page,
            pageSize: 8,
          },
        });
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, selectedCategory, sort, page]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
    setSearchParams((prev) => {
      if (cat === 'All') prev.delete('category');
      else prev.set('category', cat);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Banner */}
      {!keyword && (
        <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-slate-950">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              New Season 2026 Collection
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Elevate Your Lifestyle with <span className="gradient-text">Premium Essentials</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore curated flagship electronics, handcrafted accessories, ergonomic gear, and organic apparel with instant global delivery.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a href="#catalog" className="px-6 py-3 rounded-xl gradient-button text-sm font-bold">
                Shop Collection
              </a>
              <button
                onClick={() => handleCategorySelect('Electronics')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
              >
                Top Electronics
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-sky-500 to-transparent blur-3xl"></div>
        </div>
      )}

      {/* Catalog Filter Controls Bar */}
      <div id="catalog" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-2 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sort}
              onChange={handleSortChange}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Sort by: Newest Arrival</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {keyword && (
          <div className="flex items-center justify-between text-sm text-slate-300 px-2">
            <p>Search results for: <span className="font-bold text-indigo-400">"{keyword}"</span></p>
            <button
              onClick={() => setSearchParams({})}
              className="text-xs text-rose-400 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-80 animate-pulse p-4 space-y-4">
              <div className="bg-slate-800 h-40 rounded-xl"></div>
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-2xl text-center space-y-3 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Failed to Load Products</h3>
          <p className="text-xs text-slate-400">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl text-center space-y-4 max-w-md mx-auto">
          <p className="text-4xl">🔍</p>
          <h3 className="text-xl font-bold text-white">No Products Found</h3>
          <p className="text-xs text-slate-400">Try clearing filters or searching for another item name.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl gradient-button text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <Pagination page={page} pages={pages} onPageChange={(p) => setPage(p)} />
        </>
      )}
    </div>
  );
}
