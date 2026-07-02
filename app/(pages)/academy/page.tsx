"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Code, Server, Cloud, PenTool, Briefcase, Shield, Brain, 
  GraduationCap, ArrowRight, X, BookOpen, User, Lightbulb,
  Mail, Building, CheckCircle2, ChevronRight, Zap, Phone, Calendar as CalendarIcon
} from "lucide-react";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import academyBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";

// --- ANIMATION VARIANTS ---
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

const showcaseVariants: Variants = {
  enter: { opacity: 0, rotateY: -25, rotateX: 10, scale: 0.9, z: -200, filter: "blur(10px)" },
  center: { opacity: 1, rotateY: 0, rotateX: 0, scale: 1, z: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 20, mass: 1.2 } },
  exit: { opacity: 0, rotateY: 25, rotateX: -10, scale: 0.95, z: -100, filter: "blur(10px)", transition: { duration: 0.3 } }
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

// --- WHATSAPP & BANK DETAILS ---
const WHATSAPP_NUMBER = "2349044698791";
const BANK_ACCOUNTS = [
  { bank: "Ecobank Nigeria", currency: "NGN (Naira)", name: "DUSA CORE TECH LTD", number: "4130198573" },
  { bank: "Wema Bank", currency: "NGN (Naira)", name: "DUSA CORE TECHNOLOGIES", number: "7650701035" },
  { bank: "Lead Bank", currency: "USD (Dollars)", name: "DUSA CORE TECHNOLOGIES", number: "213192089068" }
];

// --- ACADEMY COURSES DATA ---
const coursesData = [
  {
    id: "frontend",
    icon: Code,
    title: "Frontend Engineering",
    price: "₦150,000",
    duration: "12 Weeks",
    tagline: "Build immersive, interactive user interfaces.",
    desc: "Master the art of building responsive, high-performance web applications. You will go from basic markup to engineering complex single-page applications using modern frameworks.",
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js"],
    curriculum: [
      "Week 1-3: Semantic HTML, CSS Architecture & DOM Basics",
      "Week 4-6: Advanced JavaScript (ES6+) & Asynchronous Programming",
      "Week 7-9: React.js Ecosystem, Components & State Management",
      "Week 10-12: Next.js, API Integration & Production Deployment"
    ],
    color: "#4B0163"
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Engineering",
    price: "₦200,000",
    duration: "14 Weeks",
    tagline: "Architect scalable server-side systems.",
    desc: "Learn to design robust databases, secure APIs, and scalable microservices. Master the complete Software Development Life Cycle (SDLC) and heavy-lifting architectures.",
    techStack: ["Node.js", "Java", "NestJS", "Database Design", "SDLC"],
    curriculum: [
      "Week 1-3: SDLC Principles, Node.js & Express Fundamentals",
      "Week 4-7: Relational & NoSQL Database Designing (PostgreSQL/MongoDB)",
      "Week 8-10: Enterprise Java & Spring Boot Architecture",
      "Week 11-14: NestJS, Microservices & Secure Authentication"
    ],
    color: "#0284c7"
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps Engineering",
    price: "₦250,000",
    duration: "12 Weeks",
    tagline: "Deploy, monitor, and scale cloud infrastructure.",
    desc: "Master the infrastructure that powers the modern web. Learn continuous integration, containerization, and enterprise cloud resource management.",
    techStack: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
    curriculum: [
      "Week 1-3: Linux Server Admin & Shell Scripting",
      "Week 4-6: Containerization & Orchestration with Docker",
      "Week 7-9: AWS Infrastructure (EC2, S3, RDS, VPCs)",
      "Week 10-12: Kubernetes Clusters & Jenkins CI/CD Pipelines"
    ],
    color: "#059669"
  },
  {
    id: "ui-ux",
    icon: PenTool,
    title: "Product / Brand Design (UI/UX)",
    price: "₦120,000",
    duration: "10 Weeks",
    tagline: "Design experiences humans love.",
    desc: "Blend psychology with aesthetics. Learn wireframing, prototyping, and the principles of creating intuitive digital products and memorable brand identities.",
    techStack: ["Figma", "Design Systems", "Prototyping", "UX Research", "Adobe Suite"],
    curriculum: [
      "Week 1-2: Visual Design Principles & Brand Typography",
      "Week 3-5: UX Research, Personas & User Journey Mapping",
      "Week 6-8: UI Component Architecture & Enterprise Design Systems",
      "Week 9-10: Advanced Interactive Prototyping & Portfolio Build"
    ],
    color: "#e11d48"
  },
  {
    id: "design-thinking",
    icon: Lightbulb,
    title: "Design Thinking & Innovation",
    price: "₦80,000",
    duration: "6 Weeks",
    tagline: "Solve complex problems with creative frameworks.",
    desc: "A hands-on track teaching the methodology used by top tech companies to ideate, prototype, and test innovative solutions to human-centered problems.",
    techStack: ["Empathy Mapping", "Ideation Frameworks", "Rapid Prototyping", "User Testing"],
    curriculum: [
      "Week 1-2: Empathize & Define - Understanding User Needs",
      "Week 3-4: Ideation Sessions & Brainstorming Architectures",
      "Week 5: Rapid Lo-Fi Prototyping",
      "Week 6: User Testing, Feedback Loops & Iteration"
    ],
    color: "#d97706"
  },
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    price: "₦300,000",
    duration: "16 Weeks",
    tagline: "Engineer intelligent, predictive models.",
    desc: "Dive into the mathematics and code behind artificial intelligence. From core Python scripting to applied neural networks and complex Quantz engineering.",
    techStack: ["Python", "Quantz Engineering", "TensorFlow", "Pandas", "Neural Networks"],
    curriculum: [
      "Week 1-4: Advanced Python, Data Structures & Pandas",
      "Week 5-8: Statistical Modeling & Machine Learning Algorithms",
      "Week 9-12: Deep Learning, Neural Networks & NLP",
      "Week 13-16: Quantz Engineering, Trading Algorithms & Applied LLMs"
    ],
    color: "#9333ea"
  },
  {
    id: "product-management",
    icon: Briefcase,
    title: "Product / Project Management",
    price: "₦100,000",
    duration: "8 Weeks",
    tagline: "Lead teams and deliver digital products.",
    desc: "Learn agile methodologies, sprint planning, and how to bridge the gap between engineering, design, and business stakeholders.",
    techStack: ["Jira", "Agile/Scrum", "Product Roadmapping", "Trello", "SDLC"],
    curriculum: [
      "Week 1-2: Product Lifecycle, PRDs & Market Research",
      "Week 3-4: Agile Frameworks & Scrum Ceremonies",
      "Week 5-6: Sprint Planning, Jira & Backlog Grooming",
      "Week 7-8: Stakeholder Communication & Go-to-Market Strategies"
    ],
    color: "#ea580c"
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    price: "₦200,000",
    duration: "12 Weeks",
    tagline: "Protect enterprise networks and data.",
    desc: "Understand threat landscapes, ethical hacking, and how to secure digital infrastructures against modern cyber attacks.",
    techStack: ["Penetration Testing", "Network Security", "Cryptography", "Risk Auth"],
    curriculum: [
      "Week 1-3: Networking Protocols & Security Fundamentals",
      "Week 4-6: Ethical Hacking & Vulnerability Assessment",
      "Week 7-9: Cryptography & Secure Application Design",
      "Week 10-12: Incident Response, Forensics & ISO Compliance"
    ],
    color: "#14b8a6"
  }
];

// ========================================================
// ACADEMY CALENDAR MODAL (Specific for Student Onboarding)
// ========================================================
const AcademyCalendarModal = ({ onClose }: { onClose: () => void }) => {
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
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Academy Onboarding</h2>
                            <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Schedule your student interview and onboarding call.</p>
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
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1FxW-Cg0GxnrvzYEMox-ARAGDNkm_C_eWlAhnz50Fnu034dlKNEwE-2cbitKijLfsaNOVdOHRA?gv=true" 
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

// ==========================================
// COURSE ENROLLMENT MODAL (MULTI-STEP)
// ==========================================
const CourseModal = ({ course, onClose }: { course: typeof coursesData[0], onClose: () => void }) => {
  const [step, setStep] = useState<"curriculum" | "form" | "payment">("curriculum");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [payload, setPayload] = useState({ 
    title: "",
    gender: "",
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "",
    address: "", 
    yearsOfExperience: "", 
    age: "", 
    DOB: "", 
    maritalStatus: "", 
    occupation: "", 
    reasonForApplication: "" 
  });
  const [uniqueCode, setUniqueCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Move from Curriculum to Form
  const handleEnrollClick = () => setStep("form");

  // Step 2: Handle Form Submit -> Send to Next.js Internal API Backend -> Show Payment Step
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate Unique Registration Code
    const generatedCode = `DUSA-${Math.floor(1000 + Math.random() * 9000)}-${course.id.substring(0,3).toUpperCase()}`;
    setUniqueCode(generatedCode);

    try {
      // Direct the request to our Next.js server route
      const url = '/api/enroll'; 
      
      const body = {
        dusaAcademyCohort: {
          title: payload.title,
          gender: payload.gender,
          firstName: payload.firstName,
          lastName: payload.lastName,
          uniqueCode: generatedCode,
          email: payload.email,
          phone: payload.phone, 
          address: payload.address,
          yearsOfExperience: payload.yearsOfExperience,
          age: payload.age,
          dob: payload.DOB, 
          maritalStatus: payload.maritalStatus,
          occupation: payload.occupation,
          reasonForApplication: payload.reasonForApplication,
          paymentStatus: "Pending Payment",
          course: course.title
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        // We do NOT send the Sheety token here. The server handles the security.
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        console.warn("Failed to sync with internal server API.");
        const errorData = await response.text();
        console.error("Server API Error:", errorData);
      } else {
        const json = await response.json();
        console.log("Registration successfully proxied via server:", json);
      }
    } catch (error) {
      console.error("Fetch API error:", error);
    } finally {
      setIsSubmitting(false);
      setStep("payment"); // Move to payment screen
    }
  };

  // Step 3: Handle WhatsApp Redirect
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hello DUSA CORE Academy!\n\nI have just made payment for a training cohort. Here are my details:\n\n` +
      `*Name:* ${payload.title} ${payload.firstName} ${payload.lastName}\n` +
      `*Email:* ${payload.email}\n` +
      `*Course:* ${course.title}\n` +
      `*Registration Code:* ${uniqueCode}\n\n` +
      `Please find my payment receipt attached below.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
    <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[150] p-4 sm:p-6 backdrop-blur-sm">
      <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-6 text-white flex justify-between items-start shrink-0 relative z-10">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <course.icon size={24} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-wide">{course.title}</h2>
            <p className="text-sm font-medium text-white/80 mt-1">{course.duration} Intensive Training</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-slate-50">
          
          {/* STEP 1: CURRICULUM */}
          {step === "curriculum" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Course Curriculum
                </h4>
                <ul className="space-y-3">
                  {course.curriculum.map((module, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-[#4B0163] flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                      <span className="text-sm font-semibold text-gray-700 leading-snug pt-0.5">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Tuition</p>
                  <p className="text-3xl font-black text-[#4B0163]">{course.price}</p>
                </div>
                <button onClick={handleEnrollClick} className="w-full sm:w-auto bg-[#4B0163] hover:bg-appNav text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95">
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: REGISTRATION FORM */}
          {step === "form" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
               <div className="text-center mb-6">
                  <h3 className="text-xl font-extrabold text-gray-900">Trainee Details</h3>
                  <p className="text-sm text-gray-500 mt-1">Enter your details to register and generate your unique ID.</p>
               </div>
               
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
                        <input required type="email" value={payload.email} onChange={e => setPayload({...payload, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number *</label>
                        <input required type="tel" value={payload.phone} onChange={e => setPayload({...payload, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="08012345678" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Age *</label>
                        <input required type="number" min="16" max="99" value={payload.age} onChange={e => setPayload({...payload, age: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="25" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Date of Birth *</label>
                        <input required type="date" value={payload.DOB} onChange={e => setPayload({...payload, DOB: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Marital Status *</label>
                        <select required value={payload.maritalStatus} onChange={e => setPayload({...payload, maritalStatus: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Select status...</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Years of Experience *</label>
                        <input required type="number" min="0" max="50" value={payload.yearsOfExperience} onChange={e => setPayload({...payload, yearsOfExperience: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. 2" />
                    </div>
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Occupation *</label>
                      <input required type="text" value={payload.occupation} onChange={e => setPayload({...payload, occupation: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. Graphic Designer" />
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Address *</label>
                      <input required type="text" value={payload.address} onChange={e => setPayload({...payload, address: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="123 Tech Street, City" />
                  </div>

                  <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Reason for Application *</label>
                      <textarea required value={payload.reasonForApplication} onChange={e => setPayload({...payload, reasonForApplication: e.target.value})} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all resize-none" placeholder="Briefly state why you want to join this cohort..." />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <button type="button" disabled={isSubmitting} onClick={() => setStep("curriculum")} className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50">Back</button>
                    <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2">
                      {isSubmitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                      ) : "Generate Code"}
                    </button>
                  </div>
               </form>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT INSTRUCTIONS & ONBOARDING */}
          {step === "payment" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Registration Initiated!</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Make a transfer of <span className="font-bold text-[#4B0163]">{course.price}</span> to any of our business accounts below. Once paid, schedule your onboarding interview and share your receipt via WhatsApp.</p>
                </div>

                {/* Unique Code Block */}
                <div className="w-full bg-purple-50 border-2 border-purple-200 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Your Unique Code</span>
                  <span className="text-2xl font-black text-[#4B0163] tracking-widest">{uniqueCode}</span>
                </div>

                {/* Bank Details Block (Multiple Banks) */}
                <div className="w-full space-y-3 text-left">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pb-1 flex items-center gap-2">
                    <Building className="w-4 h-4"/> Approved Bank Accounts
                  </h4>
                  
                  {BANK_ACCOUNTS.map((bank, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="text-xs font-bold text-gray-500">{bank.bank} <span className="ml-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{bank.currency}</span></p>
                        <p className="text-sm font-semibold text-gray-800">{bank.name}</p>
                      </div>
                      <div className="text-lg font-black text-[#4B0163] bg-purple-50 px-3 py-1 rounded-lg">
                        {bank.number}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Actions */}
                <div className="w-full flex flex-col sm:flex-row gap-3 pt-4">
                  <button onClick={() => setIsCalendarOpen(true)} className="w-full sm:w-1/2 bg-appBlack hover:bg-[#4B0163] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
                    <CalendarIcon className="w-4 h-4" /> Schedule Interview
                  </button>
                  <button onClick={handleWhatsAppRedirect} className="w-full sm:w-1/2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
                    <Phone className="w-4 h-4" /> Send Receipt
                  </button>
                </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </motion.div>

    {/* Dedicated Academy Calendar Modal inside the Course Modal context */}
    <AnimatePresence>
      {isCalendarOpen && <AcademyCalendarModal onClose={() => setIsCalendarOpen(false)} />}
    </AnimatePresence>
    </>
  );
};


// ==========================================
// MAIN ACADEMY PAGE
// ==========================================
export default function AcademyPage() {
  const [activeCourse, setActiveCourse] = useState(coursesData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Cohort Control Switch (Set to false when registration closes)
  const isCohortOpen = true; 

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  return (
    <div className="w-full flex flex-col relative bg-slate-50 min-h-screen overflow-hidden">
      
      <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Header2
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <Banner
        image={academyBanner}
        title="DUSACORE Academy"
        description="Accelerate your career. Train with world-class professionals and build real-life enterprise software projects."
        alt="DUSACORE Academy Banner"
      />

      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* COHORT ANNOUNCEMENT BAR */}
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="absolute top-0 left-0 w-2 h-full bg-[#4B0163]" />
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className={`flex w-3 h-3 rounded-full ${isCohortOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                 <span className="text-xs font-black uppercase tracking-widest text-gray-500">Cohort 2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-appTitleBgColor">Summer Engineering Program</h3>
           </div>
           
           <div className="flex flex-col sm:items-end text-center sm:text-right">
              {isCohortOpen ? (
                <>
                  <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200 mb-2">Registration Open</span>
                  <span className="text-xs text-gray-500 font-medium">Select a track below to enroll.</span>
                </>
              ) : (
                <span className="bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200">Registration Closed</span>
              )}
           </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> The DUSA Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mt-6 tracking-tight">
            Intern as you train.
          </h2>
          <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed font-medium bg-purple-50 p-4 rounded-xl border border-purple-100">
            We don't just teach theory. Our curricula integrate you directly into our engineering pods. You will work alongside world-class professionals on <strong className="text-[#4B0163]">real-life software projects</strong> destined for production.
          </p>
        </div>

        {/* 5D INTERACTIVE SHOWCASE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          
          {/* LEFT: Course Selection List */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-3 relative z-20"
          >
            {coursesData.map((course) => {
              const Icon = course.icon;
              const isActive = activeCourse.id === course.id;
              
              return (
                <motion.button
                  variants={listItemVariants}
                  key={course.id}
                  onClick={() => setActiveCourse(course)}
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
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      {course.price} <span className="mx-1">•</span> {course.duration}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#4B0163] translate-x-1 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"}`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT: The "5D" Deep Animated Showcase */}
          <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] w-full" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.id}
                variants={showcaseVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
                style={{ transformStyle: "preserve-3d" }} 
              >
                
                {/* 3D Content Header */}
                <div className="relative w-full p-8 sm:p-10 shrink-0 overflow-hidden bg-gradient-to-br from-gray-900 to-appTitleBgColor text-white">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-end" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                        <activeCourse.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20">
                        {activeCourse.duration}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2">
                      {activeCourse.title}
                    </h2>
                    <p className="text-white/80 font-medium text-sm sm:text-base max-w-xl">
                      {activeCourse.tagline}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                  
                  <div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {activeCourse.desc}
                    </p>

                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeCourse.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-slate-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call To Action */}
                  <div className="pt-6 mt-auto border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tuition Fee</p>
                      <p className="text-2xl font-black text-[#4B0163]">{activeCourse.price}</p>
                    </div>
                    
                    <button 
                      onClick={() => isCohortOpen && setIsModalOpen(true)}
                      disabled={!isCohortOpen}
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                        isCohortOpen ? "bg-appBlack hover:bg-[#4B0163] text-white group" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isCohortOpen ? (
                        <>View Curriculum & Enroll <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      ) : (
                        "Registration Closed"
                      )}
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ALL PROGRAMS GRID CARDS */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
              Available Training Programs
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Select a track below to view the curriculum and begin your enrollment.
            </p>
          </div>

          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {coursesData.map((course, index) => {
              const GridIcon = course.icon;
              return (
                <motion.div
                  key={index}
                  variants={listItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setActiveCourse(course);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
                      <GridIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2">
                      {course.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {course.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-sm font-black text-[#4B0163]">{course.price}</span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{course.duration}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Render Modal */}
      <AnimatePresence>
        {isModalOpen && <CourseModal course={activeCourse} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { 
//   Code, Server, Cloud, PenTool, Briefcase, Shield, Brain, 
//   GraduationCap, ArrowRight, X, BookOpen, User, Lightbulb,
//   Mail, Building, CheckCircle2, ChevronRight, Zap, Phone, Calendar as CalendarIcon
// } from "lucide-react";
// import Header2 from "@/app/components/dusacomponent/Header2";
// import Footer from "@/app/components/dusacomponent/Footer";
// import Banner from "@/app/components/dusacomponent/Banner";
// import academyBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";

// // --- ANIMATION VARIANTS ---
// const listContainerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
// };

// const listItemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
// };

// const showcaseVariants: Variants = {
//   enter: { opacity: 0, rotateY: -25, rotateX: 10, scale: 0.9, z: -200, filter: "blur(10px)" },
//   center: { opacity: 1, rotateY: 0, rotateX: 0, scale: 1, z: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 20, mass: 1.2 } },
//   exit: { opacity: 0, rotateY: 25, rotateX: -10, scale: 0.95, z: -100, filter: "blur(10px)", transition: { duration: 0.3 } }
// };

// const modalBackdrop: Variants = {
//   hidden: { opacity: 0, backdropFilter: "blur(0px)" },
//   show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
// };

// const modalContent: Variants = {
//   hidden: { scale: 0.95, opacity: 0, y: 20 },
//   show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
//   exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
// };

// // --- WHATSAPP & BANK DETAILS ---
// const WHATSAPP_NUMBER = "2349044698791";
// const BANK_ACCOUNTS = [
//   { bank: "Ecobank Nigeria", currency: "NGN (Naira)", name: "DUSA CORE TECH LTD", number: "1234567890" },
//   { bank: "Wema Bank", currency: "NGN (Naira)", name: "DUSA CORE TECH LTD", number: "0987654321" },
//   { bank: "Grey", currency: "USD (Dollars)", name: "DUSA CORE TECH LTD", number: "5678901234" }
// ];

// // --- ACADEMY COURSES DATA ---
// const coursesData = [
//   {
//     id: "frontend",
//     icon: Code,
//     title: "Frontend Engineering",
//     price: "₦150,000",
//     duration: "12 Weeks",
//     tagline: "Build immersive, interactive user interfaces.",
//     desc: "Master the art of building responsive, high-performance web applications. You will go from basic markup to engineering complex single-page applications using modern frameworks.",
//     techStack: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js"],
//     curriculum: [
//       "Week 1-3: Semantic HTML, CSS Architecture & DOM Basics",
//       "Week 4-6: Advanced JavaScript (ES6+) & Asynchronous Programming",
//       "Week 7-9: React.js Ecosystem, Components & State Management",
//       "Week 10-12: Next.js, API Integration & Production Deployment"
//     ],
//     color: "#4B0163"
//   },
//   {
//     id: "backend",
//     icon: Server,
//     title: "Backend Engineering",
//     price: "₦200,000",
//     duration: "14 Weeks",
//     tagline: "Architect scalable server-side systems.",
//     desc: "Learn to design robust databases, secure APIs, and scalable microservices. Master the complete Software Development Life Cycle (SDLC) and heavy-lifting architectures.",
//     techStack: ["Node.js", "Java", "NestJS", "Database Design", "SDLC"],
//     curriculum: [
//       "Week 1-3: SDLC Principles, Node.js & Express Fundamentals",
//       "Week 4-7: Relational & NoSQL Database Designing (PostgreSQL/MongoDB)",
//       "Week 8-10: Enterprise Java & Spring Boot Architecture",
//       "Week 11-14: NestJS, Microservices & Secure Authentication"
//     ],
//     color: "#0284c7"
//   },
//   {
//     id: "cloud-devops",
//     icon: Cloud,
//     title: "Cloud & DevOps Engineering",
//     price: "₦250,000",
//     duration: "12 Weeks",
//     tagline: "Deploy, monitor, and scale cloud infrastructure.",
//     desc: "Master the infrastructure that powers the modern web. Learn continuous integration, containerization, and enterprise cloud resource management.",
//     techStack: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
//     curriculum: [
//       "Week 1-3: Linux Server Admin & Shell Scripting",
//       "Week 4-6: Containerization & Orchestration with Docker",
//       "Week 7-9: AWS Infrastructure (EC2, S3, RDS, VPCs)",
//       "Week 10-12: Kubernetes Clusters & Jenkins CI/CD Pipelines"
//     ],
//     color: "#059669"
//   },
//   {
//     id: "ui-ux",
//     icon: PenTool,
//     title: "Product / Brand Design (UI/UX)",
//     price: "₦120,000",
//     duration: "10 Weeks",
//     tagline: "Design experiences humans love.",
//     desc: "Blend psychology with aesthetics. Learn wireframing, prototyping, and the principles of creating intuitive digital products and memorable brand identities.",
//     techStack: ["Figma", "Design Systems", "Prototyping", "UX Research", "Adobe Suite"],
//     curriculum: [
//       "Week 1-2: Visual Design Principles & Brand Typography",
//       "Week 3-5: UX Research, Personas & User Journey Mapping",
//       "Week 6-8: UI Component Architecture & Enterprise Design Systems",
//       "Week 9-10: Advanced Interactive Prototyping & Portfolio Build"
//     ],
//     color: "#e11d48"
//   },
//   {
//     id: "design-thinking",
//     icon: Lightbulb,
//     title: "Design Thinking & Innovation",
//     price: "₦80,000",
//     duration: "6 Weeks",
//     tagline: "Solve complex problems with creative frameworks.",
//     desc: "A hands-on track teaching the methodology used by top tech companies to ideate, prototype, and test innovative solutions to human-centered problems.",
//     techStack: ["Empathy Mapping", "Ideation Frameworks", "Rapid Prototyping", "User Testing"],
//     curriculum: [
//       "Week 1-2: Empathize & Define - Understanding User Needs",
//       "Week 3-4: Ideation Sessions & Brainstorming Architectures",
//       "Week 5: Rapid Lo-Fi Prototyping",
//       "Week 6: User Testing, Feedback Loops & Iteration"
//     ],
//     color: "#d97706"
//   },
//   {
//     id: "ai-ml",
//     icon: Brain,
//     title: "AI & Machine Learning",
//     price: "₦300,000",
//     duration: "16 Weeks",
//     tagline: "Engineer intelligent, predictive models.",
//     desc: "Dive into the mathematics and code behind artificial intelligence. From core Python scripting to applied neural networks and complex Quantz engineering.",
//     techStack: ["Python", "Quantz Engineering", "TensorFlow", "Pandas", "Neural Networks"],
//     curriculum: [
//       "Week 1-4: Advanced Python, Data Structures & Pandas",
//       "Week 5-8: Statistical Modeling & Machine Learning Algorithms",
//       "Week 9-12: Deep Learning, Neural Networks & NLP",
//       "Week 13-16: Quantz Engineering, Trading Algorithms & Applied LLMs"
//     ],
//     color: "#9333ea"
//   },
//   {
//     id: "product-management",
//     icon: Briefcase,
//     title: "Product / Project Management",
//     price: "₦100,000",
//     duration: "8 Weeks",
//     tagline: "Lead teams and deliver digital products.",
//     desc: "Learn agile methodologies, sprint planning, and how to bridge the gap between engineering, design, and business stakeholders.",
//     techStack: ["Jira", "Agile/Scrum", "Product Roadmapping", "Trello", "SDLC"],
//     curriculum: [
//       "Week 1-2: Product Lifecycle, PRDs & Market Research",
//       "Week 3-4: Agile Frameworks & Scrum Ceremonies",
//       "Week 5-6: Sprint Planning, Jira & Backlog Grooming",
//       "Week 7-8: Stakeholder Communication & Go-to-Market Strategies"
//     ],
//     color: "#ea580c"
//   },
//   {
//     id: "cybersecurity",
//     icon: Shield,
//     title: "Cybersecurity",
//     price: "₦200,000",
//     duration: "12 Weeks",
//     tagline: "Protect enterprise networks and data.",
//     desc: "Understand threat landscapes, ethical hacking, and how to secure digital infrastructures against modern cyber attacks.",
//     techStack: ["Penetration Testing", "Network Security", "Cryptography", "Risk Auth"],
//     curriculum: [
//       "Week 1-3: Networking Protocols & Security Fundamentals",
//       "Week 4-6: Ethical Hacking & Vulnerability Assessment",
//       "Week 7-9: Cryptography & Secure Application Design",
//       "Week 10-12: Incident Response, Forensics & ISO Compliance"
//     ],
//     color: "#14b8a6"
//   }
// ];

// // ========================================================
// // ACADEMY CALENDAR MODAL (Specific for Student Onboarding)
// // ========================================================
// const AcademyCalendarModal = ({ onClose }: { onClose: () => void }) => {
//     const [isLoading, setIsLoading] = useState(true);

//     return (
//         <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4 sm:p-6 backdrop-blur-sm">
//             <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh] max-h-[800px]">
//                 <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-4 sm:p-6 text-white flex justify-between items-center shrink-0 relative z-10">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                             <CalendarIcon size={20} />
//                         </div>
//                         <div>
//                             <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Academy Onboarding</h2>
//                             <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Schedule your student interview and onboarding call.</p>
//                         </div>
//                     </div>
//                     <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
//                         <X size={20} />
//                     </button>
//                 </div>
//                 <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
//                     {isLoading && (
//                         <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
//                             <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
//                             <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
//                         </div>
//                     )}
//                     <iframe 
//                         src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1FxW-Cg0GxnrvzYEMox-ARAGDNkm_C_eWlAhnz50Fnu034dlKNEwE-2cbitKijLfsaNOVdOHRA?gv=true" 
//                         style={{ border: 0 }} 
//                         width="100%" 
//                         height="100%" 
//                         className="flex-1 w-full h-full"
//                         onLoad={() => setIsLoading(false)}
//                     ></iframe>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // ==========================================
// // COURSE ENROLLMENT MODAL (MULTI-STEP)
// // ==========================================
// const CourseModal = ({ course, onClose }: { course: typeof coursesData[0], onClose: () => void }) => {
//   const [step, setStep] = useState<"curriculum" | "form" | "payment">("curriculum");
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [payload, setPayload] = useState({ 
//     title: "",
//     gender: "",
//     firstName: "", 
//     lastName: "", 
//     email: "", 
//     phone: "",
//     address: "", 
//     yearsOfExperience: "", 
//     age: "", 
//     DOB: "", 
//     maritalStatus: "", 
//     occupation: "", 
//     reasonForApplication: "" 
//   });
//   const [uniqueCode, setUniqueCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Step 1: Move from Curriculum to Form
//   const handleEnrollClick = () => setStep("form");

//   // Step 2: Handle Form Submit -> Save to Sheety API -> Show Payment Step
//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Generate Unique Registration Code
//     const generatedCode = `DUSA-${Math.floor(1000 + Math.random() * 9000)}-${course.id.substring(0,3).toUpperCase()}`;
//     setUniqueCode(generatedCode);

//     try {
//       const url = 'https://api.sheety.co/cca03fc041a43f901c660df1bc459a75/dusaCoreAcademy/dusaAcademyCohorts';
      
//       const body = {
//         dusaAcademyCohort: {
//           title: payload.title,
//           gender: payload.gender,
//           firstName: payload.firstName,
//           lastName: payload.lastName,
//           uniqueId: generatedCode,
//           email: payload.email,
//           phone: payload.phone, 
//           address: payload.address,
//           yearsOfExperience: payload.yearsOfExperience,
//           age: payload.age,
//           dob: payload.DOB, 
//           maritalStatus: payload.maritalStatus,
//           occupation: payload.occupation,
//           reasonForApplication: payload.reasonForApplication,
//           paymentStatus: "Pending Payment",
//           course: course.title
//         }
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer 8d82cbced5d8f12281f0297c6906067c78c6e9d7ea9cfc498f816d358b3c462d`
//         },
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) {
//         console.warn("Failed to sync with Sheety. Ensure POST is enabled in Sheety Dashboard.");
//         const errorData = await response.text();
//         console.error("Sheety Error:", errorData);
//       } else {
//         const json = await response.json();
//         console.log("Registration saved:", json.dusaAcademyCohort);
//       }
//     } catch (error) {
//       console.error("Fetch API error:", error);
//     } finally {
//       setIsSubmitting(false);
//       setStep("payment"); // Move to payment screen
//     }
//   };

//   // Step 3: Handle WhatsApp Redirect
//   const handleWhatsAppRedirect = () => {
//     const message = encodeURIComponent(
//       `Hello DUSA CORE Academy!\n\nI have just made payment for a training cohort. Here are my details:\n\n` +
//       `*Name:* ${payload.title} ${payload.firstName} ${payload.lastName}\n` +
//       `*Email:* ${payload.email}\n` +
//       `*Course:* ${course.title}\n` +
//       `*Registration Code:* ${uniqueCode}\n\n` +
//       `Please find my payment receipt attached below.`
//     );
//     window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
//   };

//   return (
//     <>
//     <motion.div variants={modalBackdrop} initial="hidden" animate="show" exit="hidden" className="fixed inset-0 bg-black/60 flex items-center justify-center z-[150] p-4 sm:p-6 backdrop-blur-sm">
//       <motion.div variants={modalContent} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
//         {/* Header */}
//         <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-6 text-white flex justify-between items-start shrink-0 relative z-10">
//           <div>
//             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
//               <course.icon size={24} />
//             </div>
//             <h2 className="text-2xl font-extrabold tracking-wide">{course.title}</h2>
//             <p className="text-sm font-medium text-white/80 mt-1">{course.duration} Intensive Training</p>
//           </div>
//           <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Modal Body (Scrollable) */}
//         <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-slate-50">
          
//           {/* STEP 1: CURRICULUM */}
//           {step === "curriculum" && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//               <div>
//                 <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
//                   <BookOpen className="w-4 h-4" /> Course Curriculum
//                 </h4>
//                 <ul className="space-y-3">
//                   {course.curriculum.map((module, idx) => (
//                     <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//                       <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-[#4B0163] flex items-center justify-center text-xs font-bold">{idx + 1}</span>
//                       <span className="text-sm font-semibold text-gray-700 leading-snug pt-0.5">{module}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div>
//                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Tuition</p>
//                   <p className="text-3xl font-black text-[#4B0163]">{course.price}</p>
//                 </div>
//                 <button onClick={handleEnrollClick} className="w-full sm:w-auto bg-[#4B0163] hover:bg-appNav text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95">
//                   Enroll Now <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {/* STEP 2: REGISTRATION FORM */}
//           {step === "form" && (
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//                <div className="text-center mb-6">
//                   <h3 className="text-xl font-extrabold text-gray-900">Trainee Details</h3>
//                   <p className="text-sm text-gray-500 mt-1">Enter your details to register and generate your unique ID.</p>
//                </div>
               
//                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Title *</label>
//                         <select required value={payload.title} onChange={e => setPayload({...payload, title: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
//                             <option value="" disabled>Select...</option>
//                             <option value="Mr.">Mr.</option>
//                             <option value="Mrs.">Mrs.</option>
//                             <option value="Miss">Miss</option>
//                             <option value="Ms.">Ms.</option>
//                             <option value="Dr.">Dr.</option>
//                             <option value="Prof.">Prof.</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Gender *</label>
//                         <select required value={payload.gender} onChange={e => setPayload({...payload, gender: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
//                             <option value="" disabled>Select...</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                             <option value="Prefer not to say">Prefer not to say</option>
//                         </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">First Name *</label>
//                         <input required type="text" value={payload.firstName} onChange={e => setPayload({...payload, firstName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="John" />
//                     </div>
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Last Name *</label>
//                         <input required type="text" value={payload.lastName} onChange={e => setPayload({...payload, lastName: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="Doe" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address *</label>
//                         <input required type="email" value={payload.email} onChange={e => setPayload({...payload, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="john@example.com" />
//                     </div>
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number *</label>
//                         <input required type="tel" value={payload.phone} onChange={e => setPayload({...payload, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="08012345678" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Age *</label>
//                         <input required type="number" min="16" max="99" value={payload.age} onChange={e => setPayload({...payload, age: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="25" />
//                     </div>
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Date of Birth *</label>
//                         <input required type="date" value={payload.DOB} onChange={e => setPayload({...payload, DOB: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Marital Status *</label>
//                         <select required value={payload.maritalStatus} onChange={e => setPayload({...payload, maritalStatus: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all appearance-none cursor-pointer">
//                             <option value="" disabled>Select status...</option>
//                             <option value="Single">Single</option>
//                             <option value="Married">Married</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Years of Experience *</label>
//                         <input required type="number" min="0" max="50" value={payload.yearsOfExperience} onChange={e => setPayload({...payload, yearsOfExperience: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. 2" />
//                     </div>
//                   </div>

//                   <div>
//                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Occupation *</label>
//                       <input required type="text" value={payload.occupation} onChange={e => setPayload({...payload, occupation: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="e.g. Graphic Designer" />
//                   </div>

//                   <div>
//                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Address *</label>
//                       <input required type="text" value={payload.address} onChange={e => setPayload({...payload, address: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all" placeholder="123 Tech Street, City" />
//                   </div>

//                   <div>
//                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Reason for Application *</label>
//                       <textarea required value={payload.reasonForApplication} onChange={e => setPayload({...payload, reasonForApplication: e.target.value})} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B0163] focus:ring-1 transition-all resize-none" placeholder="Briefly state why you want to join this cohort..." />
//                   </div>
                  
//                   <div className="pt-4 flex gap-3">
//                     <button type="button" disabled={isSubmitting} onClick={() => setStep("curriculum")} className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50">Back</button>
//                     <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#4B0163] hover:bg-appNav text-white font-bold py-3.5 rounded-xl shadow-md transition-colors active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2">
//                       {isSubmitting ? (
//                         <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
//                       ) : "Generate Code"}
//                     </button>
//                   </div>
//                </form>
//             </motion.div>
//           )}

//           {/* STEP 3: PAYMENT INSTRUCTIONS & ONBOARDING */}
//           {step === "payment" && (
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
//                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
//                     <CheckCircle2 className="w-8 h-8 text-green-500" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-2xl font-extrabold text-gray-900">Registration Initiated!</h3>
//                   <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Make a transfer of <span className="font-bold text-[#4B0163]">{course.price}</span> to any of our business accounts below. Once paid, schedule your onboarding interview and share your receipt via WhatsApp.</p>
//                 </div>

//                 {/* Unique Code Block */}
//                 <div className="w-full bg-purple-50 border-2 border-purple-200 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center">
//                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Your Unique Code</span>
//                   <span className="text-2xl font-black text-[#4B0163] tracking-widest">{uniqueCode}</span>
//                 </div>

//                 {/* Bank Details Block (Multiple Banks) */}
//                 <div className="w-full space-y-3 text-left">
//                   <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pb-1 flex items-center gap-2">
//                     <Building className="w-4 h-4"/> Approved Bank Accounts
//                   </h4>
                  
//                   {BANK_ACCOUNTS.map((bank, idx) => (
//                     <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                       <div>
//                         <p className="text-xs font-bold text-gray-500">{bank.bank} <span className="ml-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{bank.currency}</span></p>
//                         <p className="text-sm font-semibold text-gray-800">{bank.name}</p>
//                       </div>
//                       <div className="text-lg font-black text-[#4B0163] bg-purple-50 px-3 py-1 rounded-lg">
//                         {bank.number}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Call to Actions */}
//                 <div className="w-full flex flex-col sm:flex-row gap-3 pt-4">
//                   <button onClick={() => setIsCalendarOpen(true)} className="w-full sm:w-1/2 bg-appBlack hover:bg-[#4B0163] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
//                     <CalendarIcon className="w-4 h-4" /> Schedule Interview
//                   </button>
//                   <button onClick={handleWhatsAppRedirect} className="w-full sm:w-1/2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm">
//                     <Phone className="w-4 h-4" /> Send Receipt
//                   </button>
//                 </div>
//             </motion.div>
//           )}

//         </div>
//       </motion.div>
//     </motion.div>

//     {/* Dedicated Academy Calendar Modal inside the Course Modal context */}
//     <AnimatePresence>
//       {isCalendarOpen && <AcademyCalendarModal onClose={() => setIsCalendarOpen(false)} />}
//     </AnimatePresence>
//     </>
//   );
// };


// // ==========================================
// // MAIN ACADEMY PAGE
// // ==========================================
// export default function AcademyPage() {
//   const [activeCourse, setActiveCourse] = useState(coursesData[0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Cohort Control Switch (Set to false when registration closes)
//   const isCohortOpen = true; 

//   function setIsLoginOpen(_: boolean) {}
//   function setIsRegisterOpen(_: boolean) {}

//   return (
//     <div className="w-full flex flex-col relative bg-slate-50 min-h-screen overflow-hidden">
      
//       <style jsx>{`
//           .hide-scrollbar::-webkit-scrollbar { display: none; }
//           .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <Header2
//         onLoginClick={() => setIsLoginOpen(true)}
//         onRegisterClick={() => setIsRegisterOpen(true)}
//       />

//       <Banner
//         image={academyBanner}
//         title="DUSACORE Academy"
//         description="Accelerate your career. Train with world-class professionals and build real-life enterprise software projects."
//         alt="DUSACORE Academy Banner"
//       />

//       <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
//         {/* COHORT ANNOUNCEMENT BAR */}
//         <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
//            <div className="absolute top-0 left-0 w-2 h-full bg-[#4B0163]" />
//            <div>
//               <div className="flex items-center gap-3 mb-2">
//                  <span className={`flex w-3 h-3 rounded-full ${isCohortOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
//                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Cohort 2026</span>
//               </div>
//               <h3 className="text-2xl sm:text-3xl font-extrabold text-appTitleBgColor">Summer Engineering Program</h3>
//            </div>
           
//            <div className="flex flex-col sm:items-end text-center sm:text-right">
//               {isCohortOpen ? (
//                 <>
//                   <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200 mb-2">Registration Open</span>
//                   <span className="text-xs text-gray-500 font-medium">Select a track below to enroll.</span>
//                 </>
//               ) : (
//                 <span className="bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200">Registration Closed</span>
//               )}
//            </div>
//         </div>

//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="text-xs font-bold uppercase tracking-widest text-appBanner bg-appBanner/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
//             <GraduationCap className="w-4 h-4" /> The DUSA Advantage
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-appTitleBgColor mt-6 tracking-tight">
//             Intern as you train.
//           </h2>
//           <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed font-medium bg-purple-50 p-4 rounded-xl border border-purple-100">
//             We don't just teach theory. Our curricula integrate you directly into our engineering pods. You will work alongside world-class professionals on <strong className="text-[#4B0163]">real-life software projects</strong> destined for production.
//           </p>
//         </div>

//         {/* 5D INTERACTIVE SHOWCASE GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          
//           {/* LEFT: Course Selection List */}
//           <motion.div 
//             variants={listContainerVariants}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="lg:col-span-4 flex flex-col gap-3 relative z-20"
//           >
//             {coursesData.map((course) => {
//               const Icon = course.icon;
//               const isActive = activeCourse.id === course.id;
              
//               return (
//                 <motion.button
//                   variants={listItemVariants}
//                   key={course.id}
//                   onClick={() => setActiveCourse(course)}
//                   className={`w-full flex items-center gap-4 p-4 text-left rounded-2xl transition-all duration-300 border-2 outline-none group ${
//                     isActive 
//                       ? "bg-white border-[#4B0163] shadow-xl shadow-purple-900/10 scale-[1.02] z-10" 
//                       : "bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md"
//                   }`}
//                 >
//                   <div className={`p-3 rounded-xl transition-all duration-300 ${
//                     isActive ? "bg-[#4B0163] text-white shadow-lg" : "bg-white text-gray-400 shadow-sm group-hover:text-[#4B0163]"
//                   }`}>
//                     <Icon className="w-6 h-6" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className={`text-base font-bold truncate transition-colors ${isActive ? "text-[#4B0163]" : "text-gray-800"}`}>
//                       {course.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 font-semibold mt-1">
//                       {course.price} <span className="mx-1">•</span> {course.duration}
//                     </p>
//                   </div>
//                   <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#4B0163] translate-x-1 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"}`} />
//                 </motion.button>
//               );
//             })}
//           </motion.div>

//           {/* RIGHT: The "5D" Deep Animated Showcase */}
//           <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] w-full" style={{ transformStyle: "preserve-3d" }}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeCourse.id}
//                 variants={showcaseVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
//                 style={{ transformStyle: "preserve-3d" }} 
//               >
                
//                 {/* 3D Content Header */}
//                 <div className="relative w-full p-8 sm:p-10 shrink-0 overflow-hidden bg-gradient-to-br from-gray-900 to-appTitleBgColor text-white">
//                   <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
//                   <div className="relative z-10 flex flex-col h-full justify-end" style={{ transform: "translateZ(50px)" }}>
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
//                         <activeCourse.icon className="w-6 h-6 text-white" />
//                       </div>
//                       <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20">
//                         {activeCourse.duration}
//                       </span>
//                     </div>
//                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2">
//                       {activeCourse.title}
//                     </h2>
//                     <p className="text-white/80 font-medium text-sm sm:text-base max-w-xl">
//                       {activeCourse.tagline}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Content Body */}
//                 <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                  
//                   <div>
//                     <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
//                       {activeCourse.desc}
//                     </p>

//                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
//                       <Zap className="w-4 h-4" /> Core Technologies
//                     </h4>
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {activeCourse.techStack.map((tech, idx) => (
//                         <span key={idx} className="bg-slate-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200">
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Call To Action */}
//                   <div className="pt-6 mt-auto border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
//                     <div>
//                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tuition Fee</p>
//                       <p className="text-2xl font-black text-[#4B0163]">{activeCourse.price}</p>
//                     </div>
                    
//                     <button 
//                       onClick={() => isCohortOpen && setIsModalOpen(true)}
//                       disabled={!isCohortOpen}
//                       className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
//                         isCohortOpen ? "bg-appBlack hover:bg-[#4B0163] text-white group" : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {isCohortOpen ? (
//                         <>View Curriculum & Enroll <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
//                       ) : (
//                         "Registration Closed"
//                       )}
//                     </button>
//                   </div>
//                 </div>

//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* ALL PROGRAMS GRID CARDS */}
//       <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-[1400px] mx-auto">
//           <div className="mb-12 text-center sm:text-left">
//             <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
//               Available Training Programs
//             </h3>
//             <p className="text-gray-500 text-sm sm:text-base mt-2">
//               Select a track below to view the curriculum and begin your enrollment.
//             </p>
//           </div>

//           <motion.div
//             variants={listContainerVariants}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//           >
//             {coursesData.map((course, index) => {
//               const GridIcon = course.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={listItemVariants}
//                   whileHover={{ y: -6, transition: { duration: 0.2 } }}
//                   onClick={() => {
//                     setActiveCourse(course);
//                     window.scrollTo({ top: 400, behavior: "smooth" });
//                   }}
//                   className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
//                 >
//                   <div>
//                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
//                       <GridIcon className="w-5 h-5" />
//                     </div>
//                     <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2">
//                       {course.title}
//                     </h4>
//                     <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
//                       {course.desc}
//                     </p>
//                   </div>
//                   <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
//                     <span className="text-sm font-black text-[#4B0163]">{course.price}</span>
//                     <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{course.duration}</span>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       <Footer />

//       {/* Render Modal */}
//       <AnimatePresence>
//         {isModalOpen && <CourseModal course={activeCourse} onClose={() => setIsModalOpen(false)} />}
//       </AnimatePresence>
//     </div>
//   );
// }