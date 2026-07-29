import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Percentage loading counter
    const pctInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          setTimeout(() => {
            onComplete();
          }, 500); // Fades out slightly after reaching 100%
          return 100;
        }
        // Random incremental hops
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 70);

    return () => {
      clearInterval(pctInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-bg p-6 font-mono selection:bg-transparent"
    >
      {/* Sci-fi HUD Portal Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Outer orbital pulse ring (lighting stroke) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="h-44 w-44 rounded-full border border-dashed border-cyber-cyan/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center justify-center"
        />

        {/* Inner spinning scanning gear */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute h-36 w-36 rounded-full border border-double border-cyber-violet/30 border-t-cyber-violet border-b-cyber-violet shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        />

        {/* Outer glow aura layer */}
        <motion.div
          animate={{ 
            scale: [0.96, 1.04, 0.96],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-28 w-28 rounded-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan filter blur-xl -z-10"
        />

        {/* Center circular logo frame */}
        <div className="absolute h-28 w-28 rounded-full p-[2px] bg-gradient-to-tr from-cyber-blue via-cyber-violet to-cyber-cyan shadow-[0_0_25px_rgba(59,130,246,0.4)] overflow-hidden">
          <div className="h-full w-full rounded-full overflow-hidden bg-cyber-bg border border-cyber-bg">
            <img 
              src="/logo.jpg" 
              alt="Brand Logo" 
              className="h-full w-full object-cover scale-110"
            />
          </div>
        </div>

      </div>

      {/* Modern Minimalist Progress HUD Info */}
      <div className="mt-12 flex flex-col items-center gap-3">
        
        {/* Status code indicator */}
        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1.5 select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-ping" />
          <span>System Boot sequence: Ingesting core</span>
        </div>

        {/* Percentage Counter text */}
        <div className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-cyber-cyan text-glow-cyan">
          {Math.min(100, percent)}%
        </div>

        {/* Sleek Line progress tracker */}
        <div className="h-[2px] w-48 rounded-full bg-white/5 overflow-hidden relative border border-white/5 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            style={{ width: `${Math.min(100, percent)}%` }}
          />
        </div>

      </div>
    </motion.div>
  );
}
