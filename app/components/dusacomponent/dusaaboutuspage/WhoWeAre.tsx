import React from 'react';

export default function WhoWeAre() {
    return (
        <section className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-appTitleBgColor mb-4 sm:mb-6">
                    Who We Are
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed">
                    We are a team of engineers, designers, and system thinkers dedicated to building technology that goes beyond functionality.
                    At DUSA CORE, we believe modern organizations are powered by systems—not just software. These systems define how businesses operate, how decisions are made, and how value is delivered.
                    Our role is to design and engineer those systems with precision, clarity, and long-term scalability in mind.
                </p>
            </div>
        </section>
    );
}
