# 🚀 DUSACORE Web Platform

![DUSACORE Banner](https://plain-weur-prod-public.komododecks.com/202606/27/8x3fXy5SqObWDzrtckkL/image.png)

> **Building Engineering Solutions That Deliver Business Value.** > The core digital platform and lead-generation engine for DUSACORE, an agency specializing in software engineering, AI infrastructure, and digital transformation.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-ff00c8?logo=framer)](https://www.framer.com/motion/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-green?logo=spring)](https://spring.io/projects/spring-boot)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Installation](#installation)
- [Usage & Workflows](#-usage--workflows)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏢 About the Project

**DUSACORE** is a premium engineering and digital transformation firm. This repository houses the core digital presence and interactive client portal for the agency. 

Designed to sit at the intersection of strategy, engineering, and design, this platform acts as the primary conversion funnel for enterprise clients. It features a highly interactive UI, dynamic routing for team and case study pages, and seamless integrations for booking consultations and requesting project quotes.

---

## ✨ Key Features

### 🎨 Premium Interactive UI
* **Hybrid Responsive Layouts:** Advanced grid systems that seamlessly transition into touch-friendly, auto-scrolling carousels on mobile devices.
* **Physics-Based Animations:** Utilization of Framer Motion for magnetic hover effects, 3D card flips, and staggered entrance animations.
* **Mirage Highlights:** Custom CSS and framer integrations for dazzling text sweeps and gradient masking.

### ⚙️ Dynamic Content & Routing
* **Programmatic Team Profiles:** SEO-optimized, dynamic routing (`/team/[slug]`) that automatically maps URL parameters to deep-dive profiles for executive team members.
* **Intelligent Middleware:** Secure routing protocols that automatically whitelist dynamic public pages while protecting private dashboards.

### 📈 Lead Generation & Workflows
* **Direct-to-WhatsApp Funnels:** Client inquiries and consultation bookings are programmatically formatted and pushed directly to the DUSACORE WhatsApp Business channel.
* **Floating Action Menus:** Non-intrusive, globally accessible interactive menus to capture high-intent leads at any point in the user journey.

---

## 🛠 Tech Stack

### Frontend (Client)
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation Engine:** Framer Motion
* **Icons:** Lucide React, React Icons

### Backend (Server)
* **Framework:** Java Spring Boot
* **Architecture:** RESTful API
* **Database:** PostgreSQL (JPA/Hibernate)
* **Documentation:** Swagger / OpenAPI 3.0

---

## 🏗 System Architecture

The application follows a decoupled **Client-Server** architecture optimized for speed and conversion:

1.  **Client:** The Next.js frontend handles SSR/SSG rendering, advanced animations, state management, and direct deep-linking.
2.  **API Gateway:** Spring Boot controllers expose secure REST endpoints for capturing persistent leads and handling complex backend calculations.
3.  **Communication:** Lead data is simultaneously captured in the backend database and routed to external messaging channels (WhatsApp/Email) for immediate team response.

---

## 🏁 Getting Started

Follow these instructions to set up the DUSACORE project locally.

### Prerequisites
* Node.js (v18+)
* Java JDK 17+
* Maven or Gradle
* Git

### Environment Configuration

Create a `.env.local` file in the root of the **frontend** directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# Contact Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=23489044698791
