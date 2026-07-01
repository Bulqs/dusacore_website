"use client"
import React, { useState } from 'react'

// Component Imports
import Header2 from '@/app/components/dusacomponent/Header2';
import Footer from '@/app/components/dusacomponent/Footer'
import Banner from '@/app/components/dusacomponent/dusawelcomepage/WelcomePageBanner';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';
import WhatWeDo from '@/app/components/dusacomponent/WhatWeDo';
import AboutUsSection from '@/app/components/dusacomponent/dusawelcomepage/AboutUsSection';
import WhyChooseUs from '@/app/components/dusacomponent/dusawelcomepage/WhyChooseUs';
import CaseStudySlider from '@/app/components/dusacomponent/dusawelcomepage/CaseStudySlider';
import TestimonialsSection from '@/app/components/dusacomponent/dusawelcomepage/TestimonialsSection';

const LandingPage = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Helper functions for a smooth swap
  const openLogin = () => { setIsRegisterOpen(false); setIsLoginOpen(true); }
  const openRegister = () => { setIsLoginOpen(false); setIsRegisterOpen(true); }

  return (
    <div className="w-full flex flex-col relative">
      <Header2
        onLoginClick={() => setIsLoginOpen(true)} 
        onRegisterClick={() => setIsRegisterOpen(true)} 
      />
      <Banner />
      <PartnersMarquee />
      <WhatWeDo />
      <AboutUsSection />
      <WhyChooseUs />
      <CaseStudySlider />
      
      <TestimonialsSection />
      
      <Footer />
      
      {/* Floating Action Menu Included if you want to use it globally */}
      {/* <FloatingActionMenu /> */}
    </div>
  )
}

export default LandingPage