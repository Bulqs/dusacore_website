import React from 'react';
import { Code, Brain, GraduationCap, Lightbulb, Palette, Cloud } from 'lucide-react';
import Card from '@/app/components/dusacomponent/Card';

const cards = [
    {
        icon: Code,
        title: "Software Engineering",
        description: "Build secure, scalable, enterprise grade applications.",
        readMoreHref: "/services",
        bgColor: "#4B0163"
    },
    {
        icon: Brain,
        title: "Artificial Intelligence & Data",
        description: "Transform data into actionable intelligence.",
        readMoreHref: "/services",
        bgColor: "#6B21A8"
    },
    {
        icon: GraduationCap,
        title: "Technology Education",
        description: "Developing the next generation of global technology talent.",
        readMoreHref: "/services",
        bgColor: "#4B0163"
    },
    {
        icon: Lightbulb,
        title: "Consulting & Digital Transformation",
        description: "Helping organizations modernize operations through technology.",
        readMoreHref: "/services",
        bgColor: "#6B21A8"
    },
    {
        icon: Palette,
        title: "UI/UX Design & Product Strategy",
        description: "Digital experiences that transform complex ideas into seamless products.",
        readMoreHref: "/services",
        bgColor: "#4B0163"
    },
    {
        icon: Cloud,
        title: "Cloud, DevOps & Infrastructure",
        description: "Scalable Infrastructure for Modern Businesses.",
        readMoreHref: "/services",
        bgColor: "#6B21A8"
    },
];

export default function WhatWeDo() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor mb-4">
                        What <span className="text-appBanner">We Do</span>
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        We deliver end-to-end digital solutions that drive real business outcomes.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            readMoreHref={card.readMoreHref}
                            bgColor={card.bgColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
