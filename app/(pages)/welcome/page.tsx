"use client"
import Header2 from '@/app/components/newlandingpage/Header2';
import React, { useState } from 'react'
import SignUpWithBulq from '@/app/components/newlandingpage/SignUpWithBulq';
import Footer from '@/app/components/newlandingpage/Footer'
import Banner from '@/app/components/newlandingpage/Banner';
import BannerWithStrip from '@/app/components/newlandingpage/PartnersMarquee';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';

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
      <Footer />

    </div>
  )
}

export default LandingPage