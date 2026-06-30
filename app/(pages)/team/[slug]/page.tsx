"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import Header2 from '@/app/components/dusacomponent/Header2';
import Footer from '@/app/components/dusacomponent/Footer';

// Image Imports (matching your team page)
import akinwale from '@/public/images/dusacoreimages/dusateam/Akinwale Olawale Ridwan.jpeg';
import edifon from '@/public/images/dusacoreimages/dusateam/Edifon Emmanuel Jimmy.jpeg';
import fatimah from '@/public/images/dusacoreimages/dusateam/Fatimah Hammed Omoshalewa.jpeg';
import hammed from '@/public/images/dusacoreimages/dusateam/Hammed Ridawan Olaide.jpeg';
import umar from '@/public/images/dusacoreimages/dusateam/Umar Ibrahim A.jpeg';
import bukola from '@/public/images/dusacoreimages/dusateam/Ganiyat Bukola Shittu.jpeg';

// --- ANIMATION CONFIGURATIONS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// --- CORE TEAM DATA RETRIEVAL DICTIONARY ---
const teamRegistry: Record<string, {
    name: string;
    role: string;
    image: any;
    bio: string;
    focusAreas: string[];
    expertise: string[];
    achievements: string[];
}> = {
    "hammed-ridwan-olaide": {
        name: "Hammed Ridwan Olaide",
        role: "Chief Executive Officer",
        image: hammed,
        bio: "Hammed guides the strategic vision and growth of the firm, specializing in scaling enterprise architectures and designing automated digital systems. He bridges business strategy with heavy-duty software execution to deliver measurable efficiency.",
        focusAreas: ["Corporate Strategy", "Enterprise System Architecture", "Digital Transformation Plans"],
        expertise: ["System Automation", "Financial Engineering Logics", "Scalable Infrastructures"],
        achievements: ["Successfully scaled platform delivery frameworks to automate high-volume operations.", "Led architecture overhauls reducing processing lag by over 40%."]
    },
    "akinwale-olawale-ridwan": {
        name: "Akinwale Olawale Ridwan",
        role: "Chief Creative Designer",
        image: akinwale,
        bio: "Akinwale shapes the visual systems and interactive logic of our digital products. He treats design as an engineering discipline, building comprehensive design systems that turn complex technical utilities into simple, fluid interfaces.",
        focusAreas: ["UI/UX Architecture", "Design System Engineering", "Interactive Prototyping"],
        expertise: ["Framer Motion & Micro-interactions", "Advanced Tailwind Architecture", "Brand Strategy"],
        achievements: ["Designed highly praised interactive frontends for complex data analytics systems.", "Built the core components system unifying our frontend development cycles."]
    },
    "edifon-emmanuel-jimmy": {
        name: "Edifon Emmanuel Jimmy",
        role: "Chief Artificial Intelligence Officer",
        image: edifon,
        bio: "Edifon builds the core computational engines and intelligent pipelines that power our optimizations. From deploying genetic algorithms for resource management to structuring localized neural networks, he focuses on programmatic efficiency.",
        focusAreas: ["Predictive Analytics", "Algorithmic Optimizations", "Machine Learning Workflows"],
        expertise: ["Genetic Algorithms", "Advanced Computational Modeling", "Python & Data Science Ecosystems"],
        achievements: ["Designed and implemented a custom AI-driven room allocation engine.", "Optimized real-time algorithmic pipelines handling massive relational datasets."]
    },
    "umar-ibrahim-ayobami": {
        name: "Umar Ibrahim Ayobami",
        role: "Chief Experience Officer",
        image: umar,
        bio: "Umar oversees the end-to-end alignment of system outputs with actual human behavior. He runs rigorous user research cycles and works directly alongside developers to ensure that deep backend logic renders intuitively for final users.",
        focusAreas: ["User Research Cycles", "Service Blueprinting", "Usability Engineering"],
        expertise: ["Behavioral Analysis", "Product Journey Mapping", "Heuristic Evaluations"],
        achievements: ["Redesigned high-churn user registration paths into flawless single-session flows.", "Established data-informed feedback loops mapping user actions back to platform features."]
    },
    "fatimah-hammed-omoshalewa": {
        name: "Fatimah Hammed Omoshalewa",
        role: "Chief Growth",
        image: fatimah,
        bio: "Fatimah builds and accelerates the loops that connect our technological outputs to market scale. She applies deep operational metrics and market analytics to ensure our technical products find continuous commercial success.",
        focusAreas: ["Growth Analytics", "Market Acquisition Strategy", "Business Development Loops"],
        expertise: ["Data-driven Growth Metrics", "Strategic Partnerships", "Conversion Rate Optimization"],
        achievements: ["Spearheaded scaling campaigns that expanded client onboarding by over 60%.", "Designed the retention modeling frameworks used to map out customer life cycles."]
    },
    "ganiyat-bukola-shittu": {
        name: "Ganiyat Bukola Shittu",
        role: "Chief Product Officer",
        image: bukola, // Renders an elegant fallback placeholder if no image file is loaded
        bio: "Ganiyat controls the product lifecycles, translating high-level business logic and complex client briefs into clear engineering milestones. She runs our agile roadmaps to ensure system builds deploy perfectly on schedule.",
        focusAreas: ["Agile Lifecycle Management", "Cross-functional Scoping", "Product Feature Roadmaps"],
        expertise: ["Technical Requirement Mapping", "Sprint Architecture", "Quality Delivery Sign-offs"],
        achievements: ["Successfully steered multiple large-scale clinic and banking automation systems from scope to production.", "Maintained an immaculate 100% on-time deployment record across consecutive release cycles."]
    }
};

interface TeamMemberProps {
    params: {
        slug: string;
    };
}

export default function TeamMemberPage({ params }: TeamMemberProps) {
    const member = teamRegistry[params.slug];

    // Triggers Next.js 404 handler if the slug doesn't exist in our records
    if (!member) {
        notFound();
    }

    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    return (
        <div className="w-full flex flex-col relative bg-slate-50 min-h-screen">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            {/* Back Button Layout */}
            <div className="w-full max-w-6xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
                <Link 
                    href="/our-team" 
                    className="inline-flex items-center text-sm font-semibold text-appBanner hover:text-appTitleBgColor transition-colors duration-200 group"
                >
                    <svg 
                        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Team
                </Link>
            </div>

            {/* Main Profile Grid Section */}
            <main className="w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8 flex-grow">
                <motion.div 
                    initial="hidden"
                    animate="show"
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                    {/* LEFT COLUMN: Media Container */}
                    <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col items-center lg:items-start">
                        <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-100">
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-w-768px) 100vw, 40vw"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                                    <svg className="w-20 h-20 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium text-sm tracking-wide uppercase">Profile Image Pending</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Profile Insights Text */}
                    <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-8 text-left">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-appTitleBgColor tracking-tight">
                                {member.name}
                            </h1>
                            <p className="text-lg sm:text-xl font-bold text-appBanner mt-2 uppercase tracking-wider">
                                {member.role}
                            </p>
                        </div>

                        <div className="h-px bg-slate-200 w-full" />

                        {/* Summary Narrative */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Professional Summary</h3>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                                {member.bio}
                            </p>
                        </div>

                        {/* Split Details Table/Lists */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                            {/* Focus Areas */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Core Focus Areas</h3>
                                <ul className="space-y-2">
                                    {member.focusAreas.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-appBanner mr-2.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Core Technical/Execution Capabilities */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Execution Domain</h3>
                                <ul className="space-y-2">
                                    {member.expertise.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-appTitleBgColor mr-2.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="h-px bg-slate-200 w-full" />

                        {/* Notable Tracks/Achievements */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Key Track Record</h3>
                            <div className="space-y-3">
                                {member.achievements.map((achievement, idx) => (
                                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-start">
                                        <div className="p-2 rounded-xl bg-slate-50 text-appBanner mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-600 text-sm sm:text-base leading-normal font-medium pt-0.5">
                                            {achievement}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}