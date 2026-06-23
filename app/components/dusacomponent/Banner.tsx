"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface BannerProps {
    image: StaticImageData | string;
    title: string;
    description: string;
    alt?: string;
}

export default function Banner({ image, title, description, alt = "Banner" }: BannerProps) {
    return (
        <section className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] flex items-center justify-center overflow-hidden">
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(75, 1, 99, 0.62)' }} />
            <div className="relative z-10 text-center px-4">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                >
                    {title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-snug sm:leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>
        </section>
    );
}
