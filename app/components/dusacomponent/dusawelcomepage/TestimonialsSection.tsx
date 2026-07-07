"use client";

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

// --- GENERATED TESTIMONIALS BASED ON CASE STUDIES ---
const testimonialsData = [
    {
        id: 1,
        name: "Director of Operations",
        role: "Logistics Enterprise",
        quote: "DUSA CORE completely overhauled our supply chain bottlenecks. The automated routing cut our dispatch times by 70%. Their architecture handles our 50,000+ monthly shipments flawlessly without a single latency drop.",
        rating: 5,
        gradient: "from-[#4B0163] to-[#8300AF]",
        caseStudy: "Bulq Logistics Ecosystem"
    },
    {
        id: 2,
        name: "Chief Risk Officer",
        role: "Global Fintech & BDC",
        quote: "In the foreign exchange market, security is everything. DUSA engineered a zero-trust platform that processes millions daily. We haven't had a single compliance failure since migration. Unmatched technical brilliance.",
        rating: 5,
        gradient: "from-[#8300AF] to-[#BA25EB]",
        caseStudy: "Enterprise FX Platform"
    },
    {
        id: 3,
        name: "Founder & CEO",
        role: "Co-op Wealth Management",
        quote: "They didn't just build an app; they digitized a cultural staple. The automated milestone payouts and immutable ledger restored complete trust among our thousands of Esusu contributors.",
        rating: 5,
        gradient: "from-[#BA25EB] to-[#4B0163]",
        caseStudy: "Digital Esusu App"
    },
    {
        id: 4,
        name: "Head of Customer Experience",
        role: "National Telecom",
        quote: "Deploying their tri-lingual AI agent was a massive turning point. Our rural customer retention skyrocketed, and call center costs dropped 60%. The DUSA team truly understands scalable, localized AI.",
        rating: 5,
        gradient: "from-[#4B0163] to-[#BA25EB]",
        caseStudy: "Omnichannel AI Agent"
    },
    {
        id: 5,
        name: "Managing Director",
        role: "Premium PropTech",
        quote: "The automated escrow systems and high-res virtual tours reduced our property closing times by over two weeks. DUSA CORE delivered an enterprise-grade platform that fundamentally redefined how we do business.",
        rating: 5,
        gradient: "from-[#8300AF] to-[#4B0163]",
        caseStudy: "PropTech Platform"
    }
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 20 }
    }
};

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth > 768 ? 400 : scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="w-full bg-slate-50 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-t border-gray-100">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

            {/* Deep Background Orbs for the "10D" immersive feel */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4B0163] opacity-[0.03] blur-[100px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#BA25EB] opacity-[0.03] blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto mb-12 sm:mb-20 text-center relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8300AF] bg-purple-100 px-5 py-2 rounded-full inline-flex items-center gap-2 mb-6 shadow-sm">
                    <CheckCircle2 className="w-4 h-4" /> Verified Client Impact
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor tracking-tight break-words whitespace-normal leading-tight">
                    Trusted by leaders driving <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B0163] via-[#8300AF] to-[#BA25EB]">digital transformation.</span>
                </h2>
            </div>

            <div className="max-w-[1400px] mx-auto relative group/slider z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    ref={scrollRef}
                    className="flex gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-16 pt-8 px-4 sm:px-8 -mx-4 sm:-mx-8 items-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {testimonialsData.map((item, index) => {
                        return (
                            <motion.div
                                key={item.id}
                                variants={cardVariants}
                                /* STRICT WIDTHS: 85vw on mobile prevents overflow. Taller cards for 10D depth */
                                className="relative w-[85vw] max-w-[380px] sm:min-w-[400px] lg:min-w-[450px] shrink-0 snap-center group perspective-1000"
                            >
                                {/* 10D GLOWING AURA (Invisible until hover) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 transform translate-y-6 scale-90 -z-10`} />

                                {/* MAIN FROSTED GLASS CARD */}
                                <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 sm:p-10 w-full h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(131,0,175,0.15)] transition-all duration-500 transform group-hover:-translate-y-4 overflow-hidden">
                                    
                                    {/* Giant Watermark Quote Icon in Background */}
                                    <div className="absolute -top-6 -right-6 text-gray-50 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700 ease-out z-0">
                                        <Quote size={140} strokeWidth={1} fill="currentColor" />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Star Rating */}
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                                            ))}
                                        </div>

                                        {/* The Quote */}
                                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium break-words whitespace-normal mb-8 italic relative">
                                            "{item.quote}"
                                        </p>

                                        {/* Client Info Area */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4">
                                            {/* Abstract Avatar Placeholder with Animated Border */}
                                            <div className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gray-50 overflow-hidden group-hover:shadow-lg transition-all duration-300">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
                                                <span className="font-black text-[#4B0163] text-lg relative z-10">
                                                    {item.name.charAt(0)}
                                                </span>
                                                {/* Spinning gradient ring on hover */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow`} style={{ padding: '2px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', borderRadius: 'inherit' }} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-gray-900 font-extrabold text-sm sm:text-base truncate break-words whitespace-normal leading-tight">
                                                    {item.name}
                                                </h4>
                                                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} font-bold text-xs sm:text-sm truncate break-words whitespace-normal leading-tight`}>
                                                    {item.role}
                                                </p>
                                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                                                    Ref: {item.caseStudy}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Animated Top Border Line */}
                                    <div className={`absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-700 ease-in-out rounded-t-full`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Desktop Slider Controls */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 sm:left-0 top-[45%] -translate-y-1/2 w-14 h-14 rounded-full border border-gray-100 bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-[#4B0163] hover:bg-[#4B0163] hover:text-white transition-all z-20 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 hidden lg:flex hover:scale-110"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 sm:right-0 top-[45%] -translate-y-1/2 w-14 h-14 rounded-full border border-gray-100 bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-[#4B0163] hover:bg-[#4B0163] hover:text-white transition-all z-20 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 hidden lg:flex hover:scale-110"
                >
                    <ChevronRight className="w-7 h-7" />
                </button>
            </div>

            {/* Mobile Slider Controls */}
            <div className="flex lg:hidden justify-center gap-4 mt-2">
                <button
                    onClick={() => scroll('left')}
                    className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-[#4B0163] active:scale-95"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-[#4B0163] active:scale-95"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}

// import React from 'react'
// import TestimonialCard from './TestimonialCard'

// const TestimonialsSection = () => {
//   return (
//     <section className="w-full bg-white py-4 sm:py-8 lg:pb-16 lg:pt-4 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
//           Client <span className="text-appBanner">Testimonials</span>
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <TestimonialCard
//             text="DUSA CORE helped us rethink how our entire system operates. What started as a technology upgrade became a full operational transformation."
//             name="BulQ"
//           />
//           <TestimonialCard
//             text="The team at DUSA CORE delivered beyond expectations. Their strategic approach to system design transformed our digital infrastructure completely."
//             name="SendBulq"
//           />
//           <TestimonialCard
//             text="Working with DUSA CORE was a game-changer. They brought clarity to complex challenges and built solutions that scaled with our growth."
//             name="Dusa"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TestimonialsSection
