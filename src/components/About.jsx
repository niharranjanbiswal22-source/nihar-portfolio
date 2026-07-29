import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Layers, Award, Terminal, Mail, MapPin, Copy, Check } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Award,
    value: "6+ Months",
    label: "NIELIT Experience",
    color: "text-cyber-blue"
  },
  {
    id: 2,
    icon: Layers,
    value: "15+ Projects",
    label: "Core Projects Built",
    color: "text-cyber-cyan"
  },
  {
    id: 3,
    icon: Terminal,
    value: "15+ Tools",
    label: "Languages & Frameworks",
    color: "text-cyber-violet"
  },
  {
    id: 4,
    icon: Calendar,
    value: "MCA Graduate",
    label: "Master of Computer Apps",
    color: "text-pink-500"
  }
];

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("niharranjanbiswal22@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-8 border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Glowing Picture Card & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="glass-panel rounded-3xl p-5 border border-white/10 shadow-xl flex flex-col items-center gap-5 text-center relative overflow-hidden group">
              {/* Scanline overlay for high-tech HUD feel */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(6,182,212,0.04))] pointer-events-none" />
              
              {/* Profile Image container with dynamic neon circular glow */}
              <div className="relative h-44 w-44 rounded-2xl overflow-hidden border border-cyber-cyan/35 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:border-cyber-cyan group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
                <img 
                  src="/profile.jpg" 
                  alt="Nihar Ranjan Biswal" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white tracking-wide">Nihar Ranjan Biswal</h4>
                <p className="text-xs text-cyber-cyan font-semibold uppercase tracking-wider">Software Engineer</p>
              </div>

              {/* Quick Details List */}
              <div className="w-full space-y-3.5 border-t border-white/5 pt-4 text-left font-sans text-xs">
                
                {/* Email Address */}
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="h-4 w-4 text-cyber-cyan" />
                    <span className="truncate select-all text-gray-300">niharranjanbiswal22@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/5"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Location */}
                <a
                  href="https://maps.google.com/?q=Bhubaneswar,Odisha,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <MapPin className="h-4 w-4 text-cyber-cyan shrink-0" />
                  <span className="text-gray-300">Bhubaneswar, Odisha, India</span>
                </a>

              </div>
            </div>
          </motion.div>

          {/* Column 2: Bio Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-200 text-left">
              Bridging Software Engineering & Intelligent Systems
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-left text-sm md:text-base">
              MCA Graduate and Full Stack Developer with hands-on experience building production-style web applications using <strong className="text-white">React.js, Next.js, Node.js, and MongoDB</strong> at NIELIT. 
            </p>

            <p className="text-gray-400 leading-relaxed text-left text-sm md:text-base">
              Skilled in <strong className="text-white">Java, Python, C/C++, and SQL</strong>, with applied exposure to machine learning through independent AI projects. Known for turning ambiguous problems into clean, well-documented, working software.
            </p>

            <p className="text-gray-400 leading-relaxed text-left text-sm md:text-base">
              I thrive on building scalable UI architectures, designing robust APIs, and studying telecom-grade cloud environments like Oracle Cloud Infrastructure (OCI).
            </p>
          </motion.div>

          {/* Column 3: Count Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="interactive-card glass-panel rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-md select-none border border-white/5"
                >
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 mb-3 border border-white/10">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  
                  <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                  
                  <span className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
