import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import BackgroundGrid from './components/BackgroundGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaymentGateway from './components/PaymentGateway';
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
  const [theme, setTheme] = useState('cyan'); // 'cyan' | 'magenta'
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    try {
      return localStorage.getItem('mode') === 'light';
    } catch {
      return false;
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
      try { localStorage.setItem('mode', 'light'); } catch {}
    } else {
      document.documentElement.classList.remove('light');
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
          />

          {/* Main Sections */}
          <main className="flex-grow">
            <Hero onHireMeClick={handleScrollToContact} />
            <TimezonePanel />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Certifications />
            
            {/* Projects with premium lock features */}
            <Projects 
              isPremiumUnlocked={isPremiumUnlocked} 
              onOpenUnlock={() => setIsCheckoutOpen(true)} 
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
            onClose={() => setIsCheckoutOpen(false)} 
            onUnlockSuccess={handleUnlockPremium}
          />

          {/* Floating AI Agent Assistant */}
          <AIAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

        </div>
      )}
    </>
  );
}
