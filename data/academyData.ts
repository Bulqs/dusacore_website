import { LucideIcon } from "lucide-react";
import {
  Code, Server, Cloud, PenTool, Lightbulb, Brain, Briefcase, Shield,
} from "lucide-react";

export interface AcademyCourse {
  id: string;
  icon: LucideIcon;
  title: string;
  price: string;
  duration: string;
  tagline: string;
  desc: string;
  techStack: string[];
  curriculum: string[];
  color: string;
  image: string;
}

export const WHATSAPP_NUMBER = "2349044698791";

export const BANK_ACCOUNTS = [
  { bank: "Ecobank Nigeria", currency: "NGN (Naira)", name: "DUSA CORE TECH LTD", number: "4130198573" },
  { bank: "Wema Bank", currency: "NGN (Naira)", name: "DUSA CORE TECHNOLOGIES", number: "7650701035" },
  { bank: "Lead Bank", currency: "USD (Dollars)", name: "DUSA CORE TECHNOLOGIES", number: "213192089068" }
];

export const academyCourses: AcademyCourse[] = [
  {
    id: "frontend",
    icon: Code,
    title: "Frontend Engineering",
    price: "₦150,000",
    duration: "12 Weeks",
    tagline: "Build immersive, interactive user interfaces.",
    desc: "Master the art of building responsive, high-performance web applications. You will go from basic markup to engineering complex single-page applications using modern frameworks.",
    techStack: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js"],
    curriculum: [
      "Week 1-3: Semantic HTML, CSS Architecture & DOM Basics",
      "Week 4-6: Advanced JavaScript (ES6+) & Asynchronous Programming",
      "Week 7-9: React.js Ecosystem, Components & State Management",
      "Week 10-12: Next.js, API Integration & Production Deployment"
    ],
    color: "#4B0163",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Engineering",
    price: "₦200,000",
    duration: "14 Weeks",
    tagline: "Architect scalable server-side systems.",
    desc: "Learn to design robust databases, secure APIs, and scalable microservices. Master the complete Software Development Life Cycle (SDLC) and heavy-lifting architectures.",
    techStack: ["Node.js", "Java", "NestJS", "Database Design", "SDLC"],
    curriculum: [
      "Week 1-3: SDLC Principles, Node.js & Express Fundamentals",
      "Week 4-7: Relational & NoSQL Database Designing (PostgreSQL/MongoDB)",
      "Week 8-10: Enterprise Java & Spring Boot Architecture",
      "Week 11-14: NestJS, Microservices & Secure Authentication"
    ],
    color: "#0284c7",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps Engineering",
    price: "₦250,000",
    duration: "12 Weeks",
    tagline: "Deploy, monitor, and scale cloud infrastructure.",
    desc: "Master the infrastructure that powers the modern web. Learn continuous integration, containerization, and enterprise cloud resource management.",
    techStack: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
    curriculum: [
      "Week 1-3: Linux Server Admin & Shell Scripting",
      "Week 4-6: Containerization & Orchestration with Docker",
      "Week 7-9: AWS Infrastructure (EC2, S3, RDS, VPCs)",
      "Week 10-12: Kubernetes Clusters & Jenkins CI/CD Pipelines"
    ],
    color: "#059669",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "ui-ux",
    icon: PenTool,
    title: "Product / Brand Design (UI/UX)",
    price: "₦120,000",
    duration: "10 Weeks",
    tagline: "Design experiences humans love.",
    desc: "Blend psychology with aesthetics. Learn wireframing, prototyping, and the principles of creating intuitive digital products and memorable brand identities.",
    techStack: ["Figma", "Design Systems", "Prototyping", "UX Research", "Adobe Suite"],
    curriculum: [
      "Week 1-2: Visual Design Principles & Brand Typography",
      "Week 3-5: UX Research, Personas & User Journey Mapping",
      "Week 6-8: UI Component Architecture & Enterprise Design Systems",
      "Week 9-10: Advanced Interactive Prototyping & Portfolio Build"
    ],
    color: "#e11d48",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "design-thinking",
    icon: Lightbulb,
    title: "Design Thinking & Innovation",
    price: "₦80,000",
    duration: "6 Weeks",
    tagline: "Solve complex problems with creative frameworks.",
    desc: "A hands-on track teaching the methodology used by top tech companies to ideate, prototype, and test innovative solutions to human-centered problems.",
    techStack: ["Empathy Mapping", "Ideation Frameworks", "Rapid Prototyping", "User Testing"],
    curriculum: [
      "Week 1-2: Empathize & Define - Understanding User Needs",
      "Week 3-4: Ideation Sessions & Brainstorming Architectures",
      "Week 5: Rapid Lo-Fi Prototyping",
      "Week 6: User Testing, Feedback Loops & Iteration"
    ],
    color: "#d97706",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    price: "₦300,000",
    duration: "16 Weeks",
    tagline: "Engineer intelligent, predictive models.",
    desc: "Dive into the mathematics and code behind artificial intelligence. From core Python scripting to applied neural networks and complex Quantz engineering.",
    techStack: ["Python", "Quantz Engineering", "TensorFlow", "Pandas", "Neural Networks"],
    curriculum: [
      "Week 1-4: Advanced Python, Data Structures & Pandas",
      "Week 5-8: Statistical Modeling & Machine Learning Algorithms",
      "Week 9-12: Deep Learning, Neural Networks & NLP",
      "Week 13-16: Quantz Engineering, Trading Algorithms & Applied LLMs"
    ],
    color: "#9333ea",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "product-management",
    icon: Briefcase,
    title: "Product / Project Management",
    price: "₦100,000",
    duration: "8 Weeks",
    tagline: "Lead teams and deliver digital products.",
    desc: "Learn agile methodologies, sprint planning, and how to bridge the gap between engineering, design, and business stakeholders.",
    techStack: ["Jira", "Agile/Scrum", "Product Roadmapping", "Trello", "SDLC"],
    curriculum: [
      "Week 1-2: Product Lifecycle, PRDs & Market Research",
      "Week 3-4: Agile Frameworks & Scrum Ceremonies",
      "Week 5-6: Sprint Planning, Jira & Backlog Grooming",
      "Week 7-8: Stakeholder Communication & Go-to-Market Strategies"
    ],
    color: "#ea580c",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    price: "₦200,000",
    duration: "12 Weeks",
    tagline: "Protect enterprise networks and data.",
    desc: "Understand threat landscapes, ethical hacking, and how to secure digital infrastructures against modern cyber attacks.",
    techStack: ["Penetration Testing", "Network Security", "Cryptography", "Risk Auth"],
    curriculum: [
      "Week 1-3: Networking Protocols & Security Fundamentals",
      "Week 4-6: Ethical Hacking & Vulnerability Assessment",
      "Week 7-9: Cryptography & Secure Application Design",
      "Week 10-12: Incident Response, Forensics & ISO Compliance"
    ],
    color: "#14b8a6",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
  }
];
