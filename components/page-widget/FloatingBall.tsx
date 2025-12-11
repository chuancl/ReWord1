
import React from 'react';
import { PageWidgetConfig } from '../../types';

interface FloatingBallProps {
    config: PageWidgetConfig;
    badgeCount: number;
    isDragging: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    onClick: (e: React.MouseEvent) => void;
}

export const FloatingBall: React.FC<FloatingBallProps> = ({ config, badgeCount, isDragging, onMouseDown, onClick }) => {
    return (
        <div 
            className={`fixed z-[2147483647] cursor-move select-none group touch-none`}
            style={{ 
                left: config.x, 
                top: config.y,
                pointerEvents: 'auto'
            }}
            onMouseDown={onMouseDown}
            onClick={(e) => {
                if (!isDragging) onClick(e);
            }}
        >
            <div 
                className={`relative w-16 h-16 flex items-center justify-center transition-transform duration-300 ease-out ${isDragging ? 'scale-95 cursor-grabbing' : 'hover:scale-110'}`}
            >
                {/* --- Layer 1: The Aura / Halo (光圈) --- */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-20 blur-md group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow pointer-events-none"></div>
                <div className="absolute -inset-0.5 rounded-full border border-white/40 opacity-60 scale-105 pointer-events-none"></div>

                {/* --- Layer 2: The Crystal Body (Glass Orb) --- */}
                <div 
                    className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm"
                    style={{
                        boxShadow: `
                            inset -3px -3px 8px rgba(255,255,255,0.2), 
                            inset 3px 3px 8px rgba(255,255,255,0.9), 
                            0 6px 16px rgba(0,0,0,0.12),
                            0 1px 3px rgba(0,0,0,0.05)
                        `,
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.5) 60%, rgba(220,235,255,0.7) 100%)'
                    }}
                >
                    {/* Top Highlight (Gloss) */}
                    <div className="absolute top-[8%] left-[15%] w-[50%] h-[25%] bg-gradient-to-b from-white to-transparent opacity-95 rounded-full rotate-[-15deg] blur-[0.5px] pointer-events-none"></div>
                    
                    {/* Bottom Caustic Reflection */}
                    <div className="absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-blue-200/40 to-transparent opacity-80 rounded-b-full pointer-events-none"></div>

                    {/* --- Layer 3: The Center Symbol (The "Fluid W") --- */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        {/* 
                           Custom SVG: "Fluid Flow / W" 
                           Represents "Word", "Water" (Immersion), and "Wave" (Frequency).
                        */}
                        <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-all duration-300 drop-shadow-sm ${badgeCount > 0 ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                            <path 
                                d="M 15 35 C 15 35, 25 75, 35 75 C 45 75, 50 50, 50 50 C 50 50, 55 75, 65 75 C 75 75, 85 35, 85 35"
                                stroke="currentColor"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-90"
                            />
                            {badgeCount > 0 && (
                                <circle cx="85" cy="25" r="8" fill="#f43f5e" className="animate-ping" style={{ animationDuration: '3s' }} />
                            )}
                        </svg>
                    </div>
                </div>

                {/* --- Layer 4: Notification Badge (Gemstone) --- */}
                {badgeCount > 0 && (
                    <div className="absolute -top-1 -right-1 z-20">
                        <div className="relative flex h-5 min-w-[20px] px-1.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-30 animate-ping"></span>
                            <span 
                                className="relative inline-flex rounded-full h-5 min-w-[20px] px-1 bg-gradient-to-br from-red-500 to-pink-600 text-[10px] font-bold text-white items-center justify-center leading-none border border-white shadow-sm"
                            >
                                {badgeCount > 99 ? '99+' : badgeCount}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
