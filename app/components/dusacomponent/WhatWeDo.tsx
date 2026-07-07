"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
    Code, Brain, GraduationCap, Lightbulb, Palette, Cloud, ArrowUpRight, Cpu 
} from 'lucide-react';

// --- 5D ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 20 }
    }
};

// --- DATA WITH 5D GRADIENTS ---
const servicesData = [
    { 
        icon: Code, 
        title: "Software Engineering", 
        description: "Build secure, scalable, enterprise-grade applications substituting legacy operations with modern infrastructure.", 
        readMoreHref: "/services?tab=software-engineering", 
        gradient: "from-[#4B0163] to-[#8300AF]",
        orbColor: "bg-[#4B0163]/10"
    },
    { 
        icon: Brain, 
        title: "Artificial Intelligence & Data", 
        description: "Transform raw data into actionable intelligence. Deploy custom deterministic models and advanced analytics pipelines.", 
        readMoreHref: "/services?tab=ai-optimization", 
        gradient: "from-[#8300AF] to-[#BA25EB]",
        orbColor: "bg-[#8300AF]/10"
    },
    { 
        icon: Cloud, 
        title: "Cloud, DevOps & Infrastructure", 
        description: "Design, deploy, and manage highly available cloud ecosystems with automated CI/CD delivery pipelines.", 
        readMoreHref: "/services?tab=cloud-devops", 
        gradient: "from-[#BA25EB] to-[#4B0163]",
        orbColor: "bg-[#BA25EB]/10"
    },
    { 
        icon: Lightbulb, 
        title: "Consulting & Transformation", 
        description: "Partner with elite engineering architects to draft migration strategies and drive digital modernization.", 
        readMoreHref: "/services?tab=consultation-services", 
        gradient: "from-[#4B0163] to-[#BA25EB]",
        orbColor: "bg-[#4B0163]/10"
    },
    { 
        icon: Palette, 
        title: "UI/UX Design & Product Strategy", 
        description: "Craft human-centric digital experiences and cohesive brand identities that translate complex logic into seamless interaction.", 
        readMoreHref: "/services?tab=product-design", 
        gradient: "from-[#8300AF] to-[#4B0163]",
        orbColor: "bg-[#8300AF]/10"
    },
    { 
        icon: GraduationCap, 
        title: "Technology Education", 
        description: "Empower your technical teams and standardize your business delivery via partnerships with global technology certifying bodies.", 
        readMoreHref: "/services?tab=certifications-partnerships", 
        gradient: "from-[#BA25EB] to-[#8300AF]",
        orbColor: "bg-[#BA25EB]/10"
    }
];

export default function WhatWeDo() {
    return (
        <section className="w-full bg-slate-50 py-16 sm:py-24 lg:py-32 px-0 sm:px-6 lg:px-8 border-t border-gray-100 overflow-hidden relative">
            
            {/* CSS to hide scrollbar for the mobile slider */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto px-4 sm:px-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4B0163] bg-purple-100 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4" /> Core Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor tracking-tight break-words whitespace-normal leading-tight">
                        Engineering solutions that <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B0163] to-[#BA25EB]">drive innovation.</span>
                    </h2>
                    <p className="text-gray-500 mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed break-words whitespace-normal">
                        Delivering comprehensive, enterprise-grade technology architectures designed to scale your operations and automate your most complex workflows.
                    </p>
                </div>

                {/* 5D Layout Container: 
                    - Mobile: flex row, overflow-x scroll, snap-x (Horizontal Slider)
                    - Desktop: CSS Grid, 3 columns 
                */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-8 sm:pb-0 px-4 sm:px-0"
                >
                    {servicesData.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div 
                                key={index} 
                                variants={cardVariants}
                                /* Mobile Width strictness to prevent screen breakage, stretches nicely on desktop */
                                className="relative group w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none shrink-0 snap-start flex flex-col h-auto perspective-1000"
                            >
                                {/* THE 5D GLOW (Invisible until hover, projects shadow onto the background) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform translate-y-3 scale-95 -z-10`} />

                                {/* MAIN CARD */}
                                <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden">
                                    
                                    {/* Top Right Decorative Glowing Orb */}
                                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${card.orbColor} group-hover:scale-[1.75] transition-transform duration-700 ease-in-out`} />

                                    {/* Icon Block */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-6 shadow-md shrink-0 relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 relative z-10 flex flex-col mb-6">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#4B0163] transition-colors break-words whitespace-normal leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed break-words whitespace-normal">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Bottom Action Link */}
                                    <div className="pt-5 border-t border-gray-100 mt-auto relative z-10">
                                        <Link 
                                            href={card.readMoreHref}
                                            className="inline-flex items-center justify-between w-full text-[#4B0163] font-bold text-sm sm:text-base hover:text-purple-900 transition-colors group/link"
                                        >
                                            <span className="break-words whitespace-normal">Explore Capability</span>
                                            <span className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center group-hover/link:bg-[#4B0163] group-hover/link:text-white transition-all duration-300">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </span>
                                        </Link>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}

// import React from 'react';
// import { Code, Brain, GraduationCap, Lightbulb, Palette, Cloud } from 'lucide-react';
// import Card from '@/app/components/dusacomponent/Card';

// const cards = [
//     { 
//         icon: Code, 
//         title: "Software Engineering", 
//         description: "Build secure, scalable, enterprise grade applications.", 
//         readMoreHref: "/services?tab=software-engineering", 
//         bgColor: "#4B0163" 
//     },
//     { 
//         icon: Brain, 
//         title: "Artificial Intelligence & Data", 
//         description: "Transform data into actionable intelligence.", 
//         readMoreHref: "/services?tab=ai-optimization", 
//         bgColor: "#6B21A8" 
//     },
//     { 
//         icon: GraduationCap, 
//         title: "Technology Education", 
//         description: "Developing the next generation of global technology talent.", 
//         readMoreHref: "/services?tab=certifications-partnerships", 
//         bgColor: "#4B0163" 
//     },
//     { 
//         icon: Lightbulb, 
//         title: "Consulting & Digital Transformation", 
//         description: "Helping organizations modernize operations through technology.", 
//         readMoreHref: "/services?tab=consultation-services", 
//         bgColor: "#6B21A8" 
//     },
//     { 
//         icon: Palette, 
//         title: "UI/UX Design & Product Strategy", 
//         description: "Digital experiences that transform complex ideas into seamless products.", 
//         readMoreHref: "/services?tab=product-design", 
//         bgColor: "#4B0163" 
//     },
//     { 
//         icon: Cloud, 
//         title: "Cloud, DevOps & Infrastructure", 
//         description: "Scalable Infrastructure for Modern Businesses.", 
//         readMoreHref: "/services?tab=cloud-devops", 
//         bgColor: "#6B21A8" 
//     },
// ];

// export default function WhatWeDo() {
//     return (
//         <section className="w-full bg-white py-12 sm:py-16 lg:pb-24 lg:pt-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto w-full">
//                 <div className="text-center mb-4 md:mb-8">
//                     <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor mb-2 tracking-wide">
//                         What We Do
//                     </h3>
//                     <p className="text-gray-900 max-w-2xl mx-auto text-base font-semibold md:text-lg">
//                         Delivering comprehensive technology solutions designed to scale your operations and drive innovation.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//                     {cards.map((card, index) => (
//                         <div key={index} className="transition-shadow duration-300 hover:shadow-2xl rounded-3xl h-full">
//                             <Card
//                                 icon={card.icon}
//                                 title={card.title}
//                                 description={card.description}
//                                 readMoreHref={card.readMoreHref}
//                                 bgColor={card.bgColor}
//                                 className="h-full"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }