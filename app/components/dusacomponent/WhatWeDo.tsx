import React from 'react';
import { Code, Brain, GraduationCap, Lightbulb, Palette, Cloud } from 'lucide-react';
import Card from '@/app/components/dusacomponent/Card';

const cards = [
    { icon: Code, title: "Software Engineering", description: "Build secure, scalable, enterprise grade applications.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Brain, title: "Artificial Intelligence & Data", description: "Transform data into actionable intelligence.", readMoreHref: "/services", bgColor: "#6B21A8" },
    { icon: GraduationCap, title: "Technology Education", description: "Developing the next generation of global technology talent.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Lightbulb, title: "Consulting & Digital Transformation", description: "Helping organizations modernize operations through technology.", readMoreHref: "/services", bgColor: "#6B21A8" },
    { icon: Palette, title: "UI/UX Design & Product Strategy", description: "Digital experiences that transform complex ideas into seamless products.", readMoreHref: "/services", bgColor: "#4B0163" },
    { icon: Cloud, title: "Cloud, DevOps & Infrastructure", description: "Scalable Infrastructure for Modern Businesses.", readMoreHref: "/services", bgColor: "#6B21A8" },
];

export default function WhatWeDo() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 lg:pb-24 lg:pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-4 md:mb-8">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-appTitleBgColor mb-2 tracking-wide">
                        What We Do
                    </h3>
                    <p className="text-gray-900 max-w-2xl mx-auto text-base font-semibold md:text-lg">
                        Delivering comprehensive technology solutions designed to scale your operations and drive innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {cards.map((card, index) => (
                        <div key={index} className="transition-shadow duration-300 hover:shadow-2xl rounded-3xl h-full">
                            <Card
                                icon={card.icon}
                                title={card.title}
                                description={card.description}
                                readMoreHref={card.readMoreHref}
                                bgColor={card.bgColor}
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}