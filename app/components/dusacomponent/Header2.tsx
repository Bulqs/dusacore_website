"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/lib/utils/store';
import logodusa from '@/public/images/dusacoreimages/logodusa.png';
import { X } from 'lucide-react';

interface Header2Props {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
}

const Header2: React.FC<Header2Props> = ({ onLoginClick, onRegisterClick }) => {
    useEffect(() => {
        useUserStore.persist.rehydrate();
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/aboutus' },
        // { name: 'Product', href: '/product' },
        // { name: 'Services', href: '/services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' }
    ];

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
                    <ul className="flex flex-row items-center gap-5 xl:gap-10">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="font-aeonik text-appNav hover:text-appPurple font-bold transition-all duration-200 text-xs xl:text-sm tracking-wide relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-appNav transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={onRegisterClick}
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
                        <ul className="flex flex-col">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block font-aeonik text-appNav hover:text-white hover:bg-appPurple font-bold transition-all duration-200 text-sm tracking-wide px-4 py-1.5 rounded-lg"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                            onClick={() => { setMobileOpen(false); onRegisterClick?.(); }}
                            className="w-full bg-appTitleBgColor text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-appNav transition-all duration-300"
                        >
                            Get In touch
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header2;