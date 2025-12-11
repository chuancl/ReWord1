
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
            <div className={`relative w-14 h-14 transition-transform duration-300 ease-out ${isDragging ? 'scale-90 cursor-grabbing' : 'hover:scale-105'}`}>
                
                {/* 
                   Style: "Crystal Orb with Halo"
                   Design for visibility on white backgrounds and aesthetics.
                */}
                
                {/* 1. The Halo (Outer Glow) 
                    Provides contrast against white pages. Pulsing slightly.
                */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-400 opacity-60 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 animate-pulse-slow"></div>

                {/* 2. The Crystal Body (Glassmorphism) 
                    Semi-transparent, blurred backdrop, shiny borders.
                */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-white/60 flex items-center justify-center overflow-hidden">
                    
                    {/* Glossy Reflection (Top Highlight) */}
                    <div className="absolute top-0 left-2 right-2 h-1/2 bg-gradient-to-b from-white/80 to-transparent rounded-t-full opacity-70 pointer-events-none"></div>
                    
                    {/* Bottom Reflection (Ambient Light) */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-100/30 to-transparent opacity-50 pointer-events-none"></div>

                    {/* 3. The Icon (Suspended inside) */}
                    <div className={`relative z-10 transition-colors duration-300 drop-shadow-sm ${badgeCount > 0 ? 'text-blue-600' : 'text-slate-600'}`}>
                        {badgeCount > 0 ? (
                            <BookOpen className="w-7 h-7 stroke-[2.5px] fill-blue-50/50" />
                        ) : (
                            <Zap className="w-7 h-7 stroke-[2.5px] fill-amber-50/50 text-amber-500" />
                        )}
                    </div>
                </div>

                {/* 4. Notification Badge (Gemstone Style) */}
                {badgeCount > 0 && (
                    <div className="absolute -top-1 -right-1 z-20 flex items-center justify-center">
                        <span className="relative flex h-5 min-w-[20px] px-1.5 items-center justify-center">
                            {/* Ping Animation */}
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            
                            {/* Badge Body */}
                            <span className="relative inline-flex rounded-full h-5 min-w-[20px] bg-gradient-to-r from-red-500 to-pink-600 border border-white/50 text-[10px] font-bold text-white items-center justify-center shadow-md leading-none px-1">
                                {badgeCount > 99 ? '99+' : badgeCount}
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
