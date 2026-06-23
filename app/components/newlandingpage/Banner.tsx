"use client";
import React, { useState } from 'react';

const Banner = () => {
    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+234');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    // Strips leading zeros and non-numeric characters from the phone input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove non-numbers
        val = val.replace(/^0+/, ''); // Remove leading zeros
        setPhone(val);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // OPTION 1: Redirect user to your WhatsApp Business Chat (Frontend)
        const yourBusinessNumber = "23489044698791"; // Replace with DUSA CORE's WhatsApp number (no +)
        const encodedMessage = encodeURIComponent(
            `Hello DUSA CORE!\n\nMy name is ${name}.\nEmail: ${email}\nPhone: ${countryCode}${phone}\n\nHow you can help:\n${message}`
        );
        window.open(`https://wa.me/${yourBusinessNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <section className='w-full relative min-h-[600px] py-16 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-appLightPurple via-white to-white '>
            {/* Background Fade: Top-Left to Bottom-Right */}
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 w-full items-center justify-between relative z-10'>
                
                {/* =========================================
                    LEFT COLUMN: Text & Buttons
                ========================================= */}
                <div className='flex flex-col w-full lg:w-[55%] gap-6'>
                    {/* Top Div: Headline */}
                    <div>
                        <h1 className='text-[#4B0163] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide'>
                            Building <span className='text-[#BA25EB]'>Engineering</span> Solutions That Deliver <span className='text-[#BA25EB]'>Business</span> Value.
                        </h1>
                    </div>

                    {/* Middle Div: Subtext */}
                    <div>
                        <p className='text-[#8300AF] text-lg md:text-xl font-medium leading-relaxed max-w-xl'>
                            Helping businesses innovate, scale, and succeed through reliable, technology driven engineering solutions.
                        </p>
                    </div>

                    {/* Bottom Div: Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                        <button className='bg-appPurple text-white px-8 py-3.5 rounded-md font-bold text-base shadow-md hover:bg-appNav transition-colors duration-300 active:scale-95'>
                            Book a consultation
                        </button>
                        <button className='bg-white text-appPurple border border-appPurple px-8 py-3.5 rounded-md font-bold text-base shadow-md hover:bg-gray-50 transition-colors duration-300 active:scale-95'>
                            Explore Our Services
                        </button>
                    </div>
                </div>

                {/* =========================================
                    RIGHT COLUMN: Floating Form
                ========================================= */}
                <div className='w-full lg:w-[40%] flex justify-center lg:justify-end mt-10 lg:mt-0'>
                    <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-6 border border-gray-100'>
                        
                        {/* Form Header */}
                        <div>
                            <h3 className='text-appBlack font-semibold text-xl'>
                                Let’s connect to help you and your team.
                            </h3>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            
                            {/* Label 1: Name */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Your name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe" 
                                    className='w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
                                    required
                                />
                            </div>

                            {/* Label 2: Email */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Email Address *</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@gmail.com" 
                                    className='w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
                                    required
                                />
                            </div>

                            {/* Label 3: Phone */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-gray-700'>Phone Number</label>
                                <div className='flex flex-row w-full'>
                                    {/* Country Code Dropdown */}
                                    <select 
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className='bg-appLightPurple text-appBlack font-medium border border-gray-300 border-r-0 rounded-l-md px-3 py-2.5 focus:outline-none cursor-pointer'
                                    >
                                        <option value="+234">+234 (NG)</option>
                                        <option value="+1">+1 (US/CA)</option>
                                        <option value="+44">+44 (UK)</option>
                                    </select>
                                    
                                    {/* Phone Input (No zero logic handled by handlePhoneChange) */}
                                    <input 
                                        type="tel" 
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="8012345678" 
                                        className='w-full bg-white border border-gray-300 rounded-r-md px-4 py-2.5 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Label 4: Message */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-gray-700'>How can we help? Type Below</label>
                                <textarea 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={6}
                                    placeholder="I'd like to en..."
                                    className='w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple focus:ring-1 focus:ring-appPurple transition-all resize-none'
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className='w-full bg-appPurple text-white py-3.5 rounded-md font-bold text-base hover:bg-appNav transition-colors duration-300 shadow-md active:scale-[0.98] mt-2'
                            >
                                Get in touch
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Banner;

// import React from 'react'
// import Image from 'next/image';

// const Banner = () => {
//     return (
//         <div className='w-full relative h-[584px] flex items-center justify-center overflow-hidden'>
//             {/* <video
//                 className='absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover'
//                 controls preload="auto">
//                 <source src="/videos/bulq_anime.gif" type="video/mp4" />
//                 <track
//                     src="/videos/bulq_anime.gif"
//                     // kind="subtitles"
//                     // srcLang="en"
//                     // label="English"
//                 />
//                 Your browser does not support the video tag.
//             </video> */}
//             <Image
//                     className='absolute z-0 w-full h-full object-cover'
//                     src="/videos/bulq_anime.gif"
//                     alt="Background Animation"
//                 />
            
//             {/* Overlay to make text more readable */}
//             <div className='absolute inset-0 bg-appTitleBgColor bg-opacity-25 z-1'></div>

//             {/* Content Container */}
//             <div className='relative z-10 text-center text-white px-4'>
//                 <h2 className='font-bold text-5xl mb-6'>Shop Globally, Ship Smartly</h2>
//                 <p className="font-semibold text-xl mb-8">
//                     <span className='block'>Your centralized logistics solution for international shopping.</span>
//                     <span className='block'>We consolidate and deliver your purchases worldwide</span>
//                 </p>
//                 <div className="flex gap-4 justify-center">
//                     <button className="px-8 py-3 bg-appNav rounded-md text-white hover:bg-opacity-90 transition">
//                         Get Started
//                     </button>
//                     <button className="px-8 py-3 bg-transparent rounded-md text-white hover:bg-white hover:bg-opacity-10 transition">
//                         <span className="border-b-2 border-white">Learn More</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Banner;