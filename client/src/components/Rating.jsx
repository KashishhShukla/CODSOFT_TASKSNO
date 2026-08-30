import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ value = 0, text, color = 'text-amber-400' }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            value >= star
              ? `fill-amber-400 ${color}`
              : value >= star - 0.5
              ? `fill-amber-400/50 ${color}`
              : 'text-slate-600 fill-slate-800'
          }`}
        />
      ))}
      {text && <span className="text-xs text-slate-400 ml-1 hover:text-slate-200 transition-colors">{text}</span>}
    </div>
  );
}
