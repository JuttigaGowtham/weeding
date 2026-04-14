"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { MdOutlineFlightTakeoff, MdOutlineTrain, MdQrCodeScanner } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';

interface InvitationProps {
    onClose: () => void;
}

const ParallaxImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // Using 10% instead of 15% prevents the sliding image from leaving a gap at the top/bottom 
    // when the container height is 130%.
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y, width: '100%', height: '130%', top: '-15%', position: 'absolute' }}>
                <Image src={src} alt={alt} fill className={`object-cover ${className || ''}`} />
            </motion.div>
        </div>
    );
};

const FloatingHearts = () => {
    const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

    // Generate random values only on client-side to prevent hydration mismatch
    useEffect(() => {
        const generatedHearts = Array.from({ length: 35 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `-${Math.random() * 30}s`,
            duration: `${15 + Math.random() * 20}s`,
            size: `${20 + Math.random() * 40}px`,
        }));
        setHearts(generatedHearts);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
            <style>
                {`
                    @keyframes floatUpHeart {
                        0% { transform: translateY(120vh) scale(0.8) rotate(-20deg); opacity: 0; }
                        10% { opacity: 0.6; }
                        90% { opacity: 0.6; }
                        100% { transform: translateY(-20vh) scale(1.5) rotate(20deg); opacity: 0; }
                    }
                `}
            </style>
            {hearts.map((heart) => (
                <svg
                    key={heart.id}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute text-white drop-shadow-md"
                    style={{
                        left: heart.left,
                        width: heart.size,
                        height: heart.size,
                        animation: `floatUpHeart ${heart.duration} linear infinite`,
                        animationDelay: heart.delay,
                    }}
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ))}
        </div>
    );
};

export default function Invitation({ onClose }: InvitationProps) {
    return (
        <div className="min-h-screen w-full bg-[#FFE5EC] text-[#2A2A2A] relative flex flex-col items-center">
            
            {/* Love Symbols Background */}
            <FloatingHearts />

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 lg:fixed lg:top-10 lg:right-10 z-50 p-3 md:p-4 font-serif text-[#2A2A2A] hover:text-[#9A7D84] hover:lg:text-[#2A2A2A] transition-colors uppercase tracking-[0.2em] text-[10px] md:text-xs cursor-pointer font-bold bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-full lg:rounded-none border border-white/50 lg:border-none shadow-sm lg:shadow-none"
            >
                Close
            </button>

            {/* Header Section */}
            <section className="min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-8 text-center space-y-8 md:space-y-12 w-full max-w-5xl mx-auto relative z-10">
                <div className="space-y-4 md:space-y-6 pt-12 md:pt-16">
                    <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.4em] text-[#9A7D84] uppercase">
                        The Wedding Celebration Of
                    </span>
                    <div className="mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-12">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#2A2A2A]">
                            Vasudevarao
                        </h1>
                        <div className="text-4xl md:text-7xl font-serif text-white drop-shadow-sm py-1 md:py-0">
                            &amp;
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#2A2A2A]">
                            Jyothsna
                        </h1>
                    </div>
                </div>

                <div className="space-y-6 pt-16">
                    <p className="text-[#5D4E52] leading-relaxed font-light text-xl md:text-2xl max-w-2xl mx-auto px-4 italic font-serif">
                        "Iyam Sita mama sutha sahadharma chari thava<br />Pratheechcha cha enam bhadram te panim grihneeshwa panina"
                    </p>
                    <p className="text-xs font-bold text-[#9A7D84] tracking-[0.3em] uppercase pt-4">Valmiki Ramayana</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-10 md:py-12 px-6 md:px-8 w-full max-w-5xl mx-auto text-center space-y-8 md:space-y-10 relative z-10">
                <div className="space-y-4 md:space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A2A2A]">Our Story</h2>
                    <div className="h-px w-16 md:w-24 bg-white mx-auto shadow-sm"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-20 text-left pt-6">
                    <div className="flex-1 space-y-6">
                        <span className="text-xs font-bold tracking-[0.4em] text-white drop-shadow-sm uppercase block">How We Met</span>
                        <p className="text-[#5D4E52] leading-loose font-light text-lg">
                            It all began on a peaceful evening at a small downtown bookstore. We bumped into each other while reaching for the exact same poetry collection. What followed was a magical, hours-long conversation that felt just like catching up with an old friend.
                        </p>
                    </div>
                    
                    <div className="w-px bg-white/80 hidden md:block mt-8"></div>
                    <div className="h-px w-full bg-white/80 block md:hidden"></div>
                    
                    <div className="flex-1 space-y-6">
                        <span className="text-xs font-bold tracking-[0.4em] text-white drop-shadow-sm uppercase block">The Proposal</span>
                        <p className="text-[#5D4E52] leading-loose font-light text-lg">
                            Years later, surrounded by glowing lanterns and the quiet beauty of a botanical garden at dusk, Ahmad nervously knelt down. Among the flowers and under a starry sky, the easiest "Yes" was said, securing our beautiful forever.
                        </p>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full flex justify-center py-4 md:py-6 opacity-60 relative z-10">
                <div className="h-16 md:h-24 w-px bg-gradient-to-b from-[#FFE5EC] via-white to-[#FFE5EC]"></div>
            </div>

            {/* Wedding Events Section */}
            <section className="py-12 md:py-16 px-8 w-full max-w-6xl mx-auto text-center space-y-12 relative z-10">
                <div className="space-y-6 flex flex-col items-center">
                    <h2 className="text-5xl md:text-6xl font-serif text-[#2A2A2A]">Wedding Events</h2>
                    <p className="text-[#9A7D84] font-bold tracking-widest uppercase text-xs pt-4">
                        Join us for the celebration of a lifetime
                    </p>
                    <div className="h-px w-32 bg-white mx-auto shadow-sm mt-8"></div>
                </div>

                <div className="flex flex-col gap-10 lg:gap-14 pt-8 max-w-5xl mx-auto">
                    {/* Haldi Ceremony */}
                    <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm w-full bg-white/40 border border-white/60 backdrop-blur-sm group">
                        {/* Left Side: Image */}
                        <div className="relative w-full md:w-1/2 h-[350px] md:h-[500px] flex items-center justify-center p-4 md:p-10 bg-white/20 border-b md:border-b-0 md:border-r border-white/50">
                            <div className="relative w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-white shadow-md overflow-hidden">
                                <ParallaxImage src="/haldi.jpg" alt="Haldi Ceremony" className="rounded-[1.25rem] md:rounded-[1.5rem]" />
                            </div>
                        </div>
                        
                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-14 text-left">
                            <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] pb-4">Haldi Ceremony</h3>
                            <p className="text-[#5D4E52] italic font-serif text-lg pb-8 leading-relaxed">"A celebration of love, laughter, and a touch of turmeric."</p>
                            
                            <div className="space-y-2 text-[#5D4E52] font-light pt-6 border-t border-[#9A7D84]/30">
                                <p className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase">28 Aprill 2026</p>
                                <p className="text-xl pt-1">10:00 AM</p>
                                <p className="text-base font-medium pt-1">Lakshminarayanapuram Village</p>
                            </div>
                        </div>
                    </div>

                    {/* Mehendi & Sangeet */}
                    <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm w-full bg-white/40 border border-white/60 backdrop-blur-sm group">
                        {/* Left Side: Image */}
                        <div className="relative w-full md:w-1/2 h-[350px] md:h-[500px] flex items-center justify-center p-4 md:p-10 bg-white/20 border-b md:border-b-0 md:border-r border-white/50">
                            <div className="relative w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-white shadow-md overflow-hidden">
                                <ParallaxImage src="/mehandi1.jpg" alt="Mehendi & Sangeet" className="rounded-[1.25rem] md:rounded-[1.5rem]" />
                            </div>
                        </div>
                        
                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-14 text-left">
                            <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] pb-4">Mehendi &amp; Sangeet</h3>
                            <p className="text-[#5D4E52] italic font-serif text-lg pb-8 leading-relaxed">"Traditional henna ceremony with music and refreshments."</p>
                            
                            <div className="space-y-2 text-[#5D4E52] font-light pt-6 border-t border-[#9A7D84]/30">
                                <p className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase">28 April 2026</p>
                                <p className="text-xl pt-1">1:00 PM</p>
                                <p className="text-base font-medium pt-1">Lakshminarayanapuram Village</p>
                            </div>
                        </div>
                    </div>

                    {/* Reception */}
                    <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm w-full bg-white/40 border border-white/60 backdrop-blur-sm group">
                        {/* Left Side: Image */}
                        <div className="relative w-full md:w-1/2 h-[350px] md:h-[500px] flex items-center justify-center p-4 md:p-10 bg-white/20 border-b md:border-b-0 md:border-r border-white/50">
                            <div className="relative w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-white shadow-md overflow-hidden">
                                <ParallaxImage src="/reception1.jpg" alt="Reception" className="rounded-[1.25rem] md:rounded-[1.5rem]" />
                            </div>
                        </div>
                        
                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-14 text-left">
                            <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] pb-4">Reception</h3>
                            <p className="text-[#5D4E52] italic font-serif text-lg pb-8 leading-relaxed">"Join us for a celebratory dinner."</p>
                            
                            <div className="space-y-2 text-[#5D4E52] font-light pt-6 border-t border-[#9A7D84]/30">
                                <p className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase">29 April 2026</p>
                                <p className="text-xl pt-1">7:00 PM – 9:00 PM</p>
                                <p className="text-base font-medium pt-1">Lakshminarayanapuram Village</p>
                            </div>
                        </div>
                    </div>

                    {/* Wedding Ceremony */}
                    <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm w-full bg-white/40 border border-white/60 backdrop-blur-sm group">
                        {/* Left Side: Image */}
                        <div className="relative w-full md:w-1/2 h-[350px] md:h-[500px] flex items-center justify-center p-4 md:p-10 bg-white/20 border-b md:border-b-0 md:border-r border-white/50">
                            <div className="relative w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-white shadow-md overflow-hidden">
                                <ParallaxImage src="/marriage1.jpg" alt="Weeding Ceremony" className="rounded-[1.25rem] md:rounded-[1.5rem]" />
                            </div>
                        </div>
                        
                        {/* Right Side: Content */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-14 text-left">
                            <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] pb-1">Wedding Ceremony</h3>
                            <p className="text-sm font-serif italic text-[#2A2A2A]/70 pb-4">(Muhurtham)</p>
                            <p className="text-[#5D4E52] italic font-serif text-lg pb-8 leading-relaxed">"We need your heartfelt blessings as we unite."</p>
                            
                            <div className="space-y-2 text-[#5D4E52] font-light pt-6 border-t border-[#9A7D84]/30">
                                <p className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase">29 April 2026</p>
                                <p className="text-xl pt-1">12:34 PM</p>
                                <p className="text-base font-medium pt-1">Lakshminarayanapuram Village</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full flex justify-center py-4 md:py-6 opacity-60 relative z-10">
                <div className="h-16 md:h-24 w-px bg-gradient-to-b from-[#FFE5EC] via-white to-[#FFE5EC]"></div>
            </div>

            {/* Share Your Wishes Section */}
            <section className="py-10 md:py-12 px-8 w-full max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <div className="space-y-6 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2A2A2A]">Share Your Wishes</h2>
                    <p className="text-[#9A7D84] font-bold tracking-widest uppercase text-xs pt-2">
                        Leave a message for the beautiful couple
                    </p>
                    <div className="h-px w-24 bg-white mx-auto shadow-sm mt-6"></div>
                </div>

                <div className="bg-white/40 border border-white/60 backdrop-blur-md p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-sm relative overflow-hidden group">
                    <form className="flex flex-col gap-8 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-bold text-[#9A7D84] tracking-[0.2em] uppercase pl-2">Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/50 border border-white/80 rounded-2xl px-5 py-4 text-[#2A2A2A] placeholder:text-[#5D4E52]/40 outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all font-light" 
                                    placeholder="Your full name" 
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-bold text-[#9A7D84] tracking-[0.2em] uppercase pl-2">Relation</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/50 border border-white/80 rounded-2xl px-5 py-4 text-[#2A2A2A] placeholder:text-[#5D4E52]/40 outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all font-light" 
                                    placeholder="Friend, Family, etc." 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-bold text-[#9A7D84] tracking-[0.2em] uppercase pl-2">Your Wishes</label>
                            <textarea 
                                rows={5} 
                                className="w-full bg-white/50 border border-white/80 rounded-2xl px-5 py-4 text-[#2A2A2A] placeholder:text-[#5D4E52]/40 outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-all font-light resize-none" 
                                placeholder="Write your heartfelt wishes here..."
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 flex justify-center">
                            <button 
                                type="button" 
                                className="px-14 py-4 bg-[#2A2A2A] text-white hover:bg-white hover:text-[#2A2A2A] transition-all duration-500 tracking-[0.3em] uppercase text-xs font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Send Wishes
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full flex justify-center py-4 md:py-6 opacity-60 relative z-10">
                <div className="h-16 md:h-24 w-px bg-gradient-to-b from-[#FFE5EC] via-white to-[#FFE5EC]"></div>
            </div>

            {/* Location & Contacts Section */}
            <section className="py-10 md:py-12 px-8 w-full max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
                <div className="space-y-6 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2A2A2A]">Location & Contacts</h2>
                    <p className="text-[#9A7D84] font-bold tracking-widest uppercase text-xs pt-2">
                        How to reach & who to call
                    </p>
                    <div className="h-px w-24 bg-white mx-auto shadow-sm mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 text-left">
                    {/* Location Card */}
                    <div className="bg-white/40 border border-white/60 backdrop-blur-md p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-sm flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
                        <h3 className="text-2xl font-serif text-[#2A2A2A] pb-6 flex items-center gap-3">
                            <FiMapPin className="text-[#9A7D84]" /> Venue Details
                        </h3>
                        <div className="space-y-6 flex-1 text-[#5D4E52] font-light">
                            <div>
                                <h4 className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase pb-2">Main Venue</h4>
                                <p className="text-xl font-serif text-[#2A2A2A]">Vasudevarao & Jyothsna's Residence</p>
                                <p className="text-md leading-relaxed pt-2">
                                    Lakshminarayanapuram Village, Parvathipuram Manyam District,<br/>
                                    Andhra Pradesh - 535526
                                </p>
                            </div>
                            
                            <div className="pt-4 border-t border-[#9A7D84]/30">
                                <h4 className="font-bold text-[#9A7D84] text-xs tracking-[0.2em] uppercase pb-3">Getting there</h4>
                                <ul className="space-y-3 text-md flex flex-col">
                                    <li className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-white/60">
                                        <span className="text-2xl text-[#9A7D84]"><MdOutlineFlightTakeoff /></span> 
                                        <div>
                                            <p className="font-medium text-[#2A2A2A]">Nearest Airport</p>
                                            <p className="text-sm">Visakhapatnam (VTZ) - ~150km</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-white/60">
                                        <span className="text-2xl text-[#9A7D84]"><MdOutlineTrain /></span> 
                                        <div>
                                            <p className="font-medium text-[#2A2A2A]">Nearest Railway</p>
                                            <p className="text-sm">Parvathipuram Hub / Bobbili Jn</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="pt-8 flex">
                            <button type="button" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#2A2A2A] text-white hover:bg-white hover:text-[#2A2A2A] transform hover:-translate-y-1 transition-all duration-500 tracking-[0.2em] uppercase text-xs font-bold rounded-full shadow-lg hover:shadow-xl border border-transparent hover:border-[#2A2A2A]">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    {/* Contacts Card */}
                    <div className="bg-white/40 border border-white/60 backdrop-blur-md p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-sm flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
                        <h3 className="text-2xl font-serif text-[#2A2A2A] pb-4 flex items-center gap-3">
                            <FiPhone className="text-[#9A7D84]" /> Important Contacts
                        </h3>
                        <p className="text-[#5D4E52] font-light italic text-[15px] pb-8 leading-relaxed">Please feel free to reach out to our family members for any assistance regarding travel or accommodation.</p>

                        <div className="space-y-5 font-light flex-1">
                            {/* Contact 1 */}
                            <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl border border-white/60 transition-colors hover:bg-white/80 group/btn">
                                <div>
                                    <p className="text-[#2A2A2A] font-serif text-xl pb-1">Mukku polinaidu</p>
                                    <p className="font-bold text-[#9A7D84] text-[10px] tracking-[0.2em] uppercase">Bride Father</p>
                                </div>
                                <a href="tel:+919652722918" className="flex items-center justify-center h-12 w-12 bg-white text-xl rounded-full shadow-sm hover:bg-[#2A2A2A] hover:text-white transition-all transform group-hover/btn:scale-110">
                                    <IoCallOutline />
                                </a>
                            </div>

                            {/* Contact 2 */}
                            <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl border border-white/60 transition-colors hover:bg-white/80 group/btn">
                                <div>
                                    <p className="text-[#2A2A2A] font-serif text-xl pb-1">Mukku Ramalakshmi</p>
                                    <p className="font-bold text-[#9A7D84] text-[10px] tracking-[0.2em] uppercase">Bride Mother</p>
                                </div>
                                <a href="tel:+919989880872" className="flex items-center justify-center h-12 w-12 bg-white text-xl rounded-full shadow-sm hover:bg-[#2A2A2A] hover:text-white transition-all transform group-hover/btn:scale-110">
                                    <IoCallOutline />
                                </a>
                            </div>
                            
                            {/* Contact 3 */}
                            <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl border border-white/60 transition-colors hover:bg-white/80 group/btn">
                                <div>
                                    <p className="text-[#2A2A2A] font-serif text-xl pb-1">Chintala Sivanaidu</p>
                                    <p className="font-bold text-[#9A7D84] text-[10px] tracking-[0.2em] uppercase">Groom Father</p>
                                </div>
                                <a href="tel:+919010430244" className="flex items-center justify-center h-12 w-12 bg-white text-xl rounded-full shadow-sm hover:bg-[#2A2A2A] hover:text-white transition-all transform group-hover/btn:scale-110">
                                    <IoCallOutline />
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-5 bg-white/50 rounded-2xl border border-white/60 transition-colors hover:bg-white/80 group/btn">
                                <div>
                                    <p className="text-[#2A2A2A] font-serif text-xl pb-1">Chintala Chinnathalli</p>
                                    <p className="font-bold text-[#9A7D84] text-[10px] tracking-[0.2em] uppercase">Groom Mother</p>
                                </div>
                                <a href="tel:+919542127226" className="flex items-center justify-center h-12 w-12 bg-white text-xl rounded-full shadow-sm hover:bg-[#2A2A2A] hover:text-white transition-all transform group-hover/btn:scale-110">
                                    <IoCallOutline />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* QR Scanner Card */}
                    <div className="bg-white/40 border border-white/60 backdrop-blur-md p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-sm flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
                        <h3 className="text-2xl font-serif text-[#2A2A2A] pb-4 flex items-center gap-3">
                            <MdQrCodeScanner className="text-[#9A7D84]" /> Scan for Location
                        </h3>
                        <p className="text-[#5D4E52] font-light italic text-[15px] pb-8 leading-relaxed">
                            Scan this QR code with your smartphone camera to instantly open Google Maps directions to our venue.
                        </p>

                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="p-4 bg-white rounded-[2rem] shadow-md border-[6px] border-[#FFE5EC] group-hover:border-white transition-colors duration-500 overflow-hidden relative w-[220px] h-[220px]">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=2A2A2A&bgcolor=FFFFFF&data=https://maps.google.com/?q=Jiyammavalsa,Parvathipuram+Manyam+District" 
                                    alt="Location QR Code" 
                                    className="w-full h-full object-contain p-3"
                                />
                            </div>
                            <div className="mt-8 text-center">
                                <p className="font-bold text-[#9A7D84] text-[10px] tracking-[0.3em] uppercase opacity-80">Powered by Google Maps</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registry / RSVP Footer */}
            <section className="w-full relative z-20 bg-[#FFE5EC] flex flex-col">
                <div className="relative w-full min-h-[70vh] lg:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 z-0">
                        <ParallaxImage src="/footer3.jpg" alt="Footer Celebration"  />
                        
                        {/* Giant Numbers Overlay */}
                        <div className="absolute -bottom-4 md:-bottom-12 left-0 w-full flex justify-between px-2 md:px-8 z-10 overflow-hidden pointer-events-none opacity-[0.95] select-none mix-blend-overlay">
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">2</span>
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">9</span>
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">0</span>
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">4</span>
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">2</span>
                            <span className="text-[30vw] font-serif text-white leading-[0.75]">6</span>
                        </div>
                        
                        {/* Overlay removed per user request */}
                        <div className="absolute inset-0 z-20 pointer-events-none"></div>
                        {/* Gradients to blend with page background */}
                        {/* <div className="absolute top-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#FFE5EC] to-transparent z-20"></div>
                        <div className="absolute bottom-0 w-full h-32 md:h-48 bg-gradient-to-t from-[#FFE5EC] to-transparent z-20"></div> */}
                    </div>

                    {/* Content */}
                    <div className="relative z-30 flex flex-col items-center text-center px-6 mb-24 md:mb-40">
                        {/* <p className="text-white text-lg md:text-2xl font-light mb-3">Dear,</p>
                        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif tracking-wide text-white mb-8 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            Family &amp; Friends
                        </h2> */}
                        
                        <div className="flex flex-col items-center pt-6">

                            <button className="group px-8 py-3.5 bg-transparent text-white border border-white/80 hover:bg-white hover:text-black transition-all duration-500 rounded-full flex items-center justify-center gap-3 text-sm md:text-base cursor-pointer tracking-widest font-light shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                Save the date
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ending Names Text with Crossing Hover Details */}
                <div className="w-full py-12 md:py-20 flex justify-center items-center overflow-visible relative z-30">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-serif text-black select-none drop-shadow-sm flex items-center justify-center gap-4 md:gap-10">
                        
                        {/* Groom */}
                        <div className="relative group cursor-pointer inline-block outline-none" tabIndex={0}>
                            <span className="group-hover:text-[#9A7D84] group-focus:text-[#9A7D84] transition-colors duration-500 relative z-10 block">Vasudevarao</span>
                            
                            {/* Groom Details Pop-up */}
                            <div className="absolute bottom-full mb-4 w-[240px] md:w-[300px] bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/60 pointer-events-none text-center
                                opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-50
                                left-1/2 -translate-x-[80%] translate-y-12 scale-90 rotate-[-4deg]
                                group-hover:opacity-100 group-hover:-translate-x-1/2 group-hover:translate-y-0 group-hover:scale-100 group-hover:rotate-0
                                group-focus:opacity-100 group-focus:-translate-x-1/2 group-focus:translate-y-0 group-focus:scale-100 group-focus:rotate-0
                            ">
                                <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden border-[4px] border-white shadow-md relative">
                                    <Image src="/groom.jpg" alt="Ahmad" fill className="object-cover" />
                                </div>
                                <p className="text-[10px] md:text-xs font-bold text-[#9A7D84] tracking-[0.3em] uppercase pb-2 not-italic border-b border-[#9A7D84]/20 mb-3 inline-block">The Groom</p>
                                <p className="text-sm md:text-base text-[#5D4E52] font-light not-italic leading-relaxed">
                                    Software Engineer<br/>
                                    <span className="text-xs opacity-60 italic mt-2 block">Son of Chintala sivanaidu &amp; chintala Chinnathalli</span>
                                </p>
                            </div>
                        </div>

                        <span className="text-[#9A7D84] text-4xl md:text-5xl lg:text-7xl font-light">&amp;</span>

                        {/* Bride */}
                        <div className="relative group cursor-pointer inline-block outline-none" tabIndex={0}>
                            <span className="group-hover:text-[#9A7D84] group-focus:text-[#9A7D84] transition-colors duration-500 relative z-10 block">Jyothsna</span>
                            
                            {/* Bride Details Pop-up */}
                            <div className="absolute bottom-full mb-4 w-[240px] md:w-[300px] bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/60 pointer-events-none text-center
                                opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-50
                                left-1/2 -translate-x-[20%] translate-y-12 scale-90 rotate-[4deg]
                                group-hover:opacity-100 group-hover:-translate-x-1/2 group-hover:translate-y-0 group-hover:scale-100 group-hover:rotate-0
                                group-focus:opacity-100 group-focus:-translate-x-1/2 group-focus:translate-y-0 group-focus:scale-100 group-focus:rotate-0
                            ">
                                <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden border-[4px] border-white shadow-md relative">
                                    <Image src="/bride.jpg" alt="Fatima" fill className="object-cover" />
                                </div>
                                <p className="text-[10px] md:text-xs font-bold text-[#9A7D84] tracking-[0.3em] uppercase pb-2 not-italic border-b border-[#9A7D84]/20 mb-3 inline-block">The Bride</p>
                                <p className="text-sm md:text-base text-[#5D4E52] font-light not-italic leading-relaxed">
                                    Senior Architect<br/>
                                    <span className="text-xs opacity-60 italic mt-2 block">Daughter of Mukku polinaidu &amp; Mukku Ramalakshmi</span>
                                </p>
                            </div>
                        </div>

                    </h1>
                </div>
            </section>
        </div>
    );
}
