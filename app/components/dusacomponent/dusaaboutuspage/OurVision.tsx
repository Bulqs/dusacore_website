import React from 'react';
import Image from 'next/image';
import visionImg from '@/public/images/dusacoreimages/dusavision.jpg';

export default function OurVision() {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
                <div className="relative w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] h-full overflow-hidden hidden sm:block order-2 lg:order-1">
                    <Image src={visionImg} alt="Our Vision" fill className="object-cover" />
                </div>
                <div style={{ backgroundColor: '#4B0163' }} className="h-full flex flex-col items-center justify-start lg:justify-center text-center px-6 sm:px-8 lg:px-12 py-6 order-1 lg:order-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-4">
                        Our Vision
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed">
                        To transform complex business challenges into intelligent, scalable, and efficient digital systems that drive sustainable growth and operational excellence.
                    </p>
                </div>
            </div>
        </section>
    );
}
