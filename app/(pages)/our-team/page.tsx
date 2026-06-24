"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Header2 from '@/app/components/newlandingpage/Header2';
import TeamCard from '@/app/components/dusacomponent/TeamCard';
import Footer from '@/app/components/newlandingpage/Footer';
import Banner from '@/app/components/dusacomponent/Banner';
import teamBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const team = [
    { name: "Alex Johnson", role: "CEO & Founder", image: "https://i.pravatar.cc/300?img=1" },
    { name: "Sarah Chen", role: "CTO", image: "https://i.pravatar.cc/300?img=5" },
    { name: "Michael Okonkwo", role: "Head of Engineering", image: "https://i.pravatar.cc/300?img=3" },
    { name: "Emily Davis", role: "Lead Designer", image: "https://i.pravatar.cc/300?img=9" },
    { name: "David Kim", role: "DevOps Lead", image: "https://i.pravatar.cc/300?img=11" },
    { name: "Amara Obi", role: "Product Manager", image: "https://i.pravatar.cc/300?img=12" },
];

export default function OurTeamPage() {
    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    return (
        <div className="w-full flex flex-col relative">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            <Banner
                image={teamBanner}
                title="Our Team"
                description="We design, build, and optimize digital systems that improve efficiency, enable better decision-making, and create measurable business value. Our work sits at the intersection of strategy, engineering, and design where business needs are translated into scalable technological systems."
                alt="Our Team Banner"
            />

            <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="mb-12 sm:mb-16 text-left">
                        <motion.h2 variants={fadeUpItem} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor">
                            Dusa <span className="text-appBanner">Team</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div key={index} variants={fadeUpItem}>
                                <TeamCard
                                    image={member.image}
                                    name={member.name}
                                    role={member.role}
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
