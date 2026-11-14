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
    name: "OpenAI ChatGPT",
    subtitle: "GPT-4o & o3-mini",
    role: "Conversational Logic",
    iconSrc: "/icons/ai/chatgpt.svg",
    badge: "OpenAI",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:border-emerald-500/60",
    border: "border-emerald-500/20"
  },
  {
    name: "Anthropic Claude",
    subtitle: "Claude 3.7 Sonnet",
    role: "Intelligent Reasoning",
    iconSrc: "/icons/ai/claude.svg",
    badge: "Anthropic",
    glow: "hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:border-amber-500/60",
    border: "border-amber-500/20"
  },
  {
    name: "Google Gemini",
    subtitle: "Gemini 2.0 Flash",
    role: "Multimodal AI",
    iconSrc: "/icons/ai/gemini.svg",
    badge: "Google",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-blue-500/60",
    border: "border-blue-500/20"
  },
  {
    name: "Antigravity",
    subtitle: "Autonomous Agentic AI",
    role: "DeepMind Agent",
    iconSrc: "/icons/ai/antigravity.svg",
    badge: "DeepMind",
    glow: "hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:border-cyan-400/60",
    border: "border-cyan-500/30"
  },
  {
    name: "DeepSeek AI",
    subtitle: "DeepSeek R1 / V3",
    role: "Reasoning & Code",
    iconSrc: "/icons/ai/deepseek.svg",
    badge: "DeepSeek",
    glow: "hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:border-indigo-500/60",
    border: "border-indigo-500/20"
  },
  {
    name: "Perplexity AI",
    subtitle: "Sonar Pro & Search",
    role: "Agentic Research",
    iconSrc: "/icons/ai/perplexity.svg",
    badge: "Perplexity",
    glow: "hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:border-teal-400/60",
    border: "border-teal-500/20"
  },
  {
    name: "Lovable AI",
    subtitle: "Lovable.dev Studio",
    role: "Full-Stack App Gen",
    iconSrc: "/icons/ai/lovable.svg",
    badge: "Lovable",
    glow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:border-pink-500/60",
    border: "border-pink-500/20"
  },
  {
    name: "Cursor AI",
    subtitle: "AI-First Code Editor",
    role: "Agentic Coding",
    iconSrc: "/icons/ai/cursor.svg",
    badge: "Cursor",
    glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:border-white/60",
    border: "border-white/20"
  },
  {
    name: "v0 by Vercel",
    subtitle: "Generative UI System",
    role: "Frontend Generation",
    iconSrc: "/icons/ai/v0.svg",
    badge: "Vercel",
    glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:border-white/60",
    border: "border-white/20"
  },
  {
    name: "Mistral AI",
    subtitle: "Le Chat & Pixtral",
    role: "Frontier Foundation",
    iconSrc: "/icons/ai/mistral.svg",
    badge: "Mistral",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:border-orange-500/60",
    border: "border-orange-500/20"
  },
  {
    name: "Grok xAI",
    subtitle: "Grok 2 / 3 Vision",
    role: "Real-Time Truth Model",
    iconSrc: "/icons/ai/grok.svg",
    badge: "xAI",
    glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:border-white/40",
    border: "border-white/20"
  }
];

const techTools = [
  { name: "Python", iconSrc: "/icons/python.svg", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-500/50" },
  { name: "React", iconSrc: "/icons/react.svg", glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:border-cyan-400/50" },
  { name: "JavaScript", iconSrc: "/icons/javascript.svg", glow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:border-yellow-400/50" },
  { name: "TensorFlow", iconSrc: "/icons/tensorflow.svg", glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:border-orange-500/50" },
  { name: "TypeScript", iconSrc: "/icons/typescript.svg", glow: "hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:border-blue-600/50" },
  { name: "MongoDB", iconSrc: "/icons/mongodb.svg", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:border-emerald-500/50" },
  { name: "AWS", iconSrc: "/icons/aws.svg", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:border-amber-500/50" },
  { name: "GitHub", iconSrc: "/icons/github.svg", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:border-white/50" },
  { name: "HTML5", iconSrc: "/icons/html5.svg", glow: "hover:shadow-[0_0_20px_rgba(234,88,12,0.6)] hover:border-orange-500/50" },
  { name: "CSS3", iconSrc: "/icons/css3.svg", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-500/50" },
  { name: "MySQL", iconSrc: "/icons/mysql.svg", glow: "hover:shadow-[0_0_20px_rgba(14,165,233,0.6)] hover:border-sky-500/50" },
  { name: "VS Code", iconSrc: "/icons/vscode.svg", glow: "hover:shadow-[0_0_20px_rgba(2,132,199,0.6)] hover:border-sky-600/50" },
  { name: "Git", iconSrc: "/icons/git.svg", glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:border-orange-500/50" },
  { name: "Redux", iconSrc: "/icons/redux.svg", glow: "hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:border-purple-500/50" },
  { name: "GitLab", iconSrc: "/icons/gitlab.svg", glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:border-orange-500/50" },
  { name: "Linux", iconSrc: "/icons/linux.svg", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:border-white/50" },
  { name: "Cloudflare", iconSrc: "/icons/cloudflare.svg", glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:border-amber-500/50" },
  { name: "Vercel", iconSrc: "/icons/vercel.svg", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:border-white/60" },
  { name: "Netlify", iconSrc: "/icons/netlify.svg", glow: "hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] hover:border-teal-400/50" },
  { name: "PyTorch", iconSrc: "/icons/pytorch.svg", glow: "hover:shadow-[0_0_20px_rgba(234,88,12,0.6)] hover:border-orange-600/50" },
  { name: "Unity", iconSrc: "/icons/unity.svg", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/40" },
  { name: "Django", iconSrc: "/icons/django.svg", glow: "hover:shadow-[0_0_20px_rgba(6,95,70,0.6)] hover:border-emerald-600/50" },
  { name: "Google Cloud", iconSrc: "/icons/googlecloud.svg", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-400/50" },
  { name: "C++", iconSrc: "/icons/cplusplus.svg", glow: "hover:shadow-[0_0_20px_rgba(29,78,216,0.6)] hover:border-blue-600/50" },
  { name: "C", iconSrc: "/icons/c.svg", glow: "hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] hover:border-indigo-600/50" },
  { name: "Azure Cloud", iconSrc: "/icons/azure.svg", glow: "hover:shadow-[0_0_20px_rgba(14,165,233,0.6)] hover:border-sky-500/50" }
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

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4 items-center justify-start max-w-6xl">
            {techTools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + (idx % 3) * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (idx * 0.1) % 1.8,
                  },
                  duration: 0.3
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.14, 
                  transition: { type: "spring", stiffness: 400, damping: 15 } 
                }}
                className={`flex flex-col items-center justify-between gap-2 p-3 rounded-2xl border border-white/10 bg-slate-900/70 hover:bg-slate-800/80 transition-all duration-300 ${tool.glow} cursor-pointer group relative overflow-hidden`}
              >
                {/* Background subtle neon glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Bubble Container */}
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center p-2.5 bg-white/[0.04] border border-white/10 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-300 relative shadow-inner">
                  <img 
                    src={tool.iconSrc} 
                    alt={tool.name} 
                    className="h-full w-full object-contain filter drop-shadow group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.45)] group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Label text */}
                <span className="text-[10px] md:text-[11px] text-gray-300 font-bold uppercase tracking-wider text-center truncate w-full group-hover:text-white transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI MODELS ECOSYSTEM - CONTINUOUS AUTO-SCROLLING MARQUEE */}
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-cyber-cyan animate-pulse" />
              <h3 className="text-2xl font-bold text-white tracking-wide uppercase">AI Model Ecosystem</h3>
            </div>
            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-[11px] font-semibold text-cyber-cyan">
              <span className="h-2 w-2 rounded-full bg-cyber-cyan animate-ping" />
              <span>LIVE AI ECOSYSTEM • HOVER TO PAUSE</span>
            </div>
          </div>
          
          {/* Continuous Infinite Scrolling Carousel */}
          <div className="relative overflow-hidden w-full py-4 -mx-4 md:-mx-8 px-4 md:px-8">
            {/* Left and Right Gradient Fades for Infinite Edge Blend */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-cyber-bg via-cyber-bg/90 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-cyber-bg via-cyber-bg/90 to-transparent" />

            <div className="animate-marquee-scroll flex items-center gap-5">
              {[...aiModels, ...aiModels].map((model, idx) => (
                <div
                  key={`${model.name}-${idx}`}
                  className={`w-60 md:w-64 h-36 flex-shrink-0 rounded-2xl border ${model.border} bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-xl p-4 flex flex-col items-center justify-between transition-all duration-300 ${model.glow} hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden select-none`}
                >
                  {/* Subtle Top-Right Provider Badge */}
                  <div className="absolute top-2.5 right-3">
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 group-hover:text-white transition-colors">
                      {model.badge}
                    </span>
                  </div>

                  {/* Logo Container */}
                  <div className="h-14 w-14 rounded-2xl flex items-center justify-center p-2.5 bg-white/[0.05] border border-white/10 group-hover:bg-white/[0.1] group-hover:border-white/20 transition-all duration-300 shadow-inner mt-1">
                    <img
                      src={model.iconSrc}
                      alt={model.name}
                      className="h-full w-full object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Info text */}
                  <div className="text-center w-full space-y-0.5">
                    <h4 className="font-bold text-white text-sm tracking-wide truncate group-hover:text-cyber-cyan transition-colors">
                      {model.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate">
                      {model.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
