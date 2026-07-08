"use client";

import React, { useState, Suspense, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight, X, BookOpen, Mail, Building, CheckCircle2, Phone, Calendar as CalendarIcon,
  ShieldCheck, AlertCircle, Code, Brain, Cloud, Palette, Lightbulb, Activity, Clock,
  Cpu, PenTool, Briefcase, Server, Award, BarChart, Terminal
} from "lucide-react";
import { useSearchParams } from "next/navigation";

// --- EXTERNAL IMPORTS ---
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import contactBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";

// ==========================================
// INLINED DATA TO GUARANTEE COMPILATION & RETAIN STRUCTURE
// ==========================================
const WHATSAPP_NUMBER = "23489044698791"; 

const BANK_ACCOUNTS = [
  { bank: "Guaranty Trust Bank", currency: "NGN", name: "DUSA CORE SERVICES", number: "0123456789" },
  { bank: "Zenith Bank", currency: "NGN", name: "DUSA CORE SERVICES", number: "9876543210" }
];

const servicesData = [
  {
    id: "software-engineering",
    icon: Code,
    title: "Custom Software Engineering",
    tagline: "High-Availability, Distributed Enterprise Applications",
    desc: "We engineer fault-tolerant frontend and backend architectures tailored to substitute legacy operations with secure, modern digital infrastructure.",
    deepDive: "Our engineering philosophy focuses on system refactoring, modular design, and clean data isolation. From architecting synchronous banking pipelines to designing scalable service nodes, we construct solutions engineered for zero-downtime execution and rapid deployment.",
    techStack: ["React", "Next.js", "Vue", "Node.js", "Python", "Java", "Spring Boot", "TypeScript"],
    capabilities: [
      "Monolith decomposition & microservices design",
      "Transactional isolation & advanced database synchronization",
      "Asynchronous processing pipelines & automated document generation",
      "Secure API design with strict OAuth2 & JWT architectures",
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    color: "#4B0163",
  },
  {
    id: "ai-optimization",
    icon: Brain,
    title: "AI & Computational Optimization",
    tagline: "Deterministic Models & Advanced Analytics Pipelines",
    desc: "Deploy customized intelligence layers to solve highly complex operational and logistical bottlenecks using stochastic modeling and machine learning.",
    deepDive: "We build custom heuristic models, optimization matrices, and predictive analytics pipelines. Whether developing automated, multivariable resource allocation engines utilizing custom Genetic Algorithms or processing massive structured datasets, we bridge raw data with operational efficiency.",
    techStack: ["Python", "PyTorch", "TensorFlow", "Pandas/NumPy", "Genetic Algorithms", "Scikit-Learn"],
    capabilities: [
      "Combinatorial optimization & advanced heuristics modeling",
      "Predictive analytical modeling for industrial or logistics routing",
      "Custom AI room and resource allocation architectures",
      "Automated extraction, transformations, and data pipelining (ETL)",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    color: "#0284c7",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    tagline: "Scalable Cloud Architecture & Automated Delivery Pipelines",
    desc: "Design, deploy, and manage highly available cloud ecosystems with automated CI/CD pipelines for rapid, secure, and resilient software delivery.",
    deepDive: "We architect cloud-native solutions using Infrastructure as Code (IaC) to eliminate manual provisioning. By implementing advanced Kubernetes orchestration, automated testing pipelines, and robust observability stacks, we ensure zero-downtime deployments and limitless horizontal scalability.",
    techStack: ["AWS", "Google Cloud (GCP)", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins"],
    capabilities: [
      "Infrastructure as Code (IaC) provisioning and management",
      "Continuous Integration & Continuous Deployment (CI/CD) pipelines",
      "Kubernetes cluster orchestration and auto-scaling",
      "Advanced observability, centralized logging, and incident alerting",
    ],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000",
    color: "#059669",
  },
  {
    id: "rpa-transformation",
    icon: Cpu,
    title: "Robotic Process Automation (RPA)",
    tagline: "Autonomous Workflow Design & Hyper-Automation",
    desc: "Eliminate error-prone legacy operations through secure digital workforces and intelligent UI/API automation frameworks.",
    deepDive: "We target friction-dense corporate ecosystems to automate high-volume transaction processing and data reconciliation. By integrating industry-standard tools with rapid cloud applications, we orchestrate workflows that securely talk to legacy software, spreadsheets, and web services seamlessly.",
    techStack: ["BluePrism", "Microsoft Power Automate", "Oracle APEX", "UiPath", "Selenium Core"],
    capabilities: [
      "End-to-end business process modeling and script mapping",
      "Rapid low-code web app development via Oracle APEX systems",
      "Cognitive screen-scraping & automated document categorization",
      "Enterprise audit trail logging and exception handling compliance",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    color: "#ea580c",
  },
  {
    id: "product-design",
    icon: PenTool,
    title: "Product Design & Brand Identity",
    tagline: "Human-Centric Interface Design & Enterprise Brand Systems",
    desc: "Craft intuitive, conversion-optimized user experiences and cohesive brand identities that translate complex technical logic into seamless human interactions.",
    deepDive: "Our design philosophy bridges the gap between aesthetic excellence and behavioral psychology. We build comprehensive design systems, interactive high-fidelity prototypes, and data-driven UX architectures that ensure accessibility, engagement, and a unified brand presence across all digital touchpoints.",
    techStack: ["Figma", "Adobe CC", "Framer", "Prototyping", "Design Systems", "WCAG"],
    capabilities: [
      "Data-driven User Experience (UX) research and journey mapping",
      "High-fidelity User Interface (UI) design and interactive prototyping",
      "Scalable enterprise design systems and component libraries",
      "Brand identity formulation and visual strategy alignment",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
    color: "#9333ea",
  },
  {
    id: "product-ideation",
    icon: Lightbulb,
    title: "Product Ideation & Strategy",
    tagline: "Concept Validation & Minimum Viable Product (MVP) Engineering",
    desc: "Transform abstract business concepts into technically viable, market-ready product blueprints with rapid prototyping and strategic validation.",
    deepDive: "We apply design thinking and agile frameworks to deconstruct your vision. Through rigorous market analysis, technical feasibility studies, and user-centric ideation workshops, we architect comprehensive product roadmaps that minimize development risk and accelerate time-to-market.",
    techStack: ["Miro", "Notion", "Whimsical", "Agile/Scrum", "Design Thinking", "Lean Canvas"],
    capabilities: [
      "Technical feasibility analysis and development risk mitigation",
      "Minimum Viable Product (MVP) feature scoping and prioritization",
      "Interactive wireframing and proof-of-concept validation",
      "Go-to-market strategic product roadmapping",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    color: "#be123c",
  },
  {
    id: "consultation-services",
    icon: Briefcase,
    title: "Digital Transformation Consulting",
    tagline: "Strategic Technology Roadmaps & Enterprise Modernization",
    desc: "Partner with our elite engineering architects to audit legacy systems, align technology with business objectives, and drive digital transformation.",
    deepDive: "We provide executive-level technical advisory to guide C-suite decision-making. From auditing monolithic legacy codebases to drafting migration strategies for cloud adoption and AI integration, we deliver actionable, data-backed intelligence that guarantees measurable ROI on technological investments.",
    techStack: ["Enterprise Architecture", "SWOT Analysis", "TCO/ROI Modeling", "System Auditing", "IT Governance", "Compliance"],
    capabilities: [
      "Comprehensive legacy system audits and modernization roadmaps",
      "Cloud migration and AI adoption feasibility consulting",
      "Technical debt assessment and architecture refactoring plans",
      "Executive-level technological strategy and compliance advisory",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    color: "#14b8a6",
  },
  {
    id: "it-support",
    icon: Server,
    title: "Enterprise IT Support & Infrastructure",
    tagline: "Proactive System Administration & High-Availability Servers",
    desc: "Maintain secure production runtime environments with professional configuration management, server hardening, and network oversight.",
    deepDive: "We offer intermediate and advanced tier system administration support tailored for modern containerized architectures and bare-metal environments. We monitor application health logs, mitigate architectural vulnerabilities, and guarantee robust infrastructure operations for corporate applications.",
    techStack: ["Linux Server Environments", "Nginx", "Bash Scripting", "PostgreSQL", "MongoDB", "Network Security"],
    capabilities: [
      "Intermediate-level Linux server provisioning, tuning, and monitoring",
      "Relational and non-relational database tuning (PL/SQL & MongoDB query optimization)",
      "Continuous logging, backup automation, and server patch scheduling",
      "Network routing, load balancing, and firewall configuration",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000",
    color: "#6B21A8",
  },
  {
    id: "certifications-partnerships",
    icon: Award,
    title: "Certification Partnerships & Training",
    tagline: "Corporate Capacity Building & Industry Framework Alignment",
    desc: "Empower your technical teams and standardize your business delivery via partnerships with global technology certifying bodies.",
    deepDive: "We collaborate closely with premier international certificating organizations to provide highly specialized technical curriculum roadmaps, institutional professional validation, and enterprise-grade technological baseline training to align teams with world-class engineering paradigms.",
    techStack: ["Global Certificating Frameworks", "Agile/Scrum Methodologies", "DevOps Institute Standards", "ITIL Frameworks"],
    capabilities: [
      "Strategic alignment with international technology training boards",
      "Custom curriculum mapping for corporate full-stack and systems engineering",
      "Validation protocols for enterprise architecture compliance standards",
      "Coached training sprints across modern software development methodologies",
    ],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    color: "#ca8a04",
  },
  {
    id: "data-analysis-visualization",
    icon: BarChart,
    title: "Data Analysis & Visualization",
    tagline: "Actionable Business Intelligence & Interactive Dashboards",
    desc: "Transform raw, disparate data sources into clear, interactive visual narratives to drive data-informed executive decision-making.",
    deepDive: "We engineer comprehensive data pipelines that aggregate and structure complex datasets. By combining the heavy computational lifting of Python's data ecosystem with the rich visualization capabilities of enterprise BI tools, we uncover hidden trends, forecast outcomes, and present real-time metrics through intuitive, drill-down dashboards.",
    techStack: ["Power BI", "Tableau", "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL"],
    capabilities: [
      "Interactive executive dashboard design and real-time reporting",
      "Exploratory Data Analysis (EDA) and statistical modeling",
      "Data wrangling, cleansing, and aggregation from disparate sources",
      "Automated business intelligence pipelines and KPI tracking",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    color: "#2563eb", 
  }
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
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

// ==========================================
// INLINE COMPONENTS
// ==========================================
const ServiceTabNav = ({ services, activeTab, onTabChange }: any) => (
  <div className="lg:col-span-4 flex flex-col gap-3 relative z-20">
    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 pl-2">Service Domains</h4>
    {services.map((s: any) => {
      const Icon = s.icon;
      const isActive = activeTab === s.id;
      return (
        <button
          key={s.id}
          onClick={() => onTabChange(s.id)}
          className={`w-full flex items-center gap-4 p-4 text-left rounded-2xl transition-all duration-300 border-2 outline-none group ${
            isActive 
              ? "bg-white border-[#4B0163] shadow-xl shadow-purple-900/10 scale-[1.02] z-10" 
              : "bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md"
          }`}
        >
          <div className={`p-3 rounded-xl transition-colors duration-300 ${
            isActive ? "bg-[#4B0163] text-white shadow-md" : "bg-white text-gray-400 shadow-sm group-hover:text-[#4B0163]"
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-bold truncate transition-colors ${isActive ? "text-[#4B0163]" : "text-gray-800"}`}>
                {s.title}
            </h3>
            <p className="text-xs text-gray-500 truncate mt-1">
                {s.tagline}
            </p>
          </div>
          <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#4B0163] translate-x-1 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"}`} />
        </button>
      );
    })}
  </div>
);

// ==========================================
// MODALS
// ==========================================
const ServiceCalendarModal = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4 sm:p-6 backdrop-blur-sm">
            <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh] max-h-[800px]">
                <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-6 text-white flex justify-between items-center shrink-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <CalendarIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Discovery Consultation</h2>
                            <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Schedule your scoping and requirements gathering call.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                        <X size={20} />
                    </button>
                </div>
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

const ServiceModal = ({ service, onClose }: { service: any, onClose: () => void }) => {
  const [step, setStep] = useState<"deliverables" | "form" | "payment">("deliverables");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [payload, setPayload] = useState({ 
    title: "", gender: "", firstName: "", lastName: "", email: "", 
    phone: "", address: "", yearsOfExperience: "", age: "", 
    DOB: "", maritalStatus: "", occupation: "", reasonForApplication: "" 
  });
  const [uniqueCode, setUniqueCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEngageClick = () => setStep("form");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const generatedCode = `DUSA-SVC-${Math.floor(1000 + Math.random() * 9000)}-${service.id.substring(0,3).toUpperCase()}`;
    setUniqueCode(generatedCode);

    try {
      const url = '/api/enroll'; 
      
      const body = {
        dusaServiceRequest: {
          title: payload.title,
          gender: payload.gender,
          firstName: payload.firstName,
          lastName: payload.lastName,
          uniqueCode: generatedCode,
          email: payload.email,
          phone: payload.phone, 
          address: payload.address,
          companyAge: payload.yearsOfExperience,
          age: payload.age,
          dob: payload.DOB, 
          maritalStatus: payload.maritalStatus,
          companyName: payload.occupation,
          projectScope: payload.reasonForApplication,
          paymentStatus: "Pending Discovery",
          serviceRequested: service.title
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        console.warn("Failed to sync with internal server API. Operating in standalone mode.");
      } else {
        await response.json();
      }
    } catch (error) {
      console.warn("Fetch API unavailable. Moving to next step.");
    } finally {
      setIsSubmitting(false);
      setStep("payment");
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hello DUSA CORE!\n\nI have just submitted a service request. Here are my details:\n\n` +
      `*Name:* ${payload.title} ${payload.firstName} ${payload.lastName}\n` +
      `*Email:* ${payload.email}\n` +
      `*Service:* ${service.title}\n` +
      `*Tracking Code:* ${uniqueCode}\n\n` +
      `Please confirm receipt and next steps.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
    <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[150] p-4 sm:p-6 backdrop-blur-sm">
      <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* --- CMMI ENHANCED HEADER --- */}
        <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-6 text-white flex justify-between items-start shrink-0 relative z-10">
          <div className="w-full">
            <div className="flex justify-between items-start w-full">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm shadow-md">
                <service.icon size={24} />
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-extrabold tracking-wide">{service.title}</h2>
            <p className="text-sm font-medium text-white/80 mt-1 mb-4">Enterprise Service Delivery</p>
            
            {/* CMMI SDM Gate Notice */}
            <div className="bg-black/20 rounded-xl p-3.5 border border-white/10 flex items-center gap-3 shadow-inner">
               <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
               <p className="text-xs font-medium text-white/90 leading-tight">
                 <span className="font-bold text-white uppercase tracking-wider text-[10px]">CMMI-Aligned SDM Gate:</span> <br/>
                 SLA metrics applied. Mandatory scoping and discovery consultation required prior to project kick-off.
               </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-slate-50">
          
          {step === "deliverables" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Expected Capabilities
                </h4>
                <ul className="space-y-3">
                  {service.capabilities.map((module: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-[#4B0163] flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                      <span className="text-sm font-bold text-gray-700 leading-snug pt-0.5">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Base Investment</p>
                  <p className="text-3xl font-black text-[#4B0163]">Custom Quote</p>
                </div>
                <button onClick={handleEngageClick} className="w-full sm:w-auto bg-[#4B0163] hover:bg-purple-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95">
                  Begin Engagement <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
               <div className="text-center mb-6">
                  <h3 className="text-xl font-extrabold text-gray-900">Client Details</h3>
                  <p className="text-sm text-gray-500 mt-1">Enter your details to log this request and generate your unique tracking ID.</p>
               </div>
               
               {/* Exact 13 Field Form Retained for Structure */}
               <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Title *</label>
                        <select required value={payload.title} onChange={e => setPayload({...payload, title: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Select...</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Gender *</label>
                        <select required value={payload.gender} onChange={e => setPayload({...payload, gender: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">First Name *</label>
                        <input required type="text" value={payload.firstName} onChange={e => setPayload({...payload, firstName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="John" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Last Name *</label>
                        <input required type="text" value={payload.lastName} onChange={e => setPayload({...payload, lastName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address *</label>
                        <input required type="email" value={payload.email} onChange={e => setPayload({...payload, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="john@company.com" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number *</label>
                        <input required type="tel" value={payload.phone} onChange={e => setPayload({...payload, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="08012345678" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Age (Optional)</label>
                        <input type="number" min="16" max="99" value={payload.age} onChange={e => setPayload({...payload, age: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="25" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Date Request Submitted *</label>
                        <input required type="date" value={payload.DOB} onChange={e => setPayload({...payload, DOB: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Company Type *</label>
                        <select required value={payload.maritalStatus} onChange={e => setPayload({...payload, maritalStatus: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Select status...</option>
                            <option value="Startup">Startup</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="SME">SME</option>
                            <option value="Individual">Individual</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Company Age (Years) *</label>
                        <input required type="number" min="0" max="50" value={payload.yearsOfExperience} onChange={e => setPayload({...payload, yearsOfExperience: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. 2" />
                    </div>
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Company Name *</label>
                      <input required type="text" value={payload.occupation} onChange={e => setPayload({...payload, occupation: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. Acme Logistics Corp" />
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Company Address *</label>
                      <input required type="text" value={payload.address} onChange={e => setPayload({...payload, address: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="123 Tech Street, City" />
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Project Scope / Reason for Inquiry *</label>
                      <textarea required value={payload.reasonForApplication} onChange={e => setPayload({...payload, reasonForApplication: e.target.value})} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all resize-none" placeholder="Briefly state your project requirements or challenges..." />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button type="button" disabled={isSubmitting} onClick={() => setStep("deliverables")} className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50">Back</button>
                    <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#4B0163] hover:bg-purple-900 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2">
                      {isSubmitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                      ) : "Generate Track ID"}
                    </button>
                  </div>
               </form>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
                
                {/* --- CMMI SDM ACTION ALERT --- */}
                <div className="w-full bg-yellow-50 p-5 rounded-2xl border border-yellow-200 flex items-start gap-4 text-left shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-400"></div>
                    <AlertCircle className="text-yellow-600 flex-shrink-0 w-6 h-6 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-extrabold text-yellow-900 mb-1">Action Required: SDM Discovery Call</h4>
                        <p className="text-xs text-yellow-800 leading-relaxed font-medium">
                            Your service tracking code is <span className="font-bold font-mono bg-yellow-200/50 px-1.5 py-0.5 rounded text-yellow-900">{uniqueCode}</span>. To initiate this service, you must complete the mandatory scoping call below.
                        </p>
                    </div>
                </div>

                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100 mt-2 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Request Logged!</h3>
                  <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto font-medium">Please schedule your discovery session with our engineering architects below. For immediate assistance or documentation transmission, reach out via WhatsApp.</p>
                </div>

                <div className="w-full bg-purple-50 border-2 border-purple-200 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Your Unique Tracking ID</span>
                  <span className="text-3xl font-black text-[#4B0163] tracking-widest drop-shadow-sm">{uniqueCode}</span>
                </div>

                <div className="w-full space-y-3 text-left mt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pb-1 flex items-center gap-2">
                    <Building className="w-4 h-4"/> Approved Bank Accounts
                  </h4>
                  
                  {BANK_ACCOUNTS.map((bank, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-purple-200 transition-colors">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-0.5">{bank.bank} <span className="ml-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{bank.currency}</span></p>
                        <p className="text-sm font-extrabold text-gray-800">{bank.name}</p>
                      </div>
                      <div className="text-lg font-black text-[#4B0163] bg-purple-50 px-4 py-1.5 rounded-lg border border-purple-100">
                        {bank.number}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 pt-6 mt-2 border-t border-gray-100">
                  <button onClick={() => setIsCalendarOpen(true)} className="w-full sm:w-1/2 bg-gray-900 hover:bg-[#4B0163] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
                    <CalendarIcon className="w-4 h-4" /> Schedule Discovery Call
                  </button>
                  <button onClick={handleWhatsAppRedirect} className="w-full sm:w-1/2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
                    <Phone className="w-4 h-4" /> Send Message
                  </button>
                </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </motion.div>

    <AnimatePresence>
      {isCalendarOpen && <ServiceCalendarModal onClose={() => setIsCalendarOpen(false)} />}
    </AnimatePresence>
    </>
  );
};

// ==========================================
// MAIN PAGE CONTENT
// ==========================================
function ServicesContent() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Safely parse URL params to avoid compilation issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && servicesData.find(c => c.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const activeService = servicesData.find((c) => c.id === activeTab) || servicesData[0];

  return (
    <div className="w-full flex flex-col relative bg-gray-50 min-h-screen overflow-hidden">
      <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Header2 />

       <Banner
         image={contactBanner}
         title="Our Services"
         description="World-class technology solutions, custom software engineering, and digital transformation built for scale."
         alt="DUSACORE Services Banner"
       />

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* --- CMMI SDM ENHANCEMENT: ENTERPRISE SLA BAR --- */}
        <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:shadow-xl transition-shadow">
           <div className="absolute top-0 left-0 w-2 h-full bg-[#4B0163]" />
           <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <span className="flex w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                 <span className="text-xs font-black uppercase tracking-widest text-gray-500">Service Delivery Management (SDM)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Enterprise SLA Guarantees</h3>
              <p className="text-sm text-gray-600 mt-2 font-medium max-w-xl leading-relaxed">
                 Our service delivery is governed by strict CMMI Level 3 operational standards, ensuring predictable, high-availability operations and rapid incident resolution for your mission-critical infrastructure.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:w-auto shrink-0">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex items-center gap-4 shadow-sm">
                 <Activity className="w-8 h-8 text-[#4B0163]" />
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Target Uptime</p>
                    <p className="text-xl font-black text-[#4B0163] leading-none">99.99%</p>
                 </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex items-center gap-4 shadow-sm">
                 <Clock className="w-8 h-8 text-[#4B0163]" />
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">P1 MTTA Response</p>
                    <p className="text-xl font-black text-[#4B0163] leading-none">&lt; 15 Mins</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4B0163] bg-purple-50 border border-purple-100 px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-sm mb-4">
            <ShieldCheck className="w-4 h-4" /> CMMI-Aligned Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mt-2 tracking-tight">
            Architecting Robust Digital Ecosystems
          </h2>
          <p className="text-gray-900 mt-5 text-base sm:text-lg leading-relaxed font-medium">
            DUSACORE integrates systems engineering, automation, and deep domain expertise to deliver enterprise-grade performance. Discover our technical capabilities below.
          </p>
        </div>

        {/* 5D INTERACTIVE SHOWCASE GRID RESTORED FROM PRODUCTS PAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          
          {/* LEFT: Service Selection List */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-3 relative z-20"
          >
            {servicesData.map((service) => {
              const Icon = service.icon;
              const isActive = activeService.id === service.id;
              
              return (
                <motion.button
                  variants={listItemVariants}
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
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
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {service.tagline}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#4B0163] translate-x-1 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"}`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: The "5D" Deep Animated Showcase with IMAGE */}
          <div className="lg:col-span-8 relative h-[650px] sm:h-[750px] w-full" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
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
                    src={activeService.image}
                    alt={activeService.title}
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
                        style={{ backgroundColor: activeService.color }}
                      >
                        Enterprise Capability
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {activeService.title}
                      </h2>
                    </div>
                    <div className="hidden sm:flex w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20 text-white shadow-lg">
                      <activeService.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>

                {/* Content Body (Scrollable area) */}
                <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-8 flex flex-col" style={{ transform: "translateZ(30px)" }}>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {activeService.desc}
                  </p>

                  {/* Technical Deep Dive Block */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Technical Architecture
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed bg-gray-50 p-4 border-l-2 rounded-r-lg" style={{ borderColor: activeService.color }}>
                      {activeService.deepDive}
                    </p>
                  </div>

                  {/* Features / Capabilities Matrix */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Core System Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeService.capabilities.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white border border-gray-100 p-3.5 rounded-xl shadow-sm">
                          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: activeService.color }} />
                          <span className="text-sm font-semibold text-gray-700 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call To Action */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
                    <div className="text-sm text-gray-500 font-medium text-center sm:text-left">
                      Ready to execute? <br className="hidden sm:block" /><span className="text-[#4B0163] font-bold">Schedule an SDM discovery call.</span>
                    </div>
                    {/* Triggers the Schedule Demo Modal directly */}
                    <button 
                      onClick={() => setIsCalendarOpen(true)}
                      className="w-full sm:w-auto bg-appBlack hover:bg-[#4B0163] text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
                    >
                      Start a Project 
                      <CalendarIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ALL CAPABILITIES GRID CARDS */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
              Architectural Capability Overview
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Explore all our functional domains organized to manage critical institutional processes.
            </p>
          </div>

          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {servicesData.map((service, index) => {
              const GridIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={listItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setActiveTab(service.id);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
                      <GridIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2 leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {service.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate pr-2">
                      {service.techStack.slice(0, 2).join(" • ")}
                    </span>
                    <span className="text-xs font-bold text-[#4B0163] bg-purple-50 px-2 py-1 rounded-md whitespace-nowrap">
                      Explore Spec
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
        {isCalendarOpen && <ServiceCalendarModal onClose={() => setIsCalendarOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalOpen && activeService && <ServiceModal service={activeService} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ⚠️ CRITICAL FIX: Next.js Pages MUST have a default export. 
// We wrap it in Suspense because `useSearchParams()` breaks the build if not suspended.
export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
// "use client";

// import React, { useState, Suspense } from "react";
// import { motion, Variants } from "framer-motion";
// import Header2 from "@/app/components/dusacomponent/Header2";
// import Footer from "@/app/components/dusacomponent/Footer";
// import Banner from "@/app/components/dusacomponent/Banner";
// import contactBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
// import { servicesData } from "@/data/servicesData";

// // Note: Ensure these components in your codebase use "export default function..." 
// // If they use "export const...", you must import them with curly braces.
// import ServiceTabNav from "@/app/components/dusacomponent/dusaservicepage/ServiceTabNav";
// import ServiceDetailPanel from "@/app/components/dusacomponent/dusaservicepage/ServiceDetailPanel";
// import { useSearchParams } from "next/navigation";

// // --- ANIMATION VARIANTS ---
// const listContainerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
// };

// const listItemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
// };

// function ServicesContent() {
//   const searchParams = useSearchParams();
  
//   // Safely grab the URL parameter, default to the first service if it doesn't exist
//   const tabParam = searchParams.get("tab");
//   const [activeTab, setActiveTab] = useState(tabParam || servicesData[0].id);

//   function setIsLoginOpen(_: boolean) {}
//   function setIsRegisterOpen(_: boolean) {}

//   const activeService = servicesData.find((s) => s.id === activeTab);

//   return (
//     <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
//       <style jsx>{`
//           .hide-scrollbar::-webkit-scrollbar { display: none; }
//           .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//       <Header2
//         onLoginClick={() => setIsLoginOpen(true)}
//         onRegisterClick={() => setIsRegisterOpen(true)}
//       />

//       <Banner
//         image={contactBanner}
//         title="Our Services"
//         description="World-class technology solutions, custom software engineering, and digital transformation built for scale."
//         alt="DUSACORE Services Banner"
//       />

//       <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-appTitleBgColor mt-4 tracking-tight">
//             Architecting Robust Digital Ecosystems
//           </h2>
//           <p className="text-gray-900 mt-5 text-base sm:text-lg leading-relaxed">
//             DUSACORE integrates systems engineering, automation, and deep domain expertise to deliver enterprise-grade performance. Discover our technical capabilities below.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
//           <ServiceTabNav
//             services={servicesData}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//           />

//           {activeService && <ServiceDetailPanel service={activeService} />}
//         </div>
//       </section>

//       {/* REPLACED: ALL PROGRAMS GRID CARDS FROM ACADEMY */}
//       <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-[1400px] mx-auto">
//           <div className="mb-12 text-center sm:text-left">
//             <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
//               Architectural Capability Overview
//             </h3>
//             <p className="text-gray-500 text-sm sm:text-base mt-2">
//               Explore all our functional domains organized to manage critical institutional processes.
//             </p>
//           </div>

//           <motion.div
//             variants={listContainerVariants}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//           >
//             {servicesData.map((service, index) => {
//               const GridIcon = service.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={listItemVariants}
//                   whileHover={{ y: -6, transition: { duration: 0.2 } }}
//                   onClick={() => {
//                     setActiveTab(service.id);
//                     window.scrollTo({ top: 400, behavior: "smooth" });
//                   }}
//                   className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
//                 >
//                   <div>
//                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
//                       <GridIcon className="w-5 h-5" />
//                     </div>
//                     <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2 leading-tight">
//                       {service.title}
//                     </h4>
//                     <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
//                       {service.desc}
//                     </p>
//                   </div>
//                   <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
//                     {/* Shows the first two tech stack items to give a quick preview */}
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate pr-2">
//                       {service.techStack.slice(0, 2).join(" • ")}
//                     </span>
//                     <span className="text-xs font-bold text-[#4B0163] bg-purple-50 px-2 py-1 rounded-md whitespace-nowrap">
//                       Details
//                     </span>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// // ⚠️ CRITICAL FIX: Next.js Pages MUST have a default export. 
// // We wrap it in Suspense because `useSearchParams()` breaks the build if not suspended.
// export default function ServicesPage() {
//   return (
//     <Suspense fallback={
//       <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin" />
//       </div>
//     }>
//       <ServicesContent />
//     </Suspense>
//   );
// }
