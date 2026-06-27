"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { FiX, FiCalendar } from "react-icons/fi";
import { motion, Variants, AnimatePresence } from "framer-motion";
import logodusa from "@/public/images/dusacoreimages/logodusa.png";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

// --- MODAL ANIMATIONS ---
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
                            <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Book a Consultation</h2>
                            <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 hidden sm:block">Select a time that works best for you.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Google Calendar Iframe Container */}
                <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
                            <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
                        </div>
                    )}
                    
                    {/* Embedded Form for optimal UX */}
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


// ========================================================
// MAIN FOOTER COMPONENT
// ========================================================
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Social Links Data
  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://web.facebook.com/profile.php?id=61590936920783&sk=about_details" },
    { icon: <FaTwitter />, href: "https://x.com/DUSACORE" },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/in/dusacore/",
    },
    {
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@dusaxcore8",
    },
  ];

  // Navigation Sections Data
  const footerSections = [
    {
      title: "Explore",
      links: ["About DUSA", "Services", "Projects", "How we work"],
    },
    {
      title: "Services",
      links: [
        "Software Engineering",
        "Technology Education",
        "Artificial Intelligence",
        "Consultations",
        "Product Design/ Branding",
      ],
    },
    {
      title: "CASE STUDIES",
      links: ["Bulq E-Commerce", "SendBulq Logistics", "Cookie Policy"],
    },
    {
      title: "RESOURCES",
      links: ["Blogs", "Community", "Nigeria", "FAQs", "Contact"],
    },
    {
      title: "COUNTRIES",
      links: ["Nigeria", "UK", "Canada"],
    },
  ];

  return (
    <>
      {/* =========================================
                NEW FULL-WIDTH CTA BANNER 
            ========================================= */}
      <section className="w-full bg-appPurple py-8 md:py-16 lg:py-20 px-6 flex flex-col items-center justify-center text-center relative z-20">
        <div className="mb-4">
          <h2 className="text-montserrat text-appWhite font-bold text-3xl md:text-5xl tracking-wide">
            Let’s Build Something Meaningful
          </h2>
        </div>

        <div className="mb-10 max-w-3xl">
          <p className="text-montserrat text-appWhite font-medium text-base md:text-lg leading-relaxed">
            Whether you're modernizing systems or building new digital
            infrastructure, DUSA CORE helps you design and engineer the future
            of your organization.
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center">
          {/* Linked to the internal modal state */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-appPurple text-appWhite border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-appWhite hover:text-appPurple transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Book a Consultation
          </button>
          
          {/* Changed to Next.js Link pointing to /aboutus */}
          <Link 
            href="/aboutus"
            className="inline-flex items-center justify-center bg-appWhite text-appPurple border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* =========================================
                EXISTING FOOTER (Light Purple Navs)
            ========================================= */}
      <footer className="relative bg-appLightPurple text-white pt-16 pb-4 px-6 sm:px-8 lg:px-12 border-t border-gray-800 overflow-hidden">
        
        {/* Ambient Background Glows */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* RESPONSIVE LAYOUT FIX:
              - Mobile: Grid splits into 1 col for Newsletter, then 2 cols for Nav.
              - Desktop: Grid splits into 7 total columns (2 for Newsletter, 5 for Navs).
          */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-8">
            
            {/* Left Column: Newsletter & Socials (Always Full Width on Mobile) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-teachers text-[#0E0E0E] font-bold text-[16px] tracking-wide">
                  Sign up for our newsletter
                </h3>
                <form className="flex w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-l-md bg-appWhite border border-gray-600 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-r-md bg-appPurple text-white font-semibold hover:bg-appNav transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-gray-900 text-sm font-bold uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={social.href}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-appNav border border-appNav hover:bg-appPurple hover:border-appPurple hover:shadow-[0_0_15px_rgba(131,0,175,0.5)] text-white hover:text-white transition-colors duration-300"
                      >
                        <span className="text-lg">{social.icon}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Columns (2 Cols on Mobile, 5 Cols on Desktop) */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {footerSections.map((section, idx) => (
                <motion.div variants={itemVariants} key={idx} className="flex flex-col">
                  <h3 className="text-montserrat text-appNav font-extrabold text-[14px] mb-4 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-3 pl-0 list-none">
                    {section.links.map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="pl-0"
                      >
                        <Link
                          href="#"
                          className="text-montserrat text-appBlack hover:text-appPurple text-sm font-medium transition-colors duration-200 inline-flex items-start group"
                        >
                          <span className="w-0 h-px bg-appPurple transition-all duration-300 group-hover:w-3 mt-2.5 mr-0 group-hover:mr-2 shrink-0"></span>
                          <span className="leading-tight">{item}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800/20 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 mt-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-montserrat text-appBlack text-sm text-center md:text-left font-medium">
                © {new Date().getFullYear()} DUSACORE. All rights reserved.
              </p>

              <div className="flex gap-4 text-sm text-montserrat text-appBlack font-medium">
                <Link href="#" className="hover:text-appPurple transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-appPurple transition-colors">Terms</Link>
                <Link href="#" className="hover:text-appPurple transition-colors">Sitemap</Link>
              </div>
            </div>

            <Link href="/" className="inline-block group p-1 rounded-lg bg-appLightPurple">
              <Image
                src={logodusa}
                alt="DUSA Logo"
                width={80}
                height={40}
                className="w-20 h-10 object-contain"
                priority
              />
            </Link>
          </motion.div>
        </motion.div>
      </footer>

      {/* Mount Consultation Modal Fluidly on the Same Page Context */}
      <AnimatePresence>
        {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Footer;

// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTiktok,
// } from "react-icons/fa";
// import { motion, Variants } from "framer-motion";
// import logodusa from "@/public/images/dusacoreimages/logodusa.png";

// // --- ANIMATION VARIANTS ---
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 120, damping: 15 },
//   },
// };

// const Footer = () => {
//   // Social Links Data
//   const socialLinks = [
//     { icon: <FaFacebookF />, href: "https://web.facebook.com/profile.php?id=61590936920783&sk=about_details" },
//     { icon: <FaTwitter />, href: "https://x.com/DUSACORE" },
//     // {
//     //   icon: <FaInstagram />,
//     //   href: "https://www.instagram.com/bulq.ca?igsh=dG5iN2UwaDNuZnRn",
//     // },
//     {
//       icon: <FaLinkedinIn />,
//       href: "https://www.linkedin.com/in/dusacore/",
//     },
//     {
//       icon: <FaTiktok />,
//       href: "https://www.tiktok.com/@dusaxcore8",
//     },
//   ];

//   // Navigation Sections Data
//   const footerSections = [
//     {
//       title: "Explore",
//       links: ["About DUSA", "Services", "Projects", "How we work"],
//     },
//     {
//       title: "Services",
//       links: [
//         "Software Engineering",
//         "Technology Education",
//         "Artificial Intelligence",
//         "Consultations",
//         "Product Design/ Branding",
//       ],
//     },
//     {
//       title: "CASE STUDIES",
//       links: ["Bulq E-Commerce", "SendBulq Logistics", "Cookie Policy"],
//     },
//     {
//       title: "RESOURCES",
//       links: ["Blogs", "Community", "Nigeria", "FAQs", "Contact"],
//     },
//     {
//       title: "COUNTRIES",
//       links: ["Nigeria", "UK", "Canada"],
//     },
//   ];

//   return (
//     <>
//       {/* =========================================
//                 NEW FULL-WIDTH CTA BANNER 
//             ========================================= */}
//       <section className="w-full bg-appPurple py-8 md:py-16 lg:py-20 px-6 flex flex-col items-center justify-center text-center relative z-20">
//         <div className="mb-4">
//           <h2 className="text-montserrat text-appWhite font-bold text-3xl md:text-5xl tracking-wide">
//             Let’s Build Something Meaningful
//           </h2>
//         </div>

//         <div className="mb-10 max-w-3xl">
//           <p className="text-montserrat text-appWhite font-medium text-base md:text-lg leading-relaxed">
//             Whether you're modernizing systems or building new digital
//             infrastructure, DUSA CORE helps you design and engineer the future
//             of your organization.
//           </p>
//         </div>

//         <div className="flex flex-row gap-4 items-center justify-center">
//           <button className="bg-appPurple text-appWhite border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-appWhite hover:text-appPurple transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
//             Book a Consultation
//           </button>
//           <button className="bg-appWhite text-appPurple border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
//             Get a Quote
//           </button>
//         </div>
//       </section>

//       {/* =========================================
//                 EXISTING FOOTER (Light Purple Navs)
//             ========================================= */}
//       <footer className="relative bg-appLightPurple text-white pt-16 pb-4 px-6 sm:px-8 lg:px-12 border-t border-gray-800 overflow-hidden">
        
//         {/* Ambient Background Glows */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
//           <motion.div
//             animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
//           />
//           <motion.div
//             animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.2, 1] }}
//             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//             className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
//           />
//         </div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-50px" }}
//           className="max-w-7xl mx-auto relative z-10"
//         >
//           {/* RESPONSIVE LAYOUT FIX:
//               - Mobile: Grid splits into 1 col for Newsletter, then 2 cols for Nav.
//               - Desktop: Grid splits into 7 total columns (2 for Newsletter, 5 for Navs).
//           */}
//           <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-8">
            
//             {/* Left Column: Newsletter & Socials (Always Full Width on Mobile) */}
//             <motion.div
//               variants={itemVariants}
//               className="lg:col-span-2 flex flex-col gap-6"
//             >
//               <div className="flex flex-col gap-2">
//                 <h3 className="font-teachers text-[#0E0E0E] font-bold text-[16px] tracking-wide">
//                   Sign up for our newsletter
//                 </h3>
//                 <form className="flex w-full max-w-sm">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full px-4 py-2.5 rounded-l-md bg-appWhite border border-gray-600 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple transition-colors"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="px-6 py-2.5 rounded-r-md bg-appPurple text-white font-semibold hover:bg-appNav transition-colors"
//                   >
//                     Subscribe
//                   </button>
//                 </form>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <h4 className="text-gray-900 text-sm font-bold uppercase tracking-wider">
//                   Follow Us
//                 </h4>
//                 <div className="flex gap-4">
//                   {socialLinks.map((social, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ scale: 1.15, y: -4 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Link
//                         href={social.href}
//                         className="w-11 h-11 flex items-center justify-center rounded-full bg-appNav border border-appNav hover:bg-appPurple hover:border-appPurple hover:shadow-[0_0_15px_rgba(131,0,175,0.5)] text-white hover:text-white transition-colors duration-300"
//                       >
//                         <span className="text-lg">{social.icon}</span>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Navigation Columns (2 Cols on Mobile, 5 Cols on Desktop) */}
//             <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
//               {footerSections.map((section, idx) => (
//                 <motion.div variants={itemVariants} key={idx} className="flex flex-col">
//                   <h3 className="text-montserrat text-appNav font-extrabold text-[14px] mb-4 tracking-wider uppercase">
//                     {section.title}
//                   </h3>
//                   <ul className="space-y-3 pl-0 list-none">
//                     {section.links.map((item) => (
//                       <motion.li
//                         key={item}
//                         whileHover={{ x: 6 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                         className="pl-0"
//                       >
//                         <Link
//                           href="#"
//                           className="text-montserrat text-appBlack hover:text-appPurple text-sm font-medium transition-colors duration-200 inline-flex items-start group"
//                         >
//                           {/* Adds a slight top margin to the line so it aligns nicely with wrapped text */}
//                           <span className="w-0 h-px bg-appPurple transition-all duration-300 group-hover:w-3 mt-2.5 mr-0 group-hover:mr-2 shrink-0"></span>
//                           <span className="leading-tight">{item}</span>
//                         </Link>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               ))}
//             </div>
            
//           </div>

//           {/* Bottom Bar */}
//           <motion.div
//             variants={itemVariants}
//             className="border-t border-gray-800/20 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 mt-12"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-4">
//               <p className="text-montserrat text-appBlack text-sm text-center md:text-left font-medium">
//                 © {new Date().getFullYear()} DUSACORE. All rights reserved.
//               </p>

//               <div className="flex gap-4 text-sm text-montserrat text-appBlack font-medium">
//                 <Link href="#" className="hover:text-appPurple transition-colors">Privacy</Link>
//                 <Link href="#" className="hover:text-appPurple transition-colors">Terms</Link>
//                 <Link href="#" className="hover:text-appPurple transition-colors">Sitemap</Link>
//               </div>
//             </div>

//             <Link href="/" className="inline-block group p-1 rounded-lg bg-appLightPurple">
//               <Image
//                 src={logodusa}
//                 alt="DUSA Logo"
//                 width={80}
//                 height={40}
//                 className="w-20 h-10 object-contain"
//                 priority
//               />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </footer>
//     </>
//   );
// };

// export default Footer;