"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, Activity } from 'lucide-react';

// --- SYNCHRONIZED CASE STUDIES DATA ---
const caseStudies = [
    {
        id: "bulq-logistics",
        title: "Bulq Logistics Ecosystem",
        category: "Supply Chain & Fleet",
        description: "Replaced manual operations with automated dispatch routing using advanced graph algorithms and real-time GPS telemetry.",
        impact: "Orchestrating 50,000+ monthly shipments.",
        image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800",
        color: "#059669"
    },
    {
        id: "bdc-fx",
        title: "Enterprise FX & BDC Platform",
        category: "Fintech & Exchange",
        description: "Military-grade Bureau De Change application built with zero-trust security and immutable ledger routing for high-frequency global currency conversions.",
        impact: "Secured millions daily with zero compliance failures.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
        color: "#0284c7"
    },
    {
        id: "esusu-app",
        title: "Digital Esusu (Co-op)",
        category: "Wealth Management",
        description: "Modernized the traditional African savings system into a highly secure digital cooperative app, featuring automated group contributions and milestone payouts.",
        impact: "Digitized thousands of offline savings groups.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        color: "#ea580c"
    },
    {
        id: "omnichannel-ai",
        title: "Tri-Lingual AI Agent",
        category: "Artificial Intelligence",
        description: "LLM-powered chatbot trained with custom Speech-to-Text models for Hausa, Igbo, and Yoruba, seamlessly handling customer support via Voice and WhatsApp.",
        impact: "Reduced call-center operational costs by 60%.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        color: "#14b8a6"
    },
    {
        id: "proptech-real-estate",
        title: "Premium PropTech Platform",
        category: "Real Estate & Asset",
        description: "Comprehensive real estate discovery platform engineered with high-resolution virtual property tours and secure, automated escrow payment systems.",
        impact: "Reduced average close times by 14 days.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
        color: "#be123c"
    }
];

export default function CaseStudySlider() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="w-full bg-slate-50 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-gray-100 overflow-hidden">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            
            <div className="max-w-7xl mx-auto mb-12 sm:mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="w-full sm:w-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor tracking-tight break-words whitespace-normal">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B0163] to-[#BA25EB]">Triumphs</span>
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm sm:text-lg max-w-2xl break-words whitespace-normal">
                        From resolving supply chain bottlenecks to engineering secure fintech architectures. See how we turn complex problems into production realities.
                    </p>
                </div>
                
                {/* Desktop Global Navigation Button */}
                <Link 
                    href="/case-studies"
                    className="hidden sm:inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md hover:border-[#4B0163] hover:text-[#4B0163] transition-all active:scale-95 whitespace-nowrap shrink-0"
                >
                    View All Cases <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto relative group/slider">
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {caseStudies.map((item, index) => (
                        <div
                            key={index}
                            /* STRICT WIDTHS: Forces mobile width to exactly 85vw or 300px (whichever is smaller) to guarantee no overflow */
                            className="w-[85vw] max-w-[300px] sm:max-w-none sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] snap-start flex-shrink-0 bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col hover:-translate-y-2"
                        >
                            {/* Image Header with Zoom Effect */}
                            <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-900 shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
                                
                                {/* Category Badge - Forced text wrap */}
                                <div 
                                    className="absolute top-4 left-4 right-4 sm:right-auto px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white backdrop-blur-md shadow-lg w-max max-w-[90%] whitespace-normal break-words leading-tight" 
                                    style={{ backgroundColor: item.color }}
                                >
                                    {item.category}
                                </div>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 w-full overflow-hidden">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-[#4B0163] transition-colors break-words whitespace-normal leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-5 break-words whitespace-normal line-clamp-3 sm:line-clamp-4">
                                    {item.description}
                                </p>
                                
                                <div className="mt-auto pt-4 sm:pt-5 border-t border-gray-100 flex flex-col gap-4">
                                    {/* Impact Section - Forced text wrap */}
                                    <div className="flex items-start gap-2.5 bg-gray-50 p-3 sm:p-3.5 rounded-xl border border-gray-100 w-full overflow-hidden">
                                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Impact</span>
                                            <p className="text-[11px] sm:text-xs lg:text-sm font-bold text-gray-800 leading-snug break-words whitespace-normal">
                                                {item.impact}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Link flex-wrap to prevent button overflow */}
                                    <Link 
                                        href="/case-studies"
                                        className="flex items-center justify-between flex-wrap gap-2 w-full text-[#4B0163] font-bold text-xs sm:text-sm hover:text-purple-900 transition-colors group/link"
                                    >
                                        <span className="break-words whitespace-normal leading-tight flex-1">Read Full Story</span>
                                        <span className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 bg-purple-50 rounded-full flex items-center justify-center group-hover/link:bg-[#4B0163] group-hover/link:text-white transition-all duration-300">
                                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons (Appear on Hover of the slider container on desktop) */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-5 top-[35%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:bg-[#4B0163] hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 hidden sm:flex"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-5 top-[35%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 hover:bg-[#4B0163] hover:text-white transition-all z-10 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 hidden sm:flex"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Mobile Global Navigation Button */}
            <div className="mt-6 flex justify-center sm:hidden w-full px-4">
                <Link 
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-bold shadow-sm hover:border-[#4B0163] hover:text-[#4B0163] transition-all active:scale-95 text-sm"
                >
                    View All Cases <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

// "use client";
// import React, { useRef } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import caseImg from '@/public/images/dusacoreimages/communication.jpg';

// const caseStudies = [
//     {
//         title: "BULQ E-Commerce",
//         description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
//         image: caseImg,
//     },
//     {
//         title: "BULQ Logistics",
//         description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
//         image: caseImg,
//     },
//     {
//         title: "DUSA CORE",
//         description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
//         image: caseImg,
//     },
// ];

// export default function CaseStudySlider() {
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const scroll = (direction: 'left' | 'right') => {
//         if (!scrollRef.current) return;
//         const amount = scrollRef.current.clientWidth;
//         scrollRef.current.scrollBy({
//             left: direction === 'left' ? -amount : amount,
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <section className="w-full bg-white py-4 sm:py-8 lg:pb-16 lg:pt-4 px-4 sm:px-6 lg:px-8">
//             <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
//             <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
//                 Our <span className="text-appBanner">Case Studies</span>
//             </h2>
//             <div className="max-w-7xl mx-auto relative">
//                 <div
//                     ref={scrollRef}
//                     className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     {caseStudies.map((item, index) => (
//                         <div
//                             key={index}
//                             className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] max-w-[300px] snap-start flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <div className="relative w-full h-56">
//                                 <Image
//                                     src={item.image}
//                                     alt={item.title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>
//                             <div className="p-6 flex flex-col gap-3 bg-appNav">
//                                 <h6 className="text-white font-bold text-base uppercase tracking-wide">
//                                     {item.title}
//                                 </h6>
//                                 <p className="text-white text-sm leading-relaxed font-semibold">
//                                     {item.description}
//                                 </p>
//                                 <button className="mt-2 self-start bg-appPurple text-white px-5 py-2 rounded-full text-sm font-bold border border-transparent hover:bg-appNav hover:shadow-lg hover:border-white transition-all">
//                                     Read More
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     onClick={() => scroll('left')}
//                     className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-appTitleBgColor hover:bg-appLightPurple hover:text-white transition-colors z-10"
//                 >
//                     <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button
//                     onClick={() => scroll('right')}
//                     className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-appTitleBgColor hover:bg-appLightPurple hover:text-white transition-colors z-10"
//                 >
//                     <ChevronRight className="w-5 h-5" />
//                 </button>
//             </div>
//         </section>
//     );
// }
