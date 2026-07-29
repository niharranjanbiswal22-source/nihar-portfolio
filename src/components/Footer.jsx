import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 px-4 md:px-8 border-t border-white/5 bg-black/40 text-left relative font-mono text-xs text-gray-500">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Copy & Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-300 font-bold text-sm font-sans select-none">
            <span className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />
            NIHAR RANJAN BISWAL
          </div>
          <p>© {new Date().getFullYear()} All Rights Reserved. Built with React & Tailwind CSS.</p>
        </div>

        {/* Center: System stats indicator */}
        <div className="flex flex-wrap justify-center items-center gap-4 bg-white/5 border border-white/10 rounded-full px-5 py-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>SSL: SECURE</span>
          </div>
          <span className="text-white/10">|</span>
          <div>CORE: v2.0</div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan" />
            <span>PORT: ACTIVE</span>
          </div>
        </div>

        {/* Right: Social connections & scroll top */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <a
              href="https://github.com/niharranjanbiswal22-source"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="GitHub"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/nihar-biswal95566n"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="LinkedIn"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>

            <a
              href="mailto:niharranjanbiswal22@gmail.com"
              className="p-2 rounded-lg border border-white/5 hover:border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-cyber-cyan/30 hover:border-cyber-cyan bg-cyber-cyan/5 text-cyber-cyan hover:text-white hover:shadow-glow-cyan transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
