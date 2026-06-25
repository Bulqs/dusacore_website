"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Header2 from '@/app/components/dusacomponent/Header2';
import Footer from '@/app/components/dusacomponent/Footer';
import Banner from '@/app/components/dusacomponent/Banner';
import ImageTextSection from '@/app/components/dusacomponent/dusawelcomepage/ImageTextSection';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';
import caseBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
import caseImg from '@/public/images/dusacoreimages/communication.jpg';

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const projects = [
    {
        title: "Bulq Logistics",
        description: "Built a scalable logistics management system that handles over 50,000 shipments monthly, integrating real-time tracking, automated customs documentation, and multi-carrier dispatch.",
        image: caseImg,
    },
    {
        title: "Bulq Ecommerce",
        description: "Designed and developed a real-time analytics dashboard for a Fortune 500 company, consolidating data from 12+ sources into actionable insights with interactive visualizations.",
        image: caseImg,
    },
    {
        title: "Dusa",
        description: "Created a secure, cross-platform mobile banking application serving 100,000+ users with features including biometric authentication, instant transfers, and AI-powered spending insights.",
        image: caseImg,
    },
];

export default function CaseStudiesPage() {
    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    return (
        <div className="w-full flex flex-col relative">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            <Banner
                image={caseBanner}
                title="Project We Have Done"
                description="Hire us, lets help you grow your ideas into World-class Enterprise"
                alt="Case Studies Banner"
            />

            <PartnersMarquee />

            <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
                        {projects.map((project, index) => (
                            <motion.div key={index} variants={fadeUpItem}>
                                <ImageTextSection
                                    image={project.image}
                                    title={project.title}
                                    description={project.description}
                                    imageAlt={project.title}
                                    imageOnLeft={index % 2 === 0}
                                    buttonText="View More"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
