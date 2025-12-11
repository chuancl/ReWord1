
import React from 'react';

export const Logo: React.FC<{ className?: string, withText?: boolean, textClassName?: string }> = ({ className = "w-10 h-10", withText = true, textClassName }) => {
  return (
    <div className={`flex items-center gap-3 select-none group ${textClassName || 'text-slate-800'}`}>
      {/* 
         Icon Design: "The Flowing Nexus"
         A high-fidelity 3D-like mark where two streams merge and loop, forming an abstract 'R'.
      */}
      <div className="relative flex items-center justify-center filter drop-shadow-md">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} overflow-visible`}>
          <defs>
            <linearGradient id="main_gradient" x1="10" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />   {/* Indigo 600 */}
              <stop offset="50%" stopColor="#2563eb" />  {/* Blue 600 */}
              <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan 500 */}
            </linearGradient>
            <linearGradient id="secondary_gradient" x1="100" y1="20" x2="20" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet 500 */}
            </linearGradient>
            <filter id="soft_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Glow */}
          <circle cx="60" cy="60" r="45" fill="url(#main_gradient)" fillOpacity="0.1" filter="url(#soft_glow)" className="animate-pulse-slow" />

          {/* Main Shape: Stylized 'R' / Loop */}
          <path 
            d="M 40 90 V 35 C 40 20, 70 20, 85 35 C 95 45, 85 60, 70 65 L 85 90" 
            stroke="url(#main_gradient)" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Secondary Accent: The 'W' Flow or Connection Line */}
          <path 
            d="M 40 65 H 65" 
            stroke="url(#secondary_gradient)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            className="group-hover:translate-x-1 transition-transform duration-500"
          />

          {/* Sparkle Detail */}
          <circle cx="95" cy="25" r="4" fill="#fbbf24" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="95" cy="25" r="3" fill="#f59e0b" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col justify-center h-full">
            {/* English Name - Modern, Thick, Tight tracking */}
            <div className="flex items-baseline leading-none">
                <span className="text-2xl font-extrabold tracking-tighter text-slate-800 font-sans">Re<span className="text-blue-600">Word</span></span>
            </div>

            {/* Chinese Name - Elegant, Spaced out, Serif */}
            <div className="flex items-center w-full mt-1">
                <span className="text-[11px] font-serif font-bold text-slate-400 tracking-[0.4em] border-t border-slate-200 pt-0.5 w-full text-justify">易语道</span>
            </div>
        </div>
      )}
    </div>
  );
};
