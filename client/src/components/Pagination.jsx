import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {[...Array(pages).keys()].map((x) => {
        const pNum = x + 1;
        return (
          <button
            key={pNum}
            onClick={() => onPageChange(pNum)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              page === pNum
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                : 'glass-card text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {pNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
