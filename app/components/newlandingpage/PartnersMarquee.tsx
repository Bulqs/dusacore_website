"use client";
import React from 'react';

// =========================================
// DISTINCT INDUSTRY ICONS
// =========================================
const HealthcareIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const FinanceIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const GovernmentIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 22 7 12 2"></polygon>
        <polyline points="2 17 2 22 22 22 22 17"></polyline>
        <polyline points="6 12 6 17"></polyline>
        <polyline points="10 12 10 17"></polyline>
        <polyline points="14 12 14 17"></polyline>
        <polyline points="18 12 18 17"></polyline>
    </svg>
);

const LogisticsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
);

const EnterpriseIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);


const PartnersMarquee = () => {
    // We transform the array of strings into an array of objects
    // mapping each specific name to its unique SVG component.
    const partners = [
        { name: "Healthcare", icon: <HealthcareIcon /> },
        { name: "Financial Institute", icon: <FinanceIcon /> },
        { name: "Government & Public Sector", icon: <GovernmentIcon /> },
        { name: "Logistics & Transportation", icon: <LogisticsIcon /> },
        { name: "Enterprises Organizations", icon: <EnterpriseIcon /> }
    ];

    // We duplicate the array so the marquee can loop seamlessly
    const marqueeItems = [...partners, ...partners];

    return (
        <section className="w-full bg-white space-y-8 py-4 sm:py-8 lg:py-16 flex flex-col items-center justify-center overflow-hidden">
            
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); } 
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* =========================================
                TOP DIV: Heading
            ========================================= */}
            <div className="px-6 text-center">
                <h2 className="text-montserrat text-appBlack font-light text-sm md:text-[20px] tracking-wide">
                    Partnering with Global Institutions and Ambitious Founders
                </h2>
            </div>

            {/* =========================================
                BOTTOM DIV: Automatic Scrolling Tray
            ========================================= */}
            <div className="w-full relative flex overflow-hidden">
                
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="animate-marquee flex flex-row items-center gap-12 md:gap-20 px-6">
                    {marqueeItems.map((item, index) => (
                        <div key={index} className="flex flex-row items-center gap-4 whitespace-nowrap">
                            
                            {/* Render the specific icon for this item */}
                            <div className="text-appPurple">
                                {item.icon}
                            </div>
                            
                            {/* Render the specific name for this item */}
                            <span className="text-appBlack font-semibold text-[18px] md:text-[18px]">
                                {item.name}
                            </span>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default PartnersMarquee;