"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { AcademyCourse } from "@/data/academyData";

interface AcademyTabNavProps {
  courses: AcademyCourse[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function AcademyTabNav({ courses, activeTab, onTabChange }: AcademyTabNavProps) {
  return (
    <div className="lg:col-span-4 space-y-3">
      {courses.map((course) => {
        const IconComponent = course.icon;
        const isActive = activeTab === course.id;
        return (
          <button
            key={course.id}
            onClick={() => onTabChange(course.id)}
            className={`w-full flex items-center gap-4 p-5 text-left border rounded-xl transition-all duration-300 group outline-none ${
              isActive
                ? "bg-white border-appBanner shadow-md border-l-4 border-l-appBanner"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
          >
            <div
              className={`p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-appBanner text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-appBanner/10 group-hover:text-appBanner"
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-appBanner">
                {course.title}
              </p>
              <p className="text-xs text-gray-700 truncate mt-0.5">
                {course.price} &bull; {course.duration}
              </p>
            </div>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                isActive ? "text-appBanner translate-x-1" : "text-gray-700"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
