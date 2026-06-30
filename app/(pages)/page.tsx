"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion';

// Component Imports
import Header2 from '@/app/components/dusacomponent/Header2';
import Footer from '@/app/components/dusacomponent/Footer'
import Banner from '@/app/components/dusacomponent/dusawelcomepage/WelcomePageBanner';
import PartnersMarquee from '@/app/components/newlandingpage/PartnersMarquee';
import WhatWeDo from '@/app/components/dusacomponent/WhatWeDo';
import AboutUsSection from '@/app/components/dusacomponent/dusawelcomepage/AboutUsSection';
import WhyChooseUs from '@/app/components/dusacomponent/dusawelcomepage/WhyChooseUs';
import CaseStudySlider from '@/app/components/dusacomponent/dusawelcomepage/CaseStudySlider';
import TestimonialCard from '@/app/components/dusacomponent/dusawelcomepage/TestimonialCard';

const testimonials = [
    {
        text: "DUSA CORE helped us rethink how our entire system operates. What started as a technology upgrade became a full operational transformation.",
        name: "BulQ"
    },
    {
        text: "The team at DUSA CORE delivered beyond expectations. Their strategic approach to system design transformed our digital infrastructure completely.",
        name: "SendBulq"
    },
    {
        text: "Working with DUSA CORE was a game-changer. They brought clarity to complex challenges and built solutions that scaled with our growth.",
        name: "Dusa"
    }
];

// --- PHYSICS VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { 
            type: "spring" as const, 
            stiffness: 260,         
            damping: 20,            
            mass: 1                 
        }
    }
};

const LandingPage = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Auto-scroll State & Ref for Testimonials
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Auto-scroll logic strictly for mobile/tablet devices
  useEffect(() => {
      const interval = setInterval(() => {
          if (!isInteracting && scrollRef.current && window.innerWidth < 1024) {
              const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
              
              if (scrollLeft + clientWidth >= scrollWidth - 10) {
                  scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              } else {
                  scrollRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
              }
          }
      }, 4000); 

      return () => clearInterval(interval);
  }, [isInteracting]);

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
      
      {/* =========================================
          HYBRID RESPONSIVE TESTIMONIALS
      ========================================= */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Hides native scrollbar while retaining functionality */}
        <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>

        <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center tracking-wide">
                Client <span className="text-appBanner">Testimonials</span>
            </h2>

            <motion.div 
                ref={scrollRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => setIsInteracting(true)}
                onMouseLeave={() => setIsInteracting(false)}
                onTouchStart={() => setIsInteracting(true)}
                onTouchEnd={() => setIsInteracting(false)}
                className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar pb-8 lg:pb-0 items-stretch"
            >
                {testimonials.map((item, index) => (
                    <motion.div 
                        key={index} 
                        variants={itemVariants}
                        whileHover={{ 
                            y: -10, 
                            transition: { type: "spring", stiffness: 400, damping: 10 } 
                        }}
                        /* Enforces strict width on mobile to prevent stretching */
                        className="w-[85vw] sm:w-[340px] lg:w-full shrink-0 snap-center h-full flex flex-col"
                    >
                        {/* Forces text to wrap inside the fixed container width */}
                        <div className="h-full w-full block whitespace-normal break-words">
                            <TestimonialCard
                                text={item.text}
                                name={item.name}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>
      
      <Footer />
      
      {/* Floating Action Menu Included if you want to use it globally */}
      {/* <FloatingActionMenu /> */}
    </div>
  )
}

export default LandingPage