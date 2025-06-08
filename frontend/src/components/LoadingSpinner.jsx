import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-spin">
          {/* Inner ring */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-purple-500 rounded-full animate-spin-fast"></div>
        </div>
        {/* Loading text */}
        <div className="mt-4 text-center text-white font-semibold animate-pulse">
          Reconnecting...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;