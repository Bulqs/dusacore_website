"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
  Layers,
  Terminal,
  CheckCircle2,
  Database,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

interface ServiceDetailPanelProps {
  service: ServiceItem;
}

const showcaseVariants: Variants = {
  enter: {
    opacity: 0,
    rotateY: -25,
    rotateX: 10,
    scale: 0.9,
    z: -200,
    filter: "blur(10px)"
  },
  center: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20, mass: 1.2 }
  },
  exit: {
    opacity: 0,
    rotateY: 25,
    rotateX: -10,
    scale: 0.95,
    z: -100,
    filter: "blur(10px)",
    transition: { duration: 0.3 }
  }
};

export default function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
  return (
    <div className="lg:col-span-8 relative h-[650px] sm:h-[750px] w-full" style={{ transformStyle: "preserve-3d" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          variants={showcaseVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-[40%] shrink-0 overflow-hidden bg-gray-900">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between" style={{ transform: "translateZ(50px)" }}>
              <div>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-3 inline-block shadow-lg"
                  style={{ backgroundColor: service.color }}
                >
                  Enterprise Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {service.title}
                </h2>
              </div>
              <div className="hidden sm:flex w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20 text-white">
                <service.icon className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-8 flex flex-col" style={{ transform: "translateZ(30px)" }}>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {service.desc}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-appBanner mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Technical Deep-Dive
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed bg-gray-50 p-4 border-l-2 rounded-r-lg" style={{ borderColor: service.color }}>
                {service.deepDive}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-appBanner mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Capabilities & Solutions Matrix
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((capability, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white border border-gray-100 p-3.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: service.color }} />
                    <span className="text-sm font-semibold text-gray-700 leading-snug">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-appBanner mb-4 flex items-center gap-2">
                <Database className="w-4 h-4" /> Core Underlying Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-appBanner text-white text-xs font-semibold px-3 py-1.5 rounded-md border border-appBanner transition-all hover:bg-appBanner/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
              <div className="text-sm text-gray-500 font-medium text-center sm:text-left">
                Need a tailored solution? <br className="hidden sm:block" /><span className="text-appBanner font-bold">Let&apos;s engineer it together.</span>
              </div>
              <a
                href="/contact"
                className="w-full sm:w-auto bg-appBanner hover:bg-[#4B0163]/90 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
              >
                Start a Project
                <Layers className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
