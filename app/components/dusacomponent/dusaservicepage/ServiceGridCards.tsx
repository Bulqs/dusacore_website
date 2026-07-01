"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

interface ServiceGridCardsProps {
  services: ServiceItem[];
  onCardClick: (id: string) => void;
}

const bgColors = ["#4B0163", "#6B21A8"];

export default function ServiceGridCards({ services, onCardClick }: ServiceGridCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {services.map((service, index) => {
        const GridIcon = service.icon;
        const bgColor = bgColors[index % bgColors.length];
        return (
          <div
            key={service.id}
            onClick={() => {
              onCardClick(service.id);
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="transition-shadow duration-300 hover:shadow-2xl rounded-3xl h-full cursor-pointer"
          >
            <div
              className="p-6 sm:p-8 rounded-3xl flex flex-col items-start text-left h-full"
              style={{ backgroundColor: bgColor }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/20">
                <GridIcon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {service.title}
              </h4>
              <p className="text-white text-sm sm:text-base leading-relaxed mb-6 text-justify font-semibold">
                {service.desc}
              </p>
              <div className="mt-auto inline-flex items-center gap-2 text-white font-semibold border border-transparent hover:bg-white hover:text-appPurple hover:border-white px-4 py-2 rounded-full transition-all">
                Inspect Stack
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
