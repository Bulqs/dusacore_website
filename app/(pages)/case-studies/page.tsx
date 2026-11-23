"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Activity, Globe, ShieldCheck, Cpu, Smartphone, Database } from 'lucide-react';
import Header2 from '@/app/components/dusacomponent/Header2';
import Footer from '@/app/components/dusacomponent/Footer';
import Banner from '@/app/components/dusacomponent/Banner';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';
import caseBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// --- DUSA CORE CASE STUDIES DATA (STORY-DRIVEN) ---
const projects = [
    {
        id: "bulq-logistics",
        title: "Bulq Logistics Ecosystem",
        category: "Supply Chain & Fleet Management",
        problem: "Bulq faced a critical scaling challenge: a fragmented supply chain leading to delayed deliveries, manual dispatch bottlenecks, and severe revenue leakage.",
        solution: "DUSA CORE architected a unified logistics ecosystem from the ground up. We replaced their manual operations with automated dispatch routing using advanced graph algorithms. By integrating real-time GPS telemetry and digitized proof-of-delivery (ePOD), we created a seamless, transparent bridge between B2B freight and B2C last-mile delivery.",
        impact: "Transformed operations to successfully orchestrate over 50,000+ shipments monthly with 99.9% uptime, cutting dispatch times by 70%.",
        techStack: ["Node.js", "React Native", "WebSockets", "Google Matrix API"],
        image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200",
        color: "#059669",
        icon: TruckIcon
    },
    {
        id: "bdc-fx",
        title: "Enterprise FX & BDC Platform",
        category: "Fintech & Currency Exchange",
        problem: "In the volatile world of foreign exchange, our client needed a platform to process high-frequency USD, EUR, and GBP to NGN conversions without falling victim to fraud or compliance breaches.",
        solution: "We engineered a military-grade Bureau De Change (BDC) financial application. Built with strict zero-trust security and immutable ledger routing, the platform syncs with global currency markets in real-time. We implemented automated KYC/AML workflows to ensure every transaction is completely auditable and tamper-proof.",
        impact: "Secured millions in daily transaction volume with zero automated compliance failures or security breaches.",
        techStack: ["Spring Boot", "Next.js", "PostgreSQL", "AES-256 Encryption"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
        color: "#0284c7",
        icon: Globe
    },
    {
        id: "esusu-app",
        title: "Digital Esusu (Co-op) Fintech",
        category: "Fintech & Wealth Management",
        problem: "The traditional African 'Esusu' cooperative savings model lacked digital transparency, leading to trust issues and administrative chaos among contributors.",
        solution: "We modernized this cultural staple into a highly secure digital cooperative application. Our engineers built dynamic wallet infrastructure, automated group contributions, and scheduled milestone payouts. We integrated seamless payment gateways to ensure funds were collected and disbursed with total accuracy.",
        impact: "Digitized thousands of offline savings groups, ensuring 100% financial transparency and financial inclusion for the underbanked.",
        techStack: ["React Native", "NestJS", "MongoDB", "Paystack APIs"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
        color: "#ea580c",
        icon: Smartphone
    },
    {
        id: "omnichannel-ai",
        title: "Tri-Lingual Omnichannel AI Agent",
        category: "Artificial Intelligence & Support",
        problem: "A major enterprise was losing rural customers because standard English-only AI chatbots could not understand or support non-English speakers effectively.",
        solution: "We engineered an advanced LLM-powered chatbot specifically trained with custom Speech-to-Text (STT) models to recognize, process, and respond in Nigeria's three major languages: Hausa, Igbo, and Yoruba. Backed by a Retrieval-Augmented Generation (RAG) pipeline, the AI seamlessly handles customer support via WhatsApp and direct Voice calls without hallucinating company policies.",
        impact: "Reduced call-center operational costs by 60% while dramatically expanding rural customer accessibility and retention.",
        techStack: ["Python", "Twilio Voice", "Pinecone Vector DB", "Local LLMs"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1200",
        color: "#14b8a6",
        icon: Cpu
    },
    {
        id: "proptech-real-estate",
        title: "Premium PropTech Platform",
        category: "Real Estate & Asset Management",
        problem: "Real estate transactions were plagued by trust deficits, fraud, and agonizingly slow closing times between landlords and prospective tenants.",
        solution: "DUSA CORE built a comprehensive real estate discovery and management platform. We engineered it to support high-resolution virtual property tours and implemented a secure, automated escrow payment system. Funds are held safely until tenancy agreements are signed, protecting both parties.",
        impact: "Eliminated tenancy fraud and streamlined property acquisitions, reducing average close times by over 14 days.",
        techStack: ["Next.js", "AWS S3", "GraphQL", "Stripe Escrow"],
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
        color: "#be123c",
        icon: BuildingIcon
    }
];

// Quick localized icons for the array above
function TruckIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
}
function BuildingIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;
}

export default function CaseStudiesPage() {
    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    return (
        <div className="w-full flex flex-col relative bg-slate-50 min-h-screen">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            <Banner
                image={caseBanner}
                title="Engineering Triumphs"
                description="Explore our portfolio of scalable architectures, intelligent automation, and robust enterprise solutions deployed for real-world impact."
                alt="Case Studies Banner"
            />

            <PartnersMarquee />

            <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decorative element */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#4B0163] bg-purple-100 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                            <Database className="w-4 h-4" /> Proven Track Record
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mt-6 tracking-tight">
                            From complex problem to <br className="hidden sm:block" />production reality.
                        </h2>
                        <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed">
                            Discover how DUSA CORE partners with ambitious organizations to architect software that solves complex logistical, financial, and operational challenges.
                        </p>
                    </div>

                    <motion.div 
                        variants={containerVariants} 
                        initial="hidden" 
                        whileInView="show" 
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-24 lg:space-y-32"
                    >
                        {projects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            const ProjectIcon = project.icon;

                            return (
                                <motion.div 
                                    key={project.id} 
                                    variants={cardVariants}
                                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    {/* IMAGE / VISUAL SIDE */}
                                    <div className="w-full lg:w-1/2 relative group perspective-1000">
                                        <div className={`relative h-[350px] sm:h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02] ${isEven ? 'rotate-1' : '-rotate-1'}`}>
                                            <Image 
                                                src={project.image} 
                                                alt={project.title} 
                                                fill 
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                                            
                                            {/* Floating Impact Card on Image */}
                                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="flex items-start gap-3">
                                                    <Activity className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-white/70 font-bold mb-1">Measurable Impact</p>
                                                        <p className="text-sm font-medium leading-snug">{project.impact}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENT / TEXT SIDE */}
                                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: project.color }}>
                                                <ProjectIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: project.color }}>
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                                            {project.title}
                                        </h3>
                                        
                                        <div className="space-y-5 mb-8">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 mb-1">The Challenge</h4>
                                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-2 border-red-400 pl-4 py-1">
                                                    {project.problem}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 mb-1">The DUSA Solution</h4>
                                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-l-2 pl-4 py-1" style={{ borderColor: project.color }}>
                                                    {project.solution}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tech Stack Pills */}
                                        <div className="mb-10">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" /> Architecture & Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:border-[#4B0163] hover:text-[#4B0163] transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Button - FUNNELS TO PRODUCTS PAGE */}
                                        <Link 
                                            href={`/products`} 
                                            className="group inline-flex items-center gap-3 text-[#4B0163] font-bold text-lg hover:text-purple-900 transition-colors w-fit"
                                        >
                                            Explore Ready-to-Deploy Architecture
                                            <span className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}