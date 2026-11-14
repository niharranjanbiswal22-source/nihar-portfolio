import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Cpu, Sun, Moon, ChevronDown, Smartphone, Globe, 
  Palette, TrendingUp, Layers, Box, Target, Users, Code2, ArrowRight,
  FolderGit2, Briefcase, ShoppingBag, Zap, BookOpen, FileText, Brain, 
  Cloud, Play, ShieldCheck, Download
} from 'lucide-react';
import { productCategories } from '../data/productsData';

const serviceColumns = [
  // Left Column (5 items)
  [
    { name: 'MOBILE APP DEVELOPMENT', id: 'mobile-app', icon: Smartphone },
    { name: 'LOGO & BRAND IDENTITY', id: 'brand-identity', icon: Palette },
    { name: 'UI/UX & GRAPHIC DESIGN', id: 'ui-ux-design', icon: Layers },
    { name: 'MARKETING STRATEGY', id: 'marketing-strategy', icon: Target },
    { name: 'SOFTWARE DEVELOPMENT', id: 'software-dev', icon: Code2 },
  ],
  // Right Column (4 items)
  [
    { name: 'WEBSITE DESIGN', id: 'website-design', icon: Globe },
    { name: 'DIGITAL MARKETING', id: 'digital-marketing', icon: TrendingUp },
    { name: '3D DESIGN & ELEVATION', id: '3d-design', icon: Box },
    { name: 'PR & POLITICAL MANAGEMENT', id: 'pr-political', icon: Users },
  ]
];

const allServices = [...serviceColumns[0], ...serviceColumns[1]];

const navItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Services', href: '#services', id: 'services', isServicesDropdown: true },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience', isExperienceDropdown: true },
  { name: 'Premium Payment', href: '#digital-store', id: 'digital-store', isStoreDropdown: true },
  { name: 'AI Assistant', href: '#chatbot', id: 'chatbot', chatbot: true },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar({ 
  onToggleChat, 
  activeTheme, 
  onChangeTheme, 
  isLightMode, 
  onToggleLightMode, 
  onOpenPayment,
  onBuyProduct 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExperienceOpen, setMobileExperienceOpen] = useState(false);
  const [mobileStoreOpen, setMobileStoreOpen] = useState(false);
  
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const servicesDropdownRef = useRef(null);
  const servicesTimeoutRef = useRef(null);
  const experienceDropdownRef = useRef(null);
  const experienceTimeoutRef = useRef(null);
  const storeDropdownRef = useRef(null);
  const storeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Progress Bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Active Section Highlight
      const sections = ['home', 'about', 'services', 'skills', 'experience', 'projects', 'digital-store', 'contact'];
      let currentSection = 'home';
      if (window.scrollY < 100) {
        currentSection = 'home';
      } else {
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 220 && rect.bottom >= 100) {
              currentSection = section;
              break;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
      if (experienceDropdownRef.current && !experienceDropdownRef.current.contains(e.target)) {
        setExperienceDropdownOpen(false);
      }
      if (storeDropdownRef.current && !storeDropdownRef.current.contains(e.target)) {
        setStoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Services mouse handlers
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  // Experience mouse handlers
  const handleExperienceMouseEnter = () => {
    if (experienceTimeoutRef.current) clearTimeout(experienceTimeoutRef.current);
    setExperienceDropdownOpen(true);
  };
  const handleExperienceMouseLeave = () => {
    experienceTimeoutRef.current = setTimeout(() => {
      setExperienceDropdownOpen(false);
    }, 200);
  };

  // Store / Premium Payment mouse handlers
  const handleStoreMouseEnter = () => {
    if (storeTimeoutRef.current) clearTimeout(storeTimeoutRef.current);
    setStoreDropdownOpen(true);
  };
  const handleStoreMouseLeave = () => {
    storeTimeoutRef.current = setTimeout(() => {
      setStoreDropdownOpen(false);
    }, 200);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToService = (serviceId) => {
    const target = document.getElementById(`service-${serviceId}`) || document.getElementById('services');
    if (target) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      target.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => {
        target.classList.remove('ring-2', 'ring-amber-400');
      }, 2000);
    }
  };

  const handleBuyClick = (product) => {
    setStoreDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onBuyProduct) {
      onBuyProduct(product);
    } else if (onOpenPayment) {
      onOpenPayment();
    }
  };

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(item.id || item.href.slice(1));
    if (item.chatbot) {
      onToggleChat();
    } else if (item.premium) {
      scrollToSection(item.href);
      if (onOpenPayment) onOpenPayment();
    } else {
      scrollToSection(item.href);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-cyber-bg/90 border-b border-white/10 backdrop-blur-md shadow-lg ${
          scrolled ? 'py-3' : 'py-3.5'
        }`}
      >
        {/* Scroll Progress Bar indicator */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-cyber-cyan to-cyber-violet transition-all duration-100 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto max-w-7xl px-4 md:px-10 flex items-center justify-between">
          
          {/* Logo NR + Name Text */}
          <a 
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-3 group cursor-pointer shrink-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-cyber-cyan/5 overflow-hidden transition-all duration-300 animate-logo-glow">
              <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover scale-110" />
            </div>
            <span className="text-xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-amber-400 group-hover:to-cyber-cyan transition-all duration-300">
              NIHAR
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-5">
            <ul className="flex items-center gap-1 md:gap-2 text-[13px] font-medium text-gray-300">
              {navItems.map((item) => {
                
                // 1. Services Dropdown (Amber pill + 2 Columns)
                if (item.isServicesDropdown) {
                  return (
                    <li 
                      key="services-dropdown" 
                      ref={servicesDropdownRef}
                      className="relative"
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(prev => !prev);
                          setActiveSection('services');
                          scrollToSection('#services');
                        }}
                        className={`text-[13px] flex items-center gap-1 cursor-pointer transition-all duration-200 ${
                          servicesDropdownOpen || activeSection === 'services'
                            ? 'bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                            : 'text-gray-300 hover:text-white font-medium px-2.5 py-1 rounded-full hover:bg-white/5'
                        }`}
                      >
                        <span>Services</span>
                        <ChevronDown 
                          className={`h-3 w-3 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {/* Dropdown Menu (2 Columns) */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-3xl bg-slate-950/95 border border-white/15 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-2xl z-50 text-left"
                          >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-cyber-cyan to-cyber-violet rounded-t-3xl" />
                            
                            <div className="grid grid-cols-2 gap-3">
                              {/* Left Column (5 services) */}
                              <div className="space-y-1">
                                {serviceColumns[0].map((srv) => {
                                  const Icon = srv.icon;
                                  return (
                                    <a
                                      key={srv.id}
                                      href={`#service-${srv.id}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setServicesDropdownOpen(false);
                                        scrollToService(srv.id);
                                      }}
                                      className="group flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/25 transition-all duration-200 cursor-pointer"
                                    >
                                      <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all shrink-0">
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <span className="text-[11px] font-black tracking-wide text-gray-200 group-hover:text-amber-300 uppercase transition-colors">
                                        {srv.name}
                                      </span>
                                    </a>
                                  );
                                })}
                              </div>

                              {/* Right Column (4 services) */}
                              <div className="space-y-1">
                                {serviceColumns[1].map((srv) => {
                                  const Icon = srv.icon;
                                  return (
                                    <a
                                      key={srv.id}
                                      href={`#service-${srv.id}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setServicesDropdownOpen(false);
                                        scrollToService(srv.id);
                                      }}
                                      className="group flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-500/10 border border-transparent hover:border-amber-500/25 transition-all duration-200 cursor-pointer"
                                    >
                                      <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all shrink-0">
                                        <Icon className="h-3.5 w-3.5" />
                                      </div>
                                      <span className="text-[11px] font-black tracking-wide text-gray-200 group-hover:text-amber-300 uppercase transition-colors">
                                        {srv.name}
                                      </span>
                                    </a>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Dropdown Footer */}
                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                              <span className="text-gray-400 font-mono">9 Core Service Areas</span>
                              <button
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  scrollToSection('#services');
                                }}
                                className="text-amber-400 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>View All Detailed Services</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // 2. Experience Dropdown (Projects & Experience Sections)
                if (item.isExperienceDropdown) {
                  return (
                    <li 
                      key="experience-dropdown" 
                      ref={experienceDropdownRef}
                      className="relative"
                      onMouseEnter={handleExperienceMouseEnter}
                      onMouseLeave={handleExperienceMouseLeave}
                    >
                      <button
                        onClick={() => {
                          setExperienceDropdownOpen(prev => !prev);
                          setActiveSection('experience');
                          scrollToSection('#experience');
                        }}
                        className={`text-[13px] flex items-center gap-1 cursor-pointer transition-all duration-200 ${
                          experienceDropdownOpen || activeSection === 'experience' || activeSection === 'projects'
                            ? 'bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                            : 'text-gray-300 hover:text-white font-medium px-2.5 py-1 rounded-full hover:bg-white/5'
                        }`}
                      >
                        <span>Experience</span>
                        <ChevronDown 
                          className={`h-3 w-3 transition-transform duration-200 ${experienceDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {/* Experience Dropdown Card (2 Options: Projects & Experience) */}
                      <AnimatePresence>
                        {experienceDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-slate-950/95 border border-white/15 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.2)] backdrop-blur-2xl z-50 text-left space-y-2"
                          >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-blue rounded-t-2xl" />

                            {/* Option 1: Projects */}
                            <a
                              href="#projects"
                              onClick={(e) => {
                                e.preventDefault();
                                setExperienceDropdownOpen(false);
                                scrollToSection('#projects');
                              }}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-cyber-cyan/10 border border-transparent hover:border-cyber-cyan/30 transition-all duration-200 cursor-pointer"
                            >
                              <div className="h-9 w-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan group-hover:scale-110 group-hover:bg-cyber-cyan group-hover:text-black transition-all shrink-0 mt-0.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                <FolderGit2 className="h-4.5 w-4.5" />
                              </div>
                              <div className="flex-grow space-y-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black tracking-wide text-white group-hover:text-cyber-cyan uppercase transition-colors">
                                    Projects
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan font-bold">
                                    Live Apps
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-400 group-hover:text-gray-300 leading-snug">
                                  AI Predictor, SaaS CRM, Python & Web Systems
                                </p>
                              </div>
                            </a>

                            {/* Option 2: Work Experience */}
                            <a
                              href="#experience"
                              onClick={(e) => {
                                e.preventDefault();
                                setExperienceDropdownOpen(false);
                                scrollToSection('#experience');
                              }}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-cyber-violet/10 border border-transparent hover:border-cyber-violet/30 transition-all duration-200 cursor-pointer"
                            >
                              <div className="h-9 w-9 rounded-xl bg-cyber-violet/10 border border-cyber-violet/20 flex items-center justify-center text-cyber-violet group-hover:scale-110 group-hover:bg-cyber-violet group-hover:text-white transition-all shrink-0 mt-0.5 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                                <Briefcase className="h-4.5 w-4.5" />
                              </div>
                              <div className="flex-grow space-y-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black tracking-wide text-white group-hover:text-cyber-violet uppercase transition-colors">
                                    Work Experience
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyber-violet/20 text-cyber-violet font-bold">
                                    Career
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-400 group-hover:text-gray-300 leading-snug">
                                  Software Developer Intern @ NIELIT & Career Timeline
                                </p>
                              </div>
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // 3. Premium Payment Dropdown (Notes ₹1, Source Codes ₹10-₹499, Deployments ₹2k-₹10k)
                if (item.isStoreDropdown) {
                  return (
                    <li 
                      key="store-dropdown" 
                      ref={storeDropdownRef}
                      className="relative"
                      onMouseEnter={handleStoreMouseEnter}
                      onMouseLeave={handleStoreMouseLeave}
                    >
                      <button
                        onClick={() => {
                          setStoreDropdownOpen(prev => !prev);
                          setActiveSection('digital-store');
                          scrollToSection('#digital-store');
                        }}
                        className={`text-[13px] flex items-center gap-1 cursor-pointer transition-all duration-200 ${
                          storeDropdownOpen || activeSection === 'digital-store'
                            ? 'bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                            : 'text-gray-300 hover:text-white font-medium px-2.5 py-1 rounded-full hover:bg-white/5'
                        }`}
                      >
                        <Zap className={`h-3 w-3 ${storeDropdownOpen || activeSection === 'digital-store' ? 'text-slate-950' : 'text-amber-400'}`} />
                        <span>Premium Payment</span>
                        <ChevronDown 
                          className={`h-3 w-3 transition-transform duration-200 ${storeDropdownOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {/* Dropdown Menu (3 Lines/Categories: Notes, Codes, Deployments) */}
                      <AnimatePresence>
                        {storeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-[720px] max-h-[82vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-white/15 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(234,179,8,0.25)] backdrop-blur-2xl z-50 text-left space-y-4 scrollbar-none"
                          >
                            <div className="sticky -top-5 -mt-5 -mx-5 px-5 py-2.5 bg-slate-950/90 border-b border-white/10 backdrop-blur-md flex items-center justify-between z-10">
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4 text-amber-400" />
                                <span className="text-xs font-black uppercase tracking-wider text-white">
                                  Digital Assets & Store
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                Instant Razorpay Access
                              </span>
                            </div>

                            {/* LINE 1: NOTES (3 ITEMS, ₹1 EACH) */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wide text-amber-400 flex items-center gap-1.5">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  Line 1: Handwritten & Study Notes
                                </span>
                                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                                  ₹1 Each Only
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2.5">
                                {productCategories[0].items.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-2 group"
                                  >
                                    <div>
                                      <div className="flex justify-between items-start">
                                        <div className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1">
                                          <prod.icon className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-xs font-mono font-black text-amber-400">
                                          ₹{prod.price}
                                        </span>
                                      </div>
                                      <div className="text-[11px] font-bold text-white group-hover:text-amber-300 line-clamp-1">
                                        {prod.shortName}
                                      </div>
                                      <p className="text-[9px] text-gray-400 line-clamp-2 mt-0.5">
                                        {prod.description}
                                      </p>
                                    </div>

                                    <button
                                      onClick={() => handleBuyClick(prod)}
                                      className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                                    >
                                      <Zap className="h-3 w-3" />
                                      Buy Now (₹{prod.price})
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* LINE 2: SOURCE CODES (WEBSITE ₹10-₹50 & APPS ₹50-₹500) */}
                            <div className="space-y-2 pt-2 border-t border-white/10">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wide text-cyber-cyan flex items-center gap-1.5">
                                  <Code2 className="h-3.5 w-3.5" />
                                  Line 2: Production Source Codes (Websites & Apps)
                                </span>
                                <span className="text-[10px] font-mono text-cyber-cyan font-bold bg-cyber-cyan/10 px-2 py-0.5 rounded">
                                  ₹10 to ₹499
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2.5">
                                {productCategories[1].items.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyber-cyan/50 transition-all flex flex-col justify-between space-y-2 group"
                                  >
                                    <div>
                                      <div className="flex justify-between items-start">
                                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                                          {prod.type}
                                        </span>
                                        <span className="text-xs font-mono font-black text-cyber-cyan">
                                          ₹{prod.price}
                                        </span>
                                      </div>
                                      <div className="text-[11px] font-bold text-white group-hover:text-cyber-cyan line-clamp-1 mt-1">
                                        {prod.shortName}
                                      </div>
                                      <p className="text-[9px] text-gray-400 line-clamp-2 mt-0.5">
                                        {prod.description}
                                      </p>
                                    </div>

                                    <button
                                      onClick={() => handleBuyClick(prod)}
                                      className="w-full py-1.5 rounded-lg bg-cyber-cyan/20 hover:bg-cyber-cyan text-cyber-cyan hover:text-black border border-cyber-cyan/40 text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                                    >
                                      <Zap className="h-3 w-3" />
                                      Buy Code (₹{prod.price})
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* LINE 3: DEPLOYMENT SERVICES (WEBSITE ₹2,000 | PLAY STORE ₹5,000 | APP STORE ₹10,000) */}
                            <div className="space-y-2 pt-2 border-t border-white/10">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wide text-cyber-violet flex items-center gap-1.5">
                                  <Cloud className="h-3.5 w-3.5" />
                                  Line 3: Cloud & App Store Live Deployment Services
                                </span>
                                <span className="text-[10px] font-mono text-cyber-violet font-bold bg-cyber-violet/10 px-2 py-0.5 rounded">
                                  Live Guaranteed
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2.5">
                                {productCategories[2].items.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyber-violet/50 transition-all flex flex-col justify-between space-y-2 group"
                                  >
                                    <div>
                                      <div className="flex justify-between items-start">
                                        <div className="h-7 w-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1">
                                          <prod.icon className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-xs font-mono font-black text-cyber-violet">
                                          ₹{prod.price.toLocaleString('en-IN')}
                                        </span>
                                      </div>
                                      <div className="text-[11px] font-bold text-white group-hover:text-cyber-violet line-clamp-1">
                                        {prod.shortName}
                                      </div>
                                      <p className="text-[9px] text-gray-400 line-clamp-2 mt-0.5">
                                        {prod.description}
                                      </p>
                                    </div>

                                    <button
                                      onClick={() => handleBuyClick(prod)}
                                      className="w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                                    >
                                      <Zap className="h-3 w-3" />
                                      Order (₹{prod.price.toLocaleString('en-IN')})
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Dropdown Bottom Banner */}
                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                              <button
                                onClick={() => {
                                  setStoreDropdownOpen(false);
                                  if (onOpenPayment) onOpenPayment();
                                }}
                                className="text-gray-400 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>Custom Amount / Tip Pay</span>
                              </button>

                              <button
                                onClick={() => {
                                  setStoreDropdownOpen(false);
                                  scrollToSection('#digital-store');
                                }}
                                className="text-amber-400 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>Browse Full Store Section</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // Normal items
                const isActive = !item.chatbot && activeSection === (item.id || item.href.slice(1));
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`text-[13px] flex items-center gap-1 cursor-pointer transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'text-gray-300 hover:text-white font-medium px-2.5 py-1 rounded-full hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Dark/Light Mode Toggler */}
            <button
              onClick={onToggleLightMode}
              className="flex items-center justify-center p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              {isLightMode ? <Moon className="h-4 w-4 text-amber-500" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </button>

            {/* Primary CTA - Scrolls to Contact */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider overflow-hidden group transition-all duration-300 border border-cyber-cyan/30 text-white hover:border-cyber-cyan hover:shadow-glow-cyan cursor-pointer shrink-0"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              Hire Me
            </button>
          </nav>

          {/* Mobile Hamburguer */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={onToggleLightMode}
              className="p-2 rounded-lg border border-white/5 bg-white/5 text-gray-400"
              title="Toggle Light/Dark Mode"
            >
              {isLightMode ? <Moon className="h-4 w-4 text-amber-500" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-20 px-6 pb-6 bg-cyber-bg/95 backdrop-blur-lg border-b border-white/10 md:hidden flex flex-col justify-between overflow-y-auto"
          >
            <ul className="flex flex-col gap-3 text-base font-semibold mt-2">
              {navItems.map((item) => {
                
                // Mobile Services Dropdown
                if (item.isServicesDropdown) {
                  return (
                    <li key="mobile-services" className="space-y-1.5">
                      <button
                        onClick={() => setMobileServicesOpen(prev => !prev)}
                        className="w-full flex items-center justify-between py-2 text-amber-400 font-extrabold uppercase tracking-wide border-b border-white/10"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                          SERVICES ({allServices.length})
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-2 space-y-1 overflow-hidden"
                          >
                            {allServices.map((srv) => (
                              <button
                                key={srv.id}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  scrollToService(srv.id);
                                }}
                                className="w-full text-left py-1.5 px-3 rounded-lg text-xs font-bold text-gray-300 hover:text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-2"
                              >
                                <srv.icon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                <span>{srv.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // Mobile Experience Dropdown
                if (item.isExperienceDropdown) {
                  return (
                    <li key="mobile-experience" className="space-y-1.5">
                      <button
                        onClick={() => setMobileExperienceOpen(prev => !prev)}
                        className="w-full flex items-center justify-between py-2 text-cyber-cyan font-extrabold uppercase tracking-wide border-b border-white/10"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />
                          EXPERIENCE (2)
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileExperienceOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {mobileExperienceOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-2 space-y-1 overflow-hidden pt-1"
                          >
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                scrollToSection('#projects');
                              }}
                              className="w-full text-left py-1.5 px-3 rounded-lg text-xs font-bold text-gray-300 hover:text-cyber-cyan hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                              <FolderGit2 className="h-4 w-4 text-cyber-cyan shrink-0" />
                              <span>Projects (Live Apps)</span>
                            </button>

                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                scrollToSection('#experience');
                              }}
                              className="w-full text-left py-1.5 px-3 rounded-lg text-xs font-bold text-gray-300 hover:text-cyber-violet hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                              <Briefcase className="h-4 w-4 text-cyber-violet shrink-0" />
                              <span>Work Experience (NIELIT)</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // Mobile Premium Store Dropdown
                if (item.isStoreDropdown) {
                  return (
                    <li key="mobile-store" className="space-y-1.5">
                      <button
                        onClick={() => setMobileStoreOpen(prev => !prev)}
                        className="w-full flex items-center justify-between py-2 text-yellow-400 font-extrabold uppercase tracking-wide border-b border-white/10"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                          PREMIUM PAYMENT & STORE
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileStoreOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {mobileStoreOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-2 space-y-2 overflow-hidden pt-1"
                          >
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                scrollToSection('#digital-store');
                              }}
                              className="w-full py-2 px-3 rounded-lg bg-yellow-500/20 text-yellow-300 text-xs font-black text-center uppercase"
                            >
                              Browse All Digital Products
                            </button>

                            {/* Line 1: Notes */}
                            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Line 1: Notes (₹1 Each)</div>
                            {productCategories[0].items.map((prod) => (
                              <button
                                key={prod.id}
                                onClick={() => handleBuyClick(prod)}
                                className="w-full text-left py-1 px-2.5 rounded bg-white/5 text-[11px] font-bold text-gray-200 hover:text-amber-400 flex items-center justify-between"
                              >
                                <span className="truncate">{prod.shortName}</span>
                                <span className="font-mono text-amber-400 ml-2">₹{prod.price}</span>
                              </button>
                            ))}

                            {/* Line 2: Codes */}
                            <div className="text-[10px] font-mono text-cyber-cyan font-bold uppercase pt-1">Line 2: Source Codes (₹10-₹499)</div>
                            {productCategories[1].items.map((prod) => (
                              <button
                                key={prod.id}
                                onClick={() => handleBuyClick(prod)}
                                className="w-full text-left py-1 px-2.5 rounded bg-white/5 text-[11px] font-bold text-gray-200 hover:text-cyber-cyan flex items-center justify-between"
                              >
                                <span className="truncate">{prod.shortName}</span>
                                <span className="font-mono text-cyber-cyan ml-2">₹{prod.price}</span>
                              </button>
                            ))}

                            {/* Line 3: Deployments */}
                            <div className="text-[10px] font-mono text-cyber-violet font-bold uppercase pt-1">Line 3: Deployments (₹2k-₹10k)</div>
                            {productCategories[2].items.map((prod) => (
                              <button
                                key={prod.id}
                                onClick={() => handleBuyClick(prod)}
                                className="w-full text-left py-1 px-2.5 rounded bg-white/5 text-[11px] font-bold text-gray-200 hover:text-cyber-violet flex items-center justify-between"
                              >
                                <span className="truncate">{prod.shortName}</span>
                                <span className="font-mono text-cyber-violet ml-2">₹{prod.price.toLocaleString('en-IN')}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                // Normal items
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`block py-1.5 rounded transition-all ${
                        item.chatbot
                          ? 'text-cyber-cyan font-bold border border-cyber-cyan/20 bg-cyber-cyan/5 px-3 py-1 shadow-[0_0_8px_rgba(6,182,212,0.15)] text-center'
                          : activeSection === item.href.slice(1) 
                          ? 'text-cyber-cyan text-glow-cyan font-semibold' 
                          : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-4 pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => { setMobileMenuOpen(false); scrollToSection('#contact'); }}
                className="w-full py-3.5 rounded-xl text-center bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Get In Touch / Hire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
