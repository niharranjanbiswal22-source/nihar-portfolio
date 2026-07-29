import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Brain, Database, Cloud, Check, Sparkles, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "text-cyber-blue border-cyber-blue/30",
    skills: [
      { name: "Java", level: "90%" },
      { name: "Python", level: "85%" },
      { name: "C/C++", level: "80%" },
      { name: "JavaScript", level: "85%" },
      { name: "SQL", level: "85%" }
    ]
  },
  {
    title: "Full Stack Development",
    icon: Server,
    color: "text-cyber-cyan border-cyber-cyan/30",
    skills: [
      { name: "React.js", level: "90%" },
      { name: "Next.js", level: "80%" },
      { name: "Node.js", level: "85%" },
      { name: "Express.js", level: "85%" },
      { name: "REST APIs", level: "90%" },
      { name: "MongoDB", level: "85%" },
      { name: "HTML5 / CSS3", level: "95%" },
      { name: "CRUD Operations", level: "95%" }
    ]
  },
  {
    title: "Data & AI/ML",
    icon: Brain,
    color: "text-cyber-violet border-cyber-violet/30",
    skills: [
      { name: "Pandas", level: "75%" },
      { name: "NumPy", level: "75%" },
      { name: "Scikit-learn", level: "70%" },
      { name: "Data Preprocessing", level: "80%" },
      { name: "Model Training", level: "70%" },
      { name: "Data Analysis", level: "80%" }
    ]
  },
  {
    title: "Databases & Tools",
    icon: Database,
    color: "text-emerald-500 border-emerald-500/30",
    skills: [
      { name: "MongoDB", level: "85%" },
      { name: "SQL DBs", level: "80%" },
      { name: "Git & GitHub", level: "90%" },
      { name: "Postman", level: "85%" },
      { name: "VS Code", level: "95%" }
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    color: "text-pink-500 border-pink-500/30",
    skills: [
      { name: "Oracle Cloud (OCI)", level: "70%" },
      { name: "Cloud Computing", level: "75%" },
      { name: "Networking basics", level: "75%" },
      { name: "System Troubleshooting", level: "80%" }
    ]
  }
];

const aiModels = [
  {
    name: "Google Gemini",
    role: "Large Language Model",
    color: "from-blue-600 to-purple-600",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.35)] border-blue-500/30",
    icon: (
      <svg className="h-10 w-10 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 12.5 7.5 14.5 9.5C16.5 11.5 22 12 22 12C22 12 16.5 12.5 14.5 14.5C12.5 16.5 12 22 12 22C12 22 11.5 16.5 9.5 14.5C7.5 12.5 2 12 2 12C2 12 7.5 11.5 9.5 9.5C11.5 7.5 12 2 12 2Z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: "Anthropic Claude",
    role: "Intelligent Reasoning",
    color: "from-amber-600 to-red-600",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.35)] border-amber-500/30",
    icon: (
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2.5" fill="#f59e0b" />
        <circle cx="6" cy="6" r="2" fill="#ef4444" />
        <circle cx="18" cy="6" r="2" fill="#f59e0b" />
        <circle cx="6" cy="18" r="2" fill="#f59e0b" />
        <circle cx="18" cy="18" r="2" fill="#ef4444" />
        <line x1="12" y1="12" x2="6" y2="6" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2" />
        <line x1="12" y1="12" x2="18" y2="6" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2" />
        <line x1="12" y1="12" x2="6" y2="18" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2" />
        <line x1="12" y1="12" x2="18" y2="18" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2" />
      </svg>
    )
  },
  {
    name: "OpenAI ChatGPT",
    role: "Conversational Logic",
    color: "from-emerald-600 to-teal-600",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.35)] border-emerald-500/30",
    icon: (
      <svg className="h-10 w-10 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9C12.5523 9 13 8.55228 13 8V5.5C13 4.67157 12.3284 4 11.5 4H8.5C7.67157 4 7 4.67157 7 5.5V8.5C7 9.32843 7.67157 10 8.5 10H11C11.5523 10 12 9.55228 12 9Z" stroke="#10b981" strokeWidth="1.5" />
        <path d="M15 12C15 12.5523 14.5523 13 14 13H11.5C10.6716 13 10 12.3284 10 11.5V8.5C10 7.67157 10.6716 7 11.5 7H14.5C15.3284 7 16 7.67157 16 8.5V11C16 11.5523 15.5523 12 15 12Z" stroke="#10b981" strokeWidth="1.5" />
        <path d="M12 15C11.4477 15 11 15.4477 11 16V18.5C11 19.3284 11.6716 20 12.5 20H15.5C16.3284 20 17 19.3284 17 18.5V15.5C17 14.6716 16.3284 14 15.5 14H13C12.4477 14 12 14.4477 12 15Z" stroke="#10b981" strokeWidth="1.5" />
        <path d="M9 12C9 11.4477 9.44772 11 10 11H12.5C13.3284 11 14 11.6716 14 12.5V15.5C14 16.3284 13.3284 17 12.5 17H9.5C8.67157 17 8 16.3284 8 15.5V13C8 12.4477 8.44772 12 9 12Z" stroke="#10b981" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: "Antigravity",
    role: "Autonomous Agent",
    color: "from-cyber-cyan to-cyber-violet",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.35)] border-cyber-cyan/30 animate-pulse",
    icon: (
      <div className="relative h-10 w-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-dotted border-cyber-cyan animate-spin" />
        <div className="absolute h-5 w-5 rounded-full bg-cyber-violet/20 border border-cyber-violet animate-ping" />
        <Sparkles className="h-4.5 w-4.5 text-cyber-cyan relative" />
      </div>
    )
  }
];

const techTools = [
  { name: "Python", type: "icon", color: "from-blue-600 to-yellow-500", glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.45)] border-blue-500/30", icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25 2.5a.75.75 0 0 0-.75.75v3.75h3.75a.75.75 0 0 0 .75-.75V3.25a.75.75 0 0 0-.75-.75h-3zm-4.5 15a.75.75 0 0 0-.75.75v3.75h3.75a.75.75 0 0 0 .75-.75v-3.75a.75.75 0 0 0-.75-.75h-3.75z" fill="#3572A5" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" fill="#3572A5" />
      </svg>
    )
  },
  { name: "React", type: "icon", color: "from-sky-400 to-blue-500", glow: "hover:shadow-[0_0_15px_rgba(56,189,248,0.45)] border-sky-400/30", icon: (
      <svg className="h-9 w-9 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="#00d8ff" strokeWidth="2.2">
        <ellipse rx="10" ry="4" cx="12" cy="12" />
        <ellipse rx="10" ry="4" transform="rotate(60 12 12)" cx="12" cy="12" />
        <ellipse rx="10" ry="4" transform="rotate(120 12 12)" cx="12" cy="12" />
        <circle cx="12" cy="12" r="1.8" fill="#00d8ff" />
      </svg>
    )
  },
  { name: "JavaScript", type: "badge", label: "JS", color: "bg-yellow-400 text-black border-yellow-500/30", glow: "hover:shadow-[0_0_15px_rgba(250,204,21,0.45)]" },
  { name: "AI", type: "badge", label: "Ai", color: "bg-orange-500 text-white border-orange-600/30", glow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.45)]" },
  { name: "TypeScript", type: "badge", label: "TS", color: "bg-blue-600 text-white border-blue-700/30", glow: "hover:shadow-[0_0_15px_rgba(37,99,235,0.45)]" },
  { name: "MongoDB", type: "icon", color: "from-green-500 to-emerald-600", glow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.45)] border-green-500/30", icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2">
        <path d="M12 3C12 3 8 9 8 13.5C8 15.98 10.02 18 12 18C13.98 18 16 15.98 16 13.5C16 9 12 3 12 3Z" fill="#10b981" fillOpacity="0.25" />
        <path d="M12 18V21" strokeLinecap="round" />
      </svg>
    )
  },
  { name: "AWS", type: "badge", label: "AWS", color: "bg-amber-500 text-white border-amber-600/30", glow: "hover:shadow-[0_0_15px_rgba(245,158,11,0.45)]" },
  { name: "GitHub", type: "icon", color: "from-gray-800 to-black", glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] border-white/20", icon: (
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    )
  },
  { name: "HTML5", type: "badge", label: "5", color: "bg-orange-600 text-white border-orange-700/30", glow: "hover:shadow-[0_0_15px_rgba(234,88,12,0.45)]" },
  { name: "CSS3", type: "badge", label: "3", color: "bg-blue-500 text-white border-blue-600/30", glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.45)]" },
  { name: "MySQL", type: "badge", label: "SQL", color: "bg-blue-600 text-white border-blue-700/30", glow: "hover:shadow-[0_0_15px_rgba(29,78,216,0.45)]" },
  { name: "VS Code", type: "badge", label: "VS", color: "bg-sky-600 text-white border-sky-700/30", glow: "hover:shadow-[0_0_15px_rgba(2,132,199,0.45)]" },
  { name: "Git", type: "icon", color: "from-orange-500 to-red-600", glow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.45)] border-orange-500/30", icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="6" y1="9" x2="6" y2="15" />
        <path d="M6 12C9 12 12 15 15 18" strokeLinecap="round" />
      </svg>
    )
  },
  { name: "Redux", type: "badge", label: "Rdx", color: "bg-purple-600 text-white border-purple-700/30", glow: "hover:shadow-[0_0_15px_rgba(147,51,234,0.45)]" },
  { name: "GitLab", type: "badge", label: "GL", color: "bg-orange-500 text-white border-orange-600/30", glow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.45)]" },
  { name: "Linux", type: "badge", label: "Lnx", color: "bg-gray-800 text-white border-gray-950/30", glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
  { name: "Cloudflare", type: "badge", label: "CF", color: "bg-amber-600 text-white border-amber-700/30", glow: "hover:shadow-[0_0_15px_rgba(217,119,6,0.45)]" },
  { name: "Vercel", type: "icon", color: "from-gray-900 to-black", glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] border-white/20", icon: (
      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,3 22,21 2,21" />
      </svg>
    )
  },
  { name: "Netlify", type: "badge", label: "Nfy", color: "bg-teal-500 text-white border-teal-600/30", glow: "hover:shadow-[0_0_15px_rgba(20,184,166,0.45)]" },
  { name: "PyTorch", type: "badge", label: "PT", color: "bg-orange-600 text-white border-orange-700/30", glow: "hover:shadow-[0_0_15px_rgba(234,88,12,0.45)]" },
  { name: "Unity", type: "badge", label: "Unity", color: "bg-gray-900 text-white border-gray-950/30", glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
  { name: "Django", type: "badge", label: "Dj", color: "bg-emerald-800 text-white border-emerald-900/30", glow: "hover:shadow-[0_0_15px_rgba(6,95,70,0.45)]" },
  { name: "Google Cloud", type: "badge", label: "GCP", color: "bg-blue-500 text-white border-blue-600/30", glow: "hover:shadow-[0_0_15px_rgba(59,130,246,0.45)]" },
  { name: "C++", type: "badge", label: "C++", color: "bg-blue-600 text-white border-blue-700/30", glow: "hover:shadow-[0_0_15px_rgba(29,78,216,0.45)]" },
  { name: "C", type: "badge", label: "C", color: "bg-indigo-600 text-white border-indigo-700/30", glow: "hover:shadow-[0_0_15px_rgba(79,70,229,0.45)]" },
  { name: "Azure Cloud", type: "badge", label: "Az", color: "bg-sky-500 text-white border-sky-600/30", glow: "hover:shadow-[0_0_15px_rgba(14,165,233,0.45)]" }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 px-4 md:px-8 border-t border-white/5 bg-cyber-bg relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        {/* Tab Layout (Left categories, Right skill levels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Categories list */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === index;
              return (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-300 min-w-[200px] lg:min-w-0 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyber-blue/10 to-cyber-violet/10 border-cyber-violet/50 text-white shadow-md' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center bg-white/5 border ${category.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="truncate">{category.title}</span>
                </button>
              );
            })}
          </div>

          {/* Skill detail list */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 shadow-xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                {skillCategories[activeCategory].title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories[activeCategory].skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-300 flex items-center gap-2">
                        <Check className="h-4 w-4 text-cyber-cyan" />
                        {skill.name}
                      </span>
                      <span className="text-cyber-cyan font-bold">{skill.level}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: skill.level }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* TECH STACK BUBBLE CLOUD SECTION */}
        <div className="mb-24 space-y-10 text-left">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-cyber-cyan animate-pulse" />
            <h3 className="text-2xl font-bold text-white tracking-wide uppercase">Core Tech Stack</h3>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-start max-w-5xl">
            {techTools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className={`flex flex-col items-center gap-2.5 p-3 rounded-2xl border border-white/5 bg-cyber-card/65 transition-all duration-300 ${tool.glow} cursor-pointer w-20 md:w-24`}
              >
                {/* Bubble Outer Circle */}
                <div className={`h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-lg border border-white/10 bg-white/[0.03] group-hover:bg-white/[0.08] transition-all relative overflow-hidden`}>
                  {tool.type === "icon" ? (
                    tool.icon
                  ) : (
                    <span className={`text-xs md:text-sm font-extrabold tracking-tight px-2.5 py-1.5 rounded-lg border ${tool.color}`}>
                      {tool.label}
                    </span>
                  )}
                </div>
                {/* Label text */}
                <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider text-center truncate w-full">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI MODELS ECOSYSTEM */}
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyber-cyan animate-pulse" />
            <h3 className="text-2xl font-bold text-white tracking-wide uppercase">AI Model Ecosystem</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiModels.map((model) => (
              <motion.div
                key={model.name}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass-panel p-6 rounded-3xl border ${model.glow} bg-cyber-card/70 flex flex-col items-center text-center gap-4 transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${model.color} opacity-10 blur-xl`} />

                <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative overflow-hidden shadow-inner">
                  {model.icon}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-white tracking-wide">{model.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{model.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
