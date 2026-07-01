"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { 
  Code, 
  Brain, 
  Cpu, 
  Server, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Terminal, 
  Database, 
  Layers,
  Cloud,
  PenTool,
  Lightbulb,
  Briefcase
} from "lucide-react";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import contactBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";

// --- FRAMER MOTION ANIMATIONS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 }
  }
};

// --- TECHNICAL SERVICES DATA ---
const servicesData = [
  {
    id: "software-engineering",
    icon: Code,
    title: "Custom Software Engineering",
    tagline: "High-Availability, Distributed Enterprise Applications",
    desc: "We engineer fault-tolerant frontend and backend architectures tailored to substitute legacy operations with secure, modern digital infrastructure.",
    deepDive: "Our engineering philosophy focuses on system refactoring, modular design, and clean data isolation. From architecting synchronous banking pipelines to designing scalable service nodes, we construct solutions engineered for zero-downtime execution and rapid deployment.",
    techStack: ["React", "Next.js", "Node.js", "Java", "Spring Boot", "PHP (Laravel)", "TypeScript"],
    capabilities: [
      "Monolith decomposition & microservices design",
      "Transactional isolation & advanced database synchronization",
      "Asynchronous processing pipelines & automated document generation (MT940/MT942)",
      "Secure API design with strict OAuth2 & JWT architectures"
    ]
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
      "Automated extraction, transformations, and data pipelining (ETL)"
    ]
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
      "Advanced observability, centralized logging, and incident alerting"
    ]
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
      "Enterprise audit trail logging and exception handling compliance"
    ]
  },
  {
    id: "product-design",
    icon: PenTool,
    title: "Product Design & Brand Identity (UI/UX)",
    tagline: "Human-Centric Interface Design & Enterprise Brand Systems",
    desc: "Craft intuitive, conversion-optimized user experiences and cohesive brand identities that translate complex technical logic into seamless human interactions.",
    deepDive: "Our design philosophy bridges the gap between aesthetic excellence and behavioral psychology. We build comprehensive design systems, interactive high-fidelity prototypes, and data-driven UX architectures that ensure accessibility, engagement, and a unified brand presence across all digital touchpoints.",
    techStack: ["Figma", "Adobe Creative Cloud", "Framer", "Prototyping", "Design Systems", "WCAG Accessibility"],
    capabilities: [
      "Data-driven User Experience (UX) research and journey mapping",
      "High-fidelity User Interface (UI) design and interactive prototyping",
      "Scalable enterprise design systems and component libraries",
      "Brand identity formulation and visual strategy alignment"
    ]
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
      "Go-to-market strategic product roadmapping"
    ]
  },
  {
    id: "consultation-services",
    icon: Briefcase,
    title: "Digital Transformation Consulting",
    tagline: "Strategic Technology Roadmaps & Enterprise Modernization",
    desc: "Partner with our elite engineering architects to audit legacy systems, align technology with business objectives, and drive digital transformation.",
    deepDive: "We provide executive-level technical advisory to guide C-suite decision-making. From auditing monolithic legacy codebases to drafting migration strategies for cloud adoption and AI integration, we deliver actionable, data-backed intelligence that guarantees measurable ROI on technological investments.",
    techStack: ["Enterprise Architecture", "SWOT Analysis", "TCO/ROI Modeling", "System Auditing", "IT Governance", "Compliance (GDPR/ISO)"],
    capabilities: [
      "Comprehensive legacy system audits and modernization roadmaps",
      "Cloud migration and AI adoption feasibility consulting",
      "Technical debt assessment and architecture refactoring plans",
      "Executive-level technological strategy and compliance advisory"
    ]
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
      "Network routing, load balancing, and firewall configuration"
    ]
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
      "Coached training sprints across modern software development methodologies"
    ]
  }
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  // Synchronize state with URL Query Parameter and run smooth layout scrolling
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && servicesData.some((service) => service.id === tabParam)) {
      setActiveTab(tabParam);
      
      // Delays smooth scroll marginally to allow layout tracking hydration
      setTimeout(() => {
        const targetElement = document.getElementById("interactive-deepdive");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <Header2
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      {/* BANNER COMPONENT */}
      <Banner
        image={contactBanner}
        title="Our Services"
        description="World-class technology solutions, custom software engineering, and digital transformation built for scale."
        alt="DUSACORE Services Banner"
      />

      {/* OVERVIEW CONTENT BLOCK */}
      <section id="interactive-deepdive" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-3 py-1.5 rounded-full">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-appTitleBgColor mt-4 tracking-tight">
            Architecting Robust Digital Ecosystems
          </h2>
          <div className="h-1 w-16 bg-appBanner mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 mt-5 text-base sm:text-lg leading-relaxed">
            DUSACORE integrates systems engineering, automation, and deep domain expertise to deliver enterprise-grade performance. Discover our technical capabilities below.
          </p>
        </div>

        {/* INTERACTIVE TECHNICAL DEEP-DIVE TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left-side tab navigation selectors */}
          <div className="lg:col-span-4 space-y-3">
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full flex items-center gap-4 p-5 text-left border rounded-xl transition-all duration-300 group outline-none ${
                    isActive
                      ? "bg-white border-appBanner shadow-md border-l-4 border-l-appBanner"
                      : "bg-white hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-appBanner text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-appBanner/10 group-hover:text-appBanner"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${
                        isActive ? "text-appBanner" : "text-gray-900"
                      }`}
                    >
                      {service.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {service.tagline}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-appBanner translate-x-1" : "text-gray-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right-side dynamic information panel display */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden min-h-[500px]">
            {servicesData.map((service) => {
              if (service.id !== activeTab) return null;
              const PanelIcon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 bg-appBanner/10 text-appBanner rounded-xl">
                        <PanelIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-appTitleBgColor">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-appBanner font-medium mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Core Focus Description
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Technical Deep-Dive
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed bg-gray-50 p-4 border-l-2 border-appBanner rounded-r-lg">
                      {service.deepDive}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Capabilities & Solutions Matrix
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                          <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-appBanner" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> Core Underlying Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 transition-all hover:border-appBanner/30 hover:bg-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL SERVICES GRID CARDS GRID VIEW */}
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.map((service, index) => {
              const GridIcon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setActiveTab(service.id);
                    const targetElement = document.getElementById("interactive-deepdive");
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-appBanner/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-appBanner group-hover:bg-appBanner group-hover:text-white transition-all duration-300 shadow-sm">
                      <GridIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-appBanner transition-colors mb-2">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-appBanner">
                    <span>Inspect Stack</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
}

// Default export wrapped cleanly in Suspense to satisfy Next.js client deoptimization guardrails
export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-appBanner border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}

// "use client";

// import React, { useState } from "react";
// import { motion, Variants } from "framer-motion";
// import { 
//   Code, 
//   Brain, 
//   Cpu, 
//   Server, 
//   Award, 
//   CheckCircle2, 
//   ChevronRight, 
//   Terminal, 
//   Database, 
//   Layers,
//   Cloud,
//   PenTool,
//   Lightbulb,
//   Briefcase
// } from "lucide-react";
// import Header2 from "@/app/components/dusacomponent/Header2";
// import Footer from "@/app/components/dusacomponent/Footer";
// import Banner from "@/app/components/dusacomponent/Banner";
// import contactBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";

// // --- FRAMER MOTION ANIMATIONS ---
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15, delayChildren: 0.1 }
//   }
// };

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 150, damping: 20 }
//   }
// };

// // --- TECHNICAL SERVICES DATA ---
// const servicesData = [
//   {
//     id: "software-engineering",
//     icon: Code,
//     title: "Custom Software Engineering",
//     tagline: "High-Availability, Distributed Enterprise Applications",
//     desc: "We engineer fault-tolerant frontend and backend architectures tailored to substitute legacy operations with secure, modern digital infrastructure.",
//     deepDive: "Our engineering philosophy focuses on system refactoring, modular design, and clean data isolation. From architecting synchronous banking pipelines to designing scalable service nodes, we construct solutions engineered for zero-downtime execution and rapid deployment.",
//     techStack: ["React", "Next.js", "Node.js", "Java", "Spring Boot", "PHP (Laravel)", "TypeScript"],
//     capabilities: [
//       "Monolith decomposition & microservices design",
//       "Transactional isolation & advanced database synchronization",
//       "Asynchronous processing pipelines & automated document generation (MT940/MT942)",
//       "Secure API design with strict OAuth2 & JWT architectures"
//     ]
//   },
//   {
//     id: "ai-optimization",
//     icon: Brain,
//     title: "AI & Computational Optimization",
//     tagline: "Deterministic Models & Advanced Analytics Pipelines",
//     desc: "Deploy customized intelligence layers to solve highly complex operational and logistical bottlenecks using stochastic modeling and machine learning.",
//     deepDive: "We build custom heuristic models, optimization matrices, and predictive analytics pipelines. Whether developing automated, multivariable resource allocation engines utilizing custom Genetic Algorithms or processing massive structured datasets, we bridge raw data with operational efficiency.",
//     techStack: ["Python", "PyTorch", "TensorFlow", "Pandas/NumPy", "Genetic Algorithms", "Scikit-Learn"],
//     capabilities: [
//       "Combinatorial optimization & advanced heuristics modeling",
//       "Predictive analytical modeling for industrial or logistics routing",
//       "Custom AI room and resource allocation architectures",
//       "Automated extraction, transformations, and data pipelining (ETL)"
//     ]
//   },
//   {
//     id: "cloud-devops",
//     icon: Cloud,
//     title: "Cloud Infrastructure & DevOps",
//     tagline: "Scalable Cloud Architecture & Automated Delivery Pipelines",
//     desc: "Design, deploy, and manage highly available cloud ecosystems with automated CI/CD pipelines for rapid, secure, and resilient software delivery.",
//     deepDive: "We architect cloud-native solutions using Infrastructure as Code (IaC) to eliminate manual provisioning. By implementing advanced Kubernetes orchestration, automated testing pipelines, and robust observability stacks, we ensure zero-downtime deployments and limitless horizontal scalability.",
//     techStack: ["AWS", "Google Cloud (GCP)", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins"],
//     capabilities: [
//       "Infrastructure as Code (IaC) provisioning and management",
//       "Continuous Integration & Continuous Deployment (CI/CD) pipelines",
//       "Kubernetes cluster orchestration and auto-scaling",
//       "Advanced observability, centralized logging, and incident alerting"
//     ]
//   },
//   {
//     id: "rpa-transformation",
//     icon: Cpu,
//     title: "Robotic Process Automation (RPA)",
//     tagline: "Autonomous Workflow Design & Hyper-Automation",
//     desc: "Eliminate error-prone legacy operations through secure digital workforces and intelligent UI/API automation frameworks.",
//     deepDive: "We target friction-dense corporate ecosystems to automate high-volume transaction processing and data reconciliation. By integrating industry-standard tools with rapid cloud applications, we orchestrate workflows that securely talk to legacy software, spreadsheets, and web services seamlessly.",
//     techStack: ["BluePrism", "Microsoft Power Automate", "Oracle APEX", "UiPath", "Selenium Core"],
//     capabilities: [
//       "End-to-end business process modeling and script mapping",
//       "Rapid low-code web app development via Oracle APEX systems",
//       "Cognitive screen-scraping & automated document categorization",
//       "Enterprise audit trail logging and exception handling compliance"
//     ]
//   },
//   {
//     id: "product-design",
//     icon: PenTool,
//     title: "Product Design & Brand Identity (UI/UX)",
//     tagline: "Human-Centric Interface Design & Enterprise Brand Systems",
//     desc: "Craft intuitive, conversion-optimized user experiences and cohesive brand identities that translate complex technical logic into seamless human interactions.",
//     deepDive: "Our design philosophy bridges the gap between aesthetic excellence and behavioral psychology. We build comprehensive design systems, interactive high-fidelity prototypes, and data-driven UX architectures that ensure accessibility, engagement, and a unified brand presence across all digital touchpoints.",
//     techStack: ["Figma", "Adobe Creative Cloud", "Framer", "Prototyping", "Design Systems", "WCAG Accessibility"],
//     capabilities: [
//       "Data-driven User Experience (UX) research and journey mapping",
//       "High-fidelity User Interface (UI) design and interactive prototyping",
//       "Scalable enterprise design systems and component libraries",
//       "Brand identity formulation and visual strategy alignment"
//     ]
//   },
//   {
//     id: "product-ideation",
//     icon: Lightbulb,
//     title: "Product Ideation & Strategy",
//     tagline: "Concept Validation & Minimum Viable Product (MVP) Engineering",
//     desc: "Transform abstract business concepts into technically viable, market-ready product blueprints with rapid prototyping and strategic validation.",
//     deepDive: "We apply design thinking and agile frameworks to deconstruct your vision. Through rigorous market analysis, technical feasibility studies, and user-centric ideation workshops, we architect comprehensive product roadmaps that minimize development risk and accelerate time-to-market.",
//     techStack: ["Miro", "Notion", "Whimsical", "Agile/Scrum", "Design Thinking", "Lean Canvas"],
//     capabilities: [
//       "Technical feasibility analysis and development risk mitigation",
//       "Minimum Viable Product (MVP) feature scoping and prioritization",
//       "Interactive wireframing and proof-of-concept validation",
//       "Go-to-market strategic product roadmapping"
//     ]
//   },
//   {
//     id: "consultation-services",
//     icon: Briefcase,
//     title: "Digital Transformation Consulting",
//     tagline: "Strategic Technology Roadmaps & Enterprise Modernization",
//     desc: "Partner with our elite engineering architects to audit legacy systems, align technology with business objectives, and drive digital transformation.",
//     deepDive: "We provide executive-level technical advisory to guide C-suite decision-making. From auditing monolithic legacy codebases to drafting migration strategies for cloud adoption and AI integration, we deliver actionable, data-backed intelligence that guarantees measurable ROI on technological investments.",
//     techStack: ["Enterprise Architecture", "SWOT Analysis", "TCO/ROI Modeling", "System Auditing", "IT Governance", "Compliance (GDPR/ISO)"],
//     capabilities: [
//       "Comprehensive legacy system audits and modernization roadmaps",
//       "Cloud migration and AI adoption feasibility consulting",
//       "Technical debt assessment and architecture refactoring plans",
//       "Executive-level technological strategy and compliance advisory"
//     ]
//   },
//   {
//     id: "it-support",
//     icon: Server,
//     title: "Enterprise IT Support & Infrastructure",
//     tagline: "Proactive System Administration & High-Availability Servers",
//     desc: "Maintain secure production runtime environments with professional configuration management, server hardening, and network oversight.",
//     deepDive: "We offer intermediate and advanced tier system administration support tailored for modern containerized architectures and bare-metal environments. We monitor application health logs, mitigate architectural vulnerabilities, and guarantee robust infrastructure operations for corporate applications.",
//     techStack: ["Linux Server Environments", "Nginx", "Bash Scripting", "PostgreSQL", "MongoDB", "Network Security"],
//     capabilities: [
//       "Intermediate-level Linux server provisioning, tuning, and monitoring",
//       "Relational and non-relational database tuning (PL/SQL & MongoDB query optimization)",
//       "Continuous logging, backup automation, and server patch scheduling",
//       "Network routing, load balancing, and firewall configuration"
//     ]
//   },
//   {
//     id: "certifications-partnerships",
//     icon: Award,
//     title: "Certification Partnerships & Training",
//     tagline: "Corporate Capacity Building & Industry Framework Alignment",
//     desc: "Empower your technical teams and standardize your business delivery via partnerships with global technology certifying bodies.",
//     deepDive: "We collaborate closely with premier international certificating organizations to provide highly specialized technical curriculum roadmaps, institutional professional validation, and enterprise-grade technological baseline training to align teams with world-class engineering paradigms.",
//     techStack: ["Global Certificating Frameworks", "Agile/Scrum Methodologies", "DevOps Institute Standards", "ITIL Frameworks"],
//     capabilities: [
//       "Strategic alignment with international technology training boards",
//       "Custom curriculum mapping for corporate full-stack and systems engineering",
//       "Validation protocols for enterprise architecture compliance standards",
//       "Coached training sprints across modern software development methodologies"
//     ]
//   }
// ];

// export default function ServicesPage() {
//   const [activeTab, setActiveTab] = useState(servicesData[0].id);

//   function setIsLoginOpen(_: boolean) {}
//   function setIsRegisterOpen(_: boolean) {}

//   return (
//     <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
//       {/* HEADER SECTION */}
//       <Header2
//         onLoginClick={() => setIsLoginOpen(true)}
//         onRegisterClick={() => setIsRegisterOpen(true)}
//       />

//       {/* BANNER COMPONENT */}
//       <Banner
//         image={contactBanner}
//         title="Our Services"
//         description="World-class technology solutions, custom software engineering, and digital transformation built for scale."
//         alt="DUSACORE Services Banner"
//       />

//       {/* OVERVIEW CONTENT BLOCK */}
//       <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-3 py-1.5 rounded-full">
//             What We Do
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-appTitleBgColor mt-4 tracking-tight">
//             Architecting Robust Digital Ecosystems
//           </h2>
//           <div className="h-1 w-16 bg-appBanner mx-auto mt-4 rounded-full" />
//           <p className="text-gray-600 mt-5 text-base sm:text-lg leading-relaxed">
//             DUSACORE integrates systems engineering, automation, and deep domain expertise to deliver enterprise-grade performance. Discover our technical capabilities below.
//           </p>
//         </div>

//         {/* INTERACTIVE TECHNICAL DEEP-DIVE TABS */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* Left-side tab navigation selectors */}
//           <div className="lg:col-span-4 space-y-3">
//             {servicesData.map((service) => {
//               const IconComponent = service.icon;
//               const isActive = activeTab === service.id;
//               return (
//                 <button
//                   key={service.id}
//                   onClick={() => setActiveTab(service.id)}
//                   className={`w-full flex items-center gap-4 p-5 text-left border rounded-xl transition-all duration-300 group outline-none ${
//                     isActive
//                       ? "bg-white border-appBanner shadow-md border-l-4 border-l-appBanner"
//                       : "bg-white hover:bg-gray-100 border-gray-200"
//                   }`}
//                 >
//                   <div
//                     className={`p-3 rounded-lg transition-colors ${
//                       isActive
//                         ? "bg-appBanner text-white"
//                         : "bg-gray-100 text-gray-500 group-hover:bg-appBanner/10 group-hover:text-appBanner"
//                     }`}
//                   >
//                     <IconComponent className="w-5 h-5" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p
//                       className={`text-sm font-bold truncate ${
//                         isActive ? "text-appBanner" : "text-gray-900"
//                       }`}
//                     >
//                       {service.title}
//                     </p>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">
//                       {service.tagline}
//                     </p>
//                   </div>
//                   <ChevronRight
//                     className={`w-4 h-4 transition-transform ${
//                       isActive ? "text-appBanner translate-x-1" : "text-gray-400"
//                     }`}
//                   />
//                 </button>
//               );
//             })}
//           </div>

//           {/* Right-side dynamic information panel display */}
//           <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden min-h-[500px]">
//             {servicesData.map((service) => {
//               if (service.id !== activeTab) return null;
//               const PanelIcon = service.icon;
//               return (
//                 <motion.div
//                   key={service.id}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
//                     <div className="flex items-center gap-4">
//                       <div className="p-3.5 bg-appBanner/10 text-appBanner rounded-xl">
//                         <PanelIcon className="w-7 h-7" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl sm:text-2xl font-bold text-appTitleBgColor">
//                           {service.title}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-appBanner font-medium mt-0.5">
//                           {service.tagline}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
//                       <Layers className="w-3.5 h-3.5" /> Core Focus Description
//                     </h4>
//                     <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                       {service.desc}
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
//                       <Terminal className="w-3.5 h-3.5" /> Technical Deep-Dive
//                     </h4>
//                     <p className="text-gray-500 text-xs sm:text-sm leading-relaxed bg-gray-50 p-4 border-l-2 border-appBanner rounded-r-lg">
//                       {service.deepDive}
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
//                       <CheckCircle2 className="w-3.5 h-3.5" /> Capabilities & Solutions Matrix
//                     </h4>
//                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       {service.capabilities.map((capability, idx) => (
//                         <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
//                           <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-appBanner" />
//                           <span>{capability}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="pt-4 border-t border-gray-100">
//                     <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
//                       <Database className="w-3.5 h-3.5" /> Core Underlying Technology Stack
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {service.techStack.map((tech) => (
//                         <span
//                           key={tech}
//                           className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 transition-all hover:border-appBanner/30 hover:bg-white"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ALL SERVICES GRID CARDS GRID VIEW */}
//       <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
//               Architectural Capability Overview
//             </h3>
//             <p className="text-gray-500 text-sm sm:text-base mt-2">
//               Explore all our functional domains organized to manage critical institutional processes.
//             </p>
//           </div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {servicesData.map((service, index) => {
//               const GridIcon = service.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={cardVariants}
//                   whileHover={{ y: -6, transition: { duration: 0.2 } }}
//                   onClick={() => {
//                     setActiveTab(service.id);
//                     window.scrollTo({ top: 400, behavior: "smooth" });
//                   }}
//                   className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-appBanner/30 transition-all cursor-pointer group flex flex-col justify-between"
//                 >
//                   <div>
//                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-appBanner group-hover:bg-appBanner group-hover:text-white transition-all duration-300 shadow-sm">
//                       <GridIcon className="w-5 h-5" />
//                     </div>
//                     <h4 className="text-lg font-bold text-gray-900 group-hover:text-appBanner transition-colors mb-2">
//                       {service.title}
//                     </h4>
//                     <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
//                       {service.desc}
//                     </p>
//                   </div>
//                   <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-appBanner">
//                     <span>Inspect Stack</span>
//                     <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* FOOTER SECTION */}
//       <Footer />
//     </div>
//   );
// }