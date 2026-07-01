"use client";

import React from "react";
import { motion } from "framer-motion";
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

export default function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
  const PanelIcon = service.icon;

  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-appBanner/10 text-appBanner rounded-xl">
            <PanelIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-appBanner">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-appBanner font-medium mt-0.5">
              {service.tagline}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-appBanner mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Core Focus Description
        </h4>
        <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
          {service.desc}
        </p>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-appBanner mb-2 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" /> Technical Deep-Dive
        </h4>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed bg-gray-50 p-4 border-l-2 border-appBanner rounded-r-lg">
          {service.deepDive}
        </p>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-appBanner mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" /> Capabilities & Solutions Matrix
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.capabilities.map((capability, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-appBanner" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-appBanner mb-3 flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5" /> Core Underlying Technology Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 transition-all hover:border-appBanner/30 hover:bg-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
