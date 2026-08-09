import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, Download, X, ShieldCheck, Cpu, Terminal } from 'lucide-react';

const certs = [
  {
    id: 1,
    title: "Google Analytics Certification",
    issuer: "Google Analytics Academy",
    date: "May 2026",
    color: "from-[#4285F4] to-[#FBBC04]",
    glow: "shadow-[0_0_15px_rgba(66,133,244,0.30)] border-[#4285F4]/30",
    badgeColor: "text-[#4285F4] bg-[#4285F4]/10",
    hash: "G-ANA-26-18343C",
    image: "/cert_google_analytics.png",
    caption: "🔍 From Clicks to Conversions — Google Certified",
    description: "Google-certified credential validating expert competency in web traffic analytics, tracking data pipelines, conversion models, and digital marketing statistics."
  },
  {
    id: 2,
    title: "JAVA Programming — Certificate of Completion",
    issuer: "Aakanksha IT Hub / MSCB University · ITDA Baripada",
    date: "Jan 2026 – Jun 2026",
    color: "from-[#f89820] to-[#c6262e]",
    glow: "shadow-[0_0_15px_rgba(248,152,32,0.30)] border-[#f89820]/30",
    badgeColor: "text-[#f89820] bg-[#f89820]/10",
    hash: "JAVA-MSCB-26-AIT",
    image: "/cert_java.jpg",
    caption: "☕ Java Mastered — MSCB University · Aakanksha IT Hub",
    description: "Certified completion of the JAVA Programming course at MSCB University, conducted under the Aakanksha IT Hub initiative (ITDA Baripada, Mayurbhanj). Demonstrated satisfactory performance across all required training modules."
  },
  {
    id: 10,
    title: "RTCCA - 2025 (National Conference)",
    issuer: "Maharaja Sriram Chandra Bhanja Deo University",
    date: "March 27-28, 2025",
    color: "from-purple-600 to-indigo-500",
    glow: "shadow-[0_0_15px_rgba(124,58,237,0.25)] border-purple-500/30",
    badgeColor: "text-purple-500 bg-purple-500/10",
    hash: "RTCCA-25-MSCB",
    image: "/cert_rtcca_2025.jpg",
    caption: "🎓 National Conference Participant — MSCB University",
    description: "Participated in the National Conference on Recent Trends in Computing, Communication and Applications (RTCCA-2025) organized by the Department of Computer Application."
  },
  {
    id: 3,
    title: "Odisha AI Symposium 2025 (OAIS)",
    issuer: "Odisha AI & NIST Berhampur",
    date: "2025",
    color: "from-blue-600 to-cyan-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/30",
    badgeColor: "text-blue-500 bg-blue-500/10",
    hash: "OAIS-25-N10A-01",
    image: "/cert_odisha_ai.jpg",
    caption: "🏆 1st Place — Northern Odisha Region",
    description: "Participated in the prestigious Odisha AI Symposium (OAIS) 2025, securing First Place in the Northern Odisha Region for innovative AI implementation paradigms."
  },
  {
    id: 4,
    title: "Innovation & Startup Competition 2025",
    issuer: "Maharaja Sriram Chandra Bhanja Deo University",
    date: "Sep 2025",
    color: "from-amber-600 to-orange-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)] border-amber-500/30",
    badgeColor: "text-amber-500 bg-amber-500/10",
    hash: "MSCB-ISC-25-01",
    image: "/cert_startup_prize.jpg",
    caption: "🥇 First Prize — SudhAr-NAP Innovation",
    description: "Awarded First Prize for the project 'SudhAr-NAP: Bioremediated Sanitary Napkin', recognized for eco-friendly design, startup viability, and product innovation."
  },
  {
    id: 5,
    title: "2nd Industry Academia Interface Meet (AIIM)",
    issuer: "HRDC, MSCB University (PM-USHA)",
    date: "Nov 2025",
    color: "from-red-600 to-pink-500",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.25)] border-red-500/30",
    badgeColor: "text-red-500 bg-red-500/10",
    hash: "AIIM-25-HRDC-02",
    image: "/cert_industry_academia.jpg",
    caption: "🤝 PM-USHA Industry Meet — MSCB University",
    description: "Participated in the PM-USHA sponsored Industry-Academia Meet, discussing computer application models and modern technical alignments with business sectors."
  },
  {
    id: 6,
    title: "Full-Stack Web Development Certificate",
    issuer: "NIELIT (National Institute of Electronics & IT)",
    date: "2026",
    color: "from-cyber-cyan to-cyber-blue",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.2)] border-cyber-cyan/30",
    badgeColor: "text-cyber-cyan bg-cyber-cyan/10",
    hash: "NL-FSD-26-9403B",
    caption: "💻 MERN Stack Certified — NIELIT",
    description: "Advanced certification verifying competency in engineering full-stack MERN applications, database optimizations, and secure API architectures."
  },
  {
    id: 7,
    title: "Oracle Cloud (OCI) Foundations Certificate",
    issuer: "Oracle Student Program",
    date: "2025",
    color: "from-orange-500 to-red-500",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)] border-orange-500/30",
    badgeColor: "text-orange-500 bg-orange-500/10",
    hash: "OR-OCI-25-1994D",
    description: "Certified validation of core cloud computing environments, secure cloud networking systems, database instances, and shared security structures."
  }
];

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  const handleDownload = (cert) => {
    const link = document.createElement('a');
    link.href = cert.image ? cert.image : '/Nihar_Ranjan_Biswal_Resume.pdf';
    link.setAttribute('download', `${cert.title.replace(/\s+/g, '_')}_Certificate.${cert.image ? 'jpg' : 'pdf'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certifications" className="py-24 px-4 md:px-8 border-t border-white/5 bg-cyber-bg relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Earned <span className="gradient-text">Certifications & Achievements</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {certs.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6 }}
              className={`glass-panel rounded-3xl border ${cert.glow} bg-cyber-card/75 flex flex-col justify-between overflow-hidden transition-all duration-300 relative group min-h-[460px]`}
            >
              <div>
                {/* Certificate front image header - shown if image exists */}
                {cert.image ? (
                  <div 
                    onClick={() => setActiveCert(cert)}
                    className="h-44 w-full bg-black/40 border-b border-white/10 relative overflow-hidden cursor-pointer group/image"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/95 to-transparent z-10 opacity-70 group-hover/image:opacity-40 transition-opacity" />
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                    />
                    <div className="absolute top-3 right-3 text-[9px] font-bold text-cyber-cyan bg-black/75 border border-white/15 px-2 py-0.5 rounded uppercase z-20 font-mono">
                      Click to View
                    </div>
                  </div>
                ) : (
                  <div className="h-44 w-full bg-black/50 border-b border-white/10 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-40" />
                    <Award className={`h-12 w-12 text-gray-500 animate-pulse`} />
                  </div>
                )}

                {/* Text Description Block */}
                <div className="p-6 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span className="truncate max-w-[200px] font-bold uppercase text-cyber-cyan">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white leading-snug tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {cert.title}
                  </h3>

                  {cert.caption && (
                    <p className="text-[10px] font-bold text-cyber-cyan/80 font-mono italic">{cert.caption}</p>
                  )}
                  
                  <p className="text-xs text-gray-400 leading-relaxed font-sans pt-2 border-t border-white/5">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2.5 mt-auto">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white border border-white/5 hover:border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  View Badge
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="p-2 rounded-xl bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan hover:text-white border border-cyber-cyan/20 transition-all flex items-center justify-center cursor-pointer"
                  title="Download Certificate File"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-white/15 bg-[#070b13] shadow-2xl relative text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 z-30 p-1.5 rounded-lg bg-black/60 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Inner Certificate layout */}
                {activeCert.image ? (
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative max-h-[460px] flex items-center justify-center">
                    <img 
                      src={activeCert.image} 
                      alt={activeCert.title} 
                      className="w-full h-auto max-h-[440px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="border border-cyber-cyan/20 rounded-2xl p-6 bg-black/40 relative overflow-hidden space-y-6">
                    {/* Security watermark background lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(6,182,212,0.02)_25%,transparent_25%,transparent_50%,rgba(6,182,212,0.02)_50%,rgba(6,182,212,0.02)_75%,transparent_75%,transparent)] bg-[length:20px_20px] pointer-events-none" />

                    {/* holographic seal indicator */}
                    <div className="flex justify-between items-start border-b border-white/5 pb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-cyber-cyan" />
                        <span className="text-[10px] text-cyber-cyan font-bold tracking-widest uppercase font-mono">Secured Ledger Credential</span>
                      </div>
                      <Cpu className="h-5 w-5 text-cyber-violet animate-pulse" />
                    </div>

                    <div className="space-y-4 relative z-10 text-center py-6">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">This certifies that</span>
                      <h4 className="text-3xl font-black text-white tracking-wide font-sans">Nihar Ranjan Biswal</h4>
                      <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-sm mx-auto">
                        has successfully completed the specialized modules and technical evaluations for
                      </p>
                      <div className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 inline-block">
                        <span className="text-sm font-bold text-cyber-cyan font-mono">{activeCert.title}</span>
                      </div>
                    </div>

                    {/* Verification footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono relative z-10">
                      <div>
                        <span>ISSUER: </span>
                        <span className="text-gray-300 font-bold">{activeCert.issuer.toUpperCase()}</span>
                      </div>
                      <div>
                        <span>HASH: </span>
                        <span className="text-cyber-violet font-bold select-all">{activeCert.hash}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleDownload(activeCert)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-glow-violet hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="h-4 w-4" />
                    Download Official Document
                  </button>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
