import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import GameArena from './components/GameArena';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaymentGateway from './components/PaymentGateway';
import DigitalStore from './components/DigitalStore';
import AIAssistant from './components/AIAssistant';
import TimezonePanel from './components/TimezonePanel';
import Education from './components/Education';
import Certifications from './components/Certifications';
import TravelGallery from './components/TravelGallery';
import GodAnimation from './components/GodAnimation';
import AudioController from './components/AudioController';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme, setTheme] = useState('cyan'); // 'cyan' | 'magenta'
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    try {
      const saved = localStorage.getItem('mode');
      if (saved === 'dark') return false;
      return true; // Default to white/light theme first
    } catch {
      return true;
    }
  });

  // Apply theme attribute to html tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply light/dark mode
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('mode', 'light'); } catch {}
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('mode', 'dark'); } catch {}
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'cyan' ? 'magenta' : 'cyan'));
  };

  const toggleLightMode = () => {
    setIsLightMode(prev => !prev);
  };

  const handleUnlockPremium = () => {
    setIsPremiumUnlocked(true);
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading Boot Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Page */}
      {!isLoading && (
        <div className="relative min-h-screen text-gray-100 flex flex-col justify-between selection:bg-cyber-cyan/30 selection:text-white">
          
          {/* Canvas Background particles */}
          <BackgroundGrid />

          {/* Floating Navbar */}
          <Navbar 
            activeTheme={theme} 
            onChangeTheme={toggleTheme} 
            isLightMode={isLightMode}
            onToggleLightMode={toggleLightMode}
            onToggleChat={() => setIsChatOpen(prev => !prev)}
            onOpenPayment={() => { setSelectedProduct(null); setIsCheckoutOpen(true); }}
            onBuyProduct={(product) => { setSelectedProduct(product); setIsCheckoutOpen(true); }}
          />

          {/* Main Sections */}
          <main className="flex-grow">
            <Hero onHireMeClick={handleScrollToContact} />
            <TimezonePanel />
            <About />
            <Services onSelectService={handleScrollToContact} />
            <Skills />
            <GameArena />
            <Experience />
            <Education />
            <Certifications />
            
            {/* Projects with premium lock features */}
            <Projects 
              isPremiumUnlocked={isPremiumUnlocked} 
              onOpenUnlock={() => { setSelectedProduct(null); setIsCheckoutOpen(true); }} 
            />

            {/* Digital Store & Products Vault (Notes, Source Codes, Deployments) */}
            <DigitalStore 
              onBuyProduct={(product) => { setSelectedProduct(product); setIsCheckoutOpen(true); }} 
            />
            
            <TravelGallery />
            <Strengths />
            <Contact />
            <GodAnimation />
          </main>

          {/* Audio controller floating panel */}
          <AudioController />

          {/* Footer page elements */}
          <Footer />

          {/* Secure Payment gateway checkout */}
          <PaymentGateway 
            isOpen={isCheckoutOpen} 
            onClose={() => { setIsCheckoutOpen(false); setSelectedProduct(null); }} 
            onUnlockSuccess={handleUnlockPremium}
            productToBuy={selectedProduct}
          />

          {/* Floating AI Agent Assistant */}
          <AIAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

        </div>
      )}
    </>
  );
}
