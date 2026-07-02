"use client";
import React, { useState } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';
import ReusableModal from './ReusableModal';

const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ReusableModal onClose={onClose} maxWidth="max-w-6xl" contentClassName="h-[92vh] max-h-[900px]">
            <div className="bg-gradient-to-br from-[#4B0163] to-[#8300AF] p-3 sm:p-4 text-white flex justify-between items-center shrink-0 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-auto h-auto rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <FiCalendar size={40} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg sm:text-xl font-extrabold tracking-wide">Book a Consultation</h2>
                        <p className="text-xs font-semibold text-white/80 hidden sm:block">Select a time that works best for you.</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                    <FiX size={18} />
                </button>
            </div>

            <div className="flex-1 w-full bg-slate-50 relative overflow-hidden flex flex-col">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-10">
                        <div className="w-8 h-8 border-4 border-[#4B0163] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-sm font-bold animate-pulse">Loading Calendar...</p>
                    </div>
                )}
                
                <iframe 
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eseMkYNDpPH0i9mjQTQkQcSe0ZJsXOyKzQomQLJzN7EVC-ackhxEFnf4x5zKe4_rk0PRC7YR4?gv=true" 
                    style={{ border: 0 }} 
                    width="100%" 
                    height="100%" 
                    className="flex-1 w-full h-full"
                    onLoad={() => setIsLoading(false)}
                ></iframe>
            </div>
        </ReusableModal>
    );
};

export default ConsultationModal;
