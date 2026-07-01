"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import caseImg from '@/public/images/dusacoreimages/communication.jpg';

const caseStudies = [
    {
        title: "BULQ E-Commerce",
        description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
        image: caseImg,
    },
    {
        title: "BULQ Logistics",
        description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
        image: caseImg,
    },
    {
        title: "DUSA CORE",
        description: "At DUSA CORE, we engineer systems that help organizations operate, compete, and scale in a modern digital economy.",
        image: caseImg,
    },
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
        <section className="w-full bg-white py-4 sm:py-8 lg:pb-16 lg:pt-4 px-4 sm:px-6 lg:px-8">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
                Our <span className="text-appBanner">Case Studies</span>
            </h2>
            <div className="max-w-7xl mx-auto relative">
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {caseStudies.map((item, index) => (
                        <div
                            key={index}
                            className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] max-w-[300px] snap-start flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col gap-3 bg-appNav">
                                <h6 className="text-white font-bold text-base uppercase tracking-wide">
                                    {item.title}
                                </h6>
                                <p className="text-white text-sm leading-relaxed font-semibold">
                                    {item.description}
                                </p>
                                <button className="mt-2 self-start bg-appPurple text-white px-5 py-2 rounded-full text-sm font-bold border border-transparent hover:bg-appNav hover:shadow-lg hover:border-white transition-all">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-appTitleBgColor hover:bg-appLightPurple hover:text-white transition-colors z-10"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-appTitleBgColor hover:bg-appLightPurple hover:text-white transition-colors z-10"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
}
