"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/lib/utils/store';

interface Header2Props {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
}

const Header2: React.FC<Header2Props> = ({ onLoginClick, onRegisterClick }) => {
    useEffect(() => {
        useUserStore.persist.rehydrate();
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/aboutus' },
        { name: 'Product', href: '/product' },
        { name: 'Services', href: '/services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Our Team', href: '/our-team' },
        { name: 'Faq', href: '/faq' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <header className="w-full h-20 bg-white/95 backdrop-blur-md flex flex-row items-center justify-between px-6 md:px-12 shadow-sm sticky top-0 z-[100] transition-all">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
                    <Image
                        src="https://plain-weur-prod-public.komododecks.com/202606/10/v9WarDYk2cqwh3FiRlF0/image.jpg"
                        alt="DUSA Logo"
                        width={160}
                        height={160}
                        className="w-32 md:w-160 h-[160px] object-contain mix-blend-multiply"
                        priority
                    />
                </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center">
                <ul className="flex flex-row items-center gap-10">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="font-aeonik text-appNav hover:text-appLightPurple font-medium transition-all duration-200 text-sm tracking-wide relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-appNav transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 md:gap-5">
                {/* <button 
                    onClick={onLoginClick}
                    className="text-gray-700 font-bold text-sm md:text-base hover:text-appNav transition-colors px-4 py-2"
                >
                    Sign In
                </button> */}

                <button
                    onClick={onRegisterClick}
                    className="bg-appTitleBgColor text-white px-6 py-2.5 rounded-full font-bold text-sm md:text-base shadow-md hover:bg-appNav hover:shadow-lg transition-all duration-300 transform active:scale-95"
                >
                    Get In touch
                </button>
            </div>

            {/* Mobile Menu Icon (Visual Only for now) */}
            <div className="lg:hidden flex items-center ml-4">
                <button className="text-gray-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header2;