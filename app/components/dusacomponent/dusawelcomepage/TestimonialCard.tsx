"use client";
import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import circlePng from '@/public/images/dusacoreimages/circle.png';

interface TestimonialCardProps {
    text: string;
    name: string;
}

export default function TestimonialCard({ text, name }: TestimonialCardProps) {
    // 1. Motion Values for mouse tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Smooth the rotation with spring physics
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            whileHover={{ scale: 1.05 }}
            className="w-full h-full perspective-1000"
        >
            <div className="p-6 sm:p-8 rounded-3xl flex flex-col items-start text-left bg-appPurple shadow-2xl relative">
                {/* Subtle highlight glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/20"
                    style={{ transform: "translateZ(30px)" }} // Pop out the quote icon
                >
                    <Quote className="w-7 h-7 text-white rotate-180" />
                </div>

                <p 
                    className="text-white font-bold text-sm sm:text-base leading-relaxed mb-6"
                    style={{ transform: "translateZ(20px)" }} // Pop out the text
                >
                    {text}
                </p>

                <div 
                    className="flex items-center gap-3 mt-auto"
                    style={{ transform: "translateZ(40px)" }} // Pop out the identity
                >
                    <Image
                        src={circlePng}
                        alt={name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                    <h5 className="text-white font-bold text-base">{name}</h5>
                </div>
            </div>
        </motion.div>
    );
}

// "use client";
// import React from 'react';
// import Image from 'next/image';
// import { Quote } from 'lucide-react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import circlePng from '@/public/images/dusacoreimages/circle.png';

// interface TestimonialCardProps {
//     text: string;
//     name: string;
// }

// export default function TestimonialCard({ text, name }: TestimonialCardProps) {
//     // 1. Motion Values for mouse tracking
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     // 2. Smooth the rotation with spring physics
//     const rotateX = useTransform(y, [-100, 100], [15, -15]);
//     const rotateY = useTransform(x, [-100, 100], [-15, 15]);

//     const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
//         const rect = event.currentTarget.getBoundingClientRect();
//         x.set(event.clientX - rect.left - rect.width / 2);
//         y.set(event.clientY - rect.top - rect.height / 2);
//     };

//     const handleMouseLeave = () => {
//         x.set(0);
//         y.set(0);
//     };

//     return (
//         <motion.div
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             style={{ 
//                 rotateX, 
//                 rotateY, 
//                 transformStyle: "preserve-3d" 
//             }}
//             whileHover={{ scale: 1.05 }}
//             className="w-full h-full perspective-1000"
//         >
//             <div className="p-6 sm:p-8 rounded-3xl flex flex-col items-start text-left bg-appPurple shadow-2xl relative">
//                 {/* Subtle highlight glow effect */}
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

//                 <div 
//                     className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/20"
//                     style={{ transform: "translateZ(30px)" }} // Pop out the quote icon
//                 >
//                     <Quote className="w-7 h-7 text-white rotate-180" />
//                 </div>

//                 <p 
//                     className="text-white font-bold text-sm sm:text-base leading-relaxed mb-6"
//                     style={{ transform: "translateZ(20px)" }} // Pop out the text
//                 >
//                     {text}
//                 </p>

//                 <div 
//                     className="flex items-center gap-3 mt-auto"
//                     style={{ transform: "translateZ(40px)" }} // Pop out the identity
//                 >
//                     <Image
//                         src={circlePng}
//                         alt={name}
//                         width={40}
//                         height={40}
//                         className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
//                     />
//                     <h5 className="text-white font-bold text-base">{name}</h5>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }