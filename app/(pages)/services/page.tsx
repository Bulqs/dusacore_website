"use client";

import React, { useState } from "react";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import contactBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
import { servicesData } from "@/data/servicesData";
import ServiceTabNav from "@/app/components/dusacomponent/dusaservicepage/ServiceTabNav";
import ServiceDetailPanel from "@/app/components/dusacomponent/dusaservicepage/ServiceDetailPanel";
import ServiceGridCards from "@/app/components/dusacomponent/dusaservicepage/ServiceGridCards";
import { useSearchParams } from "next/navigation";

function ServicesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  const activeService = servicesData.find((s) => s.id === activeTab);

  return (
    <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
      <Header2
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <Banner
        image={contactBanner}
        title="Our Services"
        description="World-class technology solutions, custom software engineering, and digital transformation built for scale."
        alt="DUSACORE Services Banner"
      />

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-appTitleBgColor mt-4 tracking-tight">
            Architecting Robust Digital Ecosystems
          </h2>
          <p className="text-gray-900 mt-5 text-base sm:text-lg leading-relaxed">
            DUSACORE integrates systems engineering, automation, and deep domain expertise to deliver enterprise-grade performance. Discover our technical capabilities below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ServiceTabNav
            services={servicesData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden min-h-[500px]">
            {activeService && <ServiceDetailPanel service={activeService} />}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
              Architectural Capability Overview
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Explore all our functional domains organized to manage critical institutional processes.
            </p>
          </div>

          <ServiceGridCards
            services={servicesData}
            onCardClick={(id) => {
              setActiveTab(id);
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
