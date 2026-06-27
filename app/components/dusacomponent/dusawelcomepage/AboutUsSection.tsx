import React from 'react';
import aboutImg from '@/public/images/dusacoreimages/dusacoreabout.jpg';
import ImageTextSection from './ImageTextSection';

export default function AboutUsSection() {
    return (
        <ImageTextSection
            image={aboutImg}
            title="About Us"
            description="At DUSA CORE, we believe technology should do more than support a business—it should empower it. That is why we focus on creating intelligent systems that connect people, processes, and technology to unlock new possibilities and lasting value. We specialize in designing, engineering, and optimizing digital systems that improve operational efficiency, enhance decision-making, and create measurable business value. By combining strategic thinking, engineering excellence, and user-centered design, we deliver solutions that enable organizations to adapt, scale, and thrive in an increasingly digital world."
            imageAlt="About DUSA CORE"
            imageOnLeft={false}
            buttonText="Read More"
            textLeft={true}
        />
    );
}
