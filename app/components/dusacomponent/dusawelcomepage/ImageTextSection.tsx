import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ImageTextSectionProps {
    image: StaticImageData | string;
    title: string;
    description: string;
    imageAlt: string;
    imageOnLeft?: boolean;
    bgColor?: string;
    buttonText?: string;
    buttonHref?: string;
    textLeft?: boolean;
}

export default function ImageTextSection({
    image,
    title,
    description,
    imageAlt,
    imageOnLeft = true,
    bgColor = '#4B0163',
    buttonText,
    buttonHref = '#',
    textLeft = false,
}: ImageTextSectionProps) {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-stretch">
                <div
                    className={`relative w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] h-full overflow-hidden hidden sm:block ${
                        imageOnLeft ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                    }`}
                >
                    <Image src={image} alt={imageAlt} fill className="object-cover" />
                </div>
                <div
                    className={`h-full flex flex-col ${
                        textLeft ? 'items-start text-left' : 'items-center text-center'
                    } justify-start lg:justify-center px-6 sm:px-8 lg:px-12 py-4 sm:py-8 lg:py-16 ${
                        imageOnLeft ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                    }`}
                    style={{ backgroundColor: bgColor }}
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-4">
                        {title}
                    </h3>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed mb-4 text-justify">
                        {description}
                    </p>
                    {buttonText && (
                        <a
                            href={buttonHref}
                            className="inline-flex items-center gap-2 bg-white text-[#4B0163] px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all duration-300"
                        >
                            {buttonText}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
