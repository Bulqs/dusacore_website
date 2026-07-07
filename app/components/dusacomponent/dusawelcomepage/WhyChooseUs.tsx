"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Server, BrainCircuit, Layers } from 'lucide-react';

// --- DUSA CORE VALUE PROPOSITIONS ---
const reasonsData = [
    {
        id: "enterprise-scale",
        title: "Enterprise-Grade Architecture",
        description: "We build fault-tolerant, high-availability systems engineered to handle millions of concurrent transactions without breaking a sweat.",
        icon: Server,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
        taint: "from-[#4B0163] to-[#8300AF]" // Deep to Mid Purple
    },
    {
        id: "zero-trust",
        title: "Zero-Trust Security",
        description: "Military-grade AES-256 encryption, immutable ledger routing, and strict compliance workflows baked into the core of every product.",
        icon: ShieldCheck,
        image: "https://images.unsplash.com/photo-1614064641936-a592654c07cb?auto=format&fit=crop&q=80&w=800",
        taint: "from-[#8300AF] to-[#BA25EB]" // Mid to Light Purple
    },
    {
        id: "rapid-deployment",
        title: "Accelerated Time-to-Market",
        description: "Leveraging our proprietary off-the-shelf modules and automated CI/CD pipelines, we cut enterprise development cycles in half.",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        taint: "from-[#BA25EB] to-[#4B0163]" // Bright to Deep Purple
    },
    {
        id: "domain-expertise",
        title: "Deep Domain Expertise",
        description: "From complex BDC Fintech algorithms to real-time Supply Chain graph routing, we speak the exact technical language of your industry.",
        icon: BrainCircuit,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
        taint: "from-[#4B0163] to-[#8300AF]" // Deep to Mid Purple
    },
    {
        id: "end-to-end",
        title: "End-to-End Ownership",
        description: "We don't just write code. We handle product ideation, UX/UI design, cloud infrastructure provisioning, and 24/7 DevOps maintenance.",
        icon: Layers,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        taint: "from-[#8300AF] to-[#4B0163]" // Mid to Deep Purple
    }
];

export default function WhyChooseUs() {
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
        <section className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

            <div className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center sm:text-left flex flex-col sm:flex-row items-end justify-between gap-6">
                <div className="w-full sm:max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4B0163] bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-4">
                        The DUSA Advantage
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor tracking-tight break-words whitespace-normal">
                        Why partner with <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B0163] to-[#BA25EB]">DUSA CORE?</span>
                    </h2>
                </div>
                
                {/* Desktop Slider Controls */}
                <div className="hidden sm:flex gap-3 shrink-0">
                    <button
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full border-2 border-gray-100 bg-white shadow-sm flex items-center justify-center text-[#4B0163] hover:bg-[#4B0163] hover:text-white transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full border-2 border-gray-100 bg-white shadow-sm flex items-center justify-center text-[#4B0163] hover:bg-[#4B0163] hover:text-white transition-all active:scale-95"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative group/slider">
                <div
                    ref={scrollRef}
                    className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-12 pt-4 px-2 -mx-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {reasonsData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                /* STRICT WIDTHS: Forces mobile width to exactly 85vw or 320px to guarantee no horizontal overflow */
                                className="relative w-[85vw] max-w-[320px] sm:max-w-none sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] snap-start flex-shrink-0 group perspective-1000"
                            >
                                {/* THE 5D GLOW (Mirrored Background Behind Card) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.taint} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 transform translate-y-4 scale-95 -z-10`} />

                                {/* MAIN CARD */}
                                <div className="relative h-[420px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 flex flex-col justify-end">
                                    
                                    {/* Mirrored Background Image with Taint */}
                                    <div className="absolute inset-0 w-full h-full bg-[#4B0163] z-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover opacity-40 mix-blend-luminosity group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        {/* Color Taint Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.taint} opacity-80 mix-blend-multiply`} />
                                        {/* Bottom Fade Gradient for text readability (Now Deep Purple instead of Gray/Black) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#4B0163] via-[#4B0163]/70 to-transparent" />
                                    </div>

                                    {/* Card Content (Frosted Glass Panel) */}
                                    <div className="relative z-10 p-6 sm:p-8 flex flex-col items-start w-full">
                                        
                                        {/* Floating Icon */}
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                                            <Icon className="w-7 h-7" />
                                        </div>

                                        {/* Text strictly wrapped */}
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight break-words whitespace-normal drop-shadow-md">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-white/80 text-sm leading-relaxed font-medium break-words whitespace-normal line-clamp-4">
                                            {item.description}
                                        </p>

                                        {/* Animated Bottom Line */}
                                        <div className="w-0 h-1 bg-[#BA25EB] mt-6 transition-all duration-500 group-hover:w-12 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Slider Controls */}
                <div className="flex sm:hidden justify-center gap-4 mt-2">
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
            </div>
        </section>
    );
}

// import React from 'react';
// import { Brain, TrendingUp, Cpu, Handshake, Palette, Rocket } from 'lucide-react';
// import Card from '../Card';

// const items = [
//     { icon: Brain, title: "We Think in Systems, Not Just Software", description: "Most solutions solve surface-level problems. We go deeper—analyzing the structure of your operations, identifying inefficiencies, how your entire organization works.", bgColor: "#8300AF" },
//     { icon: TrendingUp, title: "Business Outcomes Over Outputs", description: "We are not focused on delivering features or deliverables alone. Every solution we build is tied directly to measurable business outcomes such as efficiency, scalability, cost reduction, and performance improvement.", bgColor: "#8300AF" },
//     { icon: Cpu, title: "Engineering-Driven Excellence", description: "Our approach is rooted in strong engineering principles. We design systems that are scalable, secure, and built to withstand real-world operational complexity.", bgColor: "#8300AF" },
//     { icon: Handshake, title: "Strategic Partnership Approach", description: "We work closely with organizations as long-term partners, not short-term vendors. Our goal is to understand your business deeply and align technology with your strategic direction.", bgColor: "#8300AF" },
//     { icon: Palette, title: "Design That Serves Function", description: "Our design philosophy prioritizes clarity, usability, and purpose. Every interface is crafted to support decision-making and simplify complex workflows.", bgColor: "#8300AF" },
//     { icon: Rocket, title: "Built for Growth and Adaptability", description: "We build systems that evolve with your business. As your organization grows, your technology infrastructure remains stable, flexible, and future-ready.", bgColor: "#8300AF" },
// ];

// export default function WhyChooseUs() {
//     return (
//         <section className="w-full bg-white py-4 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-6 text-center">
//                     Why <span className="text-appBanner">Choose Us</span>
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//                     {items.map((item, index) => (
//                         <div key={index} className="transition-shadow duration-300 hover:shadow-2xl rounded-3xl h-full">
//                             <Card
//                                 icon={item.icon}
//                                 title={item.title}
//                                 description={item.description}
//                                 readMoreHref="#"
//                                 bgColor={item.bgColor}
//                                 className="h-full"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }