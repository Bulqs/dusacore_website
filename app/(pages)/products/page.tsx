"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { 
  ShoppingCart, 
  RefreshCcw, 
  Truck, 
  CalendarCheck, 
  Store, 
  Palette, 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Bot,
  Terminal,
  MonitorSmartphone,
  CreditCard,
  Scale,
  BarChart3
} from "lucide-react";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import productBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
import { FiCalendar, FiX } from "react-icons/fi";

// --- "5D" SPATIAL ANIMATION VARIANTS ---
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const showcaseVariants: Variants = {
  enter: { 
    opacity: 0, 
    rotateY: -25, 
    rotateX: 10, 
    scale: 0.9, 
    z: -200,
    filter: "blur(10px)"
  },
  center: { 
    opacity: 1, 
    rotateY: 0, 
    rotateX: 0, 
    scale: 1, 
    z: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20, mass: 1.2 } 
  },
  exit: { 
    opacity: 0, 
    rotateY: 25, 
    rotateX: -10, 
    scale: 0.95, 
    z: -100,
    filter: "blur(10px)",
    transition: { duration: 0.3 } 
  }
};

const modalBackdrop: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
};

const modalContent: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
};

// ========================================================
// CONSULTATION MODAL COMPONENT (INLINE GOOGLE CALENDAR)
// ========================================================
const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 sm:p-6">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh] max-h-[800px]">
                
                {/* Header */}
                <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-6 text-white flex justify-between items-center shrink-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <FiCalendar size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Schedule a Demo</h2>
                            <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Select a time to see our architecture in action.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Google Calendar Iframe Container */}
                <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
                            <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
                        </div>
                    )}
                    <iframe 
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eseMkYNDpPH0i9mjQTQkQcSe0ZJsXOyKzQomQLJzN7EVC-ackhxEFnf4x5zKe4_rk0PRC7YR4?gv=true" 
                        style={{ border: 0 }} 
                        width="100%" 
                        height="100%" 
                        className="flex-1 w-full h-full"
                        onLoad={() => setIsLoading(false)}
                    ></iframe>
                </div>
            </motion.div>
        </motion.div>
    );
};

const productsData = [
  {
    id: "ecommerce-engine",
    icon: ShoppingCart,
    title: "Enterprise E-Commerce Engine",
    tagline: "Scalable digital retail infrastructure.",
    desc: "A high-conversion, multi-tenant capable e-commerce platform. Features advanced inventory tracking, dynamic pricing algorithms, and seamless payment gateway integrations right out of the box.",
    deepDive: "Built on a headless architecture, decoupling the React/Next.js frontend from the underlying Node.js/Spring Boot microservices. We utilize Redis for sub-millisecond cart caching, PostgreSQL for transactional integrity, and Elasticsearch for lightning-fast product discovery.",
    features: ["Multi-vendor & Single-vendor modes", "Abandoned cart recovery automation", "AI-driven product recommendations", "Advanced analytics dashboard"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
    color: "#4B0163"
  },
  {
    id: "fintech-bdc",
    icon: RefreshCcw,
    title: "Fintech BDC Application",
    tagline: "Secure Bureau De Change & Remittance Platform.",
    desc: "A military-grade financial application designed for BDCs and currency exchange operators. Features real-time FX rate synchronization, multi-currency wallets, and strict KYC/AML compliance workflows.",
    deepDive: "Engineered with strict zero-trust security protocols. We implement WebSocket connections for real-time currency ticker updates, AES-256 payload encryption, and immutable ledger routing to ensure every transaction is completely auditable and tamper-proof.",
    features: ["Real-time global exchange rates via API", "Automated KYC & Identity verification", "Secure multi-currency digital wallets", "Automated ledger and compliance reporting"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    color: "#0284c7"
  },
  {
    id: "logistics-platform",
    icon: Truck,
    title: "Logistics B2B & B2C Platform",
    tagline: "Intelligent fleet and parcel tracking.",
    desc: "A comprehensive logistics management solution supporting both B2B freight and B2C last-mile delivery. Includes live map tracking, driver allocation algorithms, and dynamic pricing models.",
    deepDive: "Leverages graph-based pathfinding algorithms (like A* and Dijkstra) combined with Google Maps Matrix APIs to dynamically calculate the most fuel-efficient delivery routes. WebSockets push real-time GPS telemetry data directly to the user dashboard.",
    features: ["Real-time GPS fleet tracking", "Automated dispatch and routing algorithms", "Digital Proof of Delivery (ePOD)", "Customized corporate billing modules"],
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000",
    color: "#059669"
  },
  {
    id: "marketing-booking",
    icon: CalendarCheck,
    title: "Automated Booking & Marketing Hub",
    tagline: "Client acquisition on autopilot.",
    desc: "A powerhouse marketing platform tailored for service-based businesses. Seamlessly combines automated appointment scheduling with instant payment capture and CRM follow-up sequences.",
    deepDive: "Powered by an event-driven architecture using message brokers (like RabbitMQ or Apache Kafka) to guarantee delivery of SMS and Email sequences without dropping requests. Features robust webhook integrations to interface cleanly with external CRMs.",
    features: ["Smart calendar sync & self-booking", "Automated deposit/payment collection", "SMS & Email reminder sequences", "Lead capture and pipeline management"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    color: "#ea580c"
  },
  {
    id: "markethub-omni",
    icon: Store,
    title: "Omni-Service MarketHub",
    tagline: "The ultimate B2C marketplace and institutional collector.",
    desc: "A highly versatile hybrid marketplace where users can purchase merchandise or hire professional services. Includes specialized sub-modules for institutions to collect offerings and issue automated alerts.",
    deepDive: "Constructed utilizing a multi-tenant database schema to securely isolate organizational data. Features a custom escrow payment routing module that temporarily holds funds, releasing them to service providers only upon milestone completion triggers.",
    features: ["Merchandise & Service-booking storefronts", "Custom donation/offering collection modules", "Automated SMS/Email institutional alerts", "Escrow & milestone-based payouts"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000",
    color: "#9333ea"
  },
  {
    id: "arts-gallery",
    icon: Palette,
    title: "Digital Arts & Artifacts Platform",
    tagline: "Premium digital galleries for physical art.",
    desc: "A visually stunning, high-resolution platform designed specifically for the sale of artifacts, wall paints, and sculptures. Features immersive galleries and secure, high-ticket payment processing.",
    deepDive: "Heavily optimized for performance using edge CDNs (Content Delivery Networks) to serve massive 4K and 3D asset files instantly globally. Built with WebGL support for interactive 3D sculpture viewing and lazy-loading architecture to guarantee high Google Lighthouse performance scores.",
    features: ["High-res 3D/Zoomable image galleries", "Artist portfolio and management portals", "Secure escrow for high-ticket transactions", "Automated global shipping integrations"],
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1000",
    color: "#be123c"
  },
  {
    id: "ai-support-agent",
    icon: Bot,
    title: "Omnichannel AI Support Agent",
    tagline: "Autonomous customer service and intelligent routing.",
    desc: "Deploy a highly customizable, LLM-powered chatbot trained exclusively on your organization's unique knowledge base. Seamlessly integrated across WhatsApp, direct voice calling, and web platforms to automate 24/7 customer support.",
    deepDive: "Orchestrated using a strict RAG (Retrieval-Augmented Generation) pipeline backed by a Vector Database (Pinecone) to ensure the AI never hallucinates. Features specialized Speech-to-Text (STT) models trained specifically to recognize local dialects (Hausa, Igbo, Yoruba) and code-switching via Twilio Voice API.",
    features: ["Hausa, Igbo, & Yoruba Voice Recognition", "WhatsApp Business API & VoIP Call integration", "Custom Knowledge Base Training (RAG Pipeline)", "Sentiment analysis & human-agent handoff"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    color: "#14b8a6"
  },
  {
    id: "enterprise-analytics-powerbi",
    icon: BarChart3,
    title: "Enterprise Analytics & PowerBI",
    tagline: "Actionable intelligence across all enterprise operations.",
    desc: "Centralize your organization's fragmented data into a unified, interactive PowerBI dashboard. Gain real-time visibility into financial, operational, and performance metrics to drive data-backed executive decisions.",
    deepDive: "We engineer custom ETL (Extract, Transform, Load) pipelines to securely pull data from disparate legacy databases and third-party APIs. Data is structured in a central data warehouse and visualized through highly optimized, DAX-driven PowerBI models.",
    features: ["Custom PowerBI DAX modeling", "Automated ETL pipelines via Apache Airflow", "Real-time KPI & financial tracking", "Role-based access & row-level security"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    color: "#ca8a04"
  },
  {
    id: "fintech-reconciliation",
    icon: Scale,
    title: "Financial Reconciliation Engine",
    tagline: "Precision ledger matching for banks and fintechs.",
    desc: "An enterprise-grade reconciliation tool designed to automate the matching of millions of transactions across internal ledgers, payment gateways, and core banking systems with zero margin for error.",
    deepDive: "Built with high-throughput batch processing microservices using Java Spring Batch. It ingests massive MT940, CSV, and API data feeds concurrently, executing complex, multi-variable matching algorithms to detect exceptions, shortages, and overages instantly.",
    features: ["Multi-way automated ledger matching", "MT940 & Settlement report ingestion", "Exception handling & dispute workflows", "Comprehensive audit trails & PDF exports"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
    color: "#0f766e"
  },
  {
    id: "payment-gateway-collections",
    icon: CreditCard,
    title: "Unified Payment Gateway",
    tagline: "Secure, omni-channel payment processing infrastructure.",
    desc: "A highly reliable payment gateway architecture built for seamless B2B and B2C collections. Accept cards, bank transfers, USSD, and mobile money with instant settlement routing and robust fraud prevention.",
    deepDive: "Compliant with PCI-DSS standards, the architecture utilizes tokenization and asymmetric payload encryption. Featuring a resilient webhook notification system and automated retry queues to guarantee transaction finality even during network fluctuations.",
    features: ["Multi-channel processing (Card, USSD, Transfer)", "PCI-DSS compliant security architecture", "Automated split settlements for vendors", "Dynamic checkout APIs & SDK integration"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000",
    color: "#2563eb"
  },
  {
    id: "agency-pos-solution",
    icon: MonitorSmartphone,
    title: "Agency POS Infrastructure",
    tagline: "Scalable terminal management and agent networks.",
    desc: "Deploy and manage a vast network of physical Point-of-Sale (POS) terminals and mobile agents. Monitor agent liquidity, track hardware health, and process offline-to-online transactions reliably.",
    deepDive: "Powered by a lightweight Android OS application communicating via ISO 8583 protocols to a robust backend switch. Features end-to-end device management (MDM) capabilities, geo-fencing, and optimized offline queuing to ensure agents can operate in low-bandwidth environments.",
    features: ["ISO 8583 standard message switching", "Agent wallet & liquidity management", "Offline transaction queuing & sync", "Remote POS terminal diagnostics & MDM"],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1000",
    color: "#be185d"
  }
];

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState(productsData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the Demo Modal

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  return (
    <div className="w-full flex flex-col relative bg-slate-50 min-h-screen overflow-hidden">
      
      {/* Invisible custom scrollbar CSS for the 3D Card Content */}
      <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

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
          <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Zap className="w-4 h-4" /> Off-The-Shelf Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mt-6 tracking-tight">
            Software built for scale, <br className="hidden sm:block" />ready for deployment.
          </h2>
          <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed">
            Bypass months of development time. DUSA CORE offers robust, customizable architectures perfectly suited for diverse industrial sectors.
          </p>
        </div>

        {/* 5D INTERACTIVE SHOWCASE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          
          {/* LEFT: Product Selection List */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-3 relative z-20"
          >
            {productsData.map((product) => {
              const Icon = product.icon;
              const isActive = activeProduct.id === product.id;
              
              return (
                <motion.button
                  variants={listItemVariants}
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className={`w-full flex items-center gap-4 p-4 text-left rounded-2xl transition-all duration-300 border-2 outline-none group ${
                    isActive 
                      ? "bg-white border-[#4B0163] shadow-xl shadow-purple-900/10 scale-[1.02] z-10" 
                      : "bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-[#4B0163] text-white shadow-lg" : "bg-white text-gray-400 shadow-sm group-hover:text-[#4B0163]"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold truncate transition-colors ${isActive ? "text-[#4B0163]" : "text-gray-800"}`}>
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {product.tagline}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#4B0163] translate-x-1 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"}`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: The "5D" Deep Animated Showcase */}
          <div className="lg:col-span-8 relative h-[650px] sm:h-[750px] w-full" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                variants={showcaseVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
                style={{ transformStyle: "preserve-3d" }} 
              >
                
                {/* 3D Image Header (Fixed Height) */}
                <div className="relative w-full h-[40%] shrink-0 overflow-hidden bg-gray-900">
                  <Image 
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    fill
                    className="object-cover opacity-80"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  
                  {/* Floating Elements over image */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between" style={{ transform: "translateZ(50px)" }}>
                    <div>
                      <span 
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-3 inline-block shadow-lg"
                        style={{ backgroundColor: activeProduct.color }}
                      >
                        Ready to Deploy
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {activeProduct.title}
                      </h2>
                    </div>
                    <div className="hidden sm:flex w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20 text-white">
                      <activeProduct.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>

                {/* Content Body (Scrollable area) */}
                <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-8 flex flex-col" style={{ transform: "translateZ(30px)" }}>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {activeProduct.desc}
                  </p>

                  {/* Technical Deep Dive Block */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Technical Architecture
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed bg-gray-50 p-4 border-l-2 rounded-r-lg" style={{ borderColor: activeProduct.color }}>
                      {activeProduct.deepDive}
                    </p>
                  </div>

                  {/* Features Matrix */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Core System Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white border border-gray-100 p-3.5 rounded-xl shadow-sm">
                          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: activeProduct.color }} />
                          <span className="text-sm font-semibold text-gray-700 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call To Action */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
                    <div className="text-sm text-gray-500 font-medium text-center sm:text-left">
                      Need custom modifications? <br className="hidden sm:block" /><span className="text-[#4B0163] font-bold">We handle that too.</span>
                    </div>
                    {/* Triggers the Schedule Demo Modal */}
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full sm:w-auto bg-appBlack hover:bg-[#4B0163] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
                    >
                      Request Demo 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
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

      {/* Render the Google Calendar Modal fluidly on the page */}
      <AnimatePresence>
        {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}