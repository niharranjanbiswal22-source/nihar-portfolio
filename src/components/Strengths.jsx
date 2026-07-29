import { motion } from 'framer-motion';
import { MessageSquare, Zap, Target, ShieldCheck } from 'lucide-react';

const strengths = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Sleek Communication",
    description: "Clear and structured verbal/written interactions. Bridging gaps between technical complexity and stakeholder requirements to strengthen client alignment and team synergy.",
    color: "text-cyber-cyan border-cyber-cyan/20",
    glow: "shadow-glow-cyan"
  },
  {
    id: 2,
    icon: Zap,
    title: "Proactive Agile Learner",
    description: "Driven by curiosity to learn new systems and architectures. Quickly mastering new frontend frameworks, backend engines, and cloud setups during sprint-based releases.",
    color: "text-cyber-violet border-cyber-violet/20",
    glow: "shadow-glow-violet"
  },
  {
    id: 3,
    icon: Target,
    title: "Analytical Problem Solver",
    description: "Strong structural thinker capable of resolving complex data modeling issues. Translating loose, ambiguous project tasks into clean, modular, well-documented, working code.",
    color: "text-cyber-blue border-cyber-blue/20",
    glow: "shadow-glow-blue"
  }
];

export default function Strengths() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="strengths" className="py-24 px-4 md:px-8 border-t border-white/5 bg-black/20 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Core <span className="gradient-text">Strengths</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        {/* Strengths Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {strengths.map((str) => {
            const Icon = str.icon;
            return (
              <motion.div
                key={str.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`interactive-card glass-panel rounded-2xl p-8 border border-white/5 flex flex-col items-start gap-4 transition-all duration-300 hover:${str.glow}`}
              >
                {/* Header Icon */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-white/5 border ${str.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {str.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed text-left">
                  {str.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
