import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Globe, Palette, TrendingUp, Layers, Box, Target, Users, Code2, 
  ArrowRight, CheckCircle2, Sparkles, X, ChevronRight, Check, Zap, HelpCircle,
  Clock, Shield, Eye
} from 'lucide-react';

export const servicesData = [
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    shortTitle: 'MOBILE APP DEVELOPMENT',
    category: 'Development',
    icon: Smartphone,
    image: '/services/mobile-app.jpg',
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-cyan-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    tag: 'Trending',
    tagline: 'Engineering Seamless Mobile Solutions for iOS and Android',
    desc: 'Creating seamless native and cross-platform mobile experiences for iOS and Android. High-performance, offline-first architectures, real-time sync, and smooth 60 FPS interfaces.',
    features: [
      'Native iOS (Swift) & Android (Kotlin) Architecture',
      'Cross-Platform React Native & Flutter Engineering',
      'Real-time Push Notifications & WebSockets Integration',
      'App Store & Play Store Compliance & Automated CI/CD'
    ],
    techStack: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase', 'Redux'],
    process: [
      { step: '01', title: 'Requirement & Wireframing', desc: 'Analyzing user journey flows, native device constraints, and feature scope.' },
      { step: '02', title: 'Interactive Prototype', desc: 'Crafting Figma mobile wireframes and tactile prototype flows for client review.' },
      { step: '03', title: 'Native & API Development', desc: 'Building high-performance mobile screens connected to secure cloud backends.' },
      { step: '04', title: 'QA & App Store Release', desc: 'Multi-device beta testing via TestFlight and Play Console distribution.' }
    ],
    benefits: [
      { title: 'Offline-First Caching', desc: 'Instant UI feedback and reliable local database sync even in low network environments.' },
      { title: 'Hardware Acceleration', desc: 'GPU-accelerated animations delivering true 60fps native responsiveness.' },
      { title: 'Biometric Security', desc: 'FaceID, Fingerprint and JWT encrypted token storage.' }
    ],
    faqs: [
      { q: 'Can you build both Android and iOS apps from a single codebase?', a: 'Yes! Using React Native or Flutter, we build cross-platform apps with near-native performance that save up to 40% in cost and maintenance time.' },
      { q: 'Do you assist with publishing on Google Play & Apple App Store?', a: 'Yes, we take care of app review guidelines, privacy policies, developer console provisioning, and release approvals.' }
    ]
  },
  {
    id: 'website-design',
    title: 'Website Design',
    shortTitle: 'WEBSITE DESIGN',
    category: 'Design & Web',
    icon: Globe,
    image: '/services/web-design.jpg',
    color: 'from-cyan-400 to-teal-400',
    borderColor: 'border-teal-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]',
    tag: 'High Demand',
    tagline: 'Custom Web Architecture Tailored to Your Brand & Conversions',
    desc: 'Modern, responsive websites built with the latest technologies to convert visitors. High-end usability, SEO-first structure, and lightning-fast loading speeds.',
    features: [
      'Bespoke Responsive Web Architecture (Mobile, Tablet, Desktop)',
      'SEO-Friendly Semantic Code & Google Core Web Vitals < 1.8s',
      'Engaging Micro-Interactions, 3D Canvas & Framer Motion',
      'Headless CMS & Dynamic Database Integration'
    ],
    techStack: ['Next.js', 'React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Vite'],
    process: [
      { step: '01', title: 'Discovery & Strategy', desc: 'Analyzing business goals, audience demographics, and conversion funnels.' },
      { step: '02', title: 'UI/UX Visual Design', desc: 'Designing modern, high-converting layouts with brand color palette and typography.' },
      { step: '03', title: 'Modern Web Engineering', desc: 'Building clean, performant React/Next.js front-end with responsive styling.' },
      { step: '04', title: 'SEO Audit & Deployment', desc: 'Lighthouse 95+ score optimization, domain DNS, and automated cloud hosting.' }
    ],
    benefits: [
      { title: 'SEO-Ready Launch', desc: 'Clean semantic HTML, schema tags, and keyword-rich metadata ready to rank on Google.' },
      { title: 'Sub-2s Page Load', desc: 'Optimized image pipelines, code splitting, and browser edge caching.' },
      { title: 'High Conversion Flow', desc: 'Strategically positioned CTA banners, contact forms, and lead captures.' }
    ],
    faqs: [
      { q: 'How long does a website design project take?', a: 'A standard modern business website takes 2 to 4 weeks. E-commerce or complex web portals take 4 to 8 weeks.' },
      { q: 'Will my website work smoothly on all mobile devices?', a: 'Absolutely. Every design is built mobile-first and tested rigorously across iOS and Android screens.' }
    ]
  },
  {
    id: 'brand-identity',
    title: 'Logo & Brand Identity',
    shortTitle: 'LOGO & BRAND IDENTITY',
    category: 'Creative',
    icon: Palette,
    image: '/services/branding.jpg',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    tag: 'Creative',
    tagline: 'Crafting Iconic Visual Identities that Resonate and Inspire',
    desc: 'Crafting iconic logos and brand guidelines that tell your unique story. Distinctive visual identities that command industry respect and leave a lasting impression.',
    features: [
      'Custom Vector Logo Design (Wordmark, Emblem & Minimalist Marks)',
      'Comprehensive Brand Guidelines (Color Hex, CMYK, Spacing)',
      'Typography Hierarchy & Corporate Stationery Suite',
      'Social Media Branding Kits, Banners & Vector Assets'
    ],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vector Systems'],
    process: [
      { step: '01', title: 'Brand Discovery', desc: 'Uncovering brand personality, core values, market positioning, and competitors.' },
      { step: '02', title: 'Conceptual Sketches', desc: 'Generating distinct creative logo directions and geometric mark variations.' },
      { step: '03', title: 'Vector Refinement', desc: 'Perfecting golden ratios, typography pairings, and versatile monochrome versions.' },
      { step: '04', title: 'Brand Guidelines Book', desc: 'Delivering final vector packages (SVG, EPS, PDF, PNG) and rulebook.' }
    ],
    benefits: [
      { title: 'Timeless Aesthetic', desc: 'Designs that remain fresh, adaptable, and memorable for decades.' },
      { title: 'Infinite Scalability', desc: 'Pure vector mathematics allowing crisp scaling from business cards to giant billboards.' },
      { title: 'Consistent Identity', desc: 'Clear guidelines ensuring every team member applies your brand uniformly.' }
    ],
    faqs: [
      { q: 'What files will I receive upon logo completion?', a: 'You will receive vector sources (.AI, .EPS, .SVG, .PDF) alongside high-res transparent PNGs and JPEGs.' }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'DIGITAL MARKETING',
    category: 'Marketing',
    icon: TrendingUp,
    image: '/services/digital-marketing.jpg',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    tag: 'Growth',
    tagline: 'Data-Driven Growth Strategies that Maximize ROI and Sales',
    desc: 'Data-driven marketing strategies to scale your brand and reach the right audience. Multi-channel paid acquisition, search engine dominance, and revenue acceleration.',
    features: [
      'Google Ads (Search, Display, Performance Max, YouTube)',
      'Meta Paid Advertising (Facebook & Instagram High-ROAS Ads)',
      'Conversion Rate Optimization (CRO) & A/B Funnel Testing',
      'Advanced Tracking Pixel Setup & Google Analytics 4 Audits'
    ],
    techStack: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'SEMrush', 'Tag Manager'],
    process: [
      { step: '01', title: 'Audience Research', desc: 'Identifying buyer personas, keyword intent volume, and competitor weaknesses.' },
      { step: '02', title: 'High-Converting Ad Creatives', desc: 'Copywriting and designing thumb-stopping ad visuals and video scripts.' },
      { step: '03', title: 'Campaign Deployment', desc: 'Setting up smart bidding, negative keywords, and retargeting custom audiences.' },
      { step: '04', title: 'Scaling & Optimization', desc: 'Continuous weekly adjustments to cut cost-per-lead and multiply ROAS.' }
    ],
    benefits: [
      { title: 'Transparent Reporting', desc: 'Live dashboards displaying real ad spend, cost per acquisition, and net return.' },
      { title: 'Laser-Targeted Audiences', desc: 'Zero ad waste by filtering exact geographical, intent-driven prospects.' },
      { title: 'Continuous Scaling', desc: 'Systematic ad budget expansion as profitability milestones are reached.' }
    ],
    faqs: [
      { q: 'How quickly can I see results from paid ads?', a: 'Google Search and Meta ads can start generating qualified leads within 48 to 72 hours of campaign launch.' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Graphic Design',
    shortTitle: 'UI/UX & GRAPHIC DESIGN',
    category: 'Design & Web',
    icon: Layers,
    image: '/services/graphic-design.jpg',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    tag: 'Popular',
    tagline: 'Human-Centered Interfaces Engineered for Intuitive Delight',
    desc: 'User-centric design that balances beautiful aesthetics with intuitive functionality. Comprehensive Figma design systems, wireframes, and production-ready assets.',
    features: [
      'End-to-End Figma Interactive Prototypes & User Testing',
      'Scalable Design Tokens, Component Libraries & Style Guides',
      'User Journey Mapping, Information Architecture & Heuristic Audits',
      'Marketing Graphics, Social Media Posts & Pitch Deck Design'
    ],
    techStack: ['Figma', 'Adobe Creative Cloud', 'Prototyping', 'Design Tokens'],
    process: [
      { step: '01', title: 'User Research', desc: 'Understanding user pain points and formulating optimal interface journeys.' },
      { step: '02', title: 'Low-Fidelity Wireframes', desc: 'Structuring layout grids and core functionality before graphic styling.' },
      { step: '03', title: 'High-Fidelity UI Design', desc: 'Polishing visual aesthetics with modern dark/light themes and typography.' },
      { step: '04', title: 'Design System Handoff', desc: 'Preparing developer-ready Figma assets with auto-layout and variant states.' }
    ],
    benefits: [
      { title: 'Reduced Dev Time', desc: 'Clear component states prevent developer confusion and speed up front-end coding.' },
      { title: 'Intuitive Usability', desc: 'Seamless user navigation reducing customer support queries and churn.' }
    ],
    faqs: [
      { q: 'Do you provide editable Figma files?', a: 'Yes, full ownership of organized Figma files with components and style guides is handed over.' }
    ]
  },
  {
    id: '3d-design',
    title: '3D Design & Elevation',
    shortTitle: '3D DESIGN & ELEVATION',
    category: 'Creative',
    icon: Box,
    image: '/services/3d-design.jpg',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-violet-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    tag: 'Visual',
    tagline: 'Visualizing Architecture and Products with 3D Realism & Precision',
    desc: 'Visualizing architecture and products with stunning 3D realism and precision. Photorealistic exterior & interior elevations, 3D product renders, and interactive WebGL assets.',
    features: [
      'Architectural Front Elevations (Exterior Facades & Modern Interiors)',
      'Photorealistic 3D Commercial Product Renders & Packshots',
      'Interactive Three.js & WebGL 3D Models for Modern Websites',
      'Cinematic 4K Architectural Walkthroughs & Material Texturing'
    ],
    techStack: ['Blender', '3ds Max', 'AutoCAD', 'Three.js', 'Spline 3D', 'V-Ray'],
    process: [
      { step: '01', title: 'Blueprints & CAD Ingestion', desc: 'Importing 2D floorplans, elevations, or product dimensional drawings.' },
      { step: '02', title: '3D Mesh Modeling', desc: 'Constructing geometry with accurate scale, bevels, and structural realism.' },
      { step: '03', title: 'Lighting & Shaders', desc: 'Applying PBR photorealistic materials, natural daylight, and environment HDRI.' },
      { step: '04', title: '4K Rendering & Post-Production', desc: 'Final render output with ambient occlusion, color grading, and compositing.' }
    ],
    benefits: [
      { title: 'Hyper-Realistic Detail', desc: 'True-to-life reflections, surface bumps, and lighting matching real environments.' },
      { title: 'Pre-Construction Approval', desc: 'Enables clients and builders to visualize exact facades before building begins.' }
    ],
    faqs: [
      { q: 'Can you work from 2D floor plans or rough sketches?', a: 'Yes! We can take standard AutoCAD 2D drawings or architectural hand sketches and turn them into 3D elevations.' }
    ]
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy',
    shortTitle: 'MARKETING STRATEGY',
    category: 'Marketing',
    icon: Target,
    image: '/services/strategy.jpg',
    color: 'from-rose-500 to-red-500',
    borderColor: 'border-rose-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]',
    tag: 'Strategic',
    tagline: 'Data-Driven Strategies to Navigate Complexities & Accelerate Growth',
    desc: 'Data-driven strategies to navigate market complexities and achieve growth. Comprehensive go-to-market roadmaps, competitor intelligence, and customer acquisition funnels.',
    features: [
      'End-to-End Go-To-Market (GTM) Launch Architecture',
      'In-Depth Competitor Benchmarking & Gap Analysis',
      'Customer Acquisition Cost (CAC) vs Lifetime Value (LTV) Modeling',
      'Brand Positioning, Value Proposition & Messaging Hierarchy'
    ],
    techStack: ['GTM Blueprints', 'Market Intelligence', 'Funnel Analytics', 'Growth Models'],
    process: [
      { step: '01', title: 'Market Diagnostics', desc: 'Deep evaluation of existing traction, channel efficacy, and market saturation.' },
      { step: '02', title: 'Strategic Positioning', desc: 'Crafting defensible moats and irresistible value propositions.' },
      { step: '03', title: 'Execution Roadmap', desc: 'Defining 90-day actionable growth sprints with clear KPI targets.' }
    ],
    benefits: [
      { title: 'De-Risked Growth', desc: 'Eliminate trial-and-error by deploying proven growth models.' },
      { title: 'High Capital Efficiency', desc: 'Direct marketing capital exclusively into validated high-yield channels.' }
    ],
    faqs: [
      { q: 'What does a marketing strategy package include?', a: 'A complete playbook: buyer persona profiles, channel attribution models, 90-day execution calendar, and budget allocations.' }
    ]
  },
  {
    id: 'pr-political',
    title: 'PR & Political Management',
    shortTitle: 'PR & POLITICAL MANAGEMENT',
    category: 'Marketing',
    icon: Users,
    image: '/services/pr-management.jpg',
    color: 'from-amber-500 to-yellow-400',
    borderColor: 'border-amber-400/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]',
    tag: 'Elite',
    tagline: 'Strategic Reputation Management & Data-Driven Digital PR for Leaders',
    desc: 'Strategic reputation management and data-driven digital PR for brands. Public perception shaping, high-impact media outreach, sentiment monitoring, and election campaign execution.',
    features: [
      'Strategic Media Outreach & National Press Release Distribution',
      'Real-Time Public Sentiment Monitoring & Brand Perception Defense',
      'Constituency Voter Analytics, Booth-Level Intelligence & War Rooms',
      'Digital Narrative Shaping, Influencer Alignment & Crisis Mitigation'
    ],
    techStack: ['Sentiment AI', 'Media Outlets', 'Constituency Mapping', 'Campaign Ops'],
    process: [
      { step: '01', title: 'Narrative Audit', desc: 'Analyzing existing press coverage, public sentiment, and reputational vulnerabilities.' },
      { step: '02', title: 'Media Strategy', desc: 'Crafting authoritative thought leadership pieces and organizing media releases.' },
      { step: '03', title: 'War Room Execution', desc: '24/7 monitoring of emerging trends and active engagement across digital channels.' }
    ],
    benefits: [
      { title: 'Positive Perception Moat', desc: 'Establishes enduring trust, credibility, and widespread public goodwill.' },
      { title: 'Crisis Immunity', desc: 'Rapid-response protocols that neutralize false rumors within minutes.' }
    ],
    faqs: [
      { q: 'How do you handle crisis PR emergencies?', a: 'We deploy rapid statement framing, search suppression strategies, and trusted journalist outreach within hours.' }
    ]
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    shortTitle: 'SOFTWARE DEVELOPMENT',
    category: 'Development',
    icon: Code2,
    image: '/services/software-dev.png',
    color: 'from-cyan-400 to-blue-600',
    borderColor: 'border-blue-500/30',
    shadowColor: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    tag: 'Core Specialty',
    tagline: 'Custom Scalable Software Solutions & Enterprise Microservices',
    desc: 'Custom, scalable software solutions and expert consulting to streamline business. Full-stack SaaS platforms, distributed backend systems, and rock-solid REST & GraphQL APIs.',
    features: [
      'Full-Stack Custom SaaS & Enterprise Web Applications',
      'Resilient Microservices Architecture & Distributed Message Queues',
      'High-Throughput RESTful & GraphQL Cloud API Engineering',
      'Database Modeling (MongoDB, PostgreSQL, Redis) with 99.99% Uptime'
    ],
    techStack: ['Node.js', 'Express', 'React', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
    process: [
      { step: '01', title: 'System Architecture Design', desc: 'Designing schema diagrams, data flow models, and cloud infrastructure.' },
      { step: '02', title: 'API & Core Logic Dev', desc: 'Writing performant, clean modular code with strict typing and unit test coverage.' },
      { step: '03', title: 'Integration & Stress Testing', desc: 'Simulating concurrent users and bench testing queries under load.' },
      { step: '04', title: 'Cloud Deploy & Monitoring', desc: 'Deploying with Docker containers, SSL, CI/CD pipelines, and health monitoring.' }
    ],
    benefits: [
      { title: 'Zero Vendor Lock-In', desc: 'Full source code ownership, Dockerized microservices, and standard open technologies.' },
      { title: 'Infinite Horizontal Scale', desc: 'Stateless servers designed to handle exponential traffic spikes with ease.' }
    ],
    faqs: [
      { q: 'Can you modernize our legacy software system?', a: 'Yes, we specialize in refactoring old monoliths into agile modern microservices with zero downtime.' }
    ]
  }
];

const categories = ['All Services', 'Development', 'Design & Web', 'Creative', 'Marketing'];

export default function Services({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = activeCategory === 'All Services'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  const handleOpenDetail = (service) => {
    setSelectedService(service);
  };

  const handleInquireFromDetail = (service) => {
    setSelectedService(null);
    if (onSelectService) {
      onSelectService(service);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-cyber-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Our Professional Capabilities</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive <span className="gradient-text">Services</span> & Solutions
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Delivering cutting-edge mobile apps, high-converting websites, distinctive branding, 3D architectural elevations, software engineering, and strategic marketing — tailored for exponential growth.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-105 font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (9 Services with real images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative rounded-3xl bg-black/40 border border-white/10 ${service.borderColor} ${service.shadowColor} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
              >
                {/* Image Header with Gradient Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/40 to-transparent" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-cyber-cyan">
                      {service.category}
                    </span>
                  </div>

                  {/* Tag on Image */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300">
                      {service.tag}
                    </span>
                  </div>

                  {/* Floating Icon Pill */}
                  <div className="absolute -bottom-4 left-6 z-10">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 p-0.5 shadow-xl">
                      <div className="h-full w-full bg-cyber-bg rounded-[14px] flex items-center justify-center text-amber-400 group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 pt-7 flex flex-col justify-between flex-grow space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>

                    {/* Features Bullet Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-gray-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack / Tools pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {service.techStack.slice(0, 4).map((t, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                      {service.techStack.length > 4 && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-500">
                          +{service.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenDetail(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 text-cyber-cyan" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => handleInquireFromDetail(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-white transition-colors cursor-pointer group/btn"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with Quick CTA */}
        <div className="mt-16 rounded-3xl p-8 md:p-12 bg-gradient-to-r from-amber-500/10 via-cyber-violet/10 to-cyber-cyan/10 border border-yellow-500/20 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-extrabold text-white">
              Ready to Accelerate Your Digital Growth?
            </h4>
            <p className="text-xs md:text-sm text-gray-400 max-w-xl">
              From web and mobile applications to 3D elevation, full branding identity, and software architectures — let's build your vision with excellence.
            </p>
          </div>

          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Get A Quote / Inquire
          </button>
        </div>

      </div>

      {/* Full Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-cyber-bg/95 shadow-2xl text-left overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Image Banner */}
              <div className="relative h-56 md:h-64 w-full shrink-0 overflow-hidden bg-gray-900">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/60 to-black/40" />

                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer z-20"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                      {selectedService.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      • {selectedService.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-400 font-mono tracking-wider mb-2">Overview</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedService.desc}
                  </p>
                </div>

                {/* Features & Deliverables */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-gray-400 font-mono tracking-wider">Key Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Execution Process Steps */}
                {selectedService.process && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-gray-400 font-mono tracking-wider">Execution Process</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.process.map((step, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                              {step.step}
                            </span>
                            <span className="text-xs font-bold text-white">{step.title}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-gray-400 font-mono tracking-wider">Technologies & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                {selectedService.faqs && selectedService.faqs.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase font-bold text-gray-400 font-mono tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-amber-400" /> Frequently Asked Questions
                    </h4>
                    <div className="space-y-2">
                      {selectedService.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <div className="text-xs font-bold text-white">Q: {faq.q}</div>
                          <div className="text-xs text-gray-400 leading-relaxed">A: {faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleInquireFromDetail(selectedService)}
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Inquire For {selectedService.title}
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
