import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Mail, LucideIcon } from 'lucide-react';

interface SocialLink {
    icon: LucideIcon;
    href: string;
}

interface TeamCardProps {
    image: string;
    name: string;
    role: string;
    socials?: SocialLink[];
}

const defaultSocials: SocialLink[] = [
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Mail, href: "#" },
];

export default function TeamCard({ image, name, role, socials = defaultSocials }: TeamCardProps) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative w-full h-[300px] sm:h-[350px]">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="p-5 flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-bold text-appTitleBgColor">{name}</h4>
                    <p className="text-gray-500 text-sm">{role}</p>
                </div>
                <div className="flex items-center gap-2">
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            className="text-gray-400 hover:text-appBanner transition-colors"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
