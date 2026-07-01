import { Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
  Code,
  Brain,
  Cpu,
  Server,
  Award,
  Cloud,
  PenTool,
  Lightbulb,
  Briefcase,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  deepDive: string;
  techStack: string[];
  capabilities: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "software-engineering",
    icon: Code,
    title: "Custom Software Engineering",
    tagline: "High-Availability, Distributed Enterprise Applications",
    desc: "We engineer fault-tolerant frontend and backend architectures tailored to substitute legacy operations with secure, modern digital infrastructure.",
    deepDive: "Our engineering philosophy focuses on system refactoring, modular design, and clean data isolation. From architecting synchronous banking pipelines to designing scalable service nodes, we construct solutions engineered for zero-downtime execution and rapid deployment.",
    techStack: ["React", "Next.js", "Vue", "Nuxt", "Node.js", "NestJS", "Python", "Django", "Java", "Spring Boot", "PHP (Laravel)", "TypeScript"],
    capabilities: [
      "Monolith decomposition & microservices design",
      "Transactional isolation & advanced database synchronization",
      "Asynchronous processing pipelines & automated document generation (MT940/MT942)",
      "Secure API design with strict OAuth2 & JWT architectures",
    ],
  },
  {
    id: "ai-optimization",
    icon: Brain,
    title: "AI & Computational Optimization",
    tagline: "Deterministic Models & Advanced Analytics Pipelines",
    desc: "Deploy customized intelligence layers to solve highly complex operational and logistical bottlenecks using stochastic modeling and machine learning.",
    deepDive: "We build custom heuristic models, optimization matrices, and predictive analytics pipelines. Whether developing automated, multivariable resource allocation engines utilizing custom Genetic Algorithms or processing massive structured datasets, we bridge raw data with operational efficiency.",
    techStack: ["Python", "PyTorch", "TensorFlow", "Pandas/NumPy", "Genetic Algorithms", "Scikit-Learn"],
    capabilities: [
      "Combinatorial optimization & advanced heuristics modeling",
      "Predictive analytical modeling for industrial or logistics routing",
      "Custom AI room and resource allocation architectures",
      "Automated extraction, transformations, and data pipelining (ETL)",
    ],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    tagline: "Scalable Cloud Architecture & Automated Delivery Pipelines",
    desc: "Design, deploy, and manage highly available cloud ecosystems with automated CI/CD pipelines for rapid, secure, and resilient software delivery.",
    deepDive: "We architect cloud-native solutions using Infrastructure as Code (IaC) to eliminate manual provisioning. By implementing advanced Kubernetes orchestration, automated testing pipelines, and robust observability stacks, we ensure zero-downtime deployments and limitless horizontal scalability.",
    techStack: ["AWS", "Google Cloud (GCP)", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Jenkins"],
    capabilities: [
      "Infrastructure as Code (IaC) provisioning and management",
      "Continuous Integration & Continuous Deployment (CI/CD) pipelines",
      "Kubernetes cluster orchestration and auto-scaling",
      "Advanced observability, centralized logging, and incident alerting",
    ],
  },
  {
    id: "rpa-transformation",
    icon: Cpu,
    title: "Robotic Process Automation (RPA)",
    tagline: "Autonomous Workflow Design & Hyper-Automation",
    desc: "Eliminate error-prone legacy operations through secure digital workforces and intelligent UI/API automation frameworks.",
    deepDive: "We target friction-dense corporate ecosystems to automate high-volume transaction processing and data reconciliation. By integrating industry-standard tools with rapid cloud applications, we orchestrate workflows that securely talk to legacy software, spreadsheets, and web services seamlessly.",
    techStack: ["BluePrism", "Microsoft Power Automate", "Oracle APEX", "UiPath", "Selenium Core"],
    capabilities: [
      "End-to-end business process modeling and script mapping",
      "Rapid low-code web app development via Oracle APEX systems",
      "Cognitive screen-scraping & automated document categorization",
      "Enterprise audit trail logging and exception handling compliance",
    ],
  },
  {
    id: "product-design",
    icon: PenTool,
    title: "Product Design & Brand Identity (UI/UX)",
    tagline: "Human-Centric Interface Design & Enterprise Brand Systems",
    desc: "Craft intuitive, conversion-optimized user experiences and cohesive brand identities that translate complex technical logic into seamless human interactions.",
    deepDive: "Our design philosophy bridges the gap between aesthetic excellence and behavioral psychology. We build comprehensive design systems, interactive high-fidelity prototypes, and data-driven UX architectures that ensure accessibility, engagement, and a unified brand presence across all digital touchpoints.",
    techStack: ["Figma", "Adobe Creative Cloud", "Framer", "Prototyping", "Design Systems", "WCAG Accessibility"],
    capabilities: [
      "Data-driven User Experience (UX) research and journey mapping",
      "High-fidelity User Interface (UI) design and interactive prototyping",
      "Scalable enterprise design systems and component libraries",
      "Brand identity formulation and visual strategy alignment",
    ],
  },
  {
    id: "product-ideation",
    icon: Lightbulb,
    title: "Product Ideation & Strategy",
    tagline: "Concept Validation & Minimum Viable Product (MVP) Engineering",
    desc: "Transform abstract business concepts into technically viable, market-ready product blueprints with rapid prototyping and strategic validation.",
    deepDive: "We apply design thinking and agile frameworks to deconstruct your vision. Through rigorous market analysis, technical feasibility studies, and user-centric ideation workshops, we architect comprehensive product roadmaps that minimize development risk and accelerate time-to-market.",
    techStack: ["Miro", "Notion", "Whimsical", "Agile/Scrum", "Design Thinking", "Lean Canvas"],
    capabilities: [
      "Technical feasibility analysis and development risk mitigation",
      "Minimum Viable Product (MVP) feature scoping and prioritization",
      "Interactive wireframing and proof-of-concept validation",
      "Go-to-market strategic product roadmapping",
    ],
  },
  {
    id: "consultation-services",
    icon: Briefcase,
    title: "Digital Transformation Consulting",
    tagline: "Strategic Technology Roadmaps & Enterprise Modernization",
    desc: "Partner with our elite engineering architects to audit legacy systems, align technology with business objectives, and drive digital transformation.",
    deepDive: "We provide executive-level technical advisory to guide C-suite decision-making. From auditing monolithic legacy codebases to drafting migration strategies for cloud adoption and AI integration, we deliver actionable, data-backed intelligence that guarantees measurable ROI on technological investments.",
    techStack: ["Enterprise Architecture", "SWOT Analysis", "TCO/ROI Modeling", "System Auditing", "IT Governance", "Compliance (GDPR/ISO)"],
    capabilities: [
      "Comprehensive legacy system audits and modernization roadmaps",
      "Cloud migration and AI adoption feasibility consulting",
      "Technical debt assessment and architecture refactoring plans",
      "Executive-level technological strategy and compliance advisory",
    ],
  },
  {
    id: "it-support",
    icon: Server,
    title: "Enterprise IT Support & Infrastructure",
    tagline: "Proactive System Administration & High-Availability Servers",
    desc: "Maintain secure production runtime environments with professional configuration management, server hardening, and network oversight.",
    deepDive: "We offer intermediate and advanced tier system administration support tailored for modern containerized architectures and bare-metal environments. We monitor application health logs, mitigate architectural vulnerabilities, and guarantee robust infrastructure operations for corporate applications.",
    techStack: ["Linux Server Environments", "Nginx", "Bash Scripting", "PostgreSQL", "MongoDB", "Network Security"],
    capabilities: [
      "Intermediate-level Linux server provisioning, tuning, and monitoring",
      "Relational and non-relational database tuning (PL/SQL & MongoDB query optimization)",
      "Continuous logging, backup automation, and server patch scheduling",
      "Network routing, load balancing, and firewall configuration",
    ],
  },
  {
    id: "certifications-partnerships",
    icon: Award,
    title: "Certification Partnerships & Training",
    tagline: "Corporate Capacity Building & Industry Framework Alignment",
    desc: "Empower your technical teams and standardize your business delivery via partnerships with global technology certifying bodies.",
    deepDive: "We collaborate closely with premier international certificating organizations to provide highly specialized technical curriculum roadmaps, institutional professional validation, and enterprise-grade technological baseline training to align teams with world-class engineering paradigms.",
    techStack: ["Global Certificating Frameworks", "Agile/Scrum Methodologies", "DevOps Institute Standards", "ITIL Frameworks"],
    capabilities: [
      "Strategic alignment with international technology training boards",
      "Custom curriculum mapping for corporate full-stack and systems engineering",
      "Validation protocols for enterprise architecture compliance standards",
      "Coached training sprints across modern software development methodologies",
    ],
  },
];

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};
