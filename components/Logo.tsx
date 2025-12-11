
import React from 'react';

export const Logo: React.FC<{ className?: string, withText?: boolean, textClassName?: string }> = ({ className = "w-10 h-10", withText = true, textClassName }) => {
  return (
    <div className={`flex items-center gap-3 select-none group ${textClassName || 'text-slate-900'}`}>
      {/* 
         Icon Design: "The Prism W"
         A modern, geometric logo constructed from three overlapping "shards" of glass/light
         forming an abstract "W" and suggestion of an open book. 
         Designed to match the "Magic Crystal" theme of the widget.
      */}
      <div className="relative flex items-center justify-center">
        {/* Subtle glow behind the logo */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} overflow-visible relative z-10 drop-shadow-md transform transition-transform duration-500 group-hover:rotate-3`}>
          <defs>
            <linearGradient id="shard_blue" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" /> {/* Blue 500 */}
              <stop offset="100%" stopColor="#1d4ed8" /> {/* Blue 700 */}
            </linearGradient>
            <linearGradient id="shard_cyan" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan 400 */}
              <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky 500 */}
            </linearGradient>
            <linearGradient id="shard_violet" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa" /> {/* Violet 400 */}
              <stop offset="100%" stopColor="#7c3aed" /> {/* Violet 600 */}
            </linearGradient>
          </defs>

          {/* Shard 1: The Base / Left Stroke (Deep Blue) */}
          <path 
            d="M 20 20 L 40 20 L 50 80 L 30 85 Z" 
            fill="url(#shard_blue)" 
            className="hover:translate-y-[-1px] transition-transform duration-300"
          />

          {/* Shard 2: The Cross / Right Stroke (Violet) - Overlaps to create W shape */}
          <path 
            d="M 40 35 L 60 35 L 80 80 L 60 85 Z" 
            fill="url(#shard_violet)" 
            opacity="0.9"
            style={{ mixBlendMode: 'multiply' }}
            className="hover:translate-y-[-1px] transition-transform duration-300"
          />

          {/* Shard 3: The Light / Top Accent (Cyan) - Creates the 'Prism' feel */}
          <path 
            d="M 55 15 L 85 15 L 65 55 L 45 45 Z" 
            fill="url(#shard_cyan)" 
            opacity="0.95"
            style={{ mixBlendMode: 'screen' }} 
            className="group-hover:translate-x-1 transition-transform duration-500 ease-out"
          />
          
          {/* Accent Dot (The "Period" or "Focus Point") */}
          <circle cx="88" cy="85" r="5" fill="#f43f5e" className="animate-pulse" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col justify-center h-full">
            {/* Main Brand Name */}
            <div className="flex items-baseline leading-none">
              <span className="text-xl font-black tracking-tighter text-slate-800 font-sans">
                Re
              </span>
              <span className="text-xl font-black tracking-tighter text-blue-600 font-sans ml-[1px]">
                Word
              </span>
            </div>

            {/* Subtitle / Chinese Name with decorative element */}
            <div className="flex items-center gap-2 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
               <div className="h-[2px] w-2 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"></div>
               <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase font-sans">
                 易语道
               </span>
            </div>
        </div>
      )}
    </div>
  );
};
