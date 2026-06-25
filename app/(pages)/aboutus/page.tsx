"use client";

import React from 'react';
import aboutBanner from '@/public/images/dusacoreimages/dusacoreabout.jpg';
import Header2 from '@/app/components/dusacomponent/Header2';
import Banner from '@/app/components/dusacomponent/Banner';
import WhoWeAre from '@/app/components/dusacomponent/dusaaboutuspage/WhoWeAre';
import OurVision from '@/app/components/dusacomponent/dusaaboutuspage/OurVision';
import OurMission from '@/app/components/dusacomponent/dusaaboutuspage/OurMission';
import WhatWeDo from '@/app/components/dusacomponent/WhatWeDo';
import Footer from '@/app/components/dusacomponent/Footer';

export default function AboutUsPage() {
    function setIsLoginOpen(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

    function setIsRegisterOpen(arg0: boolean): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="w-full flex flex-col relative bg-red-700">
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

            <WhoWeAre />

            <OurVision />

            <OurMission />

            <WhatWeDo />

            <Footer />
        </div>
    );
}
