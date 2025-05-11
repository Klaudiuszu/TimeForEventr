import React from 'react';

export default function BlogLoading() {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="rounded-xl bg-white/5 h-[400px] border border-white/10"
        >
          <div className="aspect-video w-full bg-gray-700/50" />
          <div className="p-6 space-y-3">
            <div className="h-6 w-3/4 bg-gray-700/50 rounded" />
            <div className="h-4 w-full bg-gray-700/50 rounded" />
            <div className="h-4 w-5/6 bg-gray-700/50 rounded" />
            <div className="h-4 w-2/3 bg-gray-700/50 rounded" />
            <div className="h-10 w-32 mt-6 bg-gray-700/50 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}