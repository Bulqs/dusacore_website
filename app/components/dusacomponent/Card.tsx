import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    readMoreHref: string;
    bgColor: string;
}

export default function Card({ icon: Icon, title, description, readMoreHref, bgColor }: CardProps) {
    return (
        <div
            className="p-6 sm:p-8 rounded-3xl flex flex-col items-start text-left"
            style={{ backgroundColor: bgColor }}
        >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/20">
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {title}
            </h4>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {description}
            </p>
            <a
                href={readMoreHref}
                className="mt-auto inline-flex items-center gap-2 text-white font-semibold hover:opacity-80 transition-opacity"
            >
                Read More
                <ArrowRight className="w-5 h-5" />
            </a>
        </div>
    );
}
