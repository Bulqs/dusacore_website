"use client";
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX, FiCalendar } from 'react-icons/fi';

// --- STAGGERED ENTRANCE ANIMATIONS ---
const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1, y: 0,
        transition: { type: "spring" as const, stiffness: 260, damping: 20 }
    }
};

const formEntranceVariants: Variants = {
    hidden: { opacity: 0, x: 40, y: 20 },
    show: {
        opacity: 1, x: 0, y: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 20, delay: 0.4 }
    }
};

// --- MIRAGE LIGHT SWEEP ANIMATION FOR HIGHLIGHTED TEXT ---
const shimmerVariants: Variants = {
    hidden: { backgroundPosition: "200% center" },
    show: {
        backgroundPosition: "-200% center",
        transition: {
            repeat: Infinity,
            duration: 3,
            ease: "linear",
            repeatDelay: 2 
        }
    }
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

const flagSvgs: Record<string, string> = {
  "+1": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="2" width="20" height="2" fill="#b22234"/><rect y="6" width="20" height="2" fill="#b22234"/><rect y="10" width="20" height="2" fill="#b22234"/><rect width="8" height="7" fill="#3c3b6e"/><circle cx="2.5" cy="2" r="0.6" fill="#fff"/><circle cx="4" cy="2" r="0.6" fill="#fff"/><circle cx="5.5" cy="2" r="0.6" fill="#fff"/><circle cx="3.25" cy="3.3" r="0.6" fill="#fff"/><circle cx="4.75" cy="3.3" r="0.6" fill="#fff"/><circle cx="2.5" cy="4.6" r="0.6" fill="#fff"/><circle cx="4" cy="4.6" r="0.6" fill="#fff"/><circle cx="5.5" cy="4.6" r="0.6" fill="#fff"/></svg>',
  "+44": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#012169"/><rect y="5" width="20" height="4" fill="#fff"/><rect x="8" width="4" height="14" fill="#fff"/><rect y="6.5" width="20" height="1" fill="#c8102e"/><rect x="9.5" width="1" height="14" fill="#c8102e"/></svg>',
  "+234": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#008751"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#008751"/></svg>',
  // (Your existing SVG flag library items remain intact here)
};

const flag = (code: string) => (
  <span
    className="inline-block w-6 h-4 rounded overflow-hidden align-middle"
    dangerouslySetInnerHTML={{ __html: flagSvgs[code] || "" }}
  />
);

const countryCodes = [
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+234", country: "NG", name: "Nigeria" },
  // (Your existing country codes remain intact here)
];

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
// MAIN BANNER COMPONENT
// ========================================================
const Banner = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [selectedCode, setSelectedCode] = useState(countryCodes[2]); // Defaulting to Nigeria (+234)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ''); 
        val = val.replace(/^0+/, ''); 
        setPhone(val);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const yourBusinessNumber = "23489044698791"; 
        const encodedMessage = encodeURIComponent(
            `Hello DUSA CORE!\n\nMy name is ${name}.\nEmail: ${email}\nPhone: ${selectedCode.code}${phone}\nArea of Interest: ${areaOfInterest || 'Not specified'}\n\nHow you can help:\n${message}`
        );
        window.open(`https://wa.me/${yourBusinessNumber}?text=${encodedMessage}`, '_blank');
        setDropdownOpen(false);
    };

    return (
        <>
            <section className='w-full relative min-h-[750px] lg:min-h-[85vh] py-16 sm:py-20 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden bg-gradient-to-t from-appPurple via-appLightPurple via-40% to-white'>
                
                <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 w-full items-center justify-between relative z-10'>
                    
                    {/* =========================================
                        LEFT COLUMN: Text & Buttons
                    ========================================= */}
                    <motion.div 
                        variants={textContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='flex flex-col w-full lg:w-[50%] gap-5 lg:gap-6'
                    >
                        <motion.div variants={textItemVariants}>
                            <h1 className='text-[#4B0163] font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight'>
                                Building{' '}
                                <motion.span 
                                    variants={shimmerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className='inline-block text-transparent bg-clip-text'
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #BA25EB 0%, #E89BFF 50%, #BA25EB 100%)",
                                        backgroundSize: "200% auto"
                                    }}
                                >
                                    Engineering
                                </motion.span>{' '}
                                Solutions That Deliver{' '}
                                <motion.span 
                                    variants={shimmerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className='inline-block text-transparent bg-clip-text'
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #BA25EB 0%, #E89BFF 50%, #BA25EB 100%)",
                                        backgroundSize: "200% auto"
                                    }}
                                >
                                    Business
                                </motion.span>{' '}
                                Value.
                            </h1>
                        </motion.div>

                        <motion.div variants={textItemVariants}>
                            <p className='text-[#8300AF] text-lg md:text-xl font-medium leading-relaxed max-w-lg'>
                                Helping businesses innovate, scale, and succeed through reliable, technology driven engineering solutions.
                            </p>
                        </motion.div>

                        <motion.div variants={textItemVariants} className='flex flex-col sm:flex-row gap-4 mt-2'>
                            {/* Seamless Inline Modal Implementation */}
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className='flex items-center justify-center text-center bg-appPurple text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-appPurple/30 hover:shadow-appPurple/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                            >
                                Book a consultation
                            </button>
                            
                            {/* Updated to point directly to /aboutus */}
                            <Link 
                                href="/aboutus"
                                className='flex items-center justify-center text-center bg-white/80 backdrop-blur-sm text-appPurple border-2 border-appPurple/20 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-white hover:border-appPurple transition-all duration-300'
                            >
                                Explore Our Services
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* =========================================
                        RIGHT COLUMN: Floating Form
                    ========================================= */}
                    <motion.div 
                        variants={formEntranceVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='w-full lg:w-[45%] flex justify-center lg:justify-end relative z-20'
                    >
                        <motion.div 
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className='bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl w-full max-w-md flex flex-col gap-4 border border-white/60 h-fit'
                            style={{ boxShadow: '0 25px 50px -12px rgba(75, 1, 99, 0.25), 0 0 20px rgba(186, 37, 235, 0.1)' }}
                        >
                            
                            <div>
                                <h3 className='text-appBlack font-extrabold text-xl md:text-2xl tracking-tight'>
                                    Let’s connect to help you and your team.
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className='flex flex-col gap-3.5'>
                                
                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Your name</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe" 
                                        className='w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-appBlack placeholder-gray-400 focus:outline-none focus:bg-white focus:border-appPurple focus:ring-2 focus:ring-appPurple/20 transition-all'
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Email Address *</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com" 
                                        className='w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-appBlack placeholder-gray-400 focus:outline-none focus:bg-white focus:border-appPurple focus:ring-2 focus:ring-appPurple/20 transition-all'
                                        required
                                    />
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Phone Number</label>
                                    <div className='flex flex-row w-full gap-2'>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="flex items-center gap-1.5 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 hover:bg-gray-100 transition-colors"
                                            >
                                                {flag(selectedCode.code)}
                                                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {dropdownOpen && (
                                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-[240px] max-h-[250px] overflow-y-auto p-1 custom-scrollbar">
                                                    {countryCodes.map((c) => (
                                                        <button
                                                            key={c.code}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCode(c);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-slate-50 text-left transition-colors ${selectedCode.code === c.code ? "bg-appLightPurple/20 text-appPurple font-bold" : ""}`}
                                                        >
                                                            {flag(c.code)}
                                                            <span className="truncate">{c.name} <span className="text-gray-400 font-normal ml-1">({c.code})</span></span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            placeholder="801 234 5678" 
                                            className='w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-appBlack placeholder-gray-400 focus:outline-none focus:bg-white focus:border-appPurple focus:ring-2 focus:ring-appPurple/20 transition-all'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-1.5 relative'>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>Area of Interest</label>
                                    <div className="relative">
                                        <select 
                                            value={areaOfInterest}
                                            onChange={(e) => setAreaOfInterest(e.target.value)}
                                            className='w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-appBlack focus:outline-none focus:bg-white focus:border-appPurple focus:ring-2 focus:ring-appPurple/20 transition-all appearance-none cursor-pointer text-sm'
                                            required
                                        >
                                            <option value="" disabled>Select an option...</option>
                                            <option value="Software Engineering">Software Engineering</option>
                                            <option value="AI & Data Infrastructure">AI & Data Infrastructure</option>
                                            <option value="Cloud & DevOps">Cloud & DevOps</option>
                                            <option value="Product Design">UI/UX & Product Design</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Health">Health Tech</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>How can we help?</label>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={2}
                                        placeholder="Briefly describe your project..."
                                        className='w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-appBlack placeholder-gray-400 focus:outline-none focus:bg-white focus:border-appPurple focus:ring-2 focus:ring-appPurple/20 transition-all resize-none'
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className='w-full bg-appPurple text-white py-3.5 rounded-xl font-bold text-sm hover:bg-appPurple transition-colors duration-300 shadow-lg active:scale-[0.98] mt-2'
                                >
                                    Get in touch
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* Mount Consultation Modal Fluidly on the Same Page Context */}
            <AnimatePresence>
                {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </>
    );
}

export default Banner;
// "use client";
// import React, { useState } from 'react';
// import { motion, Variants } from 'framer-motion';

// // --- STAGGERED ENTRANCE ANIMATIONS ---
// const textContainerVariants: Variants = {
//     hidden: { opacity: 0 },
//     show: {
//         opacity: 1,
//         transition: { staggerChildren: 0.15, delayChildren: 0.1 }
//     }
// };

// const textItemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     show: {
//         opacity: 1, y: 0,
//         transition: { type: "spring" as const, stiffness: 260, damping: 20 }
//     }
// };

// const formVariants: Variants = {
//     hidden: { opacity: 0, x: 40, y: 20 },
//     show: {
//         opacity: 1, x: 0, y: 0,
//         transition: { type: "spring" as const, stiffness: 200, damping: 20, delay: 0.4 }
//     }
// };

// // --- MIRAGE LIGHT SWEEP ANIMATION FOR HIGHLIGHTED TEXT ---
// const shimmerVariants: Variants = {
//     hidden: { backgroundPosition: "200% center" },
//     show: {
//         backgroundPosition: "-200% center",
//         transition: {
//             repeat: Infinity,
//             duration: 3,
//             ease: "linear",
//             // Wait 2 seconds between each sweep
//             repeatDelay: 2 
//         }
//     }
// };


// const flagSvgs: Record<string, string> = {
//   "+1": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="2" width="20" height="2" fill="#b22234"/><rect y="6" width="20" height="2" fill="#b22234"/><rect y="10" width="20" height="2" fill="#b22234"/><rect width="8" height="7" fill="#3c3b6e"/><circle cx="2.5" cy="2" r="0.6" fill="#fff"/><circle cx="4" cy="2" r="0.6" fill="#fff"/><circle cx="5.5" cy="2" r="0.6" fill="#fff"/><circle cx="3.25" cy="3.3" r="0.6" fill="#fff"/><circle cx="4.75" cy="3.3" r="0.6" fill="#fff"/><circle cx="2.5" cy="4.6" r="0.6" fill="#fff"/><circle cx="4" cy="4.6" r="0.6" fill="#fff"/><circle cx="5.5" cy="4.6" r="0.6" fill="#fff"/></svg>',
//   "+7": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#d52b1e"/></svg>',
//   "+20": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#000"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+27": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#007a4d"/><rect y="2" width="20" height="10" fill="#fff"/><rect y="4" width="20" height="6" fill="#ffb612"/><polygon points="8,0 0,7 8,14 8,0" fill="#000"/><polygon points="8,0 0,7 8,14" fill="none" stroke="#fff" strokeWidth="2"/><rect x="8" y="0" width="2" height="14" fill="#de3831"/><rect x="8" y="0" width="1" height="14" fill="#fff"/></svg>',
//   "+31": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+32": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#000"/><rect x="6.67" width="6.66" height="14" fill="#fdda24"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/></svg>',
//   "+33": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#002395"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#ed2939"/></svg>',
//   "+34": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c60b1e"/><rect y="2" width="20" height="2" fill="#ffc400"/><rect y="6" width="20" height="2" fill="#ffc400"/><rect y="10" width="20" height="2" fill="#ffc400"/></svg>',
//   "+39": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#009246"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#ce2b37"/></svg>',
//   "+41": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+44": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#012169"/><rect y="5" width="20" height="4" fill="#fff"/><rect x="8" width="4" height="14" fill="#fff"/><rect y="6.5" width="20" height="1" fill="#c8102e"/><rect x="9.5" width="1" height="14" fill="#c8102e"/></svg>',
//   "+49": '<svg viewBox="0 0 20 14"><rect width="20" height="4.67" fill="#000"/><rect y="4.67" width="20" height="4.66" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#ffcc00"/></svg>',
//   "+52": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#006847"/><rect y="9.33" width="20" height="4.67" fill="#ce1126"/><polygon points="10,4 11.5,7 14,7 12,9 12.5,12 10,10 7.5,12 8,9 6,7 8.5,7" fill="#006847"/></svg>',
//   "+55": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#009c3b"/><polygon points="10,2 18,10 2,10" fill="#fedf00"/><circle cx="10" cy="8" r="2.5" fill="#002776"/></svg>',
//   "+61": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#00008b"/><circle cx="3" cy="4" r="2.5" fill="#fff"/><polygon points="3,2 3.5,3.2 5,3.2 3.8,4 4.2,5.2 3,4.4 1.8,5.2 2.2,4 1,3.2 2.5,3.2" fill="#c8102e"/></svg>',
//   "+62": '<svg viewBox="0 0 20 14"><rect width="20" height="7" fill="#c8102e"/><rect y="7" width="20" height="7" fill="#fff"/></svg>',
//   "+63": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#0038a8"/><rect y="9.33" width="20" height="4.67" fill="#ce1126"/><polygon points="10,3 11,5.5 14,5.5 11.5,7.5 12.5,10 10,8 7.5,10 8.5,7.5 6,5.5 9,5.5" fill="#fcd116"/></svg>',
//   "+64": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#00247d"/><rect y="5" width="20" height="4" fill="#fff"/><rect x="8" width="4" height="14" fill="#fff"/><rect y="6.5" width="20" height="1" fill="#c8102e"/><rect x="9.5" width="1" height="14" fill="#c8102e"/><polygon points="14,1 15,3 17,3 15.5,4.5 16.5,6.5 14,5 11.5,6.5 12.5,4.5 11,3 13,3" fill="#c8102e"/></svg>',
//   "+65": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><polygon points="10,2 11,4.5 14,4.5 11.5,6.5 12.5,9 10,7 7.5,9 8.5,6.5 6,4.5 9,4.5" fill="#fff"/><polygon points="10,3 10.5,4.2 12,4.2 10.8,5 11.2,6.2 10,5.4 8.8,6.2 9.2,5 8,4.2 9.5,4.2" fill="#c8102e"/></svg>',
//   "+86": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#de2910"/><polygon points="10,2 11,4.5 14,4.5 11.5,6.5 12.5,9 10,7 7.5,9 8.5,6.5 6,4.5 9,4.5" fill="#ffde00"/></svg>',
//   "+90": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><circle cx="9" cy="7" r="4" fill="#fff"/><circle cx="10" cy="7" r="3" fill="#c8102e"/></svg>',
//   "+91": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#ff9933"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#138808"/><circle cx="10" cy="7" r="1.5" fill="#000080"/></svg>',
//   "+92": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#01411c"/><polygon points="8,2 9,4 11,4 9.5,5.5 10,7.5 8,6 6,7.5 6.5,5.5 5,4 7,4" fill="#fff"/></svg>',
//   "+93": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#000"/><rect y="4.67" width="20" height="4.66" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#006600"/></svg>',
//   "+94": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#ffbe00"/><rect width="6" height="14" fill="#006633"/><rect x="14" width="6" height="14" fill="#006633"/><rect x="6" y="2" width="8" height="10" fill="#cc5500"/><rect x="6" y="4" width="8" height="6" fill="#ffbe00"/></svg>',
//   "+95": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fecb00"/><rect width="20" height="4.67" fill="#34b233"/><rect y="9.33" width="20" height="4.67" fill="#ea2839"/><polygon points="10,3 11,5 13,5 11.5,6.5 12,8.5 10,7 8,8.5 8.5,6.5 7,5 9,5" fill="#fff"/></svg>',
//   "+98": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#239f40"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,5 12,9 8,9" fill="#c8102e"/></svg>',
//   "+212": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006233"/></svg>',
//   "+213": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect x="3" y="2" width="14" height="10" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+216": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><circle cx="10" cy="7" r="4" fill="#fff"/><circle cx="10" cy="7" r="3" fill="#c8102e"/><polygon points="10,4 11,6 13,6 11.5,7.5 12,9.5 10,8 8,9.5 8.5,7.5 7,6 9,6" fill="#c8102e"/></svg>',
//   "+220": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#006600"/><circle cx="10" cy="7" r="1.5" fill="#000"/></svg>',
//   "+221": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#006600"/><rect x="6.67" width="6.66" height="14" fill="#fcd116"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/><polygon points="10,3 11,5 13,5 11.5,6.5 12,8.5 10,7 8,8.5 8.5,6.5 7,5 9,5" fill="#006600"/></svg>',
//   "+224": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#c8102e"/><rect x="6.67" width="6.66" height="14" fill="#fcd116"/><rect x="13.33" width="6.67" height="14" fill="#006600"/></svg>',
//   "+225": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#ff8200"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#009e60"/></svg>',
//   "+226": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#009e60"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+227": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#c8102e"/><rect x="6.67" width="6.66" height="14" fill="#fcd116"/><rect x="13.33" width="6.67" height="14" fill="#006600"/><circle cx="10" cy="7" r="1.5" fill="#c8102e"/></svg>',
//   "+228": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#006a4e"/><rect y="9.33" width="20" height="4.67" fill="#006a4e"/><rect x="5" y="3" width="10" height="8" fill="#c8102e"/><rect x="8" y="2" width="4" height="10" fill="#fff"/><rect x="5" y="5" width="10" height="4" fill="#fff"/></svg>',
//   "+229": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#006600"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+230": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#0039a6"/><polygon points="10,4 11.5,7 14,7 12,9 12.5,12 10,10 7.5,12 8,9 6,7 8.5,7" fill="#fcd116"/></svg>',
//   "+231": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#006600"/><polygon points="10,4 11.5,7 14,7 12,9 12.5,12 10,10 7.5,12 8,9 6,7 8.5,7" fill="#000"/></svg>',
//   "+232": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#006600"/><rect x="13.33" width="6.67" height="14" fill="#0039a6"/></svg>',
//   "+233": '<svg viewBox="0 0 20 14"><rect width="20" height="4.67" fill="#ce1126"/><rect y="4.67" width="20" height="4.66" fill="#fcd116"/><rect y="9.33" width="20" height="4.67" fill="#006b3f"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#000"/></svg>',
//   "+234": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#008751"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#008751"/></svg>',
//   "+235": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#002664"/><rect y="2" width="20" height="10" fill="#fff"/><rect y="4" width="20" height="6" fill="#c8102e"/></svg>',
//   "+236": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#003082"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#fcd116"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+237": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#007a5e"/><rect x="6.67" width="6.66" height="14" fill="#c8102e"/><rect x="13.33" width="6.67" height="14" fill="#fcd116"/><polygon points="10,3 11,5 13,5 11.5,6.5 12,8.5 10,7 8,8.5 8.5,6.5 7,5 9,5" fill="#fcd116"/></svg>',
//   "+238": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#003893"/><rect x="13.33" width="6.67" height="14" fill="#cf2027"/><circle cx="10" cy="7" r="2.5" fill="#003893"/></svg>',
//   "+239": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect x="4" y="2" width="12" height="10" fill="#0039a6"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+240": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#006600"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/></svg>',
//   "+241": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="2" width="20" height="10" fill="#009e60"/><rect y="4" width="20" height="6" fill="#fcd116"/></svg>',
//   "+242": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#009543"/><rect y="4.67" width="20" height="4.66" fill="#fbde4a"/><polygon points="10,0 0,14 20,14" fill="#dc143c"/></svg>',
//   "+243": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#007fff"/><rect x="4" y="0" width="12" height="14" fill="#f7d618"/><rect x="8" y="0" width="4" height="14" fill="#ce1021"/></svg>',
//   "+244": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#000"/><rect y="9.33" width="20" height="4.67" fill="#fcd116"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+245": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#c8102e"/><rect x="6.67" width="6.66" height="14" fill="#fcd116"/><rect x="13.33" width="6.67" height="14" fill="#006600"/></svg>',
//   "+249": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#000"/><rect y="2" width="8" height="10" fill="#006600"/></svg>',
//   "+250": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#00a650"/><rect y="9.33" width="20" height="4.67" fill="#20603d"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#00a650"/></svg>',
//   "+251": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#006600"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#0039a6"/></svg>',
//   "+252": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#4189dd"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+253": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#006b3f"/><rect x="5" y="2" width="10" height="10" fill="#fff"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006b3f"/></svg>',
//   "+254": '<svg viewBox="0 0 20 14"><rect width="20" height="4.67" fill="#000"/><rect y="4.67" width="20" height="4.66" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#006600"/><polygon points="10,7 12.5,11 7.5,11" fill="#fff"/><rect x="9.5" width="1" height="14" fill="#fff"/></svg>',
//   "+255": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#00a650"/><rect y="9.33" width="20" height="4.67" fill="#0039a6"/><rect x="8" y="2" width="4" height="10" fill="#fcd116"/></svg>',
//   "+256": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fcd116"/><rect y="4.67" width="20" height="4.66" fill="#000"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+257": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#006600"/></svg>',
//   "+258": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#c8102e"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/><polygon points="10,1 12,7 18,7 13,10 14.5,16 10,12.5 5.5,16 7,10 2,7 8,7" fill="#fcd116"/></svg>',
//   "+260": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#198a00"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,3 11,5.5 14,5.5 11.5,7.5 12.5,10 10,8 7.5,10 8.5,7.5 6,5.5 9,5.5" fill="#fcd116"/></svg>',
//   "+263": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#006600"/><rect y="9.33" width="20" height="4.67" fill="#fcd116"/><rect x="5" y="2" width="10" height="10" fill="#000"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+351": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#006600"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+352": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#00a1de"/></svg>',
//   "+353": '<svg viewBox="0 0 20 14"><rect width="6.67" height="14" fill="#009a44"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#ff7900"/></svg>',
//   "+354": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#003897"/><rect x="8" y="0" width="4" height="14" fill="#fff"/><rect y="5" width="20" height="4" fill="#fff"/><rect x="9.5" y="0" width="1" height="14" fill="#d72828"/><rect y="6.5" width="20" height="1" fill="#d72828"/></svg>',
//   "+355": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#000"/></svg>',
//   "+356": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#c8102e"/><rect x="13.33" width="6.67" height="14" fill="#c8102e"/></svg>',
//   "+357": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#c8102e"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006600"/></svg>',
//   "+358": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect x="8" y="0" width="4" height="14" fill="#003580"/><rect y="5" width="20" height="4" fill="#003580"/></svg>',
//   "+359": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#00966e"/><rect y="9.33" width="20" height="4.67" fill="#d62612"/></svg>',
//   "+370": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fdb913"/><rect y="4.67" width="20" height="4.66" fill="#006a44"/><rect y="9.33" width="20" height="4.67" fill="#c1272d"/></svg>',
//   "+371": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#9e3039"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#9e3039"/></svg>',
//   "+372": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#0072ce"/><rect x="8" y="0" width="4" height="14" fill="#000"/><rect y="5" width="20" height="4" fill="#fff"/></svg>',
//   "+373": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#0039a6"/><rect y="4.67" width="20" height="4.66" fill="#fcd116"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+374": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#f7a800"/></svg>',
//   "+375": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#006600"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+376": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#0039a6"/><rect y="4.67" width="20" height="4.66" fill="#fcd116"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+381": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#fff"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+382": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#fcd116"/><rect y="9.33" width="20" height="4.67" fill="#0039a6"/></svg>',
//   "+385": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="5" y="2" width="10" height="10" fill="#fff"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+386": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#0039a6"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+387": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#0039a6"/><rect y="2" width="20" height="10" fill="#fcd116"/><polygon points="8,0 0,7 8,14 8,0" fill="#0039a6"/></svg>',
//   "+389": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+420": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="8,0 0,7 8,14 8,0" fill="#0039a6"/></svg>',
//   "+421": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+423": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="8" y="0" width="4" height="14" fill="#fff"/><rect y="5" width="20" height="4" fill="#fff"/></svg>',
//   "+43": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+45": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="8" y="0" width="4" height="14" fill="#fff"/><rect y="5" width="20" height="4" fill="#fff"/></svg>',
//   "+46": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#005baa"/><rect x="8" y="0" width="4" height="14" fill="#fcd116"/><rect y="5" width="20" height="4" fill="#fcd116"/></svg>',
//   "+47": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="8" y="0" width="4" height="14" fill="#fff"/><rect y="5" width="20" height="4" fill="#fff"/><rect x="9.5" y="0" width="1" height="14" fill="#0039a6"/><rect y="6.5" width="20" height="1" fill="#0039a6"/></svg>',
//   "+48": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+51": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#c8102e"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+53": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#0039a6"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+54": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#75aadb"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fcd116"/></svg>',
//   "+56": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect x="5" y="2" width="10" height="10" fill="#0039a6"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+57": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fcd116"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/></svg>',
//   "+58": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fcd116"/><rect y="4.67" width="20" height="4.66" fill="#0039a6"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+60": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#cc0000"/><rect width="6.67" height="7" fill="#000"/><polygon points="3.33,1 4,2.5 6,2.5 4.5,3.5 5,5 3.33,4 1.67,5 2.17,3.5 0.67,2.5 2.67,2.5" fill="#fcd116"/></svg>',
//   "+66": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="2" width="20" height="10" fill="#fff"/><rect y="4" width="20" height="6" fill="#0039a6"/></svg>',
//   "+81": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><circle cx="10" cy="7" r="4" fill="#bc002d"/></svg>',
//   "+82": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect x="6" y="2" width="8" height="10" fill="#003478"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+84": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fcd116"/></svg>',
//   "+880": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#006a4e"/><circle cx="10" cy="7" r="3.5" fill="#f42a41"/></svg>',
//   "+886": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="8" y="2" width="4" height="10" fill="#fff"/><rect y="6" width="20" height="2" fill="#fff"/><polygon points="10,2 11.5,5 14,5 12,7 12.5,10 10,8 7.5,10 8,7 6,5 8.5,5" fill="#0039a6"/></svg>',
//   "+960": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="5" y="2" width="10" height="10" fill="#006600"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+961": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006600"/></svg>',
//   "+962": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#000"/><rect y="9.33" width="20" height="4.67" fill="#006600"/><polygon points="8,0 0,7 8,14 8,0" fill="#c8102e"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+963": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#000"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006600"/></svg>',
//   "+964": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#000"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#006600"/></svg>',
//   "+965": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#006600"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#000"/></svg>',
//   "+966": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#006c35"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#fff"/></svg>',
//   "+967": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#c8102e"/><rect y="9.33" width="20" height="4.67" fill="#000"/></svg>',
//   "+968": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#c8102e"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#006600"/><polygon points="10,3 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#c8102e"/></svg>',
//   "+971": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#006600"/><rect x="6.67" width="6.66" height="14" fill="#fff"/><rect x="13.33" width="6.67" height="14" fill="#000"/></svg>',
//   "+972": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#fff"/><rect y="4.67" width="20" height="4.66" fill="#fff"/><polygon points="10,2 11.5,6 14,6 12,8 12.5,11 10,9 7.5,11 8,8 6,6 8.5,6" fill="#0039a6"/></svg>',
//   "+973": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#c8102e"/><rect x="5" y="0" width="10" height="14" fill="#fff"/><polygon points="8,0 0,7 8,14 8,0" fill="#c8102e"/></svg>',
//   "+974": '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#8d1b3d"/><rect x="5" y="2" width="10" height="10" fill="#fff"/><polygon points="8,0 0,7 8,14 8,0" fill="#8d1b3d"/></svg>',
// };

// const flag = (code: string) => (
//   <span
//     className="inline-block w-6 h-4 rounded overflow-hidden align-middle"
//     dangerouslySetInnerHTML={{ __html: flagSvgs[code] || "" }}
//   />
// );

// const countryCodes = [
//   { code: "+1", country: "US", name: "United States" },
//   { code: "+7", country: "RU", name: "Russia" },
//   { code: "+20", country: "EG", name: "Egypt" },
//   { code: "+27", country: "ZA", name: "South Africa" },
//   { code: "+31", country: "NL", name: "Netherlands" },
//   { code: "+32", country: "BE", name: "Belgium" },
//   { code: "+33", country: "FR", name: "France" },
//   { code: "+34", country: "ES", name: "Spain" },
//   { code: "+39", country: "IT", name: "Italy" },
//   { code: "+41", country: "CH", name: "Switzerland" },
//   { code: "+43", country: "AT", name: "Austria" },
//   { code: "+44", country: "GB", name: "United Kingdom" },
//   { code: "+45", country: "DK", name: "Denmark" },
//   { code: "+46", country: "SE", name: "Sweden" },
//   { code: "+47", country: "NO", name: "Norway" },
//   { code: "+48", country: "PL", name: "Poland" },
//   { code: "+49", country: "DE", name: "Germany" },
//   { code: "+51", country: "PE", name: "Peru" },
//   { code: "+52", country: "MX", name: "Mexico" },
//   { code: "+53", country: "CU", name: "Cuba" },
//   { code: "+54", country: "AR", name: "Argentina" },
//   { code: "+55", country: "BR", name: "Brazil" },
//   { code: "+56", country: "CL", name: "Chile" },
//   { code: "+57", country: "CO", name: "Colombia" },
//   { code: "+58", country: "VE", name: "Venezuela" },
//   { code: "+60", country: "MY", name: "Malaysia" },
//   { code: "+61", country: "AU", name: "Australia" },
//   { code: "+62", country: "ID", name: "Indonesia" },
//   { code: "+63", country: "PH", name: "Philippines" },
//   { code: "+64", country: "NZ", name: "New Zealand" },
//   { code: "+65", country: "SG", name: "Singapore" },
//   { code: "+66", country: "TH", name: "Thailand" },
//   { code: "+81", country: "JP", name: "Japan" },
//   { code: "+82", country: "KR", name: "South Korea" },
//   { code: "+84", country: "VN", name: "Vietnam" },
//   { code: "+86", country: "CN", name: "China" },
//   { code: "+90", country: "TR", name: "Turkey" },
//   { code: "+91", country: "IN", name: "India" },
//   { code: "+92", country: "PK", name: "Pakistan" },
//   { code: "+93", country: "AF", name: "Afghanistan" },
//   { code: "+94", country: "LK", name: "Sri Lanka" },
//   { code: "+95", country: "MM", name: "Myanmar" },
//   { code: "+98", country: "IR", name: "Iran" },
//   { code: "+212", country: "MA", name: "Morocco" },
//   { code: "+213", country: "DZ", name: "Algeria" },
//   { code: "+216", country: "TN", name: "Tunisia" },
//   { code: "+220", country: "GM", name: "Gambia" },
//   { code: "+221", country: "SN", name: "Senegal" },
//   { code: "+224", country: "GN", name: "Guinea" },
//   { code: "+225", country: "CI", name: "Côte d'Ivoire" },
//   { code: "+226", country: "BF", name: "Burkina Faso" },
//   { code: "+227", country: "NE", name: "Niger" },
//   { code: "+228", country: "TG", name: "Togo" },
//   { code: "+229", country: "BJ", name: "Benin" },
//   { code: "+230", country: "MU", name: "Mauritius" },
//   { code: "+231", country: "LR", name: "Liberia" },
//   { code: "+232", country: "SL", name: "Sierra Leone" },
//   { code: "+233", country: "GH", name: "Ghana" },
//   { code: "+234", country: "NG", name: "Nigeria" },
//   { code: "+235", country: "TD", name: "Chad" },
//   { code: "+236", country: "CF", name: "Central African Republic" },
//   { code: "+237", country: "CM", name: "Cameroon" },
//   { code: "+238", country: "CV", name: "Cape Verde" },
//   { code: "+239", country: "ST", name: "São Tomé & Príncipe" },
//   { code: "+240", country: "GQ", name: "Equatorial Guinea" },
//   { code: "+241", country: "GA", name: "Gabon" },
//   { code: "+242", country: "CG", name: "Congo" },
//   { code: "+243", country: "CD", name: "DR Congo" },
//   { code: "+244", country: "AO", name: "Angola" },
//   { code: "+245", country: "GW", name: "Guinea-Bissau" },
//   { code: "+249", country: "SD", name: "Sudan" },
//   { code: "+250", country: "RW", name: "Rwanda" },
//   { code: "+251", country: "ET", name: "Ethiopia" },
//   { code: "+252", country: "SO", name: "Somalia" },
//   { code: "+253", country: "DJ", name: "Djibouti" },
//   { code: "+254", country: "KE", name: "Kenya" },
//   { code: "+255", country: "TZ", name: "Tanzania" },
//   { code: "+256", country: "UG", name: "Uganda" },
//   { code: "+257", country: "BI", name: "Burundi" },
//   { code: "+258", country: "MZ", name: "Mozambique" },
//   { code: "+260", country: "ZM", name: "Zambia" },
//   { code: "+263", country: "ZW", name: "Zimbabwe" },
//   { code: "+351", country: "PT", name: "Portugal" },
//   { code: "+352", country: "LU", name: "Luxembourg" },
//   { code: "+353", country: "IE", name: "Ireland" },
//   { code: "+354", country: "IS", name: "Iceland" },
//   { code: "+355", country: "AL", name: "Albania" },
//   { code: "+356", country: "MT", name: "Malta" },
//   { code: "+357", country: "CY", name: "Cyprus" },
//   { code: "+358", country: "FI", name: "Finland" },
//   { code: "+359", country: "BG", name: "Bulgaria" },
//   { code: "+370", country: "LT", name: "Lithuania" },
//   { code: "+371", country: "LV", name: "Latvia" },
//   { code: "+372", country: "EE", name: "Estonia" },
//   { code: "+373", country: "MD", name: "Moldova" },
//   { code: "+374", country: "AM", name: "Armenia" },
//   { code: "+375", country: "BY", name: "Belarus" },
//   { code: "+376", country: "AD", name: "Andorra" },
//   { code: "+381", country: "RS", name: "Serbia" },
//   { code: "+382", country: "ME", name: "Montenegro" },
//   { code: "+385", country: "HR", name: "Croatia" },
//   { code: "+386", country: "SI", name: "Slovenia" },
//   { code: "+387", country: "BA", name: "Bosnia & Herzegovina" },
//   { code: "+389", country: "MK", name: "North Macedonia" },
//   { code: "+420", country: "CZ", name: "Czech Republic" },
//   { code: "+421", country: "SK", name: "Slovakia" },
//   { code: "+423", country: "LI", name: "Liechtenstein" },
//   { code: "+880", country: "BD", name: "Bangladesh" },
//   { code: "+886", country: "TW", name: "Taiwan" },
//   { code: "+960", country: "MV", name: "Maldives" },
//   { code: "+961", country: "LB", name: "Lebanon" },
//   { code: "+962", country: "JO", name: "Jordan" },
//   { code: "+963", country: "SY", name: "Syria" },
//   { code: "+964", country: "IQ", name: "Iraq" },
//   { code: "+965", country: "KW", name: "Kuwait" },
//   { code: "+966", country: "SA", name: "Saudi Arabia" },
//   { code: "+967", country: "YE", name: "Yemen" },
//   { code: "+968", country: "OM", name: "Oman" },
//   { code: "+971", country: "AE", name: "UAE" },
//   { code: "+972", country: "IL", name: "Israel" },
//   { code: "+973", country: "BH", name: "Bahrain" },
//   { code: "+974", country: "QA", name: "Qatar" },
// ];

// const Banner = () => {
//     // Form States
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [areaOfInterest, setAreaOfInterest] = useState('');
//     const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [phone, setPhone] = useState('');
//     const [message, setMessage] = useState('');

//     const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         let val = e.target.value.replace(/\D/g, ''); 
//         val = val.replace(/^0+/, ''); 
//         setPhone(val);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const yourBusinessNumber = "23489044698791"; 
//         const encodedMessage = encodeURIComponent(
//             `Hello DUSA CORE!\n\nMy name is ${name}.\nEmail: ${email}\nPhone: ${selectedCode.code}${phone}\nArea of Interest: ${areaOfInterest || 'Not specified'}\n\nHow you can help:\n${message}`
//         );
//         window.open(`https://wa.me/${yourBusinessNumber}?text=${encodedMessage}`, '_blank');
//         setDropdownOpen(false);
//     };

//     return (
//         <section className='w-full relative min-h-[520px] lg:max-h-[520px] py-6 sm:py-8 px-4 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden bg-gradient-to-t from-appPurple via-appLightPurple via-40% to-white '>
            
//             <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 w-full items-center justify-between relative z-10'>
                
//                 {/* =========================================
//                     LEFT COLUMN: Text & Buttons (Staggered Entrance)
//                 ========================================= */}
//                 <motion.div 
//                     variants={textContainerVariants}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     className='flex flex-col w-full lg:w-[55%] gap-4 lg:gap-6'
//                 >
//                     {/* Top Div: Headline with Mirage Animation */}
//                     <motion.div variants={textItemVariants}>
//                         <h1 className='text-[#4B0163] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-wide'>
//                             Building{' '}
//                             {/* Animated Highlight */}
//                             <motion.span 
//                                 variants={shimmerVariants}
//                                 initial="hidden"
//                                 animate="show"
//                                 className='inline-block text-transparent bg-clip-text'
//                                 style={{
//                                     backgroundImage: "linear-gradient(90deg, #BA25EB 0%, #E89BFF 50%, #BA25EB 100%)",
//                                     backgroundSize: "200% auto"
//                                 }}
//                             >
//                                 Engineering
//                             </motion.span>{' '}
//                             Solutions That Deliver{' '}
//                             {/* Animated Highlight */}
//                             <motion.span 
//                                 variants={shimmerVariants}
//                                 initial="hidden"
//                                 animate="show"
//                                 className='inline-block text-transparent bg-clip-text'
//                                 style={{
//                                     backgroundImage: "linear-gradient(90deg, #BA25EB 0%, #E89BFF 50%, #BA25EB 100%)",
//                                     backgroundSize: "200% auto"
//                                 }}
//                             >
//                                 Business
//                             </motion.span>{' '}
//                             Value.
//                         </h1>
//                     </motion.div>

//                     {/* Middle Div: Subtext */}
//                     <motion.div variants={textItemVariants}>
//                         <p className='text-[#8300AF] text-lg md:text-xl font-medium leading-relaxed max-w-xl'>
//                             Helping businesses innovate, scale, and succeed through reliable, technology driven engineering solutions.
//                         </p>
//                     </motion.div>

//                     {/* Bottom Div: Buttons */}
//                     <motion.div variants={textItemVariants} className='flex flex-col sm:flex-row gap-4 mt-4'>
//                         <button className='bg-appPurple text-white px-8 py-3.5 rounded-md font-bold text-base shadow-md hover:bg-appNav transition-colors duration-300 active:scale-95'>
//                             Book a consultation
//                         </button>
//                         <button className='bg-white text-appPurple border border-appPurple px-8 py-3.5 rounded-md font-bold text-base shadow-md hover:bg-gray-50 transition-colors duration-300 active:scale-95'>
//                             Explore Our Services
//                         </button>
//                     </motion.div>
//                 </motion.div>

//                 {/* =========================================
//                     RIGHT COLUMN: Floating Form (Slides in)
//                 ========================================= */}
//                 <motion.div 
//                     variants={formVariants}
//                     initial="hidden"
//                     whileInView="show"
//                     viewport={{ once: true }}
//                     className='w-full lg:w-[40%] flex justify-center lg:justify-end mt-10 lg:mt-0 relative z-20'
//                 >
//                     <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-3 border border-gray-100'>
                        
//                         {/* Form Header */}
//                         <div>
//                             <h3 className='text-appBlack font-semibold text-xl'>
//                                 Let’s connect to help you and your team.
//                             </h3>
//                         </div>

//                         {/* Form Fields */}
//                         <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                            
//                             {/* Label 1: Name */}
//                             <div className='flex flex-col gap-1'>
//                                 <label className='text-sm font-bold text-gray-700'>Your name</label>
//                                 <input 
//                                     type="text" 
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     placeholder="John Doe" 
//                                     className='w-full bg-white border border-gray-300 px-4 py-1.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
//                                     required
//                                 />
//                             </div>

//                             {/* Label 2: Email */}
//                             <div className='flex flex-col gap-1'>
//                                 <label className='text-sm font-bold text-gray-700'>Email Address *</label>
//                                 <input 
//                                     type="email" 
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="example@gmail.com" 
//                                     className='w-full bg-white border border-gray-300 px-4 py-1.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
//                                     required
//                                 />
//                             </div>

//                             {/* Label 3: Phone */}
//                             <div className='flex flex-col gap-1'>
//                                 <label className='text-sm font-bold text-gray-700'>Phone Number</label>
//                                 <div className='flex flex-row w-full'>
//                                     <div className="relative">
//                                         <button
//                                             type="button"
//                                             onClick={() => setDropdownOpen(!dropdownOpen)}
//                                             className="flex items-center gap-1.5 bg-white border border-gray-300 px-2.5 py-2.5 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple text-sm"
//                                         >
//                                             {flag(selectedCode.code)}
//                                             <span className="text-appBlack font-medium text-xs">{selectedCode.code}</span>
//                                             <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                             </svg>
//                                         </button>
//                                         {dropdownOpen && (
//                                             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[180px] max-h-[200px] overflow-y-auto">
//                                                 {countryCodes.map((c) => (
//                                                     <button
//                                                         key={c.code}
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setSelectedCode(c);
//                                                             setDropdownOpen(false);
//                                                         }}
//                                                         className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-left ${selectedCode.code === c.code ? "bg-gray-100" : ""}`}
//                                                     >
//                                                         {flag(c.code)}
//                                                         <span className="text-appBlack font-medium">{c.code} <span className="text-gray-500">{c.name}</span></span>
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                     <input 
//                                         type="tel" 
//                                         value={phone}
//                                         onChange={handlePhoneChange}
//                                         placeholder="8012345678" 
//                                         className='w-full bg-white border border-gray-300 px-4 py-1.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             {/* NEW LABEL: Area of Interest */}
//                             <div className='flex flex-col gap-1 relative'>
//                                 <label className='text-sm font-bold text-gray-700'>Area of Interest</label>
//                                 <select 
//                                     value={areaOfInterest}
//                                     onChange={(e) => setAreaOfInterest(e.target.value)}
//                                     className='w-full bg-white border border-gray-300 px-4 py-2 text-appBlack focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all appearance-none cursor-pointer text-sm'
//                                     required
//                                 >
//                                     <option value="" disabled>Select an option...</option>
//                                      <option value="Software Engineering">Software Engineering</option>
//                                     <option value="AI & Data Infrastructure">AI & Data Infrastructure</option>
//                                     <option value="Cloud & DevOps">Cloud & DevOps</option>
//                                     <option value="Sports Tech">Sports Tech</option>
//                                     <option value="Entertainment Tech">Entertainment Tech</option>
//                                     <option value="Arts Tech">Arts Tech</option>
//                                     <option value="Data Science/Engineering">Data Science/Engineering</option>
//                                     <option value="Product Design">UI/UX & Product/Brand Design</option>
//                                     <option value="Logistics">Logistics</option>
//                                     <option value="Marketing">Marketing Tech</option>
//                                     <option value="Health">Health</option>
//                                     <option value="Others">Others</option>
//                                 </select>
//                                 {/* Custom Dropdown Arrow */}
//                                 <svg className="w-3.5 h-3.5 text-gray-500 absolute right-4 top-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>

//                             {/* Label 4: Message */}
//                             <div className='flex flex-col gap-1'>
//                                 <label className='text-sm font-bold text-gray-700'>How can we help? Type Below</label>
//                                 <textarea 
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                     rows={2}
//                                     placeholder="I'd like to en..."
//                                     className='w-full bg-white border border-gray-300 px-4 py-1.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all resize-none'
//                                     required
//                                 />
//                             </div>

//                             {/* Submit Button */}
//                             <button 
//                                 type="submit" 
//                                 className='w-full bg-appPurple text-white py-3 font-bold text-base hover:bg-appNav transition-colors duration-300 shadow-md active:scale-[0.98] mt-1'
//                             >
//                                 Get in touch
//                             </button>
//                         </form>
//                     </div>
//                 </motion.div>

//             </div>
//         </section>
//     );
// }

// export default Banner;