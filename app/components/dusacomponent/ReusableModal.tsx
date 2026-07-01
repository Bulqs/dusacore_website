"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const backdropVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    show: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3 } }
};

const contentVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    show: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.95, opacity: 0, y: 20, transition: { duration: 0.2 } }
};

interface ReusableModalProps {
    onClose: () => void;
    children: React.ReactNode;
    contentClassName?: string;
    maxWidth?: string;
}

const ReusableModal = ({ onClose, children, contentClassName = '', maxWidth = 'max-w-4xl' }: ReusableModalProps) => {
    return (
        <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 sm:p-6"
        >
            <motion.div
                variants={contentVariants}
                className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} relative flex flex-col overflow-hidden ${contentClassName}`}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default ReusableModal;
