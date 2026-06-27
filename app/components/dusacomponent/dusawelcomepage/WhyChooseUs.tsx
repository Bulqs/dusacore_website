"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Brain, TrendingUp, Cpu, Handshake, Palette, Rocket } from 'lucide-react';
import Card from '../Card';

const items = [
    { icon: Brain, title: "We Think in Systems, Not Just Software", description: "Most solutions solve surface-level problems. We go deeper—analyzing the structure of your operations, identifying inefficiencies, how your entire organization works.", bgColor: "#8300AF" },
    { icon: TrendingUp, title: "Business Outcomes Over Outputs", description: "We are not focused on delivering features or deliverables alone. Every solution we build is tied directly to measurable business outcomes such as efficiency, scalability, cost reduction, and performance improvement.", bgColor: "#8300AF" },
    { icon: Cpu, title: "Engineering-Driven Excellence", description: "Our approach is rooted in strong engineering principles. We design systems that are scalable, secure, and built to withstand real-world operational complexity.", bgColor: "#8300AF" },
    { icon: Handshake, title: "Strategic Partnership Approach", description: "We work closely with organizations as long-term partners, not short-term vendors. Our goal is to understand your business deeply and align technology with your strategic direction.", bgColor: "#8300AF" },
    { icon: Palette, title: "Design That Serves Function", description: "Our design philosophy prioritizes clarity, usability, and purpose. Every interface is crafted to support decision-making and simplify complex workflows.", bgColor: "#8300AF" },
    { icon: Rocket, title: "Built for Growth and Adaptability", description: "We build systems that evolve with your business. As your organization grows, your technology infrastructure remains stable, flexible, and future-ready.", bgColor: "#8300AF" },
];

// --- PHYSICS VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { 
            type: "spring" as const, 
            stiffness: 260,         
            damping: 20,            
            mass: 1                 
        }
    }
};

export default function WhyChooseUs() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    // Auto-scroll logic strictly for mobile/tablet devices
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isInteracting && scrollRef.current && window.innerWidth < 1024) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
                }
            }
        }, 4000); 

        return () => clearInterval(interval);
    }, [isInteracting]);

    return (
        <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Hides native scrollbar while retaining functionality */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center tracking-wide">
                    Why <span className="text-appBanner">Choose Us</span>
                </h2>

                <motion.div 
                    ref={scrollRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    onMouseEnter={() => setIsInteracting(true)}
                    onMouseLeave={() => setIsInteracting(false)}
                    onTouchStart={() => setIsInteracting(true)}
                    onTouchEnd={() => setIsInteracting(false)}
                    className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar pb-8 lg:pb-0 items-stretch"
                >
                    {items.map((item, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            whileHover={{ 
                                y: -10, 
                                transition: { type: "spring", stiffness: 400, damping: 10 } 
                            }}
                            /* FIX: Changed from min-w to strict w- bounds. 
                              This stops the card from inflating horizontally.
                            */
                            className="w-[85vw] sm:w-[340px] lg:w-full shrink-0 snap-center h-full flex flex-col"
                        >
                            {/* FIX: Added whitespace-normal and break-words to force wrapping 
                            */}
                            <div className="h-full w-full block whitespace-normal break-words">
                                <Card
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                    readMoreHref="#"
                                    bgColor={item.bgColor}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// "use client";
// import React from 'react';
// import { motion, Variants } from 'framer-motion';
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

// // --- PHYSICS VARIANTS ---
// // Using "as const" fixes the TypeScript type error
// const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     show: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.15,
//             delayChildren: 0.2
//         }
//     }
// };

// const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 50 },
//     show: {
//         opacity: 1,
//         y: 0,
//         transition: { 
//             type: "spring" as const, // Fixed TypeScript Error
//             stiffness: 260,         // Higher stiffness for a snappy, premium feel
//             damping: 20,            // Lower damping to keep it crisp
//             mass: 1                 // Balanced weight
//         }
//     }
// };

// export default function WhyChooseUs() {
//     return (
//         <section className="w-full bg-white py-4 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
//                     Why <span className="text-appBanner">Choose Us</span>
//                 </h2>

//                 <motion.div 
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true, margin: "-100px" }}
//                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//                 >
//                     {items.map((item, index) => (
//                         <motion.div 
//                             key={index} 
//                             variants={itemVariants}
//                             whileHover={{ 
//                                 y: -10, 
//                                 transition: { type: "spring", stiffness: 400, damping: 10 } 
//                             }}
//                         >
//                             <Card
//                                 icon={item.icon}
//                                 title={item.title}
//                                 description={item.description}
//                                 readMoreHref="#"
//                                 bgColor={item.bgColor}
//                             />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// }