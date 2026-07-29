import { motion } from 'framer-motion';
import { Award, Mail, Heart, Sparkles } from 'lucide-react';

export default function GodAnimation() {
  return (
    <section className="py-20 px-4 md:px-8 border-t border-white/5 bg-[#030712] relative overflow-hidden">
      
      {/* Golden divine rays overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.02),transparent_75%)] pointer-events-none" />

      <div className="mx-auto max-w-4xl flex flex-col items-center gap-12 text-center">
        
        {/* Lord Jagannath Chakra Sacred Animation */}
        <div className="relative h-44 w-44 flex items-center justify-center">
          {/* Pulsing Divine Halo */}
          <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-3xl animate-divine-glow" />
          <div className="absolute h-36 w-36 rounded-full border border-amber-500/10 animate-chakra-spin" />
          
          {/* Custom SVG Golden Sudarshana Chakra wheel */}
          <svg 
            className="h-28 w-28 text-amber-500 shadow-glow-violet animate-chakra-spin relative z-10" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer ring with spokes */}
            <circle cx="50" cy="50" r="44" strokeDasharray="3 2" />
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="32" />
            
            {/* 16 Spokes representing Sudarshana Chakra */}
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="21.72" y1="21.72" x2="78.28" y2="78.28" />
            <line x1="21.72" y1="78.28" x2="78.28" y2="21.72" />
            
            <line x1="50" y1="10" x2="50" y2="90" transform="rotate(22.5 50 50)" />
            <line x1="10" y1="50" x2="90" y2="50" transform="rotate(22.5 50 50)" />
            <line x1="21.72" y1="21.72" x2="78.28" y2="78.28" transform="rotate(22.5 50 50)" />
            <line x1="21.72" y1="78.28" x2="78.28" y2="21.72" transform="rotate(22.5 50 50)" />

            {/* Core glowing hub */}
            <circle cx="50" cy="50" r="10" fill="#f59e0b" fillOpacity="0.2" />
            <circle cx="50" cy="50" r="5" fill="#f59e0b" />
          </svg>
        </div>

        {/* Relations / Welcome Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-6 md:p-10 border border-amber-500/20 bg-amber-500/[0.01] shadow-2xl relative max-w-2xl text-left"
        >
          {/* holographic watermarks */}
          <div className="absolute top-4 right-6 text-amber-500/20 text-xs font-mono select-none">ID: NRB-REL-2026</div>

          <div className="space-y-6 font-sans text-sm md:text-base leading-relaxed text-gray-300">
            <h4 className="text-lg font-bold text-white tracking-wide border-b border-white/5 pb-3 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              A Sincere Welcome from Nihar
            </h4>

            <p>Dear Recruiter,</p>

            <p>
              Thank you for taking the time to explore my digital portfolio! As an MCA graduate from Bhubaneswar, Odisha, I believe in combining hard technical engineering (React, Java, Python, SQL) with strong personal values—reliability, active listening, and dedicated collaboration.
            </p>

            <p className="border-l-2 border-amber-500/30 pl-4 py-1.5 italic text-gray-400 font-serif">
              "Whatever you do, do it with absolute devotion, taking full ownership, and striving to learn every single day."
            </p>

            <p>
              Whether you are looking to hire a Full Stack Developer, a Software Engineer, or a Data Analyst, I am fully prepared to relocate, adapt to your timezones, and contribute to your team's success. May your visit here be pleasant, and I look forward to connecting with you!
            </p>

            {/* Signature Block */}
            <div className="pt-6 flex justify-between items-end border-t border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Developer Signature</span>
                <p className="font-serif italic text-lg text-amber-500 font-bold tracking-wider">Nihar Ranjan Biswal</p>
              </div>

              <div className="flex gap-2 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500 animate-pulse" />
                  <span>Odisha, India</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
