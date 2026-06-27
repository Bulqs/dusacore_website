"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Header2 from '@/app/components/dusacomponent/Header2';
import TeamCard from '@/app/components/dusacomponent/TeamCard';
import Footer from '@/app/components/dusacomponent/Footer';
import Banner from '@/app/components/dusacomponent/Banner';

// Image Imports
import teamBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
import akinwale from '@/public/images/dusacoreimages/dusateam/Akinwale Olawale Ridwan.jpeg';
import edifon from '@/public/images/dusacoreimages/dusateam/Edifon Emmanuel Jimmy.jpeg';
import fatimah from '@/public/images/dusacoreimages/dusateam/Fatimah Hammed Omoshalewa.jpeg';
import hammed from '@/public/images/dusacoreimages/dusateam/Hammed Ridawan Olaide.jpeg';
import umar from '@/public/images/dusacoreimages/dusateam/Umar Ibrahim A.jpeg';
import bukola from '@/public/images/dusacoreimages/dusateam/Ganiyat Bukola Shittu.jpeg';

// --- PREMIUM ANIMATION VARIANTS ---
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.15,
            delayChildren: 0.1
        } 
    }
};

const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            type: "spring" as const, 
            stiffness: 260, 
            damping: 20 
        } 
    }
};

const team = [
    { name: "Hammed Ridwan Olaide", role: "Chief Executive Officer", image: hammed },
    { name: "Akinwale Olawale Ridwan", role: "Chief Creative Designer", image: akinwale },
    { name: "Edifon Emmanuel Jimmy", role: "Chief Artificial Intelligence Officer", image: edifon },
    { name: "Umar Ibrahim Ayobami", role: "Chief Experience Officer", image: umar },
    { name: "Fatimah Hammed Omoshalewa", role: "Chief Growth", image: fatimah },
    { name: "Ganiyat Bukola Shittu", role: "Chief Product Officer", image: bukola }, // Note: Add image import when available
];

export default function OurTeamPage() {
    function setIsLoginOpen(_: boolean) {}
    function setIsRegisterOpen(_: boolean) {}

    return (
        <div className="w-full flex flex-col relative overflow-hidden">
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

            <section className="w-full bg-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Animation */}
                    <motion.div 
                        initial="hidden" 
                        whileInView="show" 
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer} 
                        className="mb-12 sm:mb-16 text-center md:text-left"
                    >
                        <motion.h2 variants={fadeUpItem} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-appTitleBgColor tracking-tight">
                            DUSA <span className="text-appBanner">Team</span>
                        </motion.h2>
                    </motion.div>

                    {/* Grid Animation */}
                    <motion.div 
                        initial="hidden" 
                        whileInView="show" 
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer} 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                    >
                        {team.map((member, index) => {
                            // Generate a clean URL slug (e.g., "hammed-ridwan-olaide")
                            const slug = member.name.toLowerCase().replace(/\s+/g, '-');
                            
                            return (
                                <motion.div 
                                    key={index} 
                                    variants={fadeUpItem}
                                    // The premium hover lift interaction
                                    whileHover={{ 
                                        y: -12, 
                                        transition: { type: "spring", stiffness: 400, damping: 15 } 
                                    }}
                                    className="h-full"
                                >
                                    {/* Wraps the card so the whole thing is clickable to their dedicated page */}
                                    <Link href={`/team/${slug}`} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-appPurple rounded-3xl">
                                        <TeamCard
                                            image={member.image}
                                            name={member.name}
                                            role={member.role}
                                        />
                                    </Link>
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

// "use client";

// import React from 'react';
// import { motion, Variants } from 'framer-motion';
// import Header2 from '@/app/components/dusacomponent/Header2';
// import TeamCard from '@/app/components/dusacomponent/TeamCard';
// import Footer from '@/app/components/dusacomponent/Footer';
// import Banner from '@/app/components/dusacomponent/Banner';
// import teamBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
// import akinwale from '@/public/images/dusacoreimages/dusateam/Akinwale Olawale Ridwan.jpeg';
// import edifon from '@/public/images/dusacoreimages/dusateam/Edifon Emmanuel Jimmy.jpeg';
// import fatimah from '@/public/images/dusacoreimages/dusateam/Fatimah Hammed Omoshalewa.jpeg';
// import hammed from '@/public/images/dusacoreimages/dusateam/Hammed Ridawan Olaide.jpeg';
// import umar from '@/public/images/dusacoreimages/dusateam/Umar Ibrahim A.jpeg';

// const staggerContainer: Variants = {
//     hidden: { opacity: 0 },
//     show: { opacity: 1, transition: { staggerChildren: 0.1 } }
// };

// const fadeUpItem: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
// };

// const team = [
//     { name: "Hammed Ridwan Olaide", role: "Chief Executive Officer", image: hammed },
//     { name: "Akinwale Olawale Ridwan", role: "Chief Creative Designer", image: akinwale },
//     { name: "Edifon Emmanuel Jimmy", role: "Chief Artificial Intelligence Officer", image: edifon },
//     { name: "Umar Ibrahim Ayobami", role: "Chief Experience Officer", image: umar },
//     { name: "Fatimah Hammed Omoshalewa", role: "Chief Growth", image: fatimah },
//     { name: "Ganiyat Bukola Shittu", role: "Chief Product Manager" },
// ];

// export default function OurTeamPage() {
//     function setIsLoginOpen(_: boolean) {}
//     function setIsRegisterOpen(_: boolean) {}

//     return (
//         <div className="w-full flex flex-col relative">
//             <Header2
//                 onLoginClick={() => setIsLoginOpen(true)}
//                 onRegisterClick={() => setIsRegisterOpen(true)}
//             />

//             <Banner
//                 image={teamBanner}
//                 title="Our Team"
//                 description="We design, build, and optimize digital systems that improve efficiency, enable better decision-making, and create measurable business value. Our work sits at the intersection of strategy, engineering, and design where business needs are translated into scalable technological systems."
//                 alt="Our Team Banner"
//             />

//             <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div initial="hidden" animate="show" variants={staggerContainer} className="mb-12 sm:mb-16 text-left">
//                         <motion.h2 variants={fadeUpItem} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor">
//                             Dusa <span className="text-appBanner">Team</span>
//                         </motion.h2>
//                     </motion.div>

//                     <motion.div initial="hidden" animate="show" variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {team.map((member, index) => (
//                             <motion.div key={index} variants={fadeUpItem}>
//                                 <TeamCard
//                                     image={member.image}
//                                     name={member.name}
//                                     role={member.role}
//                                 />
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }
