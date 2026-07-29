import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "NIELIT (National Institute of Electronics & Information Technology)",
    period: "Feb 2026 – Completed",
    color: "border-cyber-cyan shadow-glow-cyan",
    bulletColor: "bg-cyber-cyan",
    points: [
      "Developed and deployed full-stack web applications using React.js, Next.js, Node.js, and MongoDB, learning application hosting environments.",
      "Engineered frontend interfaces and backend REST APIs, supporting full CRUD operations and real-time database workflows.",
      "Collaborated with a technical team to troubleshoot, debug, and document new product features.",
      "Maintained version control across development modules using Git/GitHub during the application lifecycle."
    ]
  },
  {
    id: 2,
    role: "Telecaller – Customer Support",
    company: "Reliance Retail",
    period: "2023 (6 Months)",
    color: "border-cyber-violet shadow-glow-violet",
    bulletColor: "bg-cyber-violet",
    points: [
      "Acquired hands-on experience handling inbound and outbound customer inquiries, strengthening verbal communication and problem-solving capabilities.",
      "Utilized Salesforce CRM systems to log client cases, resolve system tickets, and maintain detailed technical records.",
      "Consistently achieved performance targets for customer satisfaction and resolution times."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-8 border-t border-white/5 bg-black/20 relative">
      <div className="mx-auto max-w-5xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <div className="glow-line mx-auto w-24" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          
          {/* Vertical line glow overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-cyber-cyan via-cyber-violet to-transparent pointer-events-none" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[41px] md:-left-[57px] top-1 h-6 w-6 rounded-full border-4 border-cyber-bg flex items-center justify-center ${exp.bulletColor} shadow-md`}>
                <Briefcase className="h-3 w-3 text-white" />
              </div>

              {/* Card Container */}
              <div className={`glass-panel rounded-2xl p-6 md:p-8 border-l-4 ${exp.color} hover:shadow-[0_0_30px_rgba(11,17,32,0.6)] transition-all duration-300`}>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-cyber-cyan">
                      {exp.company}
                    </span>
                  </div>
                  
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 self-start md:self-center">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-3.5 text-left text-sm md:text-base text-gray-400">
                  {exp.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex gap-3 items-start leading-6">
                      <span className={`h-1.5 w-1.5 rounded-full ${exp.bulletColor} mt-2.5 shrink-0`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
