
import React from 'react';

export const Logo: React.FC<{ className?: string, withText?: boolean, textClassName?: string }> = ({ className = "w-10 h-10", withText = true, textClassName }) => {
  return (
    <div className={`flex items-center gap-3 select-none group ${textClassName || 'text-slate-800'}`}>
      {/* 
         Icon Design: "Infinite Knowledge"
         A stylized infinity loop that morphs into an open book/'W' shape.
      */}
      <div className="relative flex items-center justify-center">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-blue-500/30 transition-all duration-500"></div>
        
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} relative z-10 drop-shadow-sm`}>
          <defs>
            <linearGradient id="logo_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" />   {/* Indigo 500 */}
              <stop offset="50%" stopColor="#3b82f6" />  {/* Blue 500 */}
              <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky 500 */}
            </linearGradient>
            <filter id="inner_glow">
               <feGaussianBlur stdDeviation="1.5" result="blur"/>
               <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="1" k3="1"/>
            </filter>
          </defs>

          {/* Abstract Shape: Looks like 'R' looping into 'W' / Infinity / Open Book */}
          <path 
            d="M 25 35 C 25 20, 45 20, 50 35 C 55 50, 25 60, 25 75 C 25 90, 45 90, 55 75 L 65 55 L 75 75 C 85 90, 95 80, 95 65"
            stroke="url(#logo_gradient)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:stroke-[11] transition-all duration-300"
          />
          
          {/* A digital spark dot */}
          <circle cx="95" cy="65" r="5" fill="#f43f5e" className="animate-pulse" />
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col justify-center h-full">
            {/* English Name */}
            <div className="flex items-baseline leading-none">
                <span className="text-2xl font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">Re</span>
                <span className="text-2xl font-bold tracking-tight text-slate-600">Word</span>
            </div>

            {/* Chinese Name - Elegant Serif */}
            <div className="flex items-center justify-between w-full mt-0.5 px-0.5">
                <span className="text-[10px] font-serif font-medium text-slate-400 tracking-[0.3em] group-hover:text-slate-500 transition-colors">易语道</span>
            </div>
        </div>
      )}
    </div>
  );
};
