import { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  RefreshCcw,
  Truck,
  CalendarCheck,
  Store,
  Palette,
  Bot,
} from "lucide-react";

export interface ProductItem {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  deepDive: string;
  features: string[];
  image: string;
  color: string;
}

export const productsData: ProductItem[] = [
  {
    id: "ecommerce-engine",
    icon: ShoppingCart,
    title: "Enterprise E-Commerce Engine",
    tagline: "Scalable digital retail infrastructure.",
    desc: "A high-conversion, multi-tenant capable e-commerce platform. Features advanced inventory tracking, dynamic pricing algorithms, and seamless payment gateway integrations right out of the box.",
    deepDive: "Built on a headless architecture, decoupling the React/Next.js frontend from the underlying Node.js/Spring Boot microservices. We utilize Redis for sub-millisecond cart caching, PostgreSQL for transactional integrity, and Elasticsearch for lightning-fast product discovery.",
    features: ["Multi-vendor & Single-vendor modes", "Abandoned cart recovery automation", "AI-driven product recommendations", "Advanced analytics dashboard"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000",
    color: "#4B0163"
  },
  {
    id: "fintech-bdc",
    icon: RefreshCcw,
    title: "Fintech BDC Application",
    tagline: "Secure Bureau De Change & Remittance Platform.",
    desc: "A military-grade financial application designed for BDCs and currency exchange operators. Features real-time FX rate synchronization, multi-currency wallets, and strict KYC/AML compliance workflows.",
    deepDive: "Engineered with strict zero-trust security protocols. We implement WebSocket connections for real-time currency ticker updates, AES-256 payload encryption, and immutable ledger routing to ensure every transaction is completely auditable and tamper-proof.",
    features: ["Real-time global exchange rates via API", "Automated KYC & Identity verification", "Secure multi-currency digital wallets", "Automated ledger and compliance reporting"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    color: "#0284c7"
  },
  {
    id: "logistics-platform",
    icon: Truck,
    title: "Logistics B2B & B2C Platform",
    tagline: "Intelligent fleet and parcel tracking.",
    desc: "A comprehensive logistics management solution supporting both B2B freight and B2C last-mile delivery. Includes live map tracking, driver allocation algorithms, and dynamic pricing models.",
    deepDive: "Leverages graph-based pathfinding algorithms (like A* and Dijkstra) combined with Google Maps Matrix APIs to dynamically calculate the most fuel-efficient delivery routes. WebSockets push real-time GPS telemetry data directly to the user dashboard.",
    features: ["Real-time GPS fleet tracking", "Automated dispatch and routing algorithms", "Digital Proof of Delivery (ePOD)", "Customized corporate billing modules"],
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000",
    color: "#059669"
  },
  {
    id: "marketing-booking",
    icon: CalendarCheck,
    title: "Automated Booking & Marketing Hub",
    tagline: "Client acquisition on autopilot.",
    desc: "A powerhouse marketing platform tailored for service-based businesses. Seamlessly combines automated appointment scheduling with instant payment capture and CRM follow-up sequences.",
    deepDive: "Powered by an event-driven architecture using message brokers (like RabbitMQ or Apache Kafka) to guarantee delivery of SMS and Email sequences without dropping requests. Features robust webhook integrations to interface cleanly with external CRMs.",
    features: ["Smart calendar sync & self-booking", "Automated deposit/payment collection", "SMS & Email reminder sequences", "Lead capture and pipeline management"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    color: "#ea580c"
  },
  {
    id: "markethub-omni",
    icon: Store,
    title: "Omni-Service MarketHub",
    tagline: "The ultimate B2C marketplace and institutional collector.",
    desc: "A highly versatile hybrid marketplace where users can purchase merchandise or hire professional services. Includes specialized sub-modules for institutions to collect offerings and issue automated alerts.",
    deepDive: "Constructed utilizing a multi-tenant database schema to securely isolate organizational data. Features a custom escrow payment routing module that temporarily holds funds, releasing them to service providers only upon milestone completion triggers.",
    features: ["Merchandise & Service-booking storefronts", "Custom donation/offering collection modules", "Automated SMS/Email institutional alerts", "Escrow & milestone-based payouts"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000",
    color: "#9333ea"
  },
  {
    id: "arts-gallery",
    icon: Palette,
    title: "Digital Arts & Artifacts Platform",
    tagline: "Premium digital galleries for physical art.",
    desc: "A visually stunning, high-resolution platform designed specifically for the sale of artifacts, wall paints, and sculptures. Features immersive galleries and secure, high-ticket payment processing.",
    deepDive: "Heavily optimized for performance using edge CDNs (Content Delivery Networks) to serve massive 4K and 3D asset files instantly globally. Built with WebGL support for interactive 3D sculpture viewing and lazy-loading architecture to guarantee high Google Lighthouse performance scores.",
    features: ["High-res 3D/Zoomable image galleries", "Artist portfolio and management portals", "Secure escrow for high-ticket transactions", "Automated global shipping integrations"],
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1000",
    color: "#be123c"
  },
  {
    id: "ai-support-agent",
    icon: Bot,
    title: "Omnichannel AI Support Agent",
    tagline: "Autonomous customer service and intelligent routing.",
    desc: "Deploy a highly customizable, LLM-powered chatbot trained exclusively on your organization's unique knowledge base. Seamlessly integrated across WhatsApp, direct voice calling, and web platforms to automate 24/7 customer support.",
    deepDive: "Orchestrated using a strict RAG (Retrieval-Augmented Generation) pipeline backed by a Vector Database (Pinecone) to ensure the AI never hallucinates. Features specialized Speech-to-Text (STT) models trained specifically to recognize local dialects (Hausa, Igbo, Yoruba) and code-switching via Twilio Voice API.",
    features: ["Hausa, Igbo, & Yoruba Voice Recognition", "WhatsApp Business API & VoIP Call integration", "Custom Knowledge Base Training (RAG Pipeline)", "Sentiment analysis & human-agent handoff"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    color: "#14b8a6"
  }
];
