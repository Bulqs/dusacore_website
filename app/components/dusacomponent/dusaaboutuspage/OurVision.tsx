import React from 'react';
import visionImg from '@/public/images/dusacoreimages/dusavision.jpg';
import ImageTextSection from '@/app/components/dusacomponent/dusawelcomepage/ImageTextSection';

export default function OurVision() {
    return (
        <ImageTextSection
            image={visionImg}
            title="Our Vision"
            description="To transform complex business challenges into intelligent, scalable, and efficient digital systems that drive sustainable growth and operational excellence."
            imageAlt="Our Vision"
            imageOnLeft={true}
        />
    );
}
