"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/lib/utils/store';
import logodusa from '@/public/images/dusacoreimages/logodusa.png';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GetInTouchModal from './GetInTouchModal';

// ==========================================
// MAIN HEADER COMPONENT
// ==========================================
interface Header2Props {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
}

const Header2: React.FC<Header2Props> = ({ onLoginClick, onRegisterClick }) => {
    useEffect(() => {
        useUserStore.persist.rehydrate();
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

    // Navigation Items Array
    let navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/aboutus' },
        { name: 'Services', href: '/services' },
        { name: 'Products', href: '/products' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' }
    ];

    // Dynamically insert Academy into the list if it's currently open/active
    if (isAcademyOpen) {
        // Inserts Academy after "Products"
        navItems.splice(8, 0, { name: 'Academy', href: '/academy', isHighlight: true } as any);
    }

    return (
        <>
            <header className="w-full h-16 sm:h-20 bg-white/95 backdrop-blur-md flex flex-row items-center justify-between px-3 sm:px-6 md:px-12 shadow-sm sticky top-0 z-[100] transition-all">
                {/* Logo Section */}
                <div className="flex items-center shrink-0">
                    <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
                        <Image
                            src={logodusa}
                            alt="DUSA Logo"
                            width={160}
                            height={160}
                            className="w-16 sm:w-20 md:w-28 lg:w-32 h-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden lg:flex items-center">
                    <ul className="flex flex-row items-center gap-4 xl:gap-8">
                        {navItems.map((item: any) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`font-aeonik font-bold transition-all duration-200 text-xs xl:text-sm tracking-wide relative group flex items-center gap-1.5 ${
                                        item.isHighlight ? 'text-[#BA25EB]' : 'text-appNav hover:text-appPurple'
                                    }`}
                                >
                                    {item.name}
                                    
                                    {/* Pulsing Dot for highlighted items like Academy */}
                                    {item.isHighlight && (
                                        <span className="relative flex h-2 w-2 mb-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BA25EB] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BA25EB]"></span>
                                        </span>
                                    )}

                                    {/* Bottom Underline Hover Effect */}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                        item.isHighlight ? 'bg-[#BA25EB]' : 'bg-appNav'
                                    }`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={() => setIsGetInTouchOpen(true)}
                        className="bg-appTitleBgColor text-white px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs md:text-sm shadow-md hover:bg-appNav hover:shadow-lg transition-all duration-300 transform active:scale-95 whitespace-nowrap"
                    >
                        Get In touch
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex items-center ml-1 sm:ml-3">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-gray-800 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown Menu */}
            {mobileOpen && (
                <div className="lg:hidden fixed left-0 right-0 top-16 sm:top-20 bg-white border-t border-gray-100 shadow-lg z-50 px-4 sm:px-6 py-2">
                    <nav>
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item: any) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block font-aeonik font-bold transition-all duration-200 text-sm tracking-wide px-4 py-2.5 rounded-lg flex justify-between items-center ${
                                            item.isHighlight 
                                            ? 'text-[#BA25EB] bg-purple-50 hover:bg-purple-100' 
                                            : 'text-appNav hover:text-white hover:bg-appPurple'
                                        }`}
                                    >
                                        {item.name}
                                        {item.isHighlight && (
                                            <span className="text-[9px] font-black uppercase tracking-wider bg-[#BA25EB] text-white px-2 py-0.5 rounded-full">Open</span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => { setMobileOpen(false); setIsGetInTouchOpen(true); }}
                            className="w-full bg-appTitleBgColor text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-appNav transition-all duration-300"
                        >
                            Get In touch
                        </button>
                    </div>
                </div>
            )}

            {/* Mount Modal Fluidly */}
            <AnimatePresence>
                {isGetInTouchOpen && <GetInTouchModal onClose={() => setIsGetInTouchOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Header2;