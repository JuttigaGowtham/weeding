"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import Invitation from './invitation';

function Start() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Trigger the bottom-left reveal animation slightly after the component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }
    };

    // Ensure the video strictly mutes if the invitation opens
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isOpen ? true : isMuted;
        }
    }, [isOpen, isMuted]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#111111] flex items-center justify-center">
            
            {/* Video Container (handles the expanding animation from bottom left) */}
            <div 
                className={`absolute inset-0 origin-bottom-left transition-all duration-[4000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0
                ${isMounted ? 'scale-100 opacity-100 rounded-none' : 'scale-[0.05] opacity-0 blur-[20px] translate-x-[-5%] translate-y-[5%]'}`}
            >
                {/* Video Content (handles the invitation open fade/scale) */}
                <div className={`relative w-full h-full transition-all duration-1000 ease-in-out ${isOpen ? 'opacity-30 scale-105' : 'opacity-100 scale-100'}`}>
                    <video 
                        ref={videoRef}
                        autoPlay 
                        loop 
                        muted
                        playsInline 
                        className="w-full h-full object-cover"
                    >
                        <source src="/video1.mp4" type="video/mp4" />
                    </video>
                    {/* Subtle overlay to ensure text is always readable over video */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            </div>

            {/* Audio Toggle Button */}
            <button 
                onClick={toggleMute}
                className={`absolute flex items-center justify-center gap-1.5 md:gap-2 top-4 right-4 md:top-6 md:right-6 z-30 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white backdrop-blur-md transition-all duration-1000 delay-[3000ms] cursor-pointer tracking-widest uppercase text-[8px] md:text-[10px] font-bold shadow-lg
                ${(!isMounted || isOpen) ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100 translate-y-0'}`}
            >
                {isMuted ? (
                    <><FiVolumeX className="text-[12px] md:text-sm" /> Unmute</>
                ) : (
                    <><FiVolume2 className="text-[12px] md:text-sm" /> Mute</>
                )}
            </button>

            {/* Initial View: Names & Button */}
            {/* Hidden until isMounted finishes sweeping, then fades and slides in elegantly */}
            <div 
                className={`relative z-20 flex flex-col items-center justify-center transition-all duration-[2000ms] ease-out w-full
                ${!isMounted ? 'opacity-0 translate-y-20' : isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 delay-[2500ms]'}`}
            >
                <div className="space-y-8 md:space-y-12 text-center px-4 md:px-8 w-full max-w-4xl mx-auto">
                    <div className="space-y-3 md:space-y-4">
                        <p className="text-[#FFB7CE] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] sm:text-xs font-semibold drop-shadow-md">
                            Join us to celebrate
                        </p>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-serif text-[#FFB7CE] drop-shadow-lg leading-tight px-2">
                            Vasudevarao &amp; jyothsna
                        </h1>
                    </div>
                    
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 bg-pink-200 hover:bg-white hover:text-[#2A2A2A] text-white backdrop-blur-md border border-white/50 transition-all duration-500 ease-out cursor-pointer rounded-sm tracking-[0.1em] md:tracking-widest uppercase text-[10px] md:text-xs font-semibold shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] w-auto max-w-[90vw]"
                    >
                        Open the invitation
                    </button>
                </div>
            </div>

            {/* Hidden Complete Detail Overlay */}
            <div 
                className={`absolute z-40 inset-0 w-full h-full overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] 
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}
            >
                <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-[#FAF9F6]">
                    <Invitation onClose={() => setIsOpen(false)} />
                </div>
            </div>
        </div>
    );
}

export default Start;