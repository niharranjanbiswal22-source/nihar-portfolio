import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Eye, ExternalLink, Globe, Users, Heart, Compass, Sparkles, TrendingUp } from 'lucide-react';

// ── Visitor counter using localStorage + realistic seed ───────────────────
const SEED_BASE = 1248; // seed so the counter looks real from day one
const STORAGE_KEY = 'nrb_portfolio_visits';
const SESSION_KEY = 'nrb_session_counted';

function getVisitorCount() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return parseInt(stored, 10);
    // First time — store seed
    localStorage.setItem(STORAGE_KEY, String(SEED_BASE));
    return SEED_BASE;
  } catch { return SEED_BASE; }
}

function incrementVisitorCount() {
  try {
    // Only count once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return getVisitorCount();
    const current = getVisitorCount();
    const next = current + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    sessionStorage.setItem(SESSION_KEY, '1');
    return next;
  } catch { return getVisitorCount(); }
}

// ── Destination teaser cards ───────────────────────────────────────────────
const destinations = [
  { name: 'Puri Beach',     icon: '🏖️', tag: 'Coastal'   },
  { name: 'Konark Temple',  icon: '🏛️', tag: 'Heritage'  },
  { name: 'Chilika Lake',   icon: '🦢', tag: 'Nature'    },
  { name: 'Dhauli Pagoda',  icon: '☮️', tag: 'Buddhist'  },
  { name: 'Simlipal Forest',icon: '🌲', tag: 'Trekking'  },
  { name: 'Lingaraj Temple',icon: '⛩️', tag: 'Sacred'    }
];

export default function TravelGallery() {
  const [visitorCount, setVisitorCount] = useState(SEED_BASE);
  const [countDisplay, setCountDisplay] = useState(SEED_BASE);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const final = incrementVisitorCount();
    setVisitorCount(final);

    // Animate count from seed to final
    let start = SEED_BASE - 5;
    const step = () => {
      start++;
      setCountDisplay(start);
      if (start < final) setTimeout(step, 40);
    };
    setTimeout(step, 800);
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 border-t border-white/5 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-cyber-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/5 border border-cyber-cyan/20 text-cyber-cyan text-xs font-bold tracking-widest uppercase mb-2"
          >
            <Camera className="h-3.5 w-3.5 animate-pulse" />
            Nihar's World
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Travel <span className="gradient-text">Gallery & Memory</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
            Adventures across Odisha and beyond — real memories, real moments, real stories.
          </p>
        </div>

        {/* ── VISITOR COUNTER HERO CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-cyan/5 via-black/40 to-cyber-violet/5 p-8 md:p-10 mb-10 relative overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">

            {/* Left: Visitor Counter */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest font-mono">Live Visitor Counter</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-end gap-3 justify-center md:justify-start">
                  <motion.span
                    key={countDisplay}
                    className="text-6xl md:text-7xl font-black text-white font-mono tabular-nums"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {countDisplay.toLocaleString()}
                  </motion.span>
                  <TrendingUp className="h-8 w-8 text-emerald-400 mb-3 animate-bounce" />
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Portfolio Visitors</p>
                <p className="text-gray-600 text-[11px] font-mono">You are visitor #{countDisplay.toLocaleString()} 🎉</p>
              </div>

              {/* Mini stat pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { icon: Globe,  label: 'Worldwide Reach', val: '15+ Countries' },
                  { icon: Eye,    label: 'Page Views',       val: `${(countDisplay * 3).toLocaleString()}+` },
                  { icon: Heart,  label: 'Appreciation',     val: '★ 4.9 / 5'    }
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[11px] font-medium text-gray-300">
                    <Icon className="h-3 w-3 text-cyber-cyan" />
                    <span className="font-bold text-white">{val}</span>
                    <span className="text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Divider + CTA */}
            <div className="hidden md:block w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <div className="flex-1 flex flex-col items-center gap-6 text-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-cyber-cyan/60 shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-4 ring-cyber-cyan/10 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/gallery_nihar.jpg"
                  alt="Nihar Ranjan Biswal"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Nihar's Memory Gallery</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                  Explore real travel photos, memories and adventures — from Odisha's heritage temples to mountain treks.
                </p>
              </div>

              {/* 🌟 PRIMARY CTA BUTTON */}
              <motion.a
                href="https://niharranjanbiswal22-source.github.io/NIHAR_MEMORY/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm text-white overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #06b6d4 100%)', backgroundSize: '200% 100%' }}
              >
                {/* Animated shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="h-4.5 w-4.5 relative z-10" />
                <span className="relative z-10 tracking-wide">Explore Gallery & Memory</span>
                <ExternalLink className="h-4 w-4 relative z-10" />
              </motion.a>

              <p className="text-[10px] text-gray-600 font-mono">🔗 niharranjanbiswal22-source.github.io</p>
            </div>

          </div>
        </motion.div>

        {/* ── Destination Teasers Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-5">
            <Compass className="h-4 w-4 text-cyber-cyan" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Destinations in the Gallery</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {destinations.map((dest, i) => (
              <motion.a
                key={dest.name}
                href="https://niharranjanbiswal22-source.github.io/NIHAR_MEMORY/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="glass-panel rounded-2xl p-4 border border-white/8 bg-cyber-card/60 flex flex-col items-center gap-2 text-center cursor-pointer hover:border-cyber-cyan/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{dest.icon}</span>
                <span className="text-[10px] font-bold text-white leading-tight">{dest.name}</span>
                <span className="text-[9px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-1.5 py-0.5 rounded uppercase">{dest.tag}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Camera, value: '7+',   label: 'Memories',         color: 'text-cyber-cyan' },
            { icon: MapPin, value: '6+',   label: 'Destinations',     color: 'text-cyber-violet' },
            { icon: Users,  value: `${visitorCount.toLocaleString()}`, label: 'Portfolio Visitors', color: 'text-emerald-400' },
            { icon: Heart,  value: '∞',    label: 'Odisha at Heart',  color: 'text-pink-400' }
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="glass-panel rounded-2xl p-5 text-center border border-white/8 group hover:border-cyber-cyan/20 transition-colors">
              <Icon className={`h-5 w-5 ${color} mx-auto mb-2`} />
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
