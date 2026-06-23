"use client";
import React from 'react';

// A generic placeholder logo. You can replace this with your actual <Image /> or icon later!
const PlaceholderLogo = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PartnersMarquee = () => {
    // The list of partners you provided
    const partners = [
        "Healthcare",
        "Financial Institute",
        "Government & Public Sector",
        "Logistics & Transportation",
        "Enterprises Organizations"
    ];

    // We duplicate the array so the marquee can loop seamlessly without empty spaces
    const marqueeItems = [...partners, ...partners];

    return (
        <section className="w-full bg-white py-16 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Inline CSS for the infinite marquee animation */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    /* We translate exactly 50% because the array is duplicated */
                    100% { transform: translateX(-50%); } 
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 25s linear infinite;
                }
                /* Optional: Pauses the scroll when the user hovers over it */
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* =========================================
                TOP DIV: Heading
            ========================================= */}
            <div className="mb-16 px-6 text-center">
                <h2 className="text-montserrat text-appBlack font-light text-sm md:text-[20px] tracking-wide">
                    Partnering with Global Institutions and Ambitious Founders
                </h2>
            </div>

            {/* =========================================
                BOTTOM DIV: Automatic Scrolling Tray
            ========================================= */}
            <div className="w-full relative flex overflow-hidden py-4">
                
                {/* Optional: White fading gradients on the left and right edges for a polished look */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                {/* The animated track */}
                <div className="animate-marquee flex flex-row items-center gap-12 md:gap-20 px-6">
                    {marqueeItems.map((item, index) => (
                        <div key={index} className="flex flex-row items-center gap-4 whitespace-nowrap">
                            
                            {/* Logo Side */}
                            <div className="text-appPurple">
                                <PlaceholderLogo />
                            </div>
                            
                            {/* Name Side */}
                            <span className="text-appBlack font-semibold text-[18px] md:text-[18px]">
                                {item}
                            </span>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default PartnersMarquee;