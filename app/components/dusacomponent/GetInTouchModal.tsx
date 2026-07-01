"use client";
import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const WHATSAPP_NUMBER = "23489044698791";

const modalBackdrop: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
};

const modalContent: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
};

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
            <motion.div variants={modalContent} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col">
                <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-5 text-white flex justify-between items-center shrink-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide">Let&apos;s Connect</h2>
                            <p className="text-xs font-semibold text-white/80 hidden sm:block">Tell us about yourself and how we can help.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 md:p-8">
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
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div>
                                <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1.5 block">Your Name *</label>
                                <input required type="text" onChange={e => setPayload({...payload, name: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all" placeholder="John Doe" />
                            </div>
                            
                            <div>
                                <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1.5 block">Email Address *</label>
                                <input required type="email" onChange={e => setPayload({...payload, email: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all" placeholder="your@company.com" />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1.5 block">Area of Interest</label>
                                <div className="relative">
                                    <select required onChange={e => setPayload({...payload, interest: e.target.value})} className="w-full bg-slate-50 border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] transition-all appearance-none cursor-pointer">
                                        <option value="" disabled selected>Select an option...</option>
                                        <option value="Software Engineering">Software Engineering</option>
                                        <option value="AI & Data Infrastructure">AI & Data Infrastructure</option>
                                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                                        <option value="Product Design">UI/UX & Product Design</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-1.5 block">Message *</label>
                                <textarea required onChange={e => setPayload({...payload, message: e.target.value})} rows={3} className="w-full bg-slate-50 border border-gray-200 rounded-none px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#4B0163] focus:ring-1 focus:ring-[#4B0163] resize-none transition-all" placeholder="Briefly describe your project..."></textarea>
                            </div>

                            <button disabled={isSubmitting} type="submit" className="w-full bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-none shadow-md transition-colors mt-2 active:scale-[0.98]">
                                {isSubmitting ? 'Opening WhatsApp...' : 'Start Chat'}
                            </button>
                        </form>
                )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GetInTouchModal;
