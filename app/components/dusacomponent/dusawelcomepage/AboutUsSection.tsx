"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Cpu, Network, ShieldCheck, Gauge } from 'lucide-react';
import aboutImg from '@/public/images/dusacoreimages/dusacoreabout.jpg';

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 20 }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotateY: -10 },
    show: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 }
    }
};

export default function AboutUsSection() {
    return (
        <section className="w-full bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gray-100">
            {/* Deep Background Aura */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#4B0163] opacity-[0.03] blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2 -translate-x-1/3" />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10"
            >
                
                {/* =========================================
                    LEFT SIDE: Content & Text
                ========================================= */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                    <motion.div variants={itemVariants}>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8300AF] bg-purple-50 border border-purple-100 px-5 py-2 rounded-full inline-flex items-center justify-center gap-2 mb-6">
                            <Cpu className="w-4 h-4" /> About DUSA CORE
                        </span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mb-6 tracking-tight leading-tight">
                            Technology that empowers your ambition.
                        </h2>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6 mb-8 text-gray-600 text-base sm:text-lg leading-relaxed font-medium text-left">
                        <p>
                            At DUSA CORE, we design intelligent architectures that connect people, processes, and technology to unlock lasting value.
                        </p>
                        
                        {/* CMMI Maturity Focus */}
                        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
                            <div className="bg-[#4B0163] p-2 rounded-lg mt-1 shrink-0">
                                <Gauge className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#4B0163] text-sm uppercase tracking-wider">CMMI-Driven Maturity</h4>
                                <p className="text-sm mt-1 text-gray-700">
                                    Our software engineering lifecycle is built on CMMI Level 3 maturity standards. We don't just write code; we cultivate predictable, high-quality, and scalable processes that ensure your mission-critical systems never compromise on performance.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link 
                            href="/aboutus"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#4B0163] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-appNav transition-all duration-300 active:scale-95 group"
                        >
                            Read Our Full Story
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* =========================================
                    RIGHT SIDE: 5D Immersive Image
                ========================================= */}
                <motion.div 
                    variants={imageVariants}
                    className="w-full lg:w-1/2 relative perspective-1000 mt-10 lg:mt-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4B0163] to-[#BA25EB] rounded-[2.5rem] blur-2xl opacity-30 transform translate-y-4 scale-95" />

                    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
                        
                        <Image 
                            src={aboutImg} 
                            alt="About DUSA CORE Engineering"
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4B0163]/20 mix-blend-multiply pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent pointer-events-none" />

                        {/* Updated Floating Frost Card */}
                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-white text-lg tracking-wide mb-1">CMMI Level 3 Certified</h4>
                                    <p className="text-white/80 text-sm font-medium leading-snug">
                                        Engineering predictable, high-maturity digital solutions for enterprise.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center border border-gray-50 hidden sm:flex animate-bounce-slow">
                        <Network className="w-8 h-8 text-[#BA25EB]" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, Variants } from 'framer-motion';
// import { ArrowUpRight, Cpu, Network, ShieldCheck } from 'lucide-react';
// import aboutImg from '@/public/images/dusacoreimages/dusacoreabout.jpg';

// // --- ANIMATION VARIANTS ---
// const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     show: {
//         opacity: 1,
//         transition: { staggerChildren: 0.2, delayChildren: 0.1 }
//     }
// };

// const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     show: {
//         opacity: 1,
//         y: 0,
//         transition: { type: "spring", stiffness: 150, damping: 20 }
//     }
// };

// const imageVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.95, rotateY: -10 },
//     show: {
//         opacity: 1,
//         scale: 1,
//         rotateY: 0,
//         transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 }
//     }
// };

// export default function AboutUsSection() {
//     return (
//         <section className="w-full bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gray-100">
//             {/* Deep Background Aura */}
//             <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#4B0163] opacity-[0.03] blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2 -translate-x-1/3" />
            
//             <motion.div 
//                 variants={containerVariants}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, margin: "-100px" }}
//                 className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10"
//             >
                
//                 {/* =========================================
//                     LEFT SIDE: Content & Text
//                 ========================================= */}
//                 <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
//                     <motion.div variants={itemVariants}>
//                         <span className="text-xs font-bold uppercase tracking-widest text-[#8300AF] bg-purple-50 border border-purple-100 px-5 py-2 rounded-full inline-flex items-center justify-center gap-2 mb-6">
//                             <Cpu className="w-4 h-4" /> Who We Are
//                         </span>
//                     </motion.div>

//                     <motion.div variants={itemVariants}>
//                         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mb-6 tracking-tight leading-tight break-words whitespace-normal">
//                             Technology that doesn't just support business— <br className="hidden xl:block" />
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4B0163] via-[#8300AF] to-[#BA25EB]">it empowers it.</span>
//                         </h2>
//                     </motion.div>

//                     <motion.div variants={itemVariants} className="space-y-5 mb-8 text-gray-600 text-base sm:text-lg leading-relaxed break-words whitespace-normal font-medium text-left">
//                         <p>
//                             At DUSA CORE, we focus on creating intelligent systems that connect people, processes, and technology to unlock new possibilities and lasting value.
//                         </p>
//                         <p>
//                             We specialize in designing, engineering, and optimizing digital architectures that improve operational efficiency, enhance decision-making, and create measurable business value. By combining strategic thinking, engineering excellence, and user-centered design, we deliver solutions that enable organizations to adapt, scale, and thrive.
//                         </p>
//                     </motion.div>

//                     <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
//                         <Link 
//                             href="/aboutus"
//                             className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#4B0163] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-appNav transition-all duration-300 active:scale-95 group"
//                         >
//                             Read Our Full Story
//                             <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//                         </Link>
//                     </motion.div>
//                 </div>

//                 {/* =========================================
//                     RIGHT SIDE: 5D Immersive Image
//                 ========================================= */}
//                 <motion.div 
//                     variants={imageVariants}
//                     className="w-full lg:w-1/2 relative perspective-1000 mt-10 lg:mt-0"
//                 >
//                     {/* The glowing shadow behind the image */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-[#4B0163] to-[#BA25EB] rounded-[2.5rem] blur-2xl opacity-30 transform translate-y-4 scale-95" />

//                     {/* Main Image Container */}
//                     <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
                        
//                         <Image 
//                             src={aboutImg} 
//                             alt="About DUSA CORE Engineering"
//                             fill
//                             className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         />
                        
//                         {/* Gradient Overlays for depth */}
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#4B0163]/20 mix-blend-multiply pointer-events-none" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent pointer-events-none" />

//                         {/* Floating "Engineering Excellence" Frost Card */}
//                         <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                             <div className="flex items-start gap-4">
//                                 <div className="w-12 h-12 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
//                                     <ShieldCheck className="w-6 h-6 text-white" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-extrabold text-white text-lg tracking-wide mb-1">Engineering Excellence</h4>
//                                     <p className="text-white/80 text-sm font-medium leading-snug">
//                                         Architecting systems for a modern digital economy.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                     {/* Floating Decorative Icon Top Right */}
//                     <div className="absolute -top-6 -right-6 w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center border border-gray-50 hidden sm:flex animate-bounce-slow">
//                         <Network className="w-8 h-8 text-[#BA25EB]" />
//                     </div>
//                 </motion.div>

//             </motion.div>
//         </section>
//     );
// }

// // import React from 'react';
// // import aboutImg from '@/public/images/dusacoreimages/dusacoreabout.jpg';
// // import ImageTextSection from './ImageTextSection';

// // export default function AboutUsSection() {
// //     return (
// //         <ImageTextSection
// //             image={aboutImg}
// //             title="About Us"
// //             description="At DUSA CORE, we believe technology should do more than support a business—it should empower it. That is why we focus on creating intelligent systems that connect people, processes, and technology to unlock new possibilities and lasting value. We specialize in designing, engineering, and optimizing digital systems that improve operational efficiency, enhance decision-making, and create measurable business value. By combining strategic thinking, engineering excellence, and user-centered design, we deliver solutions that enable organizations to adapt, scale, and thrive in an increasingly digital world."
// //             imageAlt="About DUSA CORE"
// //             imageOnLeft={false}
// //             buttonText="Read More"
// //             textLeft={true}
// //         />
// //     );
// // }
