"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Code, Brain, GraduationCap, Lightbulb, Palette, Cloud } from 'lucide-react';
import Card from '@/app/components/dusacomponent/Card';

const cards = [
    { icon: Code, title: "Software Engineering", description: "Build secure, scalable, enterprise grade applications.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Brain, title: "Artificial Intelligence & Data", description: "Transform data into actionable intelligence.", readMoreHref: "/services", bgColor: "#6B21A8" },
    { icon: GraduationCap, title: "Technology Education", description: "Developing the next generation of global technology talent.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Lightbulb, title: "Consulting & Digital Transformation", description: "Helping organizations modernize operations through technology.", readMoreHref: "/services", bgColor: "#6B21A8" },
    { icon: Palette, title: "UI/UX Design & Product Strategy", description: "Digital experiences that transform complex ideas into seamless products.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Cloud, title: "Cloud, DevOps & Infrastructure", description: "Scalable Infrastructure for Modern Businesses.", readMoreHref: "/services", bgColor: "#6B21A8" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            type: "spring" as const, 
            stiffness: 100, 
            damping: 15 
        } 
    }
};

export default function WhatWeDo() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    // Auto-scroll logic for mobile devices
    useEffect(() => {
        const interval = setInterval(() => {
            // Only auto-scroll if it's a mobile/tablet screen AND the user isn't currently touching it
            if (!isInteracting && scrollRef.current && window.innerWidth < 1024) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                
                // If we reach the end of the scroll, loop smoothly back to the start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll right by approximately one card width (85vw)
                    scrollRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
                }
            }
        }, 4000); // Triggers every 4 seconds

        return () => clearInterval(interval);
    }, [isInteracting]);

    return (
        <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Inline CSS to hide the ugly native scrollbar on mobile while keeping the scroll functionality */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor mb-4 tracking-wide">
                        What <span className="text-appBanner">We Do</span>
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Delivering comprehensive technology solutions designed to scale your operations and drive innovation.
                    </p>
                </div>

                {/* Responsive Wrapper:
                    Mobile: Uses 'flex overflow-x-auto' to create a horizontal scroll track.
                    Desktop: Switches back to 'lg:grid lg:grid-cols-3' for a standard layout.
                */}
                <motion.div 
                    ref={scrollRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    onMouseEnter={() => setIsInteracting(true)}
                    onMouseLeave={() => setIsInteracting(false)}
                    onTouchStart={() => setIsInteracting(true)}
                    onTouchEnd={() => setIsInteracting(false)}
                    className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar pb-8 lg:pb-0 items-stretch"
                    style={{ perspective: '1200px' }} 
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ 
                                scale: 1.03, 
                                rotateY: 8,
                                rotateX: -4,
                                z: 20,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            /* FIX: Changed min-w to strict w- bounds and added flex-col */
                            className="relative group h-full rounded-2xl w-[85vw] sm:w-[340px] lg:w-full shrink-0 snap-center flex flex-col"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute inset-0 w-full h-full rounded-2xl bg-appLightPurple overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl shadow-appPurple/20">
                                <div 
                                    className="absolute inset-0 mix-blend-multiply opacity-40 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('https://plain-weur-prod-public.komododecks.com/202606/10/v9WarDYk2cqwh3FiRlF0/image.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        transform: 'scaleX(-1)' 
                                    }}
                                />
                            </div>

                            {/* FIX: Added whitespace-normal and break-words to force wrapping */}
                            <div className="relative z-10 h-full w-full transform-gpu block whitespace-normal break-words" style={{ transform: "translateZ(30px)" }}>
                                <Card
                                    icon={card.icon}
                                    title={card.title}
                                    description={card.description}
                                    readMoreHref={card.readMoreHref}
                                    bgColor={card.bgColor}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}