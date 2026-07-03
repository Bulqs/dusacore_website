"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap, GraduationCap } from "lucide-react";
import { AcademyCourse } from "@/data/academyData";

interface AcademyDetailPanelProps {
  course: AcademyCourse;
  isCohortOpen: boolean;
  onEnroll: () => void;
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

export default function AcademyDetailPanel({ course, isCohortOpen, onEnroll }: AcademyDetailPanelProps) {
  return (
    <div className="lg:col-span-8 relative h-[650px] sm:h-[750px] w-full" style={{ transformStyle: "preserve-3d" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          variants={showcaseVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-[40%] shrink-0 overflow-hidden bg-gray-900">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between" style={{ transform: "translateZ(50px)" }}>
              <div>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-3 inline-block shadow-lg"
                  style={{ backgroundColor: course.color }}
                >
                  {course.duration}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {course.title}
                </h2>
              </div>
              <div className="hidden sm:flex w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20 text-white">
                <course.icon className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-8 flex flex-col" style={{ transform: "translateZ(30px)" }}>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {course.desc}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-appBanner mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Core Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-appBanner text-white text-xs font-semibold px-3 py-1.5 rounded-md border border-appBanner transition-all hover:bg-appBanner/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-appBanner mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Curriculum Overview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.curriculum.map((module, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white border border-gray-100 p-3.5 rounded-xl shadow-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-appBanner/10 text-appBanner flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                    <span className="text-sm font-semibold text-gray-700 leading-snug">{module}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tuition Fee</p>
                <p className="text-2xl font-black text-appBanner">{course.price}</p>
              </div>
              <button
                onClick={onEnroll}
                disabled={!isCohortOpen}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                  isCohortOpen ? "bg-appBanner hover:bg-[#4B0163]/90 text-white group" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isCohortOpen ? (
                  <>View Curriculum & Enroll <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                ) : (
                  "Registration Closed"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
