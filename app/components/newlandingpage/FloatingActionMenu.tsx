'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    FiX, FiStar, 
    FiCalendar, FiBriefcase, FiGrid
} from 'react-icons/fi';
import ConsultationModal from '../dusacomponent/dusawelcomepage/ConsultationModal';

const floatingMenuVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { opacity: 0, y: 20, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};

const floatingBtnVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 15 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
};

// ==========================================
// 2. MAIN FLOATING MENU COMPONENT
// ==========================================
type ActiveModalType = 'consultation' | null;

export default function FloatingActionMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
    const [showGuideTooltip, setShowGuideTooltip] = useState(true);

    useEffect(() => {
        if (isMenuOpen) setShowGuideTooltip(false);
        const timer = setTimeout(() => setShowGuideTooltip(false), 8000);
        return () => clearTimeout(timer);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const openModal = (type: ActiveModalType) => {
        setActiveModal(type);
        setIsMenuOpen(false); 
    };

    return (
        <>
            {/* The Floating Menu Area */}
            <div className="fixed bottom-10 right-8 z-50 flex flex-col items-end gap-4">
                
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            variants={floatingMenuVariants} 
                            initial="hidden" 
                            animate="show" 
                            exit="exit" 
                            className="flex flex-col items-end gap-4 mb-2"
                        >
                            {/* Action 1: Book Consultation (Google Calendar) */}
                            <motion.button 
                                variants={floatingBtnVariants}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openModal('consultation')}
                                className="flex items-center gap-3 group"
                            >
                                <span className="bg-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-appBlack shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Book Consultation
                                </span>
                                <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#4B0163]">
                                    <FiCalendar size={24} />
                                </div>
                            </motion.button>

                            {/* Action 2: View Services / Quick Link Redirects to About */}
                            <motion.a 
                                href="/aboutus" 
                                variants={floatingBtnVariants}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 group"
                            >
                                <span className="bg-gradient-to-r from-[#4B0163] to-[#8300AF] text-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <FiStar className="fill-white" /> Explore Services
                                </span>
                                <div className="w-14 h-14 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-full shadow-lg border border-white/20 flex items-center justify-center text-white">
                                    <FiBriefcase size={22} />
                                </div>
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Primary Toggle Button & Tooltip Wrapper */}
                <div className="relative flex items-center">
                    <AnimatePresence>
                        {showGuideTooltip && !isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                className="absolute right-20 bg-white text-appBlack px-4 py-2.5 rounded-2xl shadow-xl border border-gray-200 text-sm font-extrabold whitespace-nowrap flex items-center gap-3 origin-right"
                            >
                                <motion.span 
                                    animate={{ rotate: [0, 20, -20, 0] }} 
                                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                                    className="text-lg inline-block origin-bottom-right"
                                >
                                    👋
                                </motion.span>
                                Let's build something meaningful!
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setShowGuideTooltip(false); }}
                                    className="ml-1 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-1 transition-colors"
                                >
                                    <FiX size={14} />
                                </button>
                                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main FAB */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ 
                            boxShadow: isMenuOpen 
                                ? "0px 0px 0px rgba(0,0,0,0)" 
                                : ["0px 0px 0px 0px rgba(131, 0, 175, 0.4)", "0px 0px 0px 15px rgba(131, 0, 175, 0)"] 
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        onClick={toggleMenu}
                        className="w-16 h-16 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-full shadow-2xl flex items-center justify-center text-white border border-white/20 z-50 relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div 
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiX size={28} />
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="grid"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiGrid size={26} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Render Active Modals */}
            <AnimatePresence>
                {activeModal === 'consultation' && <ConsultationModal onClose={() => setActiveModal(null)} />}
            </AnimatePresence>
        </>
    );
}
