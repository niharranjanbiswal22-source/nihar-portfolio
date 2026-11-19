import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0);

  // Dynamic realistic boot status updates based on progress
  const bootStatus = useMemo(() => {
    if (percent < 25) return { text: "INITIALIZING NEURAL RUNTIME", code: "KERNEL_0x8F", icon: Cpu };
    if (percent < 50) return { text: "LOADING HARDWARE-ACCELERATED ASSETS", code: "GPU_VULKAN_READY", icon: Zap };
    if (percent < 75) return { text: "SYNCHRONIZING FULL-STACK SERVICES", code: "REACT_NEXT_V15", icon: Sparkles };
    if (percent < 99) return { text: "PREPARING EXECUTIVE INTERFACE", code: "SECURITY_256_SSL", icon: ShieldCheck };
    return { text: "SYSTEM READY • LAUNCHING PORTFOLIO", code: "BOOT_COMPLETE", icon: ShieldCheck };
  }, [percent]);

  useEffect(() => {
    const pctInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          setTimeout(() => {
            onComplete();
          }, 450); // Smooth exit delay
          return 100;
        }
        // Organic pacing: fast start, smooth middle, crisp finish
        const increment = prev < 60 ? Math.floor(Math.random() * 7) + 3 : Math.floor(Math.random() * 5) + 2;
        return Math.min(100, prev + increment);
      });
    }, 65);

    return () => clearInterval(pctInterval);
  }, [onComplete]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04,
        filter: "blur(10px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 md:p-10 select-none overflow-hidden font-mono"
      style={{ backgroundColor: '#030712', color: '#ffffff' }} // Deep Obsidian luxury dark backdrop
    >
      {/* 1. Cinematic Ambient Lighting & Aurora Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-center electric cyan beam */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent blur-[120px] rounded-full" />
        
        {/* Center glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-blue-500/15 to-cyan-400/10 blur-[100px] rounded-full" />
        
        {/* Subtle grid pattern for tech depth */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        />
      </div>

      {/* 2. Top Header Bar: Architecture Metadata */}
      <div className="w-full max-w-4xl flex items-center justify-between text-[11px] z-10 pt-2" style={{ color: '#94a3b8' }}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="font-bold tracking-widest" style={{ color: '#ffffff' }}>NIHAR.DEV</span>
          <span className="text-slate-600">/</span>
          <span className="font-medium" style={{ color: '#94a3b8' }}>CORE OS 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px]" style={{ color: '#94a3b8' }}>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold" style={{ color: '#22d3ee' }}>
            60 FPS ENGINE
          </span>
          <span>LATENCY: &lt;1ms</span>
        </div>
      </div>

      {/* 3. Center Portal: Sleek Compact Holographic Badge & Orbit Rings */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 py-4">
        
        {/* Outer Orbit Light Sweep Ring (Refined Compact Size) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="h-32 w-32 sm:h-36 sm:w-36 rounded-full border border-dashed border-cyan-500/30 p-1.5 flex items-center justify-center relative shadow-[0_0_35px_rgba(6,182,212,0.18)]"
        >
          {/* Orbiting Satellite Light Sparkle */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
        </motion.div>

        {/* Counter-Rotating Radar Gear Ring (Compact) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          className="absolute h-26 w-26 sm:h-30 sm:w-30 rounded-full border border-indigo-500/30 border-t-cyan-400 border-b-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
          style={{ borderDasharray: "4 8" }}
        />

        {/* Breathing Radiant Glow Aura (Compact) */}
        <motion.div
          animate={{ 
            scale: [0.92, 1.08, 0.92],
            opacity: [0.35, 0.7, 0.35]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 filter blur-xl -z-10"
        />

        {/* Central Circular Brand Glass Badge (Compact & Elegant ~80-96px) */}
        <div className="absolute h-20 w-20 sm:h-24 sm:w-24 rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-blue-600 shadow-[0_0_25px_rgba(6,182,212,0.5)] overflow-hidden">
          <div className="h-full w-full rounded-full overflow-hidden bg-slate-950/95 backdrop-blur-md relative group flex items-center justify-center border border-white/10">
            
            {/* The Authentic NR Logo */}
            <img 
              src="/logo.jpg" 
              alt="Nihar Ranjan Biswal Brand Logo" 
              className="h-full w-full object-cover scale-105"
            />

            {/* Subtle Glass Sheen Diagonal Sweep */}
            <motion.div
              animate={{ x: ['-120%', '150%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
            />
          </div>
        </div>

      </div>

      {/* 4. Bottom HUD: Real-time Status, Liquid Progress Bar, and Pure White 1-100 Percent */}
      <div className="w-full max-w-md flex flex-col items-center gap-3 z-10 pb-4 text-center">
        
        {/* Dynamic Boot Sequence Tag with Icon */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold shadow-sm" style={{ color: '#cbd5e1' }}>
          {(() => {
            const Icon = bootStatus.icon;
            return <Icon className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />;
          })()}
          <span className="tracking-wider">{bootStatus.text}</span>
        </div>

        {/* Ultra-Crisp Pure White 1-100 Percentage Display */}
        <div className="flex items-baseline justify-center gap-1.5 my-0.5">
          <span 
            className="loading-percent-number text-5xl sm:text-6xl font-black tracking-tight"
            style={{ 
              color: '#ffffff', 
              textShadow: '0 0 25px rgba(255, 255, 255, 0.85), 0 0 50px rgba(6, 182, 212, 0.5)' 
            }}
          >
            {Math.min(100, percent)}
          </span>
          <span 
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ 
              color: '#22d3ee',
              textShadow: '0 0 15px rgba(34, 211, 238, 0.7)'
            }}
          >
            %
          </span>
        </div>

        {/* High-Precision Liquid Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden relative p-[1px] shadow-inner">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 relative"
            style={{ width: `${Math.min(100, percent)}%` }}
            transition={{ ease: "easeOut" }}
          >
            {/* Leading Comet Head Glow Spark */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full shadow-[0_0_12px_#38bdf8]" 
              style={{ backgroundColor: '#ffffff' }}
            />
          </motion.div>
        </div>

        {/* Footer Subtext: Developer Identity & Security */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono pt-1" style={{ color: '#64748b' }}>
          <span>HOST: VERIFIED SECURE</span>
          <span className="font-bold" style={{ color: '#cbd5e1' }}>NIHAR RANJAN BISWAL</span>
          <span>LOC: ODISHA, IN</span>
        </div>

      </div>

    </motion.div>
  );
}