"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Header2 from '@/app/components/newlandingpage/Header2';
import Footer from '@/app/components/newlandingpage/Footer';
import Banner from '@/app/components/dusacomponent/Banner';
import faqBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';

const faqs = [
    { question: "How much time do you take to develop a website?", answer: "Timelines vary depending on complexity and scope. A standard website typically takes 4–8 weeks, while more complex platforms with advanced features can take 3–6 months. We provide a detailed timeline during our initial consultation." },
    { question: "Do you build mobile compatible websites?", answer: "Yes, absolutely. Every website we build is fully responsive and optimized for all devices including mobile phones, tablets, and desktops to ensure a seamless user experience across every screen size." },
    { question: "Do you provide web hosting?", answer: "We do not directly provide hosting, but we partner with reliable hosting providers and can help you set up, configure, and manage your hosting environment. We recommend and support industry-leading solutions for optimal performance." },
    { question: "Can I contact my developers directly?", answer: "Yes, we believe in transparent communication. You will have direct access to your project manager and development team through our communication channels to ensure your vision is clearly understood and executed." },
    { question: "Can you work with the team on my end?", answer: "Absolutely. We collaborate seamlessly with in-house teams, other agencies, or freelance professionals. Our workflow is designed to integrate smoothly with your existing processes and tools." },
    { question: "Do i own the property rights of my project?", answer: "Yes, upon full payment, you retain 100% ownership of all intellectual property rights, including source code, design assets, and any deliverables produced during the project." },
    { question: "When executing projects does your team rely directly on the client to provide information?", answer: "We strive to be self-sufficient, but some information is best provided by you. We minimize the burden by preparing detailed briefs and questionnaires upfront, so you only need to provide essential input at key milestones." },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full flex flex-col relative bg-gray-50">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            <Banner
                image={faqBanner}
                title="Frequently Asked Questions"
                description="These are frequently asked question by our Clients, if any other questions arises , do not hesitate to contact us!"
                alt="FAQ Banner"
            />

            <div className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="bg-white border border-gray-200 shadow-sm">
                                    <button 
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    >
                                        <span className={`font-bold text-lg ${isOpen ? 'text-appBanner' : 'text-gray-800'}`}>
                                            {faq.question}
                                        </span>
                                        <div>
                                            {isOpen ? (
                                                <Minus className="w-5 h-5 text-appBanner" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
