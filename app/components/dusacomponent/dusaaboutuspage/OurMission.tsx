import React from 'react';
import missionImg from '@/public/images/dusacoreimages/dusamission.jpg';
import ImageTextSection from '@/app/components/dusacomponent/ImageTextSection';

export default function OurMission() {
    return (
        <ImageTextSection
            image={missionImg}
            title="Our Mission"
            description="To transform complex business challenges into intelligent, scalable, and efficient digital systems that drive sustainable growth and operational excellence."
            imageAlt="Our Mission"
            imageOnLeft={false}
        />
    );
}
