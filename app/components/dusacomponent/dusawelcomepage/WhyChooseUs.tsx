import React from 'react';
import { Brain, TrendingUp, Cpu, Handshake, Palette, Rocket } from 'lucide-react';
import Card from '../Card';

const items = [
    { icon: Brain, title: "We Think in Systems, Not Just Software", description: "Most solutions solve surface-level problems. We go deeper—analyzing the structure of your operations, identifying inefficiencies, how your entire organization works.", bgColor: "#8300AF" },
    { icon: TrendingUp, title: "Business Outcomes Over Outputs", description: "We are not focused on delivering features or deliverables alone. Every solution we build is tied directly to measurable business outcomes such as efficiency, scalability, cost reduction, and performance improvement.", bgColor: "#8300AF" },
    { icon: Cpu, title: "Engineering-Driven Excellence", description: "Our approach is rooted in strong engineering principles. We design systems that are scalable, secure, and built to withstand real-world operational complexity.", bgColor: "#8300AF" },
    { icon: Handshake, title: "Strategic Partnership Approach", description: "We work closely with organizations as long-term partners, not short-term vendors. Our goal is to understand your business deeply and align technology with your strategic direction.", bgColor: "#8300AF" },
    { icon: Palette, title: "Design That Serves Function", description: "Our design philosophy prioritizes clarity, usability, and purpose. Every interface is crafted to support decision-making and simplify complex workflows.", bgColor: "#8300AF" },
    { icon: Rocket, title: "Built for Growth and Adaptability", description: "We build systems that evolve with your business. As your organization grows, your technology infrastructure remains stable, flexible, and future-ready.", bgColor: "#8300AF" },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full bg-white py-4 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-6 text-center">
                    Why <span className="text-appBanner">Choose Us</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            readMoreHref="#"
                            bgColor={item.bgColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}