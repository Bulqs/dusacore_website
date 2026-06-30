'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    FiX, FiStar, 
    FiCalendar, FiBriefcase, FiGrid
} from 'react-icons/fi';

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
// 1. GOOGLE CALENDAR CONSULTATION MODAL (INLINE IFRAME)
// ==========================================
const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 sm:p-6">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh] max-h-[800px]">
                
                {/* Header */}
                <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-6 text-white flex justify-between items-center shrink-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <FiCalendar size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Book a Consultation</h2>
                            <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Select a time that works best for you.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Google Calendar Iframe Container */}
                <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
                            <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
                        </div>
                    )}
                    
                    {/* Direct Iframe Embed - Best UX */}
                    <iframe 
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eseMkYNDpPH0i9mjQTQkQcSe0ZJsXOyKzQomQLJzN7EVC-ackhxEFnf4x5zKe4_rk0PRC7YR4?gv=true" 
                        style={{ border: 0 }} 
                        width="100%" 
                        height="100%" 
                        className="flex-1 w-full h-full"
                        onLoad={() => setIsLoading(false)}
                    ></iframe>
                </div>
            </motion.div>
        </motion.div>
    );
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

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence, Variants } from 'framer-motion';
// import { 
//     FiX, FiStar, FiCheckCircle, 
//     FiCalendar, FiBriefcase, FiMessageCircle, FiGrid
// } from 'react-icons/fi';

// // --- YOUR WHATSAPP BUSINESS NUMBER ---
// const WHATSAPP_NUMBER = "23489044698791"; // No '+' sign

// // --- ANIMATION VARIANTS ---
// const modalBackdrop: Variants = {
//     hidden: { opacity: 0, backdropFilter: "blur(0px)" },
//     show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
// };

// const modalContent: Variants = {
//     hidden: { scale: 0.95, opacity: 0, y: 20 },
//     show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
//     exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
// };

// const floatingMenuVariants: Variants = {
//     hidden: { opacity: 0, y: 50 },
//     show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
//     exit: { opacity: 0, y: 20, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
// };

// const floatingBtnVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.5, y: 20 },
//     show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 15 } },
//     exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
// };

// // ==========================================
// // 1. GOOGLE CALENDAR CONSULTATION MODAL (INLINE IFRAME)
// // ==========================================
// const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
//     const [isLoading, setIsLoading] = useState(true);

//     return (
//         <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 sm:p-6">
//             <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh] max-h-[800px]">
                
//                 {/* Header */}
//                 <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-6 text-white flex justify-between items-center shrink-0 relative z-10">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                             <FiCalendar size={20} />
//                         </div>
//                         <div>
//                             <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Book a Consultation</h2>
//                             <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Select a time that works best for you.</p>
//                         </div>
//                     </div>
//                     <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
//                         <FiX size={20} />
//                     </button>
//                 </div>

//                 {/* Google Calendar Iframe Container */}
//                 <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
//                     {/* Loading Spinner */}
//                     {isLoading && (
//                         <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
//                             <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
//                             <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
//                         </div>
//                     )}
                    
//                     {/* Direct Iframe Embed - Best UX */}
//                     <iframe 
//                         src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eseMkYNDpPH0i9mjQTQkQcSe0ZJsXOyKzQomQLJzN7EVC-ackhxEFnf4x5zKe4_rk0PRC7YR4?gv=true" 
//                         style={{ border: 0 }} 
//                         width="100%" 
//                         height="100%" 
//                         className="flex-1 w-full h-full"
//                         onLoad={() => setIsLoading(false)}
//                     ></iframe>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // ==========================================
// // 2. CONTACT US (WHATSAPP) MODAL 
// // ==========================================
// const ContactModal = ({ onClose }: { onClose: () => void }) => {
//     const [payload, setPayload] = useState({ email: '', message: '' });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         const encodedMessage = encodeURIComponent(
//             `Hello DUSA CORE! I have a general inquiry.\n\n` +
//             `*Email:* ${payload.email}\n\n` +
//             `*Message:*\n${payload.message}`
//         );

//         window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        
//         setIsSuccess(true);
//         setIsSubmitting(false);
//     };

//     return (
//         <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//             <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
//                 <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full transition-colors z-10">
//                     <FiX size={20} />
//                 </button>

//                 {isSuccess ? (
//                     <div className="flex flex-col items-center text-center py-6 animate-in zoom-in duration-300">
//                         <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
//                             <FiCheckCircle className="w-10 h-10 text-green-500" />
//                         </div>
//                         <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Redirecting to WhatsApp!</h3>
//                         <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">You can now send your inquiry directly to our team via WhatsApp.</p>
//                         <button onClick={onClose} className="w-full bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors">Done</button>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="w-12 h-12 bg-purple-50 text-[#4B0163] rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
//                             <FiMessageCircle size={24} />
//                         </div>
//                         <h3 className="text-2xl font-extrabold text-appBlack mb-2">Contact Us</h3>
//                         <p className="text-sm text-gray-500 font-medium mb-6">Have a general question or need support? Drop us a message.</p>
                        
//                         <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
//                             <div>
//                                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address *</label>
//                                 <input required type="email" onChange={e => setPayload({...payload, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all" placeholder="your@email.com" />
//                             </div>
//                             <div>
//                                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Message *</label>
//                                 <textarea required onChange={e => setPayload({...payload, message: e.target.value})} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] resize-none transition-all" placeholder="How can we help you?"></textarea>
//                             </div>
//                             <button disabled={isSubmitting} type="submit" className="w-full bg-appBlack hover:bg-[#4B0163] text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-2">
//                                 {isSubmitting ? 'Opening WhatsApp...' : 'Chat with Us'}
//                             </button>
//                         </form>
//                     </>
//                 )}
//             </motion.div>
//         </motion.div>
//     );
// };


// // ==========================================
// // 3. MAIN FLOATING MENU COMPONENT
// // ==========================================
// type ActiveModalType = 'consultation' | 'contact' | null;

// export default function FloatingActionMenu() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
//     const [showGuideTooltip, setShowGuideTooltip] = useState(true);

//     useEffect(() => {
//         if (isMenuOpen) setShowGuideTooltip(false);
//         const timer = setTimeout(() => setShowGuideTooltip(false), 8000);
//         return () => clearTimeout(timer);
//     }, [isMenuOpen]);

//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
//     const openModal = (type: ActiveModalType) => {
//         setActiveModal(type);
//         setIsMenuOpen(false); 
//     };

//     return (
//         <>
//             {/* The Floating Menu Area */}
//             <div className="fixed bottom-10 right-8 z-50 flex flex-col items-end gap-4">
                
//                 <AnimatePresence>
//                     {isMenuOpen && (
//                         <motion.div 
//                             variants={floatingMenuVariants} 
//                             initial="hidden" 
//                             animate="show" 
//                             exit="exit" 
//                             className="flex flex-col items-end gap-4 mb-2"
//                         >
//                             {/* Action 1: Book Consultation (Google Calendar) */}
//                             <motion.button 
//                                 variants={floatingBtnVariants}
//                                 whileHover={{ scale: 1.1, x: -5 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => openModal('consultation')}
//                                 className="flex items-center gap-3 group"
//                             >
//                                 <span className="bg-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-appBlack shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     Book Consultation
//                                 </span>
//                                 <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#4B0163]">
//                                     <FiCalendar size={24} />
//                                 </div>
//                             </motion.button>

//                             {/* Action 2: View Services / Quick Link */}
//                             <motion.a 
//                                 href="/services" 
//                                 variants={floatingBtnVariants}
//                                 whileHover={{ scale: 1.1, x: -5 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="flex items-center gap-3 group"
//                             >
//                                 <span className="bg-gradient-to-r from-[#4B0163] to-[#8300AF] text-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
//                                     <FiStar className="fill-white" /> Explore Services
//                                 </span>
//                                 <div className="w-14 h-14 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-full shadow-lg border border-white/20 flex items-center justify-center text-white">
//                                     <FiBriefcase size={22} />
//                                 </div>
//                             </motion.a>
                            
//                             {/* Action 3: Contact Us (WhatsApp) */}
//                             <motion.button 
//                                 variants={floatingBtnVariants}
//                                 whileHover={{ scale: 1.1, x: -5 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => openModal('contact')}
//                                 className="flex items-center gap-3 group"
//                             >
//                                 <span className="bg-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-appBlack shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     Contact Us
//                                 </span>
//                                 <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-appBlack">
//                                     <FiMessageCircle size={24} />
//                                 </div>
//                             </motion.button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Primary Toggle Button & Tooltip Wrapper */}
//                 <div className="relative flex items-center">
//                     <AnimatePresence>
//                         {showGuideTooltip && !isMenuOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, x: 20, scale: 0.8 }}
//                                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
//                                 className="absolute right-20 bg-white text-appBlack px-4 py-2.5 rounded-2xl shadow-xl border border-gray-200 text-sm font-extrabold whitespace-nowrap flex items-center gap-3 origin-right"
//                             >
//                                 <motion.span 
//                                     animate={{ rotate: [0, 20, -20, 0] }} 
//                                     transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
//                                     className="text-lg inline-block origin-bottom-right"
//                                 >
//                                     👋
//                                 </motion.span>
//                                 Let's build something meaningful!
//                                 <button 
//                                     onClick={(e) => { e.stopPropagation(); setShowGuideTooltip(false); }}
//                                     className="ml-1 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-1 transition-colors"
//                                 >
//                                     <FiX size={14} />
//                                 </button>
//                                 <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* Main FAB */}
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         animate={{ 
//                             boxShadow: isMenuOpen 
//                                 ? "0px 0px 0px rgba(0,0,0,0)" 
//                                 : ["0px 0px 0px 0px rgba(131, 0, 175, 0.4)", "0px 0px 0px 15px rgba(131, 0, 175, 0)"] 
//                         }}
//                         transition={{ duration: 1.5, repeat: Infinity }}
//                         onClick={toggleMenu}
//                         className="w-16 h-16 bg-gradient-to-br from-[#4B0163] to-[#8300AF] rounded-full shadow-2xl flex items-center justify-center text-white border border-white/20 z-50 relative overflow-hidden"
//                     >
//                         <AnimatePresence mode="wait">
//                             {isMenuOpen ? (
//                                 <motion.div 
//                                     key="close"
//                                     initial={{ rotate: -90, opacity: 0 }}
//                                     animate={{ rotate: 0, opacity: 1 }}
//                                     exit={{ rotate: 90, opacity: 0 }}
//                                     transition={{ duration: 0.2 }}
//                                 >
//                                     <FiX size={28} />
//                                 </motion.div>
//                             ) : (
//                                 <motion.div 
//                                     key="grid"
//                                     initial={{ rotate: 90, opacity: 0 }}
//                                     animate={{ rotate: 0, opacity: 1 }}
//                                     exit={{ rotate: -90, opacity: 0 }}
//                                     transition={{ duration: 0.2 }}
//                                 >
//                                     <FiGrid size={26} />
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </motion.button>
//                 </div>
//             </div>

//             {/* Render Active Modals */}
//             <AnimatePresence>
//                 {activeModal === 'consultation' && <ConsultationModal onClose={() => setActiveModal(null)} />}
//                 {activeModal === 'contact' && <ContactModal onClose={() => setActiveModal(null)} />}
//             </AnimatePresence>
//         </>
//     );
// }
