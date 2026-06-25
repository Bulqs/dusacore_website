import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import circlePng from '@/public/images/dusacoreimages/circle.png';

interface TestimonialCardProps {
    text: string;
    name: string;
    bgColor?: string;
}

export default function TestimonialCard({
    text,
    name,
    bgColor = 'rgba(75,1,99,0.62)',
}: TestimonialCardProps) {
    return (
        <div
            className="p-6 sm:p-8 rounded-3xl flex flex-col items-start text-left"
            style={{ backgroundColor: bgColor }}
        >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/20">
                <Quote className="w-7 h-7 text-white rotate-180" />
            </div>
            <p className="text-white font-bold text-sm sm:text-base leading-relaxed mb-6">
                {text}
            </p>
            <div className="flex items-center gap-3 mt-auto">
                <Image
                    src={circlePng}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <h5 className="text-white font-bold text-base">{name}</h5>
            </div>
        </div>
    );
}
