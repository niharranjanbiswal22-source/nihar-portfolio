import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, GraduationCap, School, X, Eye, Sparkles } from 'lucide-react';

const qualifications = [
  {
    id: 1,
    degree: "Master of Computer Applications (MCA)",
    institution: "Maharaja Sriram Chandra Bhanja Deo University",
    timeline: "Aug 2024 – Apr 2026 | Pursuing",
    details: "Advanced curriculum covering enterprise-grade Object-Oriented Design (Java/C++), full-stack web architectures, distributed systems, and core database tuning.",
    image: "/edu_mca.jpg",
    badgeColor: "text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30",
    indicatorColor: "bg-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.6)]",
    badge: "Post Graduation"
  },
  {
    id: 2,
    degree: "Bachelor of Science (B.Sc.) in Physics",
    institution: "Abhimanu Samant Singhara Degree College, Balia (Utkal University)",
    timeline: "2020 – 2023 | Grade: 72.40%",
    details: "Core focus on physical mechanics, mathematical analysis, semiconductors, electronics circuitry, and structured computer programming methodologies.",
    image: "/edu_bsc.jpg",
    badgeColor: "text-cyber-violet bg-cyber-violet/10 border-cyber-violet/30",
    indicatorColor: "bg-cyber-violet shadow-[0_0_10px_rgba(139,92,246,0.6)]",
    badge: "Graduation"
  },
  {
    id: 3,
    degree: "Higher Secondary (Science - 12th)",
    institution: "Kasinatha Mahavidyalaya, Kaipada",
    timeline: "2018 – 2020 | Completed",
    details: "Integrated science stream focusing on advanced Mathematics, physics concepts, organic chemistry pipelines, and system environments.",
    image: "/edu_12th.jpg",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    indicatorColor: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]",
    badge: "Higher Secondary"
  },
  {
    id: 4,
    degree: "Secondary School Certification (10th)",
    institution: "Bidhan Chandra Academy, Balipal",
    timeline: "Completed: 2018",
    details: "Foundational matriculation curriculum encompassing high school mathematics, general science logic, history, and linguistic fundamentals.",
    image: "/edu_10th.jpg",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    indicatorColor: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]",
    badge: "Secondary"
  }
];

export default function Education() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="education" className="py-24 px-4 md:px-8 border-t border-white/5 bg-black/10 relative">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Title */}
        <div className="text-center mb-20 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Academic <span className="gradient-text">Education</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
          <p className="text-xs text-gray-500 font-mono max-w-md mx-auto uppercase mt-4">
            Qualifications & Institution Campus Showcases
          </p>
        </div>

        {/* Education Timeline / Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {qualifications.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl border border-white/5 bg-cyber-card/75 hover:border-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] transition-all duration-300 flex flex-col justify-between overflow-hidden group text-left relative min-h-[440px]"
            >
              <div>
                {/* Institution Image Header */}
                <div className="h-48 w-full bg-black/30 border-b border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/90 to-transparent z-10" />
                  <img 
                    src={edu.image} 
                    alt={edu.institution} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-90"
                  />
                  
                  {/* Badge & Timeline floating controls */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <span className={`text-[9px] font-bold px-2 py-0.5 border rounded uppercase ${edu.badgeColor}`}>
                      {edu.badge}
                    </span>
                    <button
                      onClick={() => setSelectedPhoto(edu)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-cyber-cyan/20 border border-white/10 hover:border-cyber-cyan text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                      title="View Fullscreen Campus Photo"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Pulsing indicator marker */}
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 z-20">
                    <div className={`h-2.5 w-2.5 rounded-full ${edu.indicatorColor}`} />
                    <span className="text-[10px] font-bold font-mono text-white tracking-wide uppercase">Active Credential</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide leading-snug group-hover:text-cyber-cyan transition-colors">
                    {edu.degree}
                  </h3>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <School className="h-4 w-4 text-cyber-violet shrink-0" />
                      {edu.institution}
                    </p>
                    <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 font-mono pt-1">
                      <Calendar className="h-3.5 w-3.5 text-cyber-cyan shrink-0" />
                      {edu.timeline}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans pt-2 border-t border-white/5">
                    {edu.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Photo Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-2xl rounded-3xl border border-white/10 bg-[#070b13] shadow-2xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-black/60 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Lightbox Image Container */}
                <div className="relative h-[400px] w-full bg-black/50 flex items-center justify-center">
                  <img 
                    src={selectedPhoto.image} 
                    alt={selectedPhoto.institution} 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left" >
                    <span className={`text-[9px] font-bold px-2 py-0.5 border rounded uppercase ${selectedPhoto.badgeColor}`}>
                      {selectedPhoto.badge}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2 font-sans">{selectedPhoto.degree}</h4>
                    <p className="text-xs text-gray-300 font-semibold">{selectedPhoto.institution}</p>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
