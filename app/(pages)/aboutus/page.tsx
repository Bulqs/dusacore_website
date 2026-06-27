"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import aboutBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
import Header2 from '@/app/components/dusacomponent/Header2';
import Banner from '@/app/components/dusacomponent/Banner';
import WhoWeAre from '@/app/components/dusacomponent/dusaaboutuspage/WhoWeAre';
import OurVision from '@/app/components/dusacomponent/dusaaboutuspage/OurVision';
import OurMission from '@/app/components/dusacomponent/dusaaboutuspage/OurMission';
import WhatWeDo from '@/app/components/dusacomponent/WhatWeDo';
import Footer from '@/app/components/dusacomponent/Footer';

// --- PREMIUM SCROLL ANIMATION VARIANTS ---
const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            type: "spring", 
            stiffness: 120, 
            damping: 20, 
            mass: 1 
        } 
    }
};

export default function AboutUsPage() {
    // Fixed the error-throwing dummy functions with proper state
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <div className="w-full flex flex-col relative bg-slate-50 overflow-hidden">
            <Header2
                onLoginClick={() => setIsLoginOpen(true)}
                onRegisterClick={() => setIsRegisterOpen(true)}
            />

            <Banner
                image={aboutBanner}
                title="About Us"
                description="We design, build, and optimize digital systems that improve efficiency, enable better decision-making, and create measurable business value. Our work sits at the intersection of strategy, engineering, and design where business needs are translated into scalable technological systems."
                alt="About Us Banner"
            />

            <main className="flex flex-col w-full">
                {/* Each section now elegantly slides up as the user scrolls to it */}
                <motion.div
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <WhoWeAre />
                </motion.div>

                <motion.div
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <OurVision />
                </motion.div>

                <motion.div
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <OurMission />
                </motion.div>

                <motion.div
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <WhatWeDo />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

// "use client";

// import React from 'react';
// import aboutBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
// import Header2 from '@/app/components/dusacomponent/Header2';
// import Banner from '@/app/components/dusacomponent/Banner';
// import WhoWeAre from '@/app/components/dusacomponent/dusaaboutuspage/WhoWeAre';
// import OurVision from '@/app/components/dusacomponent/dusaaboutuspage/OurVision';
// import OurMission from '@/app/components/dusacomponent/dusaaboutuspage/OurMission';
// import WhatWeDo from '@/app/components/dusacomponent/WhatWeDo';
// import Footer from '@/app/components/dusacomponent/Footer';

// export default function AboutUsPage() {
//     function setIsLoginOpen(arg0: boolean): void {
//         throw new Error('Function not implemented.');
//     }

//     function setIsRegisterOpen(arg0: boolean): void {
//         throw new Error('Function not implemented.');
//     }

//     return (
//         <div className="w-full flex flex-col relative bg-red-700">
//             <Header2
//                 onLoginClick={() => setIsLoginOpen(true)}
//                 onRegisterClick={() => setIsRegisterOpen(true)}
//             />

//             <Banner
//                 image={aboutBanner}
//                 title="About Us"
//                 description="We design, build, and optimize digital systems that improve efficiency, enable better decision-making, and create measurable business value. Our work sits at the intersection of strategy, engineering, and design where business needs are translated into scalable technological systems."
//                 alt="About Us Banner"
//             />

//             <WhoWeAre />

//             <OurVision />

//             <OurMission />

//             <WhatWeDo />

//             <Footer />
//         </div>
//     );
// }
