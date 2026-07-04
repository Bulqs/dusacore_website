"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight, X, BookOpen, User, Mail, Building, CheckCircle2, Phone, Calendar as CalendarIcon,
  GraduationCap
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Header2 from "@/app/components/dusacomponent/Header2";
import Footer from "@/app/components/dusacomponent/Footer";
import Banner from "@/app/components/dusacomponent/Banner";
import academyBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
import { academyCourses, BANK_ACCOUNTS, WHATSAPP_NUMBER, AcademyCourse } from "@/data/academyData";
import AcademyTabNav from "@/app/components/dusacomponent/dusaacademypage/AcademyTabNav";
import AcademyDetailPanel from "@/app/components/dusacomponent/dusaacademypage/AcademyDetailPanel";

// --- ANIMATION VARIANTS (Matching Products Page) ---
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
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

const CourseModal = ({ course, onClose }: { course: AcademyCourse, onClose: () => void }) => {
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

  const handleEnrollClick = () => setStep("form");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const generatedCode = `DUSA-${Math.floor(1000 + Math.random() * 9000)}-${course.id.substring(0,3).toUpperCase()}`;
    setUniqueCode(generatedCode);

    try {
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
      setStep("payment");
    }
  };

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

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-slate-50">
          
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

          {step === "payment" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Registration Initiated!</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Make a transfer of <span className="font-bold text-[#4B0163]">{course.price}</span> to any of our business accounts below. Once paid, schedule your onboarding interview and share your receipt via WhatsApp.</p>
                </div>

                <div className="w-full bg-purple-50 border-2 border-purple-200 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Your Unique Code</span>
                  <span className="text-2xl font-black text-[#4B0163] tracking-widest">{uniqueCode}</span>
                </div>

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

    <AnimatePresence>
      {isCalendarOpen && <AcademyCalendarModal onClose={() => setIsCalendarOpen(false)} />}
    </AnimatePresence>
    </>
  );
};

function AcademyContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  // ADDED SAFE FALLBACK
  const safeCourses = academyCourses || [];
  
  const [activeTab, setActiveTab] = useState(tabParam || safeCourses[0]?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function setIsLoginOpen(_: boolean) {}
  function setIsRegisterOpen(_: boolean) {}

  const activeCourse = safeCourses.find((c) => c.id === activeTab);
  const isCohortOpen = true;

  return (
    <div className="w-full flex flex-col relative bg-gray-50 min-h-screen">
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

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* COHORT ANNOUNCEMENT BAR */}
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="absolute top-0 left-0 w-2 h-full bg-appBanner" />
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
            We don&apos;t just teach theory. Our curricula integrate you directly into our engineering pods. You will work alongside world-class professionals on <strong className="text-appBanner">real-life software projects</strong> destined for production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
          <AcademyTabNav
            courses={safeCourses}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeCourse && (
            <AcademyDetailPanel
              course={activeCourse}
              isCohortOpen={isCohortOpen}
              onEnroll={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </section>

      {/* REPLACED EXTERNAL COMPONENT WITH INLINE GRID MATCHING PRODUCTS PAGE */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
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
            {safeCourses.map((course, index) => {
              const GridIcon = course.icon;
              
              return (
                <motion.div
                  key={course.id || index}
                  variants={listItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setActiveTab(course.id);
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:bg-white hover:border-[#4B0163]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-200 mb-5 text-[#4B0163] group-hover:bg-[#4B0163] group-hover:text-white transition-all duration-300 shadow-sm">
                      {GridIcon && <GridIcon className="w-5 h-5" />}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#4B0163] transition-colors mb-2 leading-tight">
                      {course.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {course.desc}
                    </p>
                  </div>
                  
                  {/* Consistent Bottom Layout matching Products page */}
                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate pr-2">
                      {course.duration}
                    </span>
                    <span className="text-xs font-bold text-[#4B0163] bg-purple-50 px-2 py-1 rounded-md whitespace-nowrap">
                      {course.price}
                    </span>
                  </div>
                  
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {isModalOpen && activeCourse && <CourseModal course={activeCourse} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default function AcademyPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AcademyContent />
    </Suspense>
  );
}

// "use client";

// import React, { useState, Suspense } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import {
//   ArrowRight, X, BookOpen, User, Mail, Building, CheckCircle2, Phone, Calendar as CalendarIcon,
//   GraduationCap
// } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import Header2 from "@/app/components/dusacomponent/Header2";
// import Footer from "@/app/components/dusacomponent/Footer";
// import Banner from "@/app/components/dusacomponent/Banner";
// import academyBanner from "@/public/images/dusacoreimages/dusacoreabout.jpg";
// import { academyCourses, BANK_ACCOUNTS, WHATSAPP_NUMBER, AcademyCourse } from "@/data/academyData";
// import AcademyTabNav from "@/app/components/dusacomponent/dusaacademypage/AcademyTabNav";
// import AcademyDetailPanel from "@/app/components/dusacomponent/dusaacademypage/AcademyDetailPanel";
// import AcademyGridCards from "@/app/components/dusacomponent/dusaacademypage/AcademyGridCards";

// const modalBackdrop: Variants = {
//   hidden: { opacity: 0, backdropFilter: "blur(0px)" },
//   show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
// };

// const modalContent: Variants = {
//   hidden: { scale: 0.95, opacity: 0, y: 20 },
//   show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
//   exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
// };

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

// const CourseModal = ({ course, onClose }: { course: AcademyCourse, onClose: () => void }) => {
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

//   const handleEnrollClick = () => setStep("form");

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const generatedCode = `DUSA-${Math.floor(1000 + Math.random() * 9000)}-${course.id.substring(0,3).toUpperCase()}`;
//     setUniqueCode(generatedCode);

//     try {
//       const url = '/api/enroll'; 
      
//       const body = {
//         dusaAcademyCohort: {
//           title: payload.title,
//           gender: payload.gender,
//           firstName: payload.firstName,
//           lastName: payload.lastName,
//           uniqueCode: generatedCode,
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
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) {
//         console.warn("Failed to sync with internal server API.");
//         const errorData = await response.text();
//         console.error("Server API Error:", errorData);
//       } else {
//         const json = await response.json();
//         console.log("Registration successfully proxied via server:", json);
//       }
//     } catch (error) {
//       console.error("Fetch API error:", error);
//     } finally {
//       setIsSubmitting(false);
//       setStep("payment");
//     }
//   };

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

//         <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 bg-slate-50">
          
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

//           {step === "payment" && (
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 py-4">
//                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
//                     <CheckCircle2 className="w-8 h-8 text-green-500" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-2xl font-extrabold text-gray-900">Registration Initiated!</h3>
//                   <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Make a transfer of <span className="font-bold text-[#4B0163]">{course.price}</span> to any of our business accounts below. Once paid, schedule your onboarding interview and share your receipt via WhatsApp.</p>
//                 </div>

//                 <div className="w-full bg-purple-50 border-2 border-purple-200 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center">
//                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Your Unique Code</span>
//                   <span className="text-2xl font-black text-[#4B0163] tracking-widest">{uniqueCode}</span>
//                 </div>

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

//     <AnimatePresence>
//       {isCalendarOpen && <AcademyCalendarModal onClose={() => setIsCalendarOpen(false)} />}
//     </AnimatePresence>
//     </>
//   );
// };

// function AcademyContent() {
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab");
//   const [activeTab, setActiveTab] = useState(tabParam || academyCourses[0].id);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   function setIsLoginOpen(_: boolean) {}
//   function setIsRegisterOpen(_: boolean) {}

//   const activeCourse = academyCourses.find((c) => c.id === activeTab);
//   const isCohortOpen = true;

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
//         image={academyBanner}
//         title="DUSACORE Academy"
//         description="Accelerate your career. Train with world-class professionals and build real-life enterprise software projects."
//         alt="DUSACORE Academy Banner"
//       />

//       <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {/* COHORT ANNOUNCEMENT BAR */}
//         <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
//            <div className="absolute top-0 left-0 w-2 h-full bg-appBanner" />
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
//             We don&apos;t just teach theory. Our curricula integrate you directly into our engineering pods. You will work alongside world-class professionals on <strong className="text-appBanner">real-life software projects</strong> destined for production.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" style={{ perspective: "1500px" }}>
//           <AcademyTabNav
//             courses={academyCourses}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//           />

//           {activeCourse && (
//             <AcademyDetailPanel
//               course={activeCourse}
//               isCohortOpen={isCohortOpen}
//               onEnroll={() => setIsModalOpen(true)}
//             />
//           )}
//         </div>
//       </section>

//       <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h3 className="text-2xl sm:text-3xl font-bold text-appTitleBgColor">
//               Available Training Programs
//             </h3>
//             <p className="text-gray-500 text-sm sm:text-base mt-2">
//               Select a track below to view the curriculum and begin your enrollment.
//             </p>
//           </div>

//           <AcademyGridCards
//             courses={academyCourses}
//             onCardClick={(id: string) => {
//               setActiveTab(id);
//               window.scrollTo({ top: 400, behavior: "smooth" });
//             }}
//           />
//         </div>
//       </section>

//       <Footer />

//       <AnimatePresence>
//         {isModalOpen && activeCourse && <CourseModal course={activeCourse} onClose={() => setIsModalOpen(false)} />}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function AcademyPage() {
//   return (
//     <Suspense fallback={
//       <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin" />
//       </div>
//     }>
//       <AcademyContent />
//     </Suspense>
//   );
// }
