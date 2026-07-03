"use client";

import React, { useState, Suspense } from "react";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import productBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
import { Zap } from "lucide-react";
import { productsData } from "@/data/productsData";
import ProductTabNav from "@/app/components/dusacomponent/dusaproductpage/ProductTabNav";
import ProductDetailPanel from "@/app/components/dusacomponent/dusaproductpage/ProductDetailPanel";
import ProductGridCards from "@/app/components/dusacomponent/dusaproductpage/ProductGridCards";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || productsData[0].id);

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  const activeProduct = productsData.find((p) => p.id === activeTab);

  return (
    <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
      <Header2
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <Banner
        image={productBanner}
        title="Ready-to-Deploy Products"
        description="Accelerate your digital transformation with our proprietary, enterprise-grade software solutions engineered for immediate market impact."
        alt="DUSACORE Products Banner"
      />

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Zap className="w-4 h-4" /> Off-The-Shelf Solutions
          </span> */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-appTitleBgColor mt-4 tracking-tight">
            Software built for scale, ready for deployment.
          </h2>
          <p className="text-gray-900 mt-5 text-base sm:text-lg leading-relaxed">
            Bypass months of development time. DUSA CORE offers robust, customizable architectures perfectly suited for diverse industrial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          <ProductTabNav
            products={productsData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeProduct && <ProductDetailPanel product={activeProduct} />}
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
              Product Portfolio Overview
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Explore our complete catalog of ready-to-deploy software solutions engineered for diverse industrial needs.
            </p>
          </div>

          <ProductGridCards
            products={productsData}
            onCardClick={(id: string) => {
              setActiveTab(id);
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
          />
        </div>
      </section>

      {/* ALL PRODUCTS GRID CARDS */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
              Explore All Solutions
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Select a product below to view its technical architecture and request a demonstration.
            </p>
          </div>

          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {productsData.map((product, index) => {
              const GridIcon = product.icon;
              return (
                <motion.div
                  key={index}
                  variants={listItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setActiveProduct(product);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
                      <GridIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2 leading-tight">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {product.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate pr-2">
                      {product.features.slice(0, 1).join(" • ")}
                    </span>
                    <span className="text-xs font-bold text-[#4B0163] bg-purple-50 px-2 py-1 rounded-md whitespace-nowrap">
                      View Specs
                    </span>
                  </div>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
