
import React from 'react';
import { BookOpen, Zap } from 'lucide-react';
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
                {/* 
                    Design Logic: Use a conic gradient or radial gradient that spins or pulses.
                    Added a dark drop-shadow to ensure visibility on pure white pages.
                */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow pointer-events-none"></div>
                <div className="absolute -inset-1 rounded-full border border-blue-200/30 opacity-50 scale-110 pointer-events-none"></div>

                {/* --- Layer 2: The Crystal Body (Glass Orb) --- */}
                <div 
                    className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm"
                    style={{
                        // Complex Glassmorphism Shadow Stack
                        boxShadow: `
                            inset -4px -4px 10px rgba(255,255,255,0.1),  /* Inner Rim Shadow */
                            inset 4px 4px 10px rgba(255,255,255,0.8),    /* Top Left Highlight */
                            0 8px 20px rgba(0,0,0,0.15),                 /* Deep Drop Shadow for Contrast */
                            0 2px 4px rgba(0,0,0,0.1)                    /* Subtle Rim Shadow */
                        `,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 50%, rgba(230,240,255,0.6) 100%)'
                    }}
                >
                    {/* Layer 2.1: Specular Highlight (The "Glossy" look) */}
                    <div className="absolute top-[10%] left-[15%] w-[40%] h-[20%] bg-gradient-to-b from-white to-transparent opacity-90 rounded-full rotate-[-45deg] blur-[1px] pointer-events-none"></div>
                    
                    {/* Layer 2.2: Bottom Caustic Reflection */}
                    <div className="absolute bottom-0 right-0 w-full h-[60%] bg-gradient-to-t from-blue-300/30 to-transparent opacity-60 rounded-b-full pointer-events-none"></div>

                    {/* --- Layer 3: The Suspended Icon --- */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        {/* Icon Drop Shadow to simulate suspension inside the sphere */}
                        <div className="relative filter drop-shadow-md transition-all duration-300 transform group-hover:rotate-12">
                            {badgeCount > 0 ? (
                                <BookOpen className="w-7 h-7 text-blue-600 fill-blue-50/20 stroke-[2.5px]" />
                            ) : (
                                <Zap className="w-7 h-7 text-slate-500 fill-slate-200/50 stroke-[2.5px] group-hover:text-amber-500 group-hover:fill-amber-100 transition-colors" />
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Layer 4: Notification Badge (Gemstone) --- */}
                {badgeCount > 0 && (
                    <div className="absolute -top-1 -right-1 z-20">
                        <div className="relative flex h-5 min-w-[20px] px-1.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                            <span 
                                className="relative inline-flex rounded-full h-5 min-w-[20px] px-1 bg-gradient-to-br from-red-500 to-rose-600 text-[10px] font-bold text-white items-center justify-center leading-none border border-white/50 shadow-sm"
                                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
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
