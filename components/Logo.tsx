
import React from 'react';

export const Logo: React.FC<{ className?: string, withText?: boolean, textClassName?: string }> = ({ className = "w-9 h-9", withText = true, textClassName }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none group ${textClassName || 'text-slate-900'}`}>
      {/* 
         Icon Design: "Origami Ascent"
         A sharp, geometric abstract shape resembling a bird taking flight or an arrow moving forward.
         High contrast gradients: Royal Blue to Cyan.
      */}
      <div className="relative flex items-center justify-center filter drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} overflow-visible`}>
          <defs>
            <linearGradient id="bird_body" x1="20" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563eb" />   {/* Blue 600 */}
              <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky 500 */}
            </linearGradient>
            <linearGradient id="bird_wing" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />   {/* Indigo 600 */}
              <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet 500 */}
            </linearGradient>
          </defs>

          {/* Main Body (Arrow Up/Right) */}
          <path 
            d="M 20 80 L 50 50 L 90 50 L 50 90 L 20 80 Z" 
            fill="url(#bird_body)" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinejoin="round"
          />
          
          {/* Wing / Top Fold */}
          <path 
            d="M 20 80 L 50 20 L 50 50 L 20 80 Z" 
            fill="url(#bird_wing)" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinejoin="round"
          />
          
          {/* Accent Dot */}
          <circle cx="85" cy="15" r="6" fill="#f59e0b" className="animate-pulse" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col justify-center">
            {/* English Name - Bold, legible, dark */}
            <h1 className="text-xl font-extrabold tracking-tight leading-none text-slate-800 font-sans">
              Re<span className="text-blue-600">Word</span>
            </h1>

            {/* Chinese Name - Smaller, spaced, legible grey */}
            <span className="text-[10px] font-medium text-slate-500 tracking-[0.2em] mt-0.5 scale-95 origin-left font-serif">
              易语道
            </span>
        </div>
      )}
    </div>
  );
};
