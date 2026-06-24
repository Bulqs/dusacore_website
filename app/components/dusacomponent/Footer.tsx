"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import logodusa from "@/public/images/dusacoreimages/logodusa.png";

// Note: Adjust this import path if needed based on your folder structure!
import logo from "../../../public/images/logo5.svg";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const Footer = () => {
  // Social Links Data
  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/bulq.ca?igsh=dG5iN2UwaDNuZnRn",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/bulq-hq/",
    },
  ];

  // Navigation Sections Data
  const footerSections = [
    {
      title: "Explore",
      links: ["About DUSA", "Services", "Projects", "How we work"],
    },
    {
      title: "Services",
      links: [
        "Software Engineering",
        "Technology Education",
        "Artificial Intelligence",
        "Consultations",
        "Product Design/ Branding",
      ],
    },
    {
      title: "CASE STUDIES",
      links: ["Bulq E-Commerce", "SendBulq Logistics", "Cookie Policy"],
    },
    {
      title: "RESOURCES",
      links: ["Blogs", "Community", "Nigeria", "FAQs", "Contact"],
    },
    {
      title: "COUNTRIES",
      links: ["Nigeria", "UK", "Canada"],
    },
  ];

  return (
    <>
      {/* =========================================
                NEW FULL-WIDTH CTA BANNER 
            ========================================= */}
      <section className="w-full bg-appPurple py-8 md:py-16 lg:py-20 px-6 flex flex-col items-center justify-center text-center relative z-20">
        {/* 1. Top Div: Bold Headline */}
        <div className="mb-4">
          <h2 className="text-montserrat text-appWhite font-bold text-3xl md:text-5xl tracking-wide">
            Let’s Build Something Meaningful
          </h2>
        </div>

        {/* 2. Middle Div: Subtext */}
        <div className="mb-10 max-w-3xl">
          <p className="text-montserrat text-appWhite font-medium text-base md:text-lg leading-relaxed">
            Whether you're modernizing systems or building new digital
            infrastructure, DUSA CORE helps you design and engineer the future
            of your organization.
          </p>
        </div>

        {/* 3. Bottom Div: Button Row */}
        <div className="flex flex-row gap-4 items-center justify-center">
          <button className="bg-appPurple text-appWhite border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-appWhite hover:text-appPurple transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
            Book a Consultation
          </button>
          <button className="bg-appWhite text-appPurple border-2 border-appWhite px-6 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
            Get a Quote
          </button>
        </div>
      </section>

      {/* =========================================
                EXISTING FOOTER (Light Purple Navs)
            ========================================= */}
      <footer className="relative bg-appLightPurple text-white pt-20 pb-4 px-6 sm:px-8 lg:px-12 border-t border-gray-800 overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.2, 1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8">
            {/* Left Column: Newsletter & Socials */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-teachers text-[#0E0E0E] font-bold text-xl tracking-wide text-[16px]">
                  Sign up for our newsletter
                </h3>

                <form className="flex w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-l-md bg-appWhite border border-gray-600 text-appBlack placeholder-gray-400 focus:outline-none focus:border-appPurple transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-r-md bg-appPurple text-white font-semibold hover:bg-appNav transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-gray-900 text-sm font-bold uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={social.href}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-appNav border border-appNav hover:bg-appPurple hover:border-appPurple hover:shadow-[0_0_15px_rgba(131,0,175,0.5)] text-white hover:text-white transition-colors duration-300"
                      >
                        <span className="text-lg">{social.icon}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Columns */}
            {footerSections.map((section, idx) => (
              <motion.div variants={itemVariants} key={idx}>
                <h3 className="text-montserrat text-appNav font-extrabold text-[14px] mb-3 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-2 pl-0 list-none">
                  {section.links.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="pl-0"
                    >
                      <Link
                        href="#"
                        className="text-montserrat text-appBlack hover:text-appPurple text-sm font-medium transition-colors duration-200 inline-flex items-center group"
                      >
                        <span className="w-0 h-px bg-appPurple transition-all duration-300 group-hover:w-3"></span>
                        <span>{item}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800/20 flex flex-col md:flex-row items-center justify-between gap-2 pt-3 mt-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-montserrat text-appBlack text-sm text-center md:text-left font-medium">
                © {new Date().getFullYear()} DUSACORE. All rights reserved.
              </p>

              <div className="flex gap-4 text-sm text-montserrat text-appBlack font-medium">
                <Link
                  href="#"
                  className="hover:text-appPurple transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="hover:text-appPurple transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="hover:text-appPurple transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block group p-1 rounded-lg bg-appLightPurple"
            >
              <Image
                src={logodusa}
                alt="DUSA Logo"
                width={80}
                height={40}
                className="w-20 h-10 object-contain"
                priority
              />
            </Link>
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
