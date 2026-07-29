import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Premium Vault', href: '#premium-system-vault', premium: true },
  { name: 'AI Assistant', href: '#chatbot', chatbot: true },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onToggleChat, activeTheme, onChangeTheme, isLightMode, onToggleLightMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background blur transition
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
      const sections = navItems.filter(item => !item.chatbot).map(item => item.href.slice(1));
      let currentSection = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top is above middle of the screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height offset
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

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item.chatbot) {
      onToggleChat();
    } else {
      scrollToSection(item.href);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-cyber-bg/75 border-b border-white/10 backdrop-blur-md py-4' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        {/* Scroll Progress Bar indicator */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan transition-all duration-100 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          
          {/* Circular logo NR + Name Text */}
          <a 
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-cyber-cyan/5 overflow-hidden transition-all duration-300 animate-logo-glow">
              <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover scale-110" />
            </div>
            <span className="text-xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-cyber-cyan group-hover:to-cyber-violet transition-all duration-300">
              NIHAR
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-400">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`relative py-1 transition-all hover:text-white cursor-pointer flex items-center gap-1 ${
                      item.premium
                        ? 'text-yellow-400 font-bold border border-yellow-500/20 bg-yellow-500/5 px-2.5 py-0.5 rounded shadow-[0_0_8px_rgba(234,179,8,0.15)] hover:shadow-[0_0_12px_rgba(234,179,8,0.3)] hover:scale-105'
                        : item.chatbot
                        ? 'text-cyber-cyan font-bold border border-cyber-cyan/20 bg-cyber-cyan/5 px-2.5 py-0.5 rounded shadow-[0_0_8px_rgba(6,182,212,0.15)] hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:scale-105 animate-pulse'
                        : activeSection === item.href.slice(1) 
                        ? 'text-cyber-cyan font-semibold' 
                        : ''
                    }`}
                  >
                    {item.name}
                    {!item.premium && !item.chatbot && activeSection === item.href.slice(1) && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Dark/Light Mode Toggler */}
            <button
              onClick={onToggleLightMode}
              className="flex items-center justify-center p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Light/Dark Theme"
            >
              {isLightMode ? <Moon className="h-4.5 w-4.5 text-amber-500" /> : <Sun className="h-4.5 w-4.5 text-amber-500" />}
            </button>

            {/* Custom Theme Switcher */}
            <button
              onClick={onChangeTheme}
              className="flex items-center justify-center p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle HUD Accent Palette"
            >
              <Cpu className={`h-4.5 w-4.5 ${activeTheme === 'magenta' ? 'text-cyber-violet' : 'text-cyber-cyan'}`} />
            </button>

            {/* Primary CTA - Scrolls to Contact */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="relative px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider overflow-hidden group transition-all duration-300 border border-cyber-cyan/30 text-white hover:border-cyber-cyan hover:shadow-glow-cyan cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              Hire Me
            </button>
          </nav>

          {/* Mobile Hamburguer */}
          <div className="flex items-center gap-3.5 md:hidden">
            <button
              onClick={onToggleLightMode}
              className="p-2 rounded-lg border border-white/5 bg-white/5 text-gray-400 transition-colors"
              title="Toggle Light/Dark Mode"
            >
              {isLightMode ? <Moon className="h-4.5 w-4.5 text-amber-500" /> : <Sun className="h-4.5 w-4.5 text-amber-500" />}
            </button>
            <button
              onClick={onChangeTheme}
              className="p-2 rounded-lg border border-white/5 bg-white/5 text-gray-400 transition-colors"
            >
              <Cpu className={`h-4.5 w-4.5 ${activeTheme === 'magenta' ? 'text-cyber-violet' : 'text-cyber-cyan'}`} />
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
            className="fixed inset-0 z-30 pt-20 px-6 pb-6 bg-cyber-bg/95 backdrop-blur-lg border-b border-white/10 md:hidden flex flex-col justify-between"
          >
            <ul className="flex flex-col gap-6 text-lg font-semibold mt-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`block py-2 rounded transition-all ${
                      item.premium
                        ? 'text-yellow-400 font-bold border border-yellow-500/20 bg-yellow-500/5 px-3 py-1.5 shadow-[0_0_8px_rgba(234,179,8,0.15)] text-center'
                        : item.chatbot
                        ? 'text-cyber-cyan font-bold border border-cyber-cyan/20 bg-cyber-cyan/5 px-3 py-1.5 shadow-[0_0_8px_rgba(6,182,212,0.15)] text-center animate-pulse'
                        : activeSection === item.href.slice(1) 
                        ? 'text-cyber-cyan text-glow-cyan font-semibold' 
                        : 'text-gray-400'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="h-[1px] bg-white/10" />
              <button
                onClick={() => { setMobileMenuOpen(false); scrollToSection('#contact'); }}
                className="w-full py-4 rounded-xl text-center bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-sm font-semibold uppercase tracking-wider text-white shadow-glow-violet hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
