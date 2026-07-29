import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Unlock, Download, Terminal, ShieldAlert, FileCode } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AI IPL Match Predictor Website",
    description: "A full-stack web application predicting IPL match outcomes using historical tournament statistics. Integrates data prediction models with a responsive dashboard, complete CRUD operations, and live database synchronizations.",
    tags: ["React.js", "Node.js", "Express", "Machine Learning", "MongoDB"],
    github: "https://github.com/niharranjanbiswal22-source",
    demo: "https://niharbiswalai.tiiny.site/",
    metric: "Accuracy: ~84%",
    type: "IPL_PREDICTOR_v1.0",
    visual: (
      <img src="/ipl_predictor.png" alt="AI IPL Match Predictor screenshot" className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 2,
    title: "Disease Detection AI Model",
    description: "An end-to-end Machine Learning pipeline built in Python predicting disease risk margins. Handles full data preprocessing pipelines, feature selection methods, model trainings, and evaluations on clinical datasets.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Healthcare AI"],
    github: "https://github.com/niharranjanbiswal22-source/AI-Assisted-Skin-Disease-Detection-System.git",
    demo: "https://ai-assisted-skin-disease-detection.vercel.app/detect",
    metric: "F1 Score: 0.89",
    type: "DISEASE_DETECTION_ML",
    visual: (
      <img src="/disease_detection.png" alt="Disease Detection AI Model screenshot" className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 3,
    title: "Online Examination & Result System",
    description: "A secure, multi-role web application enabling automated testing sessions and instant scores. Implements jwt-token authorization structures, student dashboard progress, and test evaluations.",
    tags: ["Full Stack", "Auth", "MongoDB", "Express.js", "React.js"],
    github: "https://github.com/niharranjanbiswal22-source",
    demo: "https://niharbiswal.tiiny.site/",
    metric: "Auth: JWT / Secure",
    type: "ONLINE_EXAM_SYSTEM",
    visual: (
      <img src="/online_exam_system.jpg" alt="Online Examination & Result System screenshot" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 4,
    title: "AI Meridian Pharma CRM",
    description: "An intelligent, responsive sales management dashboard and CRM system customized for pharmaceutical operations. Features client tracking, sales pipe flows, database queries, and productivity statistics.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "CRM Analytics"],
    github: "https://github.com/niharranjanbiswal22-source/meridian-pharma-crm_1",
    demo: "https://niharbiswal.tiiny.site/",
    metric: "Pharma CRM / Sales",
    type: "PHARMA_CRM_v1.2",
    visual: (
      <img src="/pharma_crm.png" alt="AI Meridian Pharma CRM dashboard screenshot" className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 5,
    title: "NRB AI Image Generator",
    description: "An end-to-end ML text-to-image application running latent diffusion pipelines. Allows users to write detailed prompt cues to generate custom high-resolution creative visuals.",
    tags: ["Python", "Machine Learning", "Diffusion Models", "React.js", "API Integrations"],
    github: "https://github.com/niharranjanbiswal22-source/NRB-AI-IMAGE-GENARATOR",
    demo: "https://niharbiswal.tiiny.site/",
    metric: "Text-to-Image ML",
    type: "AI_IMAGE_GEN_v2.0",
    visual: (
      <img src="/nrb_ai_image_gen.jpg" alt="NRB AI Image Generator screenshot" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 6,
    title: "NRB Code Compiler (HTML, CSS, JS)",
    description: "An interactive client-side coding sandbox and live browser compiler supporting real-time HTML, CSS, and JavaScript prototyping with side-by-side previews.",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Sandbox", "Preview Engine"],
    github: "https://shaheen-tv.xo.je/view.php?site=niharcompiler&i=3",
    demo: "https://shaheen-tv.xo.je/view.php?site=niharcompiler&i=3",
    metric: "Live Web Sandbox",
    type: "CODE_COMPILER_v1.0",
    visual: (
      <img src="/compiler.png" alt="NRB Code Compiler screenshot" className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 7,
    title: "Nihar Ranjan Biswal — Portfolio",
    description: "A premium personal developer portfolio built with React.js, Framer Motion, and Vite. Features AI assistant, female voice auto-tour, interactive tech stack, animated certifications, and a recruiter premium vault with Stripe payment integration.",
    tags: ["React.js", "Framer Motion", "Vite", "Tailwind CSS", "AI Integration"],
    github: "https://github.com/niharranjanbiswal22-source",
    demo: "https://niharbiswal.tiiny.site/",
    metric: "Live Portfolio",
    type: "PORTFOLIO_v3.0",
    visual: (
      <img src="/portfolio_preview.png" alt="Nihar Ranjan Biswal Portfolio screenshot" className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-500" />
    )
  },
  {
    id: 8,
    title: "Criminal Face Detection AI",
    description: "A deep learning-based facial recognition system for criminal identity detection. Uses CNN architecture with OpenCV for real-time face matching against a criminal database. Currently in active development — slot reserved for upcoming release.",
    tags: ["Python", "OpenCV", "Deep Learning", "CNN", "Face Recognition"],
    github: "https://github.com/niharranjanbiswal22-source",
    demo: "#",
    metric: "Accuracy: ~91%",
    type: "FACE_DETECTION_AI",
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-900/20 via-black to-orange-900/10 relative overflow-hidden">
        {/* Animated scan lines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(239,68,68,0.03)_2px,rgba(239,68,68,0.03)_4px)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent animate-pulse" />
        {/* Face scan grid */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-red-500/60 flex items-center justify-center relative">
            <div className="h-10 w-10 rounded-full border border-red-400/40 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-red-400 animate-pulse" />
            </div>
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-red-500" />
            <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-red-500" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-red-500" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-red-500" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-red-400 text-[10px] font-bold font-mono uppercase tracking-widest animate-pulse">⚠ COMING SOON</p>
          <p className="text-gray-500 text-[9px] font-mono">CNN · OpenCV · Face Match Engine</p>
        </div>
        <div className="absolute bottom-3 right-4 text-[8px] font-mono text-red-500/50 tracking-widest">CRIMINAL_AI_v1.0</div>
      </div>
    )
  }
];


export default function Projects({ isPremiumUnlocked, onOpenUnlock }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-24 px-4 md:px-8 border-t border-white/5 bg-cyber-bg relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Core & <span className="gradient-text">Premium Vault</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        {/* Project Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Render regular projects */}
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="interactive-card glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-white/5 shadow-lg group min-h-[400px]"
            >
              <div>
                {/* Tech Visual Header */}
                <div className="h-44 w-full bg-black/40 border-b border-white/10 relative p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-80" />
                  
                  {/* System Header status */}
                  <div className="absolute top-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-gray-500">
                    <span>{project.type}</span>
                    <span className="text-cyber-cyan font-bold">{project.metric}</span>
                  </div>

                  {project.visual}
                </div>

                {/* Info Area */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-cyber-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed text-left">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Footer Area with tags & links */}
              <div className="p-6 pt-0 space-y-4 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                  
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyber-cyan hover:text-white transition-colors cursor-pointer"
                  >
                    Live Demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Premium Recruiter Locked Vault Card */}
          <motion.div
            id="premium-system-vault"
            variants={cardVariants}
            className={`rounded-3xl overflow-hidden flex flex-col border shadow-2xl relative min-h-[400px] transition-all duration-300 ${
              isPremiumUnlocked 
                ? 'bg-cyber-bg border-cyber-cyan/40 shadow-glow-cyan' 
                : 'bg-black/40 border-white/5'
            }`}
          >
            {/* Top design indicators */}
            <div className="absolute top-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-gray-500 z-20">
              <span>VAULT_CORE_PORT_900</span>
              <span className={`font-bold ${isPremiumUnlocked ? 'text-cyber-cyan' : 'text-amber-500'}`}>
                {isPremiumUnlocked ? 'STATUS: ACCESS GRANTED' : 'STATUS: MOUNT LOCKED'}
              </span>
            </div>

            {/* Condition 1: Vault is Locked */}
            {!isPremiumUnlocked ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-black/75 backdrop-blur-md text-center space-y-6">
                <div className="h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
                  <Lock className="h-7 w-7" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    🔐 Premium System Vault
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                    Contains Nihar's advanced microservices system designs, API schemas, and proprietary code vaults. Unlock using our secure demo retainer checkout.
                  </p>
                </div>

                <button
                  onClick={onOpenUnlock}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-cyber-violet to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-glow-violet active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Unlock className="h-4 w-4" />
                  Unlock Vault ($1.00 or Test Card)
                </button>
              </div>
            ) : (
              /* Condition 2: Vault is Unlocked (Displays premium features) */
              <div className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6 pt-12 z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-glow-cyan">
                      <Unlock className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white tracking-wide">Premium System Design Vault</h3>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">Granted to Verified Recruiter</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 text-left leading-relaxed">
                    Access Nihar's production architectures. Below is the secure token and resources allocated for your recruitment pipeline.
                  </p>

                  {/* Mock code block terminal */}
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-left text-cyber-cyan space-y-1">
                    <div className="text-gray-500">// Secure session token authenticated successfully.</div>
                    <div>{`{`}</div>
                    <div className="pl-4">"recruiter_auth": <span className="text-white">"GRANTED"</span>,</div>
                    <div className="pl-4">"referral_token": <span className="text-emerald-400">"NIHAR_HIRE_2026"</span>,</div>
                    <div className="pl-4">"microservices": <span className="text-white">"Java Spring-Boot Cloud Gateway"</span>,</div>
                    <div className="pl-4">"ai_inference": <span className="text-white">"FastAPI Python / pandas evaluation"</span></div>
                    <div>{`}`}</div>
                  </div>
                </div>

                {/* Premium Actions */}
                <div className="space-y-3">
                  <div className="h-[1px] bg-white/5 w-full" />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/Nihar_Ranjan_Biswal_Resume.pdf"
                      download="Nihar_Ranjan_Biswal_System_Schematics.pdf"
                      className="flex-1 py-3 rounded-xl border border-cyber-cyan/20 hover:border-cyber-cyan bg-cyber-cyan/5 text-cyber-cyan hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      Schematic Docs
                    </a>
                    <a
                      href="mailto:niharranjanbiswal22@gmail.com?subject=Retainer Interview Token: NIHAR_HIRE_2026"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-xs font-bold uppercase tracking-wider text-white text-center flex items-center justify-center gap-2 cursor-pointer shadow-glow-blue hover:brightness-110"
                    >
                      <FileCode className="h-4 w-4" />
                      Fast-Track Hire
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {/* Background design grids */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/50 to-transparent pointer-events-none" />
          </motion.div>

        </motion.div>

        {/* GitHub Callout CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-center text-center gap-4"
        >
          <p className="text-sm text-gray-400 max-w-md font-mono">
            Looking for more codebases? Nihar regularly uploads his algorithms, college lab assignments, and full-stack modules to his GitHub.
          </p>
          <a
            href="https://github.com/niharranjanbiswal22-source"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-cyan text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-103 cursor-pointer"
          >
            <Github className="h-5 w-5 text-cyber-cyan" />
            <span>Explore Nihar's GitHub Profile</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
