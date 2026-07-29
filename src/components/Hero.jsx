import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, Download, CheckCircle, ExternalLink } from 'lucide-react';

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Java & Python Developer",
  "AI/ML Enthusiast",
  "Data Analyst"
];

export default function Hero({ onHireMeClick }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];
    
    // Typing speed configurations
    const typeSpeed = isDeleting ? 40 : 100;
    
    const handleType = () => {
      if (!isDeleting) {
        // Add char
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at the end
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Remove char
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Headline and Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-xs text-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Full-time Developer Roles
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Hi, I'm <br className="md:hidden"/>
            <span className="gradient-text text-glow-blue select-none">Nihar Ranjan Biswal</span>
          </h1>

          {/* Role Rotator */}
          <div className="text-xl md:text-2xl font-mono text-gray-300 h-8 flex items-center">
            <span className="text-cyber-violet select-none mr-2">&gt;</span>
            <span>{currentText}</span>
            <span className="h-5 w-1 bg-cyber-cyan ml-1 cursor-blink" />
          </div>

          {/* Paragraph Description */}
          <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
            MCA Graduate building production-style web apps with 
            <span className="text-white font-semibold"> React.js, Next.js, Node.js & MongoDB </span> 
            with hands-on experience at <span className="text-cyber-cyan font-semibold">NIELIT</span>. Applying data preprocessing and model evaluation skills to solve complex AI problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Primary Hire Me Button */}
            <button
              onClick={onHireMeClick}
              className="px-8 py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-white shadow-glow-violet hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Mail className="h-4.5 w-4.5" />
              Hire Me
            </button>

            {/* Secondary Resume Download */}
            <a
              href="/Nihar_Ranjan_Biswal_Resume.pdf"
              download="Nihar_Ranjan_Biswal_Resume.pdf"
              className="px-8 py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Download className="h-4.5 w-4.5 text-gray-400" />
              Resume
            </a>
          </div>
        </motion.div>

        {/* Right Column: Hero Profile Image with Orbit / Glowing Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Animated decorative ring 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute h-[330px] w-[330px] rounded-full border border-dashed border-cyber-cyan/20 pointer-events-none"
          />
          {/* Animated decorative ring 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute h-[380px] w-[380px] rounded-full border border-double border-cyber-violet/20 pointer-events-none"
          />
          
          {/* Glowing Ring Backdrop */}
          <div className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan opacity-20 blur-2xl animate-pulse-slow" />

          {/* Profile Circle Frame */}
          <div className="relative h-64 w-64 md:h-72 md:w-72 rounded-full p-[3px] bg-gradient-to-tr from-cyber-blue via-cyber-violet to-cyber-cyan shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="h-full w-full rounded-full overflow-hidden bg-cyber-bg border-4 border-cyber-bg">
              <img 
                src="/profile.jpg" 
                alt="Nihar Ranjan Biswal" 
                className="h-full w-full object-cover scale-105 transition-transform duration-500 hover:scale-110"
              />
            </div>
            {/* Orbital tech node */}
            <motion.div
              animate={{
                x: [0, 130, 0, -130, 0],
                y: [-130, 0, 130, 0, -130],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-cyber-cyan border-2 border-white shadow-glow-cyan flex items-center justify-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Floating Particle Network backdrop overlay */}
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 animate-bounce pointer-events-none opacity-40">
        <ArrowDown className="h-6 w-6 text-cyber-cyan" />
      </div>
    </section>
  );
}
