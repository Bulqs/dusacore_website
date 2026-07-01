"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/lib/utils/store';
import logodusa from '@/public/images/dusacoreimages/logodusa.png';
import { X, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- YOUR WHATSAPP BUSINESS NUMBER ---
const WHATSAPP_NUMBER = "23489044698791"; 

// --- ANIMATION VARIANTS ---
const modalBackdrop: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
};

const modalContent: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
};

// ==========================================
// GET IN TOUCH MODAL
// ==========================================
const GetInTouchModal = ({ onClose }: { onClose: () => void }) => {
    const [payload, setPayload] = useState({ name: '', email: '', interest: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const encodedMessage = encodeURIComponent(
            `Hello DUSA CORE!\n\n` +
            `*Name:* ${payload.name}\n` +
            `*Email:* ${payload.email}\n` +
            `*Area of Interest:* ${payload.interest || 'Not specified'}\n\n` +
            `*Message:*\n${payload.message}`
        );

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 relative overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full transition-colors z-10">
                    <X size={20} />
                </button>

                {isSuccess ? (
                    <div className="flex flex-col items-center text-center py-6 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Redirecting to WhatsApp!</h3>
                        <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">You can now chat directly with our engineering team.</p>
                        <button onClick={onClose} className="w-full bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors">Close</button>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-purple-50 text-[#4B0163] rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-appBlack mb-2">Let's Connect</h3>
                        <p className="text-sm text-gray-500 font-medium mb-6">Tell us a bit about yourself and how we can help your organization.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Your Name *</label>
                                <input required type="text" onChange={e => setPayload({...payload, name: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all" placeholder="John Doe" />
                            </div>
                            
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                                <input required type="email" onChange={e => setPayload({...payload, email: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all" placeholder="your@company.com" />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Area of Interest</label>
                                <select required onChange={e => setPayload({...payload, interest: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select an option...</option>
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="AI & Data Infrastructure">AI & Data Infrastructure</option>
                                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                                    <option value="Product Design">UI/UX & Product Design</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Message *</label>
                                <textarea required onChange={e => setPayload({...payload, message: e.target.value})} rows={3} className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] resize-none transition-all" placeholder="Briefly describe your project..."></textarea>
                            </div>

                            <button disabled={isSubmitting} type="submit" className="w-full bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-2 active:scale-[0.98]">
                                {isSubmitting ? 'Opening WhatsApp...' : 'Start Chat'}
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

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
    const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false); // Modal State

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/aboutus' },
        { name: 'Services', href: '/services' },
        { name: 'Products', href: '/products' },
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
                            onClick={() => { setMobileOpen(false); setIsGetInTouchOpen(true); }}
                            className="w-full bg-appTitleBgColor text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-appNav transition-all duration-300"
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

// "use client";
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useUserStore } from '@/lib/utils/store';
// import logodusa from '@/public/images/dusacoreimages/logodusa.png';
// import { X } from 'lucide-react';

// interface Header2Props {
//     onLoginClick?: () => void;
//     onRegisterClick?: () => void;
// }

// const Header2: React.FC<Header2Props> = ({ onLoginClick, onRegisterClick }) => {
//     useEffect(() => {
//         useUserStore.persist.rehydrate();
//     }, []);

//     const [mobileOpen, setMobileOpen] = useState(false);

//     const navItems = [
//         { name: 'Home', href: '/' },
//         { name: 'About', href: '/aboutus' },
//         // { name: 'Product', href: '/product' },
//         // { name: 'Services', href: '/services' },
//         { name: 'Case Studies', href: '/case-studies' },
//         { name: 'Our Team', href: '/our-team' },
//         { name: 'FAQ', href: '/faq' },
//         { name: 'Contact', href: '/contact' }
//     ];

//     return (
//         <>
//             <header className="w-full h-16 sm:h-20 bg-white/95 backdrop-blur-md flex flex-row items-center justify-between px-3 sm:px-6 md:px-12 shadow-sm sticky top-0 z-[100] transition-all">
//                 {/* Logo Section */}
//                 <div className="flex items-center shrink-0">
//                     <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
//                         <Image
//                             src={logodusa}
//                             alt="DUSA Logo"
//                             width={160}
//                             height={160}
//                             className="w-16 sm:w-20 md:w-28 lg:w-32 h-auto object-contain"
//                             priority
//                         />
//                     </Link>
//                 </div>

//                 {/* Navigation Menu */}
//                 <nav className="hidden lg:flex items-center">
//                     <ul className="flex flex-row items-center gap-5 xl:gap-10">
//                         {navItems.map((item) => (
//                             <li key={item.name}>
//                                 <Link
//                                     href={item.href}
//                                     className="font-aeonik text-appNav hover:text-appPurple font-bold transition-all duration-200 text-xs xl:text-sm tracking-wide relative group"
//                                 >
//                                     {item.name}
//                                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-appNav transition-all duration-300 group-hover:w-full"></span>
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* Auth Buttons */}
//                 <div className="hidden lg:flex items-center gap-3">
//                     <button
//                         onClick={onRegisterClick}
//                         className="bg-appTitleBgColor text-white px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-bold text-[11px] sm:text-xs md:text-sm shadow-md hover:bg-appNav hover:shadow-lg transition-all duration-300 transform active:scale-95 whitespace-nowrap"
//                     >
//                         Get In touch
//                     </button>
//                 </div>

//                 {/* Mobile Menu Icon */}
//                 <div className="lg:hidden flex items-center ml-1 sm:ml-3">
//                     <button
//                         onClick={() => setMobileOpen(!mobileOpen)}
//                         className="text-gray-800 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                         aria-label="Toggle menu"
//                     >
//                         {mobileOpen ? (
//                             <X className="w-5 h-5 sm:w-6 sm:h-6" />
//                         ) : (
//                             <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                             </svg>
//                         )}
//                     </button>
//                 </div>
//             </header>

//             {/* Mobile Dropdown Menu */}
//             {mobileOpen && (
//                 <div className="lg:hidden fixed left-0 right-0 top-16 sm:top-20 bg-white border-t border-gray-100 shadow-lg z-50 px-4 sm:px-6 py-2">
//                     <nav>
//                         <ul className="flex flex-col">
//                             {navItems.map((item) => (
//                                 <li key={item.name}>
//                                     <Link
//                                         href={item.href}
//                                         onClick={() => setMobileOpen(false)}
//                                         className="block font-aeonik text-appNav hover:text-white hover:bg-appPurple font-bold transition-all duration-200 text-sm tracking-wide px-4 py-1.5 rounded-lg"
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>
//                     <div className="mt-2 pt-2 border-t border-gray-100">
//                         <button
//                             onClick={() => { setMobileOpen(false); onRegisterClick?.(); }}
//                             className="w-full bg-appTitleBgColor text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-appNav transition-all duration-300"
//                         >
//                             Get In touch
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Header2;