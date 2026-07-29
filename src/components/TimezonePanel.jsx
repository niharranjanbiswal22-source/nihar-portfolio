import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock } from 'lucide-react';

// ── Official brand SVG logos ──────────────────────────
const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FED373" />
        <stop offset="25%" stopColor="#F15245" />
        <stop offset="50%" stopColor="#D92E7F" />
        <stop offset="75%" stopColor="#9B36B7" />
        <stop offset="100%" stopColor="#515ECF" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TelegramLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#26A5E4">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.632 5.906-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function TimezonePanel() {
  const [istTime, setIstTime] = useState('');
  const [istDate, setIstDate] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [utcDate, setUtcDate] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // IST Format
      const optionsTimeIST = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const optionsDateIST = { timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      setIstTime(now.toLocaleTimeString('en-US', optionsTimeIST));
      setIstDate(now.toLocaleDateString('en-US', optionsDateIST));

      // UTC Format
      const optionsTimeUTC = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const optionsDateUTC = { timeZone: 'UTC', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      setUtcTime(now.toLocaleTimeString('en-US', optionsTimeUTC));
      setUtcDate(now.toLocaleDateString('en-US', optionsDateUTC));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    { name: 'LinkedIn',  Logo: LinkedInLogo,  url: 'https://www.linkedin.com/in/nihar-biswal95566n',        hover: 'hover:border-[#0A66C2]/50 hover:shadow-[0_0_12px_rgba(10,102,194,0.35)]' },
    { name: 'GitHub',    Logo: GitHubLogo,    url: 'https://github.com/niharranjanbiswal22-source',          hover: 'hover:border-white/30 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]' },
    { name: 'Instagram', Logo: InstagramLogo, url: 'https://www.instagram.com/niharbiswal.gulu',              hover: 'hover:border-pink-500/50 hover:shadow-[0_0_12px_rgba(217,46,127,0.35)]' },
    { name: 'YouTube',   Logo: YouTubeLogo,   url: 'https://youtube.com/@niharranjanbiswal1386?si=3Ya5_JPGqb7PjzUn',                 hover: 'hover:border-red-500/50 hover:shadow-[0_0_12px_rgba(255,0,0,0.35)]' },
    { name: 'Telegram',  Logo: TelegramLogo,  url: 'https://t.me/Nihar2',                              hover: 'hover:border-sky-400/50 hover:shadow-[0_0_12px_rgba(38,165,228,0.35)]' },
    { name: 'X (Twitter)', Logo: XLogo,       url: 'https://x.com/nihar_biswall',                       hover: 'hover:border-white/30 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]' }
  ];

  return (
    <section className="py-12 px-4 md:px-8 border-t border-white/5 bg-black/10 relative overflow-hidden">
      
      {/* Decorative time-wave grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Running Clock HUDs */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div>
            <div className="text-[10px] text-cyber-cyan font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Real-Time Sync Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide uppercase">Bix My World</h3>
            <p className="text-sm text-gray-400 mt-2 font-mono">
              "I am very flexible with timezone adjustments and always available for international team syncs."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Clock 1: IST */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/5 flex flex-col gap-1 relative overflow-hidden shadow-lg">
              <div className="absolute top-3 right-3 text-[9px] font-bold text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 rounded uppercase">IST (India)</div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bhubaneswar</span>
              <span className="text-3xl font-black text-white font-mono tracking-tight text-glow-cyan">{istTime}</span>
              <span className="text-[10px] text-gray-400 font-medium font-mono">{istDate}</span>
            </div>

            {/* Clock 2: UTC */}
            <div className="glass-panel p-5 rounded-2xl border border-cyber-violet/20 bg-cyber-violet/5 flex flex-col gap-1 relative overflow-hidden shadow-lg">
              <div className="absolute top-3 right-3 text-[9px] font-bold text-cyber-violet bg-cyber-violet/10 border border-cyber-violet/20 px-2 py-0.5 rounded uppercase">UTC</div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Universal Time</span>
              <span className="text-3xl font-black text-white font-mono tracking-tight text-glow-violet">{utcTime}</span>
              <span className="text-[10px] text-gray-400 font-medium font-mono">{utcDate}</span>
            </div>

          </div>
        </div>

        {/* Middle Column: Rotating Wireframe Globe Animation */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="relative h-44 w-44 flex items-center justify-center">
            {/* Pulsing Scanner Rings */}
            <div className="absolute inset-0 rounded-full border border-cyber-cyan/10 animate-ping" />
            <div className="absolute h-36 w-36 rounded-full border-2 border-dashed border-cyber-violet/30 animate-globe-rotate" />
            
            {/* Custom SVG Rotating Wireframe Globe */}
            <svg 
              className="h-28 w-28 text-cyber-cyan/40 animate-globe-rotate" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.75"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              {/* Longitudes */}
              <ellipse cx="50" cy="50" rx="30" ry="45" />
              <ellipse cx="50" cy="50" rx="15" ry="45" />
              <line x1="50" y1="5" x2="50" y2="95" />
              {/* Latitudes */}
              <ellipse cx="50" cy="50" rx="45" ry="15" />
              <ellipse cx="50" cy="50" rx="45" ry="30" />
              <line x1="5" y1="50" x2="95" y2="50" />
            </svg>
            <Globe className="absolute h-8 w-8 text-cyber-cyan animate-pulse shadow-glow-cyan" />
          </div>
        </div>

        {/* Right Column: Social Media Links Finder */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide uppercase">Find Me</h4>
            <p className="text-xs text-gray-400">Feel free to connect or drop a message on any of these channels.</p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {socials.map((soc) => (
              <motion.a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                className={`glass-panel p-3.5 rounded-2xl border border-white/5 bg-white/[0.04] flex flex-col items-center justify-center text-center gap-2 transition-all duration-300 cursor-pointer ${soc.hover}`}
              >
                <soc.Logo />
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{soc.name.split(' ')[0]}</span>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
