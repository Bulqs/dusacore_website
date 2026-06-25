"use client"
import Header2 from '@/app/components/dusacomponent/Header2';
import React, { useState } from 'react'
import SignUpWithBulq from '@/app/components/newlandingpage/SignUpWithBulq';
import Footer from '@/app/components/dusacomponent/Footer'
import Banner from '@/app/components/newlandingpage/Banner';
import BannerWithStrip from '@/app/components/newlandingpage/PartnersMarquee';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';
import TestimonialCard from '@/app/components/dusacomponent/TestimonialCard';
import CaseStudySlider from '@/app/components/dusacomponent/CaseStudySlider';

// ... (your landing page imports)
// import RegisterModal from '../components/RegisterModal' 
// import LoginModal from '../components/LoginModal' 

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
      <CaseStudySlider />
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
            Client <span className="text-appBanner">Testimonials</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              text="DUSA CORE helped us rethink how our entire system operates. What started as a technology upgrade became a full operational transformation."
              name="BulQ"
            />
            <TestimonialCard
              text="The team at DUSA CORE delivered beyond expectations. Their strategic approach to system design transformed our digital infrastructure completely."
              name="SendBulq"
            />
            <TestimonialCard
              text="Working with DUSA CORE was a game-changer. They brought clarity to complex challenges and built solutions that scaled with our growth."
              name="Dusa"
            />
          </div>
        </div>
      </section>
      <Footer />

    </div>
  )
}

export default LandingPage