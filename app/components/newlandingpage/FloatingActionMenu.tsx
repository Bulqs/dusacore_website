'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    FiX, FiChevronDown, FiArrowRight, 
    FiMessageCircle, FiGrid, FiStar, FiCheckCircle, 
    FiCalendar, FiBriefcase
} from 'react-icons/fi';

// --- YOUR WHATSAPP BUSINESS NUMBER ---
const WHATSAPP_NUMBER = "23489044698791"; // No '+' sign

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
// 1. BOOK CONSULTATION MODAL 
// ==========================================
const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
    const [payload, setPayload] = useState({ name: '', email: '', service: '', details: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Format the WhatsApp message
        const encodedMessage = encodeURIComponent(
            `Hello DUSA CORE! I would like to book a consultation.\n\n` +
            `*Name:* ${payload.name}\n` +
            `*Email:* ${payload.email}\n` +
            `*Service Interest:* ${payload.service || 'Not specified'}\n\n` +
            `*Project Details:*\n${payload.details}`
        );

        // Open WhatsApp in a new tab
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        
        // Show success screen in the modal
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]">
                
                <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-6 text-white flex justify-between items-start shrink-0 relative z-10">
                    <div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                            <FiCalendar size={24} />
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-wide">Book a Consultation</h2>
                        <p className="text-sm font-medium text-white/80 mt-1">Let's discuss how we can engineer value for your business.</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10">
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center py-6 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <FiCheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-appBlack mb-2">Redirecting to WhatsApp!</h3>
                            <p className="text-sm text-gray-500 font-medium mb-8">You can now send your message directly to our team via WhatsApp.</p>
                            <button onClick={onClose} className="w-full bg-appFadeDown hover:bg-appNav text-white font-bold py-3.5 rounded-xl transition-colors">Done</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Full Name *</label>
                                    <input required type="text" onChange={e => setPayload({...payload, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown outline-none" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Email *</label>
                                    <input required type="email" onChange={e => setPayload({...payload, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown outline-none" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Service Interest</label>
                                <select required onChange={e => setPayload({...payload, service: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown outline-none appearance-none bg-white">
                                    <option value="">Select an area of focus...</option>
                                   <option value="" disabled>Select an option...</option>
                                     <option value="Software Engineering">Software Engineering</option>
                                    <option value="AI & Data Infrastructure">AI & Data Infrastructure</option>
                                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                                    <option value="Sports Tech">Sports Tech</option>
                                    <option value="Entertainment Tech">Entertainment Tech</option>
                                    <option value="Arts Tech">Arts Tech</option>
                                    <option value="Data Science/Engineering">Data Science/Engineering</option>
                                    <option value="Product Design">UI/UX & Product/Brand Design</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Marketing">Marketing Tech</option>
                                    <option value="Health">Health</option>
                                    <option value="Others">Others</option>
                                </select>
                                <FiChevronDown className="absolute right-4 bottom-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Project Details</label>
                                <textarea rows={3} onChange={e => setPayload({...payload, details: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown outline-none resize-none" placeholder="Briefly describe what you're looking to build..."></textarea>
                            </div>

                            <button disabled={isSubmitting} type="submit" className="w-full bg-appFadeDown hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-4 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Opening WhatsApp...' : <>Schedule Call <FiArrowRight /></>}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ==========================================
// 2. SUPPORT & GENERAL INQUIRY MODAL 
// ==========================================
const SupportModal = ({ onClose }: { onClose: () => void }) => {
    const [payload, setPayload] = useState({ email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Format the WhatsApp message
        const encodedMessage = encodeURIComponent(
            `Hello DUSA CORE! I have a general inquiry.\n\n` +
            `*Email:* ${payload.email}\n\n` +
            `*Message:*\n${payload.message}`
        );

        // Open WhatsApp in a new tab
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full transition-colors z-10">
                    <FiX size={20} />
                </button>

                {isSuccess ? (
                    <div className="flex flex-col items-center text-center py-6 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <FiCheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Redirecting to WhatsApp!</h3>
                        <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">You can now send your inquiry directly to our team via WhatsApp.</p>
                        <button onClick={onClose} className="w-full bg-appFadeDown hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors">Done</button>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-purple-50 text-appFadeDown rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                            <FiMessageCircle size={24} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-appBlack mb-2">Get in Touch</h3>
                        <p className="text-sm text-gray-500 font-medium mb-6">Have a general question or need support? Drop us a message.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                                <input required type="email" onChange={e => setPayload({...payload, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown transition-all" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Message *</label>
                                <textarea required onChange={e => setPayload({...payload, message: e.target.value})} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-appFadeDown focus:ring-1 focus:ring-appFadeDown resize-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button disabled={isSubmitting} type="submit" className="w-full bg-appBlack hover:bg-appFadeDown text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-2">
                                {isSubmitting ? 'Opening WhatsApp...' : 'Send Message'}
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};


// ==========================================
// 3. MAIN FLOATING MENU COMPONENT
// ==========================================
type ActiveModalType = 'consultation' | 'support' | null;

export default function FloatingActionMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
    const [showGuideTooltip, setShowGuideTooltip] = useState(true);

    // Hide tooltip automatically after 8 seconds, or immediately if menu is opened
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
                            {/* Action 1: Book Consultation */}
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
                                <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-appFadeDown">
                                    <FiCalendar size={24} />
                                </div>
                            </motion.button>

                            {/* Action 2: View Services / Quick Link */}
                            <motion.a 
                                href="/services" 
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
                            
                            {/* Action 3: General Support */}
                            <motion.button 
                                variants={floatingBtnVariants}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openModal('support')}
                                className="flex items-center gap-3 group"
                            >
                                <span className="bg-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-appBlack shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Contact Us
                                </span>
                                <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-appBlack">
                                    <FiMessageCircle size={24} />
                                </div>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Primary Toggle Button & Tooltip Wrapper */}
                <div className="relative flex items-center">
                    
                    {/* Onboarding Tooltip Guide */}
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
                {activeModal === 'support' && <SupportModal onClose={() => setActiveModal(null)} />}
            </AnimatePresence>
        </>
    );
}
